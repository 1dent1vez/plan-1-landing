# plan-1-pyme

Plantilla HTML/CSS/JS vanilla reutilizable con arquitectura basada en configuracion (SSOT). Todo el contenido y el branding se controlan desde `config/config.json`, y el HTML solo define estructura y hooks de render.

## Objetivo

- Onboarding rapido para nuevos devs.
- Reutilizacion segura sin romper la fuente de verdad.
- Personalizacion por proyecto solo editando `config/config.json`.

## Arquitectura general (flujo)

`config/config.json` -> `initConfig()` -> `applyTheme()` + `bindText()` + `bindAttributes()` + `renderRepeats()` + `toggleSections()` -> `initComponents()` -> UI final.

- `config/config.json` es la unica fuente de verdad para contenido y tokens de tema.
- `src/js/config-loader.js` aplica tokens y data-binding.
- `src/js/components.js` agrega comportamiento (nav, accordion).
- `src/js/main.js` orquesta la inicializacion.

## Estructura de carpetas

| Ruta | Que contiene | Uso principal |
| --- | --- | --- |
| `index.html` | Estructura semantica + data-* hooks | No hardcodear contenido |
| `config/config.json` | Tema + contenido | Editar para personalizar |
| `assets/` | Imagenes y SVG | Referenciar desde config |
| `src/js/main.js` | Bootstrap de la app | Orden de init |
| `src/js/config-loader.js` | SSOT + bindings | Tema y render |
| `src/js/components.js` | UI interactiva | Nav y accordion |
| `src/js/motion.js` | Animaciones opcionales | Solo si se inicializa |
| `src/styles/tokens.css` | Variables base | Defaults y escalas |
| `src/styles/base.css` | Reset + layout base | Reglas globales |
| `src/styles/components.css` | Componentes UI | botones, nav, cards |
| `src/styles/sections.css` | Secciones | hero, cta, grids |
| `docs/` | Documentacion tecnica | Arquitectura y guias |

## Inicio rapido

Opcion simple:
1. Abre `index.html` en el navegador.

Opcion recomendada (evita bloqueos de `fetch` en local):
1. Levanta un servidor estatico en la raiz del proyecto.
2. Abre `http://localhost/.../index.html`.

Ejemplo:

```bash
python -m http.server 8000
```

## Como personalizar desde `config/config.json`

### Textos y secciones
- Edita `content.*` (por ejemplo `content.hero.headline`).
- Para listas usa arrays (por ejemplo `content.sections.services.items`).
- Para ocultar secciones define `enabled: false` en `content.sections.<clave>`.

### Colores y tokens
- Edita `theme.*`. Los valores se vuelcan a CSS variables en runtime.
- Ejemplo: `theme.palette.brand.primary` -> `--color-primary`.

### Enlaces (WhatsApp, tel, mail, anchors)
- WhatsApp se construye con `content.whatsapp.number` + `content.whatsapp.message`.
- Telefono y mail se editan en `content.contact.phoneHref` y `footer.contactLinks`.
- Anclas del navbar viven en `content.navigation.items`.

### Imagenes y assets
- Usa rutas relativas a `assets/` en `content.hero.media.src`.
- Respeta `width`, `height`, `alt` para performance y accesibilidad.

## Convenciones del proyecto

### HTML y data-* bindings
- `data-bind="ruta"` imprime texto de `content.ruta`.
- `data-bind-attr="attr:ruta"` setea atributos desde `content`.
- `data-repeat="ruta"` clona el nodo con `data-repeat-item`.
- `data-section="clave"` controla visibilidad desde `content.sections.clave.enabled`.

### CSS (tokens/base/components/sections)
- `tokens.css`: solo variables y escalas.
- `base.css`: reglas globales, tipografia, layout base.
- `components.css`: componentes reutilizables (nav, botones, cards).
- `sections.css`: estilos especificos de secciones.

### Agregar una seccion sin romper
1. Crea la seccion en `index.html` con `data-section="nueva"`.
2. Agrega `content.sections.nueva` en `config/config.json` con `enabled` y datos.
3. Si hay listas, usa `data-repeat` + `data-repeat-item`.
4. Si debe aparecer en el navbar, agrega item en `content.navigation.items`.

### Do / Don't

Do:
- Editar solo `config/config.json` para contenido.
- Mantener consistencia entre `data-section` y `content.sections`.
- Usar `data-bind` y `data-bind-attr` para todo texto y atributos dinamicos.

Don't:
- Hardcodear textos o links en `index.html`.
- Cambiar rutas de `data-bind` sin actualizar `config.json`.
- Mover estilos entre archivos sin justificar.

## Accesibilidad y responsive checklist

- Skip link visible al foco.
- Navegacion con `aria-expanded` y soporte de tecla Escape.
- Accordion con `aria-controls`, `aria-labelledby` y `aria-hidden`.
- Contraste suficiente entre texto y fondo.
- Imagenes con `alt` y dimensiones definidas.
- Botones con altura minima de 44px.
- Layout mobile-first con breakpoints en 600/768/1024/1280px.

## Checklist de produccion

- Titulo y descripcion (`content.meta.*`) actualizados.
- Numero de WhatsApp en formato internacional (solo digitos).
- Links de contacto, privacidad y redes verificados.
- Imagen principal optimizada y con `width`/`height`.
- Secciones deshabilitadas eliminadas con `enabled: false`.
- Prueba de carga en movil y desktop.
- Minificacion opcional si tu pipeline lo permite.

## FAQ para desarrolladores

**No carga el contenido**
- Abre el sitio con un servidor local (por `fetch` a `config/config.json`).

**No aparece una seccion**
- Revisa `content.sections.<clave>.enabled`.
- Verifica que el `data-section` coincida con la clave.

**No se renderiza una lista**
- `data-repeat` debe apuntar a un array.
- Debe existir un elemento con `data-repeat-item`.

**El boton de WhatsApp no funciona**
- `content.whatsapp.number` debe tener solo digitos.
- Si `number` esta vacio, el link no se aplica.

**No se actualizan colores**
- Verifica `theme.*` y que el valor no sea vacio.
- Recarga sin cache (el loader usa `cache: no-store`).
