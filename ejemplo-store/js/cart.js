(function () {
  const container = document.getElementById('cart-content');
  const modal = document.getElementById('checkout-modal');

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart__empty">
          <div class="cart__empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestro catálogo y encuentra la pieza perfecta para iluminar tu hogar.</p>
          <a href="catalog.html" class="btn btn--primary">Ir al Catálogo</a>
        </div>
      `;
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 150 ? 0 : 15.90;
    const total = subtotal + shipping;

    container.innerHTML = `
      <div class="cart__content">
        <div class="cart__items">
          ${cart.map(item => `
            <div class="cart__item" data-id="${item.id}">
              <img src="${item.image}" alt="${item.name}" class="cart__item-image">
              <div class="cart__item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} c/u</p>
                <div class="cart__item-quantity">
                  <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                  <span>${item.quantity}</span>
                  <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                </div>
              </div>
              <div class="cart__item-total">
                <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="cart__item-remove" data-id="${item.id}">Eliminar</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="cart__summary">
          <h3>Resumen del pedido</h3>
          <div class="cart__summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="cart__summary-row">
            <span>Envío</span>
            <span>${shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
          </div>
          ${subtotal < 150 ? `<div class="cart__summary-row" style="font-size:0.85rem;color:var(--color-accent);">
            <span>💡 ¡Envío gratis desde $150!</span>
            <span></span>
          </div>` : ''}
          <div class="cart__summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <button class="btn btn--primary btn--full btn--lg" id="checkout-btn">
            Proceder al Pago
          </button>
          <a href="catalog.html" class="btn btn--secondary btn--full" style="margin-top:8px;">
            Seguir Comprando
          </a>
        </div>
      </div>
    `;

    attachCartEvents();
  }

  function attachCartEvents() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const delta = Number(e.currentTarget.dataset.delta);
        updateQuantity(id, delta);
        renderCart();
      });
    });

    document.querySelectorAll('.cart__item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        removeFromCart(id);
        renderCart();
      });
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        localStorage.removeItem('jewelrydvluxury_cart');
        modal.classList.add('visible');
        updateCartBadge();
      });
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('visible');
      renderCart();
    }
  });

  renderCart();
})();
