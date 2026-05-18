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
  navbar: "./components/navbar.html",
  content: "./components/index.html",
  footer: "./components/footer.html",
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


// =========================
// LOAD PROJECTS
// =========================
async function loadProjects() {

  try {

    const response = await fetch("../src/data/projects.json");

    if (!response.ok) {
      throw new Error("Projects data not found");
    }

    const projects = await response.json();

    const container = document.getElementById("portfolioGrid");

    if (!container) return;

    container.innerHTML = projects.map(project => `
      <div class="rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-orange-500/40 transition duration-300 hover:-translate-y-2 hover:shadow-2xl group">

        <div class="overflow-hidden">
          <img
            src="${project.image}"
            alt="${project.title}"
            class="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div class="p-6">

          <h3 class="text-xl font-bold mb-2">
            ${project.title}
          </h3>

          <p class="text-sm text-slate-400 mb-4 leading-relaxed">
            ${project.description}
          </p>

          <div class="text-xs text-orange-400">
            Scope: ${project.scope}
          </div>

        </div>

      </div>
    `).join("");

  } catch (error) {

    console.error("Failed to load projects:", error);
  }
}

function initWhatsAppForm() {

  const waForm = document.getElementById("waForm");

  if (!waForm) return;

  waForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // VALIDASI
    if (!name || !email || !message) {
      alert("Harap lengkapi semua field.");
      return;
    }

    // TEMPLATE PESAN
    const text = `
Halo Abuberkah Teknik,

Saya ingin konsultasi project.

Nama: ${name}
Email: ${email}

Pesan:
${message}
    `;

    // NOMOR WHATSAPP
    const phoneNumber = "6285881582774";

    // ENCODE
    const encodedText = encodeURIComponent(text);

    // OPEN WA
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedText}`,
      "_blank"
    );

    // RESET
    waForm.reset();
  });
}

