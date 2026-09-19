import type { GalleryItem } from '@/types';

/**
 * Real Amaltas photography, sourced from the hospital's public photo gallery
 * and facility pages (amaltashospital.in). Each image was visually confirmed
 * to match its caption before inclusion.
 */
const img = (
  id: string,
  caption: string,
  category: string,
  file: string,
  width: number,
  height: number,
): GalleryItem => ({
  id,
  caption,
  category,
  image: { src: `/images/gallery/${file}`, alt: caption, width, height },
});

export const gallery: GalleryItem[] = [
  img('g1', 'Hospital exterior & entrance', 'Campus', 'entrance-ambulance-bay.webp', 1600, 898),
  img('g2', 'OPD registration', 'Patients', 'opd-registration.webp', 1536, 862),
  img('g3', 'Reception & patient helpdesk', 'Care Team', 'reception-desk.webp', 1536, 862),
  img('g4', 'Outpatient consultation', 'Patients', 'outpatient-consultation.webp', 1536, 862),
  img('g5', 'General ward', 'Facilities', 'general-ward-wide.jpg', 1600, 898),
  img('g6', 'General ward & nurses’ station', 'Facilities', 'general-ward-nurses-station.webp', 1536, 862),
  img('g7', 'Doctor on ward rounds', 'Care Team', 'doctor-ward-round.webp', 1536, 862),
  img('g8', 'Private patient room', 'Facilities', 'private-patient-room.webp', 1536, 862),
  img('g9', 'Operation theatre', 'Facilities', 'operation-theatre.webp', 1600, 898),
  img('g10', 'Surgery in progress', 'Facilities', 'surgery-in-progress.webp', 1600, 898),
  img('g11', 'Minimally invasive procedure', 'Facilities', 'endoscopic-procedure.jpg', 1600, 898),
  img('g12', 'Surgical & critical-care team', 'Care Team', 'surgical-team.webp', 1536, 862),
  img('g13', 'Department of Medicine team', 'Care Team', 'department-of-medicine-team.webp', 1600, 898),
  img('g14', 'Support & security staff', 'Care Team', 'support-security-team.webp', 1536, 862),
];
