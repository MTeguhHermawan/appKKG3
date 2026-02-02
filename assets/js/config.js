// ============================================
// KKG GUGUS III - CONFIGURATION FILE
// Semua pengaturan website diatur di sini
// ============================================

const KKG_CONFIG = {
  // ===== WEBSITE INFO =====
  site_name: 'KKG Gugus III',
  site_title: 'KKG Gugus III | Kecamatan Sumedang Utara',
  site_description: 'Website resmi Kelompok Kerja Guru (KKG) Gugus III Kecamatan Sumedang Utara',
  site_keywords: 'KKG, Gugus III, Sumedang Utara, guru SD, pendidikan, workshop guru',
  
  // ===== CONTACT INFO =====
  contact: {
    email: 'kkg.gugus3@email.com',
    phone: '+62 812-3456-7890',
    address: 'Sekretariat KKG Gugus III<br>Jl. Pendidikan No. 123<br>Kecamatan Cendekia, Indonesia',
    operating_hours: {
      weekday: 'Senin - Jumat: 08:00 - 15:00 WIB',
      saturday: 'Sabtu: 08:00 - 12:00 WIB',
      sunday: 'Minggu: Tutup'
    }
  },
  
  // ===== GOOGLE FORMS =====
  forms: {
    feedback: 'https://forms.gle/oRgnMCFquW4ozbDY9',
    contact: '' // Kosong karena hanya info kontak
  },
  
  // ===== HERO SECTION =====
  hero: {
    title: 'KKG Gugus III | Kec Sumedang Utara',
    subtitle: 'Bersama Membangun Pendidikan Berkualitas',
    description: 'Selamat datang di aplikasi KKG Gugus III | Kec Sumedang Utara. Wadah kolaborasi dan pengembangan profesional guru-guru Sekolah Dasar untuk menciptakan pembelajaran yang inovatif dan bermakna.',
    badge_text: 'Kelompok Kerja Guru SD GUGUS III | Kec Sumedang Utara'
  },
  
  // ===== KETUA GREETING =====
  ketua: {
    name: 'Mohamad Teguh Hermawan, S.S.',
    position: 'Ketua KKG Gugus III',
    school: 'SDN Sindang II',
    greeting: `Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan kepada Allah SWT atas segala rahmat dan karunia-Nya.

KKG Gugus III hadir sebagai wadah bagi guru-guru Sekolah Dasar untuk saling berbagi pengetahuan, pengalaman, dan praktik terbaik dalam dunia pendidikan. Kami berkomitmen untuk terus meningkatkan kualitas pembelajaran demi masa depan anak-anak bangsa.

Mari bersama-sama kita wujudkan pendidikan yang berkualitas, inovatif, dan bermakna bagi generasi penerus Indonesia.`
  },
  
  // ===== STATISTICS =====
  statistics: [
    {
      number: '8',
      label: 'Sekolah Anggota',
      icon: 'school',
      color: 'blue'
    },
    {
      number: '100+',
      label: 'Guru Aktif',
      icon: 'users',
      color: 'yellow'
    },
    {
      number: '12',
      label: 'Kegiatan/Tahun',
      icon: 'calendar-check',
      color: 'green'
    },
    {
      number: '0,5',
      label: 'Periode KKG',
      icon: 'clock',
      color: 'purple'
    }
  ],
  
  // ===== ORGANIZATIONAL STRUCTURE =====
  organization: [
    {
      position: 'Ketua',
      name: 'Mohamad Teguh Hermawan, S.S.',
      school: 'SDN Sindang II',
      color: 'blue'
    },
    {
      position: 'Sekretaris',
      name: 'Ade Arivin, S.Pd.',
      school: 'SDN Sindang IV',
      color: 'yellow'
    },
    {
      position: 'Bendahara',
      name: 'Didin Jaenudin, S.Pd.i',
      school: 'SDN Sindang V',
      color: 'purple'
    },
    // Tambahkan pengurus lainnya di sini
  ],
  
  // ===== UPCOMING AGENDA =====
  upcoming_agenda: [
    {
      date: '31 Jan 2026',
      title: 'Sosialisasi Aplikasi dan Pemaparan Materi Pembina Pengawas',
      description: 'Pembekelan Aplikasi serta Pematerian dari Pembina Pengawas.',
      location: 'SDN Jatihurip',
      category: 'workshop',
      status: 'soon'
    },
    {
      date: '22 Feb 2026',
      title: 'Rapat Koordinasi Bulan',
      description: 'Assesmen Membantu, Mudah, dan Menyenangkan.',
      location: 'SDN Jatihurip',
      category: 'meeting',
      status: 'upcoming'
    },
    {
      date: '14 Mar 2026',
      title: 'Rapat Koordinasi Bulan',
      description: 'RPP Mudah dan Membantu.',
      location: 'SDN Jatihurip',
      category: 'meeting',
      status: 'upcoming'
    }
  ],
  
  // ===== FINANCIAL TRANSPARENCY =====
  financial_summary: {
    total_income: 'Rp 15.500.000',
    total_expense: 'Rp 12.750.000',
    balance: 'Rp 2.750.000'
  },
  
  // ===== SOCIAL MEDIA (Optional) =====
  social_media: {
    // facebook: 'https://facebook.com/kkg-gugus-iii',
    // instagram: 'https://instagram.com/kkg_gugus_iii',
    // youtube: 'https://youtube.com/@kkg-gugus-iii'
  },
  
  // ===== IMAGE PATHS =====
  images: {
    logo: 'assets/images/logo/logo.png',
    favicon: 'assets/images/logo/favicon.png',
    placeholder: 'assets/images/placeholder.png'
  },
  
  // ===== FEATURE TOGGLES =====
  features: {
    lazy_loading: true,
    animations: true,
    google_analytics: false,
    offline_support: true
  },
  
  // ===== SEO SETTINGS =====
  seo: {
    google_site_verification: '', // Tambahkan jika punya
    google_analytics_id: '', // Tambahkan jika punya
    facebook_pixel_id: '' // Tambahkan jika punya
  }
};

