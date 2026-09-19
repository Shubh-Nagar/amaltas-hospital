import type { Article, ImageAsset } from '@/types';

/** Builds a gallery of same-sized event photos from a folder of sequentially-named files. */
const gallery = (folder: string, files: string[], width: number, height: number, alt: string): ImageAsset[] =>
  files.map((f) => ({ src: `/images/events/gallery/${folder}/${f}`, alt, width, height }));

/**
 * News and event items (kind:'news'/'event') are real Amaltas announcements
 * sourced from the hospital's own news/events pages (amaltashospital.in/news,
 * /events). Article entries below are SAMPLE editorial content (sample:true)
 * — general, non-promotional health-education copy used to demonstrate the
 * article template. It makes NO Amaltas-specific medical claims. Replace
 * with real, reviewed editorial content before launch — see
 * docs/qa/content-verification.md.
 */
export const articles: Article[] = [
  {
    slug: 'recognising-stroke-fast',
    kind: 'article',
    title: 'Recognising a Stroke Early: The FAST Approach',
    excerpt: 'Knowing the warning signs of a stroke and acting quickly can protect the brain. Here is a simple way to remember them.',
    category: 'Neurosciences',
    author: 'Amaltas Health Desk',
    publishedAt: '2026-02-10',
    sample: true,
    body: `<p>A stroke is a medical emergency. The faster a person receives care, the better the chance of limiting damage to the brain. A widely used memory aid is <strong>FAST</strong>.</p>
<h2>What FAST stands for</h2>
<ul><li><strong>F — Face:</strong> Ask the person to smile. Does one side droop?</li><li><strong>A — Arms:</strong> Ask them to raise both arms. Does one drift down?</li><li><strong>S — Speech:</strong> Is speech slurred or hard to understand?</li><li><strong>T — Time:</strong> If you notice any of these signs, note the time and seek emergency care immediately.</li></ul>
<h2>Why time matters</h2>
<p>Treatments for stroke are most effective within a limited window after symptoms begin. Do not wait to see if symptoms pass — seek emergency help right away.</p>
<p><em>This article is general health information and is not a substitute for professional medical advice.</em></p>`,
  },
  {
    slug: 'heart-healthy-habits',
    kind: 'article',
    title: 'Five Everyday Habits That Support Heart Health',
    excerpt: 'Small, consistent choices add up. A look at everyday habits that support a healthy heart.',
    category: 'Cardiology',
    author: 'Amaltas Health Desk',
    publishedAt: '2026-01-22',
    sample: true,
    body: `<p>Heart health is shaped by everyday choices as much as by medical care. A few consistent habits can make a meaningful difference over time.</p>
<h2>Habits to build</h2>
<ul><li>Move regularly — aim for consistent physical activity across the week.</li><li>Choose balanced meals with more whole foods and less added salt and sugar.</li><li>Avoid tobacco and limit alcohol.</li><li>Prioritise sleep and manage stress.</li><li>Keep up regular check-ups, especially if you have blood pressure or diabetes.</li></ul>
<p><em>Speak with a doctor before making significant changes, particularly if you have an existing heart condition.</em></p>`,
  },
  {
    slug: 'preparing-for-first-consultation',
    kind: 'article',
    title: 'How to Prepare for Your First Hospital Consultation',
    excerpt: 'A short checklist to help you get the most out of a first visit to a specialist.',
    category: 'Patient Guide',
    author: 'Amaltas Health Desk',
    publishedAt: '2026-03-01',
    sample: true,
    body: `<p>A little preparation helps your consultation go smoothly and ensures your doctor has the information they need.</p>
<h2>Bring with you</h2>
<ul><li>A list of your current medicines and doses.</li><li>Previous reports, scans and discharge summaries.</li><li>A note of your main symptoms and when they started.</li><li>Any questions you want to ask.</li></ul>
<p>If you are visiting for someone else, bring their documents and, where possible, come with them.</p>`,
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
