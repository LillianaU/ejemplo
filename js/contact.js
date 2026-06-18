(function () {
  const form = document.getElementById('contact-form');
  const successDiv = document.getElementById('form-success');
  const resetBtn = document.getElementById('reset-form-btn');

  const validators = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => !v.trim() || /^\+?\d{7,15}$/.test(v.trim().replace(/[\s-]/g, '')),
    subject: (v) => v !== '',
    message: (v) => v.trim().length >= 10
  };

  const errorMessages = {
    name: 'Por favor ingresa tu nombre (mínimo 2 caracteres)',
    email: 'Por favor ingresa un correo electrónico válido',
    phone: 'Por favor ingresa un teléfono válido',
    subject: 'Por favor selecciona un asunto',
    message: 'Por favor escribe tu mensaje (mínimo 10 caracteres)'
  };

  function validateField(field) {
    const value = field.value;
    const name = field.name;
    const errorEl = document.getElementById(`${name}-error`);

    if (!errorEl) return true;

    const isValid = validators[name] ? validators[name](value) : true;

    if (!isValid) {
      field.classList.add('error');
      errorEl.classList.add('visible');
    } else {
      field.classList.remove('error');
      errorEl.classList.remove('visible');
    }

    return isValid;
  }

  function validateForm() {
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    let allValid = true;

    fields.forEach(name => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      }
    });

    return allValid;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm()) {
        form.style.display = 'none';
        successDiv.classList.add('visible');
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.error-message.visible').forEach(el => el.classList.remove('visible'));
      successDiv.classList.remove('visible');
      form.style.display = 'block';
    });
  }
})();
