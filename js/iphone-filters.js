// ===== IPHONE PARTS FILTERING SYSTEM =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
});

function initializeFilters() {
    const modelFilter = document.getElementById('model-filter');
    const partFilter = document.getElementById('part-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resetBtn = document.querySelector('.filter-reset-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Initialize filter functionality
    if (modelFilter) {
        modelFilter.addEventListener('change', applyFilters);
    }

    if (partFilter) {
        partFilter.addEventListener('change', applyFilters);
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', applySorting);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // Load More functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Initialize with all products visible
    updateProductCount(productCards.length);
}

function applyFilters() {
    const modelValue = document.getElementById('model-filter').value;
    const partValue = document.getElementById('part-filter').value;
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    productCards.forEach(card => {
        const modelMatch = !modelValue || card.dataset.model === modelValue;
        const partMatch = !partValue || card.dataset.part === partValue;

        if (modelMatch && partMatch) {
            card.style.display = 'block';
            visibleCount++;
            // Add fade-in animation
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    updateProductCount(visibleCount);
    updateFilterIndicators();
}

function applySorting() {
    const sortValue = document.getElementById('sort-filter').value;
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    // Remove existing cards
    productCards.forEach(card => card.remove());

    // Sort cards based on selected criteria
    switch (sortValue) {
        case 'price-low':
            productCards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            productCards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                return priceB - priceA;
            });
            break;
        case 'newest':
            // For demo, reverse the order (newest first)
            productCards.reverse();
            break;
        case 'popular':
        default:
            // Default order (most popular)
            productCards.sort((a, b) => {
                const ratingA = a.querySelectorAll('.stars .fas').length;
                const ratingB = b.querySelectorAll('.stars .fas').length;
                return ratingB - ratingA;
            });
            break;
    }

    // Re-append sorted cards with animation
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(card);
    });

    showNotification(`Sorted by: ${getSortLabel(sortValue)}`, 'info');
}

function resetFilters() {
    // Reset all filter selects
    document.getElementById('model-filter').value = '';
    document.getElementById('part-filter').value = '';
    document.getElementById('sort-filter').value = 'popular';

    // Show all products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
    });

    updateProductCount(productCards.length);
    updateFilterIndicators();

    showNotification('Filters reset successfully!', 'success');
}

function updateProductCount(count) {
    const productsHeader = document.querySelector('.products-header h2');
    if (productsHeader) {
        const baseText = productsHeader.textContent.split(' (')[0];
        productsHeader.textContent = `${baseText} (${count} items)`;
    }
}

function updateFilterIndicators() {
    const modelValue = document.getElementById('model-filter').value;
    const partValue = document.getElementById('part-filter').value;

    // Update filter button styling
    const filterGroups = document.querySelectorAll('.filter-group select');
    filterGroups.forEach(select => {
        if (select.value) {
            select.parentElement.classList.add('active');
        } else {
            select.parentElement.classList.remove('active');
        }
    });
}

function getSortLabel(sortValue) {
    const labels = {
        'popular': 'Most Popular',
        'price-low': 'Price: Low to High',
        'price-high': 'Price: High to Low',
        'newest': 'Newest First'
    };
    return labels[sortValue] || 'Most Popular';
}

function loadMoreProducts() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const productsGrid = document.querySelector('.products-grid');

    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        // Add more product cards (for demo purposes)
        const newProducts = generateMoreProducts();

        newProducts.forEach((productHTML, index) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = productHTML;
            const newCard = tempDiv.firstElementChild;

            newCard.style.opacity = '0';
            newCard.style.transform = 'translateY(20px)';
            productsGrid.appendChild(newCard);

            // Animate in
            setTimeout(() => {
                newCard.style.transition = 'all 0.5s ease';
                newCard.style.opacity = '1';
                newCard.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Reset button
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i><span>Load More Parts</span>';
        loadMoreBtn.disabled = false;

        // Update count
        const totalCards = document.querySelectorAll('.product-card').length;
        updateProductCount(totalCards);

        showNotification(`Loaded ${newProducts.length} more products!`, 'success');

        // Hide button if we've loaded enough
        if (totalCards >= 24) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

function generateMoreProducts() {
    const additionalProducts = [
        {
            image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
            title: 'iPhone 13 Screen',
            model: 'For iPhone 13',
            price: '$229.99',
            originalPrice: '$279.99',
            rating: 4.5,
            reviews: 187,
            modelData: 'iphone-13',
            partData: 'screen'
        },
        {
            image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop',
            title: 'iPhone 13 Battery',
            model: 'For iPhone 13',
            price: '$69.99',
            rating: 5,
            reviews: 142,
            modelData: 'iphone-13',
            partData: 'battery'
        },
        {
            image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop',
            title: 'iPhone 12 Camera',
            model: 'Dual Camera System',
            price: '$129.99',
            rating: 4,
            reviews: 98,
            modelData: 'iphone-12',
            partData: 'camera'
        }
    ];

    return additionalProducts.map(product => `
        <div class="product-card" data-model="${product.modelData}" data-part="${product.partData}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
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
                <h3>${product.title}</h3>
                <div class="product-model">${product.model}</div>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span><span class="discount-badge">-${calculateDiscount(product.price, product.originalPrice)}%</span>` : ''}
                </div>
                <div class="product-meta">
                    <span class="stock-status in-stock">
                        <i class="fas fa-check-circle"></i> In Stock
                    </span>
                    <span class="shipping-info">Free shipping</span>
                </div>
                <button class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    `);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

function calculateDiscount(currentPrice, originalPrice) {
    const current = parseFloat(currentPrice.replace('$', ''));
    const original = parseFloat(originalPrice.replace('$', ''));
    const discount = Math.round(((original - current) / original) * 100);
    return discount;
}

// ===== IPHONE SHOWCASE INTERACTION =====
function initializeIPhoneShowcase() {
    const parts = document.querySelectorAll('.iphone-parts .part');

    parts.forEach(part => {
        part.addEventListener('click', function() {
            // Remove active class from all parts
            parts.forEach(p => p.classList.remove('active'));

            // Add active class to clicked part
            this.classList.add('active');

            // Filter products based on selected part
            const partType = this.dataset.part.toLowerCase();
            document.getElementById('part-filter').value = partType;
            applyFilters();

            showNotification(`Showing ${partType} parts`, 'info');
        });

        // Add hover effects
        part.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        part.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===== SEARCH ENHANCEMENT =====
function enhanceSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();

            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            searchTimeout = setTimeout(() => {
                const productCards = document.querySelectorAll('.product-card');
                let results = [];

                productCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const model = card.querySelector('.product-model').textContent.toLowerCase();

                    if (title.includes(query) || model.includes(query)) {
                        results.push({
                            title: card.querySelector('h3').textContent,
                            model: card.querySelector('.product-model').textContent,
                            price: card.querySelector('.current-price').textContent,
                            image: card.querySelector('img').src
                        });
                    }
                });

                if (results.length > 0) {
                    searchResults.innerHTML = results.slice(0, 5).map(result => `
                        <div class="search-result-item">
                            <h3>${result.title}</h3>
                            <p>${result.model} - ${result.price}</p>
                        </div>
                    `).join('');
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
                    searchResults.style.display = 'block';
                }
            }, 300);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeIPhoneShowcase();
    enhanceSearch();
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // This function is defined in modern-scripts.js
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Export functions for potential use by other scripts
window.IPhoneFilters = {
    applyFilters,
    applySorting,
    resetFilters,
    loadMoreProducts
};
