# Design QA — Ibrahim Obaidat Portfolio

## Evidence

- Brand source: `design-refs/brand-board.png`
- Layout source: `design-refs/desktop-target.png`
- Material source: `public/compressed-graphite.png`
- Desktop implementation: `design-refs/implementation-final-desktop.png`
- Mobile implementation: `design-refs/mobile-final.png`
- Combined source/implementation comparison: `design-refs/comparison-final.png`
- Focused hero comparison: `design-refs/comparison-hero-focus.png`
- Focused services/pricing comparison: `design-refs/comparison-pricing-focus.png`

## Test state

- Desktop viewport: 1200 × 960, Arabic, top of page.
- Source normalized to 1200 × 768 and compared beside the matching implementation crop.
- Mobile viewport: 390 × 844, Arabic, top of page.

## Iteration history

1. Pass 1 — P1: physical direction, hero proportions, and material background did not match the source. Rebuilt the page composition and introduced the supplied graphite asset.
2. Pass 3 — P2: portfolio sheets were too shallow and the source captures did not fit the intended frame. Recaptured real projects at a taller ratio and rebalanced the stack.
3. Pass 7 — P2: hero fold and calculator density differed from the source. Tightened the hero and rebuilt the estimator as a compact functional panel.
4. Pass 8 — P2: the graphite texture was visibly brighter than the supplied reference. Increased the neutral veil while preserving the tactile relief.
5. Final pass — typography, palette, texture, hierarchy, project stack, fold, and responsive behavior align with the reference language. Project imagery intentionally remains the real portfolio work.

## Functional checks

- Project selection moves the selected item to the front and updates `aria-pressed`.
- Arabic/English switch updates content and document direction.
- Estimator scenario tested: business site + bilingual + full management = 179 JOD one-time and 120 JOD yearly.
- WhatsApp links use the Jordanian number `+962 79 861 3275` and preserve the selected estimate details.
- Mobile has no horizontal overflow (`scrollWidth <= innerWidth`).
- Keyboard-visible focus, reduced-motion fallbacks, semantic landmarks, and labelled form controls are present.
- Browser console: no runtime errors. LCP image warning fixed by eagerly loading the selected sheet.

## Remaining differences

- P3: the reference’s architectural hero image is replaced by Ibrahim’s actual project screenshots, as required by the portfolio content.
- P3: some calculator copy is denser than the concept image because the implementation exposes every requested MVP option.

Final result: passed
