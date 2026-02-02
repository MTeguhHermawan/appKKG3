// ============================================
// KKG GUGUS III - GALLERY & PHOTO MANAGEMENT
// Handle photo gallery, filtering, and lightbox
// ============================================

// Gallery configuration
const GALLERY_CONFIG = {
  itemsPerPage: 12,
  filterAnimationDuration: 300,
  lightboxAnimationDuration: 200
};

// Current gallery state
let galleryState = {
  currentFilter: 'all',
  currentPage: 1,
  isLightboxOpen: false,
  currentLightboxIndex: 0
};

// Gallery data (in a real app, this would come from an API)
const GALLERY_DATA = [
  {
    id: 1,
    category: 'workshop',
    title: 'Workshop Kurikulum Merdeka 2024',
    description: 'Pelatihan implementasi Kurikulum Merdeka untuk guru-guru SD',
    date: '15 Januari 2024',
    location: 'SDN 01 Merdeka',
    color: 'blue'
  },
  {
    id: 2,
    category: 'meeting',
    title: 'Rapat Koordinasi Bulanan',
    description: 'Evaluasi program dan perencanaan kegiatan',
    date: '28 Januari 2024',
    location: 'SDN 02 Harapan',
    color: 'yellow'
  },
  {
    id: 3,
    category: 'training',
    title: 'Pelatihan Media Pembelajaran Digital',
    description: 'Belajar membuat media pembelajaran interaktif',
    date: '10 Februari 2024',
    location: 'SDN 03 Cendekia',
    color: 'green'
  },
  {
    id: 4,
    category: 'celebration',
    title: 'Perayaan Hari Guru Nasional',
    description: 'Perayaan HGN dengan tema Guru Bergerak, Indonesia Maju',
    date: '25 November 2024',
    location: 'Aula Kecamatan',
    color: 'purple'
  },
  {
    id: 5,
    category: 'workshop',
    title: 'Seminar Pendidikan Karakter',
    description: 'Integrasi pendidikan karakter dalam pembelajaran',
    date: '15 November 2024',
    location: 'SDN 04 Bangsa',
    color: 'pink'
  },
  {
    id: 6,
    category: 'meeting',
    title: 'Kegiatan Bersama Gugus',
    description: 'Silaturahmi dan diskusi antar sekolah',
    date: '20 Oktober 2024',
    location: 'SDN 05 Jaya',
    color: 'indigo'
  },
  {
    id: 7,
    category: 'training',
    title: 'Praktikum IPA Kelas Tinggi',
    description: 'Workshop praktikum sains untuk kelas 4-6',
    date: '5 Oktober 2024',
    location: 'SDN 06 Mandiri',
    color: 'teal'
  },
  {
    id: 8,
    category: 'celebration',
    title: 'Sharing Session Guru Berprestasi',
    description: 'Berbagi pengalaman guru berprestasi tingkat nasional',
    date: '30 September 2024',
    location: 'SDN 07 Utama',
    color: 'orange'
  },
  {
    id: 9,
    category: 'workshop',
    title: 'Workshop Literasi Digital',
    description: 'Pemanfaatan teknologi dalam pembelajaran literasi',
    date: '15 September 2024',
    location: 'SDN 08 Cemerlang',
    color: 'red'
  },
  {
    id: 10,
    category: 'training',
    title: 'Pelatihan Assesmen Autentik',
    description: 'Teknik penilaian autentik berbasis Kurikulum Merdeka',
    date: '1 September 2024',
    location: 'SDN 01 Merdeka',
    color: 'emerald'
  },
  {
    id: 11,
    category: 'meeting',
    title: 'Rapat Tahunan KKG',
    description: 'Evaluasi tahunan dan penyusunan program kerja',
    date: '20 Agustus 2024',
    location: 'SDN 02 Harapan',
    color: 'amber'
  },
  {
    id: 12,
    category: 'celebration',
    title: 'HUT KKG Gugus III',
    description: 'Perayaan ulang tahun KKG Gugus III ke-5',
    date: '10 Agustus 2024',
    location: 'Aula Kecamatan',
    color: 'violet'
  }
];

