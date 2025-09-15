// Enhanced mock product data with more comprehensive search suggestions
const mockProducts = [
  // iPhone Parts
  {
    id: 1,
    name: "iPhone 15 Pro Max Screen",
    description: "Premium OLED display replacement for iPhone 15 Pro Max",
    price: 299.99,
    category: "iPhone 15 Parts",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    inStock: 15,
    rating: 4.8,
    reviews: 128,
    tags: ["OLED", "Display", "Screen", "iPhone 15", "Pro Max"],
    sku: "IPH15PM-OLED-001"
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max Battery",
    description: "High-capacity lithium-ion battery for iPhone 15 Pro Max",
    price: 89.99,
    category: "iPhone 15 Parts",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 25,
    rating: 4.7,
    reviews: 156,
    tags: ["Battery", "Lithium-ion", "iPhone 15", "Pro Max"],
    sku: "IPH15PM-BATT-001"
  },
  {
    id: 3,
    name: "iPhone 15 Pro Screen",
    description: "Super Retina XDR display for iPhone 15 Pro",
    price: 249.99,
    category: "iPhone 15 Parts",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    inStock: 20,
    rating: 4.9,
    reviews: 203,
    tags: ["Display", "Screen", "Retina XDR", "iPhone 15", "Pro"],
    sku: "IPH15P-DISP-001"
  },
  {
    id: 4,
    name: "iPhone 14 Pro Max OLED Display",
    description: "Premium OLED display replacement for iPhone 14 Pro Max",
    price: 279.99,
    category: "iPhone 14 Parts",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    inStock: 18,
    rating: 4.8,
    reviews: 145,
    tags: ["OLED", "Display", "iPhone 14", "Pro Max"],
    sku: "IPH14PM-OLED-001"
  },
  {
    id: 5,
    name: "iPhone 14 Battery Replacement",
    description: "Original Apple battery for iPhone 14 series",
    price: 69.99,
    category: "iPhone 14 Parts",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 30,
    rating: 4.6,
    reviews: 178,
    tags: ["Battery", "iPhone 14", "Original"],
    sku: "IPH14-BATT-001"
  },

  // Samsung Parts
  {
    id: 6,
    name: "Galaxy S24 Ultra AMOLED Screen",
    description: "6.8-inch Dynamic AMOLED 2X display for Galaxy S24 Ultra",
    price: 199.99,
    category: "Samsung Galaxy Parts",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    inStock: 12,
    rating: 4.7,
    reviews: 92,
    tags: ["AMOLED", "Display", "Galaxy S24", "Ultra"],
    sku: "SGS24U-DISP-001"
  },
  {
    id: 7,
    name: "Galaxy S24 Ultra Battery",
    description: "5000mAh battery with fast charging for Galaxy S24 Ultra",
    price: 89.99,
    category: "Samsung Galaxy Parts",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 15,
    rating: 4.8,
    reviews: 156,
    tags: ["Battery", "5000mAh", "Fast Charging", "Galaxy S24", "Ultra"],
    sku: "SGS24U-BATT-001"
  },
  {
    id: 8,
    name: "Galaxy S23 Ultra Screen Protector",
    description: "Tempered glass screen protector for Galaxy S23 Ultra",
    price: 24.99,
    category: "Samsung Galaxy Parts",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    inStock: 40,
    rating: 4.5,
    reviews: 234,
    tags: ["Screen Protector", "Tempered Glass", "Galaxy S23", "Ultra"],
    sku: "SGS23U-PROTECT-001"
  },

  // MacBook Parts
  {
    id: 9,
    name: "MacBook Pro 16\" Retina Display",
    description: "16-inch Liquid Retina XDR display for MacBook Pro",
    price: 599.99,
    category: "MacBook Parts",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    inStock: 5,
    rating: 4.9,
    reviews: 34,
    tags: ["Display", "Retina", "Liquid XDR", "MacBook Pro", "16-inch"],
    sku: "MBP16-DISP-001"
  },
  {
    id: 10,
    name: "MacBook Pro 16\" Battery",
    description: "High-capacity lithium-polymer battery for MacBook Pro 16\"",
    price: 149.99,
    category: "MacBook Parts",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 8,
    rating: 4.6,
    reviews: 67,
    tags: ["Battery", "Lithium-polymer", "MacBook Pro", "16-inch"],
    sku: "MBP16-BATT-001"
  },
  {
    id: 11,
    name: "MacBook Air M2 SSD 512GB",
    description: "512GB SSD upgrade for MacBook Air M2",
    price: 199.99,
    category: "MacBook Parts",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    inStock: 10,
    rating: 4.8,
    reviews: 89,
    tags: ["SSD", "512GB", "MacBook Air", "M2", "Storage"],
    sku: "MBAIR-M2-SSD-512"
  },

  // Repair Tools
  {
    id: 12,
    name: "Professional Repair Toolkit",
    description: "Complete toolkit for professional phone and laptop repairs",
    price: 89.99,
    category: "Repair Tools",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    inStock: 15,
    rating: 4.9,
    reviews: 203,
    tags: ["Toolkit", "Professional", "Repair", "Tools"],
    sku: "TOOLKIT-PRO-001"
  },
  {
    id: 13,
    name: "Precision Screwdriver Set 32-Piece",
    description: "Professional precision screwdriver set with 32 different bits",
    price: 39.99,
    category: "Repair Tools",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    inStock: 25,
    rating: 4.8,
    reviews: 145,
    tags: ["Screwdriver", "Precision", "32-Piece", "Tools"],
    sku: "SCREWDRIVER-32PC"
  },
  {
    id: 14,
    name: "iPhone Opening Tool Kit",
    description: "Specialized tools for opening and repairing iPhone devices",
    price: 29.99,
    category: "Repair Tools",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    inStock: 20,
    rating: 4.7,
    reviews: 178,
    tags: ["iPhone", "Opening Tools", "Repair", "Specialized"],
    sku: "IPHONE-TOOLS-001"
  },

  // iPad Parts
  {
    id: 15,
    name: "iPad Pro 12.9\" LCD Display",
    description: "Ultra Retina XDR display for iPad Pro 12.9-inch",
    price: 399.99,
    category: "iPad Parts",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    inStock: 6,
    rating: 4.7,
    reviews: 56,
    tags: ["LCD", "Display", "iPad Pro", "12.9-inch", "Ultra Retina"],
    sku: "IPADPRO12-DISP-001"
  },
  {
    id: 16,
    name: "iPad Air Battery Replacement",
    description: "High-capacity battery for iPad Air models",
    price: 79.99,
    category: "iPad Parts",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
    inStock: 12,
    rating: 4.6,
    reviews: 89,
    tags: ["Battery", "iPad Air", "High-capacity"],
    sku: "IPADAIR-BATT-001"
  }
];

