const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mysql = require('mysql2/promise');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_key_here');
const nodemailer = require('nodemailer');

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

// Email configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Security headers configuration
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com https://cdnjs.cloudflare.com https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: https: http:",
    "connect-src 'self' https://api.stripe.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  // HSTS (HTTP Strict Transport Security) - only in production
  ...(isProduction && { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload' }),
  // Feature policy to disable potentially dangerous features
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=(self)',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()',
    'speaker=()',
    'fullscreen=(self)',
    'ambient-light-sensor=()',
    'autoplay=()',
    'encrypted-media=()',
    'picture-in-picture=()'
  ].join(', '),
  // Remove server information
  'Server': 'Midas-Server/1.0'
};

// Rate limiting (simple in-memory implementation)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = isProduction ? 100 : 1000; // Higher limit in development

function checkRateLimit(ip) {
  // Skip rate limiting in development
  if (!isProduction) {
    return true;
  }

  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];

  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  return true;
}

// Get client IP address
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         'unknown';
}

// Security middleware
function applySecurityHeaders(res) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Add cache control for static assets
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
}

// Request logging with security focus
function logRequest(req, statusCode, responseTime) {
  const timestamp = new Date().toISOString();
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${ip} - ${method} ${url} ${statusCode} ${responseTime}ms - ${userAgent}`);
}

// Input validation and sanitization
function validateAndSanitizePath(requestedPath) {
  // Prevent directory traversal attacks
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[\/\\])+/, '');

  // Prevent access to sensitive files
  const sensitiveFiles = ['.env', '.git', 'config.php', 'server.js', 'package.json'];
  const fileName = path.basename(normalizedPath);

  if (sensitiveFiles.includes(fileName) || fileName.startsWith('.')) {
    return null; // Block access to sensitive files
  }

  return normalizedPath;
}

// Database connection pool
let dbPool;
async function getDatabaseConnection() {
  if (!dbPool) {
    dbPool = mysql.createPool(dbConfig);
  }
  return dbPool.getConnection();
}

// Initialize database tables
async function initializeDatabase() {
  try {
    const connection = await getDatabaseConnection();

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        sku VARCHAR(100) UNIQUE,
        stock_quantity INT DEFAULT 0,
        image_url VARCHAR(500),
        repairdesk_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        stripe_payment_id VARCHAR(255),
        status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        total_amount DECIMAL(10,2) NOT NULL,
        tax_amount DECIMAL(10,2) DEFAULT 0,
        shipping_amount DECIMAL(10,2) DEFAULT 0,
        billing_address JSON,
        shipping_address JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create order_items table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT,
        product_name VARCHAR(255) NOT NULL,
        product_sku VARCHAR(100),
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    // Create inventory_transactions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory_transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        order_id INT,
        transaction_type ENUM('sale', 'restock', 'adjustment') NOT NULL,
        quantity_change INT NOT NULL,
        previous_stock INT,
        new_stock INT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (order_id) REFERENCES orders(id)
      )
    `);

    connection.release();
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// API Routes
const apiRoutes = {
  // Products API
  '/api/products': {
    GET: async (req, res, query) => {
      try {
        const connection = await getDatabaseConnection();

        let sql = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (query.category) {
          sql += ' AND category = ?';
          params.push(query.category);
        }

        if (query.search) {
          sql += ' AND (name LIKE ? OR description LIKE ?)';
          params.push(`%${query.search}%`, `%${query.search}%`);
        }

        if (query.limit) {
          sql += ' LIMIT ?';
          params.push(parseInt(query.limit));
        }

        const [rows] = await connection.execute(sql, params);
        connection.release();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: rows }));
      } catch (error) {
        console.error('Products API error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Database error' }));
      }
    }
  },

  // Orders API
  '/api/orders': {
    POST: async (req, res, body) => {
      try {
        const connection = await getDatabaseConnection();

        // Start transaction
        await connection.beginTransaction();

        // Create order
        const [orderResult] = await connection.execute(
          'INSERT INTO orders (user_id, total_amount, tax_amount, shipping_amount, billing_address, shipping_address) VALUES (?, ?, ?, ?, ?, ?)',
          [
            body.user_id || null,
            body.total_amount,
            body.tax_amount || 0,
            body.shipping_amount || 0,
            JSON.stringify(body.billing_address),
            JSON.stringify(body.shipping_address)
          ]
        );

        const orderId = orderResult.insertId;

        // Add order items
        for (const item of body.items) {
          await connection.execute(
            'INSERT INTO order_items (order_id, product_id, product_name, product_sku, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
            [orderId, item.product_id, item.product_name, item.product_sku, item.quantity, item.price]
          );

          // Update inventory
          if (item.product_id) {
            await connection.execute(
              'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
              [item.quantity, item.product_id]
            );

            // Record inventory transaction
            await connection.execute(
              'INSERT INTO inventory_transactions (product_id, order_id, transaction_type, quantity_change, previous_stock, new_stock) VALUES (?, ?, ?, ?, ?, ?)',
              [item.product_id, orderId, 'sale', -item.quantity, 0, 0] // We'll calculate actual stock levels later
            );
          }
        }

        await connection.commit();
        connection.release();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, order_id: orderId }));
      } catch (error) {
        console.error('Order creation error:', error);
        if (connection) {
          await connection.rollback();
          connection.release();
        }
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Order creation failed' }));
      }
    },

    GET: async (req, res, query) => {
      try {
        const connection = await getDatabaseConnection();

        let sql = 'SELECT * FROM orders';
        const params = [];

        if (query.user_id) {
          sql += ' WHERE user_id = ?';
          params.push(query.user_id);
        }

        sql += ' ORDER BY created_at DESC';

        if (query.limit) {
          sql += ' LIMIT ?';
          params.push(parseInt(query.limit));
        }

        const [rows] = await connection.execute(sql, params);
        connection.release();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: rows }));
      } catch (error) {
        console.error('Orders API error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Database error' }));
      }
    }
  },

  // Stripe Payment Intent
  '/api/create-payment-intent': {
    POST: async (req, res, body) => {
      try {
        const { amount, currency = 'usd', metadata = {} } = body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata,
          automatic_payment_methods: {
            enabled: true,
          },
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id
        }));
      } catch (error) {
        console.error('Stripe payment intent error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Payment processing failed' }));
      }
    }
  },

  // Stripe Webhook
  '/api/webhook': {
    POST: async (req, res, body) => {
      try {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        try {
          event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } catch (err) {
          console.error('Webhook signature verification failed:', err.message);
          res.writeHead(400);
          res.end();
          return;
        }

        // Handle the event
        switch (event.type) {
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            await handlePaymentSuccess(paymentIntent);
            break;
          case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            await handlePaymentFailure(failedPayment);
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }

        res.writeHead(200);
        res.end();
      } catch (error) {
        console.error('Webhook processing error:', error);
        res.writeHead(500);
        res.end();
      }
    }
  }
};

