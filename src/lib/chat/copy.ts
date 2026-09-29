/**
 * Every sentence Riya can say, in English, Hindi and Hinglish. Templates only
 * wrap website facts passed in as arguments — no medical content lives here.
 * Hindi names/summaries for departments and services are translations of the
 * copy in src/data/*, kept alongside so they stay in step.
 */
import type { Lang } from './types';
import type { RoleTopicId } from './knowledge';

export const specialtyHi: Record<string, { name: string; description: string }> = {
  cardiology: { name: 'हृदय रोग विभाग (Cardiology)', description: 'हृदय और रक्त-वाहिकाओं से जुड़ी बीमारियों की जाँच और इलाज — रोकथाम और दवाओं से लेकर इंटरवेंशनल और आपातकालीन कार्डियक केयर तक।' },
  neurosciences: { name: 'न्यूरोलॉजी और न्यूरोसर्जरी', description: 'मस्तिष्क, रीढ़ और नसों से जुड़ी बीमारियों के लिए न्यूरोलॉजी, न्यूरोसर्जरी और इंटरवेंशनल न्यूरोरेडियोलॉजी का संयुक्त कार्यक्रम।' },
  oncology: { name: 'कैंसर उपचार (Oncology)', description: 'मेडिकल, सर्जिकल और रेडिएशन ऑन्कोलॉजी के साथ जाँच और सहायक सेवाएँ — सब एक ही छत के नीचे।' },
  nephrology: { name: 'नेफ्रोलॉजी और किडनी केयर', description: 'किडनी की अचानक और लंबी बीमारियों का इलाज, जिसमें डायलिसिस सहायता और किडनी ट्रांसप्लांट के लिए मूल्यांकन शामिल है।' },
  urology: { name: 'यूरोलॉजी (मूत्र रोग)', description: 'मूत्र मार्ग और पुरुष प्रजनन तंत्र से जुड़ी समस्याओं का दवा और सर्जरी से इलाज।' },
  gastroenterology: { name: 'गैस्ट्रोएंटरोलॉजी और लिवर केयर', description: 'पाचन तंत्र और लिवर की बीमारियों की जाँच और इलाज, जिसमें एंडोस्कोपी और सर्जिकल गैस्ट्रोएंटरोलॉजी शामिल हैं।' },
  orthopaedics: { name: 'ऑर्थोपेडिक्स (हड्डी और जोड़)', description: 'हड्डियों, जोड़ों और मांसपेशियों से जुड़ी समस्याओं का इलाज, जिसमें जॉइंट रिप्लेसमेंट और आर्थ्रोस्कोपी शामिल हैं।' },
  'obstetrics-gynaecology': { name: 'प्रसूति एवं स्त्री रोग', description: 'महिलाओं के स्वास्थ्य की पूरी देखभाल — सामान्य और हाई-रिस्क प्रेग्नेंसी, स्त्री रोग और फर्टिलिटी सहायता।' },
  'paediatrics-neonatology': { name: 'शिशु एवं बाल रोग (Paediatrics)', description: 'बच्चों और नवजात शिशुओं की संपूर्ण देखभाल, जिसमें नवजात गहन चिकित्सा (NICU) सहायता शामिल है।' },
  ent: { name: 'नाक, कान, गला (ENT)', description: 'कान, नाक और गले की समस्याओं का दवा और सर्जरी से इलाज — ऑपरेटिंग माइक्रोस्कोप, डायग्नोस्टिक एंडोस्कोपी और ऑडियोलॉजी की सहायता से।' },
  ophthalmology: { name: 'नेत्र रोग (Eye Care)', description: 'आँखों की समस्याओं की जाँच और इलाज — सामान्य दृष्टि जाँच से लेकर सर्जरी तक।' },
  'general-medicine': { name: 'जनरल मेडिसिन', description: 'वयस्कों के लिए इलाज का पहला पड़ाव — आम और जटिल बीमारियों की जाँच और इलाज, और ज़रूरत पड़ने पर सुपर-स्पेशियलिटी विभाग में रेफ़रल।' },
};

export const serviceHi: Record<string, { name: string; summary: string; expect?: string[] }> = {
  'emergency-trauma': { name: 'इमरजेंसी और ट्रॉमा केयर', summary: '24/7 आपातकालीन और पॉलीट्रॉमा देखभाल, त्वरित ट्राइएज के साथ।', expect: ['पहुँचते ही तुरंत ट्राइएज', 'स्थिरीकरण और क्रिटिकल-केयर सहायता', 'जाँच की त्वरित सुविधा', 'ज़रूरत के अनुसार भर्ती या रेफ़रल'] },
  'diagnostics-pathology': { name: 'डायग्नोस्टिक्स और पैथोलॉजी', summary: 'सटीक और समय पर रिपोर्ट के लिए लैब पैथोलॉजी सेवाएँ।', expect: ['सैंपल कलेक्शन', 'लैब में जाँच', 'डॉक्टर के लिए तैयार, समय पर रिपोर्ट'] },
  'radiology-imaging': { name: 'रेडियोलॉजी और एडवांस्ड इमेजिंग', summary: 'सटीक निदान के लिए एडवांस्ड इमेजिंग।', expect: ['डॉक्टर की सलाह के अनुसार इमेजिंग', 'रेडियोलॉजी टीम द्वारा रिपोर्टिंग'] },
  'radiation-oncology': { name: 'रेडिएशन ऑन्कोलॉजी', summary: 'संपूर्ण कैंसर उपचार के हिस्से के रूप में सटीक रेडिएशन थेरेपी।' },
  dialysis: { name: 'डायलिसिस', summary: 'किडनी मरीज़ों के लिए हीमोडायलिसिस सहायता।' },
  pharmacy: { name: 'फार्मेसी', summary: 'भर्ती और ओपीडी मरीज़ों की ज़रूरतों के लिए कैंपस में फार्मेसी।' },
  'blood-centre': { name: 'ब्लड सेंटर', summary: 'ब्लड बैंक और ट्रांसफ्यूज़न सहायता।' },
  ambulance: { name: 'एम्बुलेंस सेवाएँ', summary: 'आपातकालीन मरीज़ परिवहन।' },
};

