# landing-ssot

Plantilla HTML/CSS/JS vanilla con personalizacion total via `/config/config.json`.

## Como personalizar

1. Abre `config/config.json`.
2. Edita `theme` para colores, gradientes, sombras y fuente.
3. Edita `content` para textos, links, imagenes y visibilidad.
4. Recarga el navegador.

## Esquema minimo

```json
{
  "theme": {
    "fonts": { "base": "Inter, sans-serif" },
    "palette": {
      "brand": { "primary": "#6366f1", "secondary": "#ff5d3b" },
      "neutral": {
        "bg": "#111827",
        "surface1": "#12151d",
        "surface2": "#161a26",
        "text": "#f9fafb",
        "muted": "#b3bccb",
        "ink": "#0b0d12"
      }
    }
  },
  "content": {
    "brand": {},
    "hero": {},
    "sections": {}
  }
}
```

## Tokens de tema

| JSON | CSS variable |
| --- | --- |
| theme.palette.brand.primary | --color-primary |
| theme.palette.brand.secondary | --color-accent |
| theme.palette.neutral.bg | --color-bg |
| theme.palette.neutral.text | --color-text |
| theme.palette.neutral.surface1 | --surface |
| theme.palette.neutral.surface2 | --surface-2 |
| theme.palette.neutral.muted | --muted |
| theme.palette.neutral.ink | --ink |
| theme.borders.default | --color-border |
| theme.borders.strong | --color-border-strong |
| theme.components.navBg | --nav-bg |
| theme.components.footerBg | --footer-bg |
| theme.components.buttonPrimaryText | --button-primary-text |
| theme.components.buttonSecondaryText | --button-secondary-text |
| theme.gradients.hero | --hero-grad |
| theme.gradients.panel | --panel-grad |
| theme.gradients.signatureOrb | --signature-orb-grad |
| theme.gradients.signatureGrid | --signature-grid |
| theme.effects.signatureLine | --signature-line |
| theme.shadows.shadow1 | --shadow-1 |
| theme.shadows.shadow2 | --shadow-2 |
| theme.shadows.shadow3 | --shadow-3 |
| theme.states.focusRing | --focus-ring |
| theme.states.hoverLift | --hover-lift |
| theme.fonts.base | --font-base |

## Ejemplo: tema claro

```json
{
  "theme": {
    "palette": {
      "brand": { "primary": "#2563eb", "secondary": "#f97316" },
      "neutral": {
        "bg": "#f8fafc",
        "surface1": "#ffffff",
        "surface2": "#f1f5f9",
        "text": "#0f172a",
        "muted": "#475569",
        "ink": "#0f172a"
      }
    },
    "borders": {
      "default": "rgba(15, 23, 42, 0.12)",
      "strong": "rgba(15, 23, 42, 0.24)"
    },
    "components": {
      "navBg": "rgba(248, 250, 252, 0.9)",
      "footerBg": "#0f172a",
      "buttonPrimaryText": "#ffffff",
      "buttonSecondaryText": "#0f172a"
    },
    "gradients": {
      "hero": "radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.25), transparent 55%)",
      "panel": "linear-gradient(140deg, rgba(15, 23, 42, 0.06), rgba(15, 23, 42, 0))",
      "signatureOrb": "radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.5), rgba(37, 99, 235, 0.2), transparent 70%)",
      "signatureGrid": "linear-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.08) 1px, transparent 1px)"
    }
  }
}
```

## Reglas SSOT

- No edites HTML/CSS/JS para contenido.
- Todo texto, link e imagen vive en `config/config.json`.
- Las secciones se controlan con `enabled: true|false`.

## Estructura

- `index.html`
- `config/config.json`
- `src/styles/*.css`
- `src/js/*.js`
