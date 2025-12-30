/**
 * config-loader.js
 * -----------------------------------------------------------------------------
 * Responsabilidad
 * - Cargar y aplicar la configuración de contenido y tema desde `config/config.json`.
 * - Mapear la configuración a:
 * - Variables CSS (tema, colores, tipografías).
 * - Texto y atributos del DOM mediante data-bind / data-bind-attr.
 * - HTML mediante data-bind-html (Nuevo: para textos con formato como el aviso legal).
 * - Listas repetibles mediante data-repeat / data-repeat-item.
 * - Visibilidad de secciones mediante data-section + sections[key].enabled.
 * - Título del documento (document.title).
 *
 * Requisitos en el marcado:
 * - Texto: [data-bind="ruta.en.content"]
 * - HTML: [data-bind-html="ruta.en.content"] (Permite <strong>, <br>, etc.)
 * - Atributos: [data-bind-attr="attr:ruta.en.content;otroAttr:otra.ruta"]
 * - Listas: contenedor [data-repeat="ruta.array"], hijo plantilla [data-repeat-item]
 * - Secciones: [data-section="clave"] con definición en content.sections[clave]
 */

const CONFIG_PATH = "./config/config.json";

/**
 * Obtiene un valor anidado a partir de una ruta en notación de puntos.
 *
 * @param {object} source - Objeto origen en el que se buscará el valor.
 * @param {string} path - Ruta del tipo "a.b.c". Si es falsy, devuelve undefined.
 * @returns {*} Valor encontrado o undefined si alguna parte de la ruta no existe.
 */
function getValue(source, path) {
  if (!path) return undefined;
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), source);
}

/**
 * Asigna una variable CSS de forma segura al :root.
 *
 * Reglas:
 * - Ignora valores undefined, null o cadena vacía.
 *
 * @param {string} name - Nombre de la variable CSS (incluyendo el prefijo `--`).
 * @param {string|number} value - Valor a asignar.
 */
function setVar(name, value) {
  if (value === undefined || value === null || value === "") return;
  document.documentElement.style.setProperty(name, String(value));
}

/**
 * Aplica el tema visual recibido mapeando propiedades a variables CSS.
 *
 * Estructura esperada (opcional, tolerante a campos ausentes):
 * - theme.palette.brand / neutral
 * - theme.borders
 * - theme.components
 * - theme.effects
 * - theme.shadows
 * - theme.gradients
 * - theme.states
 * - theme.fonts
 *
 * @param {object} theme - Objeto de tema; si es falsy, no hace nada.
 */
function applyTheme(theme) {
  if (!theme) return;

  const palette = theme.palette || {};
  const brand = palette.brand || {};
  const neutral = palette.neutral || {};
  const borders = theme.borders || {};
  const components = theme.components || {};
  const effects = theme.effects || {}; // reservado (no usado actualmente)
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

/**
 * Bindea texto en un subárbol del DOM usando atributos [data-bind].
 *
 * Resolución de valores:
 * 1. Si se pasa `scope`, intenta resolver la clave contra el scope local.
 * 2. Si no existe en scope, cae a `content`.
 *
 * CORRECCIÓN: Ahora busca también en el elemento raíz (root) si tiene el atributo.
 *
 * @param {ParentNode} root - Nodo raíz (document o fragment) donde buscar data-bind.
 * @param {object} content - Objeto de contenido global.
 * @param {object} [scope] - Objeto de datos local (por ejemplo, un item de data-repeat).
 */
function bindText(root, content, scope) {
  const selector = "[data-bind]";
  // Creamos un array con los descendientes y añadimos el root si coincide
  const descendants = Array.from(root.querySelectorAll(selector));
  const elements =
    root.matches && root.matches(selector) ? [root, ...descendants] : descendants;

  elements.forEach((el) => {
    const key = el.getAttribute("data-bind");
    const localValue = scope ? getValue(scope, key) : undefined;
    const value =
      localValue !== undefined ? localValue : getValue(content, key);

    if (value === undefined || value === null) return;
    el.textContent = String(value);
  });
}

/**
 * Bindea HTML en un subárbol del DOM usando atributos [data-bind-html].
 * Permite inyectar etiquetas como <strong>, <em>, <br>.
 *
 * @param {ParentNode} root - Nodo raíz.
 * @param {object} content - Contenido global.
 * @param {object} [scope] - Scope local.
 */
function bindHtml(root, content, scope) {
  const selector = "[data-bind-html]";
  const descendants = Array.from(root.querySelectorAll(selector));
  const elements =
    root.matches && root.matches(selector) ? [root, ...descendants] : descendants;

  elements.forEach((el) => {
    const key = el.getAttribute("data-bind-html");
    const localValue = scope ? getValue(scope, key) : undefined;
    const value =
      localValue !== undefined ? localValue : getValue(content, key);

    if (value === undefined || value === null) return;
    el.innerHTML = String(value);
  });
}

/**
 * Bindea atributos en un subárbol del DOM usando [data-bind-attr].
 *
 * Formato del atributo:
 * - data-bind-attr="attr:ruta.en.content;otroAttr:otra.ruta"
 *
 * Resolución:
 * 1. Intenta resolver ruta contra `scope` (si se proporciona).
 * 2. Si no existe en scope, cae a `content`.
 *
 * CORRECCIÓN: Ahora busca también en el elemento raíz (root) si tiene el atributo.
 *
 * @param {ParentNode} root - Nodo raíz (document o fragment).
 * @param {object} content - Objeto de contenido global.
 * @param {object} [scope] - Scope local (elemento de lista, etc.).
 */
function bindAttributes(root, content, scope) {
  const selector = "[data-bind-attr]";
  // Creamos un array con los descendientes y añadimos el root si coincide
  const descendants = Array.from(root.querySelectorAll(selector));
  const elements =
    root.matches && root.matches(selector) ? [root, ...descendants] : descendants;

  elements.forEach((el) => {
    const raw = el.getAttribute("data-bind-attr");
    if (!raw) return;

    raw.split(";").forEach((pair) => {
      const parts = pair.split(":");
      if (parts.length !== 2) return;

      const attr = parts[0].trim();
      const path = parts[1].trim();

      const localValue = scope ? getValue(scope, path) : undefined;
      const value =
        localValue !== undefined ? localValue : getValue(content, path);

      if (value === undefined || value === null) return;
      el.setAttribute(attr, String(value));
    });
  });
}

/**
 * Renderiza listas dinámicas basadas en atributos [data-repeat] y [data-repeat-item].
 *
 * Flujo:
 * - Busca contenedores con [data-repeat="ruta.array"].
 * - Obtiene el array desde `content` usando getValue.
 * - Toma el elemento con [data-repeat-item] como plantilla.
 * - Lo clona por cada item del array, removiendo data-repeat-item.
 * - Construye un scope local:
 * - Si item es objeto: { ...item, index }
 * - Si item es primitivo: { value: item, index }
 * - Aplica bindText y bindAttributes dentro del clon usando ese scope.
 *
 * @param {object} content - Objeto de contenido global.
 */
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

      const scope =
        typeof item === "object" && item !== null
          ? { ...item, index }
          : { value: item, index };

      bindText(clone, content, scope);
      bindHtml(clone, content, scope); // Habilita HTML en listas
      bindAttributes(clone, content, scope);
      parent.appendChild(clone);
    });
  });
}