// Color mapping for categories
const CATEGORY_COLORS = {
  workshop: 'from-blue-300 to-blue-500',
  meeting: 'from-yellow-300 to-yellow-500',
  training: 'from-green-300 to-green-500',
  celebration: 'from-purple-300 to-purple-500'
};

const CATEGORY_ICONS = {
  workshop: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  meeting: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  training: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  celebration: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
};

// ===== GALLERY FILTERING =====

/**
 * Initialize gallery filtering
 */
function initGalleryFiltering() {
  console.log('Initializing gallery filtering...');
  
  // Add click handlers to filter buttons
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterGallery(filter);
      updateFilterButtons(filter);
    });
  });
  
  // Initialize with 'all' filter
  filterGallery('all');
  updateFilterButtons('all');
}

/**
 * Filter gallery items
 * @param {string} filter - Category to filter by
 */
function filterGallery(filter) {
  console.log(`Filtering gallery by: ${filter}`);
  
  // Update state
  galleryState.currentFilter = filter;
  galleryState.currentPage = 1;
  
  // Get gallery container
  const galleryContainer = document.getElementById('photo-gallery');
  if (!galleryContainer) return;
  
  // Show loading state
  galleryContainer.innerHTML = `
    <div class="col-span-full text-center py-12">
      <div class="animate-spin w-12 h-12 mx-auto mb-4 text-blue-600">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
      <p>Memfilter galeri...</p>
    </div>
  `;
  
  // Filter data
  const filteredData = filter === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === filter);
  
  // Render after delay for smooth transition
  setTimeout(() => {
    renderGallery(filteredData);
    updateGalleryStats(filteredData.length);
    
    // Smooth scroll to gallery
    galleryContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, GALLERY_CONFIG.filterAnimationDuration);
}

/**
 * Update active filter buttons
 * @param {string} activeFilter - Active filter
 */
function updateFilterButtons(activeFilter) {
  const filterButtons = document.querySelectorAll('[data-filter]');
  
  filterButtons.forEach(button => {
    const isActive = button.dataset.filter === activeFilter;
    
    if (isActive) {
      button.classList.remove('bg-slate-100', 'text-slate-600');
      button.classList.add('bg-blue-600', 'text-white');
    } else {
      button.classList.remove('bg-blue-600', 'text-white');
      button.classList.add('bg-slate-100', 'text-slate-600');
    }
  });
}

/**
 * Render gallery items
 * @param {Array} items - Gallery items to render
 */
function renderGallery(items) {
  const galleryContainer = document.getElementById('photo-gallery');
  if (!galleryContainer) return;
  
  if (items.length === 0) {
    galleryContainer.innerHTML = `
      <div class="col-span-full text-center py-16">
        <svg class="w-20 h-20 mx-auto mb-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <h3 class="text-xl font-bold text-slate-700 mb-2">Tidak ada foto</h3>
        <p class="text-slate-500 mb-6">Tidak ditemukan foto untuk kategori ini.</p>
        <button onclick="filterGallery('all')" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Tampilkan Semua
        </button>
      </div>
    `;
    return;
  }
  
  // Calculate pagination
  const startIndex = (galleryState.currentPage - 1) * GALLERY_CONFIG.itemsPerPage;
  const endIndex = startIndex + GALLERY_CONFIG.itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  // Generate gallery HTML
  const galleryHtml = paginatedItems.map(item => `
    <div class="photo-grid-item group aspect-square rounded-3xl bg-gradient-to-br ${CATEGORY_COLORS[item.category]} flex items-center justify-center cursor-pointer overflow-hidden shadow-xl relative"
         data-category="${item.category}"
         data-id="${item.id}"
         onclick="openLightbox(${item.id})"
         role="button"
         tabindex="0"
         aria-label="Buka foto ${item.title}"
         onkeypress="if(event.key === 'Enter') openLightbox(${item.id})">
      
      <div class="overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center p-6">
        <div class="text-center">
          <span class="text-white font-bold text-lg mb-1 block">${item.title}</span>
          <span class="text-white/80 text-sm">${item.date}</span>
        </div>
      </div>
      
      <svg class="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      
      <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${CATEGORY_ICONS[item.category]}"/>
        </svg>
      </div>
    </div>
  `).join('');
  
  // Add pagination if needed
  const totalPages = Math.ceil(items.length / GALLERY_CONFIG.itemsPerPage);
  let paginationHtml = '';
  
  if (totalPages > 1) {
    paginationHtml = `
      <div class="col-span-full mt-8">
        <div class="flex items-center justify-center gap-2">
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
            <button onclick="goToPage(${page})" 
                    class="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      page === galleryState.currentPage 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }">
              ${page}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  galleryContainer.innerHTML = galleryHtml + paginationHtml;
  
  // Add animation to items
  setTimeout(() => {
    const gridItems = galleryContainer.querySelectorAll('.photo-grid-item');
    gridItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 50}ms`;
      item.classList.add('scale-in');
    });
  }, 50);
}

