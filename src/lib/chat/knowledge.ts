/**
 * Riya's knowledge base — compiled from the SAME src/data/* modules the pages
 * render, so the assistant can only ever say what the website says. Facts that
 * live directly in page components (Patients, Emergency, Academics, the
 * appointment flow) are mirrored in `pageFacts` with a pointer to the source.
 *
 * Zero-fabrication: records marked `verified:false` and "[CONTENT REQUIRES
 * VERIFICATION]" notes are never surfaced as plain claims — see `clean()` and
 * the qualifiers added by the engine.
 */
import { site, accreditations } from '@/data/site';
import { specialties } from '@/data/specialties';
import { services } from '@/data/services';
import { facilities } from '@/data/facilities';
import { doctors } from '@/data/doctors';
import { articles } from '@/data/articles';
import type { Doctor, Facility, Service, Specialty } from '@/types';
import { bestMatchLength, compile, normalize } from './text';

export { site, accreditations, specialties, services, facilities, doctors, articles };

/** Strips internal verification markers so they never reach patients. */
export function clean(text: string): string {
  return text
    .replace(/\s*\[CONTENT REQUIRES VERIFICATION\][^.]*(\.|$)/gi, '')
    .replace(/\s*\[[^\]]*verif[^\]]*\]\.?/gi, '')
    .replace(/\s*\((?:verify|confirm)[^)]*\)/gi, '')
    .trim();
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${site.address.line1} ${site.address.city}`,
)}`;

/** Facts rendered by page components rather than data files. */
export const pageFacts = {
  // src/pages/AppointmentPage.tsx — 4-step request flow, confirmed by phone.
  appointmentPath: '/patients/appointment',
  // src/pages/EmergencyPage.tsx
  emergencyPath: '/patients/emergency',
  // src/pages/PatientsPage.tsx — insurance & packages listed, details unverified.
  patientsPath: '/patients',
  // src/pages/AcademicsPage.tsx
  academicsPath: '/academics',
  // src/data/articles.ts — "How to Prepare for Your First Hospital Consultation"
  guideSlug: 'preparing-for-first-consultation',
};

