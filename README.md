# Website KKG Gugus III

Website resmi Kelompok Kerja Guru (KKG) Gugus III - Wadah kolaborasi dan pengembangan profesional guru-guru Sekolah Dasar.

## 📋 Fitur Utama

- **Multi-halaman SPA (Single Page Application)**
- **Responsive Design** - Optimal di semua perangkat
- **7 Halaman Utama**:
  1. **Beranda** - Sambutan dan statistik
  2. **Tentang** - Visi, misi, struktur organisasi
  3. **Agenda** - Jadwal kegiatan
  4. **Dokumentasi** - Galeri foto kegiatan
  5. **Transparansi** - Laporan keuangan
  6. **Masukan** - Formulir saran
  7. **Kontak** - Informasi kontak

## 🏗️ Struktur Proyek


## 🚀 Cara Menjalankan

### Opsi 1: Buka Langsung
1. Buka file `index.html` di browser

### Opsi 2: Live Server (Developer)
1. Install VS Code
2. Install ekstensi "Live Server"
3. Klik kanan `index.html` → "Open with Live Server"

### Opsi 3: GitHub Pages
1. Upload ke repository GitHub
2. Settings → Pages → Branch: main → Save
3. Website akan live di `https://username.github.io/repo-name`

## 🔧 Konfigurasi

### 1. Konten Dinamis
Edit file `assets/js/main.js` untuk mengubah:
- Nama ketua
- Sambutan
- Informasi kontak
- Judul dan deskripsi hero

### 2. Google Forms
Ganti placeholder Google Form di:
- `pages/feedback.html` (baris 56)
- `pages/contact.html` (baris 106)

Contoh:
```html
<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
        width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">
    Loading...
</iframe>

kkg-gugus-iii-website/
├── index.html # File utama
├── assets/ # Assets website
│ ├── css/ # Stylesheets
│ │ ├── styles.css # CSS utama
│ │ └── animations.css # Animasi
│ ├── js/ # JavaScript
│ │ ├── main.js # Logika utama
│ │ └── navigation.js # Navigasi
│ └── images/ # Gambar (kosong)
├── pages/ # Halaman website
│ ├── home.html # Halaman beranda
│ ├── about.html # Halaman tentang
│ ├── agenda.html # Halaman agenda
│ ├── documentation.html # Halaman dokumentasi
│ ├── transparency.html # Halaman transparansi
│ ├── feedback.html # Halaman masukan
│ └── contact.html # Halaman kontak
└── components/ # Komponen reusable
├── header.html # Header/Navigasi
└── footer.html # Footer


3. Warna dan Styling

Edit file assets/css/styles.css untuk mengubah:

    Warna utama

    Gradients

    Animasi

    Typography

📱 Responsive Breakpoints

    Mobile: < 640px

    Tablet: 640px - 1024px

    Desktop: > 1024px

🎨 Teknologi yang Digunakan

    HTML5 - Struktur website

    Tailwind CSS - Framework CSS utility-first

    Vanilla JavaScript - Interaktivitas

    Google Fonts - Typography (Outfit, Poppins)

    SVG - Ikon dan ilustrasi

📝 Konten yang Dapat Diedit
Teks yang Dapat Dikonfigurasi:
javascript

const defaultConfig = {
  hero_title: 'KKG Gugus III',
  hero_subtitle: 'Bersama Membangun Pendidikan Berkualitas',
  hero_description: 'Selamat datang di website resmi KKG Gugus III...',
  ketua_name: 'Drs. Ahmad Suryadi, M.Pd.',
  ketua_greeting: 'Assalamualaikum Warahmatullahi Wabarakatuh...',
  contact_email: 'kkg.gugus3@email.com',
  contact_phone: '+62 812-3456-7890',
  contact_address: 'Sekretariat KKG Gugus III...'
};

Data Statistik (Edit di HTML):

    Jumlah sekolah anggota

    Jumlah guru aktif

    Jumlah kegiatan per tahun

    Tahun berdiri

Agenda Kegiatan:

Edit di pages/agenda.html untuk:

    Tambah/kurangi kegiatan

    Ubah tanggal, waktu, lokasi

    Update deskripsi

🔄 Cara Menambahkan Halaman Baru

    Buat file baru di folder pages/ (contoh: news.html)

    Tambahkan struktur HTML dengan class page

    Update navigation di components/header.html

    Update quick links di components/footer.html (opsional)

📊 SEO & Optimasi

    Meta tags sudah disetel

    Struktur heading yang benar (H1, H2, H3)

    Alt text untuk gambar (tambahkan)

    Sitemap (disarankan untuk production)

    Google Analytics (tambahkan script di index.html)

🐛 Troubleshooting
1. Navigasi Tidak Bekerja

    Pastikan file navigation.js terload

    Periksa console untuk error JavaScript

2. Styling Tidak Muncul

    Periksa path CSS di index.html

    Pastikan Tailwind CSS CDN tersedia

3. Gambar Tidak Muncul

    Simpan gambar di assets/images/

    Gunakan path relatif: assets/images/nama-gambar.jpg

4. Google Form Tidak Bekerja

    Pastikan embed URL benar

    Periksa izin sharing di Google Form

📞 Dukungan

Untuk bantuan atau pertanyaan:

    Periksa bagian Troubleshooting

    Buka issue di repository GitHub

    Hubungi pengembang

📄 Lisensi

Website ini dapat digunakan dan dimodifikasi untuk kebutuhan KKG Gugus III. Tidak untuk dijual atau dikomersialkan.

KKG Gugus III - Bersama Membangun Pendidikan Berkualitas
text


## **16. .gitignore**
```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log

