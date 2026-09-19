import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Photographs cycled through the stack, front card first. */
const slides = [
  { src: '/images/gallery/operation-theatre.webp', alt: 'Modular operation theatre at Amaltas Hospital', caption: 'Modular operation theatres' },
  { src: '/images/gallery/cath-lab.webp', alt: 'Catheterisation laboratory at Amaltas Hospital', caption: 'Cath lab & interventional suite' },
  { src: '/images/gallery/neonatal-icu.webp', alt: 'Neonatal intensive care unit at Amaltas Hospital', caption: 'Neonatal intensive care' },
  { src: '/images/gallery/emergency-bay.webp', alt: 'Emergency and casualty bay at Amaltas Hospital', caption: '24/7 emergency & casualty' },
];

/** How far each card behind the front one is offset. */
/* Cards recede up and to the LEFT so the deck never overflows the container's right edge. */
const OFFSET = { y: 16, x: -16, scale: 0.05, rotate: -2.5 };
const INTERVAL_MS = 3400;

/**
 * A bundled stack of campus photographs for the hero. The front card peels to
 * the back of the deck on an interval, so the stack keeps cycling. Frozen as a
 * static deck under `prefers-reduced-motion`.
 */
export function HeroImageStack() {
  const reduce = useReducedMotion();
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFront((f) => (f + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative aspect-[4/5] w-full max-w-sm">
      {slides.map((slide, i) => {
        /* 0 = front of the deck, counting backwards through the stack. */
        const depth = (i - front + slides.length) % slides.length;
        return (
          <motion.figure
            key={slide.src}
            className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 bg-brand-900 shadow-2xl"
            style={{ zIndex: slides.length - depth }}
            initial={false}
            animate={{
              y: -depth * OFFSET.y,
              x: depth * OFFSET.x,
              scale: 1 - depth * OFFSET.scale,
              rotate: depth * OFFSET.rotate,
              opacity: depth === slides.length - 1 ? 0.35 : 1,
            }}
            transition={reduce ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={depth === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Caption plate — only legible on the front card, which is the point. */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 to-transparent p-5 pt-12">
              <figcaption className="text-sm font-medium text-white">{slide.caption}</figcaption>
            </div>
          </motion.figure>
        );
      })}
    </div>
  );
}
