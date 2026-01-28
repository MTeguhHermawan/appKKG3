// Default configuration
const defaultConfig = {
  hero_title: 'KKG Gugus III | Kec Sumedang Utara',
  hero_subtitle: 'Bersama Membangun Pendidikan Berkualitas',
  hero_description: 'Selamat datang di aplikasi KKG Gugus III | Kec Sumedang Utara. Wadah kolaborasi dan pengembangan profesional guru-guru Sekolah Dasar untuk menciptakan pembelajaran yang inovatif dan bermakna.',
  ketua_name: 'Mohamad Teguh Hermawan, S.S.',
  ketua_greeting: 'Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan kepada Allah SWT atas segala rahmat dan karunia-Nya. KKG Gugus III hadir sebagai wadah bagi guru-guru Sekolah Dasar untuk saling berbagi pengetahuan, pengalaman, dan praktik terbaik dalam dunia pendidikan. Kami berkomitmen untuk terus meningkatkan kualitas pembelajaran demi masa depan anak-anak bangsa. Mari bersama-sama kita wujudkan pendidikan yang berkualitas, inovatif, dan bermakna bagi generasi penerus Indonesia.',
  contact_email: 'kkg.gugus3@email.com',
  contact_phone: '+62 812-3456-7890',
  contact_address: 'Sekretariat KKG Gugus III\nJl. Pendidikan No. 123\nKecamatan Cendekia, Indonesia'
};

// Update UI based on config
async function onConfigChange(cfg) {
  const config = { ...defaultConfig, ...cfg };
  
  // Update hero section
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = config.hero_title;
  
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle;
  
  const heroDescription = document.getElementById('hero-description');
  if (heroDescription) heroDescription.textContent = config.hero_description;
  
  // Update ketua section
  const ketuaName = document.getElementById('ketua-name');
  if (ketuaName) ketuaName.textContent = config.ketua_name;
  
  const ketuaGreeting = document.getElementById('ketua-greeting');
  if (ketuaGreeting) {
    const paragraphs = config.ketua_greeting.split('\n').filter(p => p.trim());
    ketuaGreeting.innerHTML = paragraphs.map((p, i) => {
      if (i === 0) {
        return `<p><span class="text-4xl text-yellow-500 font-serif leading-none">"</span>${p}</p>`;
      } else if (i === paragraphs.length - 1) {
        return `<p>${p}<span class="text-4xl text-yellow-500 font-serif leading-none">"</span></p>`;
      } else {
        return `<p>${p}</p>`;
      }
    }).join('');
  }
  
  // Update contact info
  const contactEmail = document.getElementById('contact-email-display');
  if (contactEmail) contactEmail.textContent = config.contact_email;
  
  const contactPhone = document.getElementById('contact-phone-display');
  if (contactPhone) contactPhone.textContent = config.contact_phone;
  
  const contactAddress = document.getElementById('contact-address-display');
  if (contactAddress) contactAddress.innerHTML = config.contact_address.replace(/\n/g, '<br>');
  
  // Update footer
  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) {
    footerEmail.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      ${config.contact_email}
    `;
  }
  
  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      ${config.contact_phone}
    `;
  }
}

// Map to capabilities
function mapToCapabilities(cfg) {
  return {
    recolorables: [],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined
  };
}

// Map to edit panel values
function mapToEditPanelValues(cfg) {
  return new Map([
    ['hero_title', cfg.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
    ['hero_description', cfg.hero_description || defaultConfig.hero_description],
    ['ketua_name', cfg.ketua_name || defaultConfig.ketua_name],
    ['ketua_greeting', cfg.ketua_greeting || defaultConfig.ketua_greeting],
    ['contact_email', cfg.contact_email || defaultConfig.contact_email],
    ['contact_phone', cfg.contact_phone || defaultConfig.contact_phone],
    ['contact_address', cfg.contact_address || defaultConfig.contact_address]
  ]);
}

// Initialize page loading
async function loadPage(pageId) {
  try {
    const response = await fetch(`pages/${pageId}.html`);
    const content = await response.text();
    document.getElementById('page-content').innerHTML = content;
    
    // Re-initialize any page-specific scripts
    if (typeof initPage === 'function') {
      initPage();
    }
  } catch (error) {
    console.error('Error loading page:', error);
  }
}

// Initialize SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', function() {
  onConfigChange(defaultConfig);
  
  // Load home page by default
  loadPage('home');
  
  // Load header and footer
  fetch('components/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;
    });
  
  fetch('components/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    });
});
