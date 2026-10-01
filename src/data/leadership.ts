/**
 * Hospital leadership and their messages, as published on
 * amaltashospital.in (chairman-message and administration pages).
 */
export interface Leader {
  slug: string;
  name: string;
  title: string;
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
    slug: 'medical-superintendent',
    name: 'Dr. Mahavir Khandelwal',
    title: 'Medical Superintendent',
    photo: { src: '/images/about/medical-superintendent-mahavir-khandelwal.jpeg', width: 500, height: 500 },
    href: '/about/medical-superintendent-message',
    excerpt:
      'At Amaltas Hospital we foster, promote and practice high quality, ethical, evidence-based medicine. The staff is committed to delivering professional services and outstanding hospitality.',
    intro: 'High quality, ethical, evidence-based medicine, delivered with dignity and respect.',
    message: [
      'At Amaltas Hospital we foster, promote and practice high quality, ethical, evidence-based medicine. The staff is committed to delivering professional services and outstanding hospitality.',
      'These services are provided for all individuals in accordance with their needs and with acknowledgment and respect of cultural diversity, including race, religion, nationality, gender, age, disability and financial status. Our major focus is to establish and promote collaborative partnerships between individuals served, staff and families in order to maintain an environment where services and treatment are provided with dignity and respect to all.',
      'We have a highly qualified and dedicated team of Medical, Administrative and Support staff. The top medical professionals, superior medicine and progressive change make Amaltas Hospital one of the leading hospitals in the area. This whole package among other things is what ensures a high and assured quality of service for all people who visit this Hospital.',
      'Plans are underway to constantly increase and improve the services and clinics that the Hospital offers, both in curative and preventive healthcare applications. We are continuously expanding the practice to meet the growing needs of our patient population. Through this website, we would like to shed light on the activities of our hospitals and developmental plans and strategies that will make them keep pace with all developments in the medical field. As always, we are looking to improve our care and service to you. I want to invite you to take a closer look at our services and tell us how we are doing. We shall only be glad to work towards offering you what you look for in the field of Medicine & Surgery.',
      'We look forward to caring for your current and future health care needs.',
    ],
  },
  {
    slug: 'coo',
    name: 'Dr. Jagat Bahadur Rawat',
    title: 'Chief Operating Officer (COO)',
    photo: { src: '/images/about/coo-jagat-bahadur-rawat.jpg', width: 500, height: 500 },
    href: '/about/coo-message',
    excerpt:
      'Today, we are proud to be one of the preferred healthcare service providers in the state. We would like to sincerely thank the people of Dewas in blessing our efforts.',
    intro: 'Surrounding every patient with compassion, dignity and the best possible medical care.',
    message: [
      'Today, we are proud to be one of the preferred healthcare service providers in the state.',
      [
        'Easily Accessible',
        'Renowned physicians on panel.',
        'We have been a part of the evolution of healthcare in Central India.',
        'We have been continuously striving towards ensuring that we are the most preferred healthcare service provider of the people.',
        'We would like to sincerely thank the people of Dewas in blessing our efforts, without which going ahead, we solicit your wishes & support in making us the best in our league.',
      ],
      'We had a dream to surround our patients with compassion and dignity, and touch each mind, body and spirit with best possible medical care — this was the goal we have set for ourselves. This is our life’s work create a single super-specialty hospital for all replacement surgeries where every patient is treated as a V I P Guest leaves the hospital with proud and confident gait. I am Proud to be a part of an exclusive centre of excellence in health care sector. I assure promise not to disappoint anyone coming to seek best possible health care at Amaltas Hospital.',
    ],
  },
];

export const getLeader = (slug: string) => leaders.find((l) => l.slug === slug);
