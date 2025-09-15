/**
 * Products Page JavaScript
 * Handles product loading, filtering, and display
 */

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

        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
    }

    async loadProducts() {
        try {
            // Show loading state
            this.showLoading();

            // Load products from Supabase (mock data for now)
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

    async fetchProductsFromSupabase() {
        // Mock comprehensive product data
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
            },
            {
                id: 4,
                name: "OLED Assembly For iPhone 14 (Genuine OEM)",
                description: "Quality Apple Genuine OLED Assembly For iPhone 14 - Genuine OEM Part. Premium quality display assembly with advanced OLED technology.",
                price: 277.25,
                category: "iPhone 14 Parts",
                stock_quantity: 12,
                sku: "IPA14-OLED-GEN",
                manufacturer: "Apple Inc.",
                model: "iPhone 14",
                compatibility: ["iPhone 14"],
                warranty_period: 12,
                weight_grams: 45,
                dimensions_cm: "15x8x0.5",
                images: [
                    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop"
                ],
                rating: 4.9,
                reviews: 45,
                tags: ["OLED", "Genuine", "Premium"]
            },
            {
                id: 5,
                name: "Replacement Battery For iPhone 14 (Genuine OEM)",
                description: "Quality Apple Genuine Replacement Battery For iPhone 14 - Genuine OEM Part. High-capacity lithium-ion battery.",
                price: 55.86,
                category: "iPhone 14 Parts",
                stock_quantity: 20,
                sku: "IPA14-BATT-GEN",
                manufacturer: "Apple Inc.",
                model: "iPhone 14",
                compatibility: ["iPhone 14", "iPhone 14 Plus"],
                warranty_period: 12,
                weight_grams: 18,
                dimensions_cm: "8x5x0.3",
                images: [
                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
                ],
                rating: 4.6,
                reviews: 78,
                tags: ["Battery", "Genuine", "Lithium-ion"]
            },

            // Samsung Parts
            {
                id: 6,
                name: "Galaxy S24 Ultra AMOLED Screen (Premium)",
                description: "Premium AMOLED display replacement for Samsung Galaxy S24 Ultra. Crystal clear 6.8-inch Dynamic AMOLED 2X display.",
                price: 199.99,
                category: "Samsung Galaxy Parts",
                stock_quantity: 8,
                sku: "SGS24U-AMOLED-PREM",
                manufacturer: "Samsung Electronics",
                model: "Galaxy S24 Ultra",
                compatibility: ["Galaxy S24 Ultra"],
                warranty_period: 12,
                weight_grams: 55,
                dimensions_cm: "16x8x0.5",
                images: [
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
                ],
                rating: 4.7,
                reviews: 92,
                tags: ["AMOLED", "Premium", "Dynamic"]
            },
            {
                id: 7,
                name: "Galaxy S24 Ultra Battery (Original OEM)",
                description: "Original Samsung battery replacement for Galaxy S24 Ultra. High-capacity 5000mAh battery with fast charging support.",
                price: 89.99,
                category: "Samsung Galaxy Parts",
                stock_quantity: 15,
                sku: "SGS24U-BATT-OEM",
                manufacturer: "Samsung Electronics",
                model: "Galaxy S24 Ultra",
                compatibility: ["Galaxy S24 Ultra"],
                warranty_period: 12,
                weight_grams: 25,
                dimensions_cm: "10x6x0.4",
                images: [
                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
                ],
                rating: 4.8,
                reviews: 156,
                tags: ["Battery", "OEM", "5000mAh"]
            },

            // MacBook Parts
            {
                id: 8,
                name: "MacBook Pro 16\" Retina Display (Premium)",
                description: "Premium LCD display replacement for MacBook Pro 16-inch Retina models. Crystal clear 16-inch Liquid Retina XDR display.",
                price: 599.99,
                category: "MacBook Parts",
                stock_quantity: 5,
                sku: "MBP16-DISP-PREM",
                manufacturer: "Apple Inc.",
                model: "MacBook Pro 16\"",
                compatibility: ["MacBook Pro 16-inch (2019-2023)"],
                warranty_period: 12,
                weight_grams: 120,
                dimensions_cm: "35x22x0.8",
                images: [
                    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"
                ],
                rating: 4.9,
                reviews: 34,
                tags: ["Retina", "Premium", "Liquid XDR"]
            },
            {
                id: 9,
                name: "MacBook Pro Battery (Genuine OEM)",
                description: "Genuine Apple battery replacement for MacBook Pro 16-inch models. High-capacity lithium-polymer battery.",
                price: 149.99,
                category: "MacBook Parts",
                stock_quantity: 8,
                sku: "MBP16-BATT-GEN",
                manufacturer: "Apple Inc.",
                model: "MacBook Pro 16\"",
                compatibility: ["MacBook Pro 16-inch"],
                warranty_period: 12,
                weight_grams: 80,
                dimensions_cm: "25x15x0.5",
                images: [
                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
                ],
                rating: 4.6,
                reviews: 67,
                tags: ["Battery", "Genuine", "Lithium-polymer"]
            },

            // Repair Tools
            {
                id: 10,
                name: "Professional Repair Toolkit (Complete Set)",
                description: "Complete professional repair toolkit for phone and laptop repairs. Includes screwdrivers, suction cups, opening tools, and more.",
                price: 89.99,
                category: "Repair Tools",
                stock_quantity: 15,
                sku: "TOOLKIT-PROF-001",
                manufacturer: "Midas Tools",
                model: "Professional Toolkit",
                compatibility: ["All devices"],
                warranty_period: 24,
                weight_grams: 500,
                dimensions_cm: "30x20x5",
                images: [
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
                ],
                rating: 4.9,
                reviews: 203,
                tags: ["Toolkit", "Professional", "Complete"]
            },
            {
                id: 11,
                name: "Precision Screwdriver Set (32-Piece)",
                description: "Professional precision screwdriver set with 32 different bits for all types of electronic repairs.",
                price: 39.99,
                category: "Repair Tools",
                stock_quantity: 25,
                sku: "SCREWDRIVER-32PC",
                manufacturer: "Midas Tools",
                model: "Precision Set",
                compatibility: ["All devices"],
                warranty_period: 24,
                weight_grams: 200,
                dimensions_cm: "15x10x3",
                images: [
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
                ],
                rating: 4.8,
                reviews: 145,
                tags: ["Screwdriver", "Precision", "32-Piece"]
            },

            // iPad Parts
            {
                id: 12,
                name: "iPad Pro 12.9\" LCD Display (Genuine OEM)",
                description: "Genuine Apple LCD display replacement for iPad Pro 12.9-inch models. Ultra Retina XDR display technology.",
                price: 399.99,
                category: "iPad Parts",
                stock_quantity: 6,
                sku: "IPADPRO12-DISP-GEN",
                manufacturer: "Apple Inc.",
                model: "iPad Pro 12.9\"",
                compatibility: ["iPad Pro 12.9-inch (2020-2022)"],
                warranty_period: 12,
                weight_grams: 85,
                dimensions_cm: "28x20x0.6",
                images: [
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
                ],
                rating: 4.7,
                reviews: 56,
                tags: ["LCD", "Genuine", "Ultra Retina"]
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
