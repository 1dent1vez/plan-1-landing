# Estilos

## Tokens y variables

- Los tokens viven en `src/styles/tokens.css`.
- `src/js/config-loader.js` sobrescribe variables via `document.documentElement.style.setProperty()`.
- Solo se aplican valores no vacios desde `config/config.json`.

Tokens principales (resumen):

- Colores: `--color-primary`, `--color-accent`, `--color-bg`, `--color-text`.
- Superficies: `--surface`, `--surface-2`.
- Bordes: `--color-border`, `--color-border-strong`.
- Tipografia: `--font-base`, escalas `--fs-*`.
- Espaciado y radios: `--s1..--s6`, `--r-1..--r-3`.
- Efectos: `--shadow-1..3`, `--hero-grad`, `--panel-grad`.

## Donde definir cada regla

- `tokens.css`: solo variables, sin selectores de componentes.
- `base.css`: reset, tipografia base, layout generico.
- `components.css`: componentes reutilizables (nav, botones, cards, footer, accordion).
- `sections.css`: estilos de secciones y grids especificos.

## Breakpoints y mobile-first

- Base: estilos para mobile.
- `@media (max-width: 600px)`: padding de contenedor.
- `@media (min-width: 768px)`: ajustes de grids y footer.
- `@media (min-width: 1024px)`: nav desktop y layout hero.
- `@media (min-width: 1280px)`: gaps y max-widths.

## Reglas de consistencia

- Usa las escalas `--s*` para spacing, evita valores magicos.
- Respeta `--container` y `--container-pad` para layout.
- Usa `--fs-*` y `--lh-*` para tipografia.
- Mantiene `min-height: 44px` en CTAs.

## Do / Don't

Do:
- Ajustar colores desde `theme.*`.
- Reutilizar `.card`, `.btn`, `.container`.

Don't:
- Definir colores hardcodeados en componentes.
- Mezclar estilos de seccion dentro de `components.css`.
