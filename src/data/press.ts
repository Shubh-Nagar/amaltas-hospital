
import type { ImageAsset } from '@/types';

export interface PressClippingSlot {
  id: string;
  image?: ImageAsset;
}

const createClipping = (
  id: string,
  src: string,
  alt: string
): PressClippingSlot => ({
  id,
  image: {
    src,
    alt,
  } as ImageAsset,
});

/**
 * All press/news clipping images.
 *
 * Location:
 * public/images/amaltas-news-clippings/
 */

// Numbered clippings
const numberedClippings: PressClippingSlot[] = [];

// 1 - 319
for (let number = 1; number <= 319; number++) {
  numberedClippings.push(
    createClipping(
      'clip-' + number,
      '/images/amaltas-news-clippings/' + number + '-1.webp',
      'Newspaper clipping ' + number + ' featuring Amaltas Hospital'
    )
  );
}

// 320-2.webp
numberedClippings.push(
  createClipping(
    'clip-320',
    '/images/amaltas-news-clippings/320-2.webp',
    'Newspaper clipping 320 featuring Amaltas Hospital'
  )
);

// 321 - 326
for (let number = 321; number <= 326; number++) {
  numberedClippings.push(
    createClipping(
      'clip-' + number,
      '/images/amaltas-news-clippings/' + number + '-1.webp',
      'Newspaper clipping ' + number + ' featuring Amaltas Hospital'
    )
  );
}

// 327-2.webp
numberedClippings.push(
  createClipping(
    'clip-327',
    '/images/amaltas-news-clippings/327-2.webp',
    'Newspaper clipping 327 featuring Amaltas Hospital'
  )
);

// 328 - 329
for (let number = 328; number <= 329; number++) {
  numberedClippings.push(
    createClipping(
      'clip-' + number,
      '/images/amaltas-news-clippings/' + number + '-1.webp',
      'Newspaper clipping ' + number + ' featuring Amaltas Hospital'
    )
  );
}

// 330-1.webp does not exist

// 331 - 352
for (let number = 331; number <= 352; number++) {
  numberedClippings.push(
    createClipping(
      'clip-' + number,
      '/images/amaltas-news-clippings/' + number + '-1.webp',
      'Newspaper clipping ' + number + ' featuring Amaltas Hospital'
    )
  );
}


/**
 * Named clippings
 */
