# Amaltas Super Speciality Hospital — Website

Production front-end for **Amaltas Super Speciality Hospital** (Amaltas Institute of
Medical Sciences, AIMS), Dewas, Madhya Pradesh. Patient-first, accessible, and
fully data-driven.

Built with **React + Vite + TypeScript + Tailwind CSS + React Router**.

---

## Quick start

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
```

The site runs with **no environment variables**. Copy `.env.example` to
`.env.local` only when wiring future integrations (appointment endpoint, analytics).

### Scripts

| Script              | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Vite dev server with HMR                                |
| `npm run build`     | Type-check (`tsc -b`) then production build to `dist/`  |
| `npm run preview`   | Serve the production build locally                     |
| `npm run typecheck` | `tsc -b --noEmit` — types only, no output              |
| `npm run lint`      | Oxlint across the project                               |

---

## Architecture at a glance

The site is **data-driven**: content lives in `src/data/*`, and each content
type is rendered by **one reusable template**, never one page per item.

```
src/
├─ data/          Single source of truth (specialties, doctors, services, …)
├─ types/         Shared TypeScript models
├─ lib/           utils, icon registry, SEO helpers (custom <Seo>, JSON-LD)
├─ hooks/         useSearchIndex (client-side global search)
├─ components/
│  ├─ ui/         Primitives: Button, Card, Section, Accordion, EmptyState…
│  ├─ layout/     Header, Footer, RootLayout, ScrollToTop
│  ├─ navigation/ MegaMenu (desktop), MobileMenu (drawer)
│  ├─ home/       The 15 homepage sections
│  ├─ emergency/  Persistent emergency access (button + mobile action bar)
│  └─ …           doctors / specialties / services / content / search
├─ pages/         Route components (thin — compose data + templates)
└─ routes/        createBrowserRouter, all routes lazy code-split
```

**One template, many pages.** For example every specialty renders through
`SpecialtyPage.tsx` driven by an entry in `src/data/specialties.ts`. Adding a
specialty = adding a data object. The same holds for services, facilities,
doctors, and articles/news/events (which share `ArticlePage.tsx`).

Key decisions are documented in `docs/architecture/`.

---

## Content verification & assets

This codebase follows a **zero-fabrication** policy. Only facts confirmed from
official Amaltas sources are marked `verified: true`. Everything else is clearly
flagged so the content team can complete it before launch.

### [CONTENT REQUIRES VERIFICATION]

- **Doctor directory** (`src/data/doctors.ts`) — 8 real, publicly-listed doctors
  are included. Optional fields (experience years, languages, expertise,
  consultation details) are **omitted** rather than invented; add them once
  confirmed.
- **Statistics** (`src/data/site.ts` → `stats`) — only campus size, NABH
  accreditation, and 24×7 emergency are `verified`. Any bed counts / patient
  numbers must be verified before adding.
- **Articles / News / Events** (`src/data/articles.ts`) — all entries are
  `sample: true` placeholders to demonstrate layout. Replace with real content.
- **Testimonials** (`src/data/testimonials.ts`) — intentionally **empty**. Do
  not add without written patient consent (`consentOnFile`).
- **Accreditations** (`src/data/site.ts` → `accreditations`) — only NABH is
  `verified`; others carry a `note` and must be confirmed.

In development, the `<VerificationNote>` banner surfaces unverified content
in-page. It never renders in production.

### [NEW ASSET REQUIRED]

The build ships **no stock or fabricated imagery**. Every image slot uses a
branded gradient `Placeholder`. Supply real, authentic assets for: hospital
exterior/interior, doctor headshots, facility photos, and gallery tiles. Drop
files into `public/` and set the `image` field on the relevant data record.

---

## Accessibility & SEO

- WCAG 2.2 AA target: semantic landmarks, skip-link, visible focus rings,
  keyboard-operable menus/dialogs, labelled controls, alt text, logical heading
  order, `prefers-reduced-motion` respected globally.
- Per-route `<Seo>`: unique title/description/canonical, Open Graph, and
  JSON-LD (`MedicalOrganization`, `BreadcrumbList`, `Physician`, `Article`).
  Strategy in `docs/architecture/seo-strategy.md`.

---

## Appointments

`patients/appointment` is a 4-step **request** flow. It never displays fake
real-time availability. On submit it validates and shows a success state; wiring
to a secure backend is a documented TODO (`VITE_APPOINTMENT_ENDPOINT`). See
`docs/architecture/technical-architecture.md`.

---

## Tech stack (pinned)

React 18 · React Router 6 · Vite 5 · TypeScript 5.6 (strict) · Tailwind 3.4 ·
Framer Motion 11 (used sparingly) · Lucide icons. No UI kit; primitives are
hand-built in `src/components/ui/`.
