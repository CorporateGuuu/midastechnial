const express = require('express');
const router = express.Router();

// Admin dashboard
router.get('/', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Admin users management
router.get('/users', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/users', { title: 'User Management' });
});

// Admin products management
router.get('/products', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/products', { title: 'Product Management' });
});

// Admin orders management
router.get('/orders', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/403');
  }
  res.render('admin/orders', { title: 'Order Management' });
});

module.exports = router;
