// Product Carousel Functionality
// Mock product data for carousel (same as in search.js)
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

class ProductCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.indicators = [];
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    this.createSlides();
    this.createIndicators();
    this.setupEventListeners();
    this.startAutoPlay();
    this.updateCarousel();
  }

  createSlides() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    // Clear existing content
    carouselTrack.innerHTML = '';

    // Group products into slides (3 products per slide on desktop, 1 on mobile)
    const productsPerSlide = window.innerWidth <= 768 ? 1 : 3;
    const totalSlides = Math.ceil(mockProducts.length / productsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';

      const startIndex = i * productsPerSlide;
      const endIndex = Math.min(startIndex + productsPerSlide, mockProducts.length);

      for (let j = startIndex; j < endIndex; j++) {
        const product = mockProducts[j];
        const productCard = this.createProductCard(product);
        slide.appendChild(productCard);
      }

      carouselTrack.appendChild(slide);
      this.slides.push(slide);
    }
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-badge">${product.inStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
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
