/**
 * CultivateCrest - Search Functionality
 * Handles product search with autocomplete
 */

document.addEventListener('DOMContentLoaded', function() {
    initSearch();
});

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchBtn || !searchBox || !searchInput || !searchResults) {
        return; // Search elements not present on this page
    }

    // Toggle search box
    searchBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });

    // Prevent search box from closing when clicking inside
    searchBox.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Search on input with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300); // 300ms debounce
    });

    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        }
    });
}

/**
 * Perform product search
 */
async function performSearch(query) {
    const searchResults = document.getElementById('searchResults');

    try {
        // Get products from the ProductsModule or fetch directly
        let products = [];

        if (window.ProductsModule && window.ProductsModule.allProducts().length > 0) {
            products = window.ProductsModule.allProducts();
        } else {
            // Fetch products if not already loaded
            const response = await fetch('data/products.json');
            products = await response.json();
        }

        // Filter products based on search query
        const results = searchProducts(products, query);

        // Display results
        displaySearchResults(results, query);

    } catch (error) {
        console.error('Search error:', error);
        searchResults.innerHTML = '<div class="search-error">Error performing search</div>';
    }
}

/**
 * Search products by query
 */
function searchProducts(products, query) {
    const searchTerm = query.toLowerCase();

    return products.filter(product => {
        // Search in product name
        if (product.name.toLowerCase().includes(searchTerm)) {
            return true;
        }

        // Search in category
        if (product.category.toLowerCase().includes(searchTerm)) {
            return true;
        }

        // Search in description
        if (product.description && product.description.toLowerCase().includes(searchTerm)) {
            return true;
        }

        // Search in benefits
        if (product.benefits && product.benefits.some(benefit =>
            benefit.toLowerCase().includes(searchTerm)
        )) {
            return true;
        }

        return false;
    });
}

/**
 * Display search results
 */
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <p>No products found for "${escapeHtml(query)}"</p>
            </div>
        `;
        return;
    }

    // Limit results to 5 for autocomplete
    const limitedResults = results.slice(0, 5);

    searchResults.innerHTML = `
        <div class="search-results-list">
            ${limitedResults.map(product => createSearchResultItem(product, query)).join('')}
            ${results.length > 5 ? `
                <div class="search-results-footer">
                    <p>Showing ${limitedResults.length} of ${results.length} results</p>
                </div>
            ` : ''}
        </div>
    `;

    // Add click handlers to result items
    const resultItems = searchResults.querySelectorAll('.search-result-item');
    resultItems.forEach(item => {
        item.addEventListener('click', function() {
            const productId = this.dataset.productId;
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

/**
 * Create HTML for a search result item
 */
function createSearchResultItem(product, query) {
    const discount = calculateDiscountPercentage(product.originalPrice, product.price);

    return `
        <div class="search-result-item" data-product-id="${product.id}">
            <div class="search-result-icon">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="search-result-info">
                <div class="search-result-name">${highlightMatch(product.name, query)}</div>
                <div class="search-result-price">
                    <span class="price">₹${product.price}</span>
                    ${discount > 0 ? `<span class="discount">${discount}% off</span>` : ''}
                </div>
            </div>
            <div class="search-result-arrow">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `;
}

/**
 * Highlight matching text in search results
 */
function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<strong>$1</strong>');
}

/**
 * Calculate discount percentage
 */
function calculateDiscountPercentage(originalPrice, currentPrice) {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Escape regex special characters
 */
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Add search result styles dynamically
const searchStyles = `
<style>
.search-results-list {
    margin-top: 0.5rem;
}

.search-result-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-item:hover {
    background-color: var(--bg-light);
}

.search-result-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--bg-light) 0%, #E8E8E8 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.search-result-icon i {
    color: var(--text-light);
    font-size: 1.25rem;
}

.search-result-info {
    flex: 1;
}

.search-result-name {
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
}

.search-result-name strong {
    color: var(--primary-color);
}

.search-result-price {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.search-result-price .price {
    font-weight: 600;
    color: var(--primary-color);
}

.search-result-price .discount {
    background-color: var(--error-color);
    color: white;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.75rem;
}

.search-result-arrow {
    color: var(--text-light);
    font-size: 0.875rem;
}

.no-results,
.search-error {
    padding: 1rem;
    text-align: center;
    color: var(--text-light);
}

.search-results-footer {
    padding: 0.75rem;
    text-align: center;
    background-color: var(--bg-light);
    font-size: 0.85rem;
    color: var(--text-light);
}

.search-results-footer p {
    margin: 0;
}
</style>
`;

// Inject styles
if (!document.getElementById('search-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'search-styles';
    styleElement.innerHTML = searchStyles;
    document.head.appendChild(styleElement.firstElementChild);
}