// ===== HELPER FUNCTIONS =====

// Update UI dengan konfigurasi
function updateUIConfig() {
  console.log('Updating UI with configuration...');
  
  // Update hero section
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroDescription = document.getElementById('hero-description');
  const heroBadge = document.getElementById('hero-badge');
  
  if (heroTitle) heroTitle.textContent = KKG_CONFIG.hero.title;
  if (heroSubtitle) heroSubtitle.textContent = KKG_CONFIG.hero.subtitle;
  if (heroDescription) heroDescription.textContent = KKG_CONFIG.hero.description;
  if (heroBadge) heroBadge.textContent = KKG_CONFIG.hero.badge_text;
  
  // Update contact info
  updateContactInfo();
  
  // Update ketua info
  updateKetuaInfo();
  
  // Update statistics
  updateStatistics();
  
  // Update organization
  updateOrganization();
  
  console.log('UI configuration updated successfully');
}

// Update contact information
function updateContactInfo() {
  const emailEl = document.getElementById('contact-email-display');
  const phoneEl = document.getElementById('contact-phone-display');
  const addressEl = document.getElementById('contact-address-display');
  const footerEmail = document.getElementById('footer-email');
  const footerPhone = document.getElementById('footer-phone');
  
  if (emailEl) emailEl.textContent = KKG_CONFIG.contact.email;
  if (phoneEl) phoneEl.textContent = KKG_CONFIG.contact.phone;
  if (addressEl) addressEl.innerHTML = KKG_CONFIG.contact.address;
  
  // Update footer
  if (footerEmail) {
    footerEmail.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      ${KKG_CONFIG.contact.email}
    `;
  }
  
  if (footerPhone) {
    footerPhone.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      ${KKG_CONFIG.contact.phone}
    `;
  }
}

