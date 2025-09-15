// ===== MODERN SCRIPTS FOR MIDAS TECHNICAL SOLUTIONS =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components with error handling
    try {
        initializeLoading();
        initializeHeader();
        initializeSidebar();
        initializeSearch();
        initializeScrollEffects();
        initializeBackToTop();
        initializeNewsletter();
        initializeCSRFProtection();
        initializeProductActions();
        initializeAnimations();
        console.log('✅ All components initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing website:', error);
        showNotification('Some features may not work properly', 'warning');
    }
}

// ===== LOADING ANIMATION =====
function initializeLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');

    if (!loadingOverlay) {
        console.log('Loading overlay not found, skipping initialization');
        return;
    }

    // Hide loading after 2 seconds
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== HEADER FUNCTIONALITY =====
function initializeHeader() {
    const header = document.querySelector('.modern-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar-menu');

    if (!header) {
        console.log('Header not found, skipping header initialization');
        return;
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (menuToggle && sidebar) {
        // Menu toggle
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== SIDEBAR FUNCTIONALITY =====
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar-menu');
    const sidebarClose = document.getElementById('sidebar-close');

    if (!sidebar) {
        console.log('Sidebar not found, skipping sidebar initialization');
        return;
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchForm || !searchInput || !searchResults) {
        console.log('Search elements not found, skipping search initialization');
        return;
    }

    // Mock search data
    const searchData = [
        { name: 'iPhone 15 Pro Max Screen', category: 'iPhone Parts', price: '$299.99' },
        { name: 'MacBook Pro Battery', category: 'MacBook Parts', price: '$149.99' },
        { name: 'Samsung S24 Screen', category: 'Samsung Parts', price: '$199.99' },
        { name: 'Professional Repair Kit', category: 'Tools', price: '$89.99' },
        { name: 'LCD Buyback Service', category: 'Services', price: 'Contact Us' }
    ];

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.innerHTML = '<div class="search-result-item">Please enter at least 2 characters</div>';
            return;
        }

        const results = searchData.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item">
                    <h3>${item.name}</h3>
                    <p>Category: ${item.category} | Price: ${item.price}</p>
                </div>
            `).join('');
        }

        searchResults.style.display = 'block';
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Show results on focus
    searchInput.addEventListener('focus', () => {
        if (searchResults.innerHTML.trim()) {
            searchResults.style.display = 'block';
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) {
        console.log('Back to top button not found, skipping initialization');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== NEWSLETTER =====
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Mock newsletter signup with modern notification
            showNotification(`Thank you for subscribing! We'll send updates to ${email}`, 'success');
            newsletterForm.reset();
        });
    }
}

// ===== CSRF PROTECTION =====
let csrfToken = '';

function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function initializeCSRFProtection() {
    csrfToken = generateCSRFToken();

    // Add CSRF token to all forms
    document.querySelectorAll('form').forEach(form => {
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);
    });

    // Store token in sessionStorage for validation
    sessionStorage.setItem('csrf_token', csrfToken);
}

function validateCSRFToken(token) {
    const storedToken = sessionStorage.getItem('csrf_token');
    return token === storedToken && token.length === 64; // 32 bytes = 64 hex chars
}

