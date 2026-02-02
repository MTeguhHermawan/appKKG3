// ============================================
// KKG GUGUS III - NAVIGATION FUNCTIONS
// Handle page navigation and mobile menu
// ============================================

// Current active page
let currentPage = 'home';

// ===== NAVIGATION FUNCTIONS =====

/**
 * Navigate to a specific page
 * @param {string} pageId - ID of the page to navigate to
 */
function navigateTo(pageId) {
  console.log(`Navigating to: ${pageId}`);
  
  // Don't navigate if already on this page
  if (currentPage === pageId) {
    console.log(`Already on page: ${pageId}`);
    return false;
  }
  
  // Update current page
  currentPage = pageId;
  
  // Update URL hash (for browser history)
  window.history.pushState({ page: pageId }, '', `#${pageId}`);
  
  // Update active navigation links
  updateActiveNavLinks(pageId);
  
  // Load the page content
  loadPage(pageId);
  
  // Close mobile menu if open
  closeMobileMenu();
  
  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Update document title
  updatePageTitle(pageId);
  
  return false; // Prevent default link behavior
}

/**
 * Update active navigation links
 * @param {string} pageId - Active page ID
 */
function updateActiveNavLinks(pageId) {
  // Update desktop navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
  
  // Update mobile navigation links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
  
  // Update mobile menu indicator
  const mobileIndicator = document.getElementById('mobile-current-page');
  if (mobileIndicator) {
    const pageNames = {
      'home': 'Beranda',
      'about': 'Tentang',
      'agenda': 'Agenda',
      'documentation': 'Dokumentasi',
      'transparency': 'Transparansi',
      'feedback': 'Masukan',
      'contact': 'Kontak'
    };
    mobileIndicator.textContent = pageNames[pageId] || pageId;
  }
}

/**
 * Update page title based on current page
 * @param {string} pageId - Current page ID
 */
function updatePageTitle(pageId) {
  const pageTitles = {
    'home': 'KKG Gugus III | Kecamatan Sumedang Utara',
    'about': 'Tentang Kami - KKG Gugus III',
    'agenda': 'Agenda Kegiatan - KKG Gugus III',
    'documentation': 'Dokumentasi Kegiatan - KKG Gugus III',
    'transparency': 'Transparansi Keuangan - KKG Gugus III',
    'feedback': 'Masukan & Saran - KKG Gugus III',
    'contact': 'Hubungi Kami - KKG Gugus III'
  };
  
  document.title = pageTitles[pageId] || 'KKG Gugus III';
}

