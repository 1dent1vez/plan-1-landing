/**
 * landing.runtime.js
 * -----------------------------------------------------------------------------
 * Propósito
 * - “Hydratar” una landing estática usando un config.json.
 * - Inyecta texto (data-bind), atributos (data-bind-href / data-bind-placeholder),
 *   renderiza una lista de servicios y normaliza un enlace de WhatsApp.
 *
 * Alcance y dependencias
 * - Depende del DOM (document) y de fetch() en el navegador.
 * - Espera un archivo "config.json" accesible en la misma ruta/origen.
 * - Se ejecuta una sola vez en DOMContentLoaded.
 *
 * Consideraciones
 * - Silencia errores: si fetch falla o JSON es inválido, no hace nada.
 * - Este script asume un esquema de config específico (businessName, heroTitle, etc.).
 *   Ajusta las claves si tu JSON usa otra estructura (p.ej. brand.name, hero.headline).
 */

(function () {
  /**
   * Obtiene un valor anidado a partir de una ruta tipo "a.b.c".
   * @param {object} source - Objeto origen.
   * @param {string} path - Ruta con puntos (dot-notation).
   * @returns {*} Valor encontrado o undefined si no existe.
   *
   * Ejemplo:
   *   getValue({ a: { b: 1 } }, "a.b") -> 1
   */
  function getValue(source, path) {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), source);
  }

  /**
   * Inyecta texto en nodos con [data-bind].
   * - Lee la clave desde data-bind.
   * - Resuelve el valor con getValue(config, key).
   * - Asigna el valor a textContent.
   *
   * Nota:
   * - Excluye key === "services" porque esa lista se renderiza con renderServices().
   * - Ignora undefined/null (no pisa contenido existente).
   *
   * @param {object} config - Config ya parseada desde config.json.
   */
  function bindText(config) {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const key = el.getAttribute("data-bind");
      if (key === "services") return;

      const value = getValue(config, key);
      if (value === undefined || value === null) return;

      el.textContent = String(value);
    });
  }

  /**
   * Bindea atributos específicos en el DOM:
   * - [data-bind-href] -> href
   * - [data-bind-placeholder] -> placeholder
   *
   * Convención:
   * - Si el valor es falsy (""/null/undefined/0), se omite.
   *
   * @param {object} config - Config ya parseada.
   */
  function bindAttributes(config) {
    // Enlaces: data-bind-href="ruta.en.config"
    document.querySelectorAll("[data-bind-href]").forEach((el) => {
      const key = el.getAttribute("data-bind-href");
      const value = getValue(config, key);
      if (!value) return;
      el.setAttribute("href", String(value));
    });

    // Placeholders: data-bind-placeholder="ruta.en.config"
    document.querySelectorAll("[data-bind-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-bind-placeholder");
      const value = getValue(config, key);
      if (!value) return;
      el.setAttribute("placeholder", String(value));
    });
  }

  /**
   * Renderiza hasta 3 servicios en una lista con [data-bind="services"].
   * - Espera que services sea un array de strings.
   * - Reemplaza el contenido existente (innerHTML = "").
   *
   * Seguridad:
   * - Usa textContent para evitar inyección HTML.
   *
   * @param {string[]} services - Lista de servicios.
   */
  function renderServices(services) {
    const list = document.querySelector('[data-bind="services"]');
    if (!list) return;

    list.innerHTML = "";
    services.slice(0, 3).forEach((service) => {
      const item = document.createElement("li");
      item.textContent = service;
      list.appendChild(item);
    });
  }

  /**
   * Construye un enlace wa.me a partir de un teléfono y un mensaje opcional.
   * - Normaliza el teléfono eliminando todo lo que no sea dígito.
   * - Agrega query param ?text=... si message existe.
   *
   * @param {string|number} phone - Teléfono (puede venir con espacios, +, guiones).
   * @param {string} message - Mensaje inicial (opcional).
   * @returns {string} URL de WhatsApp o "" si no hay dígitos.
   */
  function buildWhatsAppLink(phone, message) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return "";

    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${digits}${text}`;
  }

  /**
   * Heurística mínima para validar que algo “parece” URL utilizable:
   * - http(s)://...
   * - o ruta relativa absoluta "/..."
   *
   * No valida dominios, esquemas alternos (mailto:, tel:), ni URLs relativas ("./x").
   *
   * @param {string} value
   * @returns {boolean}
   */
  function isLikelyUrl(value) {
    return /^https?:\/\//i.test(value) || value.startsWith("/");
  }

  /**
   * Inicializa la landing:
   * 1) Carga config.json (sin cache).
   * 2) Deriva whatsappLink desde phone + whatsappMessage.
   * 3) Ajusta document.title.
   * 4) Bindea texto/atributos y renderiza servicios.
   * 5) Limpia elementos opcionales (subtitle si falta, href de privacy si es inválido).
   */
  async function init() {
    /** @type {any} */
    let config;

    // Carga de configuración: si falla, se aborta sin ruido.
    try {
      const response = await fetch("config.json", { cache: "no-store" });
      if (!response.ok) return;
      config = await response.json();
    } catch (error) {
      return;
    }

    /**
     * Campo derivado:
     * - whatsappLink se genera con phone + whatsappMessage.
     * Importante: aquí se asume que config.phone y config.whatsappMessage existen.
     */
    config.whatsappLink = buildWhatsAppLink(
      config.phone,
      config.whatsappMessage
    );

    /**
     * Título de la página:
     * - Si existe businessName, se usa.
     * - Si también existe heroTitle, concatena "businessName | heroTitle".
     */
    if (config.businessName) {
      document.title = config.heroTitle
        ? `${config.businessName} | ${config.heroTitle}`
        : config.businessName;
    }

    // Hidratación del DOM.
    bindText(config);
    bindAttributes(config);
    renderServices(config.services || []);

    /**
     * Eliminación condicional del subtítulo:
     * - Si existe el nodo en DOM pero falta config.heroSubtitle,
     *   se elimina para evitar un bloque vacío.
     *
     * Nota: Esto asume que el HTML usa data-bind="heroSubtitle".
     */
    const subtitle = document.querySelector('[data-bind="heroSubtitle"]');
    if (subtitle && !config.heroSubtitle) {
      subtitle.remove();
    }

    /**
     * Sanidad del link de privacidad:
     * - Si privacyUrl no parece URL válida (según isLikelyUrl),
     *   se elimina href para evitar links rotos.
     *
     * Nota: no cubre mailto:/tel: intencionalmente.
     */
    const privacyLink = document.querySelector('[data-bind="privacyUrl"]');
    if (privacyLink && !isLikelyUrl(String(config.privacyUrl || ""))) {
      privacyLink.removeAttribute("href");
    }
  }

  // Ejecuta init cuando el DOM esté listo (sin esperar imágenes/CSS).
  document.addEventListener("DOMContentLoaded", init);
})();