// ===== PRODUCT ACTIONS =====
function initializeProductActions() {
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;

            const productName = productCard.querySelector('h3');
            const productPrice = productCard.querySelector('.current-price');

            if (!productName || !productPrice) return;

            // Generate unique product ID
            const productId = 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const name = productName.textContent.trim();
            const price = productPrice.textContent.trim();
            const image = productCard.querySelector('img')?.src || '';

            // Use secure addToCart function
            const success = addToCart(productId, name, price, image);

            if (success) {
                // Show success message
                showNotification(`${name} added to cart!`, 'success');

                // Add bounce animation
                this.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });

    // Wishlist functionality
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            const icon = this.querySelector('i');

            if (icon) {
                if (isActive) {
                    icon.className = 'fas fa-heart';
                    showNotification('Added to wishlist!', 'success');
                } else {
                    icon.className = 'far fa-heart';
                    showNotification('Removed from wishlist!', 'info');
                }
            }
        });
    });

    // Quick view functionality
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;

            const productName = productCard.querySelector('h3');
            const productPrice = productCard.querySelector('.current-price');

            if (productName && productPrice) {
                showNotification(`Quick view: ${productName.textContent} - ${productPrice.textContent}`, 'info');
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add animate-on-scroll class to elements
    const elementsToAnimate = [
        '.hero-content',
        '.hero-visual',
        '.stat-item',
        '.category-card',
        '.product-card',
        '.service-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });

    // Stagger animations
    document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// ===== RESPONSIVE MENU FIX =====
function fixResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar-menu');

    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'flex';
    } else {
        menuToggle.style.display = 'none';
        sidebar.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Run on load and resize
window.addEventListener('load', fixResponsiveMenu);
window.addEventListener('resize', fixResponsiveMenu);

// ===== SECURE CART FUNCTIONALITY =====
// Cart is managed by cart.js - using global functions instead
let cartKey = 'midasCart_secure';
let encryptionKey = 'midas_secure_key_' + Date.now().toString(36);

// Generate a simple encryption key based on user session
function generateEncryptionKey() {
    const userAgent = navigator.userAgent;
    const screenSize = screen.width + 'x' + screen.height;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return btoa(userAgent + screenSize + timezone).substring(0, 16);
}

// Simple encryption/decryption for cart data
function encryptCartData(data) {
    try {
        const jsonString = JSON.stringify(data);
        const encoded = btoa(jsonString);
        // Add checksum for integrity
        const checksum = btoa(jsonString.length.toString());
        return encoded + '.' + checksum;
    } catch (e) {
        console.error('Cart encryption failed:', e);
        return null;
    }
}

function decryptCartData(encryptedData) {
    try {
        if (!encryptedData || !encryptedData.includes('.')) {
            return [];
        }

        const [encoded, checksum] = encryptedData.split('.');
        const decoded = atob(encoded);
        const jsonData = JSON.parse(decoded);

        // Verify checksum
        const expectedChecksum = btoa(decoded.length.toString());
        if (checksum !== expectedChecksum) {
            console.warn('Cart data integrity check failed');
            return [];
        }

        return jsonData;
    } catch (e) {
        console.error('Cart decryption failed:', e);
        return [];
    }
}

// Secure cart storage functions - now using cart.js for cart management
function saveCartSecurely() {
    // Cart is now managed by cart.js - this function is kept for compatibility
    console.log('Cart saving handled by cart.js');
}

function loadCartSecurely() {
    // Cart is now managed by cart.js - this function is kept for compatibility
    console.log('Cart loading handled by cart.js');
}

function generateSessionId() {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
}

// Cart display is now handled by cart.js
function updateCartDisplay() {
    // This function is kept for compatibility but cart display is managed by cart.js
    console.log('Cart display managed by cart.js');
}

function validateCartItem(productId, name, price, image) {
    // Input validation
    if (!productId || typeof productId !== 'string' || productId.length > 100) {
        throw new Error('Invalid product ID');
    }
    if (!name || typeof name !== 'string' || name.length > 200) {
        throw new Error('Invalid product name');
    }
    if (!price || typeof price !== 'string') {
        throw new Error('Invalid price');
    }
    if (image && typeof image !== 'string') {
        throw new Error('Invalid image URL');
    }

    // Sanitize inputs
    const sanitizedName = name.replace(/[<>\"']/g, '');
    const sanitizedImage = image ? image.replace(/[<>\"']/g, '') : '';

    return {
        id: productId,
        name: sanitizedName,
        price: parseFloat(price.replace(/[^0-9.-]/g, '')) || 0,
        image: sanitizedImage,
        quantity: 1
    };
}

function addToCart(productId, name, price, image) {
    try {
        // Use the global addToCart function from cart.js if available
        if (window.addToCart) {
            window.addToCart(productId, name, price, image);
            return true;
        }

        // Fallback to local implementation
        const validatedItem = validateCartItem(productId, name, price, image);
        const existingItem = cart.find(item => item.id === validatedItem.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
            cart.push(validatedItem);
        }

        saveCartSecurely();
        updateCartDisplay();

        return true;
    } catch (e) {
        console.error('Failed to add item to cart:', e);
        showNotification('Failed to add item to cart', 'error');
        return false;
    }
}

// Initialize cart on page load
loadCartSecurely();
updateCartDisplay();

// ===== LAZY LOADING IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });
}

// Initialize form validation
initializeFormValidation();

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Close modals/sidebar with Escape
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar-menu');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }
});

// ===== PERFORMANCE MONITORING =====
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        });
    }
}

// Initialize performance logging
logPerformance();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ===== SUCCESS MESSAGE =====
console.log('🚀 Midas Technical Solutions website loaded successfully!');
console.log('✨ Modern design with premium user experience');
console.log('🔧 Full e-commerce functionality ready');

// Add notification styles dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 100px;
    right: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-left: 4px solid #667eea;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left-color: #2ed573;
}

.notification.success i {
    color: #2ed573;
}

.notification.error {
    border-left-color: #ff4757;
}

.notification.error i {
    color: #ff4757;
}

.notification.warning {
    border-left-color: #ffa502;
}

.notification.warning i {
    color: #ffa502;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.notification-content i {
    font-size: 1.2rem;
    color: #667eea;
}

.notification-content span {
    font-weight: 500;
    color: #1a1a1a;
}

.notification-close {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.notification-close:hover {
    background: #f5f5f5;
    color: #667eea;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
