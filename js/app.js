// ============================================
// APP.JS - Punto de entrada e inicialización
// ============================================

import { fetchDailyQuote, fetchWeather } from './api.js';
import { renderCatalog, setFilter, setSearch, getFilteredProducts } from './catalog.js';
import { addToCart, initCart } from './cart.js';
import { initForm } from './form.js';

// ---------- ELEMENTOS DEL DOM ----------
const elements = {
  quoteText: null,
  quoteAuthor: null,
  weatherInfo: null,
  catalogGrid: null,
  searchInput: null,
  filterButtons: null,
  menuToggle: null,
  navMenu: null,
  headerNavLinks: null,
  zoneSelect: null,
  convertEurBtn: null,
  clearCartBtn: null,
  contactForm: null
};

// ---------- INICIALIZACIÓN ----------
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  initHeroWidgets();
  initCatalog();
  initCartSection();
  initContactForm();
  initNavigation();
  initScrollSpy();
});

/**
 * Almacena referencias a elementos del DOM
 */
const cacheElements = () => {
  elements.quoteText = document.getElementById('daily-quote');
  elements.quoteAuthor = document.getElementById('daily-quote-author');
  elements.weatherInfo = document.getElementById('weather-info');
  elements.catalogGrid = document.getElementById('catalog-grid');
  elements.searchInput = document.getElementById('search-input');
  elements.menuToggle = document.querySelector('.header__menu-toggle');
  elements.navMenu = document.querySelector('.header__nav');
  elements.headerNavLinks = document.querySelectorAll('.header__nav-link');
  elements.zoneSelect = document.getElementById('zone-select');
  elements.convertEurBtn = document.getElementById('convert-eur-btn');
  elements.clearCartBtn = document.getElementById('clear-cart-btn');
  elements.contactForm = document.getElementById('contact-form');
};

// ---------- WIDGETS DEL HERO ----------
const initHeroWidgets = () => {
  loadDailyQuote();
  loadWeather();
};

const loadDailyQuote = async () => {
  const { content, author } = await fetchDailyQuote();
  elements.quoteText.textContent = `\u201C${content}\u201D`;
  elements.quoteAuthor.textContent = `\u2014 ${author}`;
};

const loadWeather = async () => {
  const { temperature, description } = await fetchWeather();
  elements.weatherInfo.innerHTML = `
    <span class="hero__weather-temp">${temperature}\u00B0C</span>
    <p class="hero__weather-desc">${description}</p>
  `;
};

// ---------- CATÁLOGO ----------
const initCatalog = () => {
  // Renderizado inicial
  renderCatalog(elements.catalogGrid, addToCart);

  // Búsqueda por nombre
  elements.searchInput.addEventListener('input', (e) => {
    setSearch(e.target.value);
    renderCatalog(elements.catalogGrid, addToCart);
  });

  // Filtros por origen
  document.querySelectorAll('.catalog__filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Actualizar estado activo
      document.querySelectorAll('.catalog__filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      setFilter(btn.dataset.origin);
      renderCatalog(elements.catalogGrid, addToCart);
    });
  });
};

// ---------- CARRITO ----------
const initCartSection = () => {
  initCart(elements.zoneSelect, elements.convertEurBtn, elements.clearCartBtn);
};

// ---------- FORMULARIO ----------
const initContactForm = () => {
  initForm(elements.contactForm);
};

// ---------- NAVEGACIÓN ----------
const initNavigation = () => {
  // Menú hamburguesa móvil
  elements.menuToggle.addEventListener('click', () => {
    const isOpen = elements.navMenu.classList.toggle('open');
    elements.menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer click en un enlace
  elements.headerNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      elements.navMenu.classList.remove('open');
      elements.menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
};

// ---------- SCROLL SPY ----------
const initScrollSpy = () => {
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          elements.headerNavLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
};
