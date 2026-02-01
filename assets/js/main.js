/* ============================================
   AmplifyX Solutions - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Loader.init();
    Header.init();
    Navigation.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    Forms.init();
    ProjectSlideshow.init();
});

/* ============================================
   Loader
   ============================================ */
const Loader = {
    init() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        document.body.classList.add('loading');

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');

                // Trigger hero animations
                this.animateHero();
            }, 1800);
        });
    },

    animateHero() {
        const heroTitle = document.querySelector('.hero-title');
        const heroInfo = document.querySelector('.hero-info');
        const heroVisual = document.querySelector('.hero-visual');

        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(40px)';
            setTimeout(() => {
                heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 100);
        }

        if (heroInfo) {
            heroInfo.style.opacity = '0';
            heroInfo.style.transform = 'translateY(40px)';
            setTimeout(() => {
                heroInfo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroInfo.style.opacity = '1';
                heroInfo.style.transform = 'translateY(0)';
            }, 300);
        }

        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateX(40px)';
            setTimeout(() => {
                heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 500);
        }
    }
};

/* ============================================
   Header
   ============================================ */
const Header = {
    header: null,
    lastScrollY: 0,

    init() {
        this.header = document.getElementById('header');
        if (!this.header) return;

        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },

    handleScroll() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        this.updateActiveNav();

        this.lastScrollY = scrollY;
    },

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ============================================
   Navigation
   ============================================ */
const Navigation = {
    nav: null,
    toggle: null,
    isOpen: false,

    init() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('navToggle');

        if (!this.nav || !this.toggle) return;

        this.toggle.addEventListener('click', () => this.toggleNav());

        // Close nav when clicking a link
        this.nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.closeNav();
            });
        });

        // Close nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeNav();
            }
        });
    },

    toggleNav() {
        this.isOpen ? this.closeNav() : this.openNav();
    },

    openNav() {
        this.isOpen = true;
        this.nav.classList.add('active');
        this.toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeNav() {
        this.isOpen = false;
        this.nav.classList.remove('active');
        this.toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* ============================================
   Scroll Animations
   ============================================ */
const ScrollAnimations = {
    init() {
        // First add animation classes
        this.addAnimationClasses();
        // Then observe them
        this.observeElements();
    },

    observeElements() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Stagger children if has stagger class
                    if (entry.target.classList.contains('stagger')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.style.transitionDelay = `${index * 0.1}s`;
                        });
                    }
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in-up, .stagger, .text-reveal').forEach(el => {
            observer.observe(el);
        });
    },

    addAnimationClasses() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('fade-in-up');
        });

        // About quote
        const aboutQuote = document.querySelector('.about-quote');
        if (aboutQuote) aboutQuote.classList.add('fade-in-up');

        // Service items
        document.querySelectorAll('.service-item').forEach((el, index) => {
            el.classList.add('fade-in-up');
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        // Process cards
        const processGrid = document.querySelector('.process-grid');
        if (processGrid) processGrid.classList.add('stagger');

        // Slideshow container
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) slideshowContainer.classList.add('fade-in-up');

        // Pricing cards
        const pricingGrid = document.querySelector('.pricing-grid');
        if (pricingGrid) pricingGrid.classList.add('stagger');

        // CTA content
        const ctaContent = document.querySelector('.cta-content');
        if (ctaContent) ctaContent.classList.add('fade-in-up');
    }
};

/* ============================================
   Smooth Scroll
   ============================================ */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');

                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
};

/* ============================================
   Forms
   ============================================ */
const Forms = {
    init() {
        this.handleCtaForm();
        this.handleNewsletterForm();
    },

    handleCtaForm() {
        const form = document.getElementById('ctaForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    this.showSuccess(form, 'Thanks! We\'ll be in touch soon.');
                    form.reset();
                } else {
                    this.showSuccess(form, 'Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                this.showSuccess(form, 'Oops! Something went wrong. Please try again.');
            }
        });
    },

    handleNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    this.showSuccess(form, 'You\'re subscribed!');
                    form.reset();
                } else {
                    this.showSuccess(form, 'Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                this.showSuccess(form, 'Oops! Something went wrong. Please try again.');
            }
        });
    },

    showSuccess(form, message) {
        const existingMessage = form.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();

        const successEl = document.createElement('div');
        successEl.className = 'success-message';
        successEl.textContent = message;
        successEl.style.cssText = `
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: #c8ff00;
            font-size: 14px;
            font-weight: 500;
        `;

        form.style.position = 'relative';
        form.appendChild(successEl);

        setTimeout(() => successEl.remove(), 3000);
    }
};

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   Additional Interactions
   ============================================ */

// Magnetic button effect
document.querySelectorAll('.btn-primary, .btn-circle').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Parallax effect on hero
window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual && scrollY < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
}, 16));

// Process cards carousel (optional)
const ProcessCarousel = {
    currentIndex: 0,
    cards: null,
    prevBtn: null,
    nextBtn: null,

    init() {
        this.cards = document.querySelectorAll('.process-card');
        this.prevBtn = document.querySelector('.process-prev');
        this.nextBtn = document.querySelector('.process-next');

        if (!this.cards.length || !this.prevBtn || !this.nextBtn) return;

        // Only enable carousel on mobile
        if (window.innerWidth > 768) return;

        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.updateView();
    },

    prev() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateView();
    },

    next() {
        this.currentIndex = Math.min(this.cards.length - 1, this.currentIndex + 1);
        this.updateView();
    },

    updateView() {
        this.cards.forEach((card, index) => {
            card.style.display = index === this.currentIndex ? 'block' : 'none';
        });

        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.cards.length - 1 ? '0.3' : '1';
    }
};

// Initialize carousel on mobile
if (window.innerWidth <= 768) {
    ProcessCarousel.init();
}

/* ============================================
   Project Slideshow
   ============================================ */
const ProjectSlideshow = {
    slides: null,
    dots: null,
    prevBtn: null,
    nextBtn: null,
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000, // 5 seconds

    init() {
        this.slides = document.querySelectorAll('.slideshow-slide');
        this.dots = document.querySelectorAll('.slideshow-dots .dot');
        this.prevBtn = document.querySelector('.slideshow-prev');
        this.nextBtn = document.querySelector('.slideshow-next');

        if (!this.slides.length) return;

        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start auto-play
        this.startAutoPlay();

        // Pause on hover
        const container = document.querySelector('.slideshow-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoPlay());
            container.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    },

    goToSlide(index) {
        // Remove active class from current
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Update index
        this.currentIndex = index;

        // Add active class to new
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    },

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    },

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
};
