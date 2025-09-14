// Cart functionality - using global variables from search.js
// Note: cart, users, orders are declared in search.js
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

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
