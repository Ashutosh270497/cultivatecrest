/**
 * CultivateCrest - Product Image Slider
 * Handles automatic image sliding for product cards
 */

class ProductImageSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.images = Array.from(this.slider.querySelectorAll('.slider-image'));
        this.indicators = Array.from(this.slider.parentElement.querySelectorAll('.slider-indicators .indicator'));
        this.currentIndex = 0;
        this.interval = null;
        this.autoplayDelay = 3000; // 3 seconds

        if (this.images.length > 1) {
            this.init();
        }
    }

    init() {
        // Set up indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Auto-sliding disabled - users can click indicators to change images
    }

    goToSlide(index) {
        // Remove active class from current slide
        this.images[this.currentIndex].classList.remove('active');
        if (this.indicators[this.currentIndex]) {
            this.indicators[this.currentIndex].classList.remove('active');
        }

        // Update current index
        this.currentIndex = index;

        // Add active class to new slide
        this.images[this.currentIndex].classList.add('active');
        if (this.indicators[this.currentIndex]) {
            this.indicators[this.currentIndex].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    startAutoplay() {
        if (this.images.length > 1) {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        }
    }

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Initialize all product sliders when products are loaded
function initProductSliders() {
    const sliders = document.querySelectorAll('.product-image-slider');
    const sliderInstances = [];

    sliders.forEach(slider => {
        const instance = new ProductImageSlider(slider);
        sliderInstances.push(instance);
    });

    return sliderInstances;
}

// Wait for products to load, then initialize sliders
let sliderCheckInterval;
let sliderInstances = [];

function checkAndInitSliders() {
    const sliders = document.querySelectorAll('.product-image-slider');

    if (sliders.length > 0) {
        // Clear the interval once sliders are found
        if (sliderCheckInterval) {
            clearInterval(sliderCheckInterval);
        }

        // Stop any existing sliders
        sliderInstances.forEach(instance => instance.stopAutoplay());

        // Initialize new sliders
        sliderInstances = initProductSliders();
    }
}

// Start checking for sliders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initial check
    checkAndInitSliders();

    // Keep checking every 500ms for dynamically loaded products
    sliderCheckInterval = setInterval(checkAndInitSliders, 500);

    // Stop checking after 5 seconds (products should be loaded by then)
    setTimeout(() => {
        if (sliderCheckInterval) {
            clearInterval(sliderCheckInterval);
        }
    }, 5000);
});

// Re-initialize sliders when products are filtered or sorted
window.addEventListener('productsUpdated', function() {
    checkAndInitSliders();
});
