// Mock product data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max Screen",
    description: "Premium OLED display replacement for iPhone 15 Pro Max",
    price: 299.99,
    category: "iphone",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    inStock: 15,
    rating: 4.8,
    reviews: 128
  },
  {
    id: 2,
    name: "MacBook Pro 16\" Battery",
    description: "High-capacity lithium-ion battery for MacBook Pro 16\"",
    price: 149.99,
    category: "macbook",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    inStock: 8,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "iPhone 15 Battery",
    description: "Original Apple battery replacement for iPhone 15 series",
    price: 79.99,
    category: "iphone",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 25,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Professional Repair Kit",
    description: "Complete toolkit for professional phone and laptop repairs",
    price: 89.99,
    category: "tools",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    inStock: 12,
    rating: 4.9,
    reviews: 203
  },
  {
    id: 5,
    name: "Galaxy S24 Ultra Screen",
    description: "AMOLED display replacement for Samsung Galaxy S24 Ultra",
    price: 199.99,
    category: "samsung",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    inStock: 7,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 6,
    name: "iPhone Camera Module",
    description: "Triple camera system replacement for iPhone 15 series",
    price: 149.99,
    category: "iphone",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
    inStock: 10,
    rating: 4.5,
    reviews: 94
  }
];

// User management
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const productsList = document.getElementById('products-list');
const cartIcon = document.querySelector('.cart-count');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

function loadProducts() {
  if (!productsList) return; // Skip if products list doesn't exist on this page

  const productsHtml = mockProducts.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badge">${product.inStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-rating">
          <div class="stars">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-meta">
          <span class="stock-status ${product.inStock > 0 ? 'in-stock' : 'out-of-stock'}">
            ${product.inStock > 0 ? `✓ ${product.inStock} in stock` : 'Out of stock'}
          </span>
        </div>
        <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" ${product.inStock === 0 ? 'disabled' : ''}>
          ${product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  `).join('');
  productsList.innerHTML = productsHtml;

  // Add event listeners to buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
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
  if (!cartIcon) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = totalItems > 0 ? totalItems : '0';
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  // Search through mock products
  const results = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }

  const resultsHtml = results.map(item => `
    <div class="search-result-item">
      <div class="search-result-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="search-result-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="search-result-meta">
          <span class="price">$${item.price.toFixed(2)}</span>
          <span class="rating">★ ${item.rating} (${item.reviews} reviews)</span>
          <span class="stock ${item.inStock > 0 ? 'in-stock' : 'out-of-stock'}">
            ${item.inStock > 0 ? `${item.inStock} in stock` : 'Out of stock'}
          </span>
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" ${item.inStock === 0 ? 'disabled' : ''}>
          ${item.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  `).join('');
  searchResults.innerHTML = resultsHtml;

  // Add event listeners to buttons in search results
  document.querySelectorAll('#search-results .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
});

// User Management Functions
function registerUser(email, password, name) {
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return { success: false, message: 'User already exists' };
  }

  const newUser = {
    id: Date.now(),
    email,
    password, // In real app, this would be hashed
    name,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, user: newUser };
}

function loginUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: 'Invalid credentials' };
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
}

function getCurrentUser() {
  if (!currentUser) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }
  }
  return currentUser;
}

// Order Management
function createOrder(items, total) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'User not logged in' };

  const order = {
    id: Date.now(),
    userId: user.id,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  return { success: true, order };
}

function getUserOrders() {
  const user = getCurrentUser();
  if (!user) return [];

  return orders.filter(order => order.userId === user.id);
}

// Initialize user session
getCurrentUser();

// Load products on page load
loadProducts();
