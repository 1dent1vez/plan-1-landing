function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function setupStagger() {
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    const step = parseFloat(group.getAttribute("data-stagger")) || 0.08;
    const children = group.querySelectorAll("[data-reveal]");
    children.forEach((child, index) => {
      child.style.setProperty("--delay", `${index * step}s`);
    });
  });
}

export function initMotion() {
  setupStagger();
  setupReveal();
}
/**
 * motion.js
 * -----------------------------------------------------------------------------
 * Responsabilidad
 * - Gestionar animaciones de entrada (reveal) y escalonadas (stagger) de forma
 *   accesible y respetuosa con la preferencia de movimiento del usuario.
 *
 * Requisitos en el DOM:
 * - [data-reveal] en elementos que deban animarse al entrar en el viewport.
 *   - El CSS debe usar la clase .is-visible y/o la variable --delay para animar.
 * - [data-stagger="0.08"] en contenedores que agrupen elementos con [data-reveal]
 *   para aplicar delays escalonados.
 */

/**
 * Indica si el usuario ha configurado "Reducir movimiento" en su sistema.
 *
 * Uso:
 * - Para desactivar animaciones no esenciales cuando el usuario lo prefiere.
 *
 * @returns {boolean} true si el usuario prefiere reducir movimiento, false en caso contrario.
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Configura las animaciones de aparición (reveal) basadas en IntersectionObserver.
 *
 * Comportamiento:
 * - Si el usuario prefiere reducir movimiento o el navegador no soporta
 *   IntersectionObserver:
 *   - Marca todos los elementos [data-reveal] como visibles añadiendo .is-visible,
 *     sin animaciones.
 * - Si hay soporte y no hay preferencia de reducción:
 *   - Observa cada elemento [data-reveal].
 *   - Cuando un elemento entra en el viewport con al menos 15% visible, añade
 *     la clase .is-visible y deja de observar el elemento (animación una sola vez).
 *
 * Parámetros de IntersectionObserver:
 * - threshold: 0.15 → 15% del elemento visible.
 * - rootMargin: "0px 0px -10% 0px" → dispara un poco antes de que esté totalmente
 *   dentro de la ventana (anticipa la animación).
 *
 * @returns {void}
 */
function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  // Respeta la preferencia de movimiento y el soporte del navegador.
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Configura delays escalonados para grupos de elementos que se van a revelar.
 *
 * Requisitos:
 * - Contenedor: [data-stagger="0.08"] (el valor es el paso en segundos).
 * - Hijos: elementos dentro del contenedor marcados con [data-reveal].
 *
 * Comportamiento:
 * - Para cada contenedor con data-stagger:
 *   - Lee el valor de data-stagger como paso (step) en segundos; por defecto 0.08.
 *   - Para cada hijo [data-reveal], establece la CSS custom property --delay en
 *     función de su índice: index * step.
 * - El CSS debe usar var(--delay) para aplicar el delay en la animación/transición.
 *
 * @returns {void}
 */
function setupStagger() {
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    const step = parseFloat(group.getAttribute("data-stagger")) || 0.08;
    const children = group.querySelectorAll("[data-reveal]");

    children.forEach((child, index) => {
      child.style.setProperty("--delay", `${index * step}s`);
    });
  });
}

/**
 * Inicializa las funcionalidades de movimiento de la landing.
 *
 * Orden recomendado:
 * 1. `setupStagger()`:
 *    - Define los delays (--delay) antes de que los elementos se vuelvan visibles.
 * 2. `setupReveal()`:
 *    - Gestiona cuándo se añaden las clases de visibilidad para disparar las animaciones.
 *
 * Debe llamarse después de que el DOM esté listo (por ejemplo, desde main.js
 * tras initConfig / initComponents).
 *
 * @returns {void}
 */
export function initMotion() {
  setupStagger();
  setupReveal();
}
