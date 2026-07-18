# Ibrahim Obaidat Portfolio — Design System

## Direction

The interface follows a “pressed graphite” art direction: quiet, tactile, confident, and work-first. It uses the supplied compressed-paper texture as a real background asset, mineral-white typography, and one restrained patina-teal accent. Decorative gradients and generic SaaS styling are intentionally excluded.

## Typography

- Arabic: Tajawal (`300`, `400`, `500`, `700`)
- English editorial display: Crimson Text (`400`, `600`)
- Arabic is the primary design language; English mirrors the hierarchy without imitating Arabic letterforms.

## Color tokens

- Graphite 950: `#111313`
- Graphite 900: `#171919`
- Graphite 800: `#202222`
- Graphite 650: `#474949`
- Mineral white: `#e7e6e1`
- Pencil trace: `#a9aaa6`
- Patina teal: `#4c9f97`
- Bright patina: `#59b7ae`

Patina teal is reserved for selected states, key navigation cues, price emphasis, and WhatsApp conversion actions. No additional decorative colors are introduced.

## Material and depth

- Base material: `/public/compressed-graphite.png`
- A dark translucent veil preserves text contrast without hiding the paper texture.
- Borders are hairline graphite/mineral-white mixtures.
- Corners remain nearly square; depth comes from stacked project sheets and hard, restrained shadows.

## Layout and interaction

- Desktop: physical left/right composition matching the supplied reference—project stack on the left, value proposition on the right, services and estimator immediately below.
- Mobile: copy leads, CTAs remain full-width and thumb-friendly, and the portfolio becomes a horizontally browsable strip.
- Selecting a project brings its real screenshot to the front with weighted, purposeful movement.
- The Arabic/English switch changes both language and document direction.
- The estimator exposes project type, pages, languages, motion, hosting/domain, and full management, then prepares an honest WhatsApp brief.

## Motion

Motion is limited to meaningful state changes: project selection, selected controls, and compact hover/focus feedback. All motion is removed or shortened under `prefers-reduced-motion`.

## Guardrails

- No gradients, terminal/code motifs, glassmorphism, decorative blobs, emoji icons, or multicolor palettes.
- Use real project screenshots and Phosphor icons.
- Keep Arabic legible and dominant at every breakpoint.
- The site must remain usable by non-technical Jordanian business owners and keep WhatsApp as the primary conversion path.
