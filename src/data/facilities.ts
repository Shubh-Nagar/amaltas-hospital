import type { Facility } from '@/types';

export const facilities: Facility[] = [
  { slug: 'emergency', name: 'Emergency & Casualty', summary: '24/7 emergency department with rapid triage and critical-care access.', icon: 'Ambulance', verified: true },
  { slug: 'icu', name: 'Intensive Care Units', summary: 'Critical-care units supporting the sickest patients across specialities.', icon: 'HeartPulse', image: { src: '/images/facilities/icu.jpeg', alt: 'Intensive care unit at Amaltas Hospital', width: 1024, height: 682 }, verified: true },
  { slug: 'operation-theatres', name: 'Operation Theatres', summary: 'Modular operation theatres for surgical and superspeciality procedures.', icon: 'Scissors', image: { src: '/images/gallery/operation-theatre.webp', alt: 'Operation theatre at Amaltas Hospital', width: 1600, height: 898 }, verified: true },
  { slug: 'diagnostics', name: 'Diagnostics & Lab', summary: 'Pathology, imaging and diagnostic services under one roof.', icon: 'FlaskConical', verified: true },
  { slug: 'pharmacy', name: 'Pharmacy', summary: 'On-campus pharmacy for patients and visitors.', icon: 'Pill', verified: false },
  { slug: 'blood-centre', name: 'Blood Centre', summary: 'Blood bank and transfusion support for surgical and emergency care.', icon: 'Droplet', verified: false },
  { slug: 'wards-rooms', name: 'Wards & Rooms', summary: 'General wards and rooms with categories to suit patient needs.', icon: 'BedDouble', image: { src: '/images/facilities/wards-general-ward.jpg', alt: 'General ward at Amaltas Hospital', width: 301, height: 168 }, verified: false },
];
