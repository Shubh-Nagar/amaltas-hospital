import { useEffect } from 'react';
import { site } from '@/data/site';

/**
 * Deliberate SEO for a Vite SPA (no Next.js). Manages document <head> at
 * runtime: title, description, canonical, Open Graph, Twitter cards and
 * optional JSON-LD structured data. Every important route renders a <Seo>.
 *
 * For production, pair this with a prerender/SSG step (e.g. vite-plugin-ssg
 * or prerendering in CI) so crawlers receive fully-rendered HTML — documented
 * in docs/architecture/seo-strategy.md.
 */

export interface SeoProps {
  title: string;
  description?: string;
  /** Path portion, e.g. "/doctors/dr-x". Canonical = siteUrl + path. */
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** One or more JSON-LD objects. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function Seo({ title, description, path, image, type = 'website', jsonLd, noIndex }: SeoProps) {
  const fullTitle = title.includes(site.shortName) ? title : `${title} | ${site.shortName}`;
  const desc = description ?? site.descriptionShort;
  const url = site.siteUrl + (path ?? '/');
  const ogImage = image ?? `${site.siteUrl}/assets/og-default.png`;

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    const scriptId = 'route-jsonld';
    document.getElementById(scriptId)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [fullTitle, desc, url, ogImage, type, noIndex, jsonLd]);

  return null;
}

/* ---- Structured-data helpers (only factual, verified values) ---- */

export function medicalOrgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: site.name,
    alternateName: site.academicName,
    url: site.siteUrl,
    telephone: site.phone.tollFree,
    email: site.email.general,
    medicalSpecialty: ['Cardiovascular', 'Neurologic', 'Oncologic', 'Nephrology', 'Orthopedic'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    availableService: { '@type': 'MedicalProcedure', name: 'Emergency Care' },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: site.siteUrl + it.path,
    })),
  };
}

export function physicianJsonLd(name: string, qualifications: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name,
    description: qualifications,
    url: site.siteUrl + path,
    memberOf: { '@type': 'Hospital', name: site.name },
  };
}

export function articleJsonLd(title: string, description: string, datePublished: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: site.siteUrl + path,
  };
}