// Search suggestions data
const searchSuggestions = [
  "iPhone 15",
  "iPhone 14",
  "iPhone 13",
  "Samsung Galaxy",
  "MacBook Pro",
  "MacBook Air",
  "iPad Pro",
  "iPad Air",
  "Battery",
  "Screen",
  "Display",
  "OLED",
  "AMOLED",
  "Camera",
  "Repair Tools",
  "Screwdriver",
  "SSD",
  "Storage",
  "Charging Port",
  "Power Button",
  "Volume Button",
  "Home Button",
  "Face ID",
  "Touch ID",
  "Lightning",
  "USB-C",
  "Wireless",
  "Bluetooth",
  "WiFi",
  "Cellular"
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

// Cart is managed by cart.js - no need to declare it here

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

  // Use the global addToCart function from cart.js if available
  if (window.addToCart) {
    window.addToCart(id, name, price);
  } else {
    // Fallback to local implementation
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
}

function updateCartDisplay() {
  if (!cartIcon) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = totalItems > 0 ? totalItems : '0';
}

// Enhanced search functionality with suggestions
let currentSuggestionIndex = -1;
let suggestions = [];

// Search input event listeners
searchInput.addEventListener('input', handleSearchInput);
searchInput.addEventListener('keydown', handleSearchKeydown);
searchInput.addEventListener('focus', showSearchSuggestions);
searchInput.addEventListener('blur', () => {
  // Delay hiding to allow clicking on suggestions
  setTimeout(() => hideSearchSuggestions(), 150);
});

function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();

  if (query.length === 0) {
    hideSearchSuggestions();
    searchResults.innerHTML = '';
    return;
  }

  if (query.length >= 2) {
    showSearchSuggestions(query);
  } else {
    hideSearchSuggestions();
  }
}

function handleSearchKeydown(e) {
  if (suggestions.length === 0) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, suggestions.length - 1);
      updateSuggestionHighlight();
      break;
    case 'ArrowUp':
      e.preventDefault();
      currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
      updateSuggestionHighlight();
      break;
    case 'Enter':
      e.preventDefault();
      if (currentSuggestionIndex >= 0) {
        selectSuggestion(suggestions[currentSuggestionIndex]);
      } else {
        performSearch();
      }
      break;
    case 'Escape':
      hideSearchSuggestions();
      searchInput.blur();
      break;
  }
}

