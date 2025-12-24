const CONFIG_PATH = "./config/config.json";

function getValue(source, path) {
  if (!path) return undefined;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), source);
}

function setVar(name, value) {
  if (value === undefined || value === null || value === "") return;
  document.documentElement.style.setProperty(name, String(value));
}

function applyTheme(theme) {
  if (!theme) return;
  const palette = theme.palette || {};
  const brand = palette.brand || {};
  const neutral = palette.neutral || {};
  const borders = theme.borders || {};
  const components = theme.components || {};
  const effects = theme.effects || {};
  const shadows = theme.shadows || {};
  const gradients = theme.gradients || {};
  const states = theme.states || {};
  const fonts = theme.fonts || {};

  setVar("--color-primary", brand.primary);
  setVar("--color-accent", brand.secondary);
  setVar("--color-bg", neutral.bg);
  setVar("--color-text", neutral.text);
  setVar("--color-border", borders.default);
  setVar("--color-border-strong", borders.strong);
  setVar("--surface", neutral.surface1);
  setVar("--surface-2", neutral.surface2);
  setVar("--muted", neutral.muted);
  setVar("--ink", neutral.ink);
  setVar("--nav-bg", components.navBg);
  setVar("--footer-bg", components.footerBg);
  setVar("--button-primary-text", components.buttonPrimaryText);
  setVar("--button-secondary-text", components.buttonSecondaryText);
  setVar("--hero-grad", gradients.hero);
  setVar("--panel-grad", gradients.panel);
  setVar("--shadow-1", shadows.shadow1);
  setVar("--shadow-2", shadows.shadow2);
  setVar("--shadow-3", shadows.shadow3);
  setVar("--focus-ring", states.focusRing);
  setVar("--hover-lift", states.hoverLift);
  setVar("--font-base", fonts.base);
}

function bindText(root, content, scope) {
  root.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    const localValue = scope ? getValue(scope, key) : undefined;
    const value = localValue !== undefined ? localValue : getValue(content, key);
    if (value === undefined || value === null) return;
    el.textContent = String(value);
  });
}

function bindAttributes(root, content, scope) {
  root.querySelectorAll("[data-bind-attr]").forEach((el) => {
    const raw = el.getAttribute("data-bind-attr");
    if (!raw) return;
    raw.split(";").forEach((pair) => {
      const parts = pair.split(":");
      if (parts.length !== 2) return;
      const attr = parts[0].trim();
      const path = parts[1].trim();
      const localValue = scope ? getValue(scope, path) : undefined;
      const value = localValue !== undefined ? localValue : getValue(content, path);
      if (value === undefined || value === null) return;
      el.setAttribute(attr, String(value));
    });
  });
}

function renderRepeats(content) {
  document.querySelectorAll("[data-repeat]").forEach((list) => {
    const path = list.getAttribute("data-repeat");
    const items = getValue(content, path);
    if (!Array.isArray(items)) return;
    const template = list.querySelector("[data-repeat-item]");
    if (!template) return;
    const parent = template.parentElement || list;
    parent.removeChild(template);
    items.forEach((item, index) => {
      const clone = template.cloneNode(true);
      clone.removeAttribute("data-repeat-item");
      const scope = typeof item === "object" && item !== null ? { ...item, index } : { value: item, index };
      bindText(clone, content, scope);
      bindAttributes(clone, content, scope);
      parent.appendChild(clone);
    });
  });
}

function toggleSections(content) {
  const sections = (content && content.sections) || {};
  document.querySelectorAll("[data-section]").forEach((section) => {
    const key = section.getAttribute("data-section");
    if (!sections[key]) return;
    if (sections[key].enabled === false) section.remove();
  });
}

function updateTitle(content) {
  if (!content) return;
  if (content.meta && content.meta.title) {
    document.title = content.meta.title;
    return;
  }
  if (!content.brand || !content.hero) return;
  document.title = `${content.brand.name} | ${content.hero.headline}`;
}

export async function initConfig() {
  let config;
  try {
    const response = await fetch(CONFIG_PATH, { cache: "no-store" });
    if (!response.ok) return null;
    config = await response.json();
  } catch (error) {
    return null;
  }

  const content = config.content || {};
  applyTheme(config.theme);
  updateTitle(content);
  bindText(document, content);
  bindAttributes(document, content);
  renderRepeats(content);
  toggleSections(content);
  return config;
}
