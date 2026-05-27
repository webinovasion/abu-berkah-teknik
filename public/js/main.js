// =========================
// COMPONENT LOADER
// =========================
async function loadComponent(id, file, callback = null) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Component not found: ${file}`);
    }

    const html = await response.text();

    const element = document.getElementById(id);

    if (element) {
      element.innerHTML = html;
    }

    if (callback) {
      callback();
    }

  } catch (error) {
    console.error(error);
  }
}


// =========================
// GLOBAL COMPONENT PATH
// =========================
const pages = {
  navbar: "/components/navbar.html",
  content: "/components/index.html",
  footer: "/components/footer.html",
};


// =========================
// INITIALIZE APP
// =========================
async function initApp() {

  await loadComponent("navbar", pages.navbar, initNavbar);

  await loadComponent("content", pages.content);

  await loadComponent("footer", pages.footer);

  initScrollEffect();
  initScrollSpy();
  initWhatsAppForm();

  loadProjects();

  loadProjectsPage();

  initFAQ();

  initWhatsAppFormPage();

  initFloatingWA();
}

initApp();


// =========================
// NAVBAR
// =========================
function initNavbar() {

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");

  if (!hamburger || !mobileMenu || !hamburgerIcon) return;

  let isOpen = false;

  const toggleMenu = () => {

    isOpen = !isOpen;

    mobileMenu.classList.toggle("max-h-96", isOpen);
    mobileMenu.classList.toggle("opacity-100", isOpen);
    mobileMenu.classList.toggle("py-4", isOpen);

    mobileMenu.classList.toggle("max-h-0", !isOpen);
    mobileMenu.classList.toggle("opacity-0", !isOpen);
    mobileMenu.classList.toggle("py-0", !isOpen);

    hamburgerIcon.classList.toggle("fa-bars", !isOpen);
    hamburgerIcon.classList.toggle("fa-xmark", isOpen);
  };

  hamburger.addEventListener("click", toggleMenu);

  // AUTO CLOSE MOBILE MENU
  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {

      if (!isOpen) return;

      toggleMenu();
    });
  });
}


// =========================
// NAVBAR SCROLL EFFECT
// =========================
function initScrollEffect() {

  const navbar = document.querySelector("header");

  if (!navbar) return;

  window.addEventListener("scroll", () => {

    const isScrolled = window.scrollY > 20;

    navbar.classList.toggle("shadow-lg", isScrolled);
    navbar.classList.toggle("bg-slate-950", isScrolled);

    navbar.classList.toggle("bg-slate-950/90", !isScrolled);
  });
}


// =========================
// SCROLL SPY
// =========================
function initScrollSpy() {

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {

      link.classList.remove("text-orange-500");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("text-orange-500");
      }
    });
  });
}


function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProjects(projects) {
  const container = document.getElementById("portfolioGrid");
  if (!container) return;

  // Ambil 3 saja untuk beranda: featured duluan, sisanya urutan JSON
  const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const display = sorted.slice(0, 3);

  if (display.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-neutral-400 text-sm">
        Belum ada proyek yang ditampilkan.
      </div>`;
    return;
  }

  container.innerHTML = display.map((project) => `

    <a
      href="/pages/Proyek/detail.html?slug=${escapeHTML(project.slug)}"
      class="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
    >
      <!-- IMAGE -->
      <div class="relative h-52 overflow-hidden bg-neutral-100">
        <img
          src="${escapeHTML(project.image)}"
          alt="${escapeHTML(project.title)}"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        ${project.featured ? `
          <span class="absolute top-3 left-3 bg-accent-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            Featured
          </span>` : ""}
        ${project.category ? `
          <span class="absolute top-3 right-3 bg-primary-dark/70  text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            ${escapeHTML(project.category)}
          </span>` : ""}
      </div>

      <!-- BODY -->
      <div class="flex flex-col flex-1 p-5">
        <h3 class="text-[15px] font-bold text-primary-dark mb-2 leading-snug">
          ${escapeHTML(project.title)}
        </h3>
        <p class="text-[13px] text-neutral-500 leading-relaxed flex-1">
          ${escapeHTML(project.description)}
        </p>

        <!-- META -->
        <div class="flex flex-wrap items-center gap-1.5 mt-4 pt-3.5 border-t border-neutral-100 text-[11.5px] text-neutral-400">
          ${project.location ? `
            <span class="inline-flex items-center gap-1">
              <i class="fa-solid fa-location-dot text-[10px]"></i>
              ${escapeHTML(project.location)}
            </span>` : ""}
          ${project.year ? `<span class="text-neutral-200">·</span><span>${escapeHTML(project.year)}</span>` : ""}
          ${project.scope ? `<span class="text-neutral-200">·</span><span>${escapeHTML(project.scope)}</span>` : ""}
        </div>
      </div>
    </a>
  `).join("");
}

