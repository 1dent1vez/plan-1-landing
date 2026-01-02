/**
 * components.js
 * -----------------------------------------------------------------------------
 * Responsabilidad
 * - Inicializar componentes de UI que dependen del DOM:
 *   - Menú de navegación responsive (toggle mobile).
 *   - Acordeón accesible (FAQ u otros bloques colapsables).
 *
 * Requisitos en el marcado:
 * - Menú:
 *   - Botón: [data-nav-toggle]
 *   - Contenedor de navegación: [data-nav]
 *   - Enlaces dentro de la nav: <a>
 *
 * - Acordeón:
 *   - Contenedor: [data-accordion]
 *   - Ítems: .accordion-item
 *   - Trigger: .accordion-trigger (button)
 *   - Panel: .accordion-panel (contenido colapsable)
 */

/**
 * Configura el menú de navegación responsive (mobile-first).
 *
 * Comportamiento:
 * - Alterna la clase .is-open en el contenedor de navegación.
 * - Actualiza aria-expanded y aria-label en el botón toggle.
 * - Envía el foco al primer enlace al abrir, y de vuelta al botón al cerrar.
 * - Cierra el menú al hacer clic en cualquier enlace de la nav.
 * - Cierra el menú al presionar Escape.
 *
 * Accesibilidad:
 * - aria-expanded: indica el estado del menú en el botón.
 * - aria-label: texto claro para tecnologías de asistencia.
 */
function setupNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  const links = nav.querySelectorAll("a");
  const firstLink = links[0];

  /** Etiquetas accesibles para el botón del menú */
  const toggleLabel = {
    open: "Cerrar menu",
    closed: "Abrir menu",
  };

  /**
   * Actualiza el estado visual y accesible del menú.
   * @param {boolean} isOpen - true para abrir, false para cerrar.
   */
  const setState = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? toggleLabel.open : toggleLabel.closed,
    );
  };

  /**
   * Abre el menú y mueve el foco al primer enlace navegable.
   */
  const openNav = () => {
    setState(true);
    if (firstLink) firstLink.focus();
  };

  /**
   * Cierra el menú y devuelve el foco al botón de toggle.
   */
  const closeNav = () => {
    setState(false);
    toggle.focus();
  };

  // Alterna el menú al hacer clic en el botón hamburguesa.
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Cierra el menú al hacer clic en cualquier enlace de navegación.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setState(false);
    });
  });

  // Permite cerrar el menú con la tecla Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!nav.classList.contains("is-open")) return;
    event.preventDefault();
    closeNav();
  });
}

/**
 * Configura la funcionalidad de acordeón accesible.
 *
 * Comportamiento:
 * - Cada .accordion-item obtiene IDs únicos para trigger y panel.
 * - El trigger alterna aria-expanded.
 * - El panel alterna hidden y aria-hidden.
 *
 * Accesibilidad:
 * - aria-controls en el trigger para asociarlo al panel.
 * - role="region" en el panel para delimitar la zona de contenido.
 * - aria-labelledby en el panel apuntando al trigger correspondiente.
 * - aria-hidden + hidden para sincronizar estado visual y accesible.
 */
function setupAccordion() {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll(".accordion-item").forEach((item, index) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      // IDs únicos por acordeón basados en el índice del item.
      const panelId = `accordion-panel-${index}`;
      const triggerId = `accordion-trigger-${index}`;

      trigger.id = triggerId;
      trigger.setAttribute("aria-controls", panelId);

      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", triggerId);
      panel.setAttribute("aria-hidden", "true");
      panel.hidden = true;

      // Alterna el estado abierto/cerrado del panel.
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        const nextState = !isOpen;

        trigger.setAttribute("aria-expanded", String(nextState));
        panel.hidden = !nextState;
        panel.setAttribute("aria-hidden", String(!nextState));
      });
    });
  });
}

/**
 * Punto de entrada para inicializar todos los componentes de UI.
 * Debe llamarse una sola vez tras tener el DOM listo.
 */
export function initComponents() {
  setupNavToggle();
  setupAccordion();
}
