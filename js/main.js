const SITE = {
  name: 'Lumora',
  tagline: 'Ilumina tu espacio con elegancia'
};

function getPrefix() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '..' : '.';
}

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return path;
}

function renderHeader() {
  const el = document.getElementById('header-placeholder');
  if (!el) return;

  const p = getPrefix();

  el.innerHTML = `
    <header class="header">
      <div class="container header__inner">
        <a href="${p}/index.html" class="header__logo">${SITE.name}</a>
        <button class="header__menu-toggle" id="menu-toggle" aria-label="Menú de navegación">
          <span></span><span></span><span></span>
        </button>
        <nav class="header__nav">
          <ul class="header__nav-list" id="nav-list">
            <li><a href="${p}/index.html" class="header__nav-link" data-page="index">Inicio</a></li>
            <li><a href="${p}/pages/catalog.html" class="header__nav-link" data-page="catalog">Catálogo</a></li>
            <li><a href="${p}/pages/cart.html" class="header__nav-link" data-page="cart">Carrito <span id="cart-count-badge" style="display:none">(0)</span></a></li>
            <li><a href="${p}/pages/about.html" class="header__nav-link" data-page="about">Nosotros</a></li>
            <li><a href="${p}/pages/contact.html" class="header__nav-link" data-page="contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  const page = getCurrentPage();
  document.querySelectorAll('.header__nav-link').forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('header__nav-link--active');
    }
  });

  const toggle = document.getElementById('menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.getElementById('nav-list').classList.toggle('header__nav-list--open');
    });
  }
}

function renderFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;

  const p = getPrefix();

  el.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <div class="footer__brand">
            <h3>${SITE.name}</h3>
            <p>${SITE.tagline}. Descubre nuestra colección cuidadosamente seleccionada de iluminación y decoración para transformar tu hogar.</p>
          </div>
          <div class="footer__links">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="${p}/index.html">Inicio</a></li>
              <li><a href="${p}/pages/catalog.html">Catálogo</a></li>
              <li><a href="${p}/pages/cart.html">Carrito</a></li>
              <li><a href="${p}/pages/about.html">Nosotros</a></li>
              <li><a href="${p}/pages/contact.html">Contacto</a></li>
            </ul>
          </div>
          <div class="footer__contact">
            <h4>Contacto</h4>
            <p>hola@lumora.mx</p>
            <p>+52 55 1234 5678</p>
            <p>CDMX, México</p>
          </div>
          <div class="footer__social">
            <h4>Síguenos</h4>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Pinterest</p>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} ${SITE.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

/* Cart Utilities */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('lumora_cart')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('lumora_cart', JSON.stringify(cart));
}

function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`${product.name} agregado al carrito`, 'success');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart(cart);
  }
  updateCartBadge();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  if (!badge) return;
  const count = getCartCount();
  if (count > 0) {
    badge.style.display = 'inline';
    badge.textContent = `(${count})`;
  } else {
    badge.style.display = 'none';
  }
}

function getProductById(id) {
  return window.PRODUCTS ? window.PRODUCTS.find(p => p.id === Number(id)) : null;
}

function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type ? `toast--${type}` : ''}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  updateCartBadge();
});
