/**
 * CultivateCrest - Products Handler
 * Loads and displays products from products.json
 */

// Store products globally for search functionality
let allProducts = [];

// Load products when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        loadProducts();
    }
});

/**
 * Load products from JSON file
 */
async function loadProducts() {
    const productGrid = document.getElementById('productGrid');

    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }

        const products = await response.json();
        allProducts = products; // Store for search functionality

        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = `
            <div class="error">
                <p>Unable to load products. Please try again later.</p>
            </div>
        `;
    }
}

/**
 * Display products in the grid
 */
function displayProducts(products, containerId = 'productGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="error">
                <p>No products found.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

/**
 * Create HTML for a product card
 */
function createProductCard(product) {
    const discount = calculateDiscountPercentage(product.originalPrice, product.price);

    // Determine if product has image or should use icon
    const hasImage = product.image && product.image.trim() !== '';

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${hasImage ? `
                    <img src="${product.image}"
                         alt="${product.name}"
                         loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="image-placeholder" style="display:none;">
                        <i class="fas ${product.icon}"></i>
                    </div>
                ` : `
                    <div class="image-placeholder">
                        <i class="fas ${product.icon}"></i>
                    </div>
                `}
                ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice > product.price ?
                        `<span class="original-price">₹${product.originalPrice}</span>` :
                        ''
                    }
                </div>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">View Details</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Calculate discount percentage
 */
function calculateDiscountPercentage(originalPrice, currentPrice) {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Filter products by category
 */
function filterProductsByCategory(category) {
    if (!category || category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

/**
 * Sort products
 */
function sortProducts(sortBy) {
    let sorted = [...allProducts];

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'discount':
            sorted.sort((a, b) => {
                const discountA = calculateDiscountPercentage(a.originalPrice, a.price);
                const discountB = calculateDiscountPercentage(b.originalPrice, b.price);
                return discountB - discountA;
            });
            break;
        default:
            // Default order
            break;
    }

    displayProducts(sorted);
}

/**
 * Get product by ID
 */
function getProductById(id) {
    return allProducts.find(p => p.id == id);
}

/**
 * Get products by category
 */
function getProductsByCategory(category) {
    if (!category) return allProducts;
    return allProducts.filter(p => p.category === category);
}

/**
 * Get related products (same category, excluding current product)
 */
function getRelatedProducts(productId, category, limit = 4) {
    return allProducts
        .filter(p => p.category === category && p.id != productId)
        .slice(0, limit);
}

/**
 * Get trending/featured products (e.g., best discounts)
 */
function getFeaturedProducts(limit = 6) {
    return allProducts
        .map(p => ({
            ...p,
            discount: calculateDiscountPercentage(p.originalPrice, p.price)
        }))
        .sort((a, b) => b.discount - a.discount)
        .slice(0, limit);
}

// Export functions for use in other scripts
window.ProductsModule = {
    allProducts: () => allProducts,
    displayProducts,
    filterProductsByCategory,
    sortProducts,
    getProductById,
    getProductsByCategory,
    getRelatedProducts,
    getFeaturedProducts,
    createProductCard
};
