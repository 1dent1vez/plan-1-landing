# JavaScript

## Responsabilidad por archivo

| Archivo | Rol |
| --- | --- |
| `src/js/main.js` | Orquestacion de init y helpers globales |
| `src/js/config-loader.js` | Carga de config + bindings + tema |
| `src/js/components.js` | Interacciones UI (nav, accordion) |
| `src/js/motion.js` | Animaciones opcionales (no inicializadas) |

## Orden de inicializacion

1. `document.documentElement.classList.add("js")`.
2. `initConfig()`:
   - fetch de `config/config.json`
   - aplica tema y render de contenido
3. `initComponents()`:
   - nav toggle
   - accordion
4. `applyWhatsAppLinks()`:
   - setea `href` en `[data-whatsapp-link]`
5. `setCurrentYear()`:
   - inserta anio actual en `[data-year]`

## Eventos principales

- Nav:
  - click en `[data-nav-toggle]` abre/cierra.
  - click en links del nav cierra.
  - Escape cierra cuando esta abierto.
- Accordion:
  - click en `.accordion-trigger` alterna panel.

## Agregar comportamiento sin romper arquitectura

- Crea un modulo nuevo en `src/js/`.
- Inicializa desde `main.js` despues de `initConfig()`.
- Evita escribir texto directo en el DOM (usa `data-bind`).
- No modifiques `config-loader.js` si el cambio no es de binding.

## Do / Don't

Do:
- Usar `data-*` hooks para seleccionar nodos.
- Mantener los helpers puros y pequeños.

Don't:
- Hardcodear contenido en JS.
- Mezclar logica de render con logica de UI.
