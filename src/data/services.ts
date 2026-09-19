import type { Service } from '@/types';

/**
 * Clinical & support services. Existence of these service lines is grounded in
 * Amaltas public listings (Emergency, Diagnostics/Pathology, Imaging/Radiology,
 * Radiation Oncology, Support Services). Availability specifics (equipment
 * models, timings) must be verified before launch.
 */
export const services: Service[] = [
  {
    slug: 'emergency-trauma',
    name: 'Emergency & Trauma Care',
    summary: '24/7 emergency and polytrauma care with rapid triage.',
    description:
      'Round-the-clock emergency care for medical emergencies, accidents and polytrauma, supported by critical-care and diagnostic services.',
    is24x7: true,
    icon: 'Ambulance',
    whoItHelps: 'Anyone facing a sudden medical emergency, accident or trauma.',
    whatToExpect: ['Immediate triage on arrival', 'Stabilisation & critical-care support', 'Rapid access to diagnostics', 'Admission or referral as needed'],
    relatedSpecialtySlugs: ['general-medicine', 'neurosciences', 'cardiology'],
    verified: true,
  },
  {
    slug: 'diagnostics-pathology',
    name: 'Diagnostics & Pathology',
    summary: 'Laboratory pathology services for accurate, timely reports.',
    description:
      'Pathology and laboratory diagnostics supporting clinical decision-making across departments.',
    icon: 'FlaskConical',
    whatToExpect: ['Sample collection', 'Laboratory analysis', 'Timely, physician-ready reports'],
    verified: true,
  },
  {
    slug: 'radiology-imaging',
    name: 'Radiology & Advanced Imaging',
    summary: 'Advanced imaging for accurate diagnosis.',
    description:
      'Diagnostic imaging services to support accurate diagnosis and treatment planning across specialities.',
    icon: 'ScanLine',
    whatToExpect: ['Imaging as advised by your doctor', 'Reporting by radiology team'],
    verified: true,
  },
  {
    slug: 'radiation-oncology',
    name: 'Radiation Oncology',
    summary: 'Precise radiation therapy as part of comprehensive cancer care.',
    description:
      'Radiation therapy delivered as part of the hospital’s multidisciplinary cancer-care programme.',
    icon: 'Radiation',
    relatedSpecialtySlugs: ['oncology'],
    verified: true,
  },
  {
    slug: 'dialysis',
    name: 'Dialysis',
    summary: 'Haemodialysis support for kidney patients.',
    description: 'Dialysis services supporting patients with kidney conditions, coordinated with nephrology care.',
    icon: 'Droplets',
    relatedSpecialtySlugs: ['nephrology'],
    verified: false,
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    summary: 'On-campus pharmacy for inpatient and outpatient needs.',
    description: 'Pharmacy services for patients and visitors. [CONTENT REQUIRES VERIFICATION] — confirm hours & 24/7 status.',
    icon: 'Pill',
    verified: false,
  },
  {
    slug: 'blood-centre',
    name: 'Blood Centre',
    summary: 'Blood bank & transfusion support.',
    description: 'Blood centre services supporting surgical and emergency care. [CONTENT REQUIRES VERIFICATION] — confirm licence & services.',
    icon: 'Droplet',
    verified: false,
  },
  {
    slug: 'ambulance',
    name: 'Ambulance Services',
    summary: 'Emergency patient transport.',
    description: 'Ambulance support for emergency transport. [CONTENT REQUIRES VERIFICATION] — confirm fleet & coverage.',
    icon: 'Ambulance',
    is24x7: true,
    verified: false,
  },
];