/**
 * Go to specific page
 * @param {number} page - Page number
 */
function goToPage(page) {
  galleryState.currentPage = page;
  
  // Get filtered data
  const filteredData = galleryState.currentFilter === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === galleryState.currentFilter);
  
  // Re-render
  renderGallery(filteredData);
  
  // Scroll to top of gallery
  const galleryContainer = document.getElementById('photo-gallery');
  if (galleryContainer) {
    galleryContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Update gallery statistics
 * @param {number} count - Number of items
 */
function updateGalleryStats(count) {
  const statsElement = document.getElementById('gallery-stats');
  if (statsElement) {
    statsElement.textContent = `Menampilkan ${count} foto`;
  }
}

// ===== LIGHTBOX FUNCTIONALITY =====

/**
 * Initialize lightbox
 */
function initLightbox() {
  console.log('Initializing lightbox...');
  
  // Create lightbox element if it doesn't exist
  if (!document.getElementById('lightbox')) {
    createLightboxElement();
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleLightboxKeyboard);
  
  // Close lightbox on background click
  document.addEventListener('click', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
      const isBackground = event.target.id === 'lightbox' || 
                          event.target.id === 'lightbox-overlay';
      if (isBackground) {
        closeLightbox();
      }
    }
  });
}

/**
 * Create lightbox element
 */
function createLightboxElement() {
  const lightboxHtml = `
    <div id="lightbox" class="hidden fixed inset-0 z-[100]">
      <div id="lightbox-overlay" class="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
      
      <div class="relative h-full w-full flex items-center justify-center p-4">
        <!-- Close button -->
        <button id="lightbox-close" 
                onclick="closeLightbox()"
                class="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Tutup lightbox">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Navigation buttons -->
        <button id="lightbox-prev" 
                onclick="navigateLightbox(-1)"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Foto sebelumnya">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button id="lightbox-next" 
                onclick="navigateLightbox(1)"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Foto berikutnya">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        
        <!-- Lightbox content -->
        <div id="lightbox-content" class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
          <!-- Image will be loaded here -->
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', lightboxHtml);
}

/**
 * Open lightbox with specific image
 * @param {number} itemId - Gallery item ID
 */
function openLightbox(itemId) {
  console.log(`Opening lightbox for item ${itemId}`);
  
  // Get item data
  const item = GALLERY_DATA.find(i => i.id === itemId);
  if (!item) return;
  
  // Update state
  galleryState.isLightboxOpen = true;
  galleryState.currentLightboxIndex = GALLERY_DATA.findIndex(i => i.id === itemId);
  
  // Get lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  
  if (!lightbox || !lightboxContent) return;
  
  // Load lightbox content
  lightboxContent.innerHTML = `
    <div class="flex flex-col lg:flex-row h-full">
      <!-- Image placeholder -->
      <div class="lg:w-2/3 bg-gradient-to-br ${CATEGORY_COLORS[item.category]} flex items-center justify-center p-8">
        <div class="text-center">
          <svg class="w-32 h-32 mx-auto mb-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${CATEGORY_ICONS[item.category]}"/>
          </svg>
          <p class="text-white/80 text-sm">Foto akan ditampilkan di sini</p>
          <p class="text-white/60 text-xs mt-2">[Placeholder - upload foto sesuai kebutuhan]</p>
        </div>
      </div>
      
      <!-- Info panel -->
      <div class="lg:w-1/3 p-6 lg:p-8 overflow-y-auto">
        <div class="mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${getCategoryBadgeClass(item.category)} mb-3">
            <span class="w-2 h-2 rounded-full ${getCategoryDotClass(item.category)}"></span>
            <span class="text-xs font-bold capitalize">${item.category}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">${item.title}</h3>
          <p class="text-slate-600 text-sm">${item.description}</p>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <div>
              <p class="text-sm text-slate-500">Tanggal</p>
              <p class="font-medium text-slate-800">${item.date}</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <div>
              <p class="text-sm text-slate-500">Lokasi</p>
              <p class="font-medium text-slate-800">${item.location}</p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-slate-200">
          <p class="text-sm text-slate-500 mb-3">Bagikan foto ini:</p>
          <div class="flex gap-2">
            <button onclick="sharePhoto(${item.id}, 'facebook')" class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button onclick="sharePhoto(${item.id}, 'whatsapp')" class="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.826 9.826 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
              </svg>
            </button>
            <button onclick="sharePhoto(${item.id}, 'link')" class="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Show lightbox with animation
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Focus on close button for accessibility
  setTimeout(() => {
    const closeButton = document.getElementById('lightbox-close');
    if (closeButton) closeButton.focus();
  }, 100);
}

