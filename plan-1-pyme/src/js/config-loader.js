const CONFIG_PATH = "./config/config.json";

function getValue(source, path) {
  if (!path) return undefined;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), source);
}

function toLink(value, type) {
  if (!value) return "";
  if (typeof value !== "string") return String(value);
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (type === "email") {
    return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`;
  }
  if (type === "phone") {
    return trimmed.startsWith("tel:") ? trimmed : `tel:${trimmed}`;
  }
  if (type === "whatsapp") {
    if (trimmed.startsWith("http")) return trimmed;
    const digits = trimmed.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  return trimmed;
}

function applyTheme(config) {
  const root = document.documentElement;
  if (!config || !config.brand) return;
  if (config.brand.accentColor) root.style.setProperty("--accent", config.brand.accentColor);
  if (config.brand.bgColor) root.style.setProperty("--bg", config.brand.bgColor);
  if (config.brand.textColor) root.style.setProperty("--text", config.brand.textColor);
}

function bindText(root, config, scope) {
  root.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    const localValue = scope ? getValue(scope, key) : undefined;
    const value = localValue !== undefined ? localValue : getValue(config, key);
    if (value === undefined || value === null || value === "") {
      if (el.hasAttribute("data-optional")) el.remove();
      return;
    }
    el.textContent = String(value);
  });
}

function bindAttributes(root, config, scope) {
  root.querySelectorAll("[data-bind-attr]").forEach((el) => {
    const raw = el.getAttribute("data-bind-attr");
    if (!raw) return;
    raw.split(",").forEach((pair) => {
      const parts = pair.split(":");
      if (parts.length !== 2) return;
      const attr = parts[0].trim();
      const path = parts[1].trim();
      const localValue = scope ? getValue(scope, path) : undefined;
      const value = localValue !== undefined ? localValue : getValue(config, path);
      if (!value) {
        if (el.hasAttribute("data-optional")) el.remove();
        return;
      }
      let resolved = String(value);
      if (path.includes("email")) resolved = toLink(value, "email");
      if (path.includes("phone")) resolved = toLink(value, "phone");
      if (path.includes("whatsapp")) resolved = toLink(value, "whatsapp");
      el.setAttribute(attr, resolved);
    });
  });
}

function renderRepeats(config) {
  document.querySelectorAll("[data-repeat]").forEach((list) => {
    const path = list.getAttribute("data-repeat");
    const items = getValue(config, path);
    if (!Array.isArray(items)) return;
    const template = list.querySelector("[data-repeat-item]");
    if (!template) return;
    list.innerHTML = "";
    items.forEach((item, index) => {
      const clone = template.cloneNode(true);
      clone.removeAttribute("data-repeat-item");
      const scope = typeof item === "object" && item !== null ? { ...item, index } : { value: item, index };
      bindText(clone, config, scope);
      bindAttributes(clone, config, scope);
      list.appendChild(clone);
    });
  });
}

function toggleSections(config) {
  const sections = config.sections || {};
  document.querySelectorAll("[data-section]").forEach((section) => {
    const key = section.getAttribute("data-section");
    if (!sections[key]) return;
    if (sections[key].enabled === false) section.remove();
  });
  document.querySelectorAll("[data-nav-for]").forEach((link) => {
    const key = link.getAttribute("data-nav-for");
    if (!sections[key]) return;
    if (sections[key].enabled === false) link.remove();
  });
}

function updateTitle(config) {
  if (!config.brand || !config.hero) return;
  document.title = `${config.brand.name} | ${config.hero.headline}`;
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

  applyTheme(config);
  updateTitle(config);
  bindText(document, config);
  bindAttributes(document, config);
  renderRepeats(config);
  toggleSections(config);
  return config;
}
