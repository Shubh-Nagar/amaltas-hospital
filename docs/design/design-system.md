# Design System

## Tokens (see `tailwind.config.ts` + `src/index.css`)
- **Brand**: teal-green scale `brand.50–950` (primary actions, headers).
- **Accent**: gold scale (highlights, service icons).
- **Semantic**: `surface`, `canvas`, `ink`, `muted`, `line`, `emergency`,
  `error`, `warning`.
- **Type**: Fraunces (display) + Inter (sans); fluid sizes `display, h1–h4, lead`.
- **Shadows**: `card`, `card-hover`, `header`. **Container** max 1360px.

## Principles
- Patient-first clarity over decoration. Generous spacing, strong hierarchy.
- **Icons**: Lucide only, never emoji. Resolved via `src/lib/icons.tsx`.
- **Motion**: Framer Motion sparingly (reveal on scroll, subtle hover);
  globally disabled under `prefers-reduced-motion`.
- **Imagery**: branded gradient placeholders until real assets are supplied —
  no stock photography.

## Accessibility
Visible focus rings, AA contrast, keyboard-operable menus/dialogs, semantic
landmarks, skip-link, logical heading order.