export const facilityHi: Record<string, { name: string; summary: string }> = {
  emergency: { name: 'इमरजेंसी और कैजुअल्टी', summary: 'त्वरित ट्राइएज और क्रिटिकल-केयर सुविधा के साथ 24/7 आपातकालीन विभाग।' },
  icu: { name: 'गहन चिकित्सा इकाइयाँ (ICU)', summary: 'सभी विभागों के गंभीर मरीज़ों के लिए क्रिटिकल-केयर यूनिट।' },
  'operation-theatres': { name: 'ऑपरेशन थिएटर', summary: 'सर्जिकल और सुपर-स्पेशियलिटी प्रक्रियाओं के लिए मॉड्यूलर ऑपरेशन थिएटर।' },
  diagnostics: { name: 'डायग्नोस्टिक्स और लैब', summary: 'पैथोलॉजी, इमेजिंग और जाँच सेवाएँ एक ही छत के नीचे।' },
  pharmacy: { name: 'फार्मेसी', summary: 'मरीज़ों और आगंतुकों के लिए कैंपस में फार्मेसी।' },
  'blood-centre': { name: 'ब्लड सेंटर', summary: 'सर्जरी और इमरजेंसी के लिए ब्लड बैंक और ट्रांसफ्यूज़न सहायता।' },
  'wards-rooms': { name: 'वार्ड और कमरे', summary: 'मरीज़ों की ज़रूरत के अनुसार अलग-अलग श्रेणियों के जनरल वार्ड और कमरे।' },
};

export interface Copy {
  ui: {
    launcher: string;
    launcherHint: string;
    /** Speech bubble shown when hovering Riya's photo: [headline, line]. */
    hoverGreeting: [string, string];
    title: string;
    subtitle: string;
    minimise: string;
    close: string;
    input: string;
    placeholder: string;
    send: string;
    typing: string;
    language: string;
    disclaimer: (phone: string) => string;
    newMessage: string;
  };
  greeting: string[];
  defaultSuggestions: string[];
  langSwitched: string;
  link: {
    call: (n: string) => string;
    directions: string;
    contact: string;
    emergency: string;
    book: string;
    doctors: string;
    specialties: string;
    services: string;
    facilities: string;
    patients: string;
    about: string;
    academics: string;
    email: string;
    profile: (name: string) => string;
    page: (name: string) => string;
    guide: string;
  };
  emergency: { head: (n: string) => string; body: string; where: (a: string) => string; ambulance: string };
  appointment: {
    intro: string;
    steps: string[];
    note: (n: string) => string;
    forDoctor: (doctor: string, specialty: string) => string;
    doctorByPhone: (doctor: string) => string;
    forSpecialty: (specialty: string) => string;
  };
  hours: { emergency: string; notPublished: (a: string, b: string) => string; doctor: (d: string) => string; doctorListed: (d: string, t: string) => string };
  contact: { intro: string; tollFree: string; phone: string; landline: string; email: string; hospital: string; office: string; doctorNote: (d: string) => string };
  insurance: (n: string) => string[];
  cost: (n: string) => string;
  packages: (n: string) => string;
  guide: { intro: string; outro: string };
  accreditation: { nabh: string; pending: string };
  about: (name: string, academic: string, acres: string) => string[];
  academics: (academic: string, email: string) => string[];
  news: string;
  doctors: {
    overview: (n: number) => string;
    otherRoles: string;
    askMore: string;
    inSpecialty: (s: string) => string;
    noneInSpecialty: (s: string) => string;
    andMore: (n: number) => string;
    role: (label: string) => string;
    roleLabels: Record<RoleTopicId, string>;
    ambiguous: string;
  };
  profile: { role: string; qualifications: string; department: string; experience: (y: number) => string; expertise: string; languages: string; timings: string };
  specialty: { symptom: (s: string) => string; conditions: string; treatments: string; doctorCount: (n: number) => string; faqs: string; facilities: string };
  lists: { specialties: string; services: string; facilities: string; open247: string };
  caveat: { unverified: string; radiology: string; wards: string };
  advice: { decline: string; department: (s: string) => string; urgent: (n: string) => string };
  whoami: string[];
  thanks: string;
  bye: string;
  ack: string;
  moreWhat: string;
  notFound: string;
  mightHelp: string;
  fallbackContact: (n: string) => string;
  suggest: {
    doctorsOf: (s: string) => string;
    about: (s: string) => string;
    bookWith: (d: string) => string;
    book: string;
    contact: string;
    hours: string;
    departments: string;
    services: string;
    doctors: string;
    insurance: string;
    emergency: string;
    guide: string;
  };
}

