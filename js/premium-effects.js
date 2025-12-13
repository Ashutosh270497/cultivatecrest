/**
 * CultivateCrest - Premium Effects
 * World-Class E-commerce Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initBackToTop();
    initDarkMode();
    initScrollReveal();
    initTiltEffect();
    initStickyHeader();
    initParallaxHero();
    initToastSystem();
    initQuickView();
    initCounterAnimation();
    initMarquee();
});

// Re-initialize effects when products are loaded dynamically
window.addEventListener('productsUpdated', function() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
        initTiltEffect();
        initQuickView();
        initScrollReveal();
    }, 100);
});

/* ===== Scroll Progress Bar ===== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ===== Back to Top Button ===== */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== Dark Mode Toggle ===== */
function initDarkMode() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i><i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(themeToggle);

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Show toast notification
        showToast(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', 'info');
    });
}

/* ===== Scroll Reveal Animations ===== */
function initScrollReveal() {
    // Add reveal classes to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .product-card, .benefit-card, .blog-card, ' +
        '.value-card, .feature-item, .why-card, .faq-item, ' +
        '.content-text, .content-image'
    );

    revealElements.forEach((el, index) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Add stagger to grids
    const grids = document.querySelectorAll('.product-grid, .benefits-grid, .blog-grid, .values-grid, .features-grid');
    grids.forEach(grid => {
        grid.classList.add('reveal-stagger');
    });

    // Intersection Observer for reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Don't unobserve to allow re-animation if needed
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

/* ===== 3D Tilt Effect for Cards ===== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.product-card, .blog-card');

    cards.forEach(card => {
        // Skip if already initialized
        if (card.dataset.tiltInit) return;
        card.dataset.tiltInit = 'true';
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ===== Sticky Header Enhancement ===== */
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/* ===== Parallax Hero Effect ===== */
function initParallaxHero() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    // Add floating shapes
    const floatingShapes = document.createElement('div');
    floatingShapes.className = 'floating-shapes';
    floatingShapes.innerHTML = `
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
    `;

    const sliderContainer = heroSlider.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.prepend(floatingShapes);
    }

    // Mouse parallax effect
    heroSlider.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height } = heroSlider.getBoundingClientRect();

        const moveX = (clientX - width / 2) / 50;
        const moveY = (clientY - height / 2) / 50;

        const shapes = floatingShapes.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 0.5;
            shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });
}

/* ===== Toast Notification System ===== */
let toastContainer;

function initToastSystem() {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Remove toast after duration
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);

    return toast;
}

// Expose globally
window.showToast = showToast;

/* ===== Quick View Modal ===== */
function initQuickView() {
    // Add quick view buttons to product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Check if quick view button already exists
        if (card.querySelector('.quick-view-btn')) return;

        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'quick-view-btn';
        quickViewBtn.innerHTML = '<i class="fas fa-eye"></i> Quick View';

        const productImage = card.querySelector('.product-image');
        if (productImage) {
            productImage.appendChild(quickViewBtn);
        }

        quickViewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(card);
        });
    });

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="quick-view-close" aria-label="Close quick view">
                <i class="fas fa-times"></i>
            </button>
            <div class="quick-view-image"></div>
            <div class="quick-view-details"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal events
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.quick-view-close')) {
            closeQuickView();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuickView();
        }
    });
}

function openQuickView(card) {
    const modal = document.querySelector('.quick-view-modal');
    const imageContainer = modal.querySelector('.quick-view-image');
    const detailsContainer = modal.querySelector('.quick-view-details');

    // Get product info from card
    const productId = card.dataset.productId || '';
    const productImage = card.querySelector('.product-image img, .product-image-slider img.active');
    const productName = card.querySelector('.product-name')?.textContent || 'Product';
    const productPrice = card.querySelector('.current-price')?.textContent || '';
    const originalPrice = card.querySelector('.original-price')?.textContent || '';
    const discount = card.querySelector('.discount-badge')?.textContent || '';

    // Build product detail URL with ID
    const productDetailUrl = productId ? `product-detail.html?id=${productId}` : 'product-detail.html';

    // Populate modal
    imageContainer.innerHTML = productImage
        ? `<img src="${productImage.src}" alt="${productName}" style="width: 100%; height: 100%; object-fit: contain; padding: 20px;">`
        : '<div class="image-placeholder"><i class="fas fa-seedling"></i></div>';

    detailsContainer.innerHTML = `
        <div style="padding: 30px;">
            ${discount ? `<span class="discount-badge" style="margin-bottom: 15px; display: inline-block;">${discount}</span>` : ''}
            <h2 style="font-size: 1.75rem; margin-bottom: 15px;">${productName}</h2>
            <div style="margin-bottom: 20px;">
                <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${productPrice}</span>
                ${originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); margin-left: 10px;">${originalPrice}</span>` : ''}
            </div>
            <p style="color: var(--text-light); margin-bottom: 25px; line-height: 1.7;">
                Premium quality superfood, carefully sourced and packed to retain maximum nutrients.
                100% organic, lab tested, and FSSAI certified for your peace of mind.
            </p>
            <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                <a href="#" class="btn btn-primary" onclick="addToCartAnimation(this); return false;">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </a>
                <a href="${productDetailUrl}" class="btn btn-secondary">View Details</a>
            </div>
            <div style="display: flex; gap: 20px; color: var(--text-muted); font-size: 0.9rem;">
                <span><i class="fas fa-check-circle" style="color: var(--success-color);"></i> In Stock</span>
                <span><i class="fas fa-truck"></i> Free Shipping</span>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ===== Add to Cart Animation ===== */
function addToCartAnimation(btn) {
    btn.classList.add('clicked');

    setTimeout(() => {
        btn.classList.remove('clicked');
        btn.classList.add('success');
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';

        showToast('Product added to cart!', 'success');

        setTimeout(() => {
            btn.classList.remove('success');
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        }, 2000);
    }, 300);
}

// Expose globally
window.addToCartAnimation = addToCartAnimation;

/* ===== Counter Animation ===== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter, [data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count') || target.textContent);

                animateCounter(target, 0, countTo, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * easeProgress);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ===== Marquee Banner ===== */
function initMarquee() {
    const marquees = document.querySelectorAll('.marquee');

    marquees.forEach(marquee => {
        const content = marquee.querySelector('.marquee-content');
        if (content) {
            // Duplicate content for seamless loop
            content.innerHTML += content.innerHTML;
        }
    });
}

/* ===== Smooth Image Loading ===== */
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    }
});

/* ===== Button Ripple Effect ===== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '200px', height: '200px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    });
});

/* ===== Keyboard Navigation Enhancement ===== */
document.addEventListener('keydown', (e) => {
    // Tab key shows focus ring
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/* ===== Lazy Loading for Images ===== */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ===== Performance: Debounce & Throttle ===== */
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

function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations go here if needed
}, 16);

window.addEventListener('scroll', throttledScroll);

// ===== Animated Counter =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseFloat(counter.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;

            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', initCounterAnimation);

// ===== Enhanced Scroll Reveal for New Sections =====
function initEnhancedScrollReveal() {
    const revealElements = document.querySelectorAll('.stat-counter-item, .testimonial-card, .benefit-card-modern');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initEnhancedScrollReveal);

console.log('Premium Effects Initialized');
