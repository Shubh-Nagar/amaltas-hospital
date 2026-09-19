import type { Facility } from '@/types';

export const facilities: Facility[] = [
  { slug: 'emergency', name: 'Emergency & Casualty', summary: '24/7 emergency department with rapid triage and critical-care access.', icon: 'Ambulance', image: { src: '/images/gallery/emergency-bay.webp', alt: 'Emergency and casualty bay at Amaltas Hospital', width: 1536, height: 862 }, verified: true },
  { slug: 'icu', name: 'Intensive Care Units', summary: 'Critical-care units supporting the sickest patients across specialities.', icon: 'HeartPulse', image: { src: '/images/gallery/neonatal-icu.webp', alt: 'Neonatal intensive care unit at Amaltas Hospital', width: 1536, height: 862 }, verified: true },
  { slug: 'operation-theatres', name: 'Operation Theatres', summary: 'Modular operation theatres for surgical and superspeciality procedures.', icon: 'Scissors', image: { src: '/images/gallery/operation-theatre.webp', alt: 'Modular operation theatre at Amaltas Hospital', width: 1536, height: 862 }, verified: true },
  { slug: 'diagnostics', name: 'Diagnostics & Lab', summary: 'Pathology, imaging and diagnostic services under one roof.', icon: 'FlaskConical', image: { src: '/images/gallery/pathology-lab.webp', alt: 'Technician working in the pathology laboratory at Amaltas Hospital', width: 1536, height: 862 }, verified: true },
  { slug: 'pharmacy', name: 'Pharmacy', summary: 'On-campus pharmacy for patients and visitors.', icon: 'Pill', verified: false },
  { slug: 'blood-centre', name: 'Blood Centre', summary: 'Blood bank and transfusion support for surgical and emergency care.', icon: 'Droplet', verified: false },
  { slug: 'wards-rooms', name: 'Wards & Rooms', summary: 'General wards and rooms with categories to suit patient needs.', icon: 'BedDouble', image: { src: '/images/gallery/general-ward.webp', alt: 'General ward at Amaltas Hospital', width: 1536, height: 862 }, verified: false },
];
