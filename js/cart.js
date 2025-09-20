/**
 * Real-time Cart functionality with Supabase integration
 * Handles cart management, product validation, and real-time updates
 */

import supabase from './supabase-client.js';

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let users = JSON.parse(localStorage.getItem('users')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let realtimeSubscription = null;

const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const cartIcon = document.querySelector('.cart-count');

// Initialize cart display
async function initCart() {
  // Validate cart items against live data
  await validateCartItems();

  if (cartItemsContainer) {
    displayCartItems();
  }
  if (cartSummaryContainer) {
    displayCartSummary();
  }
  updateCartDisplay();

  // Set up real-time inventory monitoring
  setupRealtimeInventoryMonitoring();
}

/**
 * Validate cart items against live Supabase data
 */
async function validateCartItems() {
  if (cart.length === 0) return;

  try {
    console.log('Validating cart items against live data...');

    // Get all product IDs in cart
    const productIds = cart.map(item => item.id);

    // Fetch current product data from Supabase
    const { data, error } = await supabase
      .from('parts')
      .select('id, name, price, stock_quantity, images, is_active')
      .in('id', productIds);

    if (error) {
      console.error('Error validating cart items:', error);
      return;
    }

    const liveProducts = data || [];
    const productMap = new Map(liveProducts.map(p => [p.id, p]));

    let cartUpdated = false;

    // Validate each cart item
    for (let i = cart.length - 1; i >= 0; i--) {
      const item = cart[i];
      const liveProduct = productMap.get(item.id);

      if (!liveProduct || !liveProduct.is_active) {
        // Product no longer exists or is inactive
        console.log(`Removing ${item.name} from cart - product no longer available`);
        cart.splice(i, 1);
        cartUpdated = true;
        showNotification(`${item.name} is no longer available and has been removed from your cart`, 'warning');
        continue;
      }

      // Check stock availability
      if (liveProduct.stock_quantity < item.quantity) {
        if (liveProduct.stock_quantity === 0) {
          console.log(`Removing ${item.name} from cart - out of stock`);
          cart.splice(i, 1);
          cartUpdated = true;
          showNotification(`${item.name} is out of stock and has been removed from your cart`, 'warning');
        } else {
          console.log(`Reducing quantity of ${item.name} from ${item.quantity} to ${liveProduct.stock_quantity}`);
          item.quantity = liveProduct.stock_quantity;
          cartUpdated = true;
          showNotification(`Quantity of ${item.name} reduced to ${liveProduct.stock_quantity} due to limited stock`, 'info');
        }
      }

      // Update price if changed
      if (liveProduct.price !== item.price) {
        console.log(`Updating price of ${item.name} from $${item.price} to $${liveProduct.price}`);
        item.price = liveProduct.price;
        cartUpdated = true;
        showNotification(`Price of ${item.name} updated to $${liveProduct.price}`, 'info');
      }

      // Update image if available
      if (liveProduct.images && liveProduct.images.length > 0 && liveProduct.images[0] !== item.image) {
        item.image = liveProduct.images[0];
        cartUpdated = true;
      }
    }

    if (cartUpdated) {
      saveCart();
      console.log('Cart updated based on live data validation');
    }

  } catch (error) {
    console.error('Cart validation error:', error);
    showNotification('Unable to validate cart items. Some information may be outdated.', 'warning');
  }
}

/**
 * Set up real-time inventory monitoring for cart items
 */
function setupRealtimeInventoryMonitoring() {
  if (cart.length === 0) return;

  const productIds = cart.map(item => item.id);

  // Subscribe to inventory changes for cart items
  realtimeSubscription = supabase
    .channel('cart_inventory_monitoring')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'parts',
        filter: `id=in.(${productIds.join(',')})`
      },
      (payload) => {
        console.log('Real-time inventory change for cart item:', payload);
        handleRealtimeInventoryUpdate(payload);
      }
    )
    .subscribe((status) => {
      console.log('Cart inventory monitoring subscription status:', status);
    });
}

/**
 * Handle real-time inventory updates for cart items
 */
function handleRealtimeInventoryUpdate(payload) {
  const { new: updatedProduct, old: oldProduct } = payload;

  // Find cart item
  const cartItemIndex = cart.findIndex(item => item.id === updatedProduct.id);
  if (cartItemIndex === -1) return;

  const cartItem = cart[cartItemIndex];

  // Check if stock quantity changed
  if (updatedProduct.stock_quantity !== oldProduct.stock_quantity) {
    if (updatedProduct.stock_quantity === 0) {
      // Product is now out of stock
      cart.splice(cartItemIndex, 1);
      saveCart();
      displayCartItems();
      displayCartSummary();
      updateCartDisplay();
      showNotification(`${cartItem.name} is now out of stock and has been removed from your cart`, 'warning');
    } else if (updatedProduct.stock_quantity < cartItem.quantity) {
      // Insufficient stock
      cartItem.quantity = updatedProduct.stock_quantity;
      saveCart();
      displayCartItems();
      displayCartSummary();
      updateCartDisplay();
      showNotification(`Quantity of ${cartItem.name} reduced to ${updatedProduct.stock_quantity} due to limited stock`, 'warning');
    }
  }

  // Check if price changed
  if (updatedProduct.price !== oldProduct.price) {
    cartItem.price = updatedProduct.price;
    saveCart();
    displayCartItems();
    displayCartSummary();
    showNotification(`Price of ${cartItem.name} updated to $${updatedProduct.price}`, 'info');
  }

  // Check if product became inactive
  if (!updatedProduct.is_active && oldProduct.is_active) {
    cart.splice(cartItemIndex, 1);
    saveCart();
    displayCartItems();
    displayCartSummary();
    updateCartDisplay();
    showNotification(`${cartItem.name} is no longer available and has been removed from your cart`, 'warning');
  }
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
window.addToCart = function(productId, productName, productPrice, productImage = null) {
  const existingItem = cart.find(item => item.id == productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: 1
    });
  }
  saveCart();
  displayCartItems();
  displayCartSummary();
  updateCartDisplay();
  showNotification(`${productName} added to cart!`, 'success');
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
  // Find the item in cart to get its image
  const cartItem = cart.find(item => item.id == productId);
  if (cartItem && cartItem.image) {
    return cartItem.image;
  }

  // Fallback to placeholder if no image available
  return 'https://via.placeholder.com/100x100?text=No+Image';
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

  // Redirect to checkout page
  window.location.href = 'checkout.html';
}

// Notification function
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Make functions global for HTML onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initCart);
