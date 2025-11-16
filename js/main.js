/**
 * CultivateCrest - Main JavaScript
 * Handles general functionality and initialization
 */

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Initialize header scroll effect
    initHeaderScroll();
});

/**
 * Handle Newsletter Form Submission
 * Uses Formspree for form handling (free tier: 50 submissions/month)
 */
async function handleNewsletterSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');
    const email = emailInput.value.trim();

    if (!email) {
        showMessage(formMessage, 'Please enter your email address.', 'error');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showMessage(formMessage, 'Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    try {
        // TODO: Replace with your Formspree endpoint
        // Sign up at https://formspree.io and get your form endpoint
        const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ENDPOINT_HERE';

        if (FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT_HERE') {
            // Demo mode - simulate success
            setTimeout(() => {
                showMessage(formMessage, 'Thank you for subscribing! (Demo mode - configure Formspree to enable)', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
            return;
        }

        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            showMessage(formMessage, 'Thank you for subscribing! We\'ll keep you updated.', 'success');
            emailInput.value = '';
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        showMessage(formMessage, 'Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Contact Form Submission
 */
async function handleContactSubmit(e) {
    e.preventDefault();

    const formMessage = document.getElementById('contactFormMessage');
    const formData = new FormData(e.target);

    // Validate required fields
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
        showMessage(formMessage, 'Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(formMessage, 'Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // TODO: Replace with your Formspree endpoint
        const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ENDPOINT_HERE';

        if (FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT_HERE') {
            // Demo mode - simulate success
            setTimeout(() => {
                showMessage(formMessage, 'Message sent successfully! (Demo mode - configure Formspree to enable)', 'success');
                e.target.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
            return;
        }

        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: formData.get('phone'),
                subject: subject,
                message: message
            })
        });

        if (response.ok) {
            showMessage(formMessage, 'Thank you for your message! We\'ll get back to you soon.', 'success');
            e.target.reset();
        } else {
            throw new Error('Message sending failed');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showMessage(formMessage, 'Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Show message to user
 */
function showMessage(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.className = 'form-message';

    if (type === 'success') {
        element.classList.add('success');
    } else if (type === 'error') {
        element.style.color = '#E74C3C';
    }

    // Clear message after 5 seconds
    setTimeout(() => {
        element.textContent = '';
        element.className = 'form-message';
        element.style.color = '';
    }, 5000);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Lazy load images (if needed in future)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Utility: Debounce function
 */
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

/**
 * Utility: Format currency
 */
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Utility: Calculate discount percentage
 */
function calculateDiscount(originalPrice, currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Export utilities for use in other scripts
window.CultivateCrest = {
    formatCurrency,
    calculateDiscount,
    debounce,
    showMessage,
    isValidEmail
};
