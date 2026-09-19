# QA Checklist

## Build & types
- [x] `npm run build` passes (tsc + vite).
- [x] `npm run typecheck` clean.
- [x] `npm run lint` — 0 errors (icon-registry / fast-refresh warnings are benign).

## Responsive
- [ ] 320 / 375 / 768 / 1024 / 1440 / 1920 px sweep on key templates.
- [ ] Mobile action bar (emergency/appointment) does not overlap footer content.

## Accessibility
- [ ] Keyboard-only pass: skip-link, header nav, mega-menu, mobile drawer,
      search dialog, appointment steps.
- [ ] Focus visible on all interactive elements.
- [ ] Screen-reader landmarks and headings read in order.
- [ ] `prefers-reduced-motion` disables scroll/hover motion.

## Content integrity
- [ ] No `sample: true` or `verified: false` record ships unreviewed.
- [ ] No testimonials without consent.
- [ ] All placeholder images replaced with authentic assets.

## SEO
- [ ] Unique title/description/canonical per route.
- [ ] JSON-LD validates (Rich Results Test).
- [ ] `sitemap.xml` generated and referenced in `robots.txt`.

## Emergency access
- [ ] Emergency phone reachable from header, mobile bar, and `/patients/emergency`.
