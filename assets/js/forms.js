// ============================================
// KKG GUGUS III - FORM HANDLING
// Handle form validation, submission, and Google Forms integration
// ============================================

// ===== FORM VALIDATION =====

/**
 * Initialize form validation for all forms
 */
function initFormValidation() {
  console.log('Initializing form validation...');
  
  // Add validation to all forms
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    setupFormValidation(form);
  });
  
  // Add real-time validation
  document.addEventListener('input', function(event) {
    const input = event.target;
    if (input.form && input.form.dataset.validate) {
      validateField(input);
    }
  });
  
  // Add form submission handlers
  document.addEventListener('submit', function(event) {
    const form = event.target;
    if (form.dataset.validate && !form.classList.contains('google-form')) {
      event.preventDefault();
      handleFormSubmission(form);
    }
  });
}

/**
 * Set up validation for a form
 * @param {HTMLFormElement} form - Form element
 */
function setupFormValidation(form) {
  // Add required field indicators
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    const label = form.querySelector(`label[for="${field.id}"]`);
    if (label && !label.querySelector('.required-indicator')) {
      const indicator = document.createElement('span');
      indicator.className = 'required-indicator text-red-500 ml-1';
      indicator.textContent = '*';
      indicator.setAttribute('aria-hidden', 'true');
      label.appendChild(indicator);
      
      // Add aria-required for screen readers
      field.setAttribute('aria-required', 'true');
    }
  });
  
  // Add validation event listeners
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
  
  // Add form reset handler
  form.addEventListener('reset', () => clearFormErrors(form));
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - Form field to validate
 * @returns {boolean} - Whether field is valid
 */
function validateField(field) {
  if (!field.hasAttribute('required') && !field.value.trim()) {
    return true; // Not required and empty = valid
  }
  
  let isValid = true;
  let errorMessage = '';
  
  // Required field validation
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = field.dataset.requiredMessage || 'Field ini wajib diisi';
  }
  
  // Email validation
  else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      isValid = false;
      errorMessage = field.dataset.emailMessage || 'Format email tidak valid';
    }
  }
  
  // Phone validation
  else if (field.type === 'tel' && field.value.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
    if (!phoneRegex.test(field.value.trim())) {
      isValid = false;
      errorMessage = field.dataset.phoneMessage || 'Format telepon tidak valid';
    }
  }
  
  // Min length validation
  else if (field.hasAttribute('minlength') && field.value.length < parseInt(field.minLength)) {
    isValid = false;
    errorMessage = field.dataset.minlengthMessage || `Minimal ${field.minLength} karakter`;
  }
  
  // Max length validation
  else if (field.hasAttribute('maxlength') && field.value.length > parseInt(field.maxLength)) {
    isValid = false;
    errorMessage = field.dataset.maxlengthMessage || `Maksimal ${field.maxLength} karakter`;
  }
  
  // Pattern validation
  else if (field.hasAttribute('pattern') && field.value.trim()) {
    const pattern = new RegExp(field.pattern);
    if (!pattern.test(field.value)) {
      isValid = false;
      errorMessage = field.dataset.patternMessage || 'Format tidak sesuai';
    }
  }
  
  // Update field state
  if (isValid) {
    markFieldValid(field);
  } else {
    markFieldInvalid(field, errorMessage);
  }
  
  return isValid;
}

/**
 * Mark field as valid
 * @param {HTMLElement} field - Form field
 */
function markFieldValid(field) {
  field.classList.remove('error');
  field.classList.add('success');
  
  // Remove error message
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  
  // Add success icon
  const container = field.parentElement;
  if (!container.querySelector('.success-icon')) {
    const successIcon = document.createElement('div');
    successIcon.className = 'success-icon absolute right-3 top-3 text-green-500';
    successIcon.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;
    container.appendChild(successIcon);
  }
}

/**
 * Mark field as invalid
 * @param {HTMLElement} field - Form field
 * @param {string} message - Error message
 */
