import { initConfig } from "./config-loader.js";
import { initComponents } from "./components.js";

/**
 * main.js
 * -----------------------------------------------------------------------------
 * Punto de entrada de la landing.
 *
 * Responsabilidades:
 * - Cargar y aplicar la configuración (contenido + tema) vía `initConfig`.
 * - Inicializar componentes de UI (navegación, acordeones, etc.) vía `initComponents`.
 * - Construir y aplicar enlaces profundos de WhatsApp a partir de la configuración.
 * - Inyectar el año actual en los elementos marcados con [data-year].
 *
 * Requisitos en el DOM:
 * - [data-whatsapp-link] en anchors que deban apuntar al chat de WhatsApp.
 * - [data-year] en nodos donde se quiera mostrar el año actual.
 * - La etiqueta <html> recibe la clase "js" para permitir estilos condicionales.
 */

// Marca el documento como “con JS habilitado” para estilos condicionales.
document.documentElement.classList.add("js");

/**
 * Construye un deep link de WhatsApp a partir de la configuración global.
 *
 * Estructura esperada en config:
 * - config.content.whatsapp.number  → número de WhatsApp (string, puede contener separadores).
 * - config.content.whatsapp.message → mensaje inicial (string, opcional).
 *
 * Normalización:
 * - number: se limpian todos los caracteres no numéricos.
 * - message: se recorta y se codifica con encodeURIComponent.
 *
 * @param {object|null} config - Objeto de configuración devuelto por `initConfig`.
 * @returns {string} URL de WhatsApp (https://wa.me/...) o cadena vacía si falta el número.
 */
function buildWhatsAppLink(config) {
  const content = config && config.content ? config.content : {};
  const whatsapp = content.whatsapp || {};

  const number =
    typeof whatsapp.number === "string"
      ? whatsapp.number.replace(/\D/g, "")
      : "";

  if (!number) return "";

  const message =
    typeof whatsapp.message === "string" ? whatsapp.message.trim() : "";

  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";

  return `https://wa.me/${number}${encodedMessage}`;
}

/**
 * Aplica la URL de WhatsApp a todos los anchors marcados con [data-whatsapp-link].
 *
 * Comportamiento:
 * - Si `buildWhatsAppLink` devuelve cadena vacía, no se realiza ningún cambio.
 * - Si hay URL válida, se asigna al atributo href de cada elemento coincidente.
 *
 * @param {object|null} config - Objeto de configuración devuelto por `initConfig`.
 * @returns {void}
 */
function applyWhatsAppLinks(config) {
  const link = buildWhatsAppLink(config);
  if (!link) return;

  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.setAttribute("href", link);
  });
}

/**
 * Inyecta el año actual como texto en todos los elementos [data-year].
 *
 * Uso típico:
 * - Footer: <span data-year></span> para mostrar el año sin mantenerlo manualmente.
 *
 * @returns {void}
 */
function setCurrentYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });
}

/**
 * Inicializa la UI de la landing una vez que la configuración ha sido cargada.
 *
 * Orden de ejecución:
 * 1. `initConfig()`:
 *    - Carga y aplica tema, contenido y bindings de datos.
 *    - Devuelve el objeto completo de configuración o null si falla.
 * 2. `initComponents()`:
 *    - Activa comportamiento de navegación, acordeones, etc.
 * 3. `applyWhatsAppLinks(config)`:
 *    - Construye y asigna enlaces de WhatsApp a los elementos marcados.
 * 4. `setCurrentYear()`:
 *    - Actualiza todos los [data-year] con el año actual.
 *
 * Nota:
 * - La función no lanza errores si `initConfig()` falla: en ese caso `config` será null
 *   y simplemente no se aplicarán enlaces de WhatsApp.
 *
 * @returns {Promise<void>}
 */
async function init() {
  const config = await initConfig();
  initComponents();
  applyWhatsAppLinks(config);
  setCurrentYear();
}

// Bootstrap de la aplicación al cargar el módulo.
init();
