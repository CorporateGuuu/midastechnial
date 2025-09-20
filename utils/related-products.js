const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const getRelatedProducts = async (productId, limit = 4) => {
  try {
    // Get the product's category
    const productQuery = `
      SELECT category_id FROM products WHERE id = $1
    `;
    const productResult = await pool.query(productQuery, [productId]);

    if (productResult.rows.length === 0) {
      return [];
    }

    const categoryId = productResult.rows[0].category_id;

    // Get related products from the same category (excluding the current product)
    const relatedQuery = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = $1 AND p.id != $2
      ORDER BY p.created_at DESC
      LIMIT $3
    `;

    const relatedResult = await pool.query(relatedQuery, [categoryId, productId, limit]);
    return relatedResult.rows;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

module.exports = {
  getRelatedProducts
};
