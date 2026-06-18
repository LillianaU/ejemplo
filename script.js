/* ============================================
   OCEAN DIVE — Enhanced JavaScript
   ============================================ */

// ==========================================
// PRELOADER
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

// ==========================================
// PARTICLE OCEAN BACKGROUND
// ==========================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = -Math.random() * 0.8 - 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 190 : 260; // cyan or violet
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.001;

            if (this.y < -10 || this.opacity <= 0) {
                this.reset();
                this.y = canvas.height + 10;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================
// SCROLL REVEAL (IntersectionObserver)
// ==========================================
function initScrollReveal() {
    const elements = document.querySelectorAll('.appear');
    if (!elements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));
}

// ==========================================
// STICKY NAVBAR
// ==========================================
function initStickyNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ==========================================
// MOBILE HAMBURGER MENU
// ==========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    const overlay = document.querySelector('.mobile-overlay');
    if (!hamburger || !navUl) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navUl.classList.toggle('mobile-open');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navUl.classList.contains('mobile-open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navUl.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// ==========================================
// ANIMATED COUNTER (Stats section)
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 2000;
                const start = performance.now();

                function easeOutExpo(t) {
                    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                }

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutExpo(progress);
                    const current = Math.floor(easedProgress * target);

                    el.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target.toLocaleString() + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (!cards.length || !dots.length) return;

    let currentIndex = 0;
    let autoPlayInterval;

    function showTestimonial(index) {
        cards.forEach(c => c.classList.remove('active-testimonial'));
        dots.forEach(d => d.classList.remove('active-dot'));
        cards[index].classList.add('active-testimonial');
        dots[index].classList.add('active-dot');
        currentIndex = index;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showTestimonial(i);
            resetAutoPlay();
        });
    });

    function autoPlay() {
        autoPlayInterval = setInterval(() => {
            let next = (currentIndex + 1) % cards.length;
            showTestimonial(next);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlay();
    }

    showTestimonial(0);
    autoPlay();
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target === '#') return;

            const element = document.querySelector(target);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// CATALOG — SEARCH & FILTER
// ==========================================
function initCatalog() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    const catalogGrid = document.getElementById('catalogGrid');

    if (!catalogCards.length) return;

    function filterCatalog() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        catalogCards.forEach((card) => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesFilter = filter === 'all' || category === filter;
            const matchesSearch = !query || title.includes(query) || description.includes(query);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInCard 0.4s ease forwards';
                card.style.animationDelay = `${visibleCount * 0.08}s`;
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.style.animation = '';
            }
        });

        // Show/hide no results message
        let noResults = document.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResults && catalogGrid) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<span>🔍</span>No packages found. Try a different search.';
                catalogGrid.appendChild(noResults);
            }
        } else {
            if (noResults) noResults.remove();
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', filterCatalog);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCatalog);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filterCatalog();
        });
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            filterCatalog();
        });
    });
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rate = scrollY * 0.15;
        heroImage.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
}

// ==========================================
// CARD ANIMATION KEYFRAMES (inject dynamically)
// ==========================================
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInCard {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    injectAnimations();
    initParticles();
    initScrollReveal();
    initStickyNav();
    initMobileMenu();
    initCounters();
    initTestimonials();
    initSmoothScroll();
    initCatalog();
    initParallax();
});
