/**
 * "Our Hospitals" network, as listed on the amaltashospital.in homepage,
 * with that section's photographs (a second photo, where the old site had
 * one, is revealed on hover).
 */
export interface NetworkUnit {
  name: string;
  /** What kind of centre this is. */
  type: string;
  icon: string;
  image: string;
  altImage?: string;
  /** Internal route or external URL. */
  href?: string;
}

const img = (f: string) => `/images/network/${f}`;

export const networkIntro =
  'Our hospital network is a beacon of hope and healing in the community, dedicated to delivering exceptional medical care and compassionate support to those in need.';

export const networkUnits: NetworkUnit[] = [
  {
    name: 'Amaltas Super Speciality Hospital',
    type: 'Multi-superspeciality hospital',
    icon: 'Hospital',
    image: img('super-speciality-hospital.jpg'),
    href: '/about',
  },
  {
    name: 'Amaltas Ayurvedic Hospital & Research Centre',
    type: 'Ayurveda',
    icon: 'Leaf',
    image: img('ayurvedic-hospital-building.jpg'),
    altImage: img('ayurvedic-college.jpg'),
  },
  {
    name: 'Amaltas Institute of Homoeopathy',
    type: 'Homoeopathy',
    icon: 'GraduationCap',
    image: img('homoeopathy-2.jpg'),
    altImage: img('homoeopathy.jpg'),
  },
  {
    name: 'Amaltas Special School, Dewas',
    type: 'Special education',
    icon: 'School',
    image: img('special-school.jpg'),
    altImage: img('special-school-2.jpg'),
    href: 'https://amaltasspecialschool.in/',
  },
  {
    name: 'Amaltas Nasha Mukti Kendra',
    type: 'De-addiction centre',
    icon: 'HeartHandshake',
    image: img('nasha-mukti-kendra.jpg'),
    altImage: img('nasha-mukti-kendra-2.jpg'),
  },
];
