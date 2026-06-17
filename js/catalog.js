(function () {
  const grid = document.getElementById('product-grid');
  const filterContainer = document.getElementById('filter-buttons');
  const searchInput = document.getElementById('search-input');

  let activeCategory = 'todas';
  let searchTerm = '';

  const categories = [
    { value: 'todas', label: 'Todas' },
    { value: 'lamparas-mesa', label: 'Lámparas de Mesa' },
    { value: 'lamparas-pie', label: 'Lámparas de Pie' },
    { value: 'lamparas-colgantes', label: 'Lámparas Colgantes' },
    { value: 'velas-aromas', label: 'Velas y Aromas' }
  ];

  function renderFilters() {
    filterContainer.innerHTML = categories.map(cat => `
      <button class="catalog__filter-btn ${activeCategory === cat.value ? 'active' : ''}"
              data-category="${cat.value}">${cat.label}</button>
    `).join('');

    filterContainer.querySelectorAll('.catalog__filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderFilters();
        renderProducts();
      });
    });
  }

  function filterProducts() {
    const all = window.PRODUCTS || [];
    let filtered = all;

    if (activeCategory !== 'todas') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  function renderProducts() {
    const products = filterProducts();

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--color-text-light)">
          <p style="font-size:1.2rem;margin-bottom:8px;">No encontramos productos</p>
          <p>Intenta con otros filtros o términos de búsqueda.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => `
      <a href="product.html?id=${p.id}" class="product-card">
        <img src="${p.image}" alt="${p.name}" class="product-card__image" loading="lazy">
        <div class="product-card__body">
          <p class="product-card__category">${p.categoryLabel}</p>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__price">$${p.price.toFixed(2)}</p>
        </div>
      </a>
    `).join('');
  }

  function initSearch() {
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderProducts();
    });
  }

  renderFilters();
  renderProducts();
  initSearch();
})();