async function loadProjects() {
  const container = document.getElementById("portfolioGrid");

  try {
    const response = await fetch("/data/projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();
    renderProjects(projects);

  } catch (error) {
    console.error("Failed to load projects:", error);
    if (container) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-neutral-400 text-sm">
          Gagal memuat data proyek.
        </div>`;
    }
  }
}

function initWhatsAppForm() {
  const waForm = document.getElementById("waForm");
  if (!waForm) return;

  const submitBtn = waForm.querySelector('button[type="submit"]');
  const WA_NUMBER = "6287886601667"; // satu sumber kebenaran, samakan dengan contact info

  function showError(message) {
    // hapus error sebelumnya
    const existing = waForm.querySelector(".form-error");
    if (existing) existing.remove();

    const el = document.createElement("p");
    el.className = "form-error text-xs text-red-500 mt-1";
    el.textContent = message;
    submitBtn.insertAdjacentElement("beforebegin", el);

    setTimeout(() => el.remove(), 4000);
  }

  function showSuccess() {
    const existing = waForm.querySelector(".form-success");
    if (existing) existing.remove();

    const el = document.createElement("p");
    el.className = "form-success text-xs text-emerald-600 mt-1 text-center";
    el.textContent = "Pesan sedang dibuka di WhatsApp...";
    submitBtn.insertAdjacentElement("afterend", el);

    setTimeout(() => el.remove(), 4000);
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.innerHTML = loading
      ? `<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
         </svg> Membuka WhatsApp...`
      : `<i class="fa-brands fa-whatsapp text-base"></i> Kirim via WhatsApp`;
  }

  waForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = document.getElementById("name")?.value.trim() ?? "";
    const phone   = document.getElementById("phone")?.value.trim() ?? "";
    const message = document.getElementById("message")?.value.trim() ?? "";

    if (!name) { showError("Nama tidak boleh kosong."); return; }
    if (!message) { showError("Pesan tidak boleh kosong."); return; }

    const text = [
      "Halo Abu Berkah Teknik,",
      "Saya ingin konsultasi proyek.",
      "",
      `Nama: ${name}`,
      phone ? `Telepon: ${phone}` : null,
      "",
      "Pesan:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    setLoading(true);

    const newTab = window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    // fallback kalau popup diblokir browser
    if (!newTab) {
      window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    setTimeout(() => {
      setLoading(false);
      showSuccess();
      waForm.reset();
    }, 1000);
  });
}

function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon");

    if (!trigger || !body) return;

    trigger.addEventListener("click", () => {
      const isOpen = body.style.maxHeight && body.style.maxHeight !== "0px";

      // Tutup semua
      items.forEach(i => {
        const b = i.querySelector(".faq-body");
        const ic = i.querySelector(".faq-icon");
        const it = i.querySelector(".faq-trigger");
        if (b) b.style.maxHeight = "0px";
        if (ic) {
          ic.classList.remove("bg-orange-50", "text-accent-orange", "rotate-45");
          ic.classList.add("bg-neutral-100", "text-neutral-400");
        }
        i.classList.remove("border-accent-orange/40");
        i.classList.add("border-neutral-200");
      });

      // Buka yang diklik kalau belum open
      if (!isOpen) {
        body.style.maxHeight = body.scrollHeight + "px";
        icon.classList.remove("bg-neutral-100", "text-neutral-400");
        icon.classList.add("bg-orange-50", "text-accent-orange", "rotate-45");
        item.classList.remove("border-neutral-200");
        item.classList.add("border-accent-orange/40");
      }
    });
  });
}

function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFeatured(project) {
  if (!project) return "";

  return `
    <div class="group relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[540px] flex flex-col justify-end bg-primary-dark">
      <img
        src="${escapeHTML(project.image)}"
        alt="${escapeHTML(project.title)}"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="eager"
        onerror="this.style.display='none'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>

      <div class="relative z-10 p-6 sm:p-10">
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 rounded-full bg-white/10  text-[11px] font-medium text-white">
            ${escapeHTML(project.category)}
          </span>
          <span class="px-3 py-1 rounded-full bg-white/10  text-[11px] font-medium text-white">
            ${escapeHTML(project.location)}
          </span>
        </div>

        <h3 class="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3 max-w-3xl">
          ${escapeHTML(project.title)}
        </h3>

        <p class="text-[14.5px] text-white/60 leading-relaxed max-w-2xl mb-6 hidden sm:block">
          ${escapeHTML(project.description)}
        </p>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap gap-4 text-sm text-white/60">
            ${project.location ? `
              <span class="inline-flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot text-accent-orange text-[11px]"></i>
                ${escapeHTML(project.location)}
              </span>` : ""}
            ${project.year ? `
              <span class="inline-flex items-center gap-1.5">
                <i class="fa-solid fa-calendar text-accent-orange text-[11px]"></i>
                ${escapeHTML(project.year)}
              </span>` : ""}
            ${project.category ? `
              <span class="inline-flex items-center gap-1.5">
                <i class="fa-solid fa-tag text-accent-orange text-[11px]"></i>
                ${escapeHTML(project.category)}
              </span>` : ""}
          </div>
          <a    
            href="/pages/proyek/detail.html?slug=${escapeHTML(project.slug)}"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 whitespace-nowrap flex-shrink-0"
          >
            Lihat Detail Proyek
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderCard(project) {
  return `
    <a    
      href="/pages/proyek/detail.html?slug=${escapeHTML(project.slug)}"
      class="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:-translate-y-1 hover:shadow-soft transition-all duration-200"
      data-category="${escapeHTML(project.category)}"
    >
      <div class="relative h-52 overflow-hidden bg-neutral-100">
        <img
          src="${escapeHTML(project.image)}"
          alt="${escapeHTML(project.title)}"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-neutral-300 text-sm\\'>Foto tidak tersedia</div>'"
        />
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary-dark/65  text-[10px] font-semibold text-white">
          ${escapeHTML(project.category)}
        </span>
      </div>

      <div class="flex flex-col flex-1 p-5">
        <h3 class="text-[15px] font-bold text-primary-dark mb-2 leading-snug">
          ${escapeHTML(project.title)}
        </h3>
        <p class="text-[13px] text-neutral-500 leading-relaxed flex-1">
          ${escapeHTML(project.description)}
        </p>
        <div class="flex flex-wrap items-center gap-1.5 mt-4 pt-3.5 border-t border-neutral-100 text-[11.5px] text-neutral-400">
          ${project.location ? `
            <span class="inline-flex items-center gap-1">
              <i class="fa-solid fa-location-dot text-[10px] text-accent-orange"></i>
              ${escapeHTML(project.location)}
            </span>` : ""}
          ${project.year ? `<span class="text-neutral-200">·</span><span>${escapeHTML(project.year)}</span>` : ""}
        </div>
        <span class="inline-flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-accent-blue">
          Lihat Detail
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </span>
      </div>
    </a>
  `;
}

function renderEmpty() {
  return `
    <div class="col-span-full py-16 text-center">
      <div class="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-folder-open text-neutral-300 text-lg"></i>
      </div>
      <p class="text-sm text-neutral-400">Belum ada proyek di kategori ini.</p>
    </div>
  `;
}

function initFilter(allProjects) {
  const buttons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projectGrid");
  const featuredContainer = document.getElementById("featuredContainer");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active state
      buttons.forEach(b => {
        b.classList.remove("bg-primary-dark", "text-white", "border-primary-dark");
        b.classList.add("bg-white", "text-neutral-600", "border-neutral-200");
      });
      btn.classList.add("bg-primary-dark", "text-white", "border-primary-dark");
      btn.classList.remove("bg-white", "text-neutral-600", "border-neutral-200");

      const filtered = filter === "all"
        ? allProjects
        : allProjects.filter(p => p.category === filter);

      // Featured hanya tampil saat filter "all"
      const featured = filter === "all"
        ? filtered.find(p => p.featured) ?? null
        : null;

      const nonFeatured = filter === "all"
        ? filtered.filter(p => !p.featured)
        : filtered;

      featuredContainer.innerHTML = featured ? renderFeatured(featured) : "";
      grid.innerHTML = nonFeatured.length > 0
        ? nonFeatured.map(renderCard).join("")
        : renderEmpty();
    });
  });
}

