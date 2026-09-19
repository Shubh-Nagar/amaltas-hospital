import type { ConditionCategory } from '@/types';

/**
 * "What brings you here?" — patient-intent entry points using everyday
 * language rather than clinical terms. Each maps to a verified specialty.
 */
export const conditionCategories: ConditionCategory[] = [
  { slug: 'heart', label: 'Heart & Circulation', blurb: 'Chest pain, blood pressure, heart rhythm', icon: 'HeartPulse', specialtySlug: 'cardiology' },
  { slug: 'brain-nerves', label: 'Brain & Nerves', blurb: 'Stroke, headaches, seizures, spine', icon: 'Brain', specialtySlug: 'neurosciences' },
  { slug: 'cancer', label: 'Cancer Care', blurb: 'Screening, diagnosis & treatment', icon: 'Ribbon', specialtySlug: 'oncology' },
  { slug: 'kidney-urinary', label: 'Kidney & Urinary', blurb: 'Kidney disease, stones, dialysis', icon: 'Droplets', specialtySlug: 'nephrology' },
  { slug: 'digestive', label: 'Digestive & Liver', blurb: 'Stomach, liver, acidity, gallstones', icon: 'Activity', specialtySlug: 'gastroenterology' },
  { slug: 'bones-joints', label: 'Bones & Joints', blurb: 'Joint pain, fractures, replacements', icon: 'Bone', specialtySlug: 'orthopaedics' },
  { slug: 'womens-health', label: "Women's Health", blurb: 'Pregnancy, gynaecology, fertility', icon: 'Baby', specialtySlug: 'obstetrics-gynaecology' },
  { slug: 'child-health', label: 'Child Health', blurb: 'Newborn & children’s care', icon: 'Baby', specialtySlug: 'paediatrics-neonatology' },
  { slug: 'eye-care', label: 'Eye Care', blurb: 'Cataract, vision, eye conditions', icon: 'Eye', specialtySlug: 'ophthalmology' },
  { slug: 'ent', label: 'Ear, Nose & Throat', blurb: 'Hearing, sinus, throat', icon: 'Ear', specialtySlug: 'ent' },
];
