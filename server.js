const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const compression = require('compression');
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_key_here');
const {
  csrfProtection,
  apiLimiter,
  loginLimiter,
  registerLimiter,
  securityHeaders,
  handleCsrfError
} = require('./middleware/security');
const { sendOrderConfirmationEmail } = require('./utils/email-service');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'your_supabase_url_here';
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'your_supabase_key_here';
const supabase = createClient(supabaseUrl, supabaseKey);



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

// Initialize Supabase connection
async function initializeDatabase() {
  try {
    console.log('✅ Supabase connection initialized');
    console.log(`📍 Supabase URL: ${supabaseUrl}`);
  } catch (error) {
    console.error('❌ Supabase initialization error:', error);
  }
}

// API Routes
const apiRoutes = {
  // Products API
  '/api/products': {
    GET: async (req, res, query) => {
      try {
        let queryBuilder = supabase
          .from('mdts.products')
          .select(`
            *,
            mdts.categories (
              name,
              slug
            ),
            mdts.brands (
              name,
              slug
            )
          `);

        // Apply filters
        if (query.category) {
          queryBuilder = queryBuilder.eq('category_id', query.category);
        }

        if (query.search) {
          queryBuilder = queryBuilder.or(`name.ilike.%${query.search}%,description.ilike.%${query.search}%`);
        }

        if (query.min_price) {
          queryBuilder = queryBuilder.gte('price', parseFloat(query.min_price));
        }

        if (query.max_price) {
          queryBuilder = queryBuilder.lte('price', parseFloat(query.max_price));
        }

        if (query.brand) {
          queryBuilder = queryBuilder.eq('brand_id', query.brand);
        }

        // Apply sorting
        if (query.sort) {
          switch (query.sort) {
            case 'price-low':
              queryBuilder = queryBuilder.order('price', { ascending: true });
              break;
            case 'price-high':
              queryBuilder = queryBuilder.order('price', { ascending: false });
              break;
            case 'newest':
              queryBuilder = queryBuilder.order('created_at', { ascending: false });
              break;
            case 'featured':
            default:
              queryBuilder = queryBuilder.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
              break;
          }
        } else {
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
        }

        // Apply limit
        if (query.limit) {
          queryBuilder = queryBuilder.limit(parseInt(query.limit));
        }

        const { data, error } = await queryBuilder;

        if (error) {
          throw error;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: data || [] }));
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
        // Create order
        const { data: orderData, error: orderError } = await supabase
          .from('mdts.orders')
          .insert({
            user_id: body.user_id || null,
            total_amount: body.total_amount,
            tax_amount: body.tax_amount || 0,
            shipping_amount: body.shipping_amount || 0,
            billing_address: body.billing_address,
            shipping_address: body.shipping_address,
            status: 'pending'
          })
          .select()
          .single();

        if (orderError) {
          throw orderError;
        }

        const orderId = orderData.id;

        // Add order items
        const orderItems = body.items.map(item => ({
          order_id: orderId,
          product_id: item.product_id,
          product_name: item.product_name,
          product_sku: item.product_sku,
          quantity: item.quantity,
          price: item.price
        }));

        const { error: itemsError } = await supabase
          .from('mdts.order_items')
          .insert(orderItems);

        if (itemsError) {
          throw itemsError;
        }

        // Update inventory for each item
        for (const item of body.items) {
          if (item.product_id) {
            const { error: updateError } = await supabase
              .from('mdts.products')
              .update({
                stock_quantity: supabase.raw('stock_quantity - ?', [item.quantity])
              })
              .eq('id', item.product_id);

            if (updateError) {
              console.error('Inventory update error:', updateError);
            }
          }
        }

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, order_id: orderId }));
      } catch (error) {
        console.error('Order creation error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Order creation failed' }));
      }
    },

    GET: async (req, res, query) => {
      try {
        let queryBuilder = supabase
          .from('mdts.orders')
          .select(`
            *,
            mdts.order_items (
              *,
              mdts.products (
                name,
                sku
              )
            )
          `);

        if (query.user_id) {
          queryBuilder = queryBuilder.eq('user_id', query.user_id);
        }

        queryBuilder = queryBuilder.order('created_at', { ascending: false });

        if (query.limit) {
          queryBuilder = queryBuilder.limit(parseInt(query.limit));
        }

        const { data, error } = await queryBuilder;

        if (error) {
          throw error;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: data || [] }));
      } catch (error) {
        console.error('Orders API error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Database error' }));
      }
    }
  },

  // Categories API
  '/api/categories': {
    GET: async (req, res, query) => {
      try {
        let queryBuilder = supabase
          .from('mdts.categories')
          .select('*')
          .order('name');

        const { data, error } = await queryBuilder;

        if (error) {
          throw error;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: data || [] }));
      } catch (error) {
        console.error('Categories API error:', error);
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
    // Update order status in Supabase
    const { error } = await supabase
      .from('mdts.orders')
      .update({
        status: 'paid',
        payment_status: 'paid',
        payment_method: 'stripe',
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentIntent.metadata.order_id);

    if (error) {
      throw error;
    }

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
    // Update order status in Supabase
    const { error } = await supabase
      .from('mdts.orders')
      .update({
        status: 'cancelled',
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentIntent.metadata.order_id);

    if (error) {
      throw error;
    }

    console.log(`❌ Payment failed for order ${paymentIntent.metadata.order_id}`);
  } catch (error) {
    console.error('Payment failure handling error:', error);
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

// Create Express app
const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Middleware
app.use(compression()); // Compress all responses
app.use(securityHeaders); // Apply security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Session configuration
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    httpOnly: true, // Prevent JavaScript access to cookies
    sameSite: 'strict' // Prevent CSRF attacks
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAuthenticated = !!req.session.userId;
  res.locals.isAdmin = !!req.session.isAdmin;
  res.locals.path = req.path;
  next();
});

// Import utilities
const { getCachedData, cacheData } = require('./utils/cache');
const { getRelatedProducts } = require('./utils/related-products');

// Import routes

// Home page - serve static HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Products page - serve static HTML
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/products/:slug', (req, res) => {
  res.send(`<h1>Product: ${req.params.slug}</h1><p>This product page will be implemented soon.</p><a href="/">Back to Home</a>`);
});

