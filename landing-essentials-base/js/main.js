(function () {
  /**
   * ============================================================
   * PLANTILLA: main.js (IIFE)
   * ------------------------------------------------------------
   * Objetivo:
   * - Mantener la estructura (IIFE + mismas funciones).
   * - Documentar responsabilidades y puntos de extensión.
   * - Usar mensajes genéricos y corregir caracteres.
   *
   * Dependencias (HTML):
   * - Formulario:      <form id="lead-form">
   * - Feedback global: <p id="form-feedback" class="form-feedback" role="status">
   * - Año dinámico:    <span id="year"></span>
   * - Errores por campo: <small data-error-for="name"></small> (y para email/phone)
   *
   * Notas:
   * - Este archivo NO envía datos a un servidor por defecto.
   * - Incluye validación básica y una “simulación” de envío.
   * - Si se integra backend, reemplazar el bloque de simulación.
   * ============================================================
   */

  // Selecciona todos los enlaces internos (#anclas) para scroll suave
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  // Elementos clave del formulario (si existen en el DOM)
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");
  const yearEl = document.getElementById("year");

  function setupSmoothScroll() {
    /**
     * Scroll suave para enlaces internos.
     * - Evita navegación instantánea.
     * - Respeta el comportamiento nativo si el target no existe.
     *
     * Consideraciones:
     * - Si existe un header sticky, puede ser necesario compensar offset.
     *   (Este template usa scrollIntoView sin offset por simplicidad.)
     */
    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        // Ignora href vacíos o "#" (ancla sin destino)
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        // Si el destino no existe, no se interfiere con el comportamiento
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /**
   * Validadores por campo.
   * - Devuelven string vacío si es válido.
   * - Devuelven un mensaje si hay error.
   *
   * TODO: Ajustar reglas según requisitos reales:
   * - Regex más estricta de email si se requiere.
   * - Validación de teléfono por país.
   * - Reglas de longitud mínima/máxima.
   */
  const validators = {
    name: (value) => (value.trim() ? "" : "Ingresa tu nombre."),
    email: (value) =>
      /^\S+@\S+\.\S+$/.test(value.trim()) ? "" : "Ingresa un email válido.",
    phone: (value) => (value.trim() ? "" : "Ingresa tu teléfono."),
  };

  function showFieldError(fieldName, message) {
    /**
     * Pinta/limpia el error asociado a un campo específico.
     *
     * Convención de mapeo:
     * - input/select/textarea con id="{fieldName}"
     * - elemento de error con data-error-for="{fieldName}"
     *
     * Side effects:
     * - Actualiza el texto del error.
     * - Agrega o quita la clase "input-error" en el input para styling.
     */
    const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
    const field = document.getElementById(fieldName);

    if (errorEl) errorEl.textContent = message || "";
    if (field) field.classList.toggle("input-error", Boolean(message));
  }

  function clearErrors() {
    /**
     * Limpia el estado de error en todos los campos definidos en validators.
     * Mantiene el sistema escalable: agregar un validador implica entrar aquí.
     */
    Object.keys(validators).forEach((key) => showFieldError(key, ""));
  }

  function showFeedback(message, type = "success") {
    /**
     * Mensaje global del formulario.
     * type:
     * - "success" o "error" (se reflejan como clases CSS).
     *
     * Accesibilidad:
     * - El contenedor en HTML debe usar role="status" para anunciar cambios.
     */
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }

  function handleSubmit(event) {
    /**
     * Handler principal de envío.
     * Flujo:
     * 1) Bloquea envío nativo.
     * 2) Limpia errores y feedback.
     * 3) Valida campos básicos.
     * 4) Si hay errores, muestra feedback y termina.
     * 5) Si pasa validación, simula envío (o integra backend).
     */
    event.preventDefault();
    if (!form) return;

    clearErrors();
    showFeedback("");

    const formData = new FormData(form);
    let hasError = false;

    // Valida cada campo registrado en validators
    Object.entries(validators).forEach(([field, validate]) => {
      const value = formData.get(field) || "";
      const error = validate(String(value));

      if (error) {
        hasError = true;
        showFieldError(field, error);
      }
    });

    if (hasError) {
      showFeedback("Revisa los campos marcados.", "error");
      return;
    }

    /**
     * ============================================================
     * ENVÍO (template)
     * ------------------------------------------------------------
     * Actualmente: simulación.
     * TODO: Reemplazar por un envío real.
     *
     * Ejemplo recomendado (fetch):
     * - Deshabilitar el botón submit mientras envía.
     * - Enviar a un endpoint (action) y manejar response.
     * - Mostrar error en caso de fallo (red/servidor/validación).
     * - No resetear el form si el servidor rechazó.
     * ============================================================
     */

    // Simulación de envío (placeholder)
    showFeedback("Hemos recibido tu solicitud. Te contactaremos pronto.", "success");
    form.reset();
  }

  function setupFormValidation() {
    /**
     * Inicializa listeners del formulario.
     * Nota: Solo enlaza submit. Si se quiere validación “en vivo”:
     * - Agregar listeners a 'blur' o 'input' por campo (sin cambiar estructura base).
     */
    if (!form) return;
    form.addEventListener("submit", handleSubmit);
  }

  function setCurrentYear() {
    /**
     * Inserta el año actual en el footer.
     * Requiere: <span id="year"></span>
     */
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Inicialización
  setupSmoothScroll();
  setupFormValidation();
  setCurrentYear();
})();
