# Arquitectura

## Flujo de datos (diagrama textual)

```
config/config.json
  -> initConfig() [src/js/config-loader.js]
    -> fetch + parse JSON
    -> applyTheme() -> CSS variables en :root
    -> updateTitle() -> <title>
    -> bindText() -> data-bind
    -> bindAttributes() -> data-bind-attr
    -> renderRepeats() -> data-repeat/data-repeat-item
    -> toggleSections() -> data-section + sections.enabled
  -> initComponents() [src/js/components.js]
    -> nav toggle + accordion
  -> applyWhatsAppLinks() [src/js/main.js]
  -> setCurrentYear() [src/js/main.js]
```

## Reglas clave

- `config/config.json` es la unica fuente de verdad para contenido y tokens de tema.
- El HTML es declarativo: solo estructura + data-* hooks.
- Los estilos consumen CSS variables, no valores hardcodeados.

## Render de secciones y componentes

- `data-section="clave"` se evalua contra `content.sections.clave`.
  - Si `enabled: false` la seccion se elimina del DOM.
  - Si la clave no existe, la seccion queda visible.
- `data-repeat="ruta"` busca un array y clona el nodo `data-repeat-item`.
- `data-bind` y `data-bind-attr` resuelven rutas dentro de `content` o del item repetido.

## Do / Don't

Do:
- Agregar claves nuevas en `content` y usarlas via `data-bind`.
- Mantener `data-section` sincronizado con `content.sections`.

Don't:
- Editar contenido directo en el HTML.
- Cambiar el flujo de `initConfig()` sin revisar el impacto en bindings.
