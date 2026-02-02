// ============================================
// KKG GUGUS III - PAGE LOADER & TRANSITIONS
// Handle page loading, transitions, and lazy loading
// ============================================

// ===== PAGE LOADING MANAGEMENT =====

/**
 * Show page loader
 */
function showLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.remove('hidden');
    loader.classList.add('flex');
  }
}

/**
 * Hide page loader
 */
function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.add('hidden');
    loader.classList.remove('flex');
  }
}

/**
 * Show skeleton loader for content
 * @param {HTMLElement} container - Container to show skeleton in
 * @param {string} type - Type of skeleton ('card', 'list', 'text')
 */
function showSkeletonLoader(container, type = 'card') {
  if (!container) return;
  
  const skeletons = {
    card: `
      <div class="skeleton-loader">
        <div class="h-48 bg-slate-200 rounded-t-3xl"></div>
        <div class="p-6">
          <div class="h-6 bg-slate-200 rounded mb-4"></div>
          <div class="h-4 bg-slate-200 rounded mb-2"></div>
          <div class="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
      </div>
    `,
    list: `
      <div class="skeleton-loader space-y-4">
        ${Array(3).fill().map(() => `
          <div class="h-20 bg-slate-200 rounded-2xl"></div>
        `).join('')}
      </div>
    `,
    text: `
      <div class="skeleton-loader space-y-3">
        <div class="h-4 bg-slate-200 rounded w-full"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6"></div>
        <div class="h-4 bg-slate-200 rounded w-4/6"></div>
        <div class="h-4 bg-slate-200 rounded w-full"></div>
      </div>
    `,
    stats: `
      <div class="skeleton-loader grid grid-cols-2 lg:grid-cols-4 gap-6">
        ${Array(4).fill().map(() => `
          <div class="h-40 bg-slate-200 rounded-3xl"></div>
        `).join('')}
      </div>
    `
  };
  
  container.innerHTML = skeletons[type] || skeletons.card;
}

/**
 * Smooth page transition
 * @param {string} oldPageId - Previous page ID
 * @param {string} newPageId - New page ID
 */
async function transitionPages(oldPageId, newPageId) {
  const pageContainer = document.getElementById('page-content');
  if (!pageContainer) return;
  
  // Add fade out animation
  pageContainer.style.opacity = '0';
  pageContainer.style.transform = 'translateY(20px)';
  
  // Wait for animation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Load new content
  await loadPageContent(newPageId);
  
  // Add fade in animation
  pageContainer.style.opacity = '1';
  pageContainer.style.transform = 'translateY(0)';
  pageContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ===== LAZY LOADING FOR IMAGES =====

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  console.log('Initializing lazy loading...');
  
  // Use Intersection Observer for modern browsers
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before image is in viewport
      threshold: 0.01
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
  } else {
    // Fallback for older browsers
    loadAllImages();
  }
  
  // Lazy load background images
  initLazyBackgrounds();
}

/**
 * Load a single image
 * @param {HTMLImageElement} img - Image element to load
 */
function loadImage(img) {
  // Set src from data-src
  if (img.dataset.src) {
    img.src = img.dataset.src;
    delete img.dataset.src;
  }
  
  // Set srcset from data-srcset
  if (img.dataset.srcset) {
    img.srcset = img.dataset.srcset;
    delete img.dataset.srcset;
  }
  
  // Add loaded class for styling
  img.classList.add('loaded');
  
  // Handle load event
  img.onload = function() {
    img.classList.add('loaded-success');
    
    // Remove loading placeholder if exists
    const placeholder = img.parentElement.querySelector('.image-placeholder');
    if (placeholder) {
      placeholder.style.opacity = '0';
      setTimeout(() => placeholder.remove(), 300);
    }
  };
  
  // Handle error
  img.onerror = function() {
    img.classList.add('loaded-error');
    console.error('Failed to load image:', img.dataset.src || img.src);
    
    // Show fallback image
    if (img.dataset.fallback) {
      img.src = img.dataset.fallback;
    }
  };
}

/**
 * Load all images immediately (fallback)
 */
function loadAllImages() {
  const images = document.querySelectorAll('img[data-src], img[data-srcset]');
  images.forEach(loadImage);
}

/**
 * Initialize lazy loading for background images
 */
function initLazyBackgrounds() {
  const lazyBackgrounds = document.querySelectorAll('[data-bg], [data-bg-src]');
  
  if ('IntersectionObserver' in window) {
    const backgroundObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          loadBackground(element);
          observer.unobserve(element);
        }
      });
    });
    
    lazyBackgrounds.forEach(bg => backgroundObserver.observe(bg));
  } else {
    lazyBackgrounds.forEach(loadBackground);
  }
}

/**
 * Load background image
 * @param {HTMLElement} element - Element with background image
 */
function loadBackground(element) {
  if (element.dataset.bg) {
    element.style.backgroundImage = `url('${element.dataset.bg}')`;
    delete element.dataset.bg;
  }
  
  if (element.dataset.bgSrc) {
    element.style.backgroundImage = `url('${element.dataset.bgSrc}')`;
    delete element.dataset.bgSrc;
  }
  
  element.classList.add('bg-loaded');
}

// ===== PERFORMANCE OPTIMIZATION =====

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
  const resources = [
    'assets/css/styles.css',
    'assets/css/animations.css',
    'assets/js/config.js',
    'assets/js/navigation.js'
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    }
    
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical JavaScript
 */
function deferNonCriticalScripts() {
  // Add defer attribute to non-critical scripts
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    script.defer = true;
  });
}

/**
 * Optimize images based on connection speed
 */
