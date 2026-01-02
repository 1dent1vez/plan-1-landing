# Configuracion (config/config.json)

## Esquema (resumen de claves)

### Tema (theme)

| Ruta | Tipo | Ejemplo | Notas |
| --- | --- | --- | --- |
| theme.fonts.base | string | "Inter, sans-serif" | Fuente base |
| theme.palette.brand.primary | string | "#ffffff" | Color principal |
| theme.palette.brand.secondary | string | "#000000" | Color acento |
| theme.palette.neutral.bg | string | "#000000" | Fondo general |
| theme.palette.neutral.surface1 | string | "#1a1a1a" | Superficie 1 |
| theme.palette.neutral.surface2 | string | "#262626" | Superficie 2 |
| theme.palette.neutral.text | string | "#ffffff" | Texto principal |
| theme.palette.neutral.muted | string | "#e5e5e5" | Texto secundario |
| theme.palette.neutral.ink | string | "#000000" | Texto invertido |
| theme.borders.default | string | "rgba(255,255,255,0.3)" | Borde base |
| theme.borders.strong | string | "rgba(255,255,255,0.6)" | Borde fuerte |
| theme.components.navBg | string | "rgba(0,0,0,0.95)" | Fondo nav |
| theme.components.footerBg | string | "#0a0a0a" | Fondo footer |
| theme.components.buttonPrimaryText | string | "#000000" | Texto boton primary |
| theme.components.buttonSecondaryText | string | "#ffffff" | Texto boton secondary |
| theme.effects.overlay | string | "rgba(0,0,0,0.7)" | Overlay |
| theme.shadows.shadow1 | string | "0 4px 20px rgba(255,255,255,0.05)" | Sombra 1 |
| theme.shadows.shadow2 | string | "0 10px 40px rgba(0,0,0,1)" | Sombra 2 |
| theme.shadows.shadow3 | string | "0 20px 80px rgba(0,0,0,1)" | Sombra 3 |
| theme.gradients.hero | string | "radial-gradient(...)" | Fondo hero |
| theme.gradients.panel | string | "linear-gradient(...)" | Fondo panel |
| theme.states.focusRing | string | "#ffffff" | Focus ring |
| theme.states.hoverLift | string | "rgba(255,255,255,0.1)" | Hover lift |

### Contenido (content)

| Ruta | Tipo | Ejemplo | Notas |
| --- | --- | --- | --- |
| content.meta.title | string | "Titulo de la pagina | Tu marca" | <title> |
| content.meta.description | string | "Descripcion corta para SEO" | meta description |
| content.brand.name | string | "NOMBRE PROYECTO" | Nombre marca |
| content.brand.tagline | string | "Tu eslogan" | Eyebrow |
| content.brand.logoText | string | "LOGO" | Texto logo |
| content.navigation.items[] | array | [{"label":"Inicio","href":"#hero"}] | Navbar |
| content.whatsapp.number | string | "15551234567" | Solo digitos |
| content.whatsapp.message | string | "Hola, quiero mas informacion." | Mensaje prellenado |
| content.whatsapp.buttonLabel | string | "WhatsApp" | CTA nav |
| content.hero.headline | string | "Servicio principal en Ciudad" | H1 |
| content.hero.subheadline | string | "Descripcion breve..." | Lead |
| content.hero.primaryCtaLabel | string | "Escribir por WhatsApp" | Texto boton |
| content.hero.primaryCtaHref | string | "#cta" | No se usa actualmente |
| content.hero.bullets[] | array | [{"text":"Respuesta rapida"}] | Lista hero |
| content.hero.media.src | string | "assets/logo-sin-fondo2.png" | Imagen hero |
| content.hero.media.alt | string | "Equipo colaborando..." | Accesibilidad |
| content.hero.media.width | number | 1200 | Ancho img |
| content.hero.media.height | number | 800 | Alto img |
| content.hero.media.loading | string | "eager" | Lazy/eager |
| content.hero.media.decoding | string | "async" | Decoding |
| content.hero.media.fetchpriority | string | "high" | Prioridad |
| content.contact.hours | string | "Lun-Vie 9:00 - 18:00" | Horario |
| content.contact.address | string | "Ciudad, Pais" | Direccion |
| content.contact.phone | string | "+1 555 123 4567" | Texto telefono |
| content.contact.phoneHref | string | "tel:+15551234567" | Link telefono |
| content.sections.services.enabled | boolean | true | Visibilidad |
| content.sections.services.title | string | "Servicios" | Titulo seccion |
| content.sections.services.items[] | array | [{"title":"Servicio 1","text":"..."}] | Cards |
| content.sections.services.whatsappCtaLabel | string | "Si no ves lo que buscas..." | CTA |
| content.sections.benefits.enabled | boolean | true | Visibilidad |
| content.sections.benefits.title | string | "Por que elegirnos" | Titulo |
| content.sections.benefits.items[] | array | [{"title":"Atencion rapida","text":"..."}] | Cards |
| content.sections.proof.enabled | boolean | true | Visibilidad |
| content.sections.proof.title | string | "Resultados en cifras" | Titulo |
| content.sections.proof.metrics[] | array | [{"value":"100%","label":"Etiqueta"}] | Metricas |
| content.sections.process.enabled | boolean | true | Visibilidad |
| content.sections.process.title | string | "Como funciona" | Titulo |
| content.sections.process.steps[] | array | [{"step":"01","title":"Fase uno","text":"..."}] | Pasos |
| content.sections.testimonials.enabled | boolean | true | Visibilidad |
| content.sections.testimonials.title | string | "Lo que dicen..." | Titulo |
| content.sections.testimonials.items[] | array | [{"quote":"...","name":"...","role":"..."}] | Testimonios |
| content.sections.location.enabled | boolean | true | Visibilidad |
| content.sections.location.title | string | "Ubicacion y horario" | Titulo |
| content.sections.location.actionLabel | string | "Escribenos por WhatsApp..." | CTA |
| content.sections.contact.enabled | boolean | true | Visibilidad |
| content.sections.contact.title | string | "Contactanos" | Titulo |
| content.sections.contact.subtitle | string | "Escribenos ahora..." | Subtitulo |
| content.sections.contact.buttonLabel | string | "Hablar por WhatsApp" | CTA |
| content.sections.faq.enabled | boolean | true | Visibilidad |
| content.sections.faq.title | string | "Preguntas frecuentes" | Titulo |
| content.sections.faq.items[] | array | [{"question":"...","answer":"..."}] | FAQ |
| content.sections.cta.enabled | boolean | true | Visibilidad |
| content.sections.cta.title | string | "Listo para empezar?" | Titulo |
| content.sections.cta.subtitle | string | "Un ultimo empujon..." | Subtitulo |
| content.sections.cta.buttonLabel | string | "Contactar ahora" | CTA |
| content.sections.cta.buttonHref | string | "mailto:hola@tudominio.com" | Link CTA |
| content.footer.contactLabel | string | "Contacto" | Footer |
| content.footer.socialLabel | string | "Social" | Footer |
| content.footer.privacyLink.label | string | "Aviso de privacidad" | Footer |
| content.footer.privacyLink.href | string | "/privacidad.html" | Footer |
| content.footer.contactLinks[] | array | [{"label":"hola@tudominio.com","href":"mailto:..."}] | Footer |
| content.footer.socialLinks[] | array | [{"label":"Instagram","href":"https://..."}] | Footer |

