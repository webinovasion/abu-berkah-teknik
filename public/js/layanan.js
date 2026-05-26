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

document.addEventListener("DOMContentLoaded", initFAQ);