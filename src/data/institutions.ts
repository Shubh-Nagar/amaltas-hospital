/**
 * Amaltas University's constituent institutions, as listed at
 * amaltasuniversity.in/institutions. Each trains on the Amaltas hospital campus.
 */

export const universityUrl = 'https://amaltasuniversity.in/';
export const universityInstitutionsUrl = 'https://amaltasuniversity.in/institutions';

export type InstitutionIcon = 'medicine' | 'ayurveda' | 'homoeopathy' | 'nursing' | 'pharmacy' | 'paramedical';

export interface Institution {
  name: string;
  /** Headline degrees, shown as an eyebrow. */
  level: string;
  summary: string;
  programmes: string[];
  /** The institution's own website. */
  website: string;
  icon: InstitutionIcon;
  /** Building photo from amaltasuniversity.in, in public/images/institutions/. */
  image: { src: string; alt: string; width: number; height: number };
}

const photo = (file: string, alt: string, width: number, height: number) => ({
  src: `/images/institutions/${file}`,
  alt,
  width,
  height,
});

export const institutions: Institution[] = [
  {
    name: 'Amaltas Institute of Medical Sciences',
    level: 'MBBS · MD · MS',
    summary: 'A teaching hospital with 1500+ beds where students train beside practising clinicians from day one.',
    programmes: ['M.B.B.S.', 'MD / MS', 'DM / M.Ch.'],
    website: 'https://amaltasmedicalcollege.in/',
    icon: 'medicine',
    image: photo('medical-sciences.webp', 'Amaltas Medical College building, Dewas', 1200, 800),
  },
  {
    name: 'Amaltas Ayurvedic College & Research Centre',
    level: 'BAMS',
    summary: 'Classical Ayurveda met with modern research, clinical wards, and a dedicated herbal pharmacy.',
    programmes: ['B.A.M.S.'],
    website: 'http://amaltasgroup.co.in/ayurvedic/',
    icon: 'ayurveda',
    image: photo('ayurveda.webp', 'Amaltas Ayurvedic College building with landscaped gardens', 1200, 800),
  },
  {
    name: 'Amaltas Institute of Homoeopathy',
    level: 'BHMS',
    summary: 'Evidence-informed homoeopathic medicine with an integrated outpatient department.',
    programmes: ['B.H.M.S.'],
    // The university site links to a temporary hosting address; use the university listing until a real domain exists.
    website: universityInstitutionsUrl,
    icon: 'homoeopathy',
    image: photo('homoeopathy.webp', 'Amaltas Institute of Homoeopathy building', 1200, 800),
  },
  {
    name: 'Amaltas Institute of Nursing Sciences',
    level: 'B.Sc · PB B.Sc Nursing',
    summary: 'Simulation labs, the lamp-lighting tradition, and placements across the Amaltas hospital network.',
    programmes: ['B.Sc. Nursing', 'Post Basic B.Sc. Nursing', 'M.Sc. Nursing', 'GNM', 'PhD Nursing'],
    website: 'http://amaltasgroup.co.in/nursing/',
    icon: 'nursing',
    image: photo('nursing.webp', 'Amaltas Nursing College and Amaltas Hospital buildings', 768, 512),
  },
  {
    name: 'Amaltas Institute of Pharmacy',
    level: 'B.Pharm · D.Pharm',
    summary: 'Formulation, pharmacology and analysis labs aligned to PCI standards and industry demand.',
    programmes: ['B.Pharm', 'D.Pharm'],
    website: 'http://amaltasgroup.co.in/pharmacy/',
    icon: 'pharmacy',
    image: photo('pharmacy.webp', 'Amaltas Institute of Pharmacy building', 1200, 758),
  },
  {
    name: 'Amaltas Institute of Paramedical Sciences',
    level: 'BPT · BMLT · DMLT',
    summary: 'Hands-on allied health training in physiotherapy, imaging and laboratory technology.',
    programmes: [
      'B.P.T.',
      'B.M.L.T.',
      'B.X.R.T.',
      'D.M.L.T.',
      'Diploma in Cath Lab Technology',
      'Diploma in Dialysis Technology',
      'Certificate in OT Technician',
      'Certificate in X-Ray Technician',
      'Certificate in USG Technician',
    ],
    website: 'http://amaltasgroup.co.in/paramedical/',
    icon: 'paramedical',
    image: photo('paramedical.webp', 'Amaltas Institute of Paramedical Sciences building', 1200, 736),
  },
];
