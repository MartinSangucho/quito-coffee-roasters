// ============================================
// MÓDULO DE FORMULARIO - Validación en tiempo real
// ============================================

const VALIDATION_RULES = {
  name: {
    validate: (value) => value.trim().length >= 3,
    message: 'El nombre debe tener al menos 3 caracteres.'
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Ingresa un correo electrónico válido.'
  },
  phone: {
    validate: (value) => value === '' || /^\+?[\d\s\-()]{7,15}$/.test(value),
    message: 'Ingresa un número de teléfono válido.'
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: 'El mensaje debe tener al menos 10 caracteres.'
  }
};

/**
 * Valida un campo individual y muestra el error o éxito
 * @param {string} fieldName - Nombre del campo
 * @returns {boolean} true si el campo es válido
 */
const validateField = (fieldName) => {
  const input = document.getElementById(`form-${fieldName}`);
  const errorEl = document.getElementById(`error-${fieldName}`);
  const rule = VALIDATION_RULES[fieldName];

  if (!input || !rule || !errorEl) return true;

  const isValid = rule.validate(input.value);

  if (!isValid && input.value.length > 0) {
    input.classList.add('error');
    input.classList.remove('success');
    errorEl.textContent = rule.message;
    input.setAttribute('aria-invalid', 'true');
  } else if (isValid && input.value.length > 0) {
    input.classList.remove('error');
    input.classList.add('success');
    errorEl.textContent = '';
    input.setAttribute('aria-invalid', 'false');
  } else {
    input.classList.remove('error', 'success');
    errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  return isValid;
};

/**
 * Valida todos los campos requeridos del formulario
 * @returns {boolean} true si todos los campos son válidos
 */
const validateAll = () => {
  const results = ['name', 'email', 'message'].map(validateField);
  // Phone es opcional, solo validar si tiene contenido
  const phoneValid = validateField('phone');
  return results.every(Boolean) && phoneValid;
};

/**
 * Limpia el formulario y restablece los estilos
 * @param {HTMLFormElement} form - Elemento del formulario
 */
const resetForm = (form) => {
  form.reset();
  ['name', 'email', 'phone', 'message'].forEach((field) => {
    const input = document.getElementById(`form-${field}`);
    const errorEl = document.getElementById(`error-${field}`);
    if (input) {
      input.classList.remove('error', 'success');
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) errorEl.textContent = '';
  });
};

/**
 * Inicializa el formulario con validación y eventos
 * @param {HTMLFormElement} form - Elemento del formulario
 */
export const initForm = (form) => {
  if (!form) return;

  // Validación en tiempo real al escribir
  ['name', 'email', 'phone', 'message'].forEach((fieldName) => {
    const input = document.getElementById(`form-${fieldName}`);
    if (input) {
      input.addEventListener('input', () => validateField(fieldName));
      input.addEventListener('blur', () => validateField(fieldName));
    }
  });

  // Envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const successMsg = document.getElementById('form-success');
    const submitBtn = form.querySelector('.contact__submit');

    // Estado de carga
    submitText.textContent = 'Enviando...';
    submitSpinner.hidden = false;
    submitBtn.disabled = true;

    // Simular envío (sin backend)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Éxito
    submitText.textContent = 'Enviar Mensaje';
    submitSpinner.hidden = true;
    submitBtn.disabled = false;
    successMsg.hidden = false;
    resetForm(form);

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      successMsg.hidden = true;
    }, 5000);
  });
};
