import type { Article, ImageAsset } from '@/types';

/*
 * Past events migrated from the old site's "Activities / Events" archive
 * (amaltashospital.in/events, category activities_event). Hindi originals are
 * kept verbatim beneath an English rendering. Where the old post's date was
 * only its upload date (events posted months later), eventDate is omitted
 * rather than showing a wrong date.
 *
 * Photos live in public/images/events/gallery/<folder>/, resized to ≤1600px.
 */

const photo = (folder: string, file: string, width: number, height: number, alt: string): ImageAsset => ({
  src: `/images/events/gallery/${folder}/${file}`,
  alt,
  width,
  height,
});

const photos = (folder: string, alt: string, files: [string, number, number][]): ImageAsset[] =>
  files.map(([file, width, height]) => photo(folder, file, width, height, alt));

export const eventArchive: Article[] = [
  {
    slug: 'amaltas-medical-inspection-room-indore-airport-sept-2026',
    kind: 'event',
    title: 'Your Health Comes First, Even While You Travel',
    excerpt: 'The Amaltas Medical Inspection Room at Indore Airport offers passengers immediate, high-quality first-aid facilities.',
    category: 'Event',
    publishedAt: '2026-09-09',
    eventDate: '2026-09-09',
    eventLocation: 'Devi Ahilyabai Holkar Airport, Indore',
    cover: photo('airport-medical-room-sept-9', '01.jpg', 1440, 1440, 'A passenger being examined at the Amaltas Medical Inspection Room, Indore Airport'),
    gallery: photos('airport-medical-room-sept-9', 'Amaltas Medical Inspection Room, Indore Airport', [
      ['02.jpg', 1440, 1440],
    ]),
    body: `<p>The Amaltas Medical Inspection Room at Indore Airport provides immediate, high-quality first-aid facilities for passengers' health needs. Amaltas is always ready for the safety and health of travellers.</p>
<p lang="hi">इंदौर एयरपोर्ट पर स्थित अमलतास मेडिकल इंस्पेक्शन रूम में यात्रियों की स्वास्थ्य संबंधी जरूरतों के लिए तत्काल एवं उच्च स्तरीय प्राथमिक चिकित्सा सुविधाएं उपलब्ध हैं। यात्रियों की सुरक्षा और स्वास्थ्य के लिए अमलतास सदैव तत्पर। अमलतास मेडिकल इंस्पेक्शन रूम, इंदौर एयरपोर्ट</p>`,
  },
  {
    slug: 'amaltas-supports-dewas-police-cctv-network',
    kind: 'event',
    title: 'Amaltas Hospital Contributes ₹7 Lakh to Dewas Police for CCTV Network Expansion',
    excerpt: 'Amaltas presented a ceremonial cheque of ₹7 lakh to the Dewas district police to extend the fibre-cable network for CCTV cameras across about 25 km of the district.',
    category: 'Event',
    publishedAt: '2026-08-22',
    eventDate: '2026-08-22',
    eventLocation: 'Dewas',
    cover: photo('dewas-police-cctv', '01.jpg', 1440, 1129, 'Amaltas administration presenting a ceremonial ₹7 lakh cheque to the Dewas Superintendent of Police'),
    body: `<p>Under the guidance of Amaltas Group Founder Chairman Shri Suresh Singh Bhadoria and Chairman Shri Mayankraj Singh Bhadoria, the Amaltas administration presented a ceremonial cheque of ₹7 lakh to the Dewas district police administration. Amaltas Director Dr. Prashant, Marketing Director Shri Ashwin Tanwar and Media Manager Shri Kamlesh Sendhav handed the cheque to the Superintendent of Police, Dewas, Shri Puneet Gehlot, IPS.</p>
<p>The contribution will be used to extend and manage the fibre-cable network for CCTV cameras across roughly 25 kilometres of Dewas district. The initiative aims to strengthen the Dewas police technologically, so that the CCTV network can provide quick and effective help in investigating crimes and identifying and apprehending offenders.</p>
<p lang="hi">अमलतास ग्रुप के संस्थापक अध्यक्ष श्री सुरेश सिंह भदौरिया एवं अध्यक्ष श्री मयंकराज सिंह भदौरिया के मार्गदर्शन में अमलतास प्रशासन द्वारा देवास जिला पुलिस प्रशासन को ₹7 लाख का सांकेतिक चेक भेंट किया गया। अमलतास प्रशासन के निदेशक डॉ. प्रशांत, मार्केटिंग डायरेक्टर श्री अश्विन तंवर एवं मीडिया मैनेजर श्री कमलेश सेंधव ने यह चेक देवास के पुलिस अधीक्षक श्री पुनीत गेहलोत, IPS को भेंट किया। इस सहयोग राशि का उपयोग देवास जिले में लगभग 25 किलोमीटर के दायरे में CCTV कैमरों के लिए फाइबर केबल नेटवर्क के विस्तार एवं व्यवस्था में किया जाएगा। इस पहल का उद्देश्य देवास पुलिस प्रशासन को तकनीकी रूप से और अधिक सशक्त बनाना है, जिससे अपराधों की जांच, अपराधियों की पहचान एवं उनकी धरपकड़ में CCTV नेटवर्क के माध्यम से त्वरित और प्रभावी सहायता मिल सके।</p>`,
  },
  {
    slug: 'womens-day-celebration-2026',
    kind: 'event',
    title: 'Women\'s Day Celebration 2026',
    excerpt: 'Amaltas University, Dewas, celebrated International Women\'s Day 2026 on campus.',
    category: 'Event',
    publishedAt: '2026-03-09',
    eventDate: '2026-03-09',
    eventLocation: 'Amaltas University, Dewas',
    cover: photo('womens-day-2026', '01.jpg', 1600, 1066, 'International Women\'s Day 2026 celebration at Amaltas University, Dewas'),
    gallery: photos('womens-day-2026', 'Women\'s Day celebration 2026 at Amaltas', [
      ['02.jpg', 1600, 1066],
      ['03.jpg', 1600, 1066],
      ['04.jpg', 1600, 1066],
      ['05.jpg', 1600, 1066],
      ['06.jpg', 1600, 1066],
      ['07.jpg', 1600, 1066],
      ['08.jpg', 1600, 1066],
      ['09.jpg', 1600, 1066],
      ['10.jpg', 1600, 1066],
      ['11.jpg', 1600, 1066],
      ['12.jpg', 1600, 1066],
      ['13.jpg', 1600, 1066],
      ['14.jpg', 1600, 1066],
      ['15.jpg', 1600, 1066],
      ['16.jpg', 1600, 1066],
      ['17.jpg', 1600, 1066],
      ['18.jpg', 1600, 1066],
      ['19.jpg', 1600, 1066],
      ['20.jpg', 1600, 1066],
      ['21.jpg', 1600, 1066],
      ['22.jpg', 1600, 1066],
      ['23.jpg', 1600, 1066],
      ['24.jpg', 1600, 1066],
      ['25.jpg', 1600, 1066],
      ['26.jpg', 1600, 1066],
      ['27.jpg', 1600, 1066],
      ['28.jpg', 1600, 1066],
      ['29.jpg', 1600, 1066],
      ['30.jpg', 1600, 1066],
      ['31.jpg', 1600, 1066],
      ['32.jpg', 1600, 1066],
      ['33.jpg', 1600, 1066],
      ['34.jpg', 1600, 1066],
      ['35.jpg', 1600, 1066],
      ['36.jpg', 1600, 1066],
      ['37.jpg', 1600, 1066],
      ['38.jpg', 1600, 1066],
      ['39.jpg', 1600, 1066],
      ['40.jpg', 1600, 1066],
      ['41.jpg', 1600, 1066],
    ]),
    body: `<p>Amaltas University, Dewas, celebrated International Women's Day 2026 with a campus programme honouring the women of the Amaltas family.</p>`,
  },
  {
    slug: 'social-security-scheme-camp-2026',
    kind: 'event',
    title: 'Social Security Scheme Camp at Amaltas Super Speciality Hospital',
    excerpt: 'A camp at Amaltas Hospital, Dewas, explained social security schemes and health awareness, so people could learn about their rights and the benefits available to them.',
    category: 'Event',
    publishedAt: '2026-02-27',
    eventDate: '2026-02-27',
    eventLocation: 'Amaltas Super Speciality Hospital, Dewas',
    cover: photo('social-security-camp', '01.jpg', 1600, 1066, 'Social security scheme camp at Amaltas Super Speciality Hospital, Dewas'),
    gallery: photos('social-security-camp', 'Social security scheme camp at Amaltas Hospital', [
      ['02.jpg', 1600, 1066],
      ['03.jpg', 1600, 1066],
      ['04.jpg', 1600, 1066],
      ['05.jpg', 1600, 1066],
      ['06.jpg', 1600, 1066],
      ['07.jpg', 1600, 1066],
      ['08.jpg', 1600, 1066],
      ['09.jpg', 1600, 1066],
      ['10.jpg', 1600, 1066],
    ]),
    body: `<p>A social security scheme camp was held at Amaltas Super Speciality Hospital, Dewas. The camp explained social security and health awareness in detail, so that people could learn about their rights and the benefits available to them.</p>
<p>Our aim is to ensure your health and security.</p>
<p lang="hi">अमलतास सुपर स्पेशलिटी अस्पताल, देवास में सामाजिक सुरक्षा योजना शिविर इस शिविर में सामाजिक सुरक्षा और स्वास्थ्य जागरूकता के बारे में विस्तार से बताया गया, जहाँ आप अपने अधिकार और उपलब्ध लाभों के बारे में जान सकते हैं।</p>
<p lang="hi">हमारा उद्देश्य है आपकी सेहत और सुरक्षा को सुनिश्चित करना।</p>`,
  },
  {
    slug: 'gapio-16th-annual-conference',
    kind: 'event',
    title: '16th Annual Conference of GAPIO (Global Association of Physicians of Indian Origin)',
    excerpt: 'Amaltas took part in the 16th annual GAPIO conference in Indore, a global forum of physicians of Indian origin.',
    category: 'Event',
    publishedAt: '2026-02-16',
    eventDate: '2026-02-16',
    eventLocation: 'Indore',
    cover: photo('gapio-conference', '01.jpg', 1080, 720, 'Amaltas representatives at the 16th annual GAPIO conference, Indore'),
    gallery: photos('gapio-conference', 'GAPIO 16th annual conference, Indore', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
      ['06.jpg', 1080, 720],
      ['07.jpg', 1080, 720],
      ['08.jpg', 1080, 720],
      ['09.jpg', 1080, 720],
    ]),
    body: `<p>Amaltas attended the 16th annual conference of GAPIO (Global Association of Physicians of Indian Origin) and shared its views. The conference is a prestigious global platform for doctors of Indian origin practising abroad, known for their excellence in science and medicine.</p>
<p>Indore hosting this prestigious global conference reflects the growing relevance of Indore and Madhya Pradesh in healthcare, education and modern infrastructure. GAPIO represents a strong global network: doctors of Indian origin have proved their excellence across continents and are among India's greatest global ambassadors in science and medicine.</p>
<p>Warm congratulations to the award winners, and thanks and best wishes to Apollo Hospitals, Indore, and the GAPIO leadership for this initiative.</p>
<p lang="hi">GAPIO – Global Association of Physicians of Indian Origin) के 16वें वार्षिक सम्मेलन में उपस्थित हुआ और अपने विचार सांझा किए..</p>
<p lang="hi">यह सम्मेलन विदेशों में रहने वाले भारतीय मूल के डॉक्टर्स का एक प्रतिष्ठित वैश्विक मंच है, जो विज्ञान और चिकित्सा के क्षेत्र में अपनी उत्कृष्टता के लिए जाने जाते हैं।</p>
<p lang="hi">इंदौर को इस प्रतिष्ठित वैश्विक सम्मेलन की मेजबानी करना, स्वास्थ्य सेवा, शिक्षा और आधुनिक बुनियादी ढांचे के क्षेत्र में इंदौर, मध्यप्रदेश की बढ़ती प्रासंगिकता को दर्शाता है।</p>
<p lang="hi">गैपियो एक सशक्त वैश्विक नेटवर्क का प्रतिनिधित्व करता है। भारतीय मूल के डॉक्टर्स ने महाद्वीपों के पार अपनी उत्कृष्टता सिद्ध की है, और निस्संदेह वह विज्ञान और चिकित्सा के क्षेत्र में भारत के सबसे महान वैश्विक राजदूत हैं।</p>
<p lang="hi">अवसर पर पुरस्कार विजेताओं को हार्दिक बधाई। अपोलो हॉस्पिटल्स, इंदौर और गैपीयो (GAPIO) के नेतृत्व को इस पहल के लिए धन्यवाद एवं शुभकामनाएं..</p>`,
  },
  {
    slug: 'sbi-donates-cardiac-ambulance',
    kind: 'event',
    title: 'State Bank of India Presents a Cardiac Ambulance to Amaltas Hospital',
    excerpt: 'SBI presented Amaltas Hospital with a cardiac ambulance equipped with a ventilator, monitor and advanced life support, and opened a new branch on campus.',
    category: 'Event',
    publishedAt: '2026-02-09',
    eventDate: '2026-02-09',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: photo('sbi-cardiac-ambulance', '01.jpg', 1080, 720, 'Inauguration of the SBI cardiac ambulance at Amaltas Hospital'),
    gallery: photos('sbi-cardiac-ambulance', 'SBI cardiac ambulance handover at Amaltas Hospital', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
    ]),
    body: `<p>State Bank of India (SBI) presented Amaltas Hospital with a state-of-the-art cardiac ambulance, equipped with life-saving facilities such as a ventilator, monitor and advanced life support system.</p>
<p>A new SBI branch was also opened on the Amaltas campus, so that medical students, patients' families, staff and local residents can now use banking services on campus.</p>
<p>This is an important step towards better healthcare services.</p>
<p lang="hi">भारतीय स्टेट बैंक (SBI) द्वारा अमलतास अस्पताल को अत्याधुनिक कार्डियक एम्बुलेंस भेंट की गई, जो वेंटिलेटर, मॉनिटर और एडवांस लाइफ सपोर्ट सिस्टम जैसी जीवन रक्षक सुविधाओं से सुसज्जित है।</p>
<p lang="hi">साथ ही अमलतास परिसर में SBI की नई शाखा का शुभारंभ किया गया, जिससे मेडिकल छात्रों, मरीजों के परिजनों, स्टाफ और स्थानीय नागरिकों को बैंकिंग सेवाओं की सुविधा अब परिसर में ही उपलब्ध होगी।</p>
<p lang="hi">स्वास्थ्य सेवाओं को बेहतर बनाने की दिशा में यह एक महत्वपूर्ण कदम है।</p>`,
  },
  {
    slug: 'jhitarkhedi-mega-health-camp-2026',
    kind: 'event',
    title: 'Mega Multi-Speciality Health Camp at Jhitarkhedi, Ujjain',
    excerpt: 'A free one-day multi-speciality health camp at Jhitarkhedi village, Ujjain, offered consultations for heart disease, cancer and neurological conditions, along with ECG, X-ray and lab tests.',
    category: 'Event',
    publishedAt: '2026-02-07',
    eventDate: '2026-02-07',
    eventLocation: 'Shri Dundeshwar Mahadev Devnarayan Temple, Jhitarkhedi, Ujjain',
    cover: photo('jhitarkhedi-health-camp', '01.jpg', 1080, 608, 'Mega health camp at Jhitarkhedi, Ujjain, organised by Amaltas'),
    gallery: photos('jhitarkhedi-health-camp', 'Mega health camp at Jhitarkhedi, Ujjain', [
      ['02.jpg', 1080, 608],
      ['03.jpg', 1080, 608],
      ['04.jpg', 1080, 608],
      ['05.jpg', 1004, 810],
    ]),
    body: `<p>A one-day "Vishal Sarva Rog Nidan Maha Swasthya Shivir" (mega multi-speciality health camp) was held on Saturday, 7 February 2026 in Jhitarkhedi village, Ujjain. Under the guidance of Hon'ble MP Shri Anil Firojiya, it was jointly organised by Amaltas Medical College &amp; Super Speciality Hospital, Dewas, and the Late Shri Bhurelal Ji Firojiya Social and Research Institute, Ujjain.</p>
<p>The camp offered free consultations for serious illnesses such as heart disease, cancer and brain disorders, along with ECG, X-ray and blood and urine tests. Amaltas Ayurvedic and Homoeopathic Hospital also gave free consultations. Patients identified at the camp were to be treated free of charge the next day, with a free bus service to the hospital.</p>
<p>The Amaltas Chairman said: "We are happy that through this camp we can provide health services to the people of the region. Our aim is to reach as many people as possible and help them lead healthy lives."</p>
<p>Hospital management, specialists from all departments, nursing staff and other staff were present. MLA Dr. Satish Malviya urged residents to make the most of the opportunity. The camp ran from 10 am to 3 pm at Shri Dundeshwar Mahadev Devnarayan Temple, Jhitarkhedi, Tehsil Ghatiya, Ujjain.</p>
<p lang="hi">उज्जैन के ग्राम झीतरखेड़ी में 7 फरवरी 2026 (शनिवार) को एक दिवसीय “विशाल सर्व रोग निदान महास्वास्थ्य शिविर” का आयोजन किया गया। यह शिविर माननीय सांसद श्री अनिल फिरोजिया जी के मार्गदर्शन में अमलतास मेडिकल कॉलेज एवं सुपर स्पेशलिटी हॉस्पिटल, देवास तथा स्व. श्री भूरेलाल जी फिरोजिया सामाजिक एवं शोध संस्था, उज्जैन द्वारा संयुक्त रूप से आयोजित किया गया था।</p>
<p lang="hi">इस शिविर में हृदय रोग, कैंसर और मस्तिष्क रोग जैसी गंभीर बीमारियों का निःशुल्क परामर्श और ईसीजी, एक्सरे, खून पेशाब की जांच की गई। साथ ही अमलतास आयुर्वेदिक एवं होम्योपैथिक अस्पताल के द्वारा भी निःशुल्क परामर्श दिया गया। शिविर के अगले दिन चिह्नित मरीजों का निःशुल्क इलाज किया जायेगा एवं अस्पताल तक जाने हेतु निःशुल्क बस सेवा भी उपलब्ध रहेगी।</p>
<p lang="hi">अमलतास के चेयरमैन ने कहा, “हमें खुशी है कि हम अपने इस शिविर के माध्यम से क्षेत्र के लोगों को स्वास्थ्य सेवाएं प्रदान कर पा रहे हैं। हमारा उद्देश्य है कि हम अधिक से अधिक लोगों तक स्वास्थ्य सेवाएं पहुंचाएं और उन्हें स्वस्थ जीवन जीने में मदद करें।”</p>
<p lang="hi">इस अवसर पर अस्पताल मैनेजमेंट से देवेंद्र दुबे, सुपर स्पेशलिटी मैनेजर मेघा सोनी, मार्केटिंग से मनीष मिश्रा , डॉ रत्ना शर्मा और डॉ. महेंद्र सिंह , डॉ. सुनील यादव डॉ. विजय बैरागी और समस्त विभाग के डॉक्टर ,नर्सिंग स्टाफ एवं अन्य स्टाफ मौजूद थे।</p>
<p lang="hi">विद्यायक मा. डॉ. सतीश मालवीय जी ने समस्त क्षेत्रवासियों से अपील की है कि इस सुनहरे अवसर का लाभ उठाएं और अधिक से अधिक संख्या में पहुंचकर अपना स्वास्थ्य परीक्षण कराएं। यह शिविर श्री डुण्डेश्वर महादेव देवनारायण मंदिर, ग्राम झीतरखेड़ी, तह. घटिया, उज्जैन में सुबह 10 बजे से 3 बजे तक आयोजित किया गया था।</p>`,
  },
  {
    slug: 'world-cancer-day-awareness-2026',
    kind: 'event',
    title: 'World Cancer Day Awareness Programme at Amaltas Hospital',
    excerpt: 'Amaltas Hospital marked World Cancer Day with an awareness programme and honoured patients who restarted their lives after cancer treatment at the hospital.',
    category: 'Event',
    publishedAt: '2026-02-04',
    eventDate: '2026-02-02',
    eventLocation: 'Amaltas Super Speciality Hospital, Dewas',
    cover: photo('world-cancer-day-2026', '01.jpg', 1440, 1075, 'Doctors, staff and honoured cancer survivors at the World Cancer Day programme, Amaltas Hospital'),
    gallery: photos('world-cancer-day-2026', 'World Cancer Day programme at Amaltas Hospital', [
      ['02.jpg', 1440, 1075],
      ['03.jpg', 1440, 1075],
      ['04.jpg', 1440, 1074],
      ['05.jpg', 1090, 1075],
      ['06.jpg', 1306, 1075],
      ['07.jpg', 1332, 1075],
      ['08.jpg', 1440, 1073],
    ]),
    body: `<p>A special programme was held at Amaltas Hospital, Dewas, on World Cancer Day. Dr. S. S. Nayyar attended as chief guest, along with Amaltas doctors Dr. Prashant, Dr. Ali Akbar Sabir, Dr. Suyash Agrawal, Dr. Ankit Gupta and Dr. Vijay Bairagi. Super Speciality Manager Megha Soni and other faculty and staff helped make the programme a success.</p>
<p>The dignitaries discussed spreading cancer awareness and ways to prevent it. Cancer patients who began a new chapter in their lives after treatment at the hospital were specially honoured with a shawl and shriphal.</p>
<p>The Amaltas Hospital Chairman said: "We must treat as many cancer patients as we can and help them overcome this disease. We are committed to working continuously in this direction."</p>
<p lang="hi">देवास के अमलतास अस्पताल में वर्ल्ड कैंसर डे के अवसर पर एक विशेष कार्यक्रम आयोजित किया गया। इस कार्यक्रम में मुख्य अतिथि के रूप में डॉ. एस. एस. नय्यर उपस्थित थे। उनके साथ अमलतास अस्पताल के डॉ. प्रशांत, डॉ. अली अकबर साबिर, डॉ. सुयश अग्रवाल, डॉ. अंकित गुप्ता, और डॉ. विजय बैरागी भी उपस्थित थे। टीम ने इस कार्यक्रम को सफल बनाने में महत्वपूर्ण भूमिका निभाई, जिसमें सुपर स्पेशलिटी मैनेजर मेघा सोनी और अन्य फैकल्टी स्टाफ शामिल थे। इस अवसर पर सभी गणमान्य व्यक्तियों ने कैंसर के प्रति जागरूकता फैलाने और इसके रोकथाम के उपायों पर चर्चा की। विशेष रूप से, कैंसर से पीड़ित मरीजों को सम्मानित करने के लिए एक विशेष आयोजन किया गया था, जिन्होंने इस अस्पताल से इलाज करवाकर अपनी जिंदगी में नई शुरुआत की है। उन्हें शॉल और श्रीफल से सम्मानित किया गया। अमलतास अस्पताल के चेयरमैन ने कहा, “हमें अधिक से अधिक कैंसर मरीजों का इलाज करके उन्हें इस बीमारी से बाहर निकालने की कोशिश करनी चाहिए। हम इस दिशा में निरंतर काम करने के लिए प्रतिबद्ध हैं।” इस कार्यक्रम के माध्यम से अमलतास अस्पताल ने एक बार फिर से अपनी प्रतिबद्धता को दर्शाया है कि वे कैंसर के प्रति जागरूकता फैलाने और मरीजों को सम्मान देने के लिए निरंतर प्रयासरत हैं।</p>`,
  },
  {
    slug: 'prohibition-resolution-day-rally-2026',
    kind: 'event',
    title: 'Rally on Prohibition Resolution Day',
    excerpt: 'A rally on Madya Nishedh Sankalp Diwas carried a strong message of a drug-free society; participants pledged to stay away from intoxicants.',
    category: 'Event',
    publishedAt: '2026-01-30',
    eventDate: '2026-01-30',
    cover: photo('prohibition-day-rally', '01.jpg', 1080, 720, 'Participants taking the de-addiction pledge at the Prohibition Resolution Day rally'),
    gallery: photos('prohibition-day-rally', 'Prohibition Resolution Day rally', [
      ['02.jpg', 1080, 719],
      ['03.jpg', 1080, 719],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
      ['06.jpg', 1080, 720],
      ['07.jpg', 1080, 720],
      ['08.jpg', 1080, 720],
      ['09.jpg', 1080, 719],
    ]),
    body: `<p>A rally held on Madya Nishedh Sankalp Diwas (Prohibition Resolution Day) gave society a strong message of freedom from addiction. Everyone took an oath to stay away from intoxicants and resolved to remain addiction-free for a healthy life, a safe family and a bright future.</p>
<p>Let us all take a strong and meaningful step together towards an addiction-free society.</p>
<p lang="hi">मद्य निषेध संकल्प दिवस के अवसर पर आयोजित रैली के माध्यम से समाज को नशामुक्ति का सशक्त संदेश दिया गया। इस अवसर पर सभी ने नशे से दूर रहने की शपथ ली और स्वस्थ जीवन, सुरक्षित परिवार एवं उज्ज्वल भविष्य के लिए नशामुक्त रहने का संकल्प लिया।</p>
<p lang="hi">आइए, हम सब मिलकर नशामुक्त समाज की दिशा में एक मजबूत और सार्थक कदम बढ़ाएँ।</p>`,
  },
  {
    slug: 'cm-launches-free-heart-check-up-campaign-ujjain',
    kind: 'event',
    title: 'Chief Minister Dr. Mohan Yadav Launches Free Heart Check-up Camp Campaign in Ujjain',
    excerpt: 'Hon\'ble Chief Minister Dr. Mohan Yadav launched a free heart check-up camp campaign in Ujjain to help prevent heart disease through timely screening.',
    category: 'Event',
    publishedAt: '2026-01-29',
    eventDate: '2026-01-28',
    eventLocation: 'Ujjain',
    cover: photo('cm-free-heart-camp-ujjain', '01.jpg', 1080, 720, 'Chief Minister Dr. Mohan Yadav at the launch of the free heart check-up camp campaign, Ujjain'),
    gallery: photos('cm-free-heart-camp-ujjain', 'Launch of the free heart check-up camp campaign, Ujjain', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
    ]),
    body: `<p>In Ujjain, Hon'ble Chief Minister Dr. Mohan Yadav launched the free heart check-up camp campaign.</p>
<p>This initiative is a strong step towards preventing heart disease by giving the public timely health check-ups, proper advice and better treatment.</p>
<p lang="hi">आज उज्जैन में माननीय मुख्यमंत्री Dr Mohan Yadav जी ने निःशुल्क हृदय जांच शिविर अभियान का शुभारंभ किया।</p>
<p lang="hi">यह अभिनव पहल आमजन को समय पर स्वास्थ्य परीक्षण, उचित परामर्श एवं बेहतर उपचार सुविधा उपलब्ध कराकर हृदय रोगों की रोकथाम की दिशा में एक सशक्त कदम है।</p>`,
  },
  {
    slug: 'amaltas-honoured-by-district-administration-republic-day-2026',
    kind: 'event',
    title: 'Amaltas Hospital Honoured by the District Administration on Republic Day',
    excerpt: 'Amaltas Hospital was honoured by the district administration at the Parade Ground on 26 January 2026 for outstanding, exemplary work in healthcare.',
    category: 'Event',
    publishedAt: '2026-01-26',
    eventDate: '2026-01-26',
    eventLocation: 'Parade Ground, Dewas',
    cover: photo('district-honour-republic-day', '01.jpg', 1080, 720, 'Amaltas Hospital receiving an honour from the district administration on Republic Day 2026'),
    gallery: photos('district-honour-republic-day', 'Republic Day honour for Amaltas Hospital', [
      ['02.jpg', 1080, 720],
    ]),
    body: `<p>Amaltas Hospital was honoured by the district administration at the Parade Ground on 26 January 2026 for outstanding and exemplary work in the field of health.</p>
<p lang="hi">स्वास्थ्य के क्षेत्र में उत्कृष्ट,अनुकरणीय कार्य के लिए अमलतास हॉस्पिटल को जिला प्रशासन द्वारा 26 जनवरी 2026 को परेड ग्राउंड में सम्मानित किया गया।</p>`,
  },
  {
    slug: 'republic-day-celebration-amaltas-university-2026',
    kind: 'event',
    title: 'Grand Republic Day Celebration at Amaltas University',
    excerpt: 'Amaltas University celebrated India\'s 77th Republic Day with patriotic programmes, student performances and Best Employee Awards.',
    category: 'Event',
    publishedAt: '2026-01-26',
    eventDate: '2026-01-26',
    eventLocation: 'Amaltas University, Dewas',
    cover: photo('republic-day-2026', '01.jpg', 1080, 720, 'Guests and leadership at the 77th Republic Day celebration, Amaltas University'),
    gallery: photos('republic-day-2026', 'Republic Day 2026 at Amaltas University', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
      ['06.jpg', 1080, 720],
    ]),
    body: `<p>Amaltas University celebrated the 77th Republic Day with enthusiasm, pride and patriotism.</p>
<p>Patriotic programmes, captivating student performances and the presence of special guests made the event memorable. Employees who did outstanding work were honoured with the Best Employee Award.</p>
<p>A heartfelt salute to everyone's hard work, dedication and commitment. Full of unity, service and love for the nation, the ceremony was an inspiration to all.</p>
<p lang="hi">अमलतास विश्वविद्यालय में 77वां गणतंत्र दिवस उत्साह, गर्व और देशभक्ति की भावना के साथ हर्षोल्लास से मनाया गया।</p>
<p lang="hi">देशभक्ति कार्यक्रमों, विद्यार्थियों की मनमोहक प्रस्तुतियों और विशेष अतिथियों की गरिमामयी उपस्थिति ने इस आयोजन को यादगार बना दिया।</p>
<p lang="hi">इस अवसर पर उत्कृष्ट कार्य करने वाले कर्मचारियों को Best Employee Award से सम्मानित किया गया।</p>
<p lang="hi">आप सभी की मेहनत, समर्पण और प्रतिबद्धता को दिल से सलाम!</p>
<p lang="hi">एकता, सेवा और राष्ट्रप्रेम से भरा यह समारोह सभी के लिए प्रेरणादायक सिद्ध हुआ |</p>`,
  },
  {
    slug: 'mega-health-camp-january-2026',
    kind: 'event',
    title: 'A Successful Step Towards Better Healthcare: Mega Health Camp',
    excerpt: 'Amaltas Super Speciality Hospital\'s mega multi-speciality health camp gave local residents free check-ups, specialist consultations and treatment.',
    category: 'Event',
    publishedAt: '2026-01-25',
    eventDate: '2026-01-25',
    cover: photo('mega-health-camp-jan-2026', '01.jpg', 1080, 608, 'Residents registering at the Amaltas mega health camp'),
    gallery: photos('mega-health-camp-jan-2026', 'Amaltas mega health camp, January 2026', [
      ['02.jpg', 1080, 1021],
      ['03.jpg', 1080, 608],
      ['04.jpg', 1080, 608],
      ['05.jpg', 1080, 608],
      ['06.jpg', 1080, 608],
      ['07.jpg', 1080, 608],
      ['08.jpg', 1080, 608],
      ['09.jpg', 1080, 608],
      ['10.jpg', 1080, 608],
    ]),
    body: `<p>The "Vishal Sarva Rog Nidan Maha Swasthya Shivir" (mega multi-speciality health camp) organised by Amaltas Super Speciality Hospital was successfully completed.</p>
<p>Local residents benefited from free check-ups, specialist consultations and treatment services.</p>
<p>We sincerely thank all the doctors and the supporting team who made this camp a success. Your health is our priority.</p>
<p lang="hi">अमलतास सुपर स्पेशलिटी अस्पताल द्वारा आयोजित “विशाल सर्व रोग निदान महा-स्वास्थ्य शिविर” सफलतापूर्वक संपन्न हुआ।</p>
<p lang="hi">इस शिविर में क्षेत्रवासियों ने निःशुल्क जांच, विशेषज्ञ परामर्श और उपचार सेवाओं का लाभ उठाया।</p>
<p lang="hi">हम सभी डॉक्टरों एवं सहयोगी टीम का हृदय से धन्यवाद करते हैं, जिनके सहयोग से यह स्वास्थ्य शिविर सफल हो सका। आपका स्वास्थ्य, हमारी प्राथमिकता है।</p>`,
  },
  {
    slug: 'ai-in-healthcare-workshop-2026',
    kind: 'event',
    title: 'Workshop on "AI in Healthcare"',
    excerpt: 'A workshop on AI in Healthcare explored how artificial intelligence is making healthcare more accurate, faster and more effective.',
    category: 'Event',
    publishedAt: '2026-01-21',
    eventDate: '2026-01-21',
    cover: photo('ai-in-healthcare-workshop', '01.jpg', 1080, 720, 'Felicitation at the AI in Healthcare workshop'),
    gallery: photos('ai-in-healthcare-workshop', 'AI in Healthcare workshop', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
    ]),
    body: `<p>This workshop on "AI in Healthcare" explored where technology and medicine meet.</p>
<p>There was a meaningful discussion on how artificial intelligence is making the healthcare of the future more accurate, faster and more effective.</p>
<p lang="hi">“AI in Healthcare” पर आधारित इस वर्कशॉप में तकनीक और चिकित्सा के संगम को समझा गया।</p>
<p lang="hi">कैसे आर्टिफिशियल इंटेलिजेंस भविष्य की हेल्थकेयर को और अधिक सटीक, तेज़ और प्रभावी बना रहा है—इस पर सार्थक चर्चा हुई।</p>`,
  },
  {
    slug: 'cme-mantrayoga-as-mind-medicine',
    kind: 'event',
    title: 'CME on "Mantrayoga as Mind Medicine"',
    excerpt: 'A CME on the scientific role of mantra-based practices in mental health care: stress reduction, emotional balance and overall well-being.',
    category: 'Event',
    publishedAt: '2026-01-16',
    eventDate: '2026-01-16',
    cover: photo('cme-mantrayoga', '01.jpg', 1080, 719, 'Speakers and attendees at the CME on Mantrayoga as Mind Medicine'),
    gallery: photos('cme-mantrayoga', 'CME on Mantrayoga as Mind Medicine', [
      ['02.jpg', 1080, 719],
      ['03.jpg', 1080, 719],
      ['04.jpg', 1080, 1439],
      ['05.jpg', 1080, 719],
      ['06.jpg', 1080, 719],
      ['07.jpg', 1080, 719],
    ]),
    body: `<p>CME on “Mantrayoga as Mind Medicine” highlighted the scientific role of mantra-based practices in mental health care. The session focused on stress reduction, emotional balance, and overall mental well-being through Mantrayoga. Integrating ancient wisdom with modern medical science, it showcased a simple and effective non-pharmacological approach to support mental health in clinical practice.</p>`,
  },
  {
    slug: 'maj-gen-dr-shrikant-nema-senior-pathologist-honour',
    kind: 'event',
    title: 'A Proud Moment: Maj. Gen. Dr. Shrikant Nema Honoured as the State\'s Most Senior Pathologist',
    excerpt: 'At the IAPM state conference in Jabalpur, Maj. Gen. Dr. Shrikant Nema of Amaltas was honoured as the state\'s most senior pathologist.',
    category: 'Event',
    publishedAt: '2026-01-13',
    eventDate: '2026-01-13',
    eventLocation: 'Jabalpur',
    cover: photo('senior-pathologist-honour', '01.jpg', 720, 540, 'Maj. Gen. Dr. Shrikant Nema receiving the senior pathologist honour at the IAPM state conference'),
    body: `<p>A proud moment for Amaltas College: at the IAPM state-level conference held in Jabalpur, Major General Dr. Shrikant Nema was honoured as "the state's most senior pathologist".</p>
<p>The honour recognises his outstanding contribution to teaching pathology and the diagnostic services he has provided for better patient care.</p>
<p>It not only brings pride to the Amaltas institution but is also an inspiration for young pathologists.</p>
<p lang="hi">अमलतास कॉलेज के लिए गर्व का क्षण</p>
<p lang="hi">जबलपुर में आयोजित IAPM राज्य स्तरीय सम्मेलन में मेजर जनरल डॉ. श्रीकांत नेमा को “राज्य के सबसे वरिष्ठ रोगविज्ञानी” के सम्मान से नवाज़ा गया।</p>
<p lang="hi">पैथोलॉजी के क्षेत्र में उनके उत्कृष्ट शिक्षण योगदान और मरीजों की बेहतर देखभाल हेतु दी गई नैदानिक सेवाओं ने यह उपलब्धि दिलाई।</p>
<p lang="hi">यह सम्मान न केवल अमलतास संस्थान का गौरव बढ़ाता है, बल्कि युवा पैथोलॉजिस्ट्स के लिए प्रेरणा भी है।</p>`,
  },
  {
    slug: 'simhastha-2028-cpr-training-for-chos',
    kind: 'event',
    title: 'Preparations for Simhastha 2028 Begin: CPR Training for CHOs',
    excerpt: 'Amaltas Hospital is giving life-saving CPR training to Community Health Officers ahead of Simhastha 2028.',
    category: 'Event',
    publishedAt: '2026-01-12',
    eventDate: '2026-01-12',
    eventLocation: 'Amaltas Hospital, Dewas',
    cover: photo('simhastha-cpr-training', '01.jpg', 1440, 810, 'Community Health Officers practising CPR on a manikin at Amaltas Hospital'),
    gallery: photos('simhastha-cpr-training', 'CPR training for CHOs ahead of Simhastha 2028', [
      ['02.jpg', 1440, 810],
      ['03.jpg', 1440, 810],
      ['04.jpg', 1440, 810],
      ['05.jpg', 1440, 810],
      ['06.jpg', 1440, 810],
      ['07.jpg', 1440, 810],
    ]),
    body: `<p>Preparations for Simhastha 2028 have begun. Community Health Officers (CHOs) are being given life-saving CPR training at Amaltas Hospital, because in an emergency every second counts.</p>
<p lang="hi">अमलतास अस्पताल में CHO अधिकारियों को दिया जा रहा जीवन रक्षक CPR प्रशिक्षण, ताकि आपात स्थिति में हर सेकंड कीमती साबित हो सके।</p>`,
  },
  {
    slug: 'hi-tech-emergency-icu-launch',
    kind: 'event',
    title: 'Hi-tech Emergency ICU Inaugurated at Amaltas Super Speciality Hospital',
    excerpt: 'A hi-tech emergency ICU was inaugurated at Amaltas Super Speciality Hospital, Dewas, bringing fast, advanced and reliable emergency care.',
    category: 'Event',
    publishedAt: '2025-12-12',
    eventDate: '2025-12-12',
    eventLocation: 'Amaltas Super Speciality Hospital, Dewas',
    cover: photo('emergency-icu-launch', '01.jpg', 1280, 853, 'Ribbon-cutting at the inauguration of the hi-tech emergency ICU, Amaltas Hospital'),
    gallery: photos('emergency-icu-launch', 'Emergency ICU inauguration at Amaltas Hospital', [
      ['02.jpg', 1280, 853],
      ['03.jpg', 1280, 853],
      ['04.jpg', 1280, 853],
    ]),
    body: `<p>Another strong step towards better healthcare: the Hon'ble Minister inaugurated a hi-tech emergency ICU at Amaltas Super Speciality Hospital, Dewas. Fast, advanced and reliable treatment is now available in emergencies.</p>
<p lang="hi">माननीय मंत्री जी द्वारा अमलतास सुपर स्पेशलिटी अस्पताल, देवास में हाईटेक इमरजेंसी ICU का शुभारंभ किया गया। अब आपातकालीन परिस्थितियों में त्वरित, उन्नत और विश्वसनीय इलाज की सुविधा उपलब्ध।</p>`,
  },
  {
    slug: 'ncmsap-2025-national-conference',
    kind: 'event',
    title: 'NCMSAP 2025: Two-Day National Conference at Amaltas University',
    excerpt: 'Over 500 experts, doctors and researchers met at Amaltas University for NCMSAP 2025, a national conference on addiction psychology.',
    category: 'Event',
    publishedAt: '2025-12-12',
    eventDate: '2025-12-12',
    eventLocation: 'Amaltas University, Dewas',
    cover: photo('ncmsap-2025', '01.jpg', 1500, 1000, 'Delegates at NCMSAP 2025, Amaltas University, Dewas'),
    gallery: photos('ncmsap-2025', 'NCMSAP 2025 at Amaltas University', [
      ['02.jpg', 1500, 1000],
      ['03.jpg', 1500, 1000],
      ['04.jpg', 1500, 1000],
      ['05.jpg', 1500, 1000],
      ['06.jpg', 1500, 1000],
      ['07.jpg', 1500, 1000],
      ['08.jpg', 1500, 1000],
      ['09.jpg', 1500, 1000],
      ['10.jpg', 1500, 1000],
      ['11.jpg', 1500, 1000],
      ['12.jpg', 1500, 1000],
      ['13.jpg', 1500, 1000],
      ['14.jpg', 1500, 1000],
      ['15.jpg', 1500, 1000],
      ['16.jpg', 1500, 1000],
      ['17.jpg', 1500, 1000],
      ['18.jpg', 1500, 1000],
      ['19.jpg', 1500, 1000],
      ['20.jpg', 1500, 1000],
      ['21.jpg', 1500, 1000],
      ['22.jpg', 1500, 1000],
      ['23.jpg', 1500, 1000],
      ['24.jpg', 1500, 1000],
      ['25.jpg', 1500, 1000],
      ['26.jpg', 1500, 1000],
      ['27.jpg', 1500, 1000],
      ['28.jpg', 1500, 1000],
      ['29.jpg', 1500, 1000],
      ['30.jpg', 1500, 1000],
      ['31.jpg', 1500, 1000],
      ['32.jpg', 1500, 1000],
      ['33.jpg', 1500, 1000],
      ['34.jpg', 1500, 1000],
      ['35.jpg', 1280, 853],
      ['36.jpg', 1280, 853],
      ['37.jpg', 1280, 853],
      ['38.jpg', 1280, 853],
      ['39.jpg', 1280, 853],
      ['40.jpg', 1280, 853],
      ['41.jpg', 1280, 853],
      ['42.jpg', 1280, 853],
      ['43.jpg', 1280, 853],
      ['44.jpg', 1280, 853],
      ['45.jpg', 1280, 853],
      ['46.jpg', 1280, 853],
      ['47.jpg', 1280, 853],
      ['48.jpg', 1280, 853],
      ['49.jpg', 1280, 853],
      ['50.jpg', 1280, 853],
      ['51.jpg', 1280, 853],
      ['52.jpg', 1280, 853],
      ['53.jpg', 1280, 853],
      ['54.jpg', 1280, 853],
      ['55.jpg', 1500, 1000],
    ]),
    body: `<p>A Strong Step Towards a Drug-Free Society</p>
<p>The two-day NCMSAP 2025 – Second Mid-Term National Conference held at Amaltas University, Dewas marked a significant milestone in the field of addiction psychology, setting new directions through innovative thinking, robust research, and effective strategies. More than 500 experts, doctors, and researchers from India and abroad participated in in-depth discussions on the changing patterns of addiction—from substance abuse to gaming, social media, and behavioral addictions.</p>
<p>The research findings, solutions, and policy-oriented discussions presented at the conference will not only strengthen addiction prevention efforts but also provide new insights into mental health, timely counseling, and active community participation. Amaltas University and Hospital remain committed to building a drug-free society through continuous efforts in research, treatment, and awareness.</p>
<p>From research to solutions—Amaltas’ commitment to a drug-free future.</p>
<p lang="hi">नशा-मुक्त समाज की ओर एक मजबूत कदम</p>
<p lang="hi">अमलतास यूनिवर्सिटी, देवास में आयोजित दो दिवसीय NCMSAP 2025 – सेकंड मिड टर्म नेशनल कॉन्फ़्रेंस ने एडिक्शन साइकोलॉजी के क्षेत्र में नई सोच, ठोस शोध और प्रभावी रणनीतियों की दिशा तय की।</p>
<p lang="hi">देश-विदेश से आए 500+ विशेषज्ञों, डॉक्टरों और शोधकर्ताओं ने नशे के बदलते स्वरूप—ड्रग्स से लेकर गेमिंग, सोशल मीडिया व व्यवहारजनित लतों—पर गहन मंथन किया।</p>
<p lang="hi">सम्मेलन में प्रस्तुत शोध, समाधान और नीतिगत चर्चाएँ न केवल नशा-उन्मूलन बल्कि मानसिक स्वास्थ्य, समय पर काउंसलिंग और समाज की सहभागिता को भी नई दिशा देंगी।</p>
<p lang="hi">अमलतास यूनिवर्सिटी एवं अस्पताल समाज को नशा-मुक्त बनाने के लिए शोध, उपचार और जागरूकता के अपने संकल्प पर निरंतर अग्रसर है।</p>
<p lang="hi">शोध से समाधान तक—नशा-मुक्त भविष्य की ओर अमलतास का संकल्प।</p>`,
  },
  {
    slug: 'agar-cme-program-2025',
    kind: 'event',
    title: 'Agar CME Program 2025',
    excerpt: 'Amaltas Super Speciality Hospital held a CME in Agar with talks on plastic surgery and oral cancer.',
    category: 'Event',
    publishedAt: '2025-12-06',
    eventDate: '2025-12-06',
    eventLocation: 'Agar',
    cover: photo('agar-cme-2025', '01.jpg', 1280, 853, 'Speakers and doctors at the Agar CME Program 2025'),
    gallery: photos('agar-cme-2025', 'Agar CME Program 2025', [
      ['02.jpg', 1280, 853],
      ['03.jpg', 1280, 853],
      ['04.jpg', 1280, 853],
      ['05.jpg', 1280, 853],
      ['06.jpg', 1280, 853],
      ['07.jpg', 1280, 853],
      ['08.jpg', 1280, 853],
      ['09.jpg', 1280, 853],
    ]),
    body: `<p>Exciting moments from our Agar CME Program 2025, organised by Amaltas Super Speciality Hospital, Dewas, with talks by:</p>
<ul><li>Dr. Rahul Yadav – Plastic Surgery: A Problem-Solving Branch</li><li>Dr. Ankit Gupta – Oral Cancer</li></ul>
<p>We're thrilled to share highlights from this enriching event, and our heartfelt gratitude to the doctors of Agar for attending in such good numbers.</p>`,
  },
  {
    slug: 'world-aids-day-awareness-rally-2025',
    kind: 'event',
    title: 'Public Awareness Rally on World AIDS Day',
    excerpt: 'Amaltas Hospital and University launched an HIV/AIDS awareness week with a student rally through Dewas.',
    category: 'Event',
    publishedAt: '2025-12-01',
    eventDate: '2025-12-01',
    eventLocation: 'Dewas',
    cover: photo('world-aids-day-rally-2025', '01.jpg', 1440, 810, 'Students on the World AIDS Day awareness rally in Dewas'),
    gallery: photos('world-aids-day-rally-2025', 'World AIDS Day awareness rally', [
      ['02.jpg', 1440, 810],
      ['03.jpg', 1440, 810],
      ['04.jpg', 1440, 810],
      ['05.jpg', 1080, 810],
    ]),
    body: `<p>Amaltas Hospital and University launched an HIV/AIDS Awareness Week from 1 to 7 December. On the first day, students from various colleges held a rally through Dewas city, spreading the message of infection prevention and awareness.</p>
<p>During the week, poster making, street plays, slogan writing and lectures were planned to dispel myths about AIDS and bring correct information to everyone.</p>
<p>Vice-Chancellor Dr. Sharadchandra Wankhede, college Dean Dr. A. K. Pithwa, Hospital Director Dr. Prashant, Chief Public Relations Officer Dr. Ratna Sharma, principals of various colleges, doctors, PG doctors and all students and staff of Amaltas Institute were present. The Amaltas family's resolve: "An aware society is a healthy society."</p>
<p lang="hi">विश्व एड्स दिवस पर अमलतास की जन-जागरूकता रैली…. अमलतास अस्पताल एवं विश्वविद्यालय द्वारा 1–7 दिसंबर तक एचआईवी/एड्स जागरूकता सप्ताह का शुभारंभ। आज प्रथम दिवस पर विभिन्न महाविद्यालयों के छात्रों ने देवास शहर में भव्य रैली निकालकर संक्रमण, बचाव व जागरूकता का संदेश दिया। इस सप्ताह पोस्टर मेकिंग, नुक्कड़ नाटक, नारा लेखन व व्याख्यानों के माध्यम से एड्स संबंधी भ्रांतियों को दूर कर सही जानकारी जन-जन तक पहुँचाई जाएगी। कार्यक्रम में कुलगुरु डॉ. शरदचन्द्र वानखेडे, कॉलेज डीन डॉ. ए.के. पिठवा, अस्पताल निदेशक डॉ. प्रशांत, मुख्य जनसंपर्क अधिकारी डॉ. रत्ना शर्मा, विभिन्न महाविद्यालयों के प्राचार्यगण, चिकित्सक, पीजी डॉक्टर्स तथा अमलतास इंस्टिट्यूट के सभी छात्र-छात्राओं एवं स्टाफ की गरिमामयी उपस्थिति रही। अमलतास परिवार का संकल्प— “जागरूक समाज, स्वस्थ समाज।</p>`,
  },
  {
    slug: 'newborn-high-risk-clinic-launch',
    kind: 'event',
    title: 'Newborn High-Risk Clinic (NHRC) Launched at Amaltas Super Speciality Hospital',
    excerpt: 'A Newborn High-Risk Clinic now offers special care, free vaccination and regular follow-up for high-risk newborns, strengthening NICU–HDU services.',
    category: 'Event',
    publishedAt: '2025-11-19',
    eventDate: '2025-11-19',
    eventLocation: 'Amaltas Super Speciality Hospital, Dewas',
    cover: photo('nhrc-launch', '01.jpg', 1280, 853, 'Launch of the Newborn High-Risk Clinic at Amaltas Hospital'),
    gallery: photos('nhrc-launch', 'Newborn High-Risk Clinic launch', [
      ['02.jpg', 1280, 853],
      ['03.jpg', 1280, 853],
      ['04.jpg', 1280, 853],
      ['05.jpg', 1280, 853],
      ['06.jpg', 1280, 853],
      ['07.jpg', 1280, 853],
      ['08.jpg', 1280, 853],
      ['09.jpg', 1280, 853],
    ]),
    body: `<p>A Newborn High-Risk Clinic (NHRC) was launched at Amaltas Super Speciality Hospital, Dewas: an important step towards a safe start and a better future for newborns.</p>
<p>Strengthening the NICU–HDU facilities, the clinic provides special care, free vaccination and continuous follow-up for high-risk newborns.</p>
<p>Every newborn matters. Safe, capable and compassionate care is our priority.</p>
<p lang="hi">नवजात शिशुओं की सुरक्षित शुरुआत और बेहतर भविष्य के लिए एक महत्वपूर्ण कदम। NICU–HDU सुविधाओं को मजबूत करते हुए अब हाई-रिस्क नवजातों के लिए विशेष देखभाल, मुफ्त टीकाकरण और निरंतर फॉलो-अप की व्यवस्था।</p>
<p lang="hi">हर नवजात महत्वपूर्ण है — सुरक्षित, सक्षम और संवेदनशील देखभाल हमारी प्राथमिकता।</p>`,
  },
  {
    slug: 'dewas-cme-program-2025',
    kind: 'event',
    title: 'Dewas CME Program 2025',
    excerpt: 'Amaltas Super Speciality Hospital\'s Dewas CME featured talks on early breast cancer detection and oral and maxillofacial surgery.',
    category: 'Event',
    publishedAt: '2025-11-15',
    eventDate: '2025-11-15',
    eventLocation: 'Dewas',
    cover: photo('dewas-cme-2025', '01.jpg', 1080, 720, 'Speakers and attendees at the Dewas CME Program 2025'),
    gallery: photos('dewas-cme-2025', 'Dewas CME Program 2025', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
      ['06.jpg', 1080, 720],
    ]),
    body: `<p>We are delighted to share glimpses from our Dewas CME Program 2025, organised by Amaltas Super Speciality Hospital, Dewas. Speakers:</p>
<ul><li>Dr. Suyash Agrawal – Understanding Breast Cancer and Promoting Early Detection</li><li>Dr. Yogesh Loksh – New Insights into Oral and Maxillofacial Surgery</li></ul>`,
  },
  {
    slug: 'hair-transplant-ot-and-skin-opd-launch',
    kind: 'event',
    title: 'World-Class Hair Transplant OT and New Skin OPD Launched',
    excerpt: 'Amaltas Hospital, Dewas, opened a hair transplant operation theatre and a new skin OPD, so advanced treatment is now available in Dewas itself.',
    category: 'Event',
    publishedAt: '2025-11-06',
    eventDate: '2025-11-06',
    eventLocation: 'Amaltas Super Speciality Hospital, Dewas',
    cover: photo('hair-transplant-ot-skin-opd', '01.jpg', 1040, 694, 'Inauguration of the hair transplant OT and skin OPD at Amaltas Hospital'),
    gallery: photos('hair-transplant-ot-skin-opd', 'Hair transplant OT and skin OPD launch', [
      ['02.jpg', 1600, 1067],
      ['03.jpg', 1600, 1067],
      ['04.jpg', 1600, 1067],
      ['05.jpg', 1600, 1067],
      ['06.jpg', 1600, 1067],
      ['07.jpg', 1600, 1067],
      ['08.jpg', 1600, 1067],
      ['09.jpg', 1600, 1067],
      ['10.jpg', 1040, 694],
    ]),
    body: `<p>A world-class hair transplant OT and a new skin OPD were launched at Amaltas Super Speciality Hospital, Dewas. No more travelling to big cities: advanced treatment that is affordable, safe and world-class is now available in Dewas.</p>
<p>Inaugurated by Dr. Deepak Pipal, Regional Director, Ujjain Division. Treatments include hair transplant, vitiligo (white patches), acne, fungal infections and ringworm.</p>
<p>With a team of specialist doctors and modern facilities, Amaltas Hospital is a new name for healthy living.</p>
<p lang="hi">अमलतास सुपरस्पेशलिटी अस्पताल, देवास में वर्ल्ड-क्लास हेयर ट्रांसप्लांट OT एवं नई स्किन OPD का भव्य शुभारंभ!</p>
<p lang="hi">अब महानगरों की दौड़ खत्म, देवास में ही मिलेगा अत्याधुनिक उपचार — सस्ता, सुरक्षित और विश्वस्तरीय</p>
<p lang="hi">उद्घाटन : डॉ. दीपक पीपल (रिजनल डायरेक्टर, उज्जैन डिवीजन) उपचार : हेयर ट्रांसप्लांट, सफेद दाग, मुंहासे, फंगल इंफेक्शन, दाद-खाज आदि</p>
<p lang="hi">विशेषज्ञ डॉक्टरों की टीम और आधुनिक सुविधाओं के साथ अमलतास अस्पताल — स्वस्थ जीवन की नई पहचान!</p>`,
  },
  {
    slug: 'shajapur-cme-program-2025',
    kind: 'event',
    title: 'Shajapur CME Program 2025',
    excerpt: 'Glimpses from the CME programme organised by Amaltas in Shajapur.',
    category: 'Event',
    publishedAt: '2025-10-31',
    eventDate: '2025-10-31',
    eventLocation: 'Shajapur',
    cover: photo('shajapur-cme-2025', '01.jpg', 1280, 853, 'Doctors at the Shajapur CME Program 2025'),
    gallery: photos('shajapur-cme-2025', 'Shajapur CME Program 2025', [
      ['02.jpg', 1280, 853],
      ['03.jpg', 1280, 853],
      ['04.jpg', 1280, 853],
      ['05.jpg', 1280, 853],
      ['06.jpg', 1280, 853],
      ['07.jpg', 1280, 853],
    ]),
    body: `<p>Glimpses from the Shajapur CME Program 2025, organised by Amaltas Super Speciality Hospital, Dewas.</p>`,
  },
  {
    slug: 'cpr-awareness-week-day-1-aims',
    kind: 'event',
    title: 'CPR Awareness Week Programme at Amaltas Institute of Medical Sciences',
    excerpt: 'On day one of CPR Awareness Week, students, faculty and healthcare professionals learned how timely CPR can save a life.',
    category: 'Event',
    publishedAt: '2025-10-18',
    eventDate: '2025-10-18',
    eventLocation: 'Amaltas Institute of Medical Sciences, Dewas',
    cover: photo('cpr-awareness-week-day-1', '01.jpg', 1080, 720, 'Students practising CPR during CPR Awareness Week at Amaltas Institute of Medical Sciences'),
    gallery: photos('cpr-awareness-week-day-1', 'CPR Awareness Week at AIMS', [
      ['02.jpg', 1080, 720],
      ['03.jpg', 1080, 720],
      ['04.jpg', 1080, 720],
      ['05.jpg', 1080, 720],
    ]),
    body: `<p>A programme was held at Amaltas Institute of Medical Sciences on the first day of CPR Awareness Week. Students, faculty and healthcare professionals learned together how cardiopulmonary resuscitation (CPR) can save lives.</p>
<p>The aim was to make people aware that CPR given in time during a heart attack or emergency can save someone's life. Specialist doctors trained participants in CPR technique and the correct procedure.</p>
<p>The week is dedicated to building awareness, preparedness and compassion. Learn CPR, save lives!</p>
<p lang="hi">CPR जागरूकता सप्ताह के पहले दिन अमलतास इंस्टिट्यूट ऑफ मेडिकल साइंसेज़ में कार्यक्रम का सफल आयोजन किया गया।</p>
<p lang="hi">छात्रों, फैकल्टी और हेल्थकेयर प्रोफेशनल्स ने मिलकर सीखा कि कार्डियोपल्मोनरी रिससिटेशन (CPR) कैसे जीवन बचा सकता है।</p>
<p lang="hi">कार्यक्रम का उद्देश्य था लोगों को यह जागरूक करना कि हार्ट अटैक या आपात स्थिति में समय पर दिया गया CPR किसी की जान बचा सकता है।</p>
<p lang="hi">विशेषज्ञ डॉक्टरों द्वारा प्रतिभागियों को CPR की तकनीक और सही प्रक्रिया का प्रशिक्षण दिया गया।</p>
<p lang="hi">यह सप्ताह समर्पित है — जागरूकता, तत्परता और मानवीय संवेदना को बढ़ाने के लिए।</p>
<p lang="hi">सीखें CPR, बचाएं जीवन!</p>`,
  },
  {
    slug: 'cpr-awareness-highlights-2025',
    kind: 'event',
    title: 'CPR Awareness Highlights',
    excerpt: 'A pledge ceremony and hands-on CPR training for security staff, students and housekeeping staff.',
    category: 'Event',
    publishedAt: '2025-10-17',
    eventDate: '2025-10-17',
    cover: photo('cpr-awareness-highlights', '01.jpg', 1080, 810, 'Hands-on CPR training during CPR Awareness Week'),
    gallery: photos('cpr-awareness-highlights', 'CPR Awareness Week highlights', [
      ['02.jpg', 1080, 810],
      ['03.jpg', 1080, 810],
      ['04.jpg', 1080, 810],
    ]),
    body: `<p>Today, we strengthened our commitment to saving lives!</p>
<p>A pledge ceremony was conducted, followed by hands-on CPR training for security staff, students, and housekeeping staff.</p>
<p>Because every second counts—CPR knowledge is for everyone!</p>`,
  },
  {
    slug: 'world-arthritis-day-2025',
    kind: 'event',
    title: 'World Arthritis Day Celebration',
    excerpt: 'Amaltas marked World Arthritis Day 2025 with an awareness programme.',
    category: 'Event',
    publishedAt: '2025-10-16',
    eventDate: '2025-10-16',
    cover: photo('world-arthritis-day-2025', '01.jpg', 1280, 960, 'World Arthritis Day programme at Amaltas'),
    gallery: photos('world-arthritis-day-2025', 'World Arthritis Day at Amaltas', [
      ['02.jpg', 1280, 720],
      ['03.jpg', 1280, 720],
      ['04.jpg', 1280, 720],
      ['05.jpg', 1280, 720],
      ['06.jpg', 1280, 720],
      ['07.jpg', 1280, 720],
      ['08.jpg', 1280, 960],
      ['09.jpg', 1280, 960],
    ]),
    body: `<p>Amaltas marked World Arthritis Day 2025 with an awareness programme for patients, students and staff.</p>`,
  },
  {
    slug: 'cpr-awareness-week-day-3',
    kind: 'event',
    title: 'CPR Awareness Week: Day 3',
    excerpt: 'Day 3 of CPR Awareness Week featured a pledge ceremony, mass demonstration, street play and hands-on CPR training.',
    category: 'Event',
    publishedAt: '2025-10-15',
    eventDate: '2025-10-15',
    cover: photo('cpr-awareness-week-day-3', '05.jpg', 1600, 1200, 'Hands-on CPR demonstration on a manikin during CPR Awareness Week'),
    gallery: photos('cpr-awareness-week-day-3', 'CPR Awareness Week, day 3', [
      ['01.jpg', 1200, 1600],
      ['02.jpg', 1280, 960],
      ['03.jpg', 1600, 1200],
      ['04.jpg', 1600, 1200],
      ['06.jpg', 1600, 1200],
      ['07.jpg', 1600, 1200],
      ['08.jpg', 1600, 1200],
    ]),
    body: `<p>“Empowered hands, prepared hearts.”</p>
<p>Day 3 of CPR Awareness Week inspired participants through the Pledge Ceremony, Mass Demonstration, Street Play (Nukkad Natak) and Hands-on CPR Training Session — spreading the message that timely action saves lives.</p>`,
  },
  {
    slug: 'world-mental-health-day-2025',
    kind: 'event',
    title: 'World Mental Health Day 2025',
    excerpt: 'Amaltas Nursing College, Dewas, held an awareness rally and street play on the importance of mental health.',
    category: 'Event',
    publishedAt: '2025-10-10',
    eventDate: '2025-10-10',
    eventLocation: 'Dewas',
    cover: photo('world-mental-health-day-2025', '01.jpg', 1280, 853, 'Amaltas Nursing College students on the World Mental Health Day rally'),
    gallery: photos('world-mental-health-day-2025', 'World Mental Health Day 2025', [
      ['02.jpg', 1280, 853],
      ['03.jpg', 1280, 853],
      ['04.jpg', 1280, 853],
      ['05.jpg', 1280, 853],
      ['06.jpg', 1280, 853],
    ]),
    body: `<p>"Mental health is a universal human right."</p>
<p>Amaltas Nursing College, Dewas, held a special programme on the importance of mental health, with a public awareness rally and a street play (nukkad natak).</p>
<p>The aim was to spread awareness about mental illness in society and encourage positive thinking for a healthy life.</p>
<p lang="hi">“मानसिक स्वास्थ्य — एक सार्वभौमिक मानव अधिकार”</p>
<p lang="hi">अमलतास नर्सिंग कॉलेज, देवास द्वारा जनजागरूकता रैली एवं नुक्कड़ नाटक के माध्यम से मानसिक स्वास्थ्य के महत्व पर विशेष कार्यक्रम आयोजित किया गया।</p>
<p lang="hi">इस आयोजन का उद्देश्य समाज में मानसिक रोगों के प्रति जागरूकता फैलाना और स्वस्थ जीवन के लिए सकारात्मक सोच को बढ़ावा देना था।</p>`,
  },
  {
    slug: 'captains-of-industry-2025-award-suresh-bhadoria',
    kind: 'event',
    title: 'Founder Chairman Shri Suresh Bhadoria Honoured with \'Captains of Industry 2025\' Award',
    excerpt: 'Chief Minister Dr. Mohan Yadav presented Amaltas Group Founder Chairman Shri Suresh Bhadoria with the Captains of Industry 2025 award in Bhopal.',
    category: 'Event',
    publishedAt: '2025-10-06',
    eventDate: '2025-10-06',
    eventLocation: 'Bhopal',
    cover: photo('captains-of-industry-2025', '05.jpg', 1600, 1066, 'Chief Minister Dr. Mohan Yadav presenting the Captains of Industry 2025 award to Shri Suresh Bhadoria'),
    gallery: photos('captains-of-industry-2025', 'Captains of Industry 2025 award ceremony, Bhopal', [
      ['01.jpg', 1080, 596],
      ['02.jpg', 1600, 1066],
      ['03.jpg', 1600, 1066],
      ['04.jpg', 1600, 1066],
      ['06.jpg', 1280, 853],
    ]),
    body: `<p>At the 'Captains of Industry: MP's Leading Business Visionaries 2025' ceremony organised by Naidunia–Navdunia (Dainik Jagran Group) in Bhopal, Madhya Pradesh Chief Minister Dr. Mohan Yadav honoured Amaltas Group Founder Chairman Shri Suresh Bhadoria for his outstanding leadership, vision and dedication to social service.</p>
<p>The achievement is not only a symbol of the Amaltas Group's success but also an inspiration for the entire Amaltas family.</p>
<p lang="hi">नवदुनिया-नईदुनिया (दैनिक जागरण समूह) द्वारा भोपाल में आयोजित ‘Captains of Industry: MP’s Leading Business Visionaries 2025’ सम्मान समारोह में मध्यप्रदेश के यशस्वी मुख्यमंत्री श्री डॉ. मोहन यादव जी द्वारा अमलतास ग्रुप के फाउंडर चेयरमैन श्री सुरेश भदौरिया जी को उनके उत्कृष्ट नेतृत्व, दूरदृष्टि और समाजसेवा के प्रति समर्पण के लिए सम्मानित किया गया।</p>
<p lang="hi">यह उपलब्धि न केवल अमलतास ग्रुप की सफलता का प्रतीक है, बल्कि पूरे अमलतास परिवार के लिए प्रेरणा का स्रोत भी है।</p>`,
  },
  {
    slug: 'nasha-mukti-awareness-campaign-2025',
    kind: 'event',
    title: 'Amaltas De-addiction Centre\'s Month-long Public Awareness Campaign',
    excerpt: 'From World No Tobacco Day (31 May) to the International Day against Drug Abuse (26 June), the Amaltas De-addiction Centre ran a month-long awareness campaign.',
    category: 'Event',
    publishedAt: '2025-10-03',
    cover: photo('nasha-mukti-campaign-2025', '05.jpg', 1280, 960, 'Yoga session during the Amaltas de-addiction awareness campaign'),
    gallery: photos('nasha-mukti-campaign-2025', 'Amaltas de-addiction awareness campaign', [
      ['01.jpg', 1536, 1152],
      ['02.jpg', 1280, 960],
      ['03.jpg', 1280, 960],
      ['04.jpg', 1536, 1152],
      ['06.jpg', 1280, 960],
      ['07.jpg', 1280, 960],
      ['08.jpg', 1536, 1152],
      ['09.jpg', 1536, 1152],
    ]),
    body: `<p>A unique public-awareness initiative by the Amaltas De-addiction Centre: a month-long campaign from World No Tobacco Day (31 May) to the International Day against Drug Abuse and Illicit Trafficking (26 June).</p>
<p>It included prabhat pheri (morning processions), rangoli, street plays, yoga, rallies, tree plantation and many other creative awareness efforts. Students and staff of the Ayurvedic, Nursing, Paramedical and Homoeopathy colleges came together to spread the message: "Quit addiction, embrace life!"</p>
<p>Amaltas Hospital Chairman Shri Mayank Raj Singh Bhadoria said: "Addiction is a social evil, and ending it requires public participation and sustained effort."</p>
<p lang="hi">अमलतास नशा मुक्ति केंद्र द्वारा जन-जागृति की अनोखी पहल! विश्व तंबाकू निषेध दिवस (31 मई) से अंतर्राष्ट्रीय नशा निवारण दिवस (26 जून) तक चलाया गया एक माह का जागरूकता अभियान —</p>
<p lang="hi">प्रभात फेरी ‍ रंगोली नुक्कड़ नाटक योग ‍ रैली वृक्षारोपण और जनजागरण के कई रचनात्मक प्रयास।</p>
<p lang="hi">आयुर्वेदिक, नर्सिंग, पैरामेडिकल, होम्योपैथी कॉलेज के छात्र-छात्राओं व स्टाफ ने मिलकर नशा मुक्ति का संदेश दिया — “नशा छोड़ो, जीवन से जुड़ो!”</p>
<p lang="hi">अमलतास हॉस्पिटल के चेयरमैन श्री मयंक राज सिंह भदौरिया जी ने कहा — “नशा एक सामाजिक बुराई है, जिसे समाप्त करने के लिए जन सहभागिता और सतत प्रयास आवश्यक हैं।”</p>`,
  },
  {
    slug: 'world-environment-day-amaltas-nursing',
    kind: 'event',
    title: 'World Environment Day at Amaltas Institute of Nursing Sciences',
    excerpt: 'Amaltas Institute of Nursing Sciences marked World Environment Day.',
    category: 'Event',
    publishedAt: '2025-10-02',
    eventLocation: 'Amaltas Institute of Nursing Sciences, Dewas',
    cover: photo('world-environment-day-nursing', '01.jpg', 1049, 700, 'World Environment Day programme at Amaltas Institute of Nursing Sciences'),
    gallery: photos('world-environment-day-nursing', 'World Environment Day at Amaltas Institute of Nursing Sciences', [
      ['02.jpg', 1050, 700],
      ['03.jpg', 1050, 700],
      ['04.jpg', 1050, 700],
      ['05.jpg', 467, 700],
      ['06.jpg', 1050, 700],
      ['07.jpg', 1050, 700],
      ['08.jpg', 1050, 700],
    ]),
    body: `<p>Amaltas Institute of Nursing Sciences marked World Environment Day with a programme for students and faculty.</p>`,
  },
  {
    slug: 'world-no-tobacco-day-special-cancer-opd',
    kind: 'event',
    title: 'Special Cancer OPD Inaugurated on World No Tobacco Day',
    excerpt: 'A special cancer OPD was inaugurated at Amaltas Medical College on World No Tobacco Day.',
    category: 'Event',
    publishedAt: '2025-10-02',
    eventLocation: 'Amaltas Medical College, Dewas',
    cover: photo('world-no-tobacco-day-cancer-opd', '01.jpg', 1280, 852, 'Inauguration of the special cancer OPD on World No Tobacco Day, Amaltas Medical College'),
    gallery: photos('world-no-tobacco-day-cancer-opd', 'World No Tobacco Day at Amaltas Medical College', [
      ['02.jpg', 1280, 852],
      ['03.jpg', 1280, 852],
      ['04.jpg', 1280, 853],
      ['05.jpg', 1280, 852],
      ['06.jpg', 1280, 852],
      ['07.jpg', 1280, 852],
      ['08.jpg', 1280, 852],
    ]),
    body: `<p>A special cancer OPD was inaugurated at Amaltas Medical College on World No Tobacco Day.</p>`,
  },
  {
    slug: 'cpr-training-program',
    kind: 'event',
    title: 'CPR Training Program',
    excerpt: 'A CPR training session at Amaltas.',
    category: 'Event',
    publishedAt: '2025-10-01',
    cover: photo('cpr-training-program', '01.jpg', 1280, 853, 'CPR training session at Amaltas'),
    gallery: photos('cpr-training-program', 'CPR training program at Amaltas', [
      ['02.jpg', 1280, 853],
    ]),
    body: `<p>A CPR training session was held at Amaltas, teaching participants how to respond in a cardiac emergency.</p>`,
  },
  {
    slug: 'anti-ragging-awareness',
    kind: 'event',
    title: 'Anti-Ragging Awareness',
    excerpt: 'An anti-ragging awareness programme at Amaltas.',
    category: 'Event',
    publishedAt: '2025-10-01',
    cover: photo('anti-ragging', '01.jpg', 1280, 577, 'Students at an anti-ragging awareness programme at Amaltas'),
    gallery: photos('anti-ragging', 'Anti-ragging awareness at Amaltas', [
      ['02.jpg', 1280, 576],
      ['03.jpg', 1280, 576],
      ['04.jpg', 1080, 605],
      ['05.jpg', 1080, 621],
    ]),
    body: `<p>Students and faculty at Amaltas took part in an anti-ragging awareness programme.</p>`,
  },
  {
    slug: 'anganwadi-session',
    kind: 'event',
    title: 'Anganwadi Provisional Session',
    excerpt: 'A session for Anganwadi workers at Amaltas Institute of Medical Sciences.',
    category: 'Event',
    publishedAt: '2025-10-01',
    eventLocation: 'Amaltas Institute of Medical Sciences, Dewas',
    cover: photo('anganwadi-session', '01.jpg', 1600, 1067, 'Anganwadi session at Amaltas Institute of Medical Sciences'),
    gallery: photos('anganwadi-session', 'Anganwadi session at Amaltas', [
      ['02.jpg', 1600, 1067],
      ['03.jpg', 1600, 1067],
      ['04.jpg', 1600, 1067],
    ]),
    body: `<p>Amaltas Institute of Medical Sciences hosted a session for Anganwadi workers.</p>`,
  },
  {
    slug: 'two-day-national-workshop',
    kind: 'event',
    title: 'Two-Day National Workshop',
    excerpt: 'Amaltas hosted a two-day national workshop.',
    category: 'Event',
    publishedAt: '2025-10-01',
    cover: photo('national-workshop-2-day', '01.jpg', 1600, 1066, 'Felicitation at the two-day national workshop at Amaltas'),
    gallery: photos('national-workshop-2-day', 'Two-day national workshop at Amaltas', [
      ['02.jpg', 1600, 1066],
      ['03.jpg', 1600, 1066],
      ['04.jpg', 1600, 1066],
      ['05.jpg', 1600, 1066],
      ['06.jpg', 1600, 1066],
      ['07.jpg', 1600, 1066],
      ['08.jpg', 1600, 1066],
      ['09.jpg', 1600, 1066],
      ['10.jpg', 1600, 1066],
      ['11.jpg', 1600, 1066],
      ['12.jpg', 1600, 1066],
    ]),
    body: `<p>Amaltas hosted a two-day national workshop.</p>`,
  },
  {
    slug: 'republic-day-2025',
    kind: 'event',
    title: 'Republic Day 2025',
    excerpt: 'Amaltas celebrated Republic Day 2025 with flag hoisting and campus celebrations.',
    category: 'Event',
    publishedAt: '2025-01-26',
    eventDate: '2025-01-26',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: photo('republic-day-2025', '11.jpg', 1024, 682, 'Balloon release during the Republic Day 2025 celebration at Amaltas'),
    gallery: photos('republic-day-2025', 'Republic Day 2025 at Amaltas', [
      ['01.jpg', 250, 250],
      ['02.jpg', 250, 250],
      ['03.jpg', 250, 250],
      ['04.jpg', 250, 250],
      ['05.jpg', 250, 250],
      ['06.jpg', 250, 250],
      ['07.jpg', 250, 250],
      ['08.jpg', 250, 250],
      ['09.jpg', 250, 250],
      ['10.jpg', 250, 250],
    ]),
    body: `<p>Amaltas celebrated Republic Day 2025 with flag hoisting and celebrations on campus.</p>`,
  },
];
