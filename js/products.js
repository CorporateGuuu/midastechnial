/**
 * Products Page JavaScript
 * Handles product loading, filtering, and display with real-time updates
 */

import supabase, { realtimeProductsManager } from './supabase-client.js';

class ProductsManager {
    constructor() {
        this.allProducts = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentFilters = {
            category: '',
            priceRange: '',
            sortBy: 'featured'
        };
        this.realtimeSubscription = null;

        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.setupRealtimeUpdates();
    }

    async loadProducts() {
        try {
            // Show loading state
            this.showLoading();

            // Load products from Supabase with real-time data
            const products = await this.fetchProductsFromSupabase();
            this.allProducts = products;
            this.filteredProducts = [...products];

            this.applyFilters();
            this.displayProducts();

        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products');
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Set up real-time subscriptions for product changes
     */
    setupRealtimeUpdates() {
        // Subscribe to product changes
        this.realtimeSubscription = realtimeProductsManager.subscribeToProducts((payload) => {
            this.handleRealtimeProductUpdate(payload);
        });
    }

    /**
     * Handle real-time product updates
     */
    handleRealtimeProductUpdate(payload) {
        const { eventType, new: newRecord, old: oldRecord } = payload;

        switch (eventType) {
            case 'INSERT':
                this.handleProductInsert(newRecord);
                break;
            case 'UPDATE':
                this.handleProductUpdate(newRecord);
                break;
            case 'DELETE':
                this.handleProductDelete(oldRecord);
                break;
        }
    }

    handleProductInsert(newProduct) {
        // Format the new product
        const formattedProduct = this.formatProductFromDatabase(newProduct);

        // Add to all products if not already present
        const existingIndex = this.allProducts.findIndex(p => p.id === formattedProduct.id);
        if (existingIndex === -1) {
            this.allProducts.unshift(formattedProduct);
            this.applyFilters();
            this.displayProducts();
            this.showNotification('New product added!', 'success');
        }
    }

    handleProductUpdate(updatedProduct) {
        const formattedProduct = this.formatProductFromDatabase(updatedProduct);

        // Update in all products
        const index = this.allProducts.findIndex(p => p.id === formattedProduct.id);
        if (index !== -1) {
            this.allProducts[index] = formattedProduct;
            this.applyFilters();
            this.displayProducts();
            this.showNotification('Product updated!', 'info');
        }
    }

    handleProductDelete(deletedProduct) {
        // Remove from all products
        this.allProducts = this.allProducts.filter(p => p.id !== deletedProduct.id);
        this.applyFilters();
        this.displayProducts();
        this.showNotification('Product removed!', 'warning');
    }

    async fetchProductsFromSupabase() {
        try {
            console.log('Fetching products from Supabase...');

            const { data, error } = await supabase
                .from('parts')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products from Supabase:', error);
                throw error;
            }

            console.log(`Fetched ${data.length} products from Supabase`);

            // Format products for frontend
            return data.map(product => this.formatProductFromDatabase(product));

        } catch (error) {
            console.error('Failed to fetch products from Supabase:', error);
            // Fallback to mock data if Supabase fails
            console.log('Falling back to mock data...');
            return this.getMockProducts();
        }
    }

    /**
     * Format a product from database to frontend format
     */
    formatProductFromDatabase(product) {
        return {
            id: product.id,
            name: product.name || '',
            description: product.description || '',
            price: parseFloat(product.price) || 0,
            category: product.category || '',
            stock_quantity: parseInt(product.stock_quantity) || 0,
            sku: product.sku || '',
            manufacturer: product.manufacturer || '',
            model: product.model || '',
            compatibility: Array.isArray(product.compatibility) ? product.compatibility : [],
            warranty_period: parseInt(product.warranty_period) || 12,
            weight_grams: parseInt(product.weight_grams) || 0,
            dimensions_cm: product.dimensions_cm || '',
            rating: parseFloat(product.rating) || 4.5,
            reviews: parseInt(product.reviews) || 0,
            images: Array.isArray(product.images) ? product.images : ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop'],
            features: Array.isArray(product.features) ? product.features : [],
            tags: Array.isArray(product.tags) ? product.tags : [],
            is_active: product.is_active !== false,
            created_at: product.created_at,
            updated_at: product.updated_at
        };
    }

    /**
     * Get mock products as fallback
     */
    getMockProducts() {
        return [
            // iPhone Parts
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
                    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop"
                ],
                rating: 4.8,
                reviews: 127,
                tags: ["OLED", "Genuine", "Premium"]
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
                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
                ],
                rating: 4.7,
                reviews: 89,
                tags: ["Battery", "Genuine", "Lithium-ion"]
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
                    "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop"
                ],
                rating: 4.5,
                reviews: 67,
                tags: ["Camera", "TrueDepth", "Face ID"]
            }
        ];
    }

    setupEventListeners() {
        // Filter event listeners
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');
        const resetBtn = document.querySelector('.filter-reset-btn');
        const loadMoreBtn = document.querySelector('.load-more-btn');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
                this.displayProducts();
            });
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.priceRange = e.target.value;
                this.applyFilters();
                this.displayProducts();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sortBy = e.target.value;
                this.applyFilters();
                this.displayProducts();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProducts();
            });
        }
    }

    applyFilters() {
        let filtered = [...this.allProducts];

        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(product => {
                const categoryMap = {
                    'iphone': 'iPhone',
                    'samsung': 'Samsung',
                    'macbook': 'MacBook',
                    'tools': 'Repair Tools'
                };
                const filterCategory = categoryMap[this.currentFilters.category];
                return product.category.toLowerCase().includes(filterCategory.toLowerCase());
            });
        }

        // Price filter
        if (this.currentFilters.priceRange) {
            filtered = filtered.filter(product => {
                const price = product.price;
                switch (this.currentFilters.priceRange) {
                    case '0-50':
                        return price >= 0 && price <= 50;
                    case '50-100':
                        return price > 50 && price <= 100;
                    case '100-200':
                        return price > 100 && price <= 200;
                    case '200+':
                        return price > 200;
                    default:
                        return true;
                }
            });
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (this.currentFilters.sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id; // Assuming higher ID = newer
                default:
                    return 0;
            }
        });

        this.filteredProducts = filtered;
        this.currentPage = 1;
    }

    displayProducts() {
        const container = document.getElementById('products-list');
        if (!container) return;

        container.innerHTML = '';

        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            container.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
            return;
        }

        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });

        // Update load more button
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex < this.filteredProducts.length ? 'block' : 'none';
        }
    }

    createProductCard(product) {
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
                ${product.stock_quantity > 0 ? '<div class="product-badge">In Stock</div>' : '<div class="product-badge out-of-stock">Out of Stock</div>'}
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                </div>
                <div class="product-stock">
                    <span class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock_quantity > 0 ? `✓ ${product.stock_quantity} in stock` : 'Out of stock'}
                    </span>
                </div>
                <div class="product-meta">
                    <span class="product-sku">SKU: ${product.sku}</span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary add-to-cart-btn" data-product-id="${product.id}" data-name="${product.name}" data-price="${product.price}" ${product.stock_quantity === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        <span>${product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
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

    addToCart(product) {
        if (!product || product.stock_quantity === 0) return;

        // Use the global addToCart function from cart.js
        const productImage = product.images ? product.images[0] : null;
        if (window.addToCart) {
            window.addToCart(product.id, product.name, product.price, productImage);
        } else {
            // Fallback if global function not available
            const quantity = 1;
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: productImage,
                    quantity: quantity,
                    sku: product.sku
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateCartCount();
            this.showNotification('Product added to cart!', 'success');
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

    resetFilters() {
        this.currentFilters = {
            category: '',
            priceRange: '',
            sortBy: 'featured'
        };

        // Reset form elements
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (categoryFilter) categoryFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (sortFilter) sortFilter.value = 'featured';

        this.applyFilters();
        this.displayProducts();
    }

    loadMoreProducts() {
        this.currentPage++;
        this.displayProducts();
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
        const container = document.getElementById('products-list');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Error Loading Products</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn-primary">Try Again</button>
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
    new ProductsManager();
});
