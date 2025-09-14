/**
 * Product Detail Page JavaScript
 * Handles product data loading, gallery, and interactions
 */

class ProductDetailManager {
    constructor() {
        this.productId = null;
        this.productData = null;
        this.relatedProducts = [];
        this.recentlyViewed = [];
        this.currentImageIndex = 0;

        this.init();
    }

    init() {
        this.getProductIdFromUrl();
        this.loadProductData();
        this.setupEventListeners();
        this.loadRecentlyViewed();
    }

    getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');

        if (!this.productId) {
            this.showError('Product ID not found in URL');
            return;
        }
    }

    async loadProductData() {
        try {
            // Show loading state
            this.showLoading();

            // Load product data from Supabase
            const productData = await this.fetchProductFromSupabase(this.productId);

            if (!productData) {
                this.showError('Product not found');
                return;
            }

            this.productData = productData;
            this.displayProductData();
            this.loadRelatedProducts();
            this.addToRecentlyViewed();

        } catch (error) {
            console.error('Error loading product data:', error);
            this.showError('Failed to load product data');
        } finally {
            this.hideLoading();
        }
    }

    async fetchProductFromSupabase(productId) {
        // For now, we'll use mock data since Supabase isn't set up yet
        // In production, this would fetch from Supabase
        const mockProducts = this.getMockProducts();
        return mockProducts.find(product => product.id == productId);
    }

    getMockProducts() {
        return [
            {
                id: 1,
                name: "OLED Assembly For iPhone 13 (Genuine OEM)",
                description: "Quality Apple Genuine OLED Assembly For iPhone 13 - Genuine OEM Part. Premium quality display assembly with advanced OLED technology for crystal clear visuals.",
                price: 277.25,
                category: "iPhone 13 Parts",
                stock_quantity: 10,
                sku: "IPA13-OLED-GEN",
                manufacturer: "Apple Inc.",
                model: "iPhone 13",
                compatibility: ["iPhone 13"],
                warranty_period: 12,
                weight_grams: 45,
                dimensions_cm: "15x8x0.5",
                images: [
                    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&h=600&fit=crop"
                ],
                features: [
                    "Genuine Apple OEM Part",
                    "Advanced OLED Technology",
                    "Crystal Clear Display",
                    "Perfect Fit Guarantee",
                    "1 Year Warranty"
                ]
            },
            {
                id: 2,
                name: "Replacement Battery With Adhesive For iPhone 13 (Genuine OEM)",
                description: "Quality Apple Genuine Replacement Battery With Adhesive For iPhone 13 - Genuine OEM Part. High-capacity lithium-ion battery with adhesive backing for easy installation.",
                price: 49.74,
                category: "iPhone 13 Parts",
                stock_quantity: 25,
                sku: "IPA13-BATT-GEN",
                manufacturer: "Apple Inc.",
                model: "iPhone 13",
                compatibility: ["iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
                warranty_period: 12,
                weight_grams: 18,
                dimensions_cm: "8x5x0.3",
                images: [
                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1609592806500-3c04b8cd19d0?w=600&h=600&fit=crop"
                ],
                features: [
                    "Genuine Apple OEM Battery",
                    "High Capacity Lithium-ion",
                    "Pre-installed Adhesive",
                    "Easy Installation",
                    "6 Month Warranty"
                ]
            },
            {
                id: 3,
                name: "Front Camera For iPhone 13 (Genuine OEM)",
                description: "Quality Apple Genuine Front Camera For iPhone 13 - Genuine OEM Part. Advanced 12MP front camera with TrueDepth technology for Face ID and selfies.",
                price: 154.52,
                category: "iPhone 13 Parts",
                stock_quantity: 15,
                sku: "IPA13-FCAM-GEN",
                manufacturer: "Apple Inc.",
                model: "iPhone 13",
                compatibility: ["iPhone 13", "iPhone 13 Pro"],
                warranty_period: 12,
                weight_grams: 8,
                dimensions_cm: "3x2x0.5",
                images: [
                    "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop"
                ],
                features: [
                    "Genuine Apple OEM Camera",
                    "12MP TrueDepth Technology",
                    "Face ID Compatible",
                    "4K Video Recording",
                    "Night Mode Support"
                ]
            }
        ];
    }

    displayProductData() {
        if (!this.productData) return;

        const product = this.productData;

        // Update page title and meta
        document.title = `${product.name} - Midas Technical Solutions`;
        document.getElementById('product-title').content = `${product.name} - Product Details`;

        // Update product information
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-sku').textContent = `SKU: ${product.sku}`;
        document.getElementById('product-category').textContent = `Category: ${product.category}`;

        // Update stock information
        this.updateStockStatus(product.stock_quantity);

        // Update specifications
        this.updateSpecifications(product);

        // Update features
        this.updateFeatures(product.features);

        // Update images
        this.updateProductImages(product.images);

        // Update breadcrumbs
        this.updateBreadcrumbs(product);

        // Update warranty badge
        document.getElementById('warranty-badge').textContent = `${product.warranty_period} Month Warranty`;
    }

    updateStockStatus(stockQuantity) {
        const stockStatus = document.getElementById('stock-status');
        const stockText = document.getElementById('stock-text');
        const stockQuantityEl = document.getElementById('stock-quantity');

        if (stockQuantity > 10) {
            stockStatus.className = 'stock-status in-stock';
            stockText.textContent = 'In Stock';
            stockQuantityEl.textContent = `${stockQuantity}+ available`;
        } else if (stockQuantity > 0) {
            stockStatus.className = 'stock-status low-stock';
            stockText.textContent = 'Low Stock';
            stockQuantityEl.textContent = `Only ${stockQuantity} left`;
        } else {
            stockStatus.className = 'stock-status out-of-stock';
            stockText.textContent = 'Out of Stock';
            stockQuantityEl.textContent = 'Currently unavailable';
        }
    }

    updateSpecifications(product) {
        document.getElementById('spec-manufacturer').textContent = product.manufacturer || 'Apple Inc.';
        document.getElementById('spec-model').textContent = product.model || 'N/A';
        document.getElementById('spec-weight').textContent = product.weight_grams ? `${product.weight_grams}g` : 'N/A';
        document.getElementById('spec-dimensions').textContent = product.dimensions_cm || 'N/A';
        document.getElementById('spec-warranty').textContent = `${product.warranty_period} months`;
        document.getElementById('spec-compatibility').textContent = product.compatibility ? product.compatibility.join(', ') : 'N/A';
    }

    updateFeatures(features) {
        const featuresList = document.getElementById('product-features-list');
        featuresList.innerHTML = '';

        if (features && features.length > 0) {
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Premium quality genuine OEM part';
            featuresList.appendChild(li);
        }
    }

    updateProductImages(images) {
        if (!images || images.length === 0) {
            // Use default image
            images = ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop'];
        }

        // Update main image
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = images[0];
        mainImage.alt = this.productData.name;

        // Update thumbnails
        const thumbnailGallery = document.getElementById('thumbnail-gallery');
        thumbnailGallery.innerHTML = '';

        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${this.productData.name} - View ${index + 1}`;
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.addEventListener('click', () => this.changeMainImage(index));
            thumbnailGallery.appendChild(thumbnail);
        });
    }

    updateBreadcrumbs(product) {
        document.getElementById('breadcrumb-category').textContent = product.category;
        document.getElementById('breadcrumb-product').textContent = product.name;
    }

    changeMainImage(index) {
        if (!this.productData.images || index >= this.productData.images.length) return;

        const mainImage = document.getElementById('main-product-image');
        mainImage.src = this.productData.images[index];

        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        this.currentImageIndex = index;
    }

    async loadRelatedProducts() {
        try {
            // Get products from same category
            const relatedProducts = await this.fetchRelatedProducts(this.productData.category, this.productData.id);
            this.displayRelatedProducts(relatedProducts);
        } catch (error) {
            console.error('Error loading related products:', error);
        }
    }

    async fetchRelatedProducts(category, excludeId) {
        // Mock related products - in production this would come from Supabase
        const allProducts = this.getMockProducts();
        return allProducts
            .filter(product => product.category === category && product.id !== excludeId)
            .slice(0, 4);
    }

    displayRelatedProducts(products) {
        const container = document.getElementById('related-products');
        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = '<p>No related products found.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = this.createProductCard(product, 'related');
            container.appendChild(productCard);
        });
    }

    createProductCard(product, type = 'related') {
        const card = document.createElement('div');
        card.className = 'product-card animate-on-scroll';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.images ? product.images[0] : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop'}"
                     alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view-btn" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-rating">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span class="rating-count">(4.8)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                </div>
                <div class="product-stock">
                    <span class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        const quickViewBtn = card.querySelector('.quick-view-btn');

        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.addToCart(product);
        });

        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `product-detail.html?id=${product.id}`;
            });
        }

        return card;
    }

    loadRecentlyViewed() {
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        this.displayRecentlyViewed(recentlyViewed);
    }

    displayRecentlyViewed(products) {
        const container = document.getElementById('recently-viewed');
        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = '<p>No recently viewed products.</p>';
            return;
        }

        // Show last 4 viewed products
        const recentProducts = products.slice(-4).reverse();

        recentProducts.forEach(product => {
            const productCard = this.createProductCard(product, 'recent');
            container.appendChild(productCard);
        });
    }

    addToRecentlyViewed() {
        if (!this.productData) return;

        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

        // Remove if already exists
        const filtered = recentlyViewed.filter(p => p.id !== this.productData.id);

        // Add to beginning
        filtered.unshift(this.productData);

        // Keep only last 10
        const limited = filtered.slice(0, 10);

        localStorage.setItem('recentlyViewed', JSON.stringify(limited));
    }

    setupEventListeners() {
        // Quantity selector
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const quantityInput = document.getElementById('product-quantity');

        decreaseBtn.addEventListener('click', () => this.updateQuantity(-1));
        increaseBtn.addEventListener('click', () => this.updateQuantity(1));
        quantityInput.addEventListener('change', (e) => this.validateQuantity(e.target.value));

        // Add to cart
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => this.addToCart(this.productData));

        // Add to wishlist
        const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
        addToWishlistBtn.addEventListener('click', () => this.addToWishlist());

        // Image zoom
        const mainImage = document.getElementById('main-product-image');
        const zoomOverlay = document.getElementById('image-zoom-overlay');

        mainImage.addEventListener('click', () => this.toggleImageZoom());
        zoomOverlay.addEventListener('click', () => this.toggleImageZoom());
    }

    updateQuantity(change) {
        const quantityInput = document.getElementById('product-quantity');
        const currentValue = parseInt(quantityInput.value) || 1;
        const newValue = Math.max(1, Math.min(99, currentValue + change));
        quantityInput.value = newValue;
    }

    validateQuantity(value) {
        const quantityInput = document.getElementById('product-quantity');
        const numValue = parseInt(value) || 1;
        quantityInput.value = Math.max(1, Math.min(99, numValue));
    }

    addToCart(product) {
        if (!product) return;

        const quantity = parseInt(document.getElementById('product-quantity').value) || 1;

        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images ? product.images[0] : '',
                quantity: quantity,
                sku: product.sku
            });
        }

        // Save cart
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        this.updateCartCount();

        // Show success message
        this.showNotification('Product added to cart!', 'success');
    }

    addToWishlist() {
        if (!this.productData) return;

        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        // Check if already in wishlist
        const exists = wishlist.find(item => item.id === this.productData.id);

        if (!exists) {
            wishlist.push({
                id: this.productData.id,
                name: this.productData.name,
                price: this.productData.price,
                image: this.productData.images ? this.productData.images[0] : '',
                sku: this.productData.sku
            });

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            this.showNotification('Product added to wishlist!', 'success');
        } else {
            this.showNotification('Product already in wishlist!', 'info');
        }
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Update all cart count elements
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(count => {
            count.textContent = totalItems;
        });
    }

    toggleImageZoom() {
        const mainImage = document.getElementById('main-product-image');
        const zoomOverlay = document.getElementById('image-zoom-overlay');

        if (mainImage.classList.contains('zoomed')) {
            mainImage.classList.remove('zoomed');
            zoomOverlay.style.display = 'flex';
        } else {
            mainImage.classList.add('zoomed');
            zoomOverlay.style.display = 'none';
        }
    }

    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    showError(message) {
        const container = document.querySelector('.product-detail-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Product Not Found</h2>
                    <p>${message}</p>
                    <a href="products.html" class="btn-primary">Browse Products</a>
                </div>
            `;
        }
    }

    showNotification(message, type = 'info') {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailManager();
});
