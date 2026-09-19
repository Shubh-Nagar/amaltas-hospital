# SEO Strategy

Dependency-free SEO via a custom `<Seo>` component (`src/lib/seo/Seo.tsx`) — no
react-helmet. It writes document title and meta/link tags on mount and cleans up
on unmount.

## Per-route metadata
Every route sets a unique **title**, **description**, and **canonical** URL, plus
Open Graph tags. Titles follow `Page — Amaltas Super Speciality Hospital`.

## Structured data (JSON-LD)
- `medicalOrgJsonLd()` — `MedicalOrganization` on the home/about level (name,
  address, geo, contact points).
- `breadcrumbJsonLd(items)` — `BreadcrumbList` on nested pages.
- `physicianJsonLd(name, quals, path)` — `Physician` on doctor profiles.
- `articleJsonLd(...)` — `Article` on articles/news/events detail pages.

Only verified facts feed structured data. Do not emit JSON-LD for unverified
stats, ratings, or reviews.

## Crawlability
- `public/robots.txt` allows crawling and points to the sitemap location.
- `NotFoundPage` and any thin/utility routes set `noIndex`.
- Canonical URLs derive from `site.siteUrl` (override with `VITE_SITE_URL`).

## Pre-launch checklist
- [ ] Generate and host `sitemap.xml`.
- [ ] Set the production `VITE_SITE_URL`.
- [ ] Replace placeholder social/OG image with a real branded asset.
- [ ] Confirm every `verified: false` record before it ships.
