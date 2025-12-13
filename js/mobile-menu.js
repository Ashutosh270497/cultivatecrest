/**
 * CultivateCrest - Mobile Menu
 * Handles responsive mobile navigation drawer with accessibility
 */

// Track focus trap handler to prevent duplicate listeners
let focusTrapHandler = null;

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    if (!mobileMenuBtn || !mobileMenuDrawer || !mobileMenuOverlay || !closeMenuBtn) {
        return; // Elements not present
    }

    // Set initial ARIA attributes
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-controls', 'mobileMenuDrawer');
    mobileMenuDrawer.setAttribute('role', 'dialog');
    mobileMenuDrawer.setAttribute('aria-modal', 'true');
    mobileMenuDrawer.setAttribute('aria-labelledby', 'mobileMenuTitle');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');

    // Add ID to menu title for aria-labelledby
    const menuTitle = mobileMenuDrawer.querySelector('.mobile-menu-header h2');
    if (menuTitle) {
        menuTitle.id = 'mobileMenuTitle';
    }

    // Open menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMobileMenu();
    });

    // Close menu via close button
    closeMenuBtn.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Close menu via overlay
    mobileMenuOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Close menu when clicking on navigation links
    const mobileNavLinks = mobileMenuDrawer.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close menu after a short delay to allow navigation
            setTimeout(() => {
                closeMobileMenu();
            }, 200);
        });
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuDrawer.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Prevent body scroll when menu is open
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (mobileMenuDrawer.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });

    observer.observe(mobileMenuDrawer, {
        attributes: true
    });
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenuDrawer && mobileMenuOverlay) {
        mobileMenuDrawer.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update ARIA states
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }

        // Trap focus within menu
        trapFocus(mobileMenuDrawer);
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenuDrawer && mobileMenuOverlay) {
        mobileMenuDrawer.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Update ARIA states
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        // Remove focus trap handler
        releaseFocusTrap(mobileMenuDrawer);

        // Return focus to menu button
        if (mobileMenuBtn) {
            mobileMenuBtn.focus();
        }
    }
}

/**
 * Trap focus within an element for accessibility
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the close button first for better UX
    const closeBtn = element.querySelector('.close-menu-btn');
    if (closeBtn) {
        closeBtn.focus();
    } else if (firstFocusable) {
        firstFocusable.focus();
    }

    // Remove existing handler if present to prevent duplicates
    if (focusTrapHandler) {
        element.removeEventListener('keydown', focusTrapHandler);
    }

    // Create focus trap handler
    focusTrapHandler = function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    // Add handler
    element.addEventListener('keydown', focusTrapHandler);
}

/**
 * Release focus trap from an element
 */
function releaseFocusTrap(element) {
    if (focusTrapHandler) {
        element.removeEventListener('keydown', focusTrapHandler);
        focusTrapHandler = null;
    }
}

/**
 * Handle window resize
 */
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 990) {
            closeMobileMenu();
        }
    }, 250);
});

// Export functions for external use
window.MobileMenuModule = {
    open: openMobileMenu,
    close: closeMobileMenu
};
