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
