/**
 * Enhanced Search with Real-time Supabase Integration
 * Loads live product data for search suggestions and results
 */

import supabase from './supabase-client.js';

// Live products cache for search suggestions
let liveProducts = [];

// Search suggestions data - will be enhanced with live product data
let searchSuggestions = [
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

/**
 * Load live products from Supabase for enhanced search suggestions
 */
async function loadLiveProductsForSearch() {
  try {
    console.log('Loading live products for search suggestions...');

    const { data, error } = await supabase
      .from('parts')
      .select('name, category, tags')
      .eq('is_active', true)
      .limit(100);

    if (error) {
      console.error('Error loading live products for search:', error);
      return;
    }

    liveProducts = data || [];

    // Enhance search suggestions with live product data
    const liveSuggestions = new Set();

    liveProducts.forEach(product => {
      // Add product names
      if (product.name) {
        liveSuggestions.add(product.name);
      }

      // Add category-based suggestions
      if (product.category) {
        liveSuggestions.add(product.category);
      }

      // Add tag-based suggestions
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => liveSuggestions.add(tag));
      }
    });

    // Merge with default suggestions
    searchSuggestions = [...new Set([...searchSuggestions, ...Array.from(liveSuggestions)])];

    console.log(`Loaded ${liveProducts.length} live products for search (${searchSuggestions.length} total suggestions)`);

  } catch (error) {
    console.error('Failed to load live products for search:', error);
    // Continue with default suggestions
  }
}

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

/**
 * Load products for display (if products list exists on page)
 * This is mainly for pages that display products directly
 */
async function loadProducts() {
  if (!productsList) return; // Skip if products list doesn't exist on this page

  try {
    // Try to load from Supabase first
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('is_active', true)
      .limit(12)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading products:', error);
      // Fallback to showing a message
      productsList.innerHTML = '<div class="no-products">Unable to load products. Please try again later.</div>';
      return;
    }

    const products = data || [];

    const productsHtml = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop'}" alt="${product.name}" loading="lazy">
          <div class="product-badge">${product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description || ''}</p>
          <div class="product-rating">
            <div class="stars">
              ${'★'.repeat(Math.floor(product.rating || 4.5))}${'☆'.repeat(5 - Math.floor(product.rating || 4.5))}
            </div>
            <span class="rating-count">(${product.reviews || 0} reviews)</span>
          </div>
          <div class="product-price">
            <span class="current-price">$${parseFloat(product.price || 0).toFixed(2)}</span>
          </div>
          <div class="product-meta">
            <span class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
              ${product.stock_quantity > 0 ? `✓ ${product.stock_quantity} in stock` : 'Out of stock'}
            </span>
          </div>
          <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price || 0}" ${product.stock_quantity === 0 ? 'disabled' : ''}>
            ${product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    `).join('');

    productsList.innerHTML = productsHtml;

    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });

  } catch (error) {
    console.error('Failed to load products:', error);
    productsList.innerHTML = '<div class="no-products">Unable to load products. Please try again later.</div>';
  }
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

// Make performSearch globally available for URL parameter handling
window.performSearch = performSearch;

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
    const isAtRoot = currentPath === '/' || currentPath === '/index.html';

    let searchUrl;
    if (isAtRoot) {
      // From root index.html, go to root search.html
      searchUrl = `search.html?q=${encodeURIComponent(query)}`;
    } else if (isInPages) {
      // From pages directory, go to pages/search-results.html
      searchUrl = `search-results.html?q=${encodeURIComponent(query)}`;
    } else {
      // From other root pages, go to root search.html
      searchUrl = `search.html?q=${encodeURIComponent(query)}`;
    }

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

// Load live products for search suggestions and products on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadLiveProductsForSearch();
  await loadProducts();
});