function markFieldInvalid(field, message) {
  field.classList.add('error');
  field.classList.remove('success');
  
  // Remove success icon
  const successIcon = field.parentElement.querySelector('.success-icon');
  if (successIcon) {
    successIcon.remove();
  }
  
  // Add or update error message
  let errorElement = field.parentElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message text-red-500 text-sm mt-1 flex items-center gap-1';
    errorElement.setAttribute('role', 'alert');
    field.parentElement.appendChild(errorElement);
  }
  
  errorElement.innerHTML = `
    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span>${message}</span>
  `;
  
  // Focus on first invalid field
  if (!field.form.querySelector('.error')) {
    field.focus();
  }
}

/**
 * Clear error from a field
 * @param {HTMLElement} field - Form field
 */
function clearFieldError(field) {
  field.classList.remove('error');
  
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  
  const successIcon = field.parentElement.querySelector('.success-icon');
  if (successIcon && !field.value.trim()) {
    successIcon.remove();
  }
}

/**
 * Clear all errors from a form
 * @param {HTMLFormElement} form - Form element
 */
function clearFormErrors(form) {
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
  
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    field.classList.remove('error', 'success');
    
    const successIcon = field.parentElement.querySelector('.success-icon');
    if (successIcon) {
      successIcon.remove();
    }
  });
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form element
 * @returns {boolean} - Whether form is valid
 */
