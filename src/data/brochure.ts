import type { Bilingual, BrochureCare, BrochureProgramme, BrochureTest } from '@/types';

/**
 * Facts from the printed hospital brochure ("अब अमलतास में सुपर स्पेशलिटी
 * सेवाओं के अंतर्गत"). Hindi text is as printed; English is a translation.
 * Lines that were unreadable in the scanned copy are left out rather than
 * guessed.
 */

/* ------------------------------------------------------------------ */
/* Contact & round-the-clock services                                  */
/* ------------------------------------------------------------------ */

export const brochureContact = {
  /** "24x7 Helpline No." */
  helplines: ['07272-482500', '+91 97524 47834', '+91 97524 67451'],
  /** "आपातकालीन चिकित्सा और ट्रामा सेन्टर के लिए सम्पर्क करें" */
  emergencyTrauma: '+91 97524 47827',
  website: 'www.amaltasgroup.co.in',
} as const;

/** Units pictured on the brochure cover, plus NICU/PICU from the child-care panel. */
export const brochureIcus = ['Neuro ICU', 'MICU (Medical ICU)', 'Cardiac ICU', 'SICU (Surgical ICU)', 'NICU (Newborn ICU)', 'PICU (Paediatric ICU)'];

/** Services the brochure lists as available 24x7. */
export const brochure24x7: Bilingual[] = [
  ['Emergency & Trauma Centre', 'आपातकालीन चिकित्सा और ट्रामा सेन्टर'],
  ['Ambulance', 'एंबुलेंस'],
  ['Blood Centre', 'ब्लड सेंटर'],
  ['Helpline', 'हेल्पलाइन'],
];

/* ------------------------------------------------------------------ */
/* Insurance & schemes                                                 */
/* ------------------------------------------------------------------ */

export const brochureSchemes: Bilingual[] = [
  ['Ayushman Bharat', 'आयुष्मान भारत'],
  ['ESIC (Employees’ State Insurance Corporation)', 'कर्मचारी राज्य बीमा निगम (ESIC)'],
  ['ECHS (Ex-Servicemen Contributory Health Scheme)', 'ई.सी.एच.एस. (ECHS)'],
  ['Police Swasthya Suraksha Yojana', 'पुलिस स्वास्थ्य सुरक्षा योजना'],
  ['RBSK (Rashtriya Bal Swasthya Karyakram)', 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)'],
  ['Janani Sahyogi Suraksha Yojana', 'जननी सहयोगी सुरक्षा योजना'],
  ['District Blindness Control Society', 'जिला अंधत्व निवारण समिति'],
  ['Drug-Resistant Tuberculosis programme', 'ड्रग रेसिस्टेंट ट्यूबरक्लोसिस'],
];

/** "मेडीक्लेम कैशलेस (सभी प्रकार के मेडीक्लेम सुविधा)" */
export const brochureMediclaim: Bilingual = ['Cashless mediclaim — all types of mediclaim are supported.', 'मेडीक्लेम कैशलेस — सभी प्रकार की मेडीक्लेम सुविधा उपलब्ध है।'];

/* ------------------------------------------------------------------ */
/* Tests ("उपलब्ध स्वास्थ्य जाँचे")                                     */
/* ------------------------------------------------------------------ */

const radiology = [
  'MRI', 'CT Scan', 'Fluoroscopy', 'Mammography', 'X-Ray (DR & CR systems)', 'ECG', 'EEG / EMG', 'Endoscopy',
  'Diagnostic Laparoscopy', 'Colour Doppler', 'Ultrasonography', 'PET Scan', 'PFT (lung function test)', 'Echocardiography',
];

const pathology = [
  'Biopsy', 'Thyroid Profile', 'Hormone Test', 'RBC (blood test)', 'FNAC', 'Stool Test', 'RT-PCR', 'Vitamin B12', 'Cancer Test',
  'Microbiology', 'CRP', 'HIV / ELISA', 'HBsAg', 'HCV (card test) / ELISA', 'Widal Test', 'Malaria Antigen', 'Microscopy',
  'Culture & Sensitivity', 'Biochemistry', 'Renal Profile (RFT)', 'Liver Profile', 'Diabetic Profile', 'Lipid Profile',
  'CKMB (quantitative)', 'Troponin-I (quantitative)', 'CRP (quantitative)', 'Haematology', 'CBC', 'PT / INR',
  'BT (bleeding time)', 'CT (clotting time)', 'ESR', 'Clinical Pathology', 'Urine Examination (routine)', 'UPT (urine pregnancy test)',
];

