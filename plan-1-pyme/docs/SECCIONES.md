# Secciones

## Navbar y anclas

El menu se construye desde `content.navigation.items` y debe apuntar a IDs reales:

- `#hero`
- `#servicios`
- `#beneficios`
- `#resultados`
- `#proceso`
- `#testimonios`
- `#ubicacion`
- `#faq`
- `#contacto`
- `#cta`

## Mapa de secciones y datos

| ID en HTML | data-section | Datos usados desde config | Notas |
| --- | --- | --- | --- |
| `hero` | `hero` | `brand.tagline`, `hero.*`, `contact.*`, `whatsapp.*` | CTA usa `data-whatsapp-link` |
| `servicios` | `services` | `sections.services.*` | Lista de cards |
| `beneficios` | `benefits` | `sections.benefits.*` | Lista de cards |
| `resultados` | `proof` | `sections.proof.*` | Metricas |
| `proceso` | `process` | `sections.process.*` | Pasos |
| `testimonios` | `testimonials` | `sections.testimonials.*` | Testimonios |
| `ubicacion` | `location` | `sections.location.*`, `contact.*` | CTA WhatsApp |
| `faq` | `faq` | `sections.faq.*` | Accordion |
| `contacto` | `contact` | `sections.contact.*`, `contact.*` | Boton WhatsApp |
| `cta` | `cta` | `sections.cta.*` | Link directo |
| `footer` | `footer` | `brand.*`, `footer.*` | No depende de `sections` |

## Regla de visibilidad

- La visibilidad se controla con `content.sections.<clave>.enabled`.
- Si la clave no existe, la seccion queda visible.

## Do / Don't

Do:
- Mantener IDs estables para anclas.
- Usar `data-bind` para todos los textos.

Don't:
- Reutilizar un `data-section` ya existente para otra seccion.
- Eliminar un ID usado en el navbar sin actualizar `navigation.items`.
