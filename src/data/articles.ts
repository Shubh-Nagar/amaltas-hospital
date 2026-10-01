import type { Article, ImageAsset } from '@/types';

/** Builds a gallery of same-sized event photos from a folder of sequentially-named files. */
const gallery = (folder: string, files: string[], width: number, height: number, alt: string): ImageAsset[] =>
  files.map((f) => ({ src: `/images/events/gallery/${folder}/${f}`, alt, width, height }));

/**
 * News and event items (kind:'news'/'event') are real Amaltas announcements
 * sourced from the hospital's own news/events pages (amaltashospital.in/news,
 * /events). Article entries (kind:'article') are the hospital's own blog
 * posts, written by Amaltas doctors and published at amaltashospital.in/blog;
 * their cover images are downloaded from those posts.
 */
export const articles: Article[] = [
  {
    slug: 'dry-eye-a-common-problem-we-often-ignore',
    kind: 'article',
    title: 'Dry Eye: A Common Problem We Often Ignore',
    excerpt: 'Dry eye is one of the most common eye complaints today. Its causes, symptoms, simple prevention habits and treatment options.',
    category: 'Ophthalmology',
    author: 'Dr. Vandana Telgote, HOD & Professor, Department of Ophthalmology AIMS, Dewas',
    publishedAt: '2026-01-23',
    cover: { src: '/images/articles/dry-eye-a-common-problem-we-often-ignore.jpeg', alt: 'Dry Eye: A Common Problem We Often Ignore', width: 640, height: 360 },
    body: `<p>Dry eye is one of the most common eye complaints today, especially in an era dominated by screens, air-conditioning, pollution, and hectic lifestyles. It occurs when the eyes do not produce enough tears, or when the tears evaporate too quickly, leading to discomfort and visual disturbance.</p><h2>Common Symptoms</h2><p>People with dry eye may experience:</p><ul><li>Burning or stinging sensation</li><li>Foreign body sensation (“sand in the eyes”)</li><li>Redness and irritation</li><li>Blurred or fluctuating vision</li><li>Excessive watering (a reflex response to dryness)</li></ul><h2>Why Does Dry Eye Happen?</h2><p>Dry eye can be caused by multiple factors such as:</p><ul><li>Prolonged screen use and reduced blinking</li><li>Increasing age</li><li>Hormonal changes</li><li>Contact lens wear</li><li>Air-conditioning, smoke, or pollution</li><li>Certain medications</li><li>Underlying eyelid or systemic conditions</li></ul><h2>Prevention: Small Habits, Big Relief</h2><p>Dry eye can often be prevented or minimized with simple lifestyle changes:</p><ul><li>Follow the 20-20-20 rule while using screens (Looks 20 meters away for 20 seconds every 20 minutes.)</li><li>Blink consciously during prolonged near work</li><li>Maintain good eyelid hygiene</li><li>Stay hydrated and maintain a balanced diet rich in omega-3 fatty acids</li><li>Protect your eyes from wind, dust, and dry environments</li></ul><h2>Treatment Options</h2><p>Treatment depends on the severity and cause:</p><ul><li>Lubricating eye drops (artificial tears) are the mainstay of treatment</li><li>Gel or ointments for night-time relief in severe cases</li><li>Warm compresses and lid hygiene for associated eyelid issues</li><li>Prescription medications in chronic or inflammatory dry eye</li><li>Lifestyle modification remains a crucial long-term strategy</li></ul><h2>Final Thoughts</h2><p>Dry eye may seem like a minor issue, but if left untreated, it can significantly affect quality of life and vision. Early recognition, preventive care, and timely treatment can keep your eyes comfortable and healthy.</p><p>Your eyes work hard for you every day—don’t forget to care for them.</p>`,
  },
  {
    slug: 'urology-urologist-deal-with-diseases-of-urinary-tract',
    kind: 'article',
    title: 'Urology / Urologist deal with diseases of urinary tract',
    excerpt: 'Common urological symptoms, the concerns that arise at each age, and when you should see a urologist.',
    category: 'Urology',
    author: 'Dr. Devesh Bansal, Urologist',
    publishedAt: '2025-11-27',
    cover: { src: '/images/articles/urology-urologist-deal-with-diseases-of-urinary-tract.jpg', alt: 'Urology / Urologist deal with diseases of urinary tract', width: 1200, height: 800 },
    body: `<p>Urologists deal with diseases of the urinary tract (kidney, ureter, bladder, urethra) and the male reproductive system (prostate, testis, penis).</p><h2>Common Signs &amp; Symptoms of Urological Issues</h2><ul><li>Pain or Burning during Urination</li><li>Blood in Urine</li><li>Frequent or Urgent Need to Urinate</li><li>Difficulty Starting Urination or Weak Urine Stream</li><li>Leakage or Incontinence</li><li>Lower Abdominal, Pelvic, or Flank Pain</li><li>Pain or Swelling in Testicles</li><li>Erectile Dysfunction</li><li>Fever with Urinary Symptoms (Possible Urinary Tract Infection)</li></ul><h2>Urological Concerns by Age Group</h2><h3>Children</h3><ul><li>Bed-wetting (Enuresis)</li><li>Congenital Urinary Tract Problems</li><li>Urinary Infection</li></ul><h3>Young Adult (20–40 years)</h3><ul><li>Kidney Stones</li><li>Urinary Infections</li><li>Fertility Issues / Testicular Cancer</li><li>Erectile Dysfunction due to Stress or Lifestyle</li></ul><h3>Middle Age (40–60 years)</h3><ul><li>Enlarged Prostate (BPH) – Often Begins</li><li>More Frequent Kidney Stones</li><li>Increased Risk of Erectile Dysfunction</li><li>Prostatitis</li><li>Phimosis</li><li>Paraphimosis</li></ul><h3>Older Adult (60+ years)</h3><ul><li>Prostate Cancer Risk Increases Significantly</li><li>Bladder Control Issues / Incontinence</li><li>Chronic Kidney Disease</li><li>Recurrent UTI (Urinary Tract Infection)</li></ul><h2>When to See a Urologist</h2><p>Seek medical help if you experience:</p><ul><li>Blood in Urine (Hematuria)</li><li>Persistent Pain in Kidney or Bladder</li><li>Difficulty Urinating or Urinary Retention</li><li>Sexual Dysfunction or Infertility</li><li>Recurrent Urinary Infection</li></ul>`,
  },
  {
    slug: 'quit-tobacco-prevent-cancer',
    kind: 'article',
    title: 'Quit Tobacco – Prevent Cancer',
    excerpt: 'Most oral and head & neck cancers are linked to tobacco. Simple tips, and why early detection is key to treatment.',
    category: 'Oncology',
    author: 'Dr. Ankit Gupta, Consultant Maxillofacial Head & Neck Cancer Surgeon, Amaltas Hospital, Dewas',
    publishedAt: '2025-11-22',
    cover: { src: '/images/articles/quit-tobacco-prevent-cancer.jpg', alt: 'Quit Tobacco – Prevent Cancer', width: 1024, height: 640 },
    body: `<p>Most of the oral cancer of head &amp; neck cancer caused by the consumption of tobacco (smoke/smokeless). Who diagnosed positive for cancer, we provide comprehensive treatment which includes surgical resection of tumor or disease &amp; reconstruction of resulted part with flap &amp; also provide chemotherapy for advanced stage cancer patients or palliative care patients.</p><h2>Small Tips</h2><ul><li>Live healthy life free of ill habits</li><li>Eat healthy diet</li><li>Quit tobacco &amp; alcohol</li><li>Do regular check-up 6 monthly</li></ul><p>Early detection of cancer is key of treatment. At Amaltas Hospital we are running Tobacco Cessation Center to help those who are not able to quit the habit by themselves.</p><p>Apart from tobacco cessation we are running cancer unit also for those.</p><p>If you notice any abnormal ulcer or lump don’t ignore it &amp; get those problems checked by specialist at Amaltas Hospital.</p>`,
  },
  {
    slug: 'department-of-ophthalmology',
    kind: 'article',
    title: 'Department of ophthalmology',
    excerpt: 'What the Department of Ophthalmology treats, from cataract and retinal disease to glaucoma, and the tests it performs.',
    category: 'Ophthalmology',
    author: 'Dr. Deepshikha Solanki, MS (Ophthalmology), Professor, Dept. of Ophthalmology, Amaltas Hospital, Dewas',
    publishedAt: '2025-11-18',
    cover: { src: '/images/articles/department-of-ophthalmology.jpeg', alt: 'Department of ophthalmology', width: 1280, height: 720 },
    body: `<p>Ophthalmology department of amaltas institute of medical science deals with the diagnosis, treatment, and surgery of eye diseases and disorders.</p><p>Here we deal with Cataract, retinal disease(including diabetic retinopathy and other types of retinopathies glaucoma, corneal disease, eyelid and orbital disorders, uveitis, strabismus and disorders of the ocular muscles, ocular neoplasms (cancers and benign eye tumors), neuro-ophthalmologic disorders (including disorders of the optic nerve)</p><p>We perform various tests like Ophthalmoscopy, visual field test, optical coherence tomography</p><p>Automated perimetry.</p>`,
  },
  {
    slug: 'physiotherapy-the-power-of-movement',
    kind: 'article',
    title: 'Physiotherapy – The Power of Movement',
    excerpt: 'How physiotherapy helps the body heal through movement: the problems it treats and simple everyday tips.',
    category: 'Physiotherapy',
    author: 'Dr. Neha Gaur, Head of Physiotherapy Department, Amaltas Hospital, Dewas',
    publishedAt: '2025-11-17',
    cover: { src: '/images/articles/physiotherapy-the-power-of-movement.jpeg', alt: 'Physiotherapy – The Power of Movement', width: 980, height: 980 },
    body: `<h2>फिजियोथेरेपी – चलने से इलाज</h2><p>Physiotherapy helps your body heal naturally through movement and exercise. At Amaltas Hospital, Dewas, our aim is to make patients healthy, active, and pain-free.</p><p>Many people suffer from back pain, joint pain, or stiffness due to long sitting hours or lack of exercise. Physiotherapy reduces pain, improves strength, and restores movement.</p><h2>Common Problems Treated</h2><ul><li>Back and neck pain</li><li>Joint stiffness and arthritis</li><li>Sports or accidental injuries</li><li>Post-surgery recovery</li><li>Paralysis or nerve weakness</li></ul><h2>Simple Tips</h2><ul><li>Sit and stand with correct posture</li><li>Do light stretching daily</li><li>Don’t sit for too long — take small walks</li><li>Follow your physiotherapist’s advice regularly</li></ul><p>Early physiotherapy gives faster and better results. If you feel pain or movement difficulty, don’t ignore it — get professional help. At Amaltas Hospital, under Dr. Neha Gaur’s guidance, we provide safe and personalized physiotherapy care for all ages.</p><p><strong>Stay Active • Stay Healthy • Stay Pain-Free!</strong></p>`,
  },
  {
    slug: 'de-addiction-meaning-and-importance',
    kind: 'article',
    title: 'De-addiction: Meaning and Importance',
    excerpt: 'What de-addiction means, how treatment and counselling help, and why recovery is a continuous process.',
    category: 'Psychiatry',
    author: 'Dr. Ashutosh Bhatele, Assistant Professor, Department of Psychiatry, Amaltas Medical College Dewas',
    publishedAt: '2025-11-15',
    cover: { src: '/images/articles/de-addiction-meaning-and-importance.jpeg', alt: 'De-addiction: Meaning and Importance', width: 1280, height: 720 },
    body: `<p>De-addiction means freedom from addiction. It is a process that helps a person overcome dependence on a substance (such as alcohol or drugs) or an addictive activity (such as gambling or gaming). De-addiction typically involves medical treatment, counselling, and support groups to help individuals gain control over their addiction and lead a healthier, better life.</p><h2>Key Aspects of De-addiction</h2><h3>1. Freedom from Addiction</h3><p>De-addiction aims to free a person from any type of addiction—whether it is related to substances like drugs or alcohol, or behavioural addictions such as gambling or excessive gaming.</p><h3>2. Medical Treatment and Counselling</h3><p>The de-addiction process often includes medications, individual and group therapy, psychological counselling, and life-skills training. These interventions help patients manage withdrawal symptoms, understand their triggers, and adopt healthier habits.</p><h3>3. Support from Rehabilitation Centres</h3><p>Rehabilitation centres play a crucial role in recovery. They provide a structured environment where trained professionals support patients in healing physically, mentally, and emotionally.</p><h3>4. A Continuous Recovery Process</h3><p>De-addiction is not a one-time event—it is a long, ongoing journey. It requires consistent support, motivation, and lifestyle changes to maintain long-term recovery.</p><h3>5. Covers Various Types of Addictions</h3><p>De-addiction is not limited to alcohol or drugs. It is equally applicable to behavioural addictions such as gambling, online gaming, or any compulsive activity that affects a person’s well-being.</p>`,
  },
  {
    slug: 'ayurveda-day-airport-health-camp-2026',
    kind: 'event',
    title: 'Free Health Check-up Camp at Indore Airport on Ayurveda Day',
    excerpt: 'Under the Yatri Seva Abhiyaan, Amaltas Institute of Medical Sciences held a free health check-up camp for passengers, stakeholders and staff at Devi Ahilyabai Holkar Airport, Indore.',
    category: 'Event',
    publishedAt: '2026-09-23',
    eventDate: '2026-09-23',
    eventLocation: 'Devi Ahilyabai Holkar Airport, Indore',
    cover: { src: '/images/events/gallery/airport-camp/01.jpeg', alt: 'Amaltas doctors conducting free health check-ups at Devi Ahilyabai Holkar Airport, Indore', width: 1600, height: 1200 },
    gallery: [
      { src: '/images/events/gallery/airport-camp/02.jpeg', alt: 'Health check-up camp at Indore Airport on Ayurveda Day 2026', width: 1600, height: 1200 },
      { src: '/images/events/gallery/airport-camp/03.jpeg', alt: 'Health check-up camp at Indore Airport on Ayurveda Day 2026', width: 1280, height: 960 },
    ],
    body: `<p>On the occasion of Ayurveda Day 2026, under the Yatri Seva Abhiyaan, Amaltas Institute of Medical Sciences organised a free health check-up camp at Devi Ahilyabai Holkar Airport, Indore. Passengers, stakeholders and airport staff received health check-ups, medical consultation and guidance.</p>
<p lang="hi">Ayurveda Day 2026 के अवसर पर Yatri Seva Abhiyaan के अंतर्गत Amaltas Institute of Medical Sciences द्वारा Devi Ahilyabai Holkar Airport, Indore में निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया गया।</p>
<p lang="hi">इस शिविर में यात्रियों, स्टेकहोल्डर्स एवं एयरपोर्ट स्टाफ को स्वास्थ्य जांच, चिकित्सकीय परामर्श एवं स्वास्थ्य संबंधी आवश्यक मार्गदर्शन प्रदान किया गया।</p>
<p lang="hi">Amaltas – स्वास्थ्य सेवा के साथ, समाज की सेवा के लिए।</p>`,
  },
  {
    slug: 'union-minister-visit-medical-inspection-room-2026',
    kind: 'event',
    title: 'Union Minister of State Shri Ramdas Athawale Visits the Amaltas Medical Inspection Room',
    excerpt: "Hon'ble Union Minister of State Shri Ramdas Athawale visited the Amaltas Institute of Medical Sciences Medical Inspection Room and appreciated the hospital's efforts to improve medical facilities.",
    category: 'Event',
    publishedAt: '2026-09-09',
    eventDate: '2026-09-09',
    eventLocation: 'Medical Inspection Room, Indore Airport',
    cover: { src: '/images/events/gallery/minister-visit/01.jpeg', alt: 'Union Minister of State Shri Ramdas Athawale with the Amaltas team at the Medical Inspection Room, Indore Airport', width: 1440, height: 1422 },
    body: `<p>Hon'ble Union Minister of State Shri Ramdas Athawale paid a gracious visit to the Medical Inspection Room of Amaltas Institute of Medical Sciences. The Minister appreciated the efforts being made to improve the medical facilities and health services of Amaltas Hospital. His guidance and encouragement are a source of inspiration for us.</p>
<p lang="hi">माननीय केंद्रीय राज्य मंत्री श्री रामदास अठावले जी का अमलतास इंस्टीट्यूट ऑफ मेडिकल साइंसेज के ‘मेडिकल इंस्पेक्शन रूम’ में गरिमामयी आगमन हुआ।</p>
<p lang="hi">माननीय मंत्री जी ने अमलतास अस्पताल की चिकित्सा सुविधाओं एवं स्वास्थ्य सेवाओं को बेहतर बनाने की दिशा में किए जा रहे प्रयासों की सराहना की।</p>
<p lang="hi">उनका मार्गदर्शन एवं प्रोत्साहन हमारे लिए प्रेरणास्रोत है।</p>`,
  },
  {
    slug: 'amaltas-medical-inspection-room-indore-airport',
    kind: 'news',
    title: 'Amaltas Medical Inspection Room at Indore Airport',
    excerpt: 'The Amaltas Medical Inspection Room at Indore Airport provides passengers with prompt, quality first aid and medical assistance during travel.',
    category: 'Hospital News',
    publishedAt: '2026-09-15',
    cover: { src: '/images/events/gallery/airport-medical-room/04.jpeg', alt: 'An Amaltas doctor consulting with a passenger at the Medical Inspection Room, Indore Airport', width: 1170, height: 1170 },
    gallery: gallery('airport-medical-room', ['01.jpeg', '02.jpeg', '03.jpeg'], 1170, 1170, 'Amaltas Medical Inspection Room, Indore Airport'),
    body: `<p>The Amaltas Medical Inspection Room at Indore Airport is always ready to provide passengers with immediate, quality first-aid services. In case of any health problem during travel, passengers receive timely first aid and the medical assistance they need.</p>
<p lang="hi">इंदौर एयरपोर्ट पर स्थित अमलतास मेडिकल इंस्पेक्शन रूम यात्रियों की स्वास्थ्य संबंधी आवश्यकताओं के लिए तत्काल एवं गुणवत्तापूर्ण प्राथमिक चिकित्सा सेवाएँ उपलब्ध कराने के लिए सदैव तत्पर है।</p>
<p lang="hi">यात्रा के दौरान किसी भी स्वास्थ्य संबंधी परेशानी की स्थिति में यात्रियों को समय पर प्राथमिक उपचार एवं आवश्यक चिकित्सकीय सहायता प्रदान की जाती है।</p>
<p lang="hi">आपकी सुरक्षित यात्रा, हमारी जिम्मेदारी। अमलतास — स्वास्थ्य सेवा में सदैव आपके साथ।</p>`,
  },
  {
    slug: 'pediatrics-ug-quiz-competition-2026',
    kind: 'news',
    title: 'Pediatrics UG Quiz Competition 2026',
    excerpt: 'MBBS students at Amaltas Institute of Medical Sciences took part in a pediatrics quiz testing their clinical knowledge and teamwork.',
    category: 'Hospital News',
    publishedAt: '2026-08-04',
    cover: { src: '/images/news/pediatrics-ug-quiz-2026.jpeg', alt: 'MBBS students and faculty at the Pediatrics UG Quiz Competition 2026', width: 1024, height: 682 },
    body: `<p>Amaltas Institute of Medical Sciences hosted a Pediatrics UG Quiz Competition for its MBBS students, giving participants a chance to test their clinical knowledge of child health topics in a team format.</p>
<p>Participating students were felicitated with certificates recognising their preparation and performance on the day.</p>`,
  },
  {
    slug: 'independence-day-celebration-2026',
    kind: 'news',
    title: 'Independence Day Celebration at Amaltas Super Speciality Hospital',
    excerpt: "Amaltas Super Speciality Hospital and Amaltas University, Dewas, marked India's Independence Day with a campus celebration.",
    category: 'Hospital News',
    publishedAt: '2026-08-19',
    cover: { src: '/images/news/independence-day-2026.jpeg', alt: "Independence Day celebration at Amaltas Super Speciality Hospital and Amaltas University, Dewas", width: 1024, height: 682 },
    body: `<p>Amaltas Super Speciality Hospital and Amaltas University, Dewas, came together to mark India's Independence Day with a campus celebration.</p>
<p>Hospital and university leadership, along with staff, exchanged greetings as part of the occasion.</p>`,
  },
  {
    slug: 'independence-day-celebration-2026',
    kind: 'event',
    title: 'Independence Day Celebration at Amaltas Super Speciality Hospital',
    excerpt: "Amaltas Super Speciality Hospital and Amaltas University, Dewas, marked India's Independence Day with a campus celebration.",
    category: 'Event',
    publishedAt: '2026-08-19',
    eventDate: '2026-08-15',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/news/independence-day-2026.jpeg', alt: "Independence Day celebration at Amaltas Super Speciality Hospital and Amaltas University, Dewas", width: 1024, height: 682 },
    gallery: gallery('independence-day', Array.from({ length: 16 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1600, 1066, "Independence Day celebration at Amaltas Super Speciality Hospital and Amaltas University, Dewas"),
    body: `<p>Amaltas Super Speciality Hospital and Amaltas University, Dewas, came together to mark India's Independence Day with a campus celebration.</p>
<p>Hospital and university leadership, along with staff, exchanged greetings as part of the occasion.</p>`,
  },
  {
    slug: 'pediatrics-ug-quiz-competition-2026',
    kind: 'event',
    title: 'Pediatrics UG Quiz Competition 2026',
    excerpt: 'MBBS students at Amaltas Institute of Medical Sciences took part in a pediatrics quiz testing their clinical knowledge and teamwork.',
    category: 'Event',
    publishedAt: '2026-08-04',
    eventDate: '2026-08-04',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/news/pediatrics-ug-quiz-2026.jpeg', alt: 'MBBS students and faculty at the Pediatrics UG Quiz Competition 2026', width: 1024, height: 682 },
    gallery: gallery('pediatrics-quiz', Array.from({ length: 6 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1600, 1066, 'MBBS students and faculty at the Pediatrics UG Quiz Competition 2026'),
    body: `<p>Amaltas Institute of Medical Sciences hosted a Pediatrics UG Quiz Competition for its MBBS students, giving participants a chance to test their clinical knowledge of child health topics in a team format.</p>
<p>Participating students were felicitated with certificates recognising their preparation and performance on the day.</p>`,
  },
  {
    slug: 'cm-visit-tonakkala-accident-victims',
    kind: 'event',
    title: 'Chief Minister Dr. Mohan Yadav Visits Amaltas Hospital to Meet Accident Victims',
    excerpt: "Madhya Pradesh Chief Minister Dr. Mohan Yadav, along with senior public representatives, visited Amaltas Hospital to check on patients admitted following an accident near Tonakkala.",
    category: 'Event',
    publishedAt: '2026-05-16',
    eventDate: '2026-05-16',
    eventLocation: 'Amaltas Hospital, Dewas',
    cover: { src: '/images/events/cm-visit-tonakkala.jpg', alt: 'Chief Minister Dr. Mohan Yadav and public representatives at Amaltas Hospital', width: 1024, height: 683 },
    // Photos showing graphic patient injuries (source filenames 05, 13, 19, 20, 24) are
    // deliberately excluded out of respect for patient dignity/privacy.
    gallery: gallery(
      'cm-visit',
      ['01', '02', '03', '04', '06', '07', '08', '09', '10', '11', '12', '14', '15', '16', '17', '18', '21', '22', '23', '25', '26', '27'].map((n) => `${n}.jpg`),
      1080, 720,
      'Chief Minister Dr. Mohan Yadav and public representatives at Amaltas Hospital',
    ),
    body: `<p>Madhya Pradesh Chief Minister Dr. Mohan Yadav, along with senior public representatives, visited Amaltas Hospital to check on the condition of patients admitted following an accident near Tonakkala.</p>
<p>Hospital staff briefed the visiting dignitaries on the treatment being provided to those admitted.</p>`,
  },
  {
    slug: 'nurses-day-celebration-2026',
    kind: 'event',
    title: 'Nurses Day Celebration',
    excerpt: 'Amaltas marked International Nurses Day with a celebration recognising its nursing staff.',
    category: 'Event',
    publishedAt: '2026-05-12',
    eventDate: '2026-05-12',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/nurses-day-2026.jpeg', alt: 'Nursing staff and faculty at the International Nurses Day celebration at Amaltas', width: 1024, height: 576 },
    gallery: gallery('nurses-day', Array.from({ length: 9 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1080, 608, 'Nursing staff and faculty at the International Nurses Day celebration at Amaltas'),
    body: `<p>Amaltas marked International Nurses Day with a campus celebration recognising the contribution of its nursing staff.</p>
<p>Nurses, faculty and hospital staff gathered for the occasion, which included a small felicitation.</p>`,
  },
  {
    slug: 'kilkari-poshan-abhiyan-launch',
    kind: 'event',
    title: "Launch of 'Kilkari Poshan Abhiyan' at Amaltas",
    excerpt: "A Dewas district administration nutrition initiative, 'Kilkari Poshan Abhiyan', was launched at Amaltas with a ribbon-cutting ceremony.",
    category: 'Event',
    publishedAt: '2026-05-12',
    eventDate: '2026-05-12',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/kilkari-abhiyan-2.jpeg', alt: "Ribbon-cutting ceremony for the Kilkari Poshan Abhiyan nutrition campaign at Amaltas", width: 1024, height: 576 },
    gallery: gallery('kilkari', Array.from({ length: 9 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1080, 608, 'Kilkari Poshan Abhiyan nutrition campaign at Amaltas'),
    body: `<p>'Kilkari Poshan Abhiyan', a nutrition-awareness initiative of the Dewas district administration, was launched with a ribbon-cutting ceremony held on the Amaltas campus.</p>
<p>Hospital representatives joined district officials for the launch.</p>`,
  },
  {
    slug: 'special-workshop-amaltas-april-2026',
    kind: 'event',
    title: 'Special Workshop at Amaltas Super Speciality Hospital',
    excerpt: 'Amaltas Super Speciality Hospital hosted a special workshop for its medical team.',
    category: 'Event',
    publishedAt: '2026-04-11',
    eventDate: '2026-04-11',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/special-workshop-april-2026.jpeg', alt: 'Visiting dignitaries touring the hospital during a special workshop at Amaltas', width: 1024, height: 682 },
    gallery: gallery('workshop', Array.from({ length: 8 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1600, 1066, 'Visiting dignitaries touring the hospital during a special workshop at Amaltas'),
    body: `<p>Amaltas Super Speciality Hospital hosted a special workshop on its campus, bringing visiting dignitaries and the hospital's medical team together.</p>
<p>[CONTENT REQUIRES VERIFICATION] — confirm the workshop's specific subject and speakers before publishing further detail.</p>`,
  },
  {
    slug: 'tb-eradication-program-2026',
    kind: 'event',
    title: 'TB Eradication Program',
    excerpt: 'Amaltas Institute of Medical Sciences marked World Tuberculosis Day with an awareness program for its students and staff.',
    category: 'Event',
    publishedAt: '2026-03-24',
    eventDate: '2026-03-24',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/tb-eradication-program.jpeg', alt: 'Students and faculty at the National Tuberculosis Eradication Program awareness event at Amaltas', width: 1024, height: 1024 },
    gallery: gallery('tb', Array.from({ length: 5 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1080, 1080, 'National Tuberculosis Eradication Program awareness event at Amaltas'),
    body: `<p>Amaltas Institute of Medical Sciences held an awareness event for the National Tuberculosis Eradication Program, marking World Tuberculosis Day with its students and faculty.</p>
<p>The event highlighted the campaign's public-health message of early diagnosis and treatment to help eradicate TB.</p>`,
  },
  {
    slug: 'world-down-syndrome-day-2026',
    kind: 'event',
    title: 'World Down Syndrome Day',
    excerpt: 'Amaltas marked World Down Syndrome Day (21 March) with an awareness event for staff, students and families.',
    category: 'Event',
    publishedAt: '2026-03-21',
    eventDate: '2026-03-21',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/world-down-syndrome-day.jpeg', alt: 'Staff, students and families at the World Down Syndrome Day awareness event at Amaltas', width: 1024, height: 1024 },
    gallery: gallery('downsyndrome', Array.from({ length: 2 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1080, 1080, 'World Down Syndrome Day awareness event at Amaltas'),
    body: `<p>Amaltas marked World Down Syndrome Day, observed internationally on 21 March, with an awareness event bringing together staff, students and families.</p>
<p>The occasion carried the theme of inclusion, reflected in the campus banner "Together Against Loneliness".</p>`,
  },
  {
    slug: 'orientation-aims-2026',
    kind: 'event',
    title: 'Orientation at Amaltas Institute of Medical Sciences',
    excerpt: 'Amaltas Institute of Medical Sciences held an orientation ceremony welcoming a new batch of students.',
    category: 'Event',
    publishedAt: '2026-03-15',
    eventDate: '2026-03-15',
    eventLocation: 'Amaltas Campus, Dewas',
    cover: { src: '/images/events/orientation-aims.jpeg', alt: 'Orientation ceremony at Amaltas Institute of Medical Sciences', width: 1024, height: 683 },
    gallery: gallery('orientation', Array.from({ length: 8 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpeg`), 1080, 720, 'Orientation ceremony at Amaltas Institute of Medical Sciences'),
    body: `<p>Amaltas Institute of Medical Sciences held an orientation ceremony welcoming a new batch of students to the institute.</p>
<p>Faculty and leadership joined the occasion, which included a traditional inaugural lamp-lighting.</p>`,
  },
];