const en: Copy = {
  ui: {
    launcher: 'Chat with Riya, our virtual assistant',
    launcherHint: 'Need help? Ask Riya',
    hoverGreeting: ['Hi, I’m Riya! 👋', 'How can I help you today?'],
    title: 'Riya',
    subtitle: 'Amaltas Hospital Assistant',
    minimise: 'Minimise chat',
    close: 'Close chat and clear conversation',
    input: 'Type your message',
    placeholder: 'Ask about doctors, appointments…',
    send: 'Send message',
    typing: 'Riya is typing…',
    language: 'Chat language',
    disclaimer: (n) => `Riya shares information from this website only — not medical advice. Emergency? Call ${n}.`,
    newMessage: 'New message from Riya',
  },
  greeting: [
    'Hi, I’m **Riya**! 👋 How can I help you today?',
    'I can help with doctors, departments, appointments, services and contact details. You can chat with me in English, हिन्दी or Hinglish.',
  ],
  defaultSuggestions: ['Find a doctor', 'Book an appointment', 'Visiting hours', 'Departments', 'Location & contact', 'Insurance & billing'],
  langSwitched: 'Sure — I’ll reply in English from now on. How can I help?',
  link: {
    call: (n) => `Call ${n}`,
    directions: 'Get directions',
    contact: 'Contact page',
    emergency: 'Emergency page',
    book: 'Book an appointment',
    doctors: 'Find a doctor',
    specialties: 'All specialties',
    services: 'All services',
    facilities: 'All facilities',
    patients: 'Patients & Visitors',
    about: 'About Amaltas',
    academics: 'Academics',
    email: 'Email admissions',
    profile: (name) => `${name}’s profile`,
    page: (name) => `${name} page`,
    guide: 'Read the patient guide',
  },
  emergency: {
    head: (n) => `🚨 **If this is a medical emergency, please call ${n} right away.**`,
    body: 'Our Emergency & Casualty department is open **24/7**, with support for accidents and serious injuries (trauma & polytrauma), backed by critical care.',
    where: (a) => `📍 ${a}`,
    ambulance: 'For ambulance help, call the same toll-free number.',
  },
  appointment: {
    intro: 'You can request an appointment online in 4 simple steps:',
    steps: [
      'Choose a **specialty**',
      'Choose a **doctor** (optional — or let us assign the right specialist)',
      'Pick a **preferred date** and time of day (morning, afternoon or evening)',
      'Enter your **name and phone number**',
    ],
    note: (n) => `This is a **request**, not a confirmed booking — our team will call you to confirm a time. For urgent needs, call ${n}.`,
    forDoctor: (d, s) => `To see **${d}**, choose **${s}** in step 1 and select them in step 2.`,
    doctorByPhone: (d) => `**${d}** isn’t linked to a specialty in the online form, so please call the hospital to book with them.`,
    forSpecialty: (s) => `For **${s}**, just pick it in step 1.`,
  },
  hours: {
    emergency: 'Our **Emergency department is open 24/7**.',
    notPublished: (a, b) => `Regular visiting hours and OPD timings aren’t published on our website yet. Please call **${a}** or **${b}** to check current timings before you visit.`,
    doctor: (d) => `Consultation timings for **${d}** aren’t listed on the website.`,
    doctorListed: (d, t) => `Consultation for **${d}**: ${t}`,
  },
  contact: {
    intro: 'Here’s how to reach Amaltas Hospital:',
    tollFree: '📞 Toll-free',
    phone: '📱 Phone',
    landline: '☎️ Landline',
    email: '✉️ Email',
    hospital: '🏥 Hospital',
    office: '🏢 Indore City Office',
    doctorNote: (d) => `Doctors’ direct numbers aren’t listed on the website — please call the hospital and ask for **${d}**.`,
  },
  insurance: (n) => [
    'Our Patients & Visitors page mentions **insurance and cashless scheme support**, but the website doesn’t yet list the accepted insurance companies, TPAs or government schemes.',
    'Ayushman Bharat (PM-JAY) is also mentioned, but its details are still being confirmed.',
    `Please call **${n}** to confirm your insurance or scheme before your visit or admission.`,
  ],
  cost: (n) => `Fees and charges — such as consultation fees, treatment costs and room charges — aren’t published on our website. Please call **${n}** for current charges.`,
  packages: (n) => `Preventive **health check packages** are mentioned on our website, but package details and prices aren’t published yet. Please call **${n}** to ask about them.`,
  guide: { intro: 'Here’s what our patient guide suggests bringing to your first consultation:', outro: 'If you are visiting for someone else, bring their documents and, where possible, come with them.' },
  accreditation: {
    nabh: 'Amaltas Institute of Medical Sciences is **NABH-accredited** (National Accreditation Board for Hospitals & Healthcare Providers).',
    pending: 'NABL (laboratory) accreditation and Ayushman Bharat empanelment are also mentioned on the site, but their status is still being confirmed.',
  },
  about: (name, academic, acres) => [
    `**${name}** (${academic}) is a NABH-accredited multi-superspeciality hospital in Dewas, Madhya Pradesh, on a ${acres}-acre campus.`,
    'It offers care across Heart, Neuroscience, Cancer, Nephrology, Orthopaedics and more, with 24/7 emergency care — and combines patient care with medical education.',
  ],
  academics: (academic, email) => [
    `**${academic}** offers medical education alongside patient care.`,
    `Course lists, intake, fees and admission details aren’t published on the website yet — please email **${email}** for admissions.`,
  ],
  news: 'Here are the latest updates from Amaltas:',
  doctors: {
    overview: (n) => `Our website lists **${n} doctors**. Here’s how they’re spread across departments:`,
    otherRoles: 'Other departments & roles',
    askMore: 'Ask me about a department (e.g. “orthopaedics doctors”) or a doctor by name.',
    inSpecialty: (s) => `Doctors listed under **${s}**:`,
    noneInSpecialty: (s) => `The website doesn’t list individual doctors under **${s}** yet. You can still request an appointment — our team will assign the right specialist.`,
    andMore: (n) => `…and ${n} more on the Doctors page.`,
    role: (label) => `Doctors on our website for **${label}**:`,
    roleLabels: {
      dermatology: 'skin care (dermatology)',
      psychiatry: 'psychiatry & de-addiction',
      dental: 'dental & maxillofacial care',
      plastic: 'plastic surgery',
      pain: 'pain management',
      respiratory: 'respiratory medicine',
      neurosurgery: 'neurosurgery',
    },
    ambiguous: 'I found more than one doctor with that name — which one did you mean?',
  },
  profile: {
    role: 'Role',
    qualifications: 'Qualifications',
    department: 'Department',
    experience: (y) => `${y}+ years of experience`,
    expertise: 'Expertise',
    languages: 'Languages',
    timings: 'Consultation timings aren’t listed on the website — please call to confirm availability.',
  },
  specialty: {
    symptom: (s) => `Our **${s}** department handles concerns like this. Please consult a doctor for a proper diagnosis.`,
    conditions: 'Common conditions',
    treatments: 'Treatments & procedures',
    doctorCount: (n) => (n === 1 ? '1 doctor is listed in this department.' : `${n} doctors are listed in this department.`),
    faqs: 'Frequently asked',
    facilities: 'Supported by',
  },
  lists: {
    specialties: 'Here are our specialties and centres of excellence:',
    services: 'Here are the services listed on our website:',
    facilities: 'Here are our facilities:',
    open247: '24/7',
  },
  caveat: {
    unverified: 'Details of this service are still being confirmed — please call the hospital before your visit.',
    radiology: 'The website doesn’t list specific scan types or equipment — please call to check if a particular scan is available.',
    wards: 'Room categories, prices and the number of beds aren’t published on the website yet.',
  },
  advice: {
    decline: 'I’m sorry, I can’t give medical advice, diagnoses or medicine suggestions. 🙏 Please consult a doctor — I can help you find the right department or request an appointment.',
    department: (s) => `For concerns like this, our **${s}** department may be able to help.`,
    urgent: (n) => `If symptoms are severe or sudden, call **${n}** (24/7 emergency) immediately.`,
  },
  whoami: [
    'I’m **Riya**, Amaltas Hospital’s virtual assistant. 😊',
    'I can help with doctors, departments, appointments, services, facilities and contact details — using information from our website. I can’t give medical advice.',
  ],
  thanks: 'You’re welcome! 😊 Is there anything else I can help you with?',
  bye: 'Take care! 💚 If you need anything else, I’m right here.',
  ack: 'Great! Let me know if there’s anything else I can help with.',
  moreWhat: 'Sure — what would you like to know more about?',
  notFound: 'I’m sorry, I couldn’t find that on our website. 🙏',
  mightHelp: 'These pages might help:',
  fallbackContact: (n) => `For anything else, please call **${n}** or visit our Contact page.`,
  suggest: {
    doctorsOf: (s) => `${s} doctors`,
    about: (s) => `Tell me more about ${s}`,
    bookWith: (d) => `Book with ${d}`,
    book: 'Book an appointment',
    contact: 'Location & contact',
    hours: 'Visiting hours',
    departments: 'Departments',
    services: 'Services',
    doctors: 'Find a doctor',
    insurance: 'Insurance & billing',
    emergency: 'Emergency',
    guide: 'What should I bring?',
  },
};