export const hospitalAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.state} ${site.address.postalCode}`;
export const cityOfficeAddress = `${site.cityOffice.line1}, ${site.cityOffice.line2}, ${site.cityOffice.city} ${site.cityOffice.postalCode}`;

/* ------------------------------------------------------------------ */
/* Specialties                                                         */
/* ------------------------------------------------------------------ */

/** Everyday / Hindi / Hinglish words patients use for each department. */
const specialtySynonyms: Record<string, string[]> = {
  cardiology: ['heart', 'cardiac', 'cardio*', 'dil', 'hriday', 'bp', 'blood pressure', 'chest pain', 'angioplasty', 'angiography', 'pacemaker', 'ecg', 'echo', 'दिल', 'हृदय', 'हार्ट', 'कार्डियो*', 'बीपी'],
  neurosciences: ['neuro*', 'brain', 'nerve*', 'spine', 'spinal', 'stroke', 'paralysis', 'lakwa', 'migraine', 'headache', 'sir dard', 'seizure*', 'mirgi', 'epilepsy', 'dimag', 'दिमाग', 'मस्तिष्क', 'न्यूरो*', 'लकवा', 'मिर्गी', 'सिरदर्द', 'सिर दर्द', 'रीढ*', 'नस*'],
  oncology: ['cancer', 'oncolog*', 'oncologist', 'tumour', 'tumor', 'chemo*', 'kark', 'कैंसर', 'ट्यूमर', 'कीमो*'],
  nephrology: ['kidney*', 'renal', 'nephro*', 'gurda', 'gurde', 'किडनी', 'गुर्द*'],
  urology: ['urolog*', 'urine', 'urinary', 'prostate', 'bladder', 'stone', 'stones', 'pathri', 'peshab', 'पथरी', 'पेशाब', 'मूत्र*', 'प्रोस्टेट'],
  gastroenterology: ['gastro*', 'stomach', 'liver', 'acidity', 'gas', 'digest*', 'pet', 'pait', 'jigar', 'endoscopy', 'पेट', 'लिवर', 'लीवर', 'जिगर', 'एसिडिटी', 'पाचन', 'गैस'],
  orthopaedics: ['ortho*', 'bone*', 'joint*', 'knee', 'knees', 'hip', 'fracture*', 'arthritis', 'haddi', 'jod', 'ghutna', 'ghutne', 'हड्डी', 'हड्डियों', 'जोड*', 'घुटन*', 'घुटने', 'फ्रैक्चर', 'ऑर्थो*'],
  'obstetrics-gynaecology': ['gynae*', 'gyne*', 'gyno*', 'gynec*', 'obstetric*', 'pregnan*', 'delivery', 'women', 'woman', 'womens', 'maternity', 'fertility', 'periods', 'garbh*', 'prasav', 'mahila', 'गर्भ*', 'प्रसव', 'डिलीवरी', 'महिला*', 'स्त्री रोग', 'प्रेग्नेंसी'],
  'paediatrics-neonatology': ['paediatric*', 'pediatric*', 'child', 'children', 'childs', 'kid', 'kids', 'baby', 'babies', 'newborn*', 'neonat*', 'nicu', 'bachcha', 'bachche', 'bacche', 'bache', 'bachha', 'shishu', 'बच्च*', 'शिशु', 'नवजात'],
  ent: ['ent', 'ear', 'ears', 'nose', 'throat', 'sinus*', 'tonsil*', 'hearing', 'kaan', 'naak', 'gala', 'gale', 'कान', 'नाक', 'गला', 'गले'],
  ophthalmology: ['eye', 'eyes', 'eyesight', 'vision', 'cataract', 'ophthalm*', 'glaucoma', 'aankh', 'ankh', 'aankhon', 'motiyabind', 'आंख*', 'मोतियाबिंद', 'चश्म*'],
  'general-medicine': ['general medicine', 'general physician', 'physician', 'fever', 'diabetes', 'sugar', 'bukhar', 'infection', 'cold', 'cough', 'बुखार', 'शुगर', 'मधुमेह', 'सर्दी', 'खांसी'],
};

/** Short label used in quick replies, e.g. "Cardiology doctors". */
export function shortName(s: Specialty): string {
  return s.name.split(/ & | \(/)[0].trim();
}

const stripParens = (t: string) => t.replace(/\([^)]*\)/g, '').trim();

const specialtyIndex = specialties.map((s) => ({
  item: s,
  keys: compile([
    s.name,
    shortName(s),
    s.slug.replace(/-/g, ' '),
    ...s.conditions.map(stripParens),
    ...(specialtySynonyms[s.slug] ?? []),
  ]),
}));

/* ------------------------------------------------------------------ */
/* Services & facilities                                               */
/* ------------------------------------------------------------------ */

const serviceSynonyms: Record<string, string[]> = {
  'diagnostics-pathology': ['diagnostic*', 'pathology', 'lab', 'labs', 'laboratory', 'blood test*', 'test', 'tests', 'jaanch', 'janch', 'जांच', 'टेस्ट', 'लैब', 'पैथोलॉजी'],
  'radiology-imaging': ['radiology', 'imaging', 'x ray', 'xray', 'ct', 'ct scan', 'mri', 'ultrasound', 'sonography', 'scan', 'scans', 'एक्स रे', 'सीटी', 'एमआरआई', 'स्कैन', 'सोनोग्राफी', 'अल्ट्रासाउंड'],
  'radiation-oncology': ['radiation', 'radiotherapy', 'रेडिएशन'],
  dialysis: ['dialysis', 'haemodialysis', 'hemodialysis', 'डायलिसिस'],
  pharmacy: ['pharmacy', 'chemist', 'medical store', 'dawa ki dukan', 'dawai ki dukan', 'दवा की दुकान', 'फार्मेसी', 'मेडिकल स्टोर'],
  'blood-centre': ['blood bank', 'blood centre', 'blood center', 'blood donation', 'donate blood', 'ब्लड बैंक', 'रक्त*'],
};

const serviceIndex = services
  .filter((s) => serviceSynonyms[s.slug])
  .map((s) => ({ item: s, keys: compile([s.name, ...serviceSynonyms[s.slug]]) }));

const facilitySynonyms: Record<string, string[]> = {
  icu: ['icu', 'icus', 'intensive care', 'critical care', 'आईसीयू'],
  'operation-theatres': ['operation theatre*', 'operation theater*', 'ot', 'ots', 'operating room*', 'ऑपरेशन थिएटर'],
  'wards-rooms': ['ward', 'wards', 'room', 'rooms', 'bed', 'beds', 'private room', 'general ward', 'kamra', 'kamre', 'कमरा', 'कमरे', 'वार्ड', 'बेड'],
};

const facilityIndex = facilities
  .filter((f) => facilitySynonyms[f.slug])
  .map((f) => ({ item: f, keys: compile([f.name, ...facilitySynonyms[f.slug]]) }));

/* ------------------------------------------------------------------ */
/* Doctors                                                             */
/* ------------------------------------------------------------------ */

const nameTokens = (d: Doctor) =>
  normalize(d.name.replace(/^dr\.?\s*/i, ''))
    .trim()
    .split(' ')
    .filter((t) => t.length >= 3);

const doctorIndex = doctors.map((d) => ({ item: d, tokens: nameTokens(d) }));

/**
 * Doctor "topics" that are not website specialties but appear in doctor roles
 * (e.g. dermatologist, psychiatrist). `match` tests role + qualifications.
 */
export const roleTopics = [
  { id: 'dermatology', keys: compile(['dermatolog*', 'skin', 'twacha', 'चर्म*', 'त्वचा']), match: /dermatolog|dvl/i },
  { id: 'psychiatry', keys: compile(['psychiatr*', 'mental health', 'depression', 'anxiety', 'addiction', 'de addiction', 'nasha', 'मानसिक', 'नशा*', 'डिप्रेशन']), match: /psychiatr|de-addiction/i },
  { id: 'dental', keys: compile(['dentist*', 'dental', 'teeth', 'tooth', 'daant', 'dant', 'दांत', 'डेंटिस्ट', 'maxillofacial', 'jaw']), match: /dentist|bds|maxillofacial/i },
  { id: 'plastic', keys: compile(['plastic surg*', 'plastic', 'cosmetic', 'burn', 'burns', 'प्लास्टिक']), match: /plastic/i },
  { id: 'pain', keys: compile(['pain specialist', 'pain management', 'pain clinic']), match: /pain/i },
  { id: 'respiratory', keys: compile(['respiratory', 'lung', 'lungs', 'asthma', 'pulmonolog*', 'chest physician', 'फेफड*', 'दमा']), match: /respiratory/i },
  { id: 'neurosurgery', keys: compile(['neurosurg*']), match: /neurosurg/i },
] as const;

export type RoleTopicId = (typeof roleTopics)[number]['id'];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

function best<T>(norm: string, index: { item: T; keys: string[] }[]): { item: T; score: number } | null {
  let top: { item: T; score: number } | null = null;
  for (const e of index) {
    const score = bestMatchLength(norm, e.keys);
    if (score > 0 && (!top || score > top.score)) top = { item: e.item, score };
  }
  return top;
}

export const findSpecialty = (norm: string) => best<Specialty>(norm, specialtyIndex);
export const findService = (norm: string) => best<Service>(norm, serviceIndex);
export const findFacility = (norm: string) => best<Facility>(norm, facilityIndex);

export function findRoleTopic(norm: string) {
  return best(norm, roleTopics.map((t) => ({ item: t, keys: [...t.keys] })))?.item ?? null;
}

/**
 * Returns every doctor tied for the most name tokens found in the message —
 * one result is a match, several means the name was ambiguous ("Dr. Ankit").
 */
export function findDoctors(norm: string, among?: string[]): Doctor[] {
  let top = 0;
  let hits: Doctor[] = [];
  for (const { item, tokens } of doctorIndex) {
    if (among && !among.includes(item.slug)) continue;
    const score = tokens.filter((t) => norm.includes(` ${t} `)).length;
    if (score === 0 || score < top) continue;
    if (score > top) {
      top = score;
      hits = [];
    }
    hits.push(item);
  }
  return hits;
}

export const doctorBySlug = (slug: string) => doctors.find((d) => d.slug === slug);
export const specialtyBySlug = (slug: string) => specialties.find((s) => s.slug === slug);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const facilityBySlug = (slug: string) => facilities.find((f) => f.slug === slug);

export const doctorsIn = (slug: string) => doctors.filter((d) => d.specialtySlugs.includes(slug));
export const doctorsForRole = (re: RegExp) => doctors.filter((d) => re.test(`${d.role ?? ''} ${d.qualifications}`));

export function latestUpdates(limit = 3) {
  return articles
    .filter((a) => a.kind !== 'article')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    // The same story can be published as both news and an event.
    .filter((a, i, all) => all.findIndex((b) => b.title === a.title) === i)
    .slice(0, limit)
    .map((a) => ({ title: a.title, href: `/${a.kind === 'news' ? 'news' : 'events'}/${a.slug}` }));
}

export const guideArticle = articles.find((a) => a.slug === pageFacts.guideSlug);

/** Plain-text list items from an article's `<li>` elements. */
export function articleListItems(html: string): string[] {
  return [...html.matchAll(/<li>(.*?)<\/li>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
}
