// ============================================
// MÓDULO DE CARRITO - Compras y calculadora de envío
// ============================================

import { fetchExchangeRate } from './api.js';

let cartItems = [];
let selectedZone = null;
let exchangeRateData = null;

const DELIVERY_ZONES = {
  '1.80': { name: 'Centro', cost: 1.80 },
  '2.50': { name: 'Norte', cost: 2.50 },
  '3.00': { name: 'Sur', cost: 3.00 },
  '3.50': { name: 'Valles', cost: 3.50 }
};

/**
 * Agrega un producto al carrito o incrementa su cantidad
 * @param {Object} product - Producto a agregar
 */
export const addToCart = (product) => {
  const existing = cartItems.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ ...product, qty: 1 });
  }
  renderCart();
};

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto
 */
export const removeFromCart = (productId) => {
  cartItems = cartItems.filter((item) => item.id !== productId);
  renderCart();
};

/**
 * Cambia la cantidad de un producto
 * @param {number} productId - ID del producto
 * @param {number} delta - Cambio en cantidad (+1 o -1)
 */
export const updateQty = (productId, delta) => {
  const item = cartItems.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  renderCart();
};

/**
 * Vacía el carrito completamente
 */
export const clearCart = () => {
  cartItems = [];
  renderCart();
};

/**
 * Calcula el subtotal del carrito
 * @returns {number} Subtotal en USD
 */
const getSubtotal = () =>
  cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

/**
 * Obtiene el costo de envío según la zona seleccionada
 * @returns {number} Costo de envío
 */
const getShippingCost = () => {
  if (!selectedZone) return 0;
  const zone = DELIVERY_ZONES[selectedZone];
  return zone ? zone.cost : 0;
};

/**
 * Obtiene el total (subtotal + envío)
 * @returns {number} Total en USD
 */
const getTotal = () => getSubtotal() + getShippingCost();

/**
 * Renderiza la lista de items del carrito y el resumen
 */
export const renderCart = () => {
  const listContainer = document.getElementById('cart-items-list');
  const emptyMsg = document.getElementById('cart-empty-msg');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');
  const convertBtn = document.getElementById('convert-eur-btn');
  const clearBtn = document.getElementById('clear-cart-btn');

  // Renderizar items
  if (cartItems.length === 0) {
    listContainer.innerHTML = '';
    listContainer.appendChild(emptyMsg);
    emptyMsg.hidden = false;
    convertBtn.disabled = true;
    clearBtn.disabled = true;
  } else {
    emptyMsg.hidden = true;
    listContainer.innerHTML = cartItems.map((item) => `
      <div class="cart-item" role="listitem" aria-label="${item.name}, cantidad ${item.qty}">
        <span class="cart-item__emoji" aria-hidden="true">${item.emoji}</span>
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__origin">${item.origin}</p>
        </div>
        <div class="cart-item__controls">
          <button
            class="cart-item__qty-btn"
            data-action="decrease"
            data-id="${item.id}"
            aria-label="Disminuir cantidad de ${item.name}"
          >\u2212</button>
          <span class="cart-item__qty" aria-label="Cantidad: ${item.qty}">${item.qty}</span>
          <button
            class="cart-item__qty-btn"
            data-action="increase"
            data-id="${item.id}"
            aria-label="Aumentar cantidad de ${item.name}"
          >+</button>
        </div>
        <span class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</span>
        <button
          class="cart-item__remove"
          data-id="${item.id}"
          aria-label="Eliminar ${item.name} del carrito"
        >\u2715</button>
      </div>
    `).join('');

    convertBtn.disabled = false;
    clearBtn.disabled = false;

    // Event listeners para controles de cantidad
    listContainer.querySelectorAll('.cart-item__qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const delta = btn.dataset.action === 'increase' ? 1 : -1;
        updateQty(id, delta);
      });
    });

    // Event listeners para eliminar
    listContainer.querySelectorAll('.cart-item__remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.dataset.id));
      });
    });
  }

  // Actualizar resumen
  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const total = getTotal();

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = selectedZone ? `$${shipping.toFixed(2)}` : '$0.00';
  totalEl.textContent = `$${total.toFixed(2)}`;

  // Resetear EUR al cambiar carrito o zona
  const eurSection = document.getElementById('cart-eur');
  if (eurSection) eurSection.hidden = true;
};

/**
 * Convierte el total a EUR usando la ExchangeRate-API
 */
export const convertToEUR = async () => {
  const btn = document.getElementById('convert-eur-btn');
  const btnText = document.getElementById('convert-eur-text');
  const eurSection = document.getElementById('cart-eur');
  const eurTotal = document.getElementById('cart-total-eur');
  const eurRate = document.getElementById('eur-rate-text');

  btnText.textContent = 'Convirtiendo...';
  btn.disabled = true;

  if (!exchangeRateData) {
    exchangeRateData = await fetchExchangeRate();
  }

  const totalUSD = getTotal();
  const totalEUR = totalUSD * exchangeRateData.rate;

  eurTotal.textContent = `\u20AC${totalEUR.toFixed(2)}`;
  eurRate.textContent = `Tasa: 1 USD = ${exchangeRateData.rate.toFixed(4)} EUR (${exchangeRateData.date})`;
  eurSection.hidden = false;

  btnText.textContent = 'Convertir a EUR';
  btn.disabled = false;
};

/**
 * Inicializa el módulo del carrito con event listeners
 * @param {HTMLElement} zoneSelect - Select de zona de entrega
 * @param {HTMLElement} convertBtn - Botón de conversión EUR
 * @param {HTMLElement} clearBtn - Botón de vaciar carrito
 */
export const initCart = (zoneSelect, convertBtn, clearBtn) => {
  zoneSelect.addEventListener('change', (e) => {
    selectedZone = e.target.value;
    renderCart();
  });

  convertBtn.addEventListener('click', convertToEUR);
  clearBtn.addEventListener('click', clearCart);

  renderCart();
};
