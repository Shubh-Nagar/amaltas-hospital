import type { Specialty } from '@/types';

/**
 * Centres of Excellence / superspecialities.
 * Names & categories are grounded in Amaltas public listings. Condition and
 * treatment lists are GENERAL, standard-of-care medical knowledge for each
 * discipline (not Amaltas-specific outcome claims) and should be reviewed by a
 * clinician before launch. `verified:true` here means the DEPARTMENT exists at
 * Amaltas per public listings; per-item claims still follow the zero-fabrication
 * policy.
 */
export const specialties: Specialty[] = [
  {
    slug: 'cardiology',
    name: 'Cardiology & Cardiac Sciences',
    category: 'heart',
    icon: 'HeartPulse',
    tagline: 'Comprehensive heart & circulation care',
    description:
      'Diagnosis and management of heart and blood-vessel conditions, from prevention and medical therapy to interventional and emergency cardiac care.',
    conditions: ['Coronary artery disease', 'Heart attack (MI)', 'Heart failure', 'Arrhythmia', 'Hypertension', 'Valvular heart disease'],
    treatments: ['Coronary angiography', 'Angioplasty & stenting', 'Pacemaker implantation', 'Echocardiography', 'Cardiac rehabilitation'],
    facilitySlugs: ['icu', 'diagnostics', 'emergency'],
    featured: true,
    verified: true,
    faqs: [
      { question: 'Do you provide 24/7 emergency cardiac care?', answer: 'Emergency services operate 24/7. Call the toll-free line for immediate assistance and directions.' },
      { question: 'What should I bring to a cardiology consultation?', answer: 'Bring any previous ECG/echo reports, current medication list, and prior discharge summaries if available.' },
    ],
  },
  {
    slug: 'neurosciences',
    name: 'Neurology & Neurosurgery',
    category: 'brain-nerves',
    icon: 'Brain',
    tagline: 'Brain, spine & nervous system care',
    description:
      'A combined neurosciences programme covering neurology, neurosurgery and interventional neuroradiology for conditions affecting the brain, spine and nerves.',
    conditions: ['Stroke', 'Epilepsy', 'Headache & migraine', 'Parkinson’s disease', 'Spinal disorders', 'Head injury'],
    treatments: ['Stroke management', 'Neurosurgical procedures', 'Interventional neuroradiology', 'EEG & nerve conduction studies'],
    facilitySlugs: ['icu', 'emergency', 'operation-theatres', 'diagnostics'],
    featured: true,
    verified: true,
  },
  {
    slug: 'oncology',
    name: 'Cancer Care (Oncology)',
    category: 'cancer',
    icon: 'Ribbon',
    tagline: 'Medical, surgical & radiation oncology',
    description:
      'Multidisciplinary cancer care bringing together medical, surgical and radiation oncology with diagnostics and supportive services under one roof.',
    conditions: ['Breast cancer', 'Head & neck cancers', 'Gastrointestinal cancers', 'Lung cancer', 'Blood cancers'],
    treatments: ['Medical oncology (chemotherapy)', 'Surgical oncology', 'Radiation therapy', 'PET-based diagnostics (verify current availability)'],
    facilitySlugs: ['diagnostics', 'operation-theatres'],
    featured: true,
    verified: true,
  },
  {
    slug: 'nephrology',
    name: 'Nephrology & Kidney Care',
    category: 'kidney-urinary',
    icon: 'Droplets',
    tagline: 'Kidney health, dialysis & transplant care',
    description:
      'Care for acute and chronic kidney conditions, including dialysis support and evaluation for kidney transplantation.',
    conditions: ['Chronic kidney disease', 'Acute kidney injury', 'Kidney stones', 'Glomerular diseases'],
    treatments: ['Haemodialysis', 'Kidney transplant evaluation', 'Nephrology consultation'],
    facilitySlugs: ['diagnostics', 'icu'],
    featured: true,
    verified: true,
  },
  {
    slug: 'urology',
    name: 'Urology',
    category: 'kidney-urinary',
    icon: 'Stethoscope',
    tagline: 'Urinary tract & men’s health',
    description:
      'Medical and surgical management of the urinary tract and male reproductive system.',
    conditions: ['Kidney & ureteric stones', 'Prostate conditions', 'Urinary infections', 'Bladder disorders'],
    treatments: ['Endoscopic stone surgery', 'Prostate surgery', 'Urodynamic assessment'],
    verified: true,
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology & Liver Care',
    category: 'digestive',
    icon: 'Activity',
    tagline: 'Digestive & liver health',
    description:
      'Diagnosis and treatment of digestive-system and liver conditions, including endoscopic and surgical gastroenterology.',
    conditions: ['Acidity & GERD', 'Liver disease', 'Gallstones', 'Inflammatory bowel disease', 'Pancreatitis'],
    treatments: ['Diagnostic & therapeutic endoscopy', 'Surgical gastroenterology', 'Liver care'],
    verified: true,
  },
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics & Joint Care',
    category: 'bones-joints',
    icon: 'Bone',
    tagline: 'Bones, joints & mobility',
    description:
      'Care for bone, joint and musculoskeletal conditions, including joint replacement and arthroscopy.',
    conditions: ['Arthritis', 'Fractures', 'Joint pain', 'Sports injuries', 'Spine-related pain'],
    treatments: ['Joint replacement', 'Arthroscopy', 'Fracture fixation', 'Physiotherapy referral'],
    facilitySlugs: ['operation-theatres', 'diagnostics'],
    featured: true,
    verified: true,
  },
  {
    slug: 'obstetrics-gynaecology',
    name: 'Obstetrics & Gynaecology',
    category: 'womens-health',
    icon: 'Baby',
    tagline: 'Women’s health, pregnancy & fertility',
    description:
      'Care across women’s health — routine and high-risk pregnancy, gynaecological conditions and fertility support.',
    conditions: ['Pregnancy care', 'High-risk pregnancy', 'Menstrual disorders', 'Gynaecological conditions'],
    treatments: ['Antenatal care', 'Deliveries & C-section', 'Gynaecological surgery', 'Fertility evaluation'],
    facilitySlugs: ['operation-theatres', 'icu'],
    verified: true,
  },
  {
    slug: 'paediatrics-neonatology',
    name: 'Paediatrics & Neonatology',
    category: 'child-health',
    icon: 'Baby',
    tagline: 'Child & newborn care',
    description:
      'Comprehensive care for children and newborns, including neonatal intensive care support.',
    conditions: ['Childhood infections', 'Growth & nutrition', 'Newborn care', 'Paediatric emergencies'],
    treatments: ['Paediatric consultation', 'Neonatal intensive care (NICU)', 'Immunisation guidance'],
    facilitySlugs: ['icu', 'emergency'],
    verified: true,
  },
  {
    slug: 'ent',
    name: 'ENT (Otorhinolaryngology)',
    category: 'ent',
    icon: 'Ear',
    tagline: 'Ear, nose & throat care',
    description:
      'Medical and surgical treatment for ear, nose and throat conditions, supported by operating microscopes, diagnostic endoscopy and audiology.',
    conditions: ['Hearing problems', 'Sinusitis', 'Tonsil & throat conditions', 'Vertigo'],
    treatments: ['Endoscopic ENT surgery', 'Audiology assessment', 'Microscopic ear surgery'],
    verified: true,
  },
  {
    slug: 'ophthalmology',
    name: 'Ophthalmology (Eye Care)',
    category: 'eye-care',
    icon: 'Eye',
    tagline: 'Complete eye care',
    description:
      'Diagnosis and treatment of eye conditions, from routine vision care to surgical management.',
    conditions: ['Cataract', 'Refractive errors', 'Glaucoma', 'Diabetic eye disease'],
    treatments: ['Cataract surgery', 'Vision assessment', 'Medical eye care'],
    verified: true,
  },
  {
    slug: 'general-medicine',
    name: 'General Medicine',
    category: 'general',
    icon: 'Stethoscope',
    tagline: 'Everyday & complex adult medicine',
    description:
      'First point of care for adults — diagnosis and management of common and complex medical conditions, with referral to superspecialities when needed.',
    conditions: ['Fever & infections', 'Diabetes', 'Hypertension', 'Respiratory illness', 'General health concerns'],
    treatments: ['Consultation & diagnosis', 'Chronic disease management', 'Preventive health guidance'],
    verified: true,
  },
];