## Reglas para agregar nuevas claves

- Agrega la clave en `content` y usa la misma ruta en `data-bind` o `data-bind-attr`.
- Si es una lista, el valor debe ser un array y existir un nodo `data-repeat-item`.
- Para nuevas secciones, crea `content.sections.<clave>` con `enabled`.

## Construccion del link de WhatsApp

- Numero: `content.whatsapp.number` se normaliza a solo digitos.
- Mensaje: `content.whatsapp.message` se codifica en URL.
- Resultado:

```
https://wa.me/<numero>?text=<mensaje_codificado>
```

Si `number` esta vacio, no se aplica el link.

## Ejemplo completo (actual)

```json
{
  "theme": {
    "fonts": {
      "base": "Inter, sans-serif"
    },
    "palette": {
      "brand": {
        "primary": "#ffffff",
        "secondary": "#000000"
      },
      "neutral": {
        "bg": "#000000",
        "surface1": "#1a1a1a",
        "surface2": "#262626",
        "text": "#ffffff",
        "muted": "#e5e5e5",
        "ink": "#000000"
      }
    },
    "borders": {
      "default": "rgba(255, 255, 255, 0.3)",
      "strong": "rgba(255, 255, 255, 0.6)"
    },
    "components": {
      "navBg": "rgba(0, 0, 0, 0.95)",
      "footerBg": "#0a0a0a",
      "buttonPrimaryText": "#000000",
      "buttonSecondaryText": "#ffffff"
    },
    "effects": {
      "overlay": "rgba(0, 0, 0, 0.7)"
    },
    "shadows": {
      "shadow1": "0 4px 20px rgba(255, 255, 255, 0.05)",
      "shadow2": "0 10px 40px rgba(0, 0, 0, 1)",
      "shadow3": "0 20px 80px rgba(0, 0, 0, 1)"
    },
    "gradients": {
      "hero": "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15), transparent 60%)",
      "panel": "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)"
    },
    "states": {
      "focusRing": "#ffffff",
      "hoverLift": "rgba(255, 255, 255, 0.1)"
    }
  },
  "content": {
    "meta": {
      "title": "Titulo de la pagina | Tu marca",
      "description": "Descripcion corta para SEO que aparecera en Google."
    },
    "brand": {
      "name": "NOMBRE PROYECTO",
      "tagline": "Tu eslogan o frase corta aqui.",
      "logoText": "LOGO"
    },
    "navigation": {
      "items": [
        { "label": "Inicio", "href": "#hero" },
        { "label": "Servicios", "href": "#servicios" },
        { "label": "Contacto", "href": "#contacto" }
      ]
    },
    "whatsapp": {
      "number": "15551234567",
      "message": "Hola, quiero mas informacion.",
      "buttonLabel": "WhatsApp"
    },
    "hero": {
      "headline": "Servicio principal en Ciudad",
      "subheadline": "Descripcion breve sobre lo que haces, para quien lo haces y que problema resuelves.",
      "primaryCtaLabel": "Escribir por WhatsApp",
      "primaryCtaHref": "#cta",
      "bullets": [
        { "text": "Respuesta rapida por WhatsApp" },
        { "text": "Atencion personalizada para tu necesidad" },
        { "text": "Soluciones claras y directas" }
      ],
      "media": {
        "type": "image",
        "src": "assets/logo-sin-fondo2.png",
        "alt": "Equipo colaborando en un espacio de trabajo",
        "width": 1200,
        "height": 800,
        "loading": "eager",
        "decoding": "async",
        "fetchpriority": "high"
      }
    },
    "contact": {
      "hours": "Lun-Vie 9:00 - 18:00",
      "address": "Ciudad, Pais",
      "phone": "+1 555 123 4567",
      "phoneHref": "tel:+15551234567"
    },
    "sections": {
      "services": {
        "enabled": true,
        "title": "Servicios",
        "items": [
          {
            "title": "Servicio principal 1",
            "text": "Descripcion corta del servicio con el beneficio principal para el cliente."
          },
          {
            "title": "Servicio principal 2",
            "text": "Descripcion corta del servicio con el beneficio principal para el cliente."
          },
          {
            "title": "Servicio principal 3",
            "text": "Descripcion corta del servicio con el beneficio principal para el cliente."
          }
        ],
        "whatsappCtaLabel": "Si no ves lo que buscas, escribeme por WhatsApp"
      },
      "proof": {
        "enabled": true,
        "title": "Resultados en cifras",
        "metrics": [
          { "value": "100%", "label": "Etiqueta de metrica 1" },
          { "value": "+500", "label": "Etiqueta de metrica 2" },
          { "value": "24h", "label": "Etiqueta de metrica 3" }
        ]
      },
      "process": {
        "enabled": true,
        "title": "Como funciona",
        "steps": [
          {
            "step": "01",
            "title": "Fase uno",
            "text": "Explica brevemente que sucede en la primera fase del proceso."
          },
          {
            "step": "02",
            "title": "Fase dos",
            "text": "Explica brevemente que sucede durante la ejecucion."
          },
          {
            "step": "03",
            "title": "Fase tres",
            "text": "Explica brevemente el resultado final o la entrega al cliente."
          }
        ]
      },
      "testimonials": {
        "enabled": true,
        "title": "Lo que dicen los clientes",
        "items": [
          {
            "quote": "Espacio para una cita textual corta de un cliente satisfecho.",
            "name": "Nombre del cliente",
            "role": "Cargo / Empresa"
          }
        ]
      },
      "benefits": {
        "enabled": true,
        "title": "Por que elegirnos",
        "items": [
          {
            "title": "Atencion rapida",
            "text": "Resolvemos tu solicitud en tiempos cortos."
          },
          {
            "title": "Experiencia comprobada",
            "text": "Procesos claros para entregas sin sorpresas."
          },
          {
            "title": "Soporte cercano",
            "text": "Acompanamiento directo por WhatsApp."
          }
        ]
      },
      "location": {
        "enabled": true,
        "title": "Ubicacion y horario",
        "actionLabel": "Escribenos por WhatsApp para confirmar disponibilidad."
      },
      "contact": {
        "enabled": true,
        "title": "Contactanos",
        "subtitle": "Escribenos ahora y recibe respuesta rapida.",
        "buttonLabel": "Hablar por WhatsApp"
      },
      "faq": {
        "enabled": true,
        "title": "Preguntas frecuentes",
        "items": [
          {
            "question": "Pregunta frecuente numero 1?",
            "answer": "Respuesta clara y directa para resolver la duda del usuario."
          },
          {
            "question": "Pregunta frecuente numero 2?",
            "answer": "Respuesta clara y directa para resolver la duda del usuario."
          },
          {
            "question": "Pregunta frecuente numero 3?",
            "answer": "Respuesta clara y directa para resolver la duda del usuario."
          }
        ]
      },
      "cta": {
        "enabled": true,
        "title": "Listo para empezar?",
        "subtitle": "Un ultimo empujon persuasivo para que el usuario te contacte ahora mismo.",
        "buttonLabel": "Contactar ahora",
        "buttonHref": "mailto:hola@tudominio.com"
      }
    },
    "footer": {
      "contactLabel": "Contacto",
      "socialLabel": "Social",
      "privacyLink": {
        "label": "Aviso de privacidad",
        "href": "/privacidad.html"
      },
      "contactLinks": [
        { "label": "hola@tudominio.com", "href": "mailto:hola@tudominio.com" },
        { "label": "+1 555 123 4567", "href": "tel:+15551234567" },
        { "label": "WhatsApp", "href": "https://wa.me/15551234567" }
      ],
      "socialLinks": [
        { "label": "Instagram", "href": "https://instagram.com/tu_usuario" },
        { "label": "LinkedIn", "href": "https://linkedin.com/company/tu_empresa" }
      ]
    }
  }
}
```