// ===== MOBILE MENU FUNCTIONS =====

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
  
  if (!mobileMenu) return;
  
  // Toggle visibility
  mobileMenu.classList.toggle('hidden');
  
  // Update button icon
  if (menuButton) {
    const svg = menuButton.querySelector('svg');
    if (svg) {
      if (mobileMenu.classList.contains('hidden')) {
        // Show hamburger icon
        svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
      } else {
        // Show close icon
        svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
      }
    }
  }
  
  // Toggle body scroll
  document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
  
  // Announce to screen readers
  const announcement = document.getElementById('mobile-menu-announcement');
  if (announcement) {
    announcement.textContent = mobileMenu.classList.contains('hidden') 
      ? 'Menu ditutup' 
      : 'Menu dibuka';
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
  
  if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;
  
  // Hide menu
  mobileMenu.classList.add('hidden');
  
  // Reset button icon
  if (menuButton) {
    const svg = menuButton.querySelector('svg');
    if (svg) {
      svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
    }
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
}

/**
 * Navigate from mobile menu
 * @param {string} pageId - Page ID to navigate to
 */
function mobileNavigateTo(pageId) {
  navigateTo(pageId);
  closeMobileMenu();
}

// ===== PAGE LOADING FUNCTIONS =====

/**
 * Load page content
 * @param {string} pageId - Page ID to load
 */
async function loadPage(pageId) {
  try {
    console.log(`Loading page: ${pageId}`);
    
    // Show loading state
    showPageLoading();
    
    // Get page content
    const pageContent = await getPageContent(pageId);
    
    // Update page content
    const pageContainer = document.getElementById('page-content');
    if (pageContainer) {
      pageContainer.innerHTML = pageContent;
      
      // Initialize page-specific scripts
      initializePageScripts(pageId);
      
      // Update configuration for the loaded page
      if (typeof updateUIConfig === 'function') {
        setTimeout(updateUIConfig, 50);
      }
      
      // Add page transition animation
      pageContainer.classList.add('page-transition');
      setTimeout(() => {
        pageContainer.classList.remove('page-transition');
      }, 500);
    }
    
    // Hide loading state
    hidePageLoading();
    
    // Log page view (for analytics)
    logPageView(pageId);
    
  } catch (error) {
    console.error('Error loading page:', error);
    showPageError(pageId, error.message);
  }
}

/**
 * Get page content from pages folder
 * @param {string} pageId - Page ID
 * @returns {Promise<string>} Page HTML content
 */
async function getPageContent(pageId) {
  const validPages = ['home', 'about', 'agenda', 'documentation', 'transparency', 'feedback', 'contact'];
  
  if (!validPages.includes(pageId)) {
    return `<div class="pt-24 text-center"><h1 class="text-2xl text-red-600">Halaman tidak ditemukan</h1></div>`;
  }
  
  try {
    const response = await fetch(`pages/${pageId}.html`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error fetching page ${pageId}:`, error);
    
    // Return fallback content
    return `
      <div class="pt-24 lg:pt-32 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-white rounded-3xl shadow-xl p-10">
            <svg class="w-20 h-20 mx-auto mb-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Halaman Sedang Tidak Tersedia</h2>
            <p class="text-slate-600 mb-6">Maaf, halaman "${pageId}" sedang tidak dapat diakses. Silakan coba lagi nanti.</p>
            <button onclick="navigateTo('home')" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Show page loading indicator
 */
function showPageLoading() {
  const loadingIndicator = document.getElementById('page-loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.classList.remove('hidden');
  }
}

/**
 * Hide page loading indicator
 */
function hidePageLoading() {
  const loadingIndicator = document.getElementById('page-loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden');
  }
}

/**
 * Show page error
 * @param {string} pageId - Page ID that failed to load
 * @param {string} errorMessage - Error message
 */
function showPageError(pageId, errorMessage) {
  const pageContainer = document.getElementById('page-content');
  if (pageContainer) {
    pageContainer.innerHTML = `
      <div class="pt-24 lg:pt-32 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-white rounded-3xl shadow-xl p-10">
            <svg class="w-20 h-20 mx-auto mb-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Gagal Memuat Halaman</h2>
            <p class="text-slate-600 mb-2">Terjadi kesalahan saat memuat halaman "${pageId}".</p>
            <p class="text-sm text-slate-500 mb-6">${errorMessage}</p>
            <button onclick="navigateTo('home')" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  hidePageLoading();
}

/**
 * Initialize page-specific scripts
 * @param {string} pageId - Page ID
 */
function initializePageScripts(pageId) {
  // Initialize page-specific scripts if they exist
  if (typeof initPage === 'function') {
    try {
      initPage();
    } catch (error) {
      console.error(`Error initializing page ${pageId}:`, error);
    }
  }
  
  // Page-specific initializations
  switch (pageId) {
    case 'documentation':
      if (typeof initDocumentationPage === 'function') {
        setTimeout(initDocumentationPage, 100);
      }
      break;
      
    case 'transparency':
      if (typeof initTransparencyPage === 'function') {
        setTimeout(initTransparencyPage, 100);
      }
      break;
      
    case 'feedback':
      if (typeof initFeedbackPage === 'function') {
        setTimeout(initFeedbackPage, 100);
      }
      break;
      
    case 'contact':
      if (typeof initContactPage === 'function') {
        setTimeout(initContactPage, 100);
      }
      break;
  }
  
  // Initialize lazy loading for images
  if (typeof initLazyLoading === 'function') {
    setTimeout(initLazyLoading, 200);
  }
}

/**
 * Log page view (for analytics)
 * @param {string} pageId - Page ID
 */
function logPageView(pageId) {
  // You can integrate with Google Analytics here
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: pageId,
      page_location: window.location.href
    });
  }
  
  // Or use custom logging
  console.log(`Page viewed: ${pageId}`);
}

// ===== BROWSER HISTORY SUPPORT =====

/**
 * Handle browser back/forward buttons
 */
function handlePopState(event) {
  if (event.state && event.state.page) {
    navigateTo(event.state.page);
  } else {
    // Default to home if no state
    navigateTo('home');
  }
}

/**
 * Initialize navigation system
 */
function initNavigation() {
  console.log('Initializing navigation...');
  
  // Handle initial page load from URL hash
  const hash = window.location.hash.substring(1);
  const initialPage = hash || 'home';
  
  // Set initial page
  currentPage = initialPage;
  updateActiveNavLinks(initialPage);
  updatePageTitle(initialPage);
  
  // Listen for browser back/forward buttons
  window.addEventListener('popstate', handlePopState);
  
  // Add click handlers to navigation links
  document.addEventListener('click', function(event) {
    const link = event.target.closest('[data-page]');
    if (link && link.dataset.page) {
      event.preventDefault();
      navigateTo(link.dataset.page);
    }
  });
  
  // Handle Escape key to close mobile menu
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = menuButton && menuButton.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnButton) {
        closeMobileMenu();
      }
    }
  });
  
  console.log('Navigation initialized');
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    navigateTo,
    toggleMobileMenu,
    mobileNavigateTo,
    closeMobileMenu,
    initNavigation
  };
} else {
  // Make functions available globally
  window.navigateTo = navigateTo;
  window.toggleMobileMenu = toggleMobileMenu;
  window.mobileNavigateTo = mobileNavigateTo;
  window.closeMobileMenu = closeMobileMenu;
}