function optimizeForConnection() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      // Low bandwidth - load lower quality images
      document.body.classList.add('slow-connection');
      
      // Replace high-res images with placeholders
      const highResImages = document.querySelectorAll('img[data-low-res]');
      highResImages.forEach(img => {
        if (img.dataset.lowRes) {
          img.src = img.dataset.lowRes;
        }
      });
    }
  }
}

// ===== OFFLINE SUPPORT =====

/**
 * Initialize offline support
 */
function initOfflineSupport() {
  // Check online status
  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOfflineStatus);
  
  // Initial check
  if (!navigator.onLine) {
    handleOfflineStatus();
  }
  
  // Register service worker for PWA support (optional)
  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  }
}

/**
 * Handle online status
 */
function handleOnlineStatus() {
  console.log('Device is online');
  document.body.classList.remove('offline');
  
  // Hide offline message
  const offlineMessage = document.getElementById('offline-message');
  if (offlineMessage) {
    offlineMessage.classList.add('hidden');
  }
  
  // Retry loading failed resources
  retryFailedLoads();
}

/**
 * Handle offline status
 */
function handleOfflineStatus() {
  console.log('Device is offline');
  document.body.classList.add('offline');
  
  // Show offline message
  showOfflineMessage();
  
  // Save unsaved data (if any)
  savePendingData();
}

/**
 * Show offline message
 */
function showOfflineMessage() {
  let offlineMessage = document.getElementById('offline-message');
  
  if (!offlineMessage) {
    offlineMessage = document.createElement('div');
    offlineMessage.id = 'offline-message';
    offlineMessage.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white text-center p-3 z-50 hidden';
    offlineMessage.innerHTML = `
      <div class="container mx-auto flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</span>
      </div>
    `;
    document.body.appendChild(offlineMessage);
  }
  
  offlineMessage.classList.remove('hidden');
}

/**
 * Register service worker
 */
function registerServiceWorker() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Service worker disabled on localhost');
    return;
  }
  
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

/**
 * Retry failed resource loads
 */
function retryFailedLoads() {
  // Retry failed images
  const failedImages = document.querySelectorAll('img.loaded-error');
  failedImages.forEach(img => {
    if (img.dataset.retry) {
      const retryCount = parseInt(img.dataset.retry) || 0;
      if (retryCount < 3) {
        img.dataset.retry = retryCount + 1;
        setTimeout(() => loadImage(img), 1000 * retryCount);
      }
    } else {
      img.dataset.retry = 1;
      setTimeout(() => loadImage(img), 1000);
    }
  });
}

/**
 * Save pending data when going offline
 */
function savePendingData() {
  // Check for unsaved form data
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);
    
    if (Object.keys(formEntries).length > 0) {
      localStorage.setItem('pending_form_data', JSON.stringify(formEntries));
      console.log('Form data saved for offline');
    }
  });
}

// ===== ERROR HANDLING =====

/**
 * Initialize error handling
 */
function initErrorHandling() {
  // Handle JavaScript errors
  window.addEventListener('error', handleGlobalError);
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', handlePromiseRejection);
  
  // Handle resource loading errors
  document.addEventListener('error', handleResourceError, true);
}

/**
 * Handle global JavaScript errors
 * @param {ErrorEvent} event - Error event
 */
function handleGlobalError(event) {
  console.error('Global error:', event.error);
  
  // Don't show error for external scripts
  if (event.filename && !event.filename.includes(window.location.origin)) {
    return;
  }
  
  // Show user-friendly error message
  showErrorToast('Terjadi kesalahan. Silakan refresh halaman.');
}

/**
 * Handle unhandled promise rejections
 * @param {PromiseRejectionEvent} event - Promise rejection event
 */
function handlePromiseRejection(event) {
  console.error('Unhandled promise rejection:', event.reason);
  showErrorToast('Terjadi kesalahan. Silakan coba lagi.');
}

/**
 * Handle resource loading errors
 * @param {Event} event - Error event
 */
function handleResourceError(event) {
  const target = event.target;
  
  if (target.tagName === 'IMG') {
    console.error('Failed to load image:', target.src);
    target.classList.add('load-error');
    
    // Show fallback
    if (target.dataset.fallback) {
      target.src = target.dataset.fallback;
    } else {
      target.alt = 'Gagal memuat gambar';
    }
  }
  
  if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
    console.error('Failed to load resource:', target.src || target.href);
  }
}

/**
 * Show error toast message
 * @param {string} message - Error message
 */
function showErrorToast(message) {
  // Create toast if it doesn't exist
  let toastContainer = document.getElementById('error-toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'error-toast-container';
    toastContainer.className = 'fixed bottom-4 right-4 z-50 space-y-2';
    document.body.appendChild(toastContainer);
  }
  
  const toastId = 'toast-' + Date.now();
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2';
  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span>${message}</span>
    <button onclick="document.getElementById('${toastId}').remove()" class="ml-4 text-red-500 hover:text-red-700">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.getElementById(toastId)) {
      toast.remove();
    }
  }, 5000);
}

// ===== INITIALIZATION =====

/**
 * Initialize loader module
 */
function initLoader() {
  console.log('Initializing loader module...');
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Defer non-critical scripts
  deferNonCriticalScripts();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Optimize for connection speed
  optimizeForConnection();
  
  // Initialize offline support
  initOfflineSupport();
  
  // Initialize error handling
  initErrorHandling();
  
  console.log('Loader module initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLoader);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showLoader,
    hideLoader,
    showSkeletonLoader,
    initLazyLoading,
    initOfflineSupport,
    initErrorHandling,
    initLoader
  };
} else {
  window.initLazyLoading = initLazyLoading;
  window.initLoader = initLoader;
}