function showSearchSuggestions(query = '') {
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'search-suggestions';
  suggestionsContainer.id = 'search-suggestions';

  if (!query) {
    // Show popular searches
    suggestions = searchSuggestions.slice(0, 8);
    suggestionsContainer.innerHTML = `
      <div class="suggestions-header">
        <span>Popular Searches</span>
      </div>
      ${suggestions.map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
          <i class="fas fa-search"></i>
          <span>${suggestion}</span>
        </div>
      `).join('')}
    `;
  } else {
    // Show filtered suggestions
    suggestions = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query)
    ).slice(0, 6);

    if (suggestions.length > 0) {
      suggestionsContainer.innerHTML = `
        <div class="suggestions-header">
          <span>Suggestions</span>
        </div>
        ${suggestions.map(suggestion => `
          <div class="suggestion-item" data-suggestion="${suggestion}">
            <i class="fas fa-search"></i>
            <span>${highlightMatch(suggestion, query)}</span>
          </div>
        `).join('')}
      `;
    }
  }

  // Remove existing suggestions
  const existingSuggestions = document.getElementById('search-suggestions');
  if (existingSuggestions) {
    existingSuggestions.remove();
  }

  // Add new suggestions
  if (suggestions.length > 0) {
    searchResults.parentNode.insertBefore(suggestionsContainer, searchResults);

    // Add click listeners to suggestions
    suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const suggestion = item.dataset.suggestion;
        selectSuggestion(suggestion);
      });
    });
  }

  currentSuggestionIndex = -1;
}

function hideSearchSuggestions() {
  const suggestionsContainer = document.getElementById('search-suggestions');
  if (suggestionsContainer) {
    suggestionsContainer.remove();
  }
  suggestions = [];
  currentSuggestionIndex = -1;
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function updateSuggestionHighlight() {
  const suggestionItems = document.querySelectorAll('.suggestion-item');
  suggestionItems.forEach((item, index) => {
    item.classList.toggle('highlighted', index === currentSuggestionIndex);
  });
}

function selectSuggestion(suggestion) {
  searchInput.value = suggestion;
  hideSearchSuggestions();
  performSearch();
}

async function performSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  // Show loading state
  searchResults.innerHTML = '<div class="loading">Searching...</div>';

  try {
    // Fetch from real API
    const response = await fetch(`api/get-products.php?search=${encodeURIComponent(query)}&limit=50`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Search failed');
    }

    const results = data.data || [];

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No results found</h3>
          <p>Try different keywords or check your spelling</p>
          <div class="search-suggestions">
            <p>Popular searches:</p>
            <div class="popular-searches">
              ${searchSuggestions.slice(0, 6).map(suggestion => `
                <button class="popular-search-btn" onclick="searchInput.value='${suggestion}'; performSearch();">
                  ${suggestion}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      return;
    }

    const resultsHtml = `
      <div class="search-results-header">
        <span class="results-count">${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</span>
        <div class="results-sort">
          <select id="results-sort">
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>
      <div class="search-results-grid">
        ${results.map(item => `
          <div class="search-result-item">
            <div class="search-result-image">
              <img src="${item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop'}" alt="${item.name}" loading="lazy">
              <div class="product-badge">${item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div class="search-result-info">
              <h3><a href="pages/product-detail.html?id=${item.id}">${highlightMatch(item.name, query)}</a></h3>
              <p>${item.description}</p>
              <div class="search-result-meta">
                <span class="price">$${item.price.toFixed(2)}</span>
                <span class="rating">
                  <div class="stars">
                    ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
                  </div>
                  (${item.reviews} reviews)
                </span>
                <span class="stock ${item.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                  ${item.stock_quantity > 0 ? `${item.stock_quantity} in stock` : 'Out of stock'}
                </span>
              </div>
              <div class="search-result-tags">
                ${item.tags && item.tags.length > 0 ? item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
              </div>
              <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" ${item.stock_quantity === 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i>
                ${item.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    searchResults.innerHTML = resultsHtml;

    // Add event listeners to buttons in search results
    document.querySelectorAll('#search-results .add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

    // Add sort functionality
    const sortSelect = document.getElementById('results-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortSearchResults(results, e.target.value, query);
      });
    }

  } catch (error) {
    console.error('Search error:', error);
    searchResults.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Search Error</h3>
        <p>Unable to perform search. Please try again later.</p>
      </div>
    `;
  }

  hideSearchSuggestions();
}

function sortSearchResults(results, sortBy, query) {
  switch (sortBy) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => b.id - a.id);
      break;
    default:
      // Keep current relevance sorting
      break;
  }

  // Re-render results
  const resultsGrid = document.querySelector('.search-results-grid');
  if (resultsGrid) {
    resultsGrid.innerHTML = results.map(item => `
      <div class="search-result-item">
        <div class="search-result-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="product-badge">${item.inStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
        </div>
        <div class="search-result-info">
          <h3><a href="pages/product-detail.html?id=${item.id}">${highlightMatch(item.name, query)}</a></h3>
          <p>${item.description}</p>
          <div class="search-result-meta">
            <span class="price">$${item.price.toFixed(2)}</span>
            <span class="rating">
              <div class="stars">
                ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
              </div>
              (${item.reviews} reviews)
            </span>
            <span class="stock ${item.inStock > 0 ? 'in-stock' : 'out-of-stock'}">
              ${item.inStock > 0 ? `${item.inStock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div class="search-result-tags">
            ${item.tags ? item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
          </div>
          <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" ${item.inStock === 0 ? 'disabled' : ''}>
            <i class="fas fa-shopping-cart"></i>
            ${item.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    `).join('');

    // Re-add event listeners
    document.querySelectorAll('#search-results .add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    // Redirect to dedicated search results page
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    const searchUrl = isInPages ?
      `search-results.html?q=${encodeURIComponent(query)}` :
      `pages/search-results.html?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
  }
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