const namedClippings: PressClippingSlot[] = [
  createClipping(
    'clip-353',
    '/images/amaltas-news-clippings/abhishek-child.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-354',
    '/images/amaltas-news-clippings/abhishek-child-1.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-355',
    '/images/amaltas-news-clippings/abhishek-child-2.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-356',
    '/images/amaltas-news-clippings/CCTV-hospital.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-357',
    '/images/amaltas-news-clippings/CCTV-hospital-1.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-358',
    '/images/amaltas-news-clippings/CCTV-hospital-2.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-359',
    '/images/amaltas-news-clippings/CCTV-hospital-3.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-360',
    '/images/amaltas-news-clippings/CCTV-hospital-4.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-361',
    '/images/amaltas-news-clippings/CCTV-hospital-5.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-362',
    '/images/amaltas-news-clippings/download-1a.png',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-363',
    '/images/amaltas-news-clippings/download-1a-150x150.png',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-364',
    '/images/amaltas-news-clippings/ear-news.jpg',
    'Newspaper coverage of Amaltas Hospital ear care'
  ),

  createClipping(
    'clip-365',
    '/images/amaltas-news-clippings/ear-news-1.jpg',
    'Newspaper coverage of Amaltas Hospital ear care'
  ),

  createClipping(
    'clip-366',
    '/images/amaltas-news-clippings/ear-news-2.jpg',
    'Newspaper coverage of Amaltas Hospital ear care'
  ),

  createClipping(
    'clip-367',
    '/images/amaltas-news-clippings/ear-news-3.jpg',
    'Newspaper coverage of Amaltas Hospital ear care'
  ),

  createClipping(
    'clip-368',
    '/images/amaltas-news-clippings/kilkari.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-369',
    '/images/amaltas-news-clippings/kilkari-1.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-370',
    '/images/amaltas-news-clippings/kilkari-2.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-371',
    '/images/amaltas-news-clippings/kilkari-3.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-372',
    '/images/amaltas-news-clippings/kilkari-4.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-373',
    '/images/amaltas-news-clippings/kilkari-5.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-374',
    '/images/amaltas-news-clippings/kilkari-6.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-375',
    '/images/amaltas-news-clippings/nasha-mukti-relly.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-376',
    '/images/amaltas-news-clippings/nasha-mukti-relly-1.jpg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-377',
    '/images/amaltas-news-clippings/ORTHO.jpg',
    'Newspaper coverage of an Amaltas Hospital arthritis camp'
  ),

  createClipping(
    'clip-378',
    '/images/amaltas-news-clippings/ORTHO-1.jpg',
    'Newspaper coverage of Amaltas Hospital'
  ),

  createClipping(
    'clip-379',
    '/images/amaltas-news-clippings/pancreas-cancer.jpg',
    'Newspaper coverage of Amaltas Hospital pancreatic cancer care'
  ),

  createClipping(
    'clip-380',
    '/images/amaltas-news-clippings/pancreas-cancer-1.jpg',
    'Newspaper coverage of Amaltas Hospital pancreatic cancer care'
  ),

  createClipping(
    'clip-381',
    '/images/amaltas-news-clippings/shared-image-16.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-382',
    '/images/amaltas-news-clippings/shared-image-16-300x200.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-383',
    '/images/amaltas-news-clippings/shared-image-17.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-384',
    '/images/amaltas-news-clippings/shared-image-17-300x200.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-385',
    '/images/amaltas-news-clippings/shared-image-43.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-386',
    '/images/amaltas-news-clippings/shared-image-44.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-387',
    '/images/amaltas-news-clippings/shared-image-45.jpeg',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-388',
    '/images/amaltas-news-clippings/Untitled-1.png',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-389',
    '/images/amaltas-news-clippings/Untitled-1-150x150.png',
    'Amaltas Hospital news coverage'
  ),

  createClipping(
    'clip-390',
    '/images/amaltas-news-clippings/workshop-MT.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-391',
    '/images/amaltas-news-clippings/workshop-MT-1.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-392',
    '/images/amaltas-news-clippings/workshop-MT-2.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-393',
    '/images/amaltas-news-clippings/workshop-MT-3.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-394',
    '/images/amaltas-news-clippings/workshop-MT-4.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-395',
    '/images/amaltas-news-clippings/workshop-MT-5.jpg',
    'Amaltas Hospital workshop news coverage'
  ),

  createClipping(
    'clip-396',
    '/images/amaltas-news-clippings/workshop-MT-6.jpg',
    'Amaltas Hospital workshop news coverage'
  ),
];


/**
 * Dated WhatsApp / IMG photographs
 */