async function loadProjectsPage() {
  const grid = document.getElementById("projectGrid");
  const featuredContainer = document.getElementById("featuredContainer");
  if (!grid) return;

  // Skeleton
  grid.innerHTML = `
    <div class="h-56 rounded-2xl bg-neutral-100 animate-pulse"></div>
    <div class="h-56 rounded-2xl bg-neutral-100 animate-pulse"></div>
    <div class="h-56 rounded-2xl bg-neutral-100 animate-pulse"></div>
  `;

  try {
    const res = await fetch("/data/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const projects = await res.json();

    const featured = projects.find(p => p.featured) ?? null;
    const nonFeatured = projects.filter(p => !p.featured);

    featuredContainer.innerHTML = featured ? renderFeatured(featured) : "";
    grid.innerHTML = nonFeatured.length > 0
      ? nonFeatured.map(renderCard).join("")
      : renderEmpty();

    initFilter(projects);

  } catch (err) {
    console.error("Failed to load projects:", err);
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-sm text-neutral-400">
        Gagal memuat data proyek. Coba refresh halaman.
      </div>`;
  }
}

function initWhatsAppFormPage() {
  const waForm = document.getElementById("waForm");
  if (!waForm) return;

  const submitBtn = waForm.querySelector('button[type="submit"]');
  const WA_NUMBER = "6287886601667";

  function showError(message) {
    const existing = waForm.querySelector(".form-error");
    if (existing) existing.remove();
    const el = document.createElement("p");
    el.className = "form-error text-xs text-red-500 mt-1";
    el.textContent = message;
    submitBtn.insertAdjacentElement("beforebegin", el);
    setTimeout(() => el.remove(), 4000);
  }

  function showSuccess() {
    const existing = waForm.querySelector(".form-success");
    if (existing) existing.remove();
    const el = document.createElement("p");
    el.className = "form-success text-xs text-emerald-600 mt-1 text-center";
    el.textContent = "Pesan sedang dibuka di WhatsApp...";
    submitBtn.insertAdjacentElement("afterend", el);
    setTimeout(() => el.remove(), 4000);
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.innerHTML = loading
      ? `<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
         </svg> Membuka WhatsApp...`
      : `<i class="fa-brands fa-whatsapp text-base"></i> Kirim via WhatsApp`;
  }

  waForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = document.getElementById("name")?.value.trim() ?? "";
    const phone   = document.getElementById("phone")?.value.trim() ?? "";
    const service = document.getElementById("service")?.value ?? "";
    const message = document.getElementById("message")?.value.trim() ?? "";

    if (!name)    { showError("Nama tidak boleh kosong."); return; }
    if (!message) { showError("Pesan tidak boleh kosong."); return; }

    const text = [
      "Halo Abu Berkah Teknik,",
      "Saya ingin konsultasi proyek.",
      "",
      `Nama: ${name}`,
      phone   ? `Telepon: ${phone}`           : null,
      service ? `Layanan: ${service}`         : null,
      "",
      "Pesan:",
      message,
    ]
      .filter(line => line !== null)
      .join("\n");

    setLoading(true);

    const newTab = window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    if (!newTab) {
      window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    setTimeout(() => {
      setLoading(false);
      showSuccess();
      waForm.reset();
    }, 1000);
  });
}


function initFloatingWA() {
  const WA_NUMBER = "6287886601667";
  const WA_MESSAGE = encodeURIComponent("Halo Abu Berkah Teknik, saya ingin konsultasi proyek.");

  const btn = document.createElement("a");
  btn.href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";
  btn.setAttribute("aria-label", "Chat via WhatsApp");
  btn.className = [
    "fixed bottom-6 right-6 z-50",
    "w-14 h-14 rounded-full",
    "bg-[#25D366] text-white",
    "flex items-center justify-center",
    "shadow-elevated",
    "hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)]",
    "transition-all duration-200",
    // Animasi masuk
    "opacity-0 translate-y-4",
  ].join(" ");

  btn.innerHTML = `<i class="fa-brands fa-whatsapp text-2xl"></i>`;
  document.body.appendChild(btn);

  // Muncul setelah 800ms — tidak langsung di muka saat halaman baru dibuka
  setTimeout(() => {
    btn.classList.remove("opacity-0", "translate-y-4");
    btn.classList.add("opacity-100", "translate-y-0");
  }, 800);

  // Hide saat scroll ke footer, muncul lagi saat scroll naik
  const footer = document.querySelector("footer");
  if (!footer) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100");
      } else {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100");
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(footer);
}
