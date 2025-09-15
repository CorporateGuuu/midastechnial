// Product Carousel Functionality
// Fetches real product data from API
let carouselProducts = [];

class ProductCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.indicators = [];
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  async init() {
    await this.loadProducts();
    this.createSlides();
    this.createIndicators();
    this.setupEventListeners();
    this.startAutoPlay();
    this.updateCarousel();
  }

  async loadProducts() {
    try {
      // Fetch featured/popular products from API
      const response = await fetch('api/get-products.php?limit=12');
      const data = await response.json();

      if (data.success && data.data) {
        carouselProducts = data.data;
        console.log('Loaded', carouselProducts.length, 'products for carousel');
      } else {
        console.error('Failed to load carousel products:', data.message);
        // Fallback to some default products
        carouselProducts = this.getFallbackProducts();
      }
    } catch (error) {
      console.error('Error loading carousel products:', error);
      carouselProducts = this.getFallbackProducts();
    }
  }

  getFallbackProducts() {
    return [
      {
        id: 1,
        name: "iPhone 15 Pro Max Screen",
        description: "Premium OLED display replacement for iPhone 15 Pro Max",
        price: 299.99,
        category: "iphone",
        images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"],
        stock_quantity: 15,
        rating: 4.8,
        reviews: 128
      },
      {
        id: 2,
        name: "MacBook Pro 16\" Battery",
        description: "High-capacity lithium-ion battery for MacBook Pro 16\"",
        price: 149.99,
        category: "macbook",
        images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"],
        stock_quantity: 8,
        rating: 4.9,
        reviews: 89
      },
      {
        id: 3,
        name: "Professional Repair Kit",
        description: "Complete toolkit for professional phone and laptop repairs",
        price: 89.99,
        category: "tools",
        images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"],
        stock_quantity: 12,
        rating: 4.9,
        reviews: 203
      }
    ];
  }

  createSlides() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    // Clear existing content
    carouselTrack.innerHTML = '';

    // Group products into slides (3 products per slide on desktop, 1 on mobile)
    const productsPerSlide = window.innerWidth <= 768 ? 1 : 3;
    const totalSlides = Math.ceil(carouselProducts.length / productsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';

      const startIndex = i * productsPerSlide;
      const endIndex = Math.min(startIndex + productsPerSlide, carouselProducts.length);

      for (let j = startIndex; j < endIndex; j++) {
        const product = carouselProducts[j];
        const productCard = this.createProductCard(product);
        slide.appendChild(productCard);
      }

      carouselTrack.appendChild(slide);
      this.slides.push(slide);
    }
  }

  createProductCard(product) {
    const inStock = product.stock_quantity > 0;
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${imageUrl}" alt="${product.name}" loading="lazy">
        <div class="product-badge">${inStock ? 'In Stock' : 'Out of Stock'}</div>
        <div class="product-actions">
          <button class="action-btn wishlist-btn" title="Add to Wishlist">
            <i class="fas fa-heart"></i>
          </button>
          <button class="action-btn quick-view-btn" title="Quick View">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3><a href="pages/product-detail.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-rating">
          <div class="stars">
            ${'★'.repeat(Math.floor(product.rating || 4.5))}${'☆'.repeat(5 - Math.floor(product.rating || 4.5))}
          </div>
          <span class="rating-count">(${product.reviews || 0} reviews)</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-meta">
          <span class="stock-status ${inStock ? 'in-stock' : 'out-of-stock'}">
            ${inStock ? `✓ ${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name.replace(/'/g, "\\'")}" data-price="${product.price}" ${!inStock ? 'disabled' : ''}>
          ${inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    `;

    // Add event listeners to the buttons
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = e.target.dataset.id;
        const productName = e.target.dataset.name;
        const productPrice = e.target.dataset.price;

        // Use the global addToCart function from cart.js
        if (window.addToCart) {
          window.addToCart(productId, productName, productPrice);
        }
      });
    }

    return card;
  }

  createIndicators() {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = '';

    this.slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      indicator.addEventListener('click', () => this.goToSlide(index));
      indicatorsContainer.appendChild(indicator);
      this.indicators.push(indicator);
    });
  }

  setupEventListeners() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
      carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      this.createSlides();
      this.createIndicators();
      this.updateCarousel();
    });
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentSlide = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = index;
    }

    this.updateCarousel();
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }

  updateCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    const translateX = -this.currentSlide * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) {
      prevBtn.disabled = this.slides.length <= 1;
    }

    if (nextBtn) {
      nextBtn.disabled = this.slides.length <= 1;
    }
  }

  startAutoPlay() {
    if (this.slides.length <= 1) return;

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  destroy() {
    this.pauseAutoPlay();
    // Remove event listeners if needed
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if carousel elements exist
  if (document.getElementById('carousel-track')) {
    new ProductCarousel();
  }
});

// Export for potential use in other files
window.ProductCarousel = ProductCarousel;
