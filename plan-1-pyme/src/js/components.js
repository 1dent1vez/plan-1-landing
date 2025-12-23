function setupNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupAccordion() {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll(".accordion-item").forEach((item, index) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;
      const panelId = `accordion-panel-${index}`;
      trigger.setAttribute("aria-controls", panelId);
      panel.id = panelId;
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  });
}

export function initComponents() {
  setupNavToggle();
  setupAccordion();
}