const hi: Copy = {
  ui: {
    launcher: 'रिया से बात करें, हमारी वर्चुअल असिस्टेंट',
    launcherHint: 'मदद चाहिए? रिया से पूछें',
    hoverGreeting: ['नमस्ते, मैं रिया हूँ! 👋', 'आज मैं आपकी क्या मदद कर सकती हूँ?'],
    title: 'रिया',
    subtitle: 'अमलतास हॉस्पिटल असिस्टेंट',
    minimise: 'चैट छोटा करें',
    close: 'चैट बंद करें और बातचीत मिटाएँ',
    input: 'अपना संदेश लिखें',
    placeholder: 'डॉक्टर, अपॉइंटमेंट के बारे में पूछें…',
    send: 'संदेश भेजें',
    typing: 'रिया लिख रही है…',
    language: 'चैट की भाषा',
    disclaimer: (n) => `रिया केवल इस वेबसाइट की जानकारी देती है — यह चिकित्सा सलाह नहीं है। इमरजेंसी में ${n} पर कॉल करें।`,
    newMessage: 'रिया का नया संदेश',
  },
  greeting: [
    'नमस्ते, मैं **रिया** हूँ! 👋 आज मैं आपकी क्या मदद कर सकती हूँ?',
    'मैं डॉक्टर, विभाग, अपॉइंटमेंट, सेवाओं और संपर्क की जानकारी में आपकी मदद कर सकती हूँ। आप मुझसे English, हिन्दी या Hinglish में बात कर सकते हैं।',
  ],
  defaultSuggestions: ['डॉक्टर खोजें', 'अपॉइंटमेंट कैसे बुक करें?', 'मिलने का समय', 'विभाग', 'पता और संपर्क', 'बीमा और बिलिंग'],
  langSwitched: 'ज़रूर — अब से मैं हिन्दी में जवाब दूँगी। बताइए, मैं क्या मदद करूँ?',
  link: {
    call: (n) => `${n} पर कॉल करें`,
    directions: 'रास्ता देखें',
    contact: 'संपर्क पेज',
    emergency: 'इमरजेंसी पेज',
    book: 'अपॉइंटमेंट बुक करें',
    doctors: 'डॉक्टर खोजें',
    specialties: 'सभी विभाग',
    services: 'सभी सेवाएँ',
    facilities: 'सभी सुविधाएँ',
    patients: 'मरीज़ और आगंतुक',
    about: 'अमलतास के बारे में',
    academics: 'शिक्षा (Academics)',
    email: 'एडमिशन के लिए ईमेल करें',
    profile: (name) => `${name} की प्रोफ़ाइल`,
    page: (name) => `${name} पेज`,
    guide: 'मरीज़ गाइड पढ़ें',
  },
  emergency: {
    head: (n) => `🚨 **अगर यह मेडिकल इमरजेंसी है, तो तुरंत ${n} पर कॉल करें।**`,
    body: 'हमारा इमरजेंसी और कैजुअल्टी विभाग **24/7 खुला** रहता है — दुर्घटना और गंभीर चोटों (ट्रॉमा और पॉलीट्रॉमा) के लिए, क्रिटिकल केयर की सहायता के साथ।',
    where: (a) => `📍 ${a}`,
    ambulance: 'एम्बुलेंस सहायता के लिए भी इसी टोल-फ्री नंबर पर कॉल करें।',
  },
  appointment: {
    intro: 'आप 4 आसान चरणों में ऑनलाइन अपॉइंटमेंट का अनुरोध कर सकते हैं:',
    steps: [
      '**विभाग (specialty)** चुनें',
      '**डॉक्टर** चुनें (वैकल्पिक — या हम सही विशेषज्ञ तय कर देंगे)',
      '**पसंदीदा तारीख** और समय चुनें (सुबह, दोपहर या शाम)',
      'अपना **नाम और फ़ोन नंबर** दर्ज करें',
    ],
    note: (n) => `यह केवल एक **अनुरोध** है, पक्की बुकिंग नहीं — हमारी टीम समय तय करने के लिए आपको कॉल करेगी। ज़रूरी हो तो ${n} पर कॉल करें।`,
    forDoctor: (d, s) => `**${d}** से मिलने के लिए चरण 1 में **${s}** चुनें और चरण 2 में उनका नाम चुनें।`,
    doctorByPhone: (d) => `**${d}** ऑनलाइन फ़ॉर्म में किसी विभाग से जुड़े नहीं हैं, इसलिए उनसे मिलने के लिए कृपया हॉस्पिटल में कॉल करें।`,
    forSpecialty: (s) => `**${s}** के लिए चरण 1 में इसे चुनें।`,
  },
  hours: {
    emergency: 'हमारा **इमरजेंसी विभाग 24/7 खुला** रहता है।',
    notPublished: (a, b) => `मिलने का समय (visiting hours) और OPD का समय अभी वेबसाइट पर उपलब्ध नहीं है। आने से पहले कृपया **${a}** या **${b}** पर कॉल करके समय पता कर लें।`,
    doctor: (d) => `**${d}** के परामर्श का समय वेबसाइट पर नहीं दिया गया है।`,
    doctorListed: (d, t) => `**${d}** से परामर्श: ${t}`,
  },
  contact: {
    intro: 'अमलतास हॉस्पिटल से संपर्क करने के तरीके:',
    tollFree: '📞 टोल-फ्री',
    phone: '📱 फ़ोन',
    landline: '☎️ लैंडलाइन',
    email: '✉️ ईमेल',
    hospital: '🏥 हॉस्पिटल',
    office: '🏢 इंदौर सिटी ऑफ़िस',
    doctorNote: (d) => `डॉक्टरों के सीधे नंबर वेबसाइट पर नहीं दिए गए हैं — कृपया हॉस्पिटल में कॉल करके **${d}** के बारे में पूछें।`,
  },
  insurance: (n) => [
    'हमारे मरीज़ और आगंतुक पेज पर **बीमा और कैशलेस योजना सहायता** का उल्लेख है, लेकिन स्वीकार की जाने वाली बीमा कंपनियों, TPA या सरकारी योजनाओं की सूची अभी वेबसाइट पर नहीं है।',
    'आयुष्मान भारत (PM-JAY) का भी उल्लेख है, लेकिन इसकी जानकारी की अभी पुष्टि की जा रही है।',
    `आने या भर्ती होने से पहले कृपया **${n}** पर कॉल करके अपने बीमा या योजना की पुष्टि कर लें।`,
  ],
  cost: (n) => `फ़ीस और शुल्क — जैसे परामर्श शुल्क, इलाज का खर्च और कमरे का किराया — वेबसाइट पर नहीं दिए गए हैं। वर्तमान शुल्क के लिए कृपया **${n}** पर कॉल करें।`,
  packages: (n) => `वेबसाइट पर **हेल्थ चेकअप पैकेज** का उल्लेख है, लेकिन पैकेज की जानकारी और कीमतें अभी उपलब्ध नहीं हैं। जानकारी के लिए **${n}** पर कॉल करें।`,
  guide: { intro: 'हमारी मरीज़ गाइड के अनुसार पहले परामर्श में ये चीज़ें साथ लाएँ:', outro: 'अगर आप किसी और के लिए आ रहे हैं, तो उनके दस्तावेज़ लाएँ और हो सके तो उन्हें साथ लेकर आएँ।' },
  accreditation: {
    nabh: 'अमलतास इंस्टीट्यूट ऑफ़ मेडिकल साइंसेज़ **NABH से मान्यता प्राप्त** है (National Accreditation Board for Hospitals & Healthcare Providers)।',
    pending: 'NABL (लैब) मान्यता और आयुष्मान भारत का भी वेबसाइट पर उल्लेख है, लेकिन उनकी स्थिति की अभी पुष्टि की जा रही है।',
  },
  about: (name, academic, acres) => [
    `**${name}** (${academic}) देवास, मध्य प्रदेश में स्थित एक NABH-मान्यता प्राप्त मल्टी-सुपरस्पेशियलिटी हॉस्पिटल है, जिसका कैंपस ${acres} एकड़ में फैला है।`,
    'यहाँ हृदय, न्यूरो, कैंसर, किडनी, हड्डी रोग और अन्य विभागों में इलाज होता है, 24/7 इमरजेंसी सुविधा है — और मरीज़ों की देखभाल के साथ मेडिकल शिक्षा भी दी जाती है।',
  ],
  academics: (academic, email) => [
    `**${academic}** मरीज़ों की देखभाल के साथ-साथ मेडिकल शिक्षा भी प्रदान करता है।`,
    `कोर्स, सीटें, फ़ीस और एडमिशन की जानकारी अभी वेबसाइट पर नहीं है — एडमिशन के लिए कृपया **${email}** पर ईमेल करें।`,
  ],
  news: 'अमलतास की ताज़ा ख़बरें:',
  doctors: {
    overview: (n) => `हमारी वेबसाइट पर **${n} डॉक्टर** सूचीबद्ध हैं। विभाग के अनुसार:`,
    otherRoles: 'अन्य विभाग और पद',
    askMore: 'किसी विभाग (जैसे “हड्डी के डॉक्टर”) या डॉक्टर के नाम से पूछें।',
    inSpecialty: (s) => `**${s}** में सूचीबद्ध डॉक्टर:`,
    noneInSpecialty: (s) => `वेबसाइट पर अभी **${s}** में किसी डॉक्टर का नाम नहीं है। आप फिर भी अपॉइंटमेंट का अनुरोध कर सकते हैं — हमारी टीम सही विशेषज्ञ तय करेगी।`,
    andMore: (n) => `…और ${n} डॉक्टर, डॉक्टर पेज पर देखें।`,
    role: (label) => `वेबसाइट पर **${label}** के डॉक्टर:`,
    roleLabels: {
      dermatology: 'त्वचा रोग (Dermatology)',
      psychiatry: 'मानसिक रोग और नशा मुक्ति',
      dental: 'दाँत और मैक्सिलोफेशियल',
      plastic: 'प्लास्टिक सर्जरी',
      pain: 'दर्द प्रबंधन (Pain management)',
      respiratory: 'श्वसन रोग (Respiratory)',
      neurosurgery: 'न्यूरोसर्जरी',
    },
    ambiguous: 'इस नाम के एक से ज़्यादा डॉक्टर हैं — आप किनके बारे में पूछ रहे हैं?',
  },
  profile: {
    role: 'पद',
    qualifications: 'योग्यता',
    department: 'विभाग',
    experience: (y) => `${y}+ वर्षों का अनुभव`,
    expertise: 'विशेषज्ञता',
    languages: 'भाषाएँ',
    timings: 'परामर्श का समय वेबसाइट पर नहीं दिया गया है — कृपया कॉल करके उपलब्धता पता करें।',
  },
  specialty: {
    symptom: (s) => `ऐसी समस्याओं के लिए हमारा **${s}** विभाग है। सही जाँच के लिए कृपया डॉक्टर से परामर्श लें।`,
    conditions: 'मुख्य बीमारियाँ',
    treatments: 'इलाज और प्रक्रियाएँ',
    doctorCount: (n) => `इस विभाग में ${n} डॉक्टर सूचीबद्ध हैं।`,
    faqs: 'अक्सर पूछे जाने वाले सवाल',
    facilities: 'सहायक सुविधाएँ',
  },
  lists: {
    specialties: 'हमारे विभाग और सेंटर ऑफ़ एक्सीलेंस:',
    services: 'वेबसाइट पर दी गई सेवाएँ:',
    facilities: 'हमारी सुविधाएँ:',
    open247: '24/7',
  },
  caveat: {
    unverified: 'इस सेवा की जानकारी की अभी पुष्टि की जा रही है — आने से पहले कृपया हॉस्पिटल में कॉल कर लें।',
    radiology: 'वेबसाइट पर स्कैन के प्रकार या मशीनों की सूची नहीं है — किसी ख़ास स्कैन के लिए कृपया कॉल करके पूछें।',
    wards: 'कमरों की श्रेणियाँ, किराया और बेड की संख्या अभी वेबसाइट पर नहीं दी गई है।',
  },
  advice: {
    decline: 'माफ़ कीजिए, मैं चिकित्सा सलाह, निदान या दवा के सुझाव नहीं दे सकती। 🙏 कृपया डॉक्टर से परामर्श लें — मैं सही विभाग खोजने या अपॉइंटमेंट में आपकी मदद कर सकती हूँ।',
    department: (s) => `ऐसी समस्याओं के लिए हमारा **${s}** विभाग मदद कर सकता है।`,
    urgent: (n) => `अगर लक्षण गंभीर या अचानक हैं, तो तुरंत **${n}** (24/7 इमरजेंसी) पर कॉल करें।`,
  },
  whoami: [
    'मैं **रिया** हूँ, अमलतास हॉस्पिटल की वर्चुअल असिस्टेंट। 😊',
    'मैं वेबसाइट की जानकारी के आधार पर डॉक्टर, विभाग, अपॉइंटमेंट, सेवाओं, सुविधाओं और संपर्क के बारे में मदद कर सकती हूँ। मैं चिकित्सा सलाह नहीं दे सकती।',
  ],
  thanks: 'आपका स्वागत है! 😊 क्या मैं और कुछ मदद कर सकती हूँ?',
  bye: 'अपना ख़याल रखें! 💚 कभी भी ज़रूरत हो, मैं यहीं हूँ।',
  ack: 'बढ़िया! और कुछ जानना हो तो बताइए।',
  moreWhat: 'ज़रूर — आप किस बारे में और जानना चाहेंगे?',
  notFound: 'माफ़ कीजिए, यह जानकारी हमारी वेबसाइट पर नहीं मिली। 🙏',
  mightHelp: 'ये पेज मददगार हो सकते हैं:',
  fallbackContact: (n) => `किसी और जानकारी के लिए कृपया **${n}** पर कॉल करें या हमारा संपर्क पेज देखें।`,
  suggest: {
    doctorsOf: (s) => `${s} के डॉक्टर`,
    about: (s) => `${s} के बारे में और बताइए`,
    bookWith: (d) => `${d} से अपॉइंटमेंट`,
    book: 'अपॉइंटमेंट कैसे बुक करें?',
    contact: 'पता और संपर्क',
    hours: 'मिलने का समय',
    departments: 'विभाग',
    services: 'सेवाएँ',
    doctors: 'डॉक्टर खोजें',
    insurance: 'बीमा और बिलिंग',
    emergency: 'इमरजेंसी',
    guide: 'क्या साथ लाना है?',
  },
};

