function setupNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  const links = nav.querySelectorAll("a");
  const firstLink = links[0];
  const toggleLabel = {
    open: "Cerrar menu",
    closed: "Abrir menu",
  };

  const setState = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? toggleLabel.open : toggleLabel.closed);
  };

  const openNav = () => {
    setState(true);
    if (firstLink) firstLink.focus();
  };

  const closeNav = () => {
    setState(false);
    toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!nav.classList.contains("is-open")) return;
    event.preventDefault();
    closeNav();
  });
}

function setupAccordion() {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll(".accordion-item").forEach((item, index) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;
      const panelId = `accordion-panel-${index}`;
      const triggerId = `accordion-trigger-${index}`;
      trigger.id = triggerId;
      trigger.setAttribute("aria-controls", panelId);
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", triggerId);
      panel.setAttribute("aria-hidden", "true");
      panel.hidden = true;
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
        panel.setAttribute("aria-hidden", String(isOpen));
      });
    });
  });
}

export function initComponents() {
  setupNavToggle();
  setupAccordion();
}
