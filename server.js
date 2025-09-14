const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: https: http:",
    "connect-src 'self'",
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
    'payment=()',
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
const RATE_LIMIT_MAX_REQUESTS = 100; // requests per window

function checkRateLimit(ip) {
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

const server = http.createServer((req, res) => {
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

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
});

server.on('clientError', (err, socket) => {
  console.error('Client error:', err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.listen(port, () => {
  console.log(`🚀 Midas Technical Solutions Server running securely at http://localhost:${port}/`);
  console.log(`🔒 Security features enabled: CSP, HSTS, Rate Limiting, Input Validation`);
  console.log(`📊 Request logging and monitoring active`);
  if (isProduction) {
    console.log(`🔐 Production mode: Enhanced security measures active`);
  }
});
