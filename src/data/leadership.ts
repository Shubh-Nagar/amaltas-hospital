/**
 * Hospital leadership and their messages, as published on
 * amaltashospital.in (chairman-message and administration pages).
 */
export interface Leader {
  slug: string;
  name: string;
  title: string;
  /** Qualifications shown under the title, if any. */
  credentials?: string;
  photo: { src: string; width: number; height: number };
  /** Page path for the full message. */
  href: string;
  /** Short excerpt shown on the homepage card. */
  excerpt: string;
  /** One-line summary used as the page intro and meta description. */
  intro: string;
  /** Full message; a string is a paragraph, a string[] is a bullet list. */
  message: (string | string[])[];
}

export const leaders: Leader[] = [
  {
    slug: 'chairman',
    name: 'Mr. Mayankraj Singh Bhadoria',
    title: 'Chairman, Mayank Welfare Society',
    photo: { src: '/images/about/chairman-mayankraj-singh-bhadoria.jpg', width: 832, height: 1000 },
    href: '/about/chairman-message',
    excerpt:
      'Good quality healthcare should not be a privilege of the elite ones. Since we set up Amaltas Hospital in 2016, my vision and endeavour have been to bring state of the art healthcare to the masses of India.',
    intro: 'Accessible, affordable, world-class healthcare for every section of society.',
    // Full message lives in ChairmanMessagePage.
    message: [],
  },
  {
    slug: 'dean',
    name: 'Dr. (Prof.) Abhilash Kumar Pithawa',
    title: 'Dean',
    credentials: 'MS, FAIS, FMAS, FIAGES',
    photo: { src: '/images/about/dean-abhilash-kumar-pithawa.jpg', width: 630, height: 630 },
    href: '/about/dean-message',
    excerpt:
      'Great doctors are shaped at the bedside. At Amaltas, teaching and patient care go hand in hand, so that every student learns medicine the way it should be practised — with skill, integrity and compassion.',
    intro: 'Where medical education and patient care grow together, with skill, integrity and compassion.',
    message: [
      'Great doctors are shaped at the bedside. At Amaltas, teaching and patient care go hand in hand, so that every student learns medicine the way it should be practised — with skill, integrity and compassion.',
      'As the teaching hospital of Amaltas Institute of Medical Sciences, Amaltas Hospital brings together experienced faculty, modern infrastructure and a wide range of clinical cases under one roof. Our patients benefit from the expertise of senior consultants, while our students and residents gain the hands-on clinical exposure that no textbook can replace.',
      'Our commitment rests on a few simple principles:',
      [
        'Patient first — every clinical and academic decision begins with the well-being of the patient.',
        'Evidence-based practice — we teach and treat in line with current medical knowledge and standard protocols.',
        'Ethics and empathy — we expect our doctors to listen, explain and treat every patient with dignity.',
        'Lifelong learning — through CMEs, workshops and research, our faculty and students keep pace with advances in medicine.',
        'Service to the community — through health camps and outreach, we carry care beyond the hospital walls.',
      ],
      'Medicine is a profession of responsibility. We are proud to be training a new generation of doctors for Central India, and we hold them to the same standard we hold ourselves: to treat each patient as we would want our own family to be treated.',
      'To our patients, thank you for the trust you place in us. To our students, I encourage you to make the most of every opportunity to learn. Together, we will keep working to make Amaltas a centre of excellence in both healthcare and medical education.',
    ],
  },
];

export const getLeader = (slug: string) => leaders.find((l) => l.slug === slug);

