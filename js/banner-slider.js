/**
 * CultivateCrest - Banner Slider
 * Auto-sliding hero banner with navigation controls
 */

class BannerSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.slides = Array.from(this.slider.querySelectorAll('.hero-slide'));
        this.dots = Array.from(this.slider.querySelectorAll('.slider-dots .dot'));
        this.prevBtn = this.slider.querySelector('.slider-prev');
        this.nextBtn = this.slider.querySelector('.slider-next');
        this.currentIndex = 0;
        this.interval = null;
        this.autoplayDelay = 5000; // 5 seconds
    }

    init() {
        // Set up navigation button events
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoplay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoplay();
            });
        }

        // Set up dot indicator events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoplay();
            });
        });

        // Pause autoplay on hover
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });

        // Resume autoplay on mouse leave
        this.slider.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
                this.resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoplay();
            }
        });

        // Touch/Swipe support
        this.initTouchEvents();

        // Start autoplay
        this.startAutoplay();
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentIndex].classList.remove('active');
        if (this.dots[this.currentIndex]) {
            this.dots[this.currentIndex].classList.remove('active');
        }

        // Update current index
        this.currentIndex = index;

        // Add active class to new slide and dot
        this.slides[this.currentIndex].classList.add('active');
        if (this.dots[this.currentIndex]) {
            this.dots[this.currentIndex].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        if (this.slides.length > 1) {
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

    initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, minSwipeDistance);
        }, { passive: true });
    }

    handleSwipe(startX, endX, minDistance) {
        const distance = endX - startX;

        if (Math.abs(distance) >= minDistance) {
            if (distance > 0) {
                // Swipe right - go to previous slide
                this.previousSlide();
            } else {
                // Swipe left - go to next slide
                this.nextSlide();
            }
            this.resetAutoplay();
        }
    }

    destroy() {
        this.stopAutoplay();
        // Remove event listeners if needed
    }
}

// Initialize banner slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slider = new BannerSlider(heroSlider);
        slider.init();

        // Store reference globally for potential external control
        window.bannerSlider = slider;
    }
});
