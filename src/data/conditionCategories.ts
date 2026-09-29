import type { ConditionCategory } from '@/types';

/**
 * "What brings you here?" — patient-intent entry points using everyday
 * language rather than clinical terms. Each maps to a verified specialty.
 *
 * Card photos in /images/care/ are free-licence stock images from Unsplash
 * (https://unsplash.com/license) and Pexels (https://www.pexels.com/license/) —
 * both allow commercial use with no attribution required — chosen to
 * illustrate each topic (Child Health and ENT use Indian subjects). They are
 * NOT Amaltas photographs. Source ids are noted per image so they can be
 * traced or replaced.
 */
const care = (file: string, alt: string) => ({ src: `/images/care/${file}.webp`, alt });
export const conditionCategories: ConditionCategory[] = [
  { slug: 'heart', label: 'Heart & Circulation', blurb: 'Chest pain, blood pressure, heart rhythm', icon: 'HeartPulse', specialtySlug: 'cardiology', image: care('heart', 'Anatomical model of the human heart'), focus: 'center 40%' }, // unsplash photo-1618939304347-e91b1f33d2ab
  { slug: 'brain-nerves', label: 'Brain & Nerves', blurb: 'Stroke, headaches, seizures, spine', icon: 'Brain', specialtySlug: 'neurosciences', image: care('brain-nerves', 'Anatomical model of the human brain'), focus: '60% center' }, // unsplash photo-1559757148-5c350d0d3c56
  { slug: 'cancer', label: 'Cancer Care', blurb: 'Screening, diagnosis & treatment', icon: 'Ribbon', specialtySlug: 'oncology', image: care('cancer', 'Person holding a pink cancer-awareness ribbon'), focus: '30% center' }, // unsplash photo-1769029259587-6821e9648570
  { slug: 'kidney-urinary', label: 'Kidney & Urinary', blurb: 'Kidney disease, stones, dialysis', icon: 'Droplets', specialtySlug: 'nephrology', image: care('kidney-urinary', 'Cross-section model of a kidney held in a hand'), focus: 'center' }, // unsplash photo-1559757175-9e351c9a1301
  { slug: 'digestive', label: 'Digestive & Liver', blurb: 'Stomach, liver, acidity, gallstones', icon: 'Activity', specialtySlug: 'gastroenterology', image: care('digestive', 'Person holding their stomach'), focus: '45% center' }, // unsplash photo-1769029174021-b305fa92f0ae
  { slug: 'bones-joints', label: 'Bones & Joints', blurb: 'Joint pain, fractures, replacements', icon: 'Bone', specialtySlug: 'orthopaedics', image: care('bones-joints', 'X-ray of a hand held up to a light box'), focus: 'center 35%' }, // unsplash photo-1530497610245-94d3c16cda28
  { slug: 'womens-health', label: "Women's Health", blurb: 'Pregnancy, gynaecology, fertility', icon: 'Baby', specialtySlug: 'obstetrics-gynaecology', image: care('womens-health', 'Expectant mother holding an ultrasound scan'), focus: 'center 55%' }, // unsplash photo-1654931800911-7a9cfb3b7c17
  { slug: 'child-health', label: 'Child Health', blurb: 'Newborn & children’s care', icon: 'Baby', specialtySlug: 'paediatrics-neonatology', image: care('child-health', 'Smiling Indian baby lying on a soft white sheet'), focus: '56% center' }, // pexels 3614108 (Subham Majumder)
  { slug: 'eye-care', label: 'Eye Care', blurb: 'Cataract, vision, eye conditions', icon: 'Eye', specialtySlug: 'ophthalmology', image: care('eye-care', 'Child looking into a phoropter during an eye test'), focus: 'center 40%' }, // unsplash photo-1539036776273-021ec1d78bec
  { slug: 'ent', label: 'Ear, Nose & Throat', blurb: 'Hearing, sinus, throat', icon: 'Ear', specialtySlug: 'ent', image: care('ent', "Doctor examining a young boy's ear with an otoscope"), focus: '40% center' }, // pexels 7179255 (Mike Sangma)
];
