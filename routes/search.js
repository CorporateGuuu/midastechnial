const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Search page
router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    const category = req.query.category || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (name ILIKE $1 OR description ILIKE $1)';
      params.push(`%${query}%`);
    }

    if (category) {
      sql += ' AND category = $' + (params.length + 1);
      params.push(category);
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);

    res.render('search/results', {
      title: 'Search Results',
      query,
      category,
      products: rows,
      currentPage: page
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Search error');
  }
});

module.exports = router;