const datedImageFiles = [
  'IMG-20251104-WA0121.jpg',
  'IMG-20251104-WA0122.jpg',
  'IMG-20251104-WA0123.jpg',
  'IMG-20251104-WA0125.jpg',
  'IMG-20251104-WA0126.jpg',
  'IMG-20251104-WA0127.jpg',
  'IMG-20251104-WA0128.jpg',
  'IMG-20251104-WA0129.jpg',

  'IMG-20251113-WA0095.jpg',
  'IMG-20251113-WA0096.jpg',
  'IMG-20251113-WA0097.jpg',
  'IMG-20251113-WA0098.jpg',
  'IMG-20251113-WA0099.jpg',

  'WhatsApp-Image-2025-11-11-at-12.32.15_e837ba37.jpg',
  'WhatsApp-Image-2025-11-22-at-15.53.18_375397b0.jpg',

  'WhatsApp-Image-2025-12-01-at-10.29.58_ba217aca.jpg',
  'WhatsApp-Image-2025-12-01-at-10.29.59_3af2a58b.jpg',
  'WhatsApp-Image-2025-12-01-at-10.29.59_e8af787c.jpg',
  'WhatsApp-Image-2025-12-02-at-15.37.48_a56c5272.jpg',
  'WhatsApp-Image-2025-12-05-at-16.34.57_b85a14d1.jpg',
  'WhatsApp-Image-2025-12-05-at-16.34.58_768adb2a.jpg',

  'WhatsApp-Image-2025-12-23-at-11.36.35.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.36.36.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.36.36-1.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.38.38.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.38.39.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.41.32.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.41.32-1.jpeg',
  'WhatsApp-Image-2025-12-23-at-11.41.33.jpeg',

  'WhatsApp-Image-2026-01-17-at-11.05.28.jpeg',
  'WhatsApp-Image-2026-01-17-at-11.05.28-1.jpeg',
  'WhatsApp-Image-2026-01-17-at-11.05.29.jpeg',

  'WhatsApp-Image-2026-01-19-at-15.43.34.jpeg',

  'WhatsApp-Image-2026-01-28-at-20.12.56.jpeg',
  'WhatsApp-Image-2026-01-28-at-20.12.56-1.jpeg',

  'WhatsApp-Image-2026-02-03-at-12.58.20.jpeg',
  'WhatsApp-Image-2026-02-03-at-12.58.21.jpeg',
  'WhatsApp-Image-2026-02-03-at-12.58.21-2.jpeg',

  'WhatsApp-Image-2026-02-07-at-16.15.40.jpeg',
  'WhatsApp-Image-2026-02-07-at-16.15.40-1.jpeg',
  'WhatsApp-Image-2026-02-07-at-16.15.41.jpeg',

  'WhatsApp-Image-2026-02-10-at-16.13.54.jpeg',
  'WhatsApp-Image-2026-02-10-at-16.13.54-1.jpeg',
  'WhatsApp-Image-2026-02-10-at-16.13.55.jpeg',
  'WhatsApp-Image-2026-02-10-at-16.13.55-1.jpeg',
  'WhatsApp-Image-2026-02-10-at-16.13.56.jpeg',

  'WhatsApp-Image-2026-02-27-at-10.05.51.jpeg',
  'WhatsApp-Image-2026-02-27-at-10.05.511.jpeg',

  'WhatsApp-Image-2026-03-14-at-11.55.57.jpeg',
  'WhatsApp-Image-2026-03-14-at-11.56.35.jpeg',
  'WhatsApp-Image-2026-03-14-at-11.57.08.jpeg',
  'WhatsApp-Image-2026-03-14-at-11.57.46.jpeg',

  'WhatsApp-Image-2026-05-13-at-16.51.24.jpeg',
  'WhatsApp-Image-2026-05-13-at-16.51.25.jpeg',
  'WhatsApp-Image-2026-05-13-at-16.51.26.jpeg',

  'WhatsApp-Image-2026-06-18-at-3.45.49-PM.jpeg',
  'WhatsApp-Image-2026-06-18-at-3.47.03-PM.jpeg',
  'WhatsApp-Image-2026-06-22-at-9.11.50-AM.jpeg',

  'WhatsApp-Image-2026-07-07-at-12.33.25-PM.jpeg',
  'WhatsApp-Image-2026-07-07-at-12.33.25-PM-1.jpeg',
  'WhatsApp-Image-2026-07-07-at-12.33.25-PM-2.jpeg',

  'WhatsApp-Image-2026-07-23-at-11.11.58-AM.jpeg',
  'WhatsApp-Image-2026-07-23-at-11.11.58-AM-1.jpeg',
  'WhatsApp-Image-2026-07-23-at-11.11.59-AM.jpeg',
  'WhatsApp-Image-2026-07-23-at-11.11.59-AM-1.jpeg',
  'WhatsApp-Image-2026-07-23-at-11.11.59-AM-2.jpeg',
  'WhatsApp-Image-2026-07-23-at-11.11.59-AM-3.jpeg',

  'WhatsApp-Image-2026-08-04-at-12.02.24-PM.jpeg',
  'WhatsApp-Image-2026-08-05-at-2.16.49-PM.jpeg',
];

const datedClippings: PressClippingSlot[] = datedImageFiles.map(
  (filename, index) =>
    createClipping(
      'clip-' + (397 + index),
      '/images/amaltas-news-clippings/' + filename,
      'Amaltas Hospital event photograph'
    )
);


/**
 * COMPLETE EXPORT
 *
 * This is the named export your News page imports.
 */
export const pressClippingSlots: PressClippingSlot[] = [
  ...numberedClippings,
  ...namedClippings,
  ...datedClippings,
];