/**
 * Close lightbox
 */
function closeLightbox() {
  console.log('Closing lightbox');
  
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  // Hide lightbox
  lightbox.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
  
  // Update state
  galleryState.isLightboxOpen = false;
}

/**
 * Navigate lightbox
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateLightbox(direction) {
  const newIndex = galleryState.currentLightboxIndex + direction;
  
  // Check bounds
  if (newIndex < 0 || newIndex >= GALLERY_DATA.length) {
    return; // Reached beginning or end
  }
  
  // Update and open new item
  galleryState.currentLightboxIndex = newIndex;
  const newItemId = GALLERY_DATA[newIndex].id;
  openLightbox(newItemId);
}

/**
 * Handle keyboard navigation in lightbox
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleLightboxKeyboard(event) {
  if (!galleryState.isLightboxOpen) return;
  
  switch (event.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      navigateLightbox(1);
      break;
  }
}

/**
 * Share photo
 * @param {number} itemId - Item ID
 * @param {string} platform - Platform to share to
 */
function sharePhoto(itemId, platform) {
  const item = GALLERY_DATA.find(i => i.id === itemId);
  if (!item) return;
  
  const url = window.location.href.split('#')[0];
  const text = `Lihat foto "${item.title}" dari KKG Gugus III: ${url}`;
  
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      break;
    case 'link':
      // Copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Link berhasil disalin ke clipboard!');
      });
      return;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
}

// ===== HELPER FUNCTIONS =====

/**
 * Get category badge class
 * @param {string} category - Category
 * @returns {string} CSS class
 */
function getCategoryBadgeClass(category) {
  const classes = {
    workshop: 'bg-blue-100 text-blue-700',
    meeting: 'bg-yellow-100 text-yellow-700',
    training: 'bg-green-100 text-green-700',
    celebration: 'bg-purple-100 text-purple-700'
  };
  return classes[category] || 'bg-slate-100 text-slate-700';
}

/**
 * Get category dot class
 * @param {string} category - Category
 * @returns {string} CSS class
 */
function getCategoryDotClass(category) {
  const classes = {
    workshop: 'bg-blue-500',
    meeting: 'bg-yellow-500',
    training: 'bg-green-500',
    celebration: 'bg-purple-500'
  };
  return classes[category] || 'bg-slate-500';
}

// ===== INITIALIZATION =====

/**
 * Initialize gallery module
 */
function initGallery() {
  console.log('Initializing gallery module...');
  
  // Initialize filtering
  initGalleryFiltering();
  
  // Initialize lightbox
  initLightbox();
  
  console.log('Gallery module initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initGalleryFiltering,
    filterGallery,
    initLightbox,
    openLightbox,
    closeLightbox,
    initGallery
  };
} else {
  window.initGallery = initGallery;
  window.filterGallery = filterGallery;
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.navigateLightbox = navigateLightbox;
  window.goToPage = goToPage;
  window.sharePhoto = sharePhoto;
}
