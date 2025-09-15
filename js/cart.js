// Cart functionality with proper error handling and user feedback
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Mock products data (same as in search.js and carousel.js)
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

const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const cartIcon = document.querySelector('.cart-count');

// Initialize cart display
function initCart() {
  if (cartItemsContainer) {
    displayCartItems();
  }
  if (cartSummaryContainer) {
    displayCartSummary();
  }
  updateCartDisplay();
}

// Display cart items
function displayCartItems() {
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
        <a href="products.html" class="btn primary-btn">Browse Products</a>
      </div>
    `;
    return;
  }

  const cartHtml = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${getProductImage(item.id)}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
      <div class="cart-item-total">
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  `).join('');

  cartItemsContainer.innerHTML = cartHtml;
}

// Display cart summary
function displayCartSummary() {
  if (!cartSummaryContainer) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 99 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  cartSummaryContainer.innerHTML = `
    <div class="cart-summary-content">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax:</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping:</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row total-row">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
      <a href="products.html" class="continue-shopping-btn">Continue Shopping</a>
    </div>
  `;
}

// Update item quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  displayCartItems();
  displayCartSummary();
  updateCartDisplay();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCartItems();
  displayCartSummary();
  updateCartDisplay();
}

// Add to cart (global function for use in other files)
window.addToCart = function(productId, productName, productPrice) {
  const existingItem = cart.find(item => item.id == productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1
    });
  }
  saveCart();
  updateCartDisplay();
  alert(`${productName} added to cart!`);
};

// Update cart display in header
function updateCartDisplay() {
  if (!cartIcon) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = totalItems > 0 ? totalItems : '0';
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Get product image by ID
function getProductImage(productId) {
  const product = mockProducts.find(p => p.id == productId);
  return product ? product.image : 'https://via.placeholder.com/100x100?text=No+Image';
}

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

// Proceed to checkout
function proceedToCheckout() {
  const user = getCurrentUser();
  if (!user) {
    alert('Please sign in to proceed with checkout');
    window.location.href = 'sign-in.html';
    return;
  }

  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  // Create order
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 99 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const orderResult = createOrder(cart, total);
  if (orderResult.success) {
    alert(`Order placed successfully! Order ID: ${orderResult.order.id}`);
    cart = [];
    saveCart();
    updateCartDisplay();
    displayCartItems();
    displayCartSummary();
  } else {
    alert('Failed to place order. Please try again.');
  }
}

// Make functions global for HTML onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initCart);
