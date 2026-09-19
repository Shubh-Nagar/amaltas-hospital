import type { Accreditation, Stat } from '@/types';

/**
 * VERIFIED institutional facts sourced from Amaltas public listings
 * (amaltashospital.in, official contact page). Confirm before launch —
 * see docs/qa/content-verification.md.
 */
export const site = {
  name: 'Amaltas Super Speciality Hospital',
  shortName: 'Amaltas Hospital',
  academicName: 'Amaltas Institute of Medical Sciences (AIMS)',
  legalGroup: 'Amaltas Group',
  tagline: 'Advanced multi-superspeciality care, close to home.',
  descriptionShort:
    'NABH-accredited multi-superspeciality hospital in Dewas, Madhya Pradesh — comprehensive care across Heart, Neuroscience, Cancer, Nephrology, Orthopaedics and more.',
  siteUrl: 'https://amaltashospital.in',

  address: {
    line1: 'Village Bangar, Dewas–Ujjain Highway',
    line2: 'District Dewas',
    city: 'Dewas',
    state: 'Madhya Pradesh',
    postalCode: '455001',
    country: 'IN',
    // Approximate campus coordinates (Dewas–Ujjain highway). Verify for embed.
    geo: { lat: 22.9312, lng: 76.0201 },
  },

  cityOffice: {
    label: 'Indore City Office',
    line1: '204, Shree Krishna Classic, 139, Phadnis Colony',
    line2: 'Above Axis Bank, A.B. Road, Near Hotel Amaltas',
    city: 'Indore',
    state: 'Madhya Pradesh',
    postalCode: '452008',
  },

  campusAcres: 27.378,

  phone: {
    tollFree: '1800-571-2120',
    primary: '+91 97524 47834',
    landline: '07272-482500',
    emergency: '1800-571-2120', // Confirm dedicated emergency line before launch
  },

  email: {
    general: 'amaltashospitaldewas@gmail.com',
    academic: 'medical@amaltasgroup.co.in',
  },

  social: {
    facebook: 'https://www.facebook.com/amaltashospitaldewas',
    youtube: 'https://www.youtube.com/channel/UCxvW6I_oGq8F2J11T5RQ7Ow',
    twitter: 'https://x.com/AmaltasHospital',
    instagram: 'https://www.instagram.com/amaltashospitaldewas',
  },
} as const;

export const accreditations: Accreditation[] = [
  {
    name: 'NABH',
    fullName: 'National Accreditation Board for Hospitals & Healthcare Providers',
    note: 'Amaltas Institute of Medical Sciences is publicly listed as NABH-accredited.',
    verified: true,
  },
  {
    name: 'NABL',
    fullName: 'National Accreditation Board for Testing and Calibration Laboratories',
    note: '[CONTENT REQUIRES VERIFICATION] — confirm current NABL status for the lab.',
    verified: false,
  },
  {
    name: 'Ayushman Bharat',
    fullName: 'Ayushman Bharat / PM-JAY empanelment',
    note: '[CONTENT REQUIRES VERIFICATION] — confirm empanelment & cashless scheme list.',
    verified: false,
  },
];

/**
 * Only VERIFIED stats are surfaced in the Trust section. Unverified metrics
 * are kept here (verified:false) but filtered out of the UI until confirmed.
 */
export const stats: Stat[] = [
  { label: 'Campus', value: '27.4 acres', verified: true },
  { label: 'Accreditation', value: 'NABH', verified: true },
  { label: 'Emergency care', value: '24 / 7', verified: true },
  { label: 'Hospital beds', value: '—', verified: false },
  { label: 'Specialist doctors', value: '—', verified: false },
  { label: 'Superspecialities', value: '—', verified: false },
];
