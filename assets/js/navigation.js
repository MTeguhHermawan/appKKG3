// Navigation function
function navigateTo(pageId) {
  // Update active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
  
  // Load the page content
  loadPage(pageId);
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    toggleMobileMenu();
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
}

// Mobile menu navigation
function mobileNavigateTo(pageId) {
  navigateTo(pageId);
  toggleMobileMenu();
}
