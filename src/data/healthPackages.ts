/**
 * Health check-up packages, transcribed from the package posters published on
 * amaltashospital.in/health-packages (the posters are kept as `poster`).
 * Test names follow the posters; only obvious typos are corrected.
 * Prices are as published — confirm with the hospital before launch.
 */
export type PackageAudience = 'adults' | 'women' | 'children' | 'seniors' | 'family';

export interface HealthPackage {
  slug: string;
  name: string;
  tagline: string;
  audience: PackageAudience;
  /** Offer price in ₹. */
  price: number;
  /** Original / MRP price in ₹, where the poster shows one. */
  originalPrice?: number;
  /** Shown instead of a test count when the poster gives one (e.g. "81 tests"). */
  testCountLabel?: string;
  tests: string[];
  highlights?: string[];
  poster: string;
  featured?: boolean;
}

const poster = (f: string) => `/images/packages/${f}.webp`;

export const audienceLabels: Record<PackageAudience, string> = {
  adults: 'Adults',
  women: 'Women',
  children: 'Children',
  seniors: 'Senior citizens',
  family: 'Family',
};

export const healthPackages: HealthPackage[] = [
  {
    slug: 'full-body-checkup',
    name: 'Full Body Checkup',
    tagline: 'Liver, kidney, blood count and more — 81 tests',
    audience: 'adults',
    price: 399,
    originalPrice: 1810,
    testCountLabel: '81 tests',
    tests: ['Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'CBC', 'and more — 81 tests in all'],
    highlights: ['Free home sample collection', 'Advanced laboratory'],
    poster: poster('full-body-checkup'),
    featured: true,
  },
  {
    slug: 'young-fit',
    name: 'Young Fit',
    tagline: 'General health package',
    audience: 'adults',
    price: 599,
    originalPrice: 750,
    tests: ['Physician Consultation', 'Complete Hemogram', 'Blood Grouping', 'Blood Sugar (F/R)', 'Blood Urea', 'Urine R/M', 'Chest X-Ray', 'ECG'],
    poster: poster('young-fit'),
  },
  {
    slug: 'healthy-child',
    name: 'Healthy Child',
    tagline: 'Wellness package for children',
    audience: 'children',
    price: 799,
    originalPrice: 1090,
    tests: [
      'Complete Hemogram with ESR (CBC)',
      'Blood Sugar (Fasting & PP)',
      'Blood Grouping & Rh Typing',
      'Urine Analysis',
      'Stool Analysis',
      'Chest X-Ray',
      'Mantoux Test',
      'USG (Whole Abdomen)',
      'Eye Check-up',
      'Dental Check-up',
      'Paediatrics Consultation',
    ],
    poster: poster('healthy-child'),
  },
  {
    slug: 'healthy-old-gold',
    name: 'Healthy Old Gold — Basic',
    tagline: 'Senior citizen health package',
    audience: 'seniors',
    price: 999,
    originalPrice: 1290,
    tests: [
      'Hemogram',
      'Fasting Blood Sugar',
      'Urine R/M',
      'KFT',
      'SGOT / SGPT / ALP',
      'Lipid Profile',
      'Chest X-Ray (CXR)',
      'ECG',
      'Physical Assessment & Review by Physiotherapist',
    ],
    poster: poster('healthy-old-gold'),
  },
  {
    slug: 'healthy-women',
    name: 'Healthy Women',
    tagline: 'Health package for women',
    audience: 'women',
    price: 1699,
    originalPrice: 2420,
    tests: [
      'Complete Hemogram with ESR',
      'Lipid Profile',
      'Thyroid Function Tests',
      'Blood Sugar (Fasting & PP)',
      'Blood Grouping & Rh Typing',
      'S. Bilirubin',
      'Stool Occult Blood',
      'Blood Urea',
      'Chest X-Ray',
      'Ultrasound Whole Abdomen including Pelvis',
      'ECG',
      'Pap Smear',
      'Mammography / Breast Ultrasound',
      'Vision Check-up',
    ],
    poster: poster('healthy-women'),
    featured: true,
  },
  {
    slug: 'senior-citizen-women',
    name: 'Comprehensive Senior Citizen',
    tagline: 'Health package (for women)',
    audience: 'seniors',
    price: 2799,
    originalPrice: 3948,
    tests: [
      'Hemogram with Peripheral Smear',
      'FBS (PPBS and HbA1c — only for diabetic patients)',
      'KFT | LFT | TSH',
      'Serum Calcium',
      'Lipid Profile',
      'Chest X-Ray (CXR)',
      'USG Whole Abdomen',
      '2D Echo',
      'PSA (for prostate cancer screening)',
      'Stool Occult Blood (for colon cancer screening)',
      'Diet Counselling',
      'Eye Consultation',
      'Consultation by Joint Replacement Consultant',
      'Physiotherapy Assessment with Consultant',
    ],
    poster: poster('senior-citizen-women'),
  },
  {
    slug: 'wellness-family',
    name: 'Comprehensive Wellness Family',
    tagline: 'A complete check-up for the whole family',
    audience: 'family',
    price: 4199,
    originalPrice: 5970,
    tests: [
      'Complete Hemogram',
      'Lipid Profile',
      'Renal Profile (KFT)',
      'Liver Function Test (LFT)',
      'Thyroid Function Tests',
      'Blood Sugar (Fasting & PP)',
      'Blood Grouping & Rh Typing',
      'Chest X-Ray',
      'Abdomen Ultrasound',
      'Pap Smear for Women',
      'Mammography for Women (after 40 years)',
      'ECG, TMT, PFT',
      'Echocardiography',
      'Eye Consultation including Vision Check-up',
      'Dental & ENT Consultation',
      'Surgical Consultation for Men',
      'Post Check-up Consultation by Physician',
      'Prostate Specific Antigen for Men',
    ],
    poster: poster('wellness-family'),
    featured: true,
  },
];

/** World-class dialysis offer from the same page (a service rate, not a check-up package). */
export const dialysisOffer = {
  title: 'World-class dialysis, now in Dewas',
  price: 799,
  note: 'per session, including related medicines',
  highlights: ['24-hour service'],
  poster: poster('dialysis'),
};

export const discountPercent = (p: HealthPackage) =>
  p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
