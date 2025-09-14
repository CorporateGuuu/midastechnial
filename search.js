import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co'; // Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ'; // Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const productsList = document.getElementById('products-list');
const cartIcon = document.querySelector('.cart-icon');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

async function loadProducts() {
  try {
    const { data, error } = await supabase
      .from('parts')
      .select('*');

    if (error) {
      productsList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
      return;
    }

    const productsHtml = data.map(product => `
      <div class="product-card">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="product-price">$${product.price}</p>
        <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      </div>
    `).join('');
    productsList.innerHTML = productsHtml;

    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });
  } catch (err) {
    productsList.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

function addToCart(e) {
  const id = e.target.dataset.id;
  const name = e.target.dataset.name;
  const price = parseFloat(e.target.dataset.price);

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  alert(`${name} added to cart!`);
}

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = totalItems > 0 ? `🛒 (${totalItems})` : '🛒';
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }
  searchResults.innerHTML = '<p>Searching...</p>';

  try {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) {
      searchResults.innerHTML = `<p>Error: ${error.message}</p>`;
      return;
    }

    if (data.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
      return;
    }

    const resultsHtml = data.map(item => `
      <div class="search-result-item">
        <h3>${item.name}</h3>
        <p>${item.description || ''}</p>
        <p><strong>Price:</strong> $${item.price || 'N/A'}</p>
        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
      </div>
    `).join('');
    searchResults.innerHTML = resultsHtml;

    // Add event listeners to buttons in search results
    document.querySelectorAll('#search-results .add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

  } catch (err) {
    searchResults.innerHTML = `<p>Error: ${err.message}</p>`;
  }
});

// Load products on page load
loadProducts();