export const brochureTests: BrochureTest[] = [
  ...radiology.map((name) => ({ name, category: 'radiology' as const })),
  ...pathology.map((name) => ({ name, category: 'pathology' as const })),
];

/* ------------------------------------------------------------------ */
/* Detail for existing website specialties                             */
/* ------------------------------------------------------------------ */

const treats: Bilingual = ['Care available for', 'उपलब्ध इलाज'];
const surgeries: Bilingual = ['Surgeries & procedures', 'ऑपरेशन और प्रक्रियाएँ'];
const available: Bilingual = ['Facilities', 'उपलब्ध सुविधा'];

export const brochureCare: BrochureCare[] = [
  {
    specialtySlugs: ['cardiology'],
    sections: [
      {
        label: surgeries,
        items: [
          ['Bypass surgery', 'बाईपास ऑपरेशन'],
          ['Angiography', 'एन्जियोग्राफी'],
          ['Angioplasty & primary angioplasty', 'एन्जियोप्लास्टी व प्राइमरी एंजियोप्लास्टी'],
          ['Valve surgery', 'वॉल्व सर्जरी'],
          ['Heart surgery for children', 'बच्चों की हृदय शल्य चिकित्सा'],
          ['Hole-in-the-heart surgery for children', 'बच्चों के हृदय का छेद का ऑपरेशन'],
        ],
      },
      { label: available, items: [['Cath lab, ECHO, ECG and all other cardiac facilities', 'कैथ लैब, ECHO, ECG, सभी प्रकार की सुविधा']] },
    ],
  },
  {
    specialtySlugs: ['oncology'],
    sections: [
      {
        label: treats,
        items: [
          ['Mouth cancer', 'मुंह का कैंसर'], ['Breast cancer', 'ब्रेस्ट कैंसर'], ['Lung cancer', 'फेफड़ों का कैंसर'],
          ['Throat cancer', 'गले का कैंसर'], ['Liver cancer', 'लिवर का कैंसर'], ['Pancreatic cancer', 'पैनक्रियास का कैंसर'],
          ['Uterine cancer', 'यूटेरस का कैंसर'], ['Kidney cancer', 'गुर्दे का कैंसर'], ['Anal & colon cancer', 'गुदा और कोलन का कैंसर'],
          ['Prostate cancer', 'प्रोस्टेट कैंसर'], ['Ovarian cancer', 'ओवरी का कैंसर'], ['Skin cancer', 'त्वचा का कैंसर'],
        ],
      },
      {
        label: available,
        items: [['Cancer surgery', 'कैंसर सर्जरी'], ['Chemotherapy', 'कीमोथेरेपी'], ['Mammography', 'मेमोग्राफी'], ['Biopsy test', 'बायोप्सी टेस्ट'], ['All cancer care facilities', 'कैंसर रोग की सभी सुविधा']],
      },
    ],
  },
  {
    specialtySlugs: ['neurosciences'],
    sections: [
      {
        label: treats,
        items: [
          ['Brain diseases', 'दिमाग की बीमारी'], ['Head injury', 'सिर की चोट (हेड इंजुरी)'], ['Brain tumour', 'ब्रेन ट्यूमर'],
          ['Brain haemorrhage', 'ब्रेन हेमरेज'], ['Severe facial pain', 'चेहरे पर तीव्र दर्द'], ['Epilepsy (seizures)', 'मिर्गी'],
          ['Enlarged head / fluid in the head in children', 'बच्चों के सिर का बड़ा होना / पानी भरना'], ['Lump on the lower back in children', 'बच्चों के कमर में गठान'],
          ['Neck & back pain', 'गर्दन एवं कमर में दर्द'], ['Spine tumour', 'स्पाइन ट्यूमर'], ['Headache', 'सिरदर्द'], ['Paralysis', 'लकवा'],
        ],
      },
    ],
  },
  {
    specialtySlugs: ['paediatrics-neonatology'],
    sections: [
      {
        label: treats,
        items: [
          ['Vomiting, diarrhoea & anaemia', 'उल्टी, दस्त, एनीमिया'], ['Brain fever & seizures', 'मस्तिष्क ज्वर, दौरे (मिर्गी)'], ['Jaundice', 'पीलिया रोग'],
          ['Pneumonia, TB & asthma', 'निमोनिया, टीबी, अस्थमा'], ['Malnutrition & congenital diseases', 'कुपोषण, जन्मजात बिमारियाँ'], ['Intestinal infections', 'आँतों का इन्फेक्शन'],
          ['Dengue, malaria & typhoid', 'डेंगू, मलेरिया, टायफाइड'], ['Allergies & skin diseases', 'एलर्जी एवं चर्मरोग'],
          ['Kidney swelling, stones and urinary blockage', 'गुर्दों में सूजन, पथरी एवं पेशाब के रास्ते में रुकावट का इलाज'],
        ],
      },
      {
        label: surgeries,
        items: [
          ['Newborn surgery', 'नवजात शिशु की सर्जरी'],
          ['Keyhole (endoscopic) surgery of the airway, chest and abdomen', 'दूरबीन द्वारा सांस की नली, छाती व पेट के ऑपरेशन'],
          ['Spine surgery & neurosurgery for children', 'बच्चों की रीढ़ की हड्डी तथा न्यूरोसर्जरी'],
        ],
      },
      { label: available, items: [['All vaccinations & nebulisation', 'समस्त टीकाकरण एवं नेबुलाइजेशन'], ['NICU, PICU & general ward', 'NICU, PICU एवं जनरल वार्ड']] },
    ],
  },
  {
    specialtySlugs: ['ophthalmology'],
    sections: [
      {
        label: surgeries,
        items: [
          ['Cataract surgery', 'मोतियाबिंद का ऑपरेशन'], ['Glaucoma surgery', 'काला मोतियाबिंद, कांचबिन्द का आपरेशन'], ['Pterygium surgery', 'आँखो के नाखुना का ऑपरेशन'],
          ['Tear-duct (nasoor) surgery', 'आँखों के नासूर का ऑपरेशन'], ['Squint surgery', 'आँखों के तिरछेपन एवं भेंगेपन का आपरेशन'],
          ['Surgery for inward/outward-turning eyelids', 'पलकों का अन्दर और बाहर आना का आपरेशन'], ['Eyelid paralysis', 'पलक का लकवा'], ['Cornea transplant', 'कॉर्निया प्रत्यारोपण'],
        ],
      },
      {
        label: ['Eye tests', 'आँखों की जाँच'],
        items: [
          ['Retina examination with modern equipment', 'आधुनिक मशीन द्वारा परदे की जाँच'],
          ['Tests for long- and short-sightedness (glasses number)', 'आँखों के नम्बर — दूर दृष्टि दोष या निकट दृष्टि दोष की जाँच'],
          ['Complete eye scan by A-scan & B-scan', 'ए-स्कैन एवं बी-स्कैन द्वारा आँखों की सम्पूर्ण मोनोग्राफी'],
        ],
      },
    ],
  },
  {
    specialtySlugs: ['ent'],
    sections: [
      {
        label: treats,
        items: [
          ['Sneezing', 'छींक आना'], ['Blocked or runny nose', 'बंद नाक या बहती नाक'], ['Itching or burning in the nose', 'नाक में खुजली या जलन'],
          ['Watery nasal discharge', 'नाक से पानी जैसा स्राव'], ['Loss of smell and taste', 'गंध और स्वाद की कमी'], ['Sore or painful throat', 'गले में खराश या दर्द'],
          ['Difficulty speaking', 'बोलने में कठिनाई'], ['Throat swelling', 'गले में सूजन'], ['Difficulty swallowing', 'निगलने में कठिनाई'],
          ['Ear pain', 'कान में दर्द'], ['Ringing in the ear (tinnitus)', 'कान में बजना (टिनिटस)'], ['Hearing loss', 'सुनने में कमी'],
          ['Ear discharge', 'कान बहना'], ['Itching or burning in the ear', 'कान में खुजली या जलन'],
        ],
      },
    ],
  },
  {
    specialtySlugs: ['urology', 'nephrology'],
    sections: [
      {
        label: treats,
        items: [
          ['Stones in the urinary tract', 'पेशाब के रास्ते पथरी की शिकायत'],
          ['Urine leakage when getting up, straining, coughing or sneezing', 'उठने-बैठने, जोर लगाने, खासने-छींकने से मूत्र उत्सर्जन होना'],
          ['Enlarged prostate', 'प्रोस्टेट का बढ़ना'],
          ['Burning urine, blocked urine and stones', 'पेशाब में जलन, पेशाब रुकना एवं पथरी की शिकायत'],
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Programmes without a website specialty page                         */
/* ------------------------------------------------------------------ */

export const brochureProgrammes: BrochureProgramme[] = [
  {
    slug: 'de-addiction',
    name: ['Amaltas De-addiction Centre', 'अमलतास नशा मुक्ति केन्द्र'],
    short: ['De-addiction', 'नशा मुक्ति'],
    roleTopic: 'psychiatry',
    sections: [
      {
        label: ['Helps with', 'इन समस्याओं में मदद'],
        items: [
          ['Feeling low or depressed', 'मन का उदास रहना'], ['Losing interest in work', 'काम में मन ना लगना'],
          ['Constant cravings', 'हर समय नशे के ख्याल रहना'], ['Paralysis', 'लकवा मार जाना'],
          ['Seizures from heavy substance use', 'अत्यधिक नशे के कारण मिर्गी का आना'], ['Family conflict & financial loss', 'पारिवारिक कलह एवं आर्थिक हानि होना'],
        ],
      },
      {
        label: available,
        items: [
          ['Admission for patients', 'नशे के मरीज को भर्ती करने की सुविधा'], ['Spirituality, yoga, meditation & exercise', 'आध्यात्म, योगा, ध्यान, व्यायाम'],
          ['Discipline & group therapy', 'अनुशासन व सामूहिक चिकित्सा पद्धति'], ['Stay, meals and an air-conditioned hospital', 'मरीज के रहना, खाना, वातानुकूलित हॉस्पिटल सुविधा'],
          ['Indoor games — carrom, chess and more', 'इनडोर गेम्स, कैरम, शतरंज आदि'], ['24-hour pick-up of the patient from home', 'रोगी को घर से लाने की 24 घंटे सुविधा'],
        ],
      },
    ],
  },
  {
    slug: 'ivf',
    name: ['Amaltas IVF Centre', 'अमलतास आईवीएफ (IVF) सेन्टर'],
    short: ['IVF', 'आईवीएफ'],
    specialtySlugs: ['obstetrics-gynaecology'],
    sections: [
      {
        label: treats,
        items: [
          ['Low sperm count', 'कम शुक्राणु'], ['Nil sperm count', 'निल शुक्राणु'], ['Low sperm motility', 'धीमी गतिशील शुक्राणु'], ['Poor sperm quality', 'खराब गुणवत्ता'],
          ['Irregular periods', 'अनियमित पीरियड'], ['Adenomyosis', 'एडिनोमायोसिस'], ['Blocked fallopian tubes & egg problems', 'बंद फेलोपियन ट्यूब, अण्डे में खराबी'],
          ['Uterine fibroids & PCOS', 'गर्भाशय में रसोली, PCOS'], ['Endometriosis', 'एंडोमेट्रियोसिस'],
        ],
      },
      {
        label: available,
        items: [['IUI, IVF, ICSI, IMSI, ERA, PGT', 'IUI, IVF, ICSI, IMSI, ERA, PGT'], ['Laser hatching', 'लेज़र हैचिंग'], ['Donor cycle', 'डोनर साइकिल'], ['TESA, PESA', 'TESA, PESA']],
      },
    ],
  },
  {
    slug: 'skin',
    name: ['Skin & Dermatology Care', 'चर्म एवं स्किन रोग सुविधा'],
    short: ['Skin', 'त्वचा'],
    roleTopic: 'dermatology',
    sections: [
      {
        label: treats,
        items: [
          ['Skin diseases', 'चर्म रोग'], ['Sexually transmitted diseases', 'यौन रोग'], ['Cosmetic skin concerns', 'सौंदर्य रोग'], ['Acne & pimples', 'कील मुंहासे'],
          ['Hair transplant', 'बाल प्रत्यारोपण (Hair Transplant)'], ['Spots, marks & pits', 'दाग, धब्बे, गड्ढे'], ['Laser removal of unwanted hair', 'अनचाहे बालों का लेज़र से निदान इलाज'],
          ['Vitiligo (white patches) — surgery or medicines', 'सफेद दाग की सर्जरी / दवाइयों द्वारा इलाज'], ['Ringworm & itching', 'दाद, दाग, खुजली'],
          ['Warts & moles', 'मस्से, तिल'], ['Nail problems', 'नाखूनों की समस्या'], ['Wrinkles', 'झुर्रियां'],
        ],
      },
    ],
  },
  {
    slug: 'tb',
    name: ['TB (Tuberculosis) Care', 'टी.बी. / क्षय रोग सुविधा'],
    short: ['TB', 'टीबी'],
    roleTopic: 'respiratory',
    sections: [
      {
        label: ['Symptoms we see', 'लक्षण'],
        items: [
          ['Fever', 'बुखार'], ['Tiredness', 'थकान'], ['Chest pain', 'सीने में दर्द'], ['Breathlessness', 'सांस फूलना'],
          ['Persistent cough', 'लगातार खांसी'], ['Weight loss', 'वजन घटना'], ['Loss of appetite', 'भूख में कमी'], ['Blood in phlegm', 'बलगम में खून आना'],
        ],
      },
    ],
  },
  {
    slug: 'special-school',
    name: ['Amaltas Special School', 'अमलतास स्पेशल स्कूल'],
    short: ['Special school', 'स्पेशल स्कूल'],
    intro: ['A school for children with special needs.', 'विशेष आवश्यकता वाले बच्चों का विद्यालय।'],
    sections: [
      {
        label: ['Programmes', 'कार्यक्रम'],
        items: [
          ['Occupational therapy', 'ऑक्यूपेशनल थेरेपी'], ['Special education programme', 'विशेष शिक्षा प्रोग्राम'], ['Arts & activities', 'कला और गतिविधियाँ'],
          ['Vocational training programme', 'व्यावसायिक प्रशिक्षण प्रोग्राम'], ['Developmental training programme', 'डेवलपमेंटल प्रशिक्षण प्रोग्राम'],
          ['Autism — special learning programme for hyperactive children', 'ऑटिस्म (अति चंचल बच्चों के लिए स्पेशल लर्निंग प्रोग्राम)'], ['Music & dance therapy', 'म्यूजिक एण्ड डांस थेरेपी'],
          ['Speech therapy, physiotherapy & psychotherapy', 'स्पीचथेरेपी / फिजियोथेरेपी / सायकोथेरेपी'], ['Support for physical & mental disabilities', 'शारीरिक एवं मानसिक दिव्यांग'],
        ],
      },
      { label: available, items: [['Bus, meals and hostel', 'बस सुविधा, भोजन सुविधा, होस्टल सुविधा']] },
    ],
  },
  {
    slug: 'spine',
    name: ['Spine Care', 'स्पाइन — रीढ़ की हड्डी की सुविधा'],
    short: ['Spine', 'स्पाइन'],
    specialtySlugs: ['neurosciences'],
    sections: [
      {
        label: treats,
        items: [
          ['Cervical spondylitis', 'सर्वाइकल स्पोंडिलाइटिस'], ['Difficulty walking or speaking', 'चलने व बोलने में परेशानी'], ['Neck & back pain', 'गर्दन व कमर में दर्द होना'],
          ['Head injury / brain tumour', 'सिर की चोट / ब्रेन ट्यूमर'], ['Brain haemorrhage', 'दिमाग की नस फटना'], ['Fainting & numbness', 'बेहोशी आना, सुन्न होना'],
          ['Muscle weakness', 'मांसपेशी में कमजोरी'], ['Tingling or burning', 'झनझनाहट / जलन'], ['Spinal infection', 'स्पाइनल संक्रमण'],
          ['Paralysis, epilepsy & stroke', 'फालिज, मिर्गी, लकवा'], ['Spinal tumour', 'स्पाइनल ट्यूमर'], ['Spinal TB', 'स्पाइनल टी.बी.'],
          ['Slip disc', 'स्लिप डिस्क'], ['Deformity from birth', 'जन्म से विकलांगता'], ['Facial deviation', 'चेहरे में टेढ़ापन'],
        ],
      },
    ],
  },
  {
    slug: 'burns-plastic',
    name: ['Burns & Plastic Surgery', 'बर्न एवं प्लास्टिक रोग की संपूर्ण सुविधा'],
    short: ['Plastic surgery', 'प्लास्टिक सर्जरी'],
    roleTopic: 'plastic',
    sections: [
      {
        label: treats,
        items: [
          ['Fractures of the face & jaw bones', 'चेहरे एवं जबड़े की हड्डी फ्रैक्चर'], ['Vitiligo (white patches)', 'सफेद दाग'],
          ['Deformities of the nose, ear & face', 'नाक कान एवं चेहरे की विकृतियाँ'], ['Deformities after burns', 'जलने के बाद की विकृतियाँ'],
          ['Deformities after accidents', 'एक्सिडेंट के बाद की विकृतियाँ'], ['Crooked nasal bone', 'नाक की हड्डी का टेढ़ापन'],
          ['Tattoo removal', 'टैटू हटवाना'], ['Burns, cuts & burn surgery', 'जले, कटे एवं बर्न सर्जरी'],
        ],
      },
    ],
  },
  {
    slug: 'physiotherapy',
    name: ['Physiotherapy', 'फिजियो थेरेपी'],
    short: ['Physiotherapy', 'फिजियो थेरेपी'],
    specialtySlugs: ['orthopaedics'],
    sections: [{ label: available, items: [['All types of physiotherapy services', 'सभी प्रकार की फिजियो थेरेपी सेवाएं']] }],
  },
];

export const brochureCareFor = (specialtySlug: string) => brochureCare.filter((c) => c.specialtySlugs.includes(specialtySlug));