app.get('/categories', (req, res) => {
  res.send('<h1>Categories Page</h1><p>This page will be implemented soon.</p><a href="/">Back to Home</a>');
});

app.get('/categories/:slug', (req, res) => {
  res.send(`<h1>Category: ${req.params.slug}</h1><p>This category page will be implemented soon.</p><a href="/">Back to Home</a>`);
});

// Register routes
// app.use('/', authRoutes);
// app.use('/user', userRoutes);
// app.use('/cart', cartRoutes);
// app.use('/search', searchRoutes);
// app.use('/api/cart', apiCartRoutes);
// app.use('/api/checkout', apiCheckoutRoutes);
// app.use('/api/reviews', apiReviewsRoutes);
// app.use('/api/wishlist', apiWishlistRoutes);

// Admin routes removed

// CSRF error handler
app.use(handleCsrfError);

// 403 page
app.use('/403', (req, res) => {
  res.status(403).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Access Denied</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #666; }
      </style>
    </head>
    <body>
      <h1>403 - Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/">Go Home</a>
    </body>
    </html>
  `);
});

// 404 page
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Page Not Found</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #666; }
      </style>
    </head>
    <body>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go Home</a>
    </body>
    </html>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server Error</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #666; }
      </style>
    </head>
    <body>
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end. Please try again later.</p>
      <a href="/">Go Home</a>
    </body>
    </html>
  `);
});

// Create session table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
  )
`).catch(err => {
  console.error('Error creating session table:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Midas Technical Solutions Server running at http://localhost:${port}/`);
  console.log(`🔒 Security features enabled: CSP, HSTS, Rate Limiting, Input Validation`);
  console.log(`💳 Stripe payment processing integrated`);
  console.log(`📧 Email notifications configured`);
  console.log(`🗄️ Database integration active`);
  console.log(`📊 Request logging and monitoring active`);
  if (isProduction) {
    console.log(`🔐 Production mode: Enhanced security measures active`);
  }
});
