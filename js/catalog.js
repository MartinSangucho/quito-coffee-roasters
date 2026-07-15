// ============================================
// MÓDULO DE CATÁLOGO - Productos y filtros
// ============================================

const COFFEE_PRODUCTS = [
  {
    id: 1,
    name: 'Pegalajo Reserve',
    origin: 'Ecuador',
    region: 'Pichincha',
    notes: 'Chocolate amargo, caramelo, notas frutales',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Lavado'
  },
  {
    id: 2,
    name: 'Loja Gold',
    origin: 'Ecuador',
    region: 'Loja',
    notes: 'Miel, avellana, cítricos suaves',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Natural'
  },
  {
    id: 3,
    name: 'Galápagos Bourbon',
    origin: 'Ecuador',
    region: 'Galápagos',
    notes: 'Frutas tropicales, panela, cuerpo sedoso',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1690983326555-8b8e27843a32?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Lavado'
  },
  {
    id: 4,
    name: 'Huila Supremo',
    origin: 'Colombia',
    region: 'Huila',
    notes: 'Naranja, chocolate negro, azúcar morena',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1696071575709-d25c52f820e0?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Lavado'
  },
  {
    id: 5,
    name: 'Nariño Excelso',
    origin: 'Colombia',
    region: 'Nariño',
    notes: 'Grosella, miel de caña, cacao',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1633627349150-cc2b433ddba1?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Honey'
  },
  {
    id: 6,
    name: 'Cerrado Mineiro',
    origin: 'Brasil',
    region: 'Minas Gerais',
    notes: 'Chocolate con leche, nuez, bajo acidez',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Natural'
  },
  {
    id: 7,
    name: 'Santos Premium',
    origin: 'Brasil',
    region: 'São Paulo',
    notes: 'Cacahuete, caramelo, cuerpo aterciopelado',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Pulped Natural'
  },
  {
    id: 8,
    name: 'Yirgacheffe Kochere',
    origin: 'Etiopía',
    region: 'Yirgacheffe',
    notes: 'Jazmín, bergamota, limón, floral',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Lavado'
  },
  {
    id: 9,
    name: 'Sidamo Guji',
    origin: 'Etiopía',
    region: 'Guji',
    notes: 'Durazno, mango, vainilla, complejo',
    price: 17.50,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Natural'
  },
  {
    id: 10,
    name: 'Inti Wasi Blend',
    origin: 'Ecuador',
    region: 'Pichincha & Loja',
    notes: 'Blend equilibrado: chocolate, frutas secas, miel',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=300&fit=crop&auto=format&q=80',
    process: 'Mixto'
  }
];

let currentFilter = 'all';
let currentSearch = '';

/**
 * Obtiene el catálogo completo de cafés
 * @returns {Array} Array de productos
 */
export const getProducts = () => [...COFFEE_PRODUCTS];

/**
 * Filtra productos por origen y/o nombre
 * @returns {Array} Productos filtrados
 */
export const getFilteredProducts = () => {
  return COFFEE_PRODUCTS.filter((product) => {
    const matchesOrigin = currentFilter === 'all' || product.origin === currentFilter;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesOrigin && matchesSearch;
  });
};

/**
 * Busca un producto por ID
 * @param {number} id - ID del producto
 * @returns {Object|undefined} Producto encontrado
 */
export const getProductById = (id) => COFFEE_PRODUCTS.find((p) => p.id === id);

/**
 * Establece el filtro de origen activo
 * @param {string} origin - Nombre del origen o 'all'
 */
export const setFilter = (origin) => {
  currentFilter = origin;
};

/**
 * Establece el término de búsqueda
 * @param {string} term - Término de búsqueda
 */
export const setSearch = (term) => {
  currentSearch = term;
};

/**
 * Obtiene los orígenes únicos disponibles
 * @returns {Array<string>} Lista de orígenes
 */
export const getOrigins = () => [...new Set(COFFEE_PRODUCTS.map((p) => p.origin))];

/**
 * Renderiza las tarjetas de productos en el DOM
 * @param {HTMLElement} container - Elemento contenedor del grid
 * @param {Function} onAddToCart - Callback al agregar al carrito
 */
export const renderCatalog = (container, onAddToCart) => {
  const products = getFilteredProducts();
  const emptyMsg = document.getElementById('catalog-empty');

  if (products.length === 0) {
    container.innerHTML = '';
    emptyMsg.hidden = false;
    return;
  }

  emptyMsg.hidden = true;

  container.innerHTML = products.map((product, index) => `
    <article
      class="product-card"
      role="listitem"
      style="animation-delay: ${index * 0.08}s"
      aria-label="${product.name} de ${product.origin}"
    >
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name} - Café de ${product.origin}" loading="lazy">
      </div>
      <div class="product-card__body">
        <span class="product-card__origin">${product.origin} · ${product.region}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__notes">
          <span class="product-card__notes-label">Notas de cata:</span> ${product.notes}
        </p>
        <div class="product-card__footer">
          <span class="product-card__price" aria-label="Precio: $${product.price.toFixed(2)}">$${product.price.toFixed(2)}</span>
          <button
            class="product-card__add-btn"
            data-product-id="${product.id}"
            aria-label="Agregar ${product.name} al pedido"
          >
            + Agregar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Event listeners para botones de agregar
  container.querySelectorAll('.product-card__add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      const product = getProductById(productId);
      if (product) {
        onAddToCart(product);
        // Feedback visual
        btn.textContent = '\u2713 Agregado';
        btn.style.backgroundColor = 'var(--color-success)';
        btn.style.color = 'white';
        setTimeout(() => {
          btn.textContent = '+ Agregar';
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 1200);
      }
    });
  });
};
