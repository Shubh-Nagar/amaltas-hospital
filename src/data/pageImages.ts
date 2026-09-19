/**
 * Photographic banner images for internal page headers, all from the hospital's
 * own photography in `public/images/gallery/`.
 *
 * Kept in one place so a page's banner can be reassigned without touching the
 * page component, and so the same photograph is not used twice in a row as a
 * visitor moves between related pages.
 */

export interface PageImage {
  src: string;
  /** Decorative by default — the page title already carries the meaning. */
  alt?: string;
}

const g = (file: string): PageImage => ({ src: `/images/gallery/${file}` });

/** Top-level pages, keyed by route path. */
export const pageImages = {
  about: g('campus-exterior-front.webp'),
  academics: g('department-of-medicine-team.webp'),
  appointment: g('opd-registration.webp'),
  articles: g('doctor-ward-round.webp'),
  contact: g('outpatient-consultation.webp'),
  doctors: g('surgical-team.webp'),
  emergency: g('emergency-bay.webp'),
  events: g('support-security-team.webp'),
  facilities: g('general-ward.webp'),
  gallery: g('surgery-in-theatre.webp'),
  news: g('campus-exterior-front.webp'),
  patients: g('reception-desk.webp'),
  services: g('echocardiography.webp'),
  specialties: g('cath-lab.webp'),
} satisfies Record<string, PageImage>;

/** Per-specialty banners; falls back to the specialties banner. */
export const specialtyImages: Record<string, PageImage> = {
  cardiology: g('cath-lab.webp'),
  neurosciences: g('ct-scanner.webp'),
  oncology: g('ct-scanner.webp'),
  nephrology: g('general-ward.webp'),
  urology: g('operation-theatre.webp'),
  gastroenterology: g('endoscopic-procedure.jpg'),
  orthopaedics: g('surgery-in-theatre.webp'),
  'obstetrics-gynaecology': g('neonatal-icu.webp'),
  'paediatrics-neonatology': g('neonatal-icu.webp'),
  ent: g('opd-registration.webp'),
  ophthalmology: g('opd-registration.webp'),
  'general-medicine': g('doctor-ward-round.webp'),
};

/** Per-service banners; falls back to the services banner. */
export const serviceImages: Record<string, PageImage> = {
  'emergency-trauma': g('emergency-bay.webp'),
  'diagnostics-pathology': g('pathology-lab.webp'),
  'radiology-imaging': g('ct-scanner.webp'),
  'radiation-oncology': g('ct-scanner.webp'),
  dialysis: g('general-ward.webp'),
  pharmacy: g('reception-desk.webp'),
  'blood-centre': g('pathology-lab.webp'),
  ambulance: g('entrance-ambulance-bay.webp'),
};
