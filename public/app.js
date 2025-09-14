// Frontend JavaScript for dynamic data fetching
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjEzOTMsImV4cCI6MjA3MzA5NzM5M30.QIa24PO_VhBNZ-Bf47Mi3PoRi_6MtGvhBSnzUouutPo';
const supabase = createClient(supabaseUrl, supabaseKey);

class MidasApp {
  constructor() {
    this.userId = null; // Will be set after login
    this.init();
  }

  init() {
    this.loadProducts();
    this.loadCategories();
    this.setupEventListeners();
    this.setupRealTimeSubscriptions();
  }

  async loadProducts(category = null, model = null) {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (model) params.append('model', model);

      const response = await fetch(`/api/products?${params}`);
      const products = await response.json();

      this.renderProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async loadCategories() {
    try {
      const response = await fetch('/api/categories');
      const categories = await response.json();

      this.renderCategories(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    if (products.length === 0) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image_url || '/images/placeholder.png'}" alt="${product.name}" onerror="this.src='/images/placeholder.png'">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <p class="stock">Stock: ${product.stock_quantity}</p>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      `;
      container.appendChild(productCard);
    });
  }

  renderCategories(categories) {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = '';

    categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.innerHTML = `
        <h3>${category.name}</h3>
        <div class="models">
          ${category.models ? category.models.map(model => `<button class="model-btn" data-category="${category.id}" data-model="${model.id}">${model.name}</button>`).join('') : ''}
        </div>
      `;
      container.appendChild(categoryDiv);
    });
  }

  setupEventListeners() {
    // Category/model filtering
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('model-btn')) {
        const category = e.target.dataset.category;
        const model = e.target.dataset.model;
        this.loadProducts(category, model);
      }
    });

    // Add to cart
    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.productId;
        await this.addToCart(productId);
      }
    });

    // Cart toggle
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    if (cartBtn && cartModal) {
      cartBtn.addEventListener('click', () => {
        cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        this.loadCart();
      });
    }

    // Login toggle
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    if (loginBtn && loginModal) {
      loginBtn.addEventListener('click', () => {
        if (this.userId) {
          this.logout();
          this.updateLoginButton();
        } else {
          loginModal.style.display = 'block';
        }
      });
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await this.login(email, password);
        loginModal.style.display = 'none';
        this.updateLoginButton();
      });
    }
  }

  async addToCart(productId) {
    if (!this.userId) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': this.userId
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
      });

      if (response.ok) {
        alert('Added to cart!');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async loadCart() {
    if (!this.userId) return;

    try {
      const response = await fetch('/api/cart', {
        headers: { 'user-id': this.userId }
      });
      const cart = await response.json();

      this.renderCart(cart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  renderCart(cart) {
    const container = document.getElementById('cart-items');
    if (!container) return;

    container.innerHTML = '';

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <span>${item.products.name}</span>
        <span>Qty: ${item.quantity}</span>
        <span>$${item.products.price * item.quantity}</span>
        <button class="remove-from-cart" data-product-id="${item.product_id}">Remove</button>
      `;
      container.appendChild(itemDiv);
    });
  }

  // Auth methods
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.user) {
        this.userId = data.user.id;
        localStorage.setItem('userId', this.userId);
        alert('Logged in successfully!');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  logout() {
    this.userId = null;
    localStorage.removeItem('userId');
    alert('Logged out');
  }

  setupRealTimeSubscriptions() {
    // Subscribe to product changes
    supabase
      .channel('products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        console.log('Product change:', payload);
        this.loadProducts(); // Reload products on any change
      })
      .subscribe();

    // Subscribe to cart changes for current user
    if (this.userId) {
      supabase
        .channel('cart')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cart', filter: `user_id=eq.${this.userId}` }, (payload) => {
          console.log('Cart change:', payload);
          this.loadCart();
        })
        .subscribe();
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.midasApp = new MidasApp();

  // Check for stored user ID
  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
    window.midasApp.userId = storedUserId;
  }
});
