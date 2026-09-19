/**
 * Primary navigation & mega-menu configuration (data-driven so the header
 * never hardcodes links). Reflects the new patient-first information
 * architecture — see docs/design/information-architecture.md.
 */
export interface NavChild {
  label: string;
  href: string;
  description?: string;
}
export interface NavColumn {
  heading: string;
  links: NavChild[];
}
export interface NavItem {
  label: string;
  href: string;
  columns?: NavColumn[];
}

export const primaryNav: NavItem[] = [
  {
    label: 'Find Care',
    href: '/specialties',
    columns: [
      {
        heading: 'Get started',
        links: [
          { label: 'Find a Doctor', href: '/doctors', description: 'Search by name or specialty' },
          { label: 'Find a Specialty', href: '/specialties', description: 'Explore centres of excellence' },
          { label: 'Services', href: '/services', description: 'Diagnostics, emergency & more' },
        ],
      },
      {
        heading: 'Immediate',
        links: [
          { label: 'Emergency', href: '/patients/emergency', description: '24/7 emergency care' },
          { label: 'Diagnostics', href: '/services/diagnostics-pathology', description: 'Pathology & imaging' },
          { label: 'Book an Appointment', href: '/patients/appointment', description: 'Request a visit' },
        ],
      },
    ],
  },
  {
    label: 'Specialties',
    href: '/specialties',
    columns: [
      {
        heading: 'Centres of Excellence',
        links: [
          { label: 'Cardiology', href: '/specialties/cardiology' },
          { label: 'Neurology & Neurosurgery', href: '/specialties/neurosciences' },
          { label: 'Cancer Care', href: '/specialties/oncology' },
          { label: 'Nephrology', href: '/specialties/nephrology' },
        ],
      },
      {
        heading: 'More specialties',
        links: [
          { label: 'Orthopaedics', href: '/specialties/orthopaedics' },
          { label: 'Gastroenterology', href: '/specialties/gastroenterology' },
          { label: 'Obstetrics & Gynaecology', href: '/specialties/obstetrics-gynaecology' },
          { label: 'View all specialties', href: '/specialties' },
        ],
      },
    ],
  },
  { label: 'Doctors', href: '/doctors' },
  {
    label: 'Patients & Visitors',
    href: '/patients',
    columns: [
      {
        heading: 'Plan your visit',
        links: [
          { label: 'Book an Appointment', href: '/patients/appointment' },
          { label: 'Emergency', href: '/patients/emergency' },
          { label: 'Patient Guide', href: '/patients' },
        ],
      },
      {
        heading: 'Support',
        links: [
          { label: 'Facilities', href: '/facilities' },
          { label: 'Contact', href: '/contact' },
          { label: 'Directions', href: '/contact#directions' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    columns: [
      {
        heading: 'Amaltas',
        links: [
          { label: 'About Amaltas', href: '/about' },
          { label: 'Accreditations', href: '/about#accreditations' },
          { label: 'Facilities', href: '/facilities' },
          { label: 'Gallery', href: '/gallery' },
        ],
      },
    ],
  },
  {
    label: 'Health Insights',
    href: '/articles',
    columns: [
      {
        heading: 'Read & watch',
        links: [
          { label: 'Health Articles', href: '/articles' },
          { label: 'News', href: '/news' },
          { label: 'Events', href: '/events' },
        ],
      },
    ],
  },
  { label: 'Academics', href: '/academics' },
];

export const footerNav: NavColumn[] = [
  {
    heading: 'Find Care',
    links: [
      { label: 'Find a Doctor', href: '/doctors' },
      { label: 'Specialties', href: '/specialties' },
      { label: 'Services', href: '/services' },
      { label: 'Emergency', href: '/patients/emergency' },
    ],
  },
  {
    heading: 'Patients',
    links: [
      { label: 'Book Appointment', href: '/patients/appointment' },
      { label: 'Patient Guide', href: '/patients' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Health Packages', href: '/patients' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Amaltas', href: '/about' },
      { label: 'Academics (AIMS)', href: '/academics' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Health Insights', href: '/articles' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Directions', href: '/contact#directions' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
    ],
  },
];
