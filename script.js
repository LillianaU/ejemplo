document.addEventListener('DOMContentLoaded', () => {

    // =============== LOADING SCREEN ===============

    const loader = document.getElementById('loader');
    const siteWrapper = document.querySelector('.site-wrapper');

    setTimeout(() => {
        loader.classList.add('hidden');
        siteWrapper.classList.add('visible');
    }, 3000);

    // =============== FLOATING 3D DESSERTS ===============

    const desserts = ['🎂', '🧁', '🍰', '🍪', '🍩', '🥐', '🍬', '🍫', '✨', '🍭', '🥮'];
    const specialItems = ['✨', '🌸', '💫', '💖', '🕊️', '🌺', '✿', '🪷', '💗', '🌷', '🦋'];
    const depths = ['far', 'mid', 'near'];

    function createFloatingScene(containerId, count, items) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const pool = items || desserts;
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const depth = depths[Math.floor(Math.random() * depths.length)];
            el.className = 'floating-item ' + depth;
            el.textContent = pool[Math.floor(Math.random() * pool.length)];
            el.style.left = Math.random() * 94 + '%';
            el.style.fontSize = (16 + Math.random() * 18) + 'px';
            el.style.animationDuration = (8 + Math.random() * 12) + 's';
            el.style.animationDelay = -(Math.random() * 25) + 's';
            container.appendChild(el);
        }
    }

    createFloatingScene('floating-hero', 15);
    createFloatingScene('floating-footer', 10);
    createFloatingScene('floating-especiales', 14, specialItems);

    // =============== MOBILE NAV TOGGLE ===============

    const toggleBtn = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // =============== SCROLL ANIMATIONS ===============

    const appearElements = document.querySelectorAll('.appear');

    const checkAppear = () => {
        appearElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elHeight = rect.height;
            if (rect.top < windowHeight - 80 && rect.top > -elHeight) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };

    checkAppear();

    window.addEventListener('scroll', checkAppear);

    // =============== PARALLAX SCROLL ===============

    const parallaxSections = document.querySelectorAll('.parallax-section');
    const floatingScenes = document.querySelectorAll('.floating-scene');
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxSections.forEach(section => {
            const speed = parseFloat(section.dataset.speed) || 0.5;
            const rect = section.getBoundingClientRect();
            const offset = rect.top * speed * 0.4;
            const bg = section.querySelector('.parallax-bg');
            if (bg) {
                bg.style.transform = 'translateY(' + offset + 'px)';
            }
        });

        floatingScenes.forEach(scene => {
            const speed = scene.id === 'floating-hero' ? 0.06 : 0.03;
            scene.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        });
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    // =============== FORM VALIDATION ===============

    const form = document.getElementById('order-form');
    const successMsg = document.getElementById('form-success');

    const fields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('name-error'),
            validate: (val) => val.trim().length >= 2
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('email-error'),
            validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
        },
        phone: {
            element: document.getElementById('phone'),
            error: document.getElementById('phone-error'),
            validate: (val) => /^[\d\s\-+()]{7,15}$/.test(val.trim())
        },
        'product-type': {
            element: document.getElementById('product-type'),
            error: document.getElementById('product-type-error'),
            validate: (val) => val !== ''
        },
        description: {
            element: document.getElementById('description'),
            error: document.getElementById('description-error'),
            validate: (val) => val.trim().length >= 10
        },
        date: {
            element: document.getElementById('date'),
            error: document.getElementById('date-error'),
            validate: (val) => val !== ''
        }
    };

    const validateField = (name) => {
        const field = fields[name];
        if (!field) return true;
        const value = field.element.value;
        const isValid = field.validate(value);

        if (isValid) {
            field.element.classList.remove('error');
            field.element.classList.add('valid');
            field.error.classList.remove('visible');
        } else {
            field.element.classList.remove('valid');
            field.element.classList.add('error');
            field.error.classList.add('visible');
        }

        return isValid;
    };

    const validateForm = () => {
        let valid = true;
        Object.keys(fields).forEach(name => {
            if (!validateField(name)) {
                valid = false;
            }
        });
        return valid;
    };

    Object.keys(fields).forEach(name => {
        const field = fields[name];
        field.element.addEventListener('blur', () => validateField(name));
        field.element.addEventListener('input', () => {
            if (field.element.classList.contains('error')) {
                validateField(name);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        form.style.display = 'none';
        successMsg.classList.remove('hidden');
    });

    // =============== GSAP HERO ENTRANCE ===============

    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ delay: 0.4 });
        tl.from('.hero-tag', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' })
          .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.3')
          .from('.hero-desc', { duration: 0.8, y: 40, opacity: 0, ease: 'power2.out' }, '-=0.4')
          .from('.hero .btn', { duration: 0.8, y: 30, opacity: 0, ease: 'back.out(1.5)' }, '-=0.4');
    }

    // =============== PRODUCT MODAL ===============

    const productData = {
        chocolate: {
            name: 'Pastel de Chocolate',
            desc: 'Chocolate Belga Artesanal',
            longDesc: 'Un delicioso pastel de chocolate elaborado con chocolate belga importado, cubierto con ganache sedosa y decorado con fresas frescas. Cada capa está rellena de crema de chocolate suizo para una experiencia verdaderamente indulgente. Ideal para cumpleaños, aniversarios o cualquier ocasión especial.',
            images: [
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&h=500&fit=crop',
            ],
            basePrice: 78000,
            variations: [
                { name: 'Chocolate Clásico', price: 0 },
                { name: 'Chocolate con Fresas', price: 8000 },
                { name: 'Chocolate con Dulce de Leche', price: 6000 },
                { name: 'Chocolate Blanco', price: 5000 },
            ],
            sizes: [
                { name: 'Pequeño (8 porciones)', price: 0 },
                { name: 'Mediano (12 porciones)', price: 15000 },
                { name: 'Grande (20 porciones)', price: 35000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Mensaje personalizado', price: 5000 },
                { name: 'Decoración floral extra', price: 12000 },
                { name: 'Caja de regalo premium', price: 10000 },
            ]
        },
        cupcakes: {
            name: 'Cupcakes Decorados',
            desc: 'Esponjosos y artesanales',
            longDesc: 'Cupcakes horneados diariamente con ingredientes frescos. Nuestro frosting de vainilla francesa es ligero y cremoso, decorado artesanalmente con diseños únicos. Perfectos para fiestas, eventos corporativos o un antojo especial.',
            images: [
                'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=700&h=500&fit=crop',
            ],
            basePrice: 9500,
            variations: [
                { name: 'Vainilla Clásico', price: 0 },
                { name: 'Chocolate', price: 0 },
                { name: 'Red Velvet', price: 1000 },
                { name: 'Limón con Arándanos', price: 1500 },
            ],
            sizes: [
                { name: '6 unidades', price: 0 },
                { name: '12 unidades', price: 57000 },
                { name: '24 unidades', price: 114000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Caja decorativa', price: 5000 },
                { name: 'Mensaje en cada cupcake', price: 8000 },
            ]
        },
        macarons: {
            name: 'Macarons Franceses',
            desc: 'Delicados y coloridos',
            longDesc: 'Macarons elaborados con la técnica tradicional francesa usando harina de almendra francesa. Crujientes por fuera, suaves y cremosos por dentro. Cada pieza es una obra de arte de la repostería fina.',
            images: [
                'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=700&h=500&fit=crop',
            ],
            basePrice: 5500,
            variations: [
                { name: 'Frambuesa', price: 0 },
                { name: 'Pistacho', price: 1000 },
                { name: 'Chocolate', price: 0 },
                { name: 'Vainilla Francesa', price: 0 },
                { name: 'Lavanda y Miel', price: 1500 },
            ],
            sizes: [
                { name: '6 unidades', price: 0 },
                { name: '12 unidades', price: 33000 },
                { name: '24 unidades', price: 66000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Caja premium con listón', price: 10000 },
                { name: 'Caja degustación (todos los sabores)', price: 15000 },
            ]
        },
        galletas: {
            name: 'Galletas Artesanales',
            desc: 'Recién horneadas cada día',
            longDesc: 'Galletas elaboradas con mantequilla francesa, chocolate belga y avellanas italianas. Horneadas en pequeños lotes para garantizar frescura y calidad. Perfectas para acompañar un café o regalar.',
            images: [
                'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&h=500&fit=crop',
            ],
            basePrice: 3500,
            variations: [
                { name: 'Chispas de Chocolate', price: 0 },
                { name: 'Avellana y Chocolate', price: 500 },
                { name: 'Avena y Pasas', price: 0 },
                { name: 'Triple Chocolate', price: 1000 },
            ],
            sizes: [
                { name: '6 unidades', price: 0 },
                { name: '12 unidades', price: 21000 },
                { name: '24 unidades', price: 42000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Bolsa decorativa', price: 2000 },
                { name: 'Lata metálica personalizada', price: 8000 },
            ]
        },
        cheesecake: {
            name: 'Cheesecake',
            desc: 'Estilo New York Artesanal',
            longDesc: 'Nuestro cheesecake estilo New York es cremoso y suave, elaborado con queso crema importado y una base de galleta crujiente. Cobertura de frutos rojos naturales cocidos a fuego lento. Un clásico irresistible.',
            images: [
                'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&h=500&fit=crop',
            ],
            basePrice: 72000,
            variations: [
                { name: 'New York Clásico', price: 0 },
                { name: 'Frutos Rojos', price: 6000 },
                { name: 'Maracuyá', price: 5000 },
                { name: 'Oreo', price: 8000 },
            ],
            sizes: [
                { name: 'Pequeño (8 porciones)', price: 0 },
                { name: 'Mediano (12 porciones)', price: 18000 },
                { name: 'Grande (16 porciones)', price: 32000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Decoración especial', price: 8000 },
                { name: 'Mensaje personalizado', price: 5000 },
            ]
        },
        donas: {
            name: 'Donas Glaseadas',
            desc: 'Esponjosas y coloridas',
            longDesc: 'Donas frescas horneadas (no fritas) con una textura esponjosa y ligera. Glaseado artesanal en variedad de colores y sabores, decoradas con chispas, sprinkles y toppings únicos.',
            images: [
                'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=700&h=500&fit=crop',
            ],
            basePrice: 5500,
            variations: [
                { name: 'Glaseado de Chocolate', price: 0 },
                { name: 'Glaseado de Vainilla', price: 0 },
                { name: 'Glaseado de Fresa', price: 0 },
                { name: 'Glaseado de Caramelo', price: 500 },
            ],
            sizes: [
                { name: '6 unidades', price: 0 },
                { name: '12 unidades', price: 33000 },
                { name: '24 unidades', price: 66000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Caja decorativa', price: 5000 },
                { name: 'Dip extra de chocolate', price: 3000 },
            ]
        },
        tresleches: {
            name: 'Pastel Tres Leches',
            desc: 'Esponjoso bañado en tres leches',
            longDesc: 'Nuestro pastel tres leches es increíblemente esponjoso, bañado en una mezcla de tres tipos de leche: evaporada, condensada y crema de leche. Cubierto con crema batida y canela espolvoreada. Un favorito tradicional colombiano.',
            images: [
                'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&h=500&fit=crop',
            ],
            basePrice: 62000,
            variations: [
                { name: 'Tres Leches Clásico', price: 0 },
                { name: 'Tres Leches de Café', price: 5000 },
                { name: 'Tres Leches de Coco', price: 6000 },
                { name: 'Tres Leches de Chocolate', price: 7000 },
            ],
            sizes: [
                { name: 'Pequeño (8 porciones)', price: 0 },
                { name: 'Mediano (12 porciones)', price: 15000 },
                { name: 'Grande (20 porciones)', price: 30000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Merengue extra', price: 6000 },
                { name: 'Fruta fresca', price: 8000 },
            ]
        },
        croissants: {
            name: 'Croissants',
            desc: 'Hojaldrados con mantequilla francesa',
            longDesc: 'Croissants artesanales elaborados con mantequilla francesa AOC, laminados a mano en 27 capas para lograr esa textura hojaldrada y dorada perfecta. Horneados cada mañana. El sabor de Francia en cada bocado.',
            images: [
                'https://images.unsplash.com/photo-1623334044303-241021148842?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1623334044303-241021148842?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1623334044303-241021148842?w=700&h=500&fit=crop',
            ],
            basePrice: 4500,
            variations: [
                { name: 'Mantequilla Clásico', price: 0 },
                { name: 'Croissant de Almendra', price: 1500 },
                { name: 'Croissant de Chocolate', price: 1000 },
                { name: 'Croissant de Queso', price: 1000 },
            ],
            sizes: [
                { name: '6 unidades', price: 0 },
                { name: '12 unidades', price: 27000 },
                { name: '24 unidades', price: 54000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Caja panadera artesanal', price: 5000 },
                { name: 'Mermelada artesanal (frasco)', price: 8000 },
            ]
        },
        paylimon: {
            name: 'Pay de Limón',
            desc: 'Cítrico y cremoso',
            longDesc: 'Base de galleta crujiente con relleno cremoso de limón natural, coronado con un merengue dorado a la perfección. El balance perfecto entre lo dulce y lo cítrico. Un postre refrescante para cualquier ocasión.',
            images: [
                'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&h=500&fit=crop',
                'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=600&fit=crop',
                'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=700&h=500&fit=crop',
            ],
            basePrice: 55000,
            variations: [
                { name: 'Pay de Limón Clásico', price: 0 },
                { name: 'Pay de Limón con Merengue', price: 3000 },
                { name: 'Pay de Limón con Coco', price: 4000 },
            ],
            sizes: [
                { name: 'Pequeño (8 porciones)', price: 0 },
                { name: 'Mediano (12 porciones)', price: 12000 },
                { name: 'Grande (16 porciones)', price: 22000 },
            ],
            extras: [
                { name: 'Ninguno', price: 0 },
                { name: 'Merengue extra', price: 5000 },
                { name: 'Fruta fresca', price: 7000 },
            ]
        }
    };

    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalMainImg = document.getElementById('modal-main-img');
    const modalThumbs = document.getElementById('modal-thumbs');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalLongDesc = document.getElementById('modal-long-desc');
    const modalVariation = document.getElementById('modal-variation');
    const modalSize = document.getElementById('modal-size');
    const modalExtras = document.getElementById('modal-extras');
    const modalPrice = document.getElementById('modal-price');
    const modalOrderBtn = document.getElementById('modal-order-btn');

    let currentProduct = null;

    function formatPrice(price) {
        return '$' + price.toLocaleString('es-CO');
    }

    function updatePrice() {
        if (!currentProduct) return;
        const varPrice = parseInt(modalVariation.value) || 0;
        const sizePrice = parseInt(modalSize.value) || 0;
        const extraPrice = parseInt(modalExtras.value) || 0;
        const total = currentProduct.basePrice + varPrice + sizePrice + extraPrice;
        modalPrice.textContent = formatPrice(total);
    }

    function populateSelect(select, options) {
        select.innerHTML = '';
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.price;
            option.textContent = opt.name + (opt.price > 0 ? ' (+' + formatPrice(opt.price) + ')' : '');
            select.appendChild(option);
        });
    }

    function openModal(productKey) {
        const data = productData[productKey];
        if (!data) return;
        currentProduct = data;

        modalTitle.textContent = data.name;
        modalDesc.textContent = data.desc;
        modalLongDesc.textContent = data.longDesc;

        modalMainImg.style.backgroundImage = 'url(' + data.images[0] + ')';
        modalThumbs.innerHTML = '';
        data.images.forEach((url, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
            thumb.style.backgroundImage = 'url(' + url + ')';
            thumb.addEventListener('click', function () {
                modalMainImg.style.backgroundImage = 'url(' + url + ')';
                modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
        });

        populateSelect(modalVariation, data.variations);
        populateSelect(modalSize, data.sizes);
        populateSelect(modalExtras, data.extras);

        updatePrice();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.modal-content', 
                { scale: 0.85, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }

    function closeModal() {
        if (typeof gsap !== 'undefined') {
            gsap.to('.modal-content', {
                scale: 0.85, opacity: 0, y: 30, duration: 0.25, ease: 'power2.in',
                onComplete: () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        currentProduct = null;
    }

    document.querySelectorAll('.catalog-card').forEach(card => {
        card.addEventListener('click', function () {
            const product = this.dataset.product;
            if (product) openModal(product);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    modalVariation.addEventListener('change', updatePrice);
    modalSize.addEventListener('change', updatePrice);
    modalExtras.addEventListener('change', updatePrice);

    modalOrderBtn.addEventListener('click', function () {
        closeModal();
        const pedidosSection = document.getElementById('pedidos');
        if (pedidosSection) {
            pedidosSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
