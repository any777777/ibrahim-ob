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
- Annotated production baseline (desktop): `design-refs/feedback-baseline-desktop-default.png`
- Annotated production baseline (mobile): `design-refs/feedback-baseline-mobile-final.png`
- Updated desktop implementation: `design-refs/feedback-fixed-desktop-final.png`
- Updated mobile implementation: `design-refs/feedback-fixed-mobile-final.png`
- Feedback comparison (desktop): `design-refs/feedback-comparison-desktop.png`
- Feedback comparison (mobile): `design-refs/feedback-comparison-mobile.png`

## Test state

- Desktop viewport: 1200 × 960, Arabic, top of page.
- Source normalized to 1200 × 768 and compared beside the matching implementation crop.
- Mobile viewport: 390 × 844, Arabic, top of page.
- Feedback desktop viewport: 1280 × 720, Arabic, project stack and services/calculator states.
- Feedback mobile viewport: 390 × 844, Arabic, project strip and calculator states.

## Iteration history

1. Pass 1 — P1: physical direction, hero proportions, and material background did not match the source. Rebuilt the page composition and introduced the supplied graphite asset.
2. Pass 3 — P2: portfolio sheets were too shallow and the source captures did not fit the intended frame. Recaptured real projects at a taller ratio and rebalanced the stack.
3. Pass 7 — P2: hero fold and calculator density differed from the source. Tightened the hero and rebuilt the estimator as a compact functional panel.
4. Pass 8 — P2: the graphite texture was visibly brighter than the supplied reference. Increased the neutral veil while preserving the tactile relief.
5. Final pass — typography, palette, texture, hierarchy, project stack, fold, and responsive behavior align with the reference language. Project imagery intentionally remains the real portfolio work.
6. Feedback pass 1 — P1: services and calculator competed inside one horizontal frame. Moved the estimator into a larger, independent section below the full-width services list.
7. Feedback pass 2 — P1: the extras field collapsed on mobile because of the fieldset legend flow. Restored normal legend flow and full-width stacked options.
8. Feedback pass 3 — P2: project controls and metadata sat too close to the preview stack. Increased the preview frame and added deliberate breathing room below it.
9. Feedback pass 4 — P2: Arabic currency abbreviations reordered unpredictably beside Latin numerals. Added an isolated money component with explicit visual order and the full Arabic currency name.
10. Feedback pass 5 — P2: the active project required a separate footer action. The active desktop preview is now a direct link; inactive sheets select on first press, while mobile previews open directly on tap.

## Functional checks

- Desktop project navigation moves the selected item to the front; pressing the active preview opens the live site directly.
- Mobile project cards open their live sites directly on tap.
- Arabic/English switch updates content and document direction.
- Estimator scenario tested: business site + bilingual + full management = 179 JOD one-time and 120 JOD yearly.
- Calculator extras remain visible and selectable at 390 px, with stable Arabic numeral/currency ordering.
- WhatsApp links use the Jordanian number `+962 79 861 3275` and preserve the selected estimate details.
- Mobile has no horizontal overflow (`scrollWidth <= innerWidth`).
- Keyboard-visible focus, reduced-motion fallbacks, semantic landmarks, and labelled form controls are present.
- Browser console: no runtime errors. LCP image warning fixed by eagerly loading the selected sheet.

## Remaining differences

- P3: the reference’s architectural hero image is replaced by Ibrahim’s actual project screenshots, as required by the portfolio content.
- P3: the calculator remains denser than the concept image because the implementation exposes every requested MVP option, but it now has its own section and larger controls.

Final result: passed