// Update ketua information
function updateKetuaInfo() {
  const ketuaName = document.getElementById('ketua-name');
  const ketuaGreeting = document.getElementById('ketua-greeting');
  
  if (ketuaName) ketuaName.textContent = KKG_CONFIG.ketua.name;
  
  if (ketuaGreeting) {
    const paragraphs = KKG_CONFIG.ketua.greeting.split('\n').filter(p => p.trim());
    ketuaGreeting.innerHTML = paragraphs.map((p, i) => {
      if (i === 0) {
        return `<p><span class="text-4xl text-yellow-500 font-serif leading-none">"</span> ${p}</p>`;
      } else if (i === paragraphs.length - 1) {
        return `<p>${p} <span class="text-4xl text-yellow-500 font-serif leading-none">"</span></p>`;
      } else {
        return `<p>${p}</p>`;
      }
    }).join('');
  }
}

// Update statistics
function updateStatistics() {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer || !KKG_CONFIG.statistics) return;
  
  const statsHtml = KKG_CONFIG.statistics.map((stat, index) => {
    const colorClasses = {
      blue: 'bg-blue-500 text-blue-700',
      yellow: 'bg-yellow-500 text-yellow-700',
      green: 'bg-green-500 text-green-700',
      purple: 'bg-purple-500 text-purple-700'
    };
    
    const bgClasses = {
      blue: 'gradient-soft-blue',
      yellow: 'gradient-soft-yellow',
      green: 'bg-gradient-to-br from-green-100 to-green-200',
      purple: 'bg-gradient-to-br from-purple-100 to-purple-200'
    };
    
    const icons = {
      school: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      'calendar-check': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    
    return `
      <div class="stat-card ${bgClasses[stat.color]} rounded-3xl p-8 lg:p-10 text-center card-hover shadow-lg" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl ${colorClasses[stat.color].split(' ')[0]} flex items-center justify-center shadow-xl">
          <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icons[stat.icon]}"/>
          </svg>
        </div>
        <div class="text-4xl lg:text-5xl font-extrabold ${colorClasses[stat.color].split(' ')[1]} mb-2">${stat.number}</div>
        <div class="text-slate-700 font-semibold text-base">${stat.label}</div>
      </div>
    `;
  }).join('');
  
  statsContainer.innerHTML = statsHtml;
}

// Update organization structure
function updateOrganization() {
  const orgContainer = document.getElementById('organization-container');
  if (!orgContainer || !KKG_CONFIG.organization) return;
  
  const orgHtml = KKG_CONFIG.organization.map((member, index) => {
    const colorClasses = {
      blue: 'gradient-soft-blue text-blue-600',
      yellow: 'gradient-soft-yellow text-yellow-600',
      green: 'bg-gradient-to-br from-green-100 to-green-200 text-green-600',
      purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
    };
    
    const bgColors = {
      blue: 'bg-blue-300',
      yellow: 'bg-yellow-300',
      green: 'bg-green-300',
      purple: 'bg-purple-300'
    };
    
    return `
      <div class="text-center p-8 ${colorClasses[member.color].split(' ')[0]} rounded-3xl shadow-lg" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full ${bgColors[member.color]} flex items-center justify-center shadow-xl">
          <svg class="w-12 h-12 ${colorClasses[member.color].split(' ')[1]}" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <h4 class="font-bold text-slate-800 text-lg mb-2">${member.position}</h4>
        <p class="text-slate-600 text-sm mb-1">${member.name}</p>
        <p class="${colorClasses[member.color].split(' ')[1]} text-xs font-semibold">${member.school}</p>
      </div>
    `;
  }).join('');
  
  orgContainer.innerHTML = orgHtml;
}

// Initialize configuration when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('KKG Config loaded');
  
  // Update UI after a short delay to ensure DOM is ready
  setTimeout(updateUIConfig, 100);
});

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KKG_CONFIG;
} else {
  window.KKG_CONFIG = KKG_CONFIG;
  window.updateUIConfig = updateUIConfig;
}
