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

    // Add event listener for variant changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('variant-select')) {
            handleVariantChange(e.target);
        }
    });
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

        // Filter to show only active products
        const activeProducts = products.filter(product => product.active !== false);
        allProducts = activeProducts; // Store for search functionality

        displayProducts(activeProducts);
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

    // Dispatch event to notify that products have been updated
    window.dispatchEvent(new Event('productsUpdated'));
}

/**
 * Create HTML for a product card
 */
function createProductCard(product) {
    const discount = calculateDiscountPercentage(product.originalPrice, product.price);

    // Get images array or fallback to single image
    const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
    const hasImages = images.length > 0;

    // Create slider HTML for multiple images
    let imageSliderHTML = '';
    if (hasImages) {
        imageSliderHTML = `
            <div class="product-image-slider" data-product-id="${product.id}">
                ${images.map((img, index) => `
                    <img src="${img}"
                         alt="${product.name} - Image ${index + 1}"
                         class="slider-image ${index === 0 ? 'active' : ''}"
                         loading="lazy"
                         onerror="this.style.display='none';">
                `).join('')}
            </div>
            ${images.length > 1 ? `
                <div class="slider-indicators">
                    ${images.map((_, index) => `
                        <span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                    `).join('')}
                </div>
            ` : ''}
        `;
    } else {
        imageSliderHTML = `
            <div class="image-placeholder">
                <i class="fas ${product.icon}"></i>
            </div>
        `;
    }

    // Generate star rating HTML
    const rating = product.rating || 4.5;
    const reviews = product.reviews || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    // Get first variant for selector
    const firstVariant = product.variants ? product.variants[0] : '500g';

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${imageSliderHTML}
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${starsHTML}</span>
                    <span class="rating-text">(${rating}/5 Star${reviews > 0 ? ` · ${reviews} Reviews` : ''})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹ ${product.price}</span>
                    ${product.originalPrice > product.price ?
                        `<span class="original-price">₹ ${product.originalPrice}</span>` :
                        ''
                    }
                </div>
                <div class="product-actions">
                    <select class="variant-select" data-product-id="${product.id}">
                        ${product.variants ? product.variants.map(variant =>
                            `<option value="${variant}">${variant}</option>`
                        ).join('') : '<option value="500g">500g</option>'}
                    </select>
                    <a href="${product.amazonLink}" target="_blank" class="btn btn-add-cart">ADD TO CART</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Handle variant change
 */
function handleVariantChange(selectElement) {
    const productId = selectElement.getAttribute('data-product-id');
    const selectedVariant = selectElement.value;
    const product = getProductById(productId);

    if (product && product.variantPricing && product.variantPricing[selectedVariant]) {
        const pricing = product.variantPricing[selectedVariant];
        const productCard = selectElement.closest('.product-card');

        if (productCard) {
            // Update current price
            const currentPriceEl = productCard.querySelector('.current-price');
            if (currentPriceEl) {
                currentPriceEl.textContent = `₹ ${pricing.price}`;
            }

            // Update original price
            const originalPriceEl = productCard.querySelector('.original-price');
            if (originalPriceEl) {
                originalPriceEl.textContent = `₹ ${pricing.originalPrice}`;
            } else if (pricing.originalPrice > pricing.price) {
                // Add original price if it doesn't exist but there's a discount
                const priceDiv = productCard.querySelector('.product-price');
                if (priceDiv && !priceDiv.querySelector('.original-price')) {
                    const originalSpan = document.createElement('span');
                    originalSpan.className = 'original-price';
                    originalSpan.textContent = `₹ ${pricing.originalPrice}`;
                    priceDiv.appendChild(originalSpan);
                }
            }
        }
    }
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