function validateForm(form) {
  let isValid = true;
  
  // Validate all fields
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// ===== FORM SUBMISSION =====

/**
 * Handle form submission
 * @param {HTMLFormElement} form - Form element
 */
async function handleFormSubmission(form) {
  console.log('Handling form submission...');
  
  // Validate form
  if (!validateForm(form)) {
    showFormMessage(form, 'Harap perbaiki kesalahan di atas', 'error');
    return;
  }
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.innerHTML : '';
  
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="w-5 h-5 animate-spin mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      <span>Mengirim...</span>
    `;
  }
  
  try {
    // Simulate API call (replace with actual API call)
    await simulateFormSubmit(form);
    
    // Show success message
    showFormMessage(form, 'Form berhasil dikirim! Terima kasih atas kontribusi Anda.', 'success');
    
    // Reset form
    form.reset();
    clearFormErrors(form);
    
    // Log submission
    logFormSubmission(form);
    
  } catch (error) {
    console.error('Form submission error:', error);
    showFormMessage(form, 'Terjadi kesalahan. Silakan coba lagi.', 'error');
    
  } finally {
    // Restore button state
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }
}

/**
 * Simulate form submission (for demo)
 * @param {HTMLFormElement} form - Form element
 * @returns {Promise} - Promise that resolves after delay
 */
function simulateFormSubmit(form) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 10% chance of error for demo
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

/**
 * Show form message
 * @param {HTMLFormElement} form - Form element
 * @param {string} message - Message to show
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(form, message, type = 'info') {
  // Remove existing message
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message p-4 rounded-xl mt-4 ${
    type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
    type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
    'bg-blue-100 text-blue-700 border border-blue-300'
  }`;
  messageElement.setAttribute('role', 'alert');
  messageElement.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${type === 'success' ? 
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' :
          type === 'error' ?
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        }
      </svg>
      <span>${message}</span>
    </div>
  `;
  
  // Insert message after form or before submit button
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.parentElement.insertBefore(messageElement, submitButton);
  } else {
    form.appendChild(messageElement);
  }
  
  // Auto-remove success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (messageElement.parentElement) {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageElement.remove(), 300);
      }
    }, 5000);
  }
}

/**
 * Log form submission (for analytics)
 * @param {HTMLFormElement} form - Form element
 */
function logFormSubmission(form) {
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  
  console.log('Form submitted:', {
    formId: form.id || form.name || 'anonymous',
    timestamp: new Date().toISOString(),
    values: formValues
  });
  
  // Send to analytics (if configured)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      form_id: form.id || form.name,
      form_name: form.name || 'anonymous'
    });
  }
}

// ===== GOOGLE FORMS INTEGRATION =====

/**
 * Initialize Google Forms integration
 */
function initGoogleForms() {
  console.log('Initializing Google Forms integration...');
  
  // Find Google Form links
  const googleFormLinks = document.querySelectorAll('a[href*="forms.gle"], a[href*="docs.google.com/forms"]');
  
  googleFormLinks.forEach(link => {
    // Add tracking to Google Form clicks
    link.addEventListener('click', function(event) {
      trackGoogleFormClick(this.href);
    });
    
    // Add visual indicator
    if (!link.querySelector('.google-form-icon')) {
      const icon = document.createElement('span');
      icon.className = 'google-form-icon ml-2';
      icon.innerHTML = `
        <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      `;
      link.appendChild(icon);
    }
  });
  
  // Create Google Form iframe placeholder
  const formPlaceholders = document.querySelectorAll('.google-form-placeholder');
  formPlaceholders.forEach(placeholder => {
    const formUrl = placeholder.dataset.formUrl;
    if (formUrl) {
      loadGoogleForm(placeholder, formUrl);
    }
  });
}

/**
 * Track Google Form click
 * @param {string} formUrl - Google Form URL
 */
function trackGoogleFormClick(formUrl) {
  console.log('Google Form clicked:', formUrl);
  
  // Store in localStorage
  const formClicks = JSON.parse(localStorage.getItem('google_form_clicks') || '[]');
  formClicks.push({
    url: formUrl,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
  
  // Keep only last 100 clicks
  if (formClicks.length > 100) {
    formClicks.shift();
  }
  
  localStorage.setItem('google_form_clicks', JSON.stringify(formClicks));
  
  // Send to analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'google_form_click', {
      form_url: formUrl
    });
  }
}

/**
 * Load Google Form in iframe
 * @param {HTMLElement} container - Container element
 * @param {string} formUrl - Google Form URL
 */
function loadGoogleForm(container, formUrl) {
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = formUrl;
  iframe.width = '100%';
  iframe.height = '600';
  iframe.frameBorder = '0';
  iframe.marginHeight = '0';
  iframe.marginWidth = '0';
  iframe.title = 'Google Form - KKG Gugus III';
  iframe.loading = 'lazy';
  
  // Add loading state
  container.innerHTML = `
    <div class="text-center p-8">
      <div class="animate-spin w-10 h-10 mx-auto mb-4 text-blue-600">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
      <p>Memuat Google Form...</p>
    </div>
  `;
  
  // Load iframe after delay
  setTimeout(() => {
    container.innerHTML = '';
    container.appendChild(iframe);
  }, 1000);
}

// ===== FORM DATA PERSISTENCE =====

/**
 * Save form data to localStorage
 * @param {HTMLFormElement} form - Form element
 */
function saveFormData(form) {
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  
  // Only save if there's data
  if (Object.keys(formValues).length > 0) {
    localStorage.setItem(`form_draft_${form.id || form.name}`, JSON.stringify(formValues));
    console.log('Form data saved to localStorage');
  }
}

/**
 * Load saved form data
 * @param {HTMLFormElement} form - Form element
 */
function loadFormData(form) {
  const savedData = localStorage.getItem(`form_draft_${form.id || form.name}`);
  
  if (savedData) {
    try {
      const formValues = JSON.parse(savedData);
      
      Object.keys(formValues).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && (field.type !== 'radio' && field.type !== 'checkbox')) {
          field.value = formValues[key];
          validateField(field); // Validate after loading
        }
      });
      
      console.log('Form data loaded from localStorage');
      
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  }
}

/**
 * Clear saved form data
 * @param {HTMLFormElement} form - Form element
 */
function clearSavedFormData(form) {
  localStorage.removeItem(`form_draft_${form.id || form.name}`);
  console.log('Saved form data cleared');
}

// ===== INITIALIZATION =====

/**
 * Initialize forms module
 */
function initForms() {
  console.log('Initializing forms module...');
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize Google Forms integration
  initGoogleForms();
  
  // Set up auto-save for forms
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-autosave]');
    forms.forEach(form => {
      // Load saved data
      loadFormData(form);
      
      // Save on input
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('input', () => saveFormData(form));
      });
    });
  });
  
  console.log('Forms module initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initForms);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initFormValidation,
    validateForm,
    handleFormSubmission,
    initGoogleForms,
    initForms
  };
} else {
  window.initForms = initForms;
  window.handleFormSubmission = handleFormSubmission;
}
