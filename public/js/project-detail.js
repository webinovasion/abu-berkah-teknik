function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderNotFound(container, message = "Proyek tidak ditemukan.") {
  container.innerHTML = `
    <div class="pt-32 pb-24 px-4 text-center">
      <div class="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto mb-5">
        <i class="fa-solid fa-folder-open text-neutral-400 text-xl"></i>
      </div>

      <h2 class="text-xl font-extrabold text-primary-dark mb-2">
        Proyek Tidak Ditemukan
      </h2>

      <p class="text-sm text-neutral-500 mb-6">
        ${escapeHTML(message)}
      </p>

      <a
        href="/pages/proyek/"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-dark text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <i class="fa-solid fa-arrow-left text-xs"></i>
        Kembali ke Proyek
      </a>
    </div>
  `;
}

function renderProjectPage(project) {
  document.title = `${escapeHTML(project.title)} | Abu Berkah Teknik`;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", escapeHTML(project.description ?? ""));

  // OG tags — tambahkan ini
  function setOgTag(property, content) {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }
  setOgTag("og:title", `${project.title} | Abu Berkah Teknik`);
  setOgTag("og:description", project.description ?? "");
  setOgTag("og:image", project.image ?? "");
  setOgTag("og:type", "article");

  const scopeTags = Array.isArray(project.scope)
    ? project.scope.map(item => `
        <span class="px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-sm text-neutral-600 font-medium">
          ${escapeHTML(item)}
        </span>`).join("")
    : "";

  const container = document.getElementById("projectContainer");

  container.innerHTML = `

    <!-- HERO -->
    <section class="bg-primary-dark pt-32 pb-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">

        <!-- BREADCRUMB -->
        <div class="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <a href="/" class="hover:text-white transition-colors">Beranda</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <a href="/pages/proyek/" class="hover:text-white transition-colors">Proyek</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <span class="text-neutral-300 truncate max-w-[180px] sm:max-w-xs">${escapeHTML(project.title)}</span>
        </div>

        <!-- META PILLS -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          ${project.category ? `
            <span class="px-2.5 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-[11px] font-semibold text-accent-orange">
              ${escapeHTML(project.category)}
            </span>` : ""}
          ${project.location ? `
            <span class="inline-flex items-center gap-1.5 text-xs text-neutral-500">
              <i class="fa-solid fa-location-dot text-[10px]"></i>
              ${escapeHTML(project.location)}
            </span>` : ""}
          ${project.year ? `
            <span class="text-neutral-700 text-xs">·</span>
            <span class="text-xs text-neutral-500">${escapeHTML(project.year)}</span>` : ""}
        </div>

        <!-- TITLE -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
          ${escapeHTML(project.title)}
        </h1>

        ${project.description ? `
          <p class="text-[15px] text-neutral-400 leading-relaxed max-w-2xl">
            ${escapeHTML(project.description)}
          </p>` : ""}
      </div>
    </section>

    <!-- FEATURE IMAGE -->
    <section class="relative -mt-14 z-10 mb-4">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-elevated aspect-video">
          <img
            src="${escapeHTML(project.image)}"
            alt="${escapeHTML(project.title)}"
            class="w-full h-full object-cover"
            loading="eager"
            onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm\\'>Foto tidak tersedia</div>'"
          />
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">

        ${project.overview ? `
        <div class="border-b border-neutral-200 pb-10">
          <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Gambaran Proyek</p>
          <h2 class="text-xl font-extrabold text-primary-dark mb-3 tracking-tight">Overview</h2>
          <p class="text-[15px] text-neutral-600 leading-relaxed">${escapeHTML(project.overview)}</p>
        </div>` : ""}

        ${scopeTags ? `
        <div class="border-b border-neutral-200 pb-10">
          <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Lingkup Pekerjaan</p>
          <h2 class="text-xl font-extrabold text-primary-dark mb-4 tracking-tight">Scope of Work</h2>
          <div class="flex flex-wrap gap-2">${scopeTags}</div>
        </div>` : ""}

        ${project.challenge ? `
        <div class="border-b border-neutral-200 pb-10">
          <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Tantangan</p>
          <h2 class="text-xl font-extrabold text-primary-dark mb-3 tracking-tight">Challenges</h2>
          <p class="text-[15px] text-neutral-600 leading-relaxed">${escapeHTML(project.challenge)}</p>
        </div>` : ""}

        ${project.solution ? `
        <div class="pb-4">
          <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Solusi</p>
          <h2 class="text-xl font-extrabold text-primary-dark mb-3 tracking-tight">Solusi yang Diterapkan</h2>
          <p class="text-[15px] text-neutral-600 leading-relaxed">${escapeHTML(project.solution)}</p>
        </div>` : ""}

        <!-- BACK LINK -->
        <div class="pt-4 border-t border-neutral-200">
          <a href="/pages/proyek/"
             class="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-dark transition-colors duration-150">
            <i class="fa-solid fa-arrow-left text-xs"></i>
            Kembali ke semua proyek
          </a>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="bg-primary-dark py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Butuh Proyek Serupa?
        </h2>
        <p class="text-[15px] text-neutral-400 mb-8">
          Konsultasikan kebutuhan engineering Anda langsung dengan tim kami.
        </p>
        <a
          href="https://wa.me/6287886601667"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fa-brands fa-whatsapp text-base"></i>
          Konsultasi Sekarang
        </a>
      </div>
    </section>
  `;
}

async function loadProjectDetail() {
  const container = document.getElementById("projectContainer");

  if (!container) return;

  const slug = new URLSearchParams(window.location.search).get("slug");

  if (!slug) {
    renderNotFound(container, "Slug proyek tidak ditemukan di URL.");
    return;
  }

  try {
    const res = await fetch("/data/projects.json");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const projects = await res.json();

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      renderNotFound(
        container,
        `Proyek dengan slug "${slug}" tidak ditemukan.`
      );
      return;
    }

    renderProjectPage(project);

  } catch (err) {
    console.error("Failed to load project:", err);

    renderNotFound(
      container,
      "Gagal memuat data proyek. Coba refresh halaman."
    );
  }
}

document.addEventListener("DOMContentLoaded", loadProjectDetail);