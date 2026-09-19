/**
 * Domain models — the contract every page and component is built against.
 * All content is data-driven from src/data/* so a CMS/API can replace the
 * static files later without touching UI code.
 *
 * `verified` flags whether a record has been confirmed against an authoritative
 * Amaltas source. UNVERIFIED records must never surface unqualified medical
 * claims — see docs/qa/content-verification.md and the ZERO-FABRICATION policy.
 */

export type Slug = string;

export interface ImageAsset {
  /** Path under /assets or remote URL. Empty string => render a placeholder. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Marks an asset that still needs a real Amaltas photograph. */
  placeholder?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Doctor {
  slug: Slug;
  name: string;
  /** e.g. "MBBS, MD, DM" — verbatim from verified source only. */
  qualifications: string;
  specialtySlugs: Slug[];
  /** Human-readable department/role label. */
  role?: string;
  photo?: ImageAsset;
  /** Years of experience — omit unless verified. */
  experienceYears?: number;
  expertise?: string[];
  languages?: string[];
  /** Free-text consultation info; no fabricated live availability. */
  consultation?: string;
  featured?: boolean;
  verified: boolean;
}

export interface Specialty {
  slug: Slug;
  name: string;
  /** Grouping used by the "What brings you here?" explorer. */
  category: ConditionCategorySlug;
  tagline: string;
  description: string;
  hero?: ImageAsset;
  conditions: string[];
  treatments: string[];
  facilitySlugs?: Slug[];
  faqs?: Faq[];
  featured?: boolean;
  /** Lucide icon name, resolved in a central icon map. */
  icon?: string;
  verified: boolean;
}

export interface Service {
  slug: Slug;
  name: string;
  summary: string;
  description: string;
  hero?: ImageAsset;
  whoItHelps?: string;
  whatToExpect?: string[];
  relatedSpecialtySlugs?: Slug[];
  icon?: string;
  is24x7?: boolean;
  verified: boolean;
}

export interface Facility {
  slug: Slug;
  name: string;
  summary: string;
  description?: string;
  image?: ImageAsset;
  icon?: string;
  verified: boolean;
}

export type ArticleKind = 'article' | 'news' | 'event';

export interface Article {
  slug: Slug;
  kind: ArticleKind;
  title: string;
  excerpt: string;
  /** Markdown-ish HTML string rendered into .prose-editorial. */
  body: string;
  category?: string;
  author?: string;
  publishedAt: string; // ISO date
  /** Event-only: when/where. */
  eventDate?: string;
  eventLocation?: string;
  cover?: ImageAsset;
  /** Additional photos from the event/article, shown as a gallery on the detail page. */
  gallery?: ImageAsset[];
  /** Clearly-marked sample content pending real editorial copy. */
  sample?: boolean;
}

export interface Testimonial {
  slug: Slug;
  patientName: string;
  quote: string;
  treatment?: string;
  specialtySlug?: Slug;
  consentOnFile: boolean;
  verified: boolean;
}

export interface Accreditation {
  name: string;
  fullName: string;
  note?: string;
  verified: boolean;
}

export interface Stat {
  label: string;
  value: string;
  verified: boolean;
}

export type ConditionCategorySlug =
  | 'heart'
  | 'brain-nerves'
  | 'cancer'
  | 'kidney-urinary'
  | 'digestive'
  | 'bones-joints'
  | 'womens-health'
  | 'child-health'
  | 'eye-care'
  | 'ent'
  | 'general';

export interface ConditionCategory {
  slug: ConditionCategorySlug;
  label: string;
  /** Everyday phrasing patients search with, not clinical terms. */
  blurb: string;
  icon: string;
  specialtySlug: Slug;
}

export interface GalleryItem {
  id: string;
  caption: string;
  image: ImageAsset;
  category?: string;
}

/** Global-search result envelope. */
export interface SearchResult {
  type: 'doctor' | 'specialty' | 'service' | 'facility' | 'article' | 'page';
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string;
}