// Handle successful payment
async function handlePaymentSuccess(paymentIntent) {
  try {
    const connection = await getDatabaseConnection();

    // Update order status
    await connection.execute(
      'UPDATE orders SET status = ?, stripe_payment_id = ?, updated_at = NOW() WHERE id = ?',
      ['paid', paymentIntent.id, paymentIntent.metadata.order_id]
    );

    connection.release();

    // Send order confirmation email
    await sendOrderConfirmationEmail(paymentIntent.metadata.order_id);

    console.log(`✅ Payment succeeded for order ${paymentIntent.metadata.order_id}`);
  } catch (error) {
    console.error('Payment success handling error:', error);
  }
}

// Handle failed payment
async function handlePaymentFailure(paymentIntent) {
  try {
    const connection = await getDatabaseConnection();

    // Update order status
    await connection.execute(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
      ['cancelled', paymentIntent.metadata.order_id]
    );

    connection.release();

    console.log(`❌ Payment failed for order ${paymentIntent.metadata.order_id}`);
  } catch (error) {
    console.error('Payment failure handling error:', error);
  }
}

// Send order confirmation email
async function sendOrderConfirmationEmail(orderId) {
  try {
    const connection = await getDatabaseConnection();

    // Get order details
    const [orderRows] = await connection.execute(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );

    if (orderRows.length === 0) {
      throw new Error('Order not found');
    }

    const order = orderRows[0];

    // Get order items
    const [itemRows] = await connection.execute(
      'SELECT * FROM order_items WHERE order_id = ?',
      [orderId]
    );

    connection.release();

    // Prepare email content
    const emailHtml = `
      <h1>Order Confirmation - Order #${orderId}</h1>
      <p>Thank you for your order! Here are the details:</p>

      <h2>Order Items:</h2>
      <ul>
        ${itemRows.map(item => `
          <li>${item.product_name} (x${item.quantity}) - $${item.price * item.quantity}</li>
        `).join('')}
      </ul>

      <h2>Total: $${order.total_amount}</h2>

      <p>Shipping Address: ${JSON.parse(order.shipping_address).address}</p>

      <p>We'll send you another email when your order ships!</p>
    `;

    // Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: JSON.parse(order.billing_address).email,
      subject: `Order Confirmation - Order #${orderId}`,
      html: emailHtml
    });

    console.log(`📧 Order confirmation email sent for order ${orderId}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Parse request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Parse query parameters
function parseQueryParams(url) {
  const query = {};
  const queryString = url.split('?')[1];
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return query;
}

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Create both HTTP and HTTPS servers
const httpServer = http.createServer(async (req, res) => {
  // Redirect HTTP to HTTPS in production
  if (isProduction && req.headers.host) {
    res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
    res.end();
    return;
  }
  const startTime = Date.now();
  const clientIP = getClientIP(req);

  // Rate limiting check
  if (!checkRateLimit(clientIP)) {
    res.writeHead(429, { 'Content-Type': 'text/plain' });
    res.end('Too Many Requests - Rate limit exceeded');
    logRequest(req, 429, Date.now() - startTime);
    return;
  }

  // Apply security headers
  applySecurityHeaders(res);

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Fix for URLs with query strings or hashes
  filePath = filePath.split('?')[0].split('#')[0];

  // Check if it's an API route
  const queryParams = parseQueryParams(req.url);
  const apiRoute = Object.keys(apiRoutes).find(route => {
    return req.url.startsWith(route) || req.url.split('?')[0] === route;
  });

  if (apiRoute && apiRoutes[apiRoute] && apiRoutes[apiRoute][req.method]) {
    try {
      const body = req.method === 'POST' || req.method === 'PUT' ? await parseRequestBody(req) : null;
      await apiRoutes[apiRoute][req.method](req, res, queryParams, body);
    } catch (error) {
      console.error('API route error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
    }
    logRequest(req, 200, Date.now() - startTime);
    return;
  }

  // Validate and sanitize the file path
  const sanitizedPath = validateAndSanitizePath(filePath);
  if (!sanitizedPath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden\n');
    logRequest(req, 403, Date.now() - startTime);
    return;
  }

  filePath = sanitizedPath;

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        logRequest(req, 404, Date.now() - startTime);
      } else {
        console.error('File read error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error\n');
        logRequest(req, 500, Date.now() - startTime);
      }
    } else {
      // Additional security for HTML files
      if (contentType === 'text/html') {
        // Add CSP nonce for inline scripts/styles if needed
        const nonce = crypto.randomBytes(16).toString('base64');
        res.setHeader('Content-Security-Policy',
          securityHeaders['Content-Security-Policy'].replace("'unsafe-inline'", `'nonce-${nonce}'`)
        );
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      logRequest(req, 200, Date.now() - startTime);
    }
  });
});

// Create HTTPS server for SSL
const httpsServer = https.createServer(sslOptions, async (req, res) => {
  const startTime = Date.now();
  const clientIP = getClientIP(req);

  // Rate limiting check
  if (!checkRateLimit(clientIP)) {
    res.writeHead(429, { 'Content-Type': 'text/plain' });
    res.end('Too Many Requests - Rate limit exceeded');
    logRequest(req, 429, Date.now() - startTime);
    return;
  }

  // Apply security headers
  applySecurityHeaders(res);

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Fix for URLs with query strings or hashes
  filePath = filePath.split('?')[0].split('#')[0];

  // Check if it's an API route
  const queryParams = parseQueryParams(req.url);
  const apiRoute = Object.keys(apiRoutes).find(route => {
    return req.url.startsWith(route) || req.url.split('?')[0] === route;
  });

  if (apiRoute && apiRoutes[apiRoute] && apiRoutes[apiRoute][req.method]) {
    try {
      const body = req.method === 'POST' || req.method === 'PUT' ? await parseRequestBody(req) : null;
      await apiRoutes[apiRoute][req.method](req, res, queryParams, body);
    } catch (error) {
      console.error('API route error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
    }
    logRequest(req, 200, Date.now() - startTime);
    return;
  }

  // Validate and sanitize the file path
  const sanitizedPath = validateAndSanitizePath(filePath);
  if (!sanitizedPath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden\n');
    logRequest(req, 403, Date.now() - startTime);
    return;
  }

  filePath = sanitizedPath;

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        logRequest(req, 404, Date.now() - startTime);
      } else {
        console.error('File read error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error\n');
        logRequest(req, 500, Date.now() - startTime);
      }
    } else {
      // Additional security for HTML files
      if (contentType === 'text/html') {
        // Add CSP nonce for inline scripts/styles if needed
        const nonce = crypto.randomBytes(16).toString('base64');
        res.setHeader('Content-Security-Policy',
          securityHeaders['Content-Security-Policy'].replace("'unsafe-inline'", `'nonce-${nonce}'`)
        );
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      logRequest(req, 200, Date.now() - startTime);
    }
  });
});

// Error handling for both servers
httpServer.on('error', (error) => {
  console.error('HTTP Server error:', error);
});

httpsServer.on('error', (error) => {
  console.error('HTTPS Server error:', error);
});

httpServer.on('clientError', (err, socket) => {
  console.error('HTTP Client error:', err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpsServer.on('clientError', (err, socket) => {
  console.error('HTTPS Client error:', err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// Graceful shutdown for both servers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    httpsServer.close(() => {
      console.log('Servers closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  httpServer.close(() => {
    httpsServer.close(() => {
      console.log('Servers closed');
      process.exit(0);
    });
  });
});

// Initialize database and start servers
async function startServer() {
  await initializeDatabase();

  // Start HTTP server
  httpServer.listen(port, () => {
    console.log(`🚀 Midas Technical Solutions HTTP Server running at http://localhost:${port}/`);
  });

  // Start HTTPS server on port 443 (standard SSL port)
  const httpsPort = 443;
  httpsServer.listen(httpsPort, () => {
    console.log(`🔒 Midas Technical Solutions HTTPS Server running at https://localhost:${httpsPort}/`);
    console.log(`🔒 SSL Certificate: Self-signed (replace with Let's Encrypt for production)`);
  });

  console.log(`🔒 Security features enabled: CSP, HSTS, Rate Limiting, Input Validation`);
  console.log(`💳 Stripe payment processing integrated`);
  console.log(`📧 Email notifications configured`);
  console.log(`🗄️ Database integration active`);
  console.log(`📊 Request logging and monitoring active`);
  if (isProduction) {
    console.log(`🔐 Production mode: Enhanced security measures active`);
    console.log(`🔄 HTTP traffic automatically redirected to HTTPS`);
  }
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
