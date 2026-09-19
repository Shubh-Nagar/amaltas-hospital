# Technical Architecture

## Stack
React 18, React Router 6 (`createBrowserRouter`), Vite 5, TypeScript 5.6
(strict), Tailwind 3.4, Framer Motion 11, Lucide icons. No backend; this is a
static SPA that can be served from any CDN/static host.

## Principles
1. **Data-driven, single-template.** Content lives in `src/data/*`. Each content
   type has exactly one template component. Never create per-item page files.
2. **Thin pages.** Files in `src/pages/` compose data + templates + `<Seo>`; they
   hold minimal logic.
3. **Design tokens.** Colours, typography, spacing, shadows are defined once in
   `tailwind.config.ts` and `src/index.css` (CSS variables as RGB channels).
4. **Code-splitting.** Every route is `React.lazy`-loaded in `src/routes/index.tsx`
   behind a `<Suspense>` boundary with a `PageLoader` fallback.
5. **State.** Local UI state only (React hooks). No global store needed.

## Routing
Clean, hierarchical URLs. Detail routes are dynamic (`:slug`) and resolve against
data; an unknown slug renders a graceful not-found state. `*` → `NotFoundPage`
(noindex). `articles/news/events` share one detail template via a `kind` prop.

## Search
`useSearchIndex` builds a flat client-side index from the data layer
(specialties, doctors, services, facilities, articles). `SearchDialog` (global,
keyboard-accessible) and `SearchPage` (`/search?q=`) consume it. No server calls.

## Appointments
`AppointmentPage` is a 4-step request flow (specialty → doctor → preferred time →
details). It **never** shows fake real-time availability. Submission is
validated client-side and currently shows a success screen without transmitting
data. To enable transmission, set `VITE_APPOINTMENT_ENDPOINT` and POST the
payload from the marked `TODO(integration)` — send over HTTPS to a consented,
secured endpoint; do not log PII client-side.

## Build & deploy
`npm run build` → `dist/`. Serve as a static site with SPA fallback (rewrite all
paths to `/index.html`) so client routing works on deep links.
