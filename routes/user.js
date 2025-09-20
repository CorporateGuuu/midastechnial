const express = require('express');
const router = express.Router();

// User profile
router.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('user/profile', { title: 'My Profile' });
});

// User orders
router.get('/orders', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('user/orders', { title: 'My Orders' });
});

// User settings
router.get('/settings', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('user/settings', { title: 'Account Settings' });
});

module.exports = router;
