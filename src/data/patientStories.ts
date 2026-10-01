/**
 * Patient story videos published by Amaltas Hospital on its own YouTube
 * channel and embedded on amaltashospital.in/patient-testimonials.
 * `title` is an English rendering of the original Hindi video title, which is
 * kept verbatim in `titleHi`.
 */
export interface PatientStory {
  youtubeId: string;
  title: string;
  titleHi: string;
  /** Short department tag shown on the card. */
  tag: string;
}

export const patientStories: PatientStory[] = [
  { youtubeId: 'vXGUhltRFes', tag: 'Paediatric Cardiology', title: "An 11-month-old's heart saved — successful surgery at a Heart Day camp", titleHi: '11 महीने के मासूम का दिल बचाया | Heart Day शिविर में सफल ऑपरेशन' },
  { youtubeId: 'Z8APZJ_4DVU', tag: 'Cardiology', title: 'Heart blockage treated successfully with rotablation', titleHi: 'रोटा एब्लेशन तकनीक से हार्ट ब्लॉकेज का सफल इलाज | अमलतास अस्पताल, देवास' },
  { youtubeId: 'NMbC5QW2Glc', tag: 'Neurology', title: 'Guillain-Barré Syndrome (GBS) — a rapid recovery', titleHi: 'गिलियन बैरे सिंड्रोम (GBS) - अब तक की सबसे तेज़ और सटीक रिकवरी' },
  { youtubeId: 't2JuFg_BZ4E', tag: 'Cancer Care', title: 'Successful breast cancer surgery gives a woman a new life', titleHi: 'अमलतास अस्पताल में सफल स्तन कैंसर सर्जरी, महिला को मिला नया जीवन' },
  { youtubeId: 'pXAha1J3vKU', tag: 'Nephrology', title: 'Recognising the signs of kidney failure gave a patient a new life', titleHi: 'किडनी फेल के संकेत पहचानकर मरीज़ को मिली नई ज़िंदगी | अमलतास सुपर स्पेशलिटी अस्पताल, देवास' },
  { youtubeId: '5MUHk3kD8P0', tag: 'Surgical Oncology', title: 'Rectal tumour removed using the Kraske technique — a first in Malwa', titleHi: 'पहली बार मालवा में KRASKE तकनीक से बड़ी आंत (रेक्टम) ट्यूमर का सफल ऑपरेशन | अमलतास हॉस्पिटल देवास' },
  { youtubeId: 'QWLvn2PP0Q0', tag: 'ENT', title: "ENT specialists save a 70-year-old woman with complex ear cancer surgery", titleHi: 'अमलतास अस्पताल के ENT विशेषज्ञों ने 70 वर्षीय महिला का जटिल कान कैंसर ऑपरेशन में जीवन बचाया' },
  { youtubeId: 'BAM4uHppMvA', tag: 'Paediatric Cardiology', title: 'Hole in the heart — successful heart surgery for a 2-year-old girl', titleHi: 'हृदय में छेद का सफल उपचार - 2 वर्षीय बच्ची की सफल हार्ट सर्जरी' },
  { youtubeId: 'ZcR-J1fmRaU', tag: 'General Surgery', title: 'A life saved after a ruptured large intestine', titleHi: 'मरीजों को मिले अमलतास में भगवान | बड़ी आंत फटने पर बचाई जान!' },
  { youtubeId: 'ztuLZgeSbEc', tag: 'Burns Care', title: 'Successful treatment of a woman with 65% burns', titleHi: '65% जली महिला का सफलतापूर्वक इलाज' },
  { youtubeId: 'FRvlOhvDkKk', tag: 'Paediatric Cardiology', title: 'Hole in the heart — successful operation for an 18-month-old under Ayushman Bharat', titleHi: '1.5 साल के शिशु के दिल में छेद आयुष्मान भारत योजना के अंतर्गत सफल ऑपरेशन' },
  { youtubeId: '5jrtFg5DCJM', tag: 'Cancer Care', title: 'Breast cancer treated free of cost under Ayushman Bharat', titleHi: 'महिला के ब्रेस्ट कैंसर का आयुष्मान भारत योजना के अंतर्गत अमलतास अस्पताल ,देवास मे हुआ नि:शुल्क इलाज' },
  { youtubeId: 'xGffasRuVag', tag: 'Spine Care', title: 'Spine treated successfully on an Ayushman card', titleHi: 'रीड कि हड्डी का सफलतापूर्वक इलाज आयुष्मान कार्ड पर अमलतास अस्पताल देवास में' },
  { youtubeId: 'qVhnQZqSocQ', tag: 'Cancer Care', title: 'Relief from skin cancer of the nose', titleHi: 'नाक की चमड़ी के कैंसर से मरीज को मिली राह' },
  { youtubeId: 'wMk-FBv1JeU', tag: 'General Surgery', title: 'Relief from a neck lump — free treatment on an Ayushman card', titleHi: 'गर्दन की गठान से मरीज़ को मिली राहत, आयुष्मान कार्ड से हुआ मुफ्त इलाज़' },
  { youtubeId: 'm9mOICcVzCg', tag: 'Maxillofacial Surgery', title: 'From jaw swelling to a healthy smile', titleHi: 'हमारा सफल इलाज | Jaw Swelling to Healthy Smile' },
];

/** The "Corporate Video" embedded in Latest Updates on the amaltashospital.in homepage. */
export const corporateVideo = {
  youtubeId: 'gHl4auUOdCM',
  title: '77th Republic Day celebration at Amaltas University',
  caption:
    'समय के साथ नये आयाम एवं आधुनिक चिकित्सा प्रणाली से बेहतर स्वास्थ्य सेवा देना ही हमारी प्राथमिकता है | सर्वोत्तम ,सर्वोत्कृष्ट, इस अंचल का सबसे सुविधाजनक अस्पताल | हम आपकी सेवा के लिए हमेशा उपलब्ध है।',
};

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
