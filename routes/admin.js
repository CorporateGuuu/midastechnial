const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'midas_technical',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Database connection pool
let dbPool;
async function getDatabaseConnection() {
  if (!dbPool) {
    dbPool = mysql.createPool(dbConfig);
  }
  return dbPool.getConnection();
}

// Helper functions
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return Boolean(value);
}

// Admin dashboard
router.get('/', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/dashboard', { title: 'Admin Dashboard', path: '/admin/dashboard' });
});

// Admin users management
router.get('/users', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/users', { title: 'User Management', path: '/admin/users' });
});

// Admin products management
router.get('/products', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/products', { title: 'Product Management', path: '/admin/products' });
});

// Admin products upload page
router.get('/products/upload', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/products-upload', { title: 'Upload Products CSV', path: '/admin/products/upload' });
});

// Admin products upload handler
router.post('/products/upload', upload.single('csv'), async (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }

  if (!req.file) {
    return res.render('admin/products-upload', {
      title: 'Upload Products CSV',
      error: 'No file uploaded',
      path: '/admin/products/upload'
    });
  }

  const results = [];
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  try {
    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const connection = await getDatabaseConnection();

          for (const row of results) {
            try {
              // Validate required fields
              if (!row.name || !row.price) {
                errors.push(`Row ${results.indexOf(row) + 1}: Missing required fields (name or price)`);
                errorCount++;
                continue;
              }

              // Generate slug if not provided
              const slug = row.slug || generateSlug(row.name);

              // Parse numeric fields
              const price = parseFloat(row.price);
              const discountPercentage = row.discount_percentage ? parseFloat(row.discount_percentage) : 0;
              const stockQuantity = row.stock_quantity ? parseInt(row.stock_quantity) : 0;

              // Parse boolean fields
              const isFeatured = parseBoolean(row.is_featured);
              const isNew = parseBoolean(row.is_new);

              // Find category ID
              let categoryId = null;
              if (row.category) {
                const [categoryRows] = await connection.execute(
                  'SELECT id FROM categories WHERE name = ? OR slug = ?',
                  [row.category, row.category]
                );
                if (categoryRows.length > 0) {
                  categoryId = categoryRows[0].id;
                }
              }

              // Insert product
              const [productResult] = await connection.execute(
                `INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, is_new, image_url, brand, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  row.name,
                  slug,
                  row.sku || null,
                  row.description || null,
                  price,
                  discountPercentage,
                  stockQuantity,
                  isFeatured,
                  isNew,
                  row.image_url || null,
                  row.brand || null,
                  categoryId
                ]
              );

              const productId = productResult.insertId;

              // Insert specifications if provided
              const specs = {
                display: row.display,
                processor: row.processor,
                memory: row.memory,
                storage: row.storage,
                camera: row.camera,
                battery: row.battery,
                connectivity: row.connectivity,
                operating_system: row.operating_system
              };

              // Check if any spec is provided
              const hasSpecs = Object.values(specs).some(spec => spec && spec.trim() !== '');

              if (hasSpecs) {
                await connection.execute(
                  `INSERT INTO product_specifications (product_id, display, processor, memory, storage, camera, battery, connectivity, operating_system) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    productId,
                    specs.display || null,
                    specs.processor || null,
                    specs.memory || null,
                    specs.storage || null,
                    specs.camera || null,
                    specs.battery || null,
                    specs.connectivity || null,
                    specs.operating_system || null
                  ]
                );
              }

              successCount++;
            } catch (rowError) {
              console.error('Error processing row:', rowError);
              errors.push(`Row ${results.indexOf(row) + 1}: ${rowError.message}`);
              errorCount++;
            }
          }

          connection.end();

          // Clean up uploaded file
          fs.unlinkSync(req.file.path);

          // Render result
          const message = `Upload completed. ${successCount} products imported successfully.`;
          const errorMessage = errorCount > 0 ? `${errorCount} errors occurred.` : null;

          res.render('admin/products-upload', {
            title: 'Upload Products CSV',
            message: message,
            error: errorMessage ? `${errorMessage}\n${errors.join('\n')}` : null,
            path: '/admin/products/upload'
          });

        } catch (error) {
          console.error('Database error:', error);
          fs.unlinkSync(req.file.path);
          res.render('admin/products-upload', {
            title: 'Upload Products CSV',
            error: 'Database error occurred during import',
            path: '/admin/products/upload'
          });
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        fs.unlinkSync(req.file.path);
        res.render('admin/products-upload', {
          title: 'Upload Products CSV',
          error: 'Error parsing CSV file',
          path: '/admin/products/upload'
        });
      });

  } catch (error) {
    console.error('Upload error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.render('admin/products-upload', {
      title: 'Upload Products CSV',
      error: 'Upload failed',
      path: '/admin/products/upload'
    });
  }
});

// Admin orders management
router.get('/orders', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/orders', { title: 'Order Management', path: '/admin/orders' });
});

module.exports = router;
