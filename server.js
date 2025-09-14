require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const repairdeskClient = require('./repairdesk-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes

// Products
app.get('/api/products', async (req, res) => {
  try {
    const { category, model, page = 1, limit = 20 } = req.query;
    let query = supabase
      .from('products')
      .select('*, categories(name), models(name)')
      .eq('is_active', true)
      .range((page - 1) * limit, page * limit - 1);

    if (category) query = query.eq('category_id', category);
    if (model) query = query.eq('model_id', model);

    const { data: products, error } = await query;
    if (error) throw error;

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(name), models(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Categories and Models
app.get('/api/categories', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*, models(*)');

    if (error) throw error;
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/models', async (req, res) => {
  try {
    const { category_id } = req.query;
    let query = supabase.from('models').select('*');
    if (category_id) query = query.eq('category_id', category_id);

    const { data: models, error } = await query;
    if (error) throw error;
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cart routes
app.get('/api/cart', async (req, res) => {
  try {
    const userId = req.headers['user-id']; // In production, get from JWT
    const { data: cart, error } = await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', userId);

    if (error) throw error;
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const userId = req.headers['user-id'];

    const { data, error } = await supabase
      .from('cart')
      .upsert([{ user_id: userId, product_id, quantity }], { onConflict: 'user_id,product_id' });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/cart/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.headers['user-id'];

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders routes
app.get('/api/orders', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { items, shipping_address } = req.body;
    const userId = req.headers['user-id'];

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        items,
        total_amount: total,
        shipping_address,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Clear cart after order
    await supabase.from('cart').delete().eq('user_id', userId);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth routes (basic, using Supabase Auth)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tickets (RepairDesk integration)
app.post('/api/tickets', async (req, res) => {
  try {
    const ticketData = req.body;
    const result = await repairdeskClient.createTicket(ticketData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tickets', async (req, res) => {
  try {
    const params = req.query;
    const result = await repairdeskClient.getRepairTickets(params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/iphone-parts', (req, res) => {
  res.sendFile(__dirname + '/iphone-parts.html');
});

app.get('/repair-tools', (req, res) => {
  res.sendFile(__dirname + '/repair-tools.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
