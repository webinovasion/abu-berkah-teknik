# Dokumentasi Project — CV Abu Berkah Teknik Website

> **Versi:** 1.0  
> **Terakhir diperbarui:** 2026  
> **Developer:** [Nama Developer]  
> **Klien:** CV Abu Berkah Teknik

---

## Daftar Isi

1. [Gambaran Project](#1-gambaran-project)
2. [Struktur Folder](#2-struktur-folder)
3. [Tech Stack](#3-tech-stack)
4. [Konfigurasi Tailwind](#4-konfigurasi-tailwind)
5. [Struktur Halaman](#5-struktur-halaman)
6. [Data JSON](#6-data-json)
7. [JavaScript Modules](#7-javascript-modules)
8. [Komponen Reusable](#8-komponen-reusable)
9. [Konvensi Kode](#9-konvensi-kode)
10. [Panduan Update Konten](#10-panduan-update-konten)
11. [Checklist Deploy](#11-checklist-deploy)
12. [Kontak & Informasi Bisnis](#12-kontak--informasi-bisnis)

---

## 1. Gambaran Project

Website company profile untuk **CV Abu Berkah Teknik**, perusahaan jasa engineering yang bergerak di bidang Mechanical, Electrical, HVAC, Plumbing, dan Pengadaan Barang Teknik.

**Tujuan utama website:**
- Membangun kredibilitas dan kepercayaan calon klien B2B
- Menampilkan portofolio proyek yang telah dikerjakan
- Menjadi entry point konsultasi via WhatsApp

**Target audiens:** Klien B2B — manajer properti, kontraktor, pemilik gedung komersial/industri di area Jabodetabek.

---

## 2. Struktur Folder

```
root/
├── public/
│   ├── assets/
│   │   └── images/
│   │       ├── logo/
│   │       │   └── Logo-ABT.png
│   │       ├── hero/
│   │       │   └── Hero-Section.webp
│   │       ├── about/
│   │       │   └── About-Section.webp
│   │       ├── services/
│   │       │   └── HVAC-Service.webp
│   │       └── projects/
│   │           ├── Project-1.jpeg
│   │           ├── Project-2.jpeg
│   │           └── Project-3.jpeg
│   ├── css/
│   │   └── output.css          ← hasil build Tailwind, JANGAN edit manual
│   └── js/
│       ├── main.js             ← init global: navbar, footer, WA button, FAQ
│       ├── project-detail.js   ← render halaman detail proyek
│       ├── projects.js         ← render daftar proyek + filter
│       └── contact.js          ← handle form WA di halaman kontak
│
├── src/
│   ├── data/
│   │   └── projects.json       ← data semua proyek
│   ├── input.css               ← entry point Tailwind
│   └── (komponen lain)
│
├── pages/
│   ├── layanan/
│   │   └── index.html          ← halaman layanan
│   ├── proyek/
│   │   ├── index.html          ← daftar semua proyek
│   │   └── detail.html         ← detail proyek (dynamic via ?slug=)
│   ├── tentang/
│   │   └── index.html          ← halaman tentang kami
│   └── kontak/
│       └── index.html          ← halaman kontak
│
├── index.html                  ← halaman beranda
├── tailwind.config.js
├── package.json
└── Readme.md
```

---

## 3. Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| HTML5 | — | Markup semua halaman |
| Tailwind CSS | 3.x | Styling utility-first |
| JavaScript | ES6+ | Interaktivitas & dynamic content |
| Font Awesome | 6.5.0 | Icon library |
| Google Fonts (Inter) | — | Typography |

**Tidak menggunakan framework JS** (React, Vue, dll) — pure vanilla JS untuk performa optimal dan maintainability sederhana.

**Build tool:** Tailwind CLI

```bash
# Install dependencies
npm install

# Development — watch mode
npx tailwindcss -i ./public/input.css -o ./public/css/output.css --watch

# Production build
npx tailwindcss -i ./public/input.css -o ./public/css/output.css --minify
```

---

## 4. Konfigurasi Tailwind

File: `tailwind.config.js`

### Custom Colors

```js
colors: {
  primary: {
    dark: "#0F172A",        // Background gelap utama, navbar, footer
  },
  surface: {
    base: "#FFFFFF",        // Background card/form
    light: "#F8FAFC",       // Background section terang
    muted: "#F1F5F9",       // Background section muted / tag pills
  },
  accent: {
    blue: "#2563EB",        // CTA sekunder, link teks, icon elektrikal
    orange: "#F97316",      // CTA primer, eyebrow, highlight, icon HVAC
  },
  neutral: {
    100–900: ...            // Scale abu-abu berbasis slate
  }
}
```

### Custom Shadows

```js
shadows: {
  soft:     "0 10px 40px rgba(15,23,42,0.08)",   // Card hover
  card:     "0 4px 20px rgba(15,23,42,0.06)",    // Card default
  elevated: "0 20px 60px rgba(2,6,23,0.18)",     // Modal / floating element
}
```

### Custom Transition

```js
transitionTimingFunction: {
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)"   // ease-smooth
}
```

### Content Paths

```js
content: [
  "./public/**/*.{html,js}",
  "./pages/**/*.{html,js}",
  "./components/**/*.{html,js}",
]
```

> **Penting:** Setiap kali menambah class Tailwind di file baru di luar path di atas, pastikan path tersebut ditambahkan ke `content` agar class tidak di-purge saat build.

---

## 5. Struktur Halaman

### Beranda (`index.html`)

| Urutan | Section | Background |
|---|---|---|
| 1 | Hero | `bg-primary-dark` |
| 2 | Services | `bg-surface-light` |
| 3 | Portfolio (3 proyek) | `bg-surface-light` |
| 4 | About | `bg-surface-light` |
| 5 | CTA | `bg-primary-dark` |
| 6 | Contact (form + info) | `bg-surface-light` |

### Halaman Layanan (`pages/layanan/index.html`)

| Urutan | Section | Background |
|---|---|---|
| 1 | Hero | `bg-primary-dark` |
| 2 | Featured Services (grid) | `bg-surface-light` |
| 3 | Service Process (steps) | `bg-white` |
| 4 | Industries We Serve | `bg-surface-light` |
| 5 | FAQ Accordion | `bg-surface-muted` |
| 6 | CTA | `bg-primary-dark` |

### Halaman Proyek (`pages/proyek/index.html`)

| Urutan | Section | Background |
|---|---|---|
| 1 | Hero | `bg-primary-dark` |
| 2 | Filter + Featured + Grid | `bg-surface-light` |
| 3 | CTA | `bg-primary-dark` |

### Halaman Detail Proyek (`pages/proyek/detail.html`)

Dynamic — konten di-render dari `projects.json` berdasarkan `?slug=` di URL.

| Urutan | Section | Background |
|---|---|---|
| 1 | Breadcrumb (sticky) | `bg-white` |
| 2 | Hero (title + meta) | `bg-primary-dark` |
| 3 | Gambar proyek | bridge dark→light |
| 4 | Overview, Scope, Challenge, Solution | `bg-surface-light` |
| 5 | CTA | `bg-primary-dark` |

### Halaman Tentang (`pages/tentang/index.html`)

| Urutan | Section | Background |
|---|---|---|
| 1 | Hero | `bg-primary-dark` |
| 2 | About (text + foto) | `bg-surface-light` |
| 3 | Visi & Misi | `bg-surface-muted` |
| 4 | Why Choose Us | `bg-primary-dark` |
| 5 | CTA | `bg-surface-light` |

### Halaman Kontak (`pages/kontak/index.html`)

| Urutan | Section | Background |
|---|---|---|
| 1 | Hero | `bg-primary-dark` |
| 2 | Contact Info + Form | `bg-surface-light` |
| 3 | Google Maps | `bg-surface-light` |
| 4 | FAQ Mini | `bg-surface-light` |

---

## 6. Data JSON

### `src/data/projects.json`

Semua data proyek disimpan di satu file JSON. Struktur per item:

```json
{
  "id": 1,
  "slug": "hvac-retail-project",
  "title": "Instalasi HVAC & Ducting untuk Retail Modern",
  "category": "HVAC",
  "location": "Jakarta",
  "year": "2025",
  "description": "Deskripsi singkat untuk card di halaman daftar proyek.",
  "overview": "Deskripsi panjang untuk halaman detail proyek.",
  "scope": ["Ducting Installation", "AC System", "Airflow Balancing"],
  "challenge": "Tantangan teknis yang dihadapi dalam proyek ini.",
  "solution": "Solusi yang diterapkan untuk mengatasi tantangan.",
  "image": "/assets/images/projects/Project-1.jpeg",
  "featured": true
}
```

**Catatan penting:**
- `slug` harus unik, huruf kecil, tanpa spasi, gunakan tanda `-` sebagai pemisah
- `image` gunakan absolute path dari root (`/public/assets/...`)
- Hanya satu item yang boleh `"featured": true` — item ini tampil sebagai featured card di halaman proyek
- `category` harus salah satu dari: `HVAC`, `Electrical`, `Maintenance`, `Mechanical` — huruf besar-kecil harus tepat karena dipakai untuk filter

**Menambah proyek baru:** cukup tambahkan item baru di array JSON. Tidak perlu mengubah kode JS atau HTML apapun.

---

## 7. JavaScript Modules

### `public/js/main.js`

Diload di semua halaman. Berisi:

```
initNavbar()        — inject komponen navbar dari template
initFooter()        — inject komponen footer dari template
initHamburger()     — toggle mobile menu
initFAQ()           — accordion FAQ (dipakai di layanan & kontak)
initFloatingWA()    — floating WhatsApp button global
```

**Nomor WA** didefinisikan sebagai konstanta di satu tempat:

```js
const WA_NUMBER = "6287886601667";
```

> Jika nomor WA berubah, cukup update konstanta ini di `main.js` dan `contact.js`.

---

### `public/js/contact.js`

Handle form WhatsApp di halaman kontak.

```
initWhatsAppForm()  — validasi input, build pesan, buka WA
```

Field yang dikumpulkan dari form:
- `name` (required)
- `phone` (opsional)
- `service` — dropdown jenis layanan
- `message` (required)

Pesan yang dikirim ke WA diformat sebagai teks terstruktur. Field yang kosong (phone, service) tidak ikut dikirim.

---

### `public/js/projects.js`

Diload di halaman daftar proyek (`pages/proyek/index.html`).

```
loadProjects()      — fetch JSON, render featured + grid
renderFeatured()    — render featured card (item dengan featured: true)
renderCard()        — render card grid per proyek
renderEmpty()       — tampilkan pesan kosong jika filter tidak ada hasil
initFilter()        — handle click filter button
escapeHTML()        — sanitasi string sebelum inject ke DOM
```

---

### `public/js/project-detail.js`

Diload di halaman detail proyek (`pages/proyek/detail.html`).

```
loadProjectDetail() — baca slug dari URL, fetch JSON, find project
renderProjectPage() — inject seluruh konten halaman
renderNotFound()    — tampilkan error state jika slug tidak ditemukan
syncBreadcrumbTop() — set top breadcrumb sticky sesuai tinggi header
escapeHTML()        — sanitasi string
```

**Cara kerja URL:**
```
/pages/proyek/detail.html?slug=hvac-retail-project
                                ↑
                          dicocokkan dengan field "slug" di JSON
```

---

## 8. Komponen Reusable

### Navbar & Footer

Navbar dan footer di-inject via JS dari template tunggal di `main.js`. Ini memastikan jika ada perubahan (nomor telpon, menu baru), cukup update satu tempat.

```js
// Di main.js
function initNavbar() {
  document.getElementById("navbar").innerHTML = `...HTML navbar...`;
}

function initFooter() {
  document.getElementById("footer").innerHTML = `...HTML footer...`;
}
```

Setiap halaman hanya perlu menyediakan:
```html
<div id="navbar"></div>
<!-- ... konten halaman ... -->
<div id="footer"></div>
<script src="/public/js/main.js"></script>
```

---

### Floating WhatsApp Button

Otomatis muncul di semua halaman via `main.js`. Behavior:
- Muncul 800ms setelah halaman load (delay intentional)
- Tersembunyi saat footer terlihat di viewport
- Menggunakan warna brand WA (`#25D366`), bukan accent-orange

---

### Eyebrow Pattern

Dipakai konsisten di semua section header:

```html
<div class="inline-flex items-center gap-2 mb-4">
  <span class="w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"></span>
  <span class="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-orange">
    Label Section
  </span>
</div>
```

---

### FAQ Accordion

Diinisialisasi via `initFAQ()` di `main.js`. Bisa dipakai di halaman mana saja dengan markup:

```html
<div class="faq-item bg-white border border-neutral-200 rounded-2xl overflow-hidden">
  <button class="faq-trigger w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
    <span class="text-[14.5px] font-bold text-primary-dark">Pertanyaan di sini</span>
    <span class="faq-icon w-7 h-7 rounded-[7px] bg-neutral-100 ...">
      <i class="fa-solid fa-plus text-xs"></i>
    </span>
  </button>
  <div class="faq-body max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out">
    <p class="px-5 pb-5 text-[14px] text-neutral-500 leading-relaxed">Jawaban di sini</p>
  </div>
</div>
```

---

## 9. Konvensi Kode

### Bahasa

Semua teks konten yang tampil ke user menggunakan **Bahasa Indonesia**. Tidak ada campuran bahasa Inggris di teks visible (heading, label, CTA, eyebrow).

Pengecualian yang diperbolehkan:
- Nama teknis yang tidak punya padanan (`HVAC`, `Electrical`, `Ducting`, `Maintenance`)
- Komentar kode (`// ini boleh bahasa Inggris`)

### Penamaan

```
File HTML    : lowercase, kata dipisah tanda-hubung  → project-detail.html
File JS      : camelCase                             → projectDetail.js
File gambar  : PascalCase atau deskriptif            → Hero-Section.webp
Slug JSON    : lowercase, tanda-hubung               → hvac-retail-project
CSS class    : ikuti konvensi Tailwind               → bg-primary-dark
```

### Icon

Menggunakan **Font Awesome 6.5.0**. Semua icon wajib menyertakan `aria-hidden="true"` karena bersifat dekoratif:

```html
<i class="fa-solid fa-wind" aria-hidden="true"></i>
```

### Ukuran & Spacing

| Elemen | Value |
|---|---|
| Section padding vertikal | `py-24` |
| Container max-width | `max-w-7xl` (via class `container`) |
| Card border radius | `rounded-2xl` |
| Icon container | `w-10 h-10 rounded-xl` |
| Button border radius | `rounded-xl` |
| Gap grid | `gap-5` (card) / `gap-12` (layout) |

### Performa

- **Tidak menggunakan `backdrop-blur`** di semua elemen kecuali header — terlalu berat di GPU mobile
- Gunakan `bg-primary-dark/80` atau `bg-black/50` sebagai pengganti blur
- Gambar hero: `loading="eager"`, gambar lain: `loading="lazy"`
- Font Inter hanya load weight `600;700;800` — weight lain tidak dipakai

---

## 10. Panduan Update Konten

### Menambah Proyek Baru

1. Siapkan gambar proyek, simpan di `/public/assets/images/projects/`
2. Buka `src/data/projects.json`
3. Tambahkan item baru di akhir array mengikuti struktur di [Bagian 6](#6-data-json)
4. Pastikan `slug` unik dan `image` menggunakan absolute path
5. Jika ingin jadi featured, set `"featured": true` dan ubah item lama menjadi `false`

### Mengubah Nomor WhatsApp

Cari dan update di dua tempat:

```
public/js/main.js     → const WA_NUMBER = "..."
public/js/contact.js  → const WA_NUMBER = "..."
```

### Mengubah Menu Navigasi

Update fungsi `initNavbar()` dan `initFooter()` di `main.js`. Perubahan otomatis berlaku di semua halaman.

### Mengubah Warna Brand

Update nilai di `tailwind.config.js`, lalu jalankan ulang build Tailwind:

```bash
npx tailwindcss -i ./src/input.css -o ./public/css/output.css --minify
```

### Menambah FAQ

Tambahkan item baru dengan struktur markup FAQ Accordion (lihat [Bagian 8](#8-komponen-reusable)) di halaman yang relevan. Tidak perlu update JS — `initFAQ()` otomatis mendeteksi semua `.faq-item` di halaman.

---

## 11. Checklist Deploy

Sebelum site dilaunching, pastikan semua item berikut sudah selesai:

### Konten
- [ ] Semua placeholder teks sudah diganti dengan konten nyata
- [ ] Foto hero, about, dan proyek sudah diupload dan path-nya benar
- [ ] Nomor WhatsApp sudah benar di semua tempat
- [ ] Email sudah benar
- [ ] Alamat di Google Maps embed sudah mengarah ke lokasi yang tepat
- [ ] Data `projects.json` sudah terisi minimal 3 proyek nyata

### SEO & Meta
- [ ] `og:url` di semua halaman sudah diupdate ke domain aktual
- [ ] `og:image` menggunakan absolute URL dengan domain aktual
- [ ] `canonical` link sudah diset per halaman
- [ ] File `thumbnail.jpg` untuk OG image sudah ada (ukuran 1200×630px)
- [ ] `sitemap.xml` sudah dibuat (opsional tapi direkomendasikan)

### Technical
- [ ] Tailwind sudah di-build dengan flag `--minify` untuk production
- [ ] Semua path gambar menggunakan absolute path (`/public/assets/...`)
- [ ] Tidak ada console error di semua halaman
- [ ] Form WhatsApp sudah ditest — pesan terkirim dengan format yang benar
- [ ] Filter proyek sudah ditest dengan semua kategori
- [ ] Breadcrumb sticky di detail proyek sudah presisi di semua ukuran layar
- [ ] Floating WA button muncul dan tersembunyi dengan benar

### Responsiveness
- [ ] Semua halaman sudah ditest di: 280px, 375px, 768px, 1024px, 1440px
- [ ] Mobile menu buka/tutup dengan benar
- [ ] Tidak ada overflow horizontal di ukuran layar apapun
- [ ] Floating stat card di About tidak keluar viewport di mobile

### Performa
- [ ] Tidak ada `backdrop-blur` di elemen selain header
- [ ] Semua gambar sudah dikompresi (gunakan `.webp` jika memungkinkan)
- [ ] Font hanya load weight yang dipakai: `600;700;800`

---

## 12. Kontak & Informasi Bisnis

| Info | Value |
|---|---|
| Nama Perusahaan | CV Abu Berkah Teknik |
| WhatsApp | +62 878 8660 1667 |
| Email | abuberkahteknik@gmail.com |
| Lokasi | Bekasi Utara, Kota Bekasi, Jawa Barat |
| Area Layanan | Jabodetabek |
| Jam Kerja | Senin–Jumat 08.00–17.00, Sabtu 08.00–14.00 |
| WA Number (tanpa +) | `6287886601667` |

---

*Dokumentasi ini dibuat untuk memudahkan handover, maintenance, dan pengembangan lebih lanjut oleh developer manapun yang meneruskan project ini.*