const hinglish: Copy = {
  ui: {
    launcher: 'Riya se baat karein, hamari virtual assistant',
    launcherHint: 'Madad chahiye? Riya se poochein',
    hoverGreeting: ['Namaste, main Riya hoon! 👋', 'Aaj main aapki kya madad kar sakti hoon?'],
    title: 'Riya',
    subtitle: 'Amaltas Hospital Assistant',
    minimise: 'Chat chhota karein',
    close: 'Chat band karein aur baatcheet clear karein',
    input: 'Apna message likhein',
    placeholder: 'Doctor, appointment ke baare mein poochein…',
    send: 'Message bhejein',
    typing: 'Riya likh rahi hai…',
    language: 'Chat ki bhasha',
    disclaimer: (n) => `Riya sirf is website ki jaankari deti hai — yeh medical advice nahi hai. Emergency mein ${n} par call karein.`,
    newMessage: 'Riya ka naya message',
  },
  greeting: [
    'Namaste, main **Riya** hoon! 👋 Aaj main aapki kya madad kar sakti hoon?',
    'Main doctors, departments, appointment, services aur contact details mein help kar sakti hoon. Aap mujhse English, हिन्दी ya Hinglish mein baat kar sakte hain.',
  ],
  defaultSuggestions: ['Doctor dhundhna hai', 'Appointment kaise book karein?', 'Visiting hours kya hain?', 'Departments kaunse hain?', 'Address aur contact', 'Insurance aur billing'],
  langSwitched: 'Bilkul — ab se main Hinglish mein reply karungi. Bataiye, kya madad karun?',
  link: {
    call: (n) => `${n} par call karein`,
    directions: 'Directions dekhein',
    contact: 'Contact page',
    emergency: 'Emergency page',
    book: 'Appointment book karein',
    doctors: 'Doctor dhundhein',
    specialties: 'Saare departments',
    services: 'Saari services',
    facilities: 'Saari facilities',
    patients: 'Patients & Visitors',
    about: 'Amaltas ke baare mein',
    academics: 'Academics',
    email: 'Admissions ko email karein',
    profile: (name) => `${name} ki profile`,
    page: (name) => `${name} page`,
    guide: 'Patient guide padhein',
  },
  emergency: {
    head: (n) => `🚨 **Agar yeh medical emergency hai, toh turant ${n} par call karein.**`,
    body: 'Hamara Emergency & Casualty department **24/7 khula** rehta hai — accident aur serious injuries (trauma & polytrauma) ke liye, critical care support ke saath.',
    where: (a) => `📍 ${a}`,
    ambulance: 'Ambulance help ke liye bhi isi toll-free number par call karein.',
  },
  appointment: {
    intro: 'Aap 4 aasaan steps mein online appointment request kar sakte hain:',
    steps: [
      '**Specialty** chunein',
      '**Doctor** chunein (optional — ya hum sahi specialist assign kar denge)',
      '**Preferred date** aur time chunein (morning, afternoon ya evening)',
      'Apna **naam aur phone number** daalein',
    ],
    note: (n) => `Yeh sirf ek **request** hai, confirmed booking nahi — hamari team time confirm karne ke liye aapko call karegi. Urgent ho toh ${n} par call karein.`,
    forDoctor: (d, s) => `**${d}** se milne ke liye step 1 mein **${s}** chunein aur step 2 mein unka naam select karein.`,
    doctorByPhone: (d) => `**${d}** online form mein kisi specialty se linked nahi hain, isliye unse milne ke liye please hospital mein call karein.`,
    forSpecialty: (s) => `**${s}** ke liye bas step 1 mein ise chunein.`,
  },
  hours: {
    emergency: 'Hamara **Emergency department 24/7 khula** rehta hai.',
    notPublished: (a, b) => `Visiting hours aur OPD timings abhi website par available nahi hain. Aane se pehle please **${a}** ya **${b}** par call karke timings confirm kar lein.`,
    doctor: (d) => `**${d}** ki consultation timings website par nahi di gayi hain.`,
    doctorListed: (d, t) => `**${d}** se consultation: ${t}`,
  },
  contact: {
    intro: 'Amaltas Hospital se contact karne ke tareeke:',
    tollFree: '📞 Toll-free',
    phone: '📱 Phone',
    landline: '☎️ Landline',
    email: '✉️ Email',
    hospital: '🏥 Hospital',
    office: '🏢 Indore City Office',
    doctorNote: (d) => `Doctors ke direct number website par nahi hain — please hospital mein call karke **${d}** ke baare mein poochein.`,
  },
  insurance: (n) => [
    'Hamare Patients & Visitors page par **insurance aur cashless scheme support** ka zikr hai, lekin accepted insurance companies, TPA ya government schemes ki list abhi website par nahi hai.',
    'Ayushman Bharat (PM-JAY) ka bhi zikr hai, lekin iski details abhi confirm ki ja rahi hain.',
    `Aane ya admit hone se pehle please **${n}** par call karke apna insurance ya scheme confirm kar lein.`,
  ],
  cost: (n) => `Fees aur charges — jaise consultation fees, treatment cost aur room charges — website par nahi diye gaye hain. Current charges ke liye please **${n}** par call karein.`,
  packages: (n) => `Website par **health check-up packages** ka zikr hai, lekin package details aur prices abhi available nahi hain. Jaankari ke liye **${n}** par call karein.`,
  guide: { intro: 'Hamari patient guide ke hisaab se pehli consultation mein yeh cheezein saath laayein:', outro: 'Agar aap kisi aur ke liye aa rahe hain, toh unke documents laayein aur ho sake toh unhe saath lekar aayein.' },
  accreditation: {
    nabh: 'Amaltas Institute of Medical Sciences **NABH-accredited** hai (National Accreditation Board for Hospitals & Healthcare Providers).',
    pending: 'NABL (lab) accreditation aur Ayushman Bharat ka bhi website par zikr hai, lekin unka status abhi confirm kiya ja raha hai.',
  },
  about: (name, academic, acres) => [
    `**${name}** (${academic}) Dewas, Madhya Pradesh mein ek NABH-accredited multi-superspeciality hospital hai, jiska campus ${acres} acre ka hai.`,
    'Yahan Heart, Neuroscience, Cancer, Nephrology, Orthopaedics aur kai departments mein treatment hota hai, 24/7 emergency care hai — aur patient care ke saath medical education bhi di jaati hai.',
  ],
  academics: (academic, email) => [
    `**${academic}** patient care ke saath-saath medical education bhi deta hai.`,
    `Courses, intake, fees aur admission details abhi website par nahi hain — admissions ke liye please **${email}** par email karein.`,
  ],
  news: 'Amaltas ki latest updates:',
  doctors: {
    overview: (n) => `Hamari website par **${n} doctors** listed hain. Department ke hisaab se:`,
    otherRoles: 'Other departments & roles',
    askMore: 'Kisi department (jaise “orthopaedics ke doctors”) ya doctor ke naam se poochein.',
    inSpecialty: (s) => `**${s}** mein listed doctors:`,
    noneInSpecialty: (s) => `Website par abhi **${s}** mein kisi doctor ka naam listed nahi hai. Aap phir bhi appointment request kar sakte hain — hamari team sahi specialist assign karegi.`,
    andMore: (n) => `…aur ${n} doctors, Doctors page par dekhein.`,
    role: (label) => `Website par **${label}** ke doctors:`,
    roleLabels: {
      dermatology: 'skin care (dermatology)',
      psychiatry: 'psychiatry aur de-addiction',
      dental: 'dental aur maxillofacial care',
      plastic: 'plastic surgery',
      pain: 'pain management',
      respiratory: 'respiratory medicine',
      neurosurgery: 'neurosurgery',
    },
    ambiguous: 'Is naam ke ek se zyada doctors hain — aap kinke baare mein pooch rahe hain?',
  },
  profile: {
    role: 'Role',
    qualifications: 'Qualifications',
    department: 'Department',
    experience: (y) => `${y}+ saal ka experience`,
    expertise: 'Expertise',
    languages: 'Languages',
    timings: 'Consultation timings website par nahi di gayi hain — please call karke availability confirm karein.',
  },
  specialty: {
    symptom: (s) => `Aisi problems ke liye hamara **${s}** department hai. Sahi diagnosis ke liye please doctor se consult karein.`,
    conditions: 'Common conditions',
    treatments: 'Treatments & procedures',
    doctorCount: (n) => `Is department mein ${n} doctor${n === 1 ? '' : 's'} listed ${n === 1 ? 'hai' : 'hain'}.`,
    faqs: 'Aksar pooche jaane wale sawal',
    facilities: 'Supporting facilities',
  },
  lists: {
    specialties: 'Hamare specialties aur centres of excellence:',
    services: 'Website par di gayi services:',
    facilities: 'Hamari facilities:',
    open247: '24/7',
  },
  caveat: {
    unverified: 'Is service ki details abhi confirm ki ja rahi hain — aane se pehle please hospital mein call kar lein.',
    radiology: 'Website par specific scan types ya machines ki list nahi hai — kisi particular scan ke liye please call karke poochein.',
    wards: 'Room categories, charges aur beds ki sankhya abhi website par nahi di gayi hai.',
  },
  advice: {
    decline: 'Sorry, main medical advice, diagnosis ya dawai suggest nahi kar sakti. 🙏 Please doctor se consult karein — main sahi department dhundhne ya appointment request karne mein help kar sakti hoon.',
    department: (s) => `Aisi problems ke liye hamara **${s}** department help kar sakta hai.`,
    urgent: (n) => `Agar symptoms serious ya achanak hain, toh turant **${n}** (24/7 emergency) par call karein.`,
  },
  whoami: [
    'Main **Riya** hoon, Amaltas Hospital ki virtual assistant. 😊',
    'Main website ki jaankari ke basis par doctors, departments, appointment, services, facilities aur contact details mein help kar sakti hoon. Main medical advice nahi de sakti.',
  ],
  thanks: 'Aapka swagat hai! 😊 Kya main aur kuch madad kar sakti hoon?',
  bye: 'Apna khayal rakhiye! 💚 Kabhi bhi zaroorat ho, main yahin hoon.',
  ack: 'Badhiya! Aur kuch jaanna ho toh bataiye.',
  moreWhat: 'Zaroor — aap kis baare mein aur jaanna chahenge?',
  notFound: 'Sorry, yeh jaankari hamari website par nahi mili. 🙏',
  mightHelp: 'Yeh pages helpful ho sakte hain:',
  fallbackContact: (n) => `Kisi aur jaankari ke liye please **${n}** par call karein ya hamara Contact page dekhein.`,
  suggest: {
    doctorsOf: (s) => `${s} ke doctors`,
    about: (s) => `${s} ke baare mein aur batao`,
    bookWith: (d) => `${d} se appointment`,
    book: 'Appointment kaise book karein?',
    contact: 'Address aur contact',
    hours: 'Visiting hours kya hain?',
    departments: 'Departments kaunse hain?',
    services: 'Services kaunsi hain?',
    doctors: 'Doctor dhundhna hai',
    insurance: 'Insurance aur billing',
    emergency: 'Emergency',
    guide: 'Kya saath laana hai?',
  },
};

export const copy: Record<Lang, Copy> = { en, hi, hinglish };
