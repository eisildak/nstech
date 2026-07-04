/**
 * Nexus Global Certificate - EmailJS Contact Form Handler
 * Shared email infrastructure with nexus-global-sourcing
 * 
 * Uses EmailJS to send contact form submissions directly from the client.
 * Falls back to server-side /api/send-email if EmailJS is not configured.
 */

(function () {
  'use strict';

  // EmailJS Configuration — same public key as nexus-global-sourcing
  const EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || 'service_nexus';
  const EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'template_contact';
  const EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || '';

  let emailjsLoaded = false;

  function loadEmailJS() {
    return new Promise((resolve) => {
      if (emailjsLoaded) return resolve();
      if (typeof emailjs !== 'undefined') {
        emailjsLoaded = true;
        if (EMAILJS_PUBLIC_KEY) emailjs.init(EMAILJS_PUBLIC_KEY);
        return resolve();
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => {
        emailjsLoaded = true;
        if (EMAILJS_PUBLIC_KEY) emailjs.init(EMAILJS_PUBLIC_KEY);
        resolve();
      };
      script.onerror = () => resolve(); // fallback to server API
      document.head.appendChild(script);
    });
  }

  /**
   * Handle contact form submission via EmailJS with server fallback
   * @param {HTMLFormElement} form - The form element
   * @param {Object} options
   * @param {string} options.successMessage - Message shown on success
   * @param {string} options.errorMessage - Message shown on error
   * @param {Function} options.onSuccess - Callback on success
   * @param {Function} options.onError - Callback on error
   * @param {Function} options.onStart - Callback when sending starts
   * @param {Function} options.onEnd - Callback when done (success or error)
   */
  async function submitContactForm(form, options = {}) {
    const {
      successMessage = 'Nachricht erfolgreich gesendet! Wir melden uns in Kürze.',
      errorMessage = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.',
      onSuccess = null,
      onError = null,
      onStart = null,
      onEnd = null,
    } = options;

    if (onStart) onStart();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Try EmailJS first
      await loadEmailJS();

      if (EMAILJS_PUBLIC_KEY && typeof emailjs !== 'undefined') {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: data.vorname ? `${data.vorname} ${data.nachname || ''}` : (data.name || ''),
          from_email: data.email || '',
          phone: data.telefon || data.phone || '',
          message: data.nachricht || data.message || '',
          interest: data.interest || '',
          unternehmen: data.unternehmen || data.company || '',
          to_email: 'info@certificate.nexus-global.tech',
        });
      } else {
        // Fallback to server API
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Server error');
      }

      if (onSuccess) onSuccess();
      showFormMessage(form, successMessage, 'success');
      form.reset();
    } catch (err) {
      console.error('Email send error:', err);
      if (onError) onError(err);
      showFormMessage(form, errorMessage, 'error');
    } finally {
      if (onEnd) onEnd();
    }
  }

  function showFormMessage(form, message, type) {
    // Remove existing message
    const existing = form.parentElement.querySelector('.form-message');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = `form-message ${
      type === 'success'
        ? 'bg-green-50 border border-green-200 text-green-700'
        : 'bg-red-50 border border-red-200 text-red-600'
    } rounded-lg p-4 mb-4 text-center font-medium`;
    div.textContent = message;
    form.insertAdjacentElement('beforebegin', div);

    // Auto-remove after 8 seconds
    setTimeout(() => div.remove(), 8000);
  }

  // Auto-bind forms with data-emailjs attribute
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-emailjs]');
    forms.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Wird gesendet...'; }

        await submitContactForm(form, {
          onEnd: () => {
            if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
          },
        });
      });
    });
  });

  // Expose globally for manual binding
  window.NexusContact = { submitContactForm };
})();