# Temporary files
*.tmp
*.temp

# Backup files
*.bak

17. INSTALLATION.md (Opsional)
markdown

# Panduan Instalasi Lengkap

## Prasyarat
1. **Web Browser** (Chrome, Firefox, Edge terbaru)
2. **Text Editor** (VS Code, Sublime Text, dll)
3. **Koneksi Internet** (untuk CDN)

## Langkah Instalasi

### 1. Clone/Download
```bash
git clone https://github.com/username/kkg-gugus-iii-website.git
cd kkg-gugus-iii-website

2. Struktur File

Pastikan struktur folder seperti ini:
text

kkg-gugus-iii-website/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── pages/
├── components/
└── README.md

3. Customisasi
A. Konten Dasar

    Buka assets/js/main.js

    Ubah variabel defaultConfig

    Sesuaikan dengan data KKG Gugus III

B. Gambar

    Simpan foto di assets/images/

    Update path di HTML (jika ada)

C. Google Forms

    Buat form di Google Forms

    Dapatkan embed URL

    Ganti di feedback.html dan contact.html

4. Testing

    Buka index.html di browser

    Test semua halaman

    Test di mobile dan desktop

5. Deployment
GitHub Pages

    Push ke repository GitHub

    Settings → Pages → Main branch

    Tunggu 1-2 menit

Hosting Lain

    Upload semua file ke hosting

    Pastikan struktur tetap sama

    Test URL website

Update Konten
Agenda Kegiatan

Edit file: pages/agenda.html

    Tambah kegiatan baru di bagian "Agenda Mendatang"

    Update "Kegiatan Sebelumnya"

Galeri Foto

Edit file: pages/documentation.html

    Tambah elemen baru di grid

    Update overlay text

Laporan Keuangan

Edit file: pages/transparency.html

    Update tabel keuangan

    Update summary cards

Tips Maintenance

    Backup secara berkala

    Update konten minimal bulanan

    Test semua link secara rutin

    Monitor Google Analytics

    Backup database (jika ada)

Kontak Developer

Jika menemui masalah teknis, hubungi:

    Email: developer@example.com

    GitHub: @username

text


## **Ringkasan File yang Sudah Dibuat:**

✅ **14 File Utama**:
1. `index.html` - Entry point
2. `assets/css/styles.css` - Styling utama
3. `assets/css/animations.css` - Animasi
4. `assets/js/main.js` - Logika utama
5. `assets/js/navigation.js` - Navigasi
6. `components/header.html` - Header
7. `components/footer.html` - Footer
8. `pages/home.html` - Beranda
9. `pages/about.html` - Tentang
10. `pages/agenda.html` - Agenda
11. `pages/documentation.html` - Dokumentasi
12. `pages/transparency.html` - Transparansi
13. `pages/feedback.html` - Masukan
14. `pages/contact.html` - Kontak

✅ **3 File Dokumentasi**:
1. `README.md` - Dokumentasi utama
2. `.gitignore` - Ignore file untuk Git
3. `INSTALLATION.md` - Panduan instalasi

## **Cara Menggunakan:**

1. **Download semua file** ke folder yang sama
2. **Buka `index.html`** di browser
3. **Edit konten** di file yang sesuai:
   - Data konfigurasi: `assets/js/main.js`
   - Halaman beranda: `pages/home.html`
   - Halaman agenda: `pages/agenda.html`
   - dll.

4. **Untuk deploy ke GitHub Pages**:
   - Buat repository baru di GitHub
   - Upload semua file
   - Settings → Pages → Branch: main → Save
   - Website live di: `https://username.github.io/repo-name`

Website ini sudah siap digunakan! Semua halaman berfungsi dengan baik dan sudah diorganisir dengan struktur yang rapi untuk memudahkan maintenance dan kolaborasi tim.

