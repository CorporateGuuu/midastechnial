/**
 * Search Results Page JavaScript
 * Handles dedicated search results page functionality
 */

class SearchResultsManager {
    constructor() {
        this.searchQuery = '';
        this.searchResults = [];
        this.filteredResults = [];
        this.currentPage = 1;
        this.resultsPerPage = 12;
        this.currentFilters = {
            categories: [],
            priceRange: { min: null, max: null },
            availability: ['in-stock'],
            rating: null,
            brands: []
        };
        this.currentSort = 'relevance';
        this.currentView = 'grid';

        this.init();
    }

    init() {
        this.getSearchQueryFromUrl();
        this.setupEventListeners();
        this.loadSearchPreferences();
        this.trackSearchAnalytics();
        this.displayPopularSearches();
        this.setupAdvancedSearch();
        this.performSearch();
    }

    getSearchQueryFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        this.searchQuery = urlParams.get('q') || '';

        // Update the search input and display
        const searchInput = document.getElementById('search-input');
        const searchTerm = document.getElementById('search-term');

        if (searchInput) searchInput.value = this.searchQuery;
        if (searchTerm) searchTerm.textContent = `"${this.searchQuery}"`;
    }

    setupEventListeners() {
        // Filter event listeners
        this.setupCategoryFilters();
        this.setupPriceFilters();
        this.setupAvailabilityFilters();
        this.setupRatingFilters();
        this.setupBrandFilters();

        // Sort and view controls
        const sortSelect = document.getElementById('sort-select');
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');
        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        const modifySearchBtn = document.getElementById('modify-search-btn');
        const clearSearchBtn = document.getElementById('clear-search-btn');

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFiltersAndSort();
                this.displayResults();
            });
        }

        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => this.setView('grid'));
        }

        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => this.setView('list'));
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        if (modifySearchBtn) {
            modifySearchBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
            });
        }

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        }

        // Search form submission
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = document.getElementById('search-input').value.trim();
                if (query) {
                    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    setupCategoryFilters() {
        const categoryCheckboxes = [
            'filter-iphone', 'filter-samsung', 'filter-macbook',
            'filter-ipad', 'filter-tools'
        ];

        categoryCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateCategoryFilters();
                    this.applyFiltersAndSort();
                    this.displayResults();
                });
            }
        });
    }

    setupPriceFilters() {
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const pricePresetBtns = document.querySelectorAll('.price-preset-btn');

        if (minPriceInput) {
            minPriceInput.addEventListener('input', () => {
                this.updatePriceFilters();
                this.applyFiltersAndSort();
                this.displayResults();
            });
        }

        if (maxPriceInput) {
            maxPriceInput.addEventListener('input', () => {
                this.updatePriceFilters();
                this.applyFiltersAndSort();
                this.displayResults();
            });
        }

        pricePresetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const min = parseFloat(btn.dataset.min) || 0;
                const max = parseFloat(btn.dataset.max) || 1000;

                if (minPriceInput) minPriceInput.value = min;
                if (maxPriceInput) maxPriceInput.value = max === 1000 ? '' : max;

                this.updatePriceFilters();
                this.applyFiltersAndSort();
                this.displayResults();
            });
        });
    }

    setupAvailabilityFilters() {
        const availabilityCheckboxes = ['filter-in-stock', 'filter-out-of-stock'];

        availabilityCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateAvailabilityFilters();
                    this.applyFiltersAndSort();
                    this.displayResults();
                });
            }
        });
    }

    setupRatingFilters() {
        const ratingRadios = ['rating-4-plus', 'rating-3-plus', 'rating-2-plus'];

        ratingRadios.forEach(id => {
            const radio = document.getElementById(id);
            if (radio) {
                radio.addEventListener('change', () => {
                    this.currentFilters.rating = radio.checked ? parseInt(radio.value) : null;
                    this.applyFiltersAndSort();
                    this.displayResults();
                });
            }
        });
    }

    setupBrandFilters() {
        const brandCheckboxes = ['filter-apple', 'filter-samsung-brand', 'filter-midas'];

        brandCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateBrandFilters();
                    this.applyFiltersAndSort();
                    this.displayResults();
                });
            }
        });
    }

    updateCategoryFilters() {
        this.currentFilters.categories = [];
        const categoryMap = {
            'filter-iphone': 'iPhone',
            'filter-samsung': 'Samsung',
            'filter-macbook': 'MacBook',
            'filter-ipad': 'iPad',
            'filter-tools': 'Repair Tools'
        };

        Object.keys(categoryMap).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                this.currentFilters.categories.push(categoryMap[id]);
            }
        });
    }

    updatePriceFilters() {
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');

        this.currentFilters.priceRange.min = minPriceInput && minPriceInput.value ?
            parseFloat(minPriceInput.value) : null;
        this.currentFilters.priceRange.max = maxPriceInput && maxPriceInput.value ?
            parseFloat(maxPriceInput.value) : null;
    }

    updateAvailabilityFilters() {
        this.currentFilters.availability = [];
        const inStockCheckbox = document.getElementById('filter-in-stock');
        const outOfStockCheckbox = document.getElementById('filter-out-of-stock');

        if (inStockCheckbox && inStockCheckbox.checked) {
            this.currentFilters.availability.push('in-stock');
        }
        if (outOfStockCheckbox && outOfStockCheckbox.checked) {
            this.currentFilters.availability.push('out-of-stock');
        }
    }

    updateBrandFilters() {
        this.currentFilters.brands = [];
        const brandMap = {
            'filter-apple': 'Apple',
            'filter-samsung-brand': 'Samsung',
            'filter-midas': 'Midas Tools'
        };

        Object.keys(brandMap).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                this.currentFilters.brands.push(brandMap[id]);
            }
        });
    }

    async performSearch() {
        if (!this.searchQuery) {
            this.showNoResults();
            return;
        }

        this.showLoading();

        try {
            // Fetch from real API
            const response = await fetch(`../api/get-products.php?search=${encodeURIComponent(this.searchQuery)}&limit=50`);
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Search failed');
            }

            this.searchResults = data.data || [];
            this.applyFiltersAndSort();
            this.displayResults();
            this.displayRelatedSearches();

        } catch (error) {
            console.error('Search error:', error);
            this.showNoResults();
        } finally {
            this.hideLoading();
        }
    }

    matchesSearchQuery(product, query) {
        const searchTerm = query.toLowerCase();

        // Search in product name, description, category, tags, and SKU
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            product.sku.toLowerCase().includes(searchTerm)
        );
    }

    applyFiltersAndSort() {
        let filtered = [...this.searchResults];

        // Apply category filter
        if (this.currentFilters.categories.length > 0) {
            filtered = filtered.filter(product =>
                this.currentFilters.categories.some(cat =>
                    product.category.toLowerCase().includes(cat.toLowerCase())
                )
            );
        }

        // Apply price filter
        if (this.currentFilters.priceRange.min !== null) {
            filtered = filtered.filter(product =>
                product.price >= this.currentFilters.priceRange.min
            );
        }
        if (this.currentFilters.priceRange.max !== null) {
            filtered = filtered.filter(product =>
                product.price <= this.currentFilters.priceRange.max
            );
        }

        // Apply availability filter
        if (this.currentFilters.availability.length > 0) {
            filtered = filtered.filter(product => {
                const isInStock = product.stock_quantity > 0;
                return this.currentFilters.availability.includes(isInStock ? 'in-stock' : 'out-of-stock');
            });
        }

        // Apply rating filter
        if (this.currentFilters.rating !== null) {
            filtered = filtered.filter(product =>
                product.rating >= this.currentFilters.rating
            );
        }

        // Apply brand filter
        if (this.currentFilters.brands.length > 0) {
            filtered = filtered.filter(product =>
                this.currentFilters.brands.some(brand =>
                    product.manufacturer.toLowerCase().includes(brand.toLowerCase())
                )
            );
        }

        // Apply sorting
        this.sortResults(filtered);

        this.filteredResults = filtered;
        this.currentPage = 1;
    }

    sortResults(results) {
        switch (this.currentSort) {
            case 'price-low':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                results.sort((a, b) => b.id - a.id);
                break;
            case 'name':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Relevance sorting (keep original order)
                break;
        }
    }

    displayResults() {
        const resultsGrid = document.getElementById('search-results-grid');
        const resultsCount = document.getElementById('results-count');
        const noResultsState = document.getElementById('no-results-state');

        if (!resultsGrid) return;

        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `${this.filteredResults.length} result${this.filteredResults.length !== 1 ? 's' : ''} found`;
        }

        if (this.filteredResults.length === 0) {
            resultsGrid.innerHTML = '';
            if (noResultsState) noResultsState.style.display = 'block';
            return;
        }

        if (noResultsState) noResultsState.style.display = 'none';

        // Get current page results
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        const pageResults = this.filteredResults.slice(startIndex, endIndex);

        // Generate HTML
        const resultsHtml = pageResults.map(product => this.createProductCard(product)).join('');
        resultsGrid.innerHTML = resultsHtml;

        // Update grid/list view
        resultsGrid.className = `search-results-${this.currentView}`;

        // Setup pagination
        this.setupPagination();
    }

    createProductCard(product) {
        const isGridView = this.currentView === 'grid';
        const highlightedName = this.highlightSearchTerms(product.name, this.searchQuery);
        const highlightedDescription = this.highlightSearchTerms(product.description, this.searchQuery);

        if (isGridView) {
            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.images ? product.images[0] : 'https://via.placeholder.com/300x300?text=No+Image'}"
                             alt="${product.name}" loading="lazy">
                        <div class="product-badge">${product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    </div>
                    <div class="product-info">
                        <h3><a href="product-detail.html?id=${product.id}">${highlightedName}</a></h3>
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
                            <span class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                                ${product.stock_quantity > 0 ? `✓ ${product.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                            <i class="fas fa-shopping-cart"></i>
                            <span>${product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // List view
            return `
                <div class="product-list-item">
                    <div class="product-list-image">
                        <img src="${product.images ? product.images[0] : 'https://via.placeholder.com/150x150?text=No+Image'}"
                             alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-list-info">
                        <div class="product-list-header">
                            <h3><a href="product-detail.html?id=${product.id}">${highlightedName}</a></h3>
                            <div class="product-list-price">$${product.price.toFixed(2)}</div>
                        </div>
                        <p class="product-list-description">${highlightedDescription}</p>
                        <div class="product-list-meta">
                            <div class="product-rating">
                                <div class="stars">
                                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                </div>
                                <span class="rating-count">(${product.reviews} reviews)</span>
                            </div>
                            <span class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                                ${product.stock_quantity > 0 ? `✓ ${product.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                            <span class="product-sku">SKU: ${product.sku}</span>
                        </div>
                        <div class="product-list-actions">
                            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                                <i class="fas fa-shopping-cart"></i>
                                <span>${product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                            </button>
                            <button class="wishlist-btn" onclick="addToWishlist(${product.id})">
                                <i class="fas fa-heart"></i>
                                <span>Add to Wishlist</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    highlightSearchTerms(text, query) {
        if (!query || !text) return text;

        const terms = query.toLowerCase().split(' ').filter(term => term.length > 2);
        let highlightedText = text;

        terms.forEach(term => {
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });

        return highlightedText;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    setupPagination() {
        const paginationContainer = document.getElementById('search-pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredResults.length / this.resultsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHtml = '<div class="pagination">';

        // Previous button
        if (this.currentPage > 1) {
            paginationHtml += `<button class="page-btn" onclick="changePage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i> Previous
            </button>`;
        }

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHtml += `<button class="page-btn" onclick="changePage(1)">1</button>`;
            if (startPage > 2) {
                paginationHtml += '<span class="pagination-dots">...</span>';
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHtml += '<span class="pagination-dots">...</span>';
            }
            paginationHtml += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHtml += `<button class="page-btn" onclick="changePage(${this.currentPage + 1})">
                Next <i class="fas fa-chevron-right"></i>
            </button>`;
        }

        paginationHtml += '</div>';
        paginationContainer.innerHTML = paginationHtml;
    }

    setView(view) {
        this.currentView = view;
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');

        if (gridViewBtn) gridViewBtn.classList.toggle('active', view === 'grid');
        if (listViewBtn) listViewBtn.classList.toggle('active', view === 'list');

        this.displayResults();
    }

    clearAllFilters() {
        // Reset all filter inputs
        const checkboxes = document.querySelectorAll('.search-filters-sidebar input[type="checkbox"]');
        const radios = document.querySelectorAll('.search-filters-sidebar input[type="radio"]');
        const numberInputs = document.querySelectorAll('.search-filters-sidebar input[type="number"]');

        checkboxes.forEach(cb => cb.checked = cb.id === 'filter-in-stock'); // Keep in-stock checked
        radios.forEach(radio => radio.checked = false);
        numberInputs.forEach(input => input.value = '');

        // Reset filter state
        this.currentFilters = {
            categories: [],
            priceRange: { min: null, max: null },
            availability: ['in-stock'],
            rating: null,
            brands: []
        };

        this.applyFiltersAndSort();
        this.displayResults();
    }

    displayRelatedSearches() {
        const relatedTagsContainer = document.getElementById('related-search-tags');
        if (!relatedTagsContainer) return;

        const relatedTerms = this.generateRelatedSearchTerms();
        const tagsHtml = relatedTerms.map(term => `
            <a href="search-results.html?q=${encodeURIComponent(term)}" class="related-search-tag">
                ${term}
            </a>
        `).join('');

        relatedTagsContainer.innerHTML = tagsHtml;
    }

    generateRelatedSearchTerms() {
        const baseQuery = this.searchQuery.toLowerCase();
        const relatedTerms = [];

        // Generate related terms based on the search query
        if (baseQuery.includes('iphone')) {
            relatedTerms.push('iPhone screen', 'iPhone battery', 'iPhone camera', 'iPhone 15', 'iPhone 14');
        } else if (baseQuery.includes('samsung')) {
            relatedTerms.push('Galaxy screen', 'Galaxy battery', 'Samsung S24', 'Samsung S23');
        } else if (baseQuery.includes('macbook')) {
            relatedTerms.push('MacBook battery', 'MacBook screen', 'MacBook Pro', 'MacBook Air');
        } else if (baseQuery.includes('battery')) {
            relatedTerms.push('iPhone battery', 'Samsung battery', 'MacBook battery', 'replacement battery');
        } else if (baseQuery.includes('screen') || baseQuery.includes('display')) {
            relatedTerms.push('iPhone screen', 'Samsung screen', 'MacBook screen', 'LCD display');
        }

        // Add some general popular terms
        relatedTerms.push('repair tools', 'screwdriver', 'charging port', 'camera module');

        return relatedTerms.slice(0, 8);
    }

    showLoading() {
        const loadingState = document.getElementById('search-loading-state');
        const resultsGrid = document.getElementById('search-results-grid');

        if (loadingState) loadingState.style.display = 'flex';
        if (resultsGrid) resultsGrid.style.display = 'none';
    }

    hideLoading() {
        const loadingState = document.getElementById('search-loading-state');
        const resultsGrid = document.getElementById('search-results-grid');

        if (loadingState) loadingState.style.display = 'none';
        if (resultsGrid) resultsGrid.style.display = 'grid';
    }

    showNoResults() {
        const resultsGrid = document.getElementById('search-results-grid');
        const noResultsState = document.getElementById('no-results-state');
        const resultsCount = document.getElementById('results-count');

        if (resultsGrid) resultsGrid.innerHTML = '';
        if (noResultsState) noResultsState.style.display = 'block';
        if (resultsCount) resultsCount.textContent = '0 results found';
    }

    // ===== ADVANCED SEARCH FEATURES =====

    loadSearchPreferences() {
        // Load user's search preferences from localStorage
        const preferences = JSON.parse(localStorage.getItem('searchPreferences') || '{}');

        if (preferences.view) {
            this.currentView = preferences.view;
        }
        if (preferences.sort) {
            this.currentSort = preferences.sort;
        }
        if (preferences.filters) {
            this.currentFilters = { ...this.currentFilters, ...preferences.filters };
        }

        // Apply loaded preferences to UI
        this.applySearchPreferences();
    }

    saveSearchPreferences() {
        const preferences = {
            view: this.currentView,
            sort: this.currentSort,
            filters: this.currentFilters,
            timestamp: Date.now()
        };

        localStorage.setItem('searchPreferences', JSON.stringify(preferences));
    }

    applySearchPreferences() {
        // Update UI elements based on preferences
        const sortSelect = document.getElementById('sort-select');
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');

        if (sortSelect) sortSelect.value = this.currentSort;
        if (gridViewBtn) gridViewBtn.classList.toggle('active', this.currentView === 'grid');
        if (listViewBtn) listViewBtn.classList.toggle('active', this.currentView === 'list');

        // Apply filter preferences to checkboxes
        this.applyFilterPreferences();
    }

    applyFilterPreferences() {
        // Apply saved filter preferences to UI
        const categoryMap = {
            'filter-iphone': 'iPhone',
            'filter-samsung': 'Samsung',
            'filter-macbook': 'MacBook',
            'filter-ipad': 'iPad',
            'filter-tools': 'Repair Tools'
        };

        // Apply category filters
        Object.keys(categoryMap).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = this.currentFilters.categories.includes(categoryMap[id]);
            }
        });

        // Apply brand filters
        const brandMap = {
            'filter-apple': 'Apple',
            'filter-samsung-brand': 'Samsung',
            'filter-midas': 'Midas Tools'
        };

        Object.keys(brandMap).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = this.currentFilters.brands.includes(brandMap[id]);
            }
        });

        // Apply price filters
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');

        if (minPriceInput && this.currentFilters.priceRange.min !== null) {
            minPriceInput.value = this.currentFilters.priceRange.min;
        }
        if (maxPriceInput && this.currentFilters.priceRange.max !== null) {
            maxPriceInput.value = this.currentFilters.priceRange.max;
        }

        // Apply rating filters
        const ratingMap = {
            'rating-4-plus': 4,
            'rating-3-plus': 3,
            'rating-2-plus': 2
        };

        Object.keys(ratingMap).forEach(id => {
            const radio = document.getElementById(id);
            if (radio) {
                radio.checked = this.currentFilters.rating === ratingMap[id];
            }
        });
    }

    trackSearchAnalytics() {
        // Track search analytics
        const analytics = {
            query: this.searchQuery,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            sessionId: this.getSessionId()
        };

        // Store search analytics
        this.saveSearchAnalytics(analytics);

        // Update popular searches
        this.updatePopularSearches(this.searchQuery);
    }

    getSessionId() {
        let sessionId = localStorage.getItem('searchSessionId');
        if (!sessionId) {
            sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('searchSessionId', sessionId);
        }
        return sessionId;
    }

    saveSearchAnalytics(analytics) {
        const analyticsData = JSON.parse(localStorage.getItem('searchAnalytics') || '[]');
        analyticsData.push(analytics);

        // Keep only last 1000 search events
        if (analyticsData.length > 1000) {
            analyticsData.splice(0, analyticsData.length - 1000);
        }

        localStorage.setItem('searchAnalytics', JSON.stringify(analyticsData));
    }

    updatePopularSearches(query) {
        const popularSearches = JSON.parse(localStorage.getItem('popularSearches') || '{}');

        if (!popularSearches[query]) {
            popularSearches[query] = 0;
        }
        popularSearches[query]++;

        localStorage.setItem('popularSearches', JSON.stringify(popularSearches));
    }

    displayPopularSearches() {
        const popularContainer = document.getElementById('popular-searches');
        if (!popularContainer) return;

        const popularSearches = JSON.parse(localStorage.getItem('popularSearches') || '{}');

        // Sort by popularity and get top 10
        const sortedSearches = Object.entries(popularSearches)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([query]) => query);

        if (sortedSearches.length === 0) return;

        const popularHtml = `
            <div class="popular-searches-section">
                <h4><i class="fas fa-fire"></i> Popular Searches</h4>
                <div class="popular-search-tags">
                    ${sortedSearches.map(term => `
                        <a href="search-results.html?q=${encodeURIComponent(term)}" class="popular-search-tag">
                            ${term}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        popularContainer.innerHTML = popularHtml;
    }

    setupAdvancedSearch() {
        // Add advanced search operators support
        this.setupSearchOperators();

        // Add search suggestions based on user behavior
        this.setupSmartSuggestions();

        // Add search result export functionality
        this.setupExportFunctionality();
    }

    setupSearchOperators() {
        // Add support for advanced search operators like "AND", "OR", "NOT"
        // For now, just enhance the search input with placeholder text
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.placeholder = 'Search products... (try: "iPhone battery" or "screen repair")';
        }
    }

    setupSmartSuggestions() {
        // Setup smart suggestions based on user search history and popular searches
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        let suggestionTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(suggestionTimeout);
            suggestionTimeout = setTimeout(() => {
                this.showSmartSuggestions(e.target.value);
            }, 300);
        });
    }

    showSmartSuggestions(query) {
        if (!query || query.length < 2) return;

        const suggestions = this.generateSmartSuggestions(query);
        if (suggestions.length === 0) return;

        // Display suggestions (you could enhance this with a dropdown)
        console.log('Smart suggestions:', suggestions);
    }

    generateSmartSuggestions(query) {
        const suggestions = [];
        const lowerQuery = query.toLowerCase();

        // Get popular searches that match
        const popularSearches = JSON.parse(localStorage.getItem('popularSearches') || '{}');
        const matchingPopular = Object.keys(popularSearches)
            .filter(term => term.toLowerCase().includes(lowerQuery))
            .sort((a, b) => popularSearches[b] - popularSearches[a])
            .slice(0, 5);

        suggestions.push(...matchingPopular);

        // Add category-based suggestions
        if (lowerQuery.includes('iphone')) {
            suggestions.push('iPhone screen', 'iPhone battery', 'iPhone camera');
        } else if (lowerQuery.includes('samsung')) {
            suggestions.push('Galaxy screen', 'Galaxy battery', 'Samsung S24');
        } else if (lowerQuery.includes('macbook')) {
            suggestions.push('MacBook battery', 'MacBook screen', 'MacBook Pro');
        }

        return [...new Set(suggestions)].slice(0, 8);
    }

    setupExportFunctionality() {
        // Add export functionality for search results
        const exportBtn = document.createElement('button');
        exportBtn.id = 'export-results-btn';
        exportBtn.className = 'btn-secondary';
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Results';
        exportBtn.onclick = () => this.exportSearchResults();

        // Add to search controls
        const searchControls = document.querySelector('.search-results-controls');
        if (searchControls) {
            searchControls.appendChild(exportBtn);
        }
    }

    exportSearchResults() {
        if (this.filteredResults.length === 0) {
            alert('No results to export');
            return;
        }

        // Create CSV content
        const csvContent = this.generateCSVContent();

        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `search-results-${this.searchQuery}-${Date.now()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    generateCSVContent() {
        const headers = ['Name', 'SKU', 'Price', 'Category', 'Stock', 'Rating', 'Manufacturer'];
        const rows = this.filteredResults.map(product => [
            `"${product.name}"`,
            `"${product.sku}"`,
            product.price,
            `"${product.category}"`,
            product.stock_quantity,
            product.rating,
            `"${product.manufacturer}"`
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

        return csvContent;
    }

    // Override setView to save preferences
    setView(view) {
        this.currentView = view;
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');

        if (gridViewBtn) gridViewBtn.classList.toggle('active', view === 'grid');
        if (listViewBtn) listViewBtn.classList.toggle('active', view === 'list');

        this.saveSearchPreferences();
        this.displayResults();
    }

    // Override clearAllFilters to save preferences
    clearAllFilters() {
        // Reset all filter inputs
        const checkboxes = document.querySelectorAll('.search-filters-sidebar input[type="checkbox"]');
        const radios = document.querySelectorAll('.search-filters-sidebar input[type="radio"]');
        const numberInputs = document.querySelectorAll('.search-filters-sidebar input[type="number"]');

        checkboxes.forEach(cb => cb.checked = cb.id === 'filter-in-stock'); // Keep in-stock checked
        radios.forEach(radio => radio.checked = false);
        numberInputs.forEach(input => input.value = '');

        // Reset filter state
        this.currentFilters = {
            categories: [],
            priceRange: { min: null, max: null },
            availability: ['in-stock'],
            rating: null,
            brands: []
        };

        this.saveSearchPreferences();
        this.applyFiltersAndSort();
        this.displayResults();
    }

    getMockProducts() {
        // Same mock data as in search.js
        return [
            {
                id: 1,
                name: "iPhone 15 Pro Max Screen",
                description: "Premium OLED display replacement for iPhone 15 Pro Max",
                price: 299.99,
                category: "iPhone 15 Parts",
                stock_quantity: 15,
                sku: "IPH15PM-OLED-001",
                manufacturer: "Apple Inc.",
                rating: 4.8,
                reviews: 128,
                images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"],
                tags: ["OLED", "Display", "Screen", "iPhone 15", "Pro Max"]
            },
            {
                id: 2,
                name: "iPhone 15 Pro Max Battery",
                description: "High-capacity lithium-ion battery for iPhone 15 Pro Max",
                price: 89.99,
                category: "iPhone 15 Parts",
                stock_quantity: 25,
                sku: "IPH15PM-BATT-001",
                manufacturer: "Apple Inc.",
                rating: 4.7,
                reviews: 156,
                images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"],
                tags: ["Battery", "Lithium-ion", "iPhone 15", "Pro Max"]
            },
            {
                id: 3,
                name: "iPhone 15 Pro Screen",
                description: "Super Retina XDR display for iPhone 15 Pro",
                price: 249.99,
                category: "iPhone 15 Parts",
                stock_quantity: 20,
                sku: "IPH15P-DISP-001",
                manufacturer: "Apple Inc.",
                rating: 4.9,
                reviews: 203,
                images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"],
                tags: ["Display", "Screen", "Retina XDR", "iPhone 15", "Pro"]
            },
            {
                id: 4,
                name: "iPhone 14 Pro Max OLED Display",
                description: "Premium OLED display replacement for iPhone 14 Pro Max",
                price: 279.99,
                category: "iPhone 14 Parts",
                stock_quantity: 18,
                sku: "IPH14PM-OLED-001",
                manufacturer: "Apple Inc.",
                rating: 4.8,
                reviews: 145,
                images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"],
                tags: ["OLED", "Display", "iPhone 14", "Pro Max"]
            },
            {
                id: 5,
                name: "iPhone 14 Battery Replacement",
                description: "Original Apple battery for iPhone 14 series",
                price: 69.99,
                category: "iPhone 14 Parts",
                stock_quantity: 30,
                sku: "IPH14-BATT-001",
                manufacturer: "Apple Inc.",
                rating: 4.6,
                reviews: 178,
                images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"],
                tags: ["Battery", "iPhone 14", "Original"]
            },
            {
                id: 6,
                name: "Galaxy S24 Ultra AMOLED Screen",
                description: "6.8-inch Dynamic AMOLED 2X display for Galaxy S24 Ultra",
                price: 199.99,
                category: "Samsung Galaxy Parts",
                stock_quantity: 12,
                sku: "SGS24U-DISP-001",
                manufacturer: "Samsung Electronics",
                rating: 4.7,
                reviews: 92,
                images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"],
                tags: ["AMOLED", "Display", "Galaxy S24", "Ultra"]
            },
            {
                id: 7,
                name: "Galaxy S24 Ultra Battery",
                description: "5000mAh battery with fast charging for Galaxy S24 Ultra",
                price: 89.99,
                category: "Samsung Galaxy Parts",
                stock_quantity: 15,
                sku: "SGS24U-BATT-001",
                manufacturer: "Samsung Electronics",
                rating: 4.8,
                reviews: 156,
                images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"],
                tags: ["Battery", "5000mAh", "Fast Charging", "Galaxy S24", "Ultra"]
            },
            {
                id: 8,
                name: "Galaxy S23 Ultra Screen Protector",
                description: "Tempered glass screen protector for Galaxy S23 Ultra",
                price: 24.99,
                category: "Samsung Galaxy Parts",
                stock_quantity: 40,
                sku: "SGS23U-PROTECT-001",
                manufacturer: "Samsung Electronics",
                rating: 4.5,
                reviews: 234,
                images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"],
                tags: ["Screen Protector", "Tempered Glass", "Galaxy S23", "Ultra"]
            },
            {
                id: 9,
                name: "MacBook Pro 16\" Retina Display",
                description: "16-inch Liquid Retina XDR display for MacBook Pro",
                price: 599.99,
                category: "MacBook Parts",
                stock_quantity: 5,
                sku: "MBP16-DISP-001",
                manufacturer: "Apple Inc.",
                rating: 4.9,
                reviews: 34,
                images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"],
                tags: ["Display", "Retina", "Liquid XDR", "MacBook Pro", "16-inch"]
            },
            {
                id: 10,
                name: "MacBook Pro 16\" Battery",
                description: "High-capacity lithium-polymer battery for MacBook Pro 16\"",
                price: 149.99,
                category: "MacBook Parts",
                stock_quantity: 8,
                sku: "MBP16-BATT-001",
                manufacturer: "Apple Inc.",
                rating: 4.6,
                reviews: 67,
                images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"],
                tags: ["Battery", "Lithium-polymer", "MacBook Pro", "16-inch"]
            },
            {
                id: 11,
                name: "MacBook Air M2 SSD 512GB",
                description: "512GB SSD upgrade for MacBook Air M2",
                price: 199.99,
                category: "MacBook Parts",
                stock_quantity: 10,
                sku: "MBAIR-M2-SSD-512",
                manufacturer: "Apple Inc.",
                rating: 4.8,
                reviews: 89,
                images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop"],
                tags: ["SSD", "512GB", "MacBook Air", "M2", "Storage"]
            },
            {
                id: 12,
                name: "Professional Repair Toolkit",
                description: "Complete toolkit for professional phone and laptop repairs",
                price: 89.99,
                category: "Repair Tools",
                stock_quantity: 15,
                sku: "TOOLKIT-PRO-001",
                manufacturer: "Midas Tools",
                rating: 4.9,
                reviews: 203,
                images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"],
                tags: ["Toolkit", "Professional", "Repair", "Tools"]
            },
            {
                id: 13,
                name: "Precision Screwdriver Set 32-Piece",
                description: "Professional precision screwdriver set with 32 different bits",
                price: 39.99,
                category: "Repair Tools",
                stock_quantity: 25,
                sku: "SCREWDRIVER-32PC",
                manufacturer: "Midas Tools",
                rating: 4.8,
                reviews: 145,
                images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"],
                tags: ["Screwdriver", "Precision", "32-Piece", "Tools"]
            },
            {
                id: 14,
                name: "iPhone Opening Tool Kit",
                description: "Specialized tools for opening and repairing iPhone devices",
                price: 29.99,
                category: "Repair Tools",
                stock_quantity: 20,
                sku: "IPHONE-TOOLS-001",
                manufacturer: "Midas Tools",
                rating: 4.7,
                reviews: 178,
                images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"],
                tags: ["iPhone", "Opening Tools", "Repair", "Specialized"]
            },
            {
                id: 15,
                name: "iPad Pro 12.9\" LCD Display",
                description: "Ultra Retina XDR display for iPad Pro 12.9-inch",
                price: 399.99,
                category: "iPad Parts",
                stock_quantity: 6,
                sku: "IPADPRO12-DISP-001",
                manufacturer: "Apple Inc.",
                rating: 4.7,
                reviews: 56,
                images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"],
                tags: ["LCD", "Display", "iPad Pro", "12.9-inch", "Ultra Retina"]
            },
            {
                id: 16,
                name: "iPad Air Battery Replacement",
                description: "High-capacity battery for iPad Air models",
                price: 79.99,
                category: "iPad Parts",
                stock_quantity: 12,
                sku: "IPADAIR-BATT-001",
                manufacturer: "Apple Inc.",
                rating: 4.6,
                reviews: 89,
                images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"],
                tags: ["Battery", "iPad Air", "High-capacity"]
            }
        ];
    }
}

// Global functions for HTML onclick handlers
function changePage(page) {
    if (window.searchResultsManager) {
        window.searchResultsManager.currentPage = page;
        window.searchResultsManager.displayResults();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchResultsManager = new SearchResultsManager();
});