/**
 * Activa o desactiva secciones completas en función de content.sections.
 *
 * Convención:
 * - Cada sección del DOM debe tener data-section="clave".
 * - content.sections[clave].enabled === false → sección se elimina del DOM.
 * - Si no hay entry para la clave, se deja la sección como está.
 *
 * @param {object} content - Objeto de contenido con la propiedad `sections`.
 */
function toggleSections(content) {
  const sections = (content && content.sections) || {};

  document.querySelectorAll("[data-section]").forEach((section) => {
    const key = section.getAttribute("data-section");
    if (!sections[key]) return;

    if (sections[key].enabled === false) section.remove();
  });
}

/**
 * Actualiza el título del documento a partir del contenido.
 *
 * Regla de prioridad:
 * 1. Si existe `content.meta.title`, se usa directamente.
 * 2. En caso contrario, si hay `content.brand` y `content.hero`,
 * se usa el formato: "brand.name | hero.headline".
 *
 * @param {object} content - Objeto de contenido global.
 */
function updateTitle(content) {
  if (!content) return;

  if (content.meta && content.meta.title) {
    document.title = content.meta.title;
    return;
  }

  if (!content.brand || !content.hero) return;
  document.title = `${content.brand.name} | ${content.hero.headline}`;
}

/**
 * Punto de entrada para inicializar la configuración de la landing.
 *
 * Flujo:
 * 1. Hace fetch de CONFIG_PATH sin usar caché del navegador.
 * 2. Si la respuesta es correcta, parsea el JSON.
 * 3. Aplica el tema (applyTheme).
 * 4. Actualiza el título del documento (updateTitle).
 * 5. Bindea texto y atributos en todo el documento (bindText / bindAttributes).
 * 6. Renderiza listas dinámicas (renderRepeats).
 * 7. Aplica visibilidad de secciones (toggleSections).
 *
 * @returns {Promise<object|null>} Objeto de configuración completo o null si falla.
 */

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

  // ---------------------------------------------------------
  // AUTOMATIZACIÓN DE LOGO
  // Genera "B." automáticamente si el nombre es "Brilint"
  // ---------------------------------------------------------
  if (content.brand && content.brand.name) {
    // Toma la primera letra, la hace mayúscula y agrega un punto
    const initial = content.brand.name.charAt(0).toUpperCase();
    content.brand.logoText = `${initial}.`;
  }
  // ---------------------------------------------------------

  applyTheme(config.theme);
  updateTitle(content);
  bindText(document, content);
  bindHtml(document, content);
  bindAttributes(document, content);
  renderRepeats(content);
  toggleSections(content);

  return config;
}

  

