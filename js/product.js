(function () {
  const container = document.getElementById('product-detail');

  function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function renderProduct() {
    const id = getProductId();
    const product = getProductById(id);

    if (!product) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:80px 20px;">
          <h2 style="font-family:var(--font-heading);font-size:1.8rem;color:var(--color-secondary);margin-bottom:12px;">
            Producto no encontrado
          </h2>
          <p style="color:var(--color-text-light);margin-bottom:24px;">El producto que buscas no existe o ha sido eliminado.</p>
          <a href="catalog.html" class="btn btn--primary">Ver Catálogo</a>
        </div>
      `;
      return;
    }

    const mainImage = product.images[0] || product.image;

    container.innerHTML = `
      <div class="product-detail__gallery">
        <img src="${mainImage}" alt="${product.name}" class="product-detail__main-image" id="main-image">
        <div class="product-detail__thumbnails" id="thumbnails">
          ${product.images.map((img, i) => `
            <img src="${img}" alt="${product.name} - vista ${i + 1}"
                 class="product-detail__thumb ${i === 0 ? 'active' : ''}"
                 data-src="${img}">
          `).join('')}
        </div>
      </div>
      <div class="product-detail__info">
        <p class="product-detail__category">${product.categoryLabel}</p>
        <h1>${product.name}</h1>
        <p class="product-detail__price">$${product.price.toFixed(2)}</p>
        <p class="product-detail__description">${product.description}</p>
        <div class="product-detail__actions">
          <div class="product-detail__quantity">
            <button id="qty-minus" aria-label="Reducir cantidad">−</button>
            <span id="qty-value">1</span>
            <button id="qty-plus" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="btn btn--primary btn--lg" id="add-to-cart-btn">
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;

    setupGallery(product);
    setupQuantity();
    setupAddToCart(product);
  }

  function setupGallery(product) {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.product-detail__thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.dataset.src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  function setupQuantity() {
    const minus = document.getElementById('qty-minus');
    const plus = document.getElementById('qty-plus');
    const value = document.getElementById('qty-value');

    if (!minus || !plus || !value) return;

    let qty = 1;

    minus.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        value.textContent = qty;
      }
    });

    plus.addEventListener('click', () => {
      if (qty < 99) {
        qty++;
        value.textContent = qty;
      }
    });
  }

  function setupAddToCart(product) {
    const btn = document.getElementById('add-to-cart-btn');
    const value = document.getElementById('qty-value');

    if (!btn) return;

    btn.addEventListener('click', () => {
      const qty = parseInt(value.textContent, 10) || 1;
      addToCart(product, qty);
    });
  }

  renderProduct();
})();
