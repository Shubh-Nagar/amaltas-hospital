import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Slide = {
  src: string;
  alt: string;
  caption: string;
  /** Designed posters carry their own text — shown whole, without the caption plate. */
  poster?: boolean;
};

/** Photographs cycled through the stack, front card first. */
const slides: Slide[] = [
  { src: '/images/gallery/operation-theatre.webp', alt: 'Modular operation theatre at Amaltas Hospital', caption: 'Modular operation theatres' },
  { src: '/images/gallery/cath-lab.webp', alt: 'Catheterisation laboratory at Amaltas Hospital', caption: 'Cath lab & interventional suite' },
  {
    src: '/images/gallery/ayushman-care.webp',
    alt: 'Amaltas Hospital poster: 100% free cashless treatment under Ayushman Yojana, senior neuro, cardio, ortho and surgical experts, and 24-hour in-house doctors and emergency care',
    caption: 'Ayushman Yojana cashless treatment',
    poster: true,
  },
  { src: '/images/gallery/neonatal-icu.webp', alt: 'Neonatal intensive care unit at Amaltas Hospital', caption: 'Neonatal intensive care' },
  {
    src: '/images/gallery/knee-pain-care.webp',
    alt: 'Amaltas Hospital poster: knee replacement with advanced German technology for pain-free movement',
    caption: 'Knee replacement',
    poster: true,
  },
  { src: '/images/gallery/emergency-bay.webp', alt: 'Emergency and casualty bay at Amaltas Hospital', caption: '24/7 emergency & casualty' },
  {
    src: '/images/gallery/insurance-cashless.webp',
    alt: 'Amaltas Hospital poster: cashless treatment through insurance companies and TPAs, Mediclaim / cashless help desk 7389910732',
    caption: 'Cashless insurance treatment',
    poster: true,
  },
];

/** How far each card behind the front one is offset. */
/* Cards recede up and to the LEFT so the deck never overflows the container's right edge. */
const OFFSET = { y: 16, x: -16, scale: 0.05, rotate: -2.5 };
const INTERVAL_MS = 3400;
/** Deepest card still fanned out; anything further back is hidden. */
const VISIBLE_DEPTH = 3;

/**
 * A bundled stack of campus photographs for the hero. The front card peels to
 * the back of the deck on an interval, so the stack keeps cycling. Frozen as a
 * static deck under `prefers-reduced-motion`. Clicking (or Enter/Space) advances it.
 */
export function HeroImageStack() {
  const reduce = useReducedMotion();
  const [front, setFront] = useState(0);

  const next = () => setFront((f) => (f + 1) % slides.length);

  /* Keyed on `front` so a manual click restarts the countdown instead of
     letting the auto-advance fire right after it. */
  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(next, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [reduce, front]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Show next photo (now showing: ${slides[front].caption})`}
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          next();
        }
      }}
      className="relative aspect-[4/5] w-full max-w-sm cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      {slides.map((slide, i) => {
        /* 0 = front of the deck, counting backwards through the stack. */
        const depth = (i - front + slides.length) % slides.length;
        /* Cards deeper than the visible fan sit hidden behind its last card. */
        const shown = Math.min(depth, VISIBLE_DEPTH);
        return (
          <motion.figure
            key={slide.src}
            className={`absolute inset-0 overflow-hidden rounded-3xl border border-white/20 shadow-2xl ${slide.poster ? 'bg-white' : 'bg-brand-900'}`}
            style={{ zIndex: slides.length - depth }}
            initial={false}
            animate={{
              y: -shown * OFFSET.y,
              x: shown * OFFSET.x,
              scale: 1 - shown * OFFSET.scale,
              rotate: shown * OFFSET.rotate,
              opacity: depth > VISIBLE_DEPTH ? 0 : depth === VISIBLE_DEPTH ? 0.35 : 1,
            }}
            transition={reduce ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={depth === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`h-full w-full ${slide.poster ? 'object-contain' : 'object-cover'}`}
            />
            {slide.poster ? (
              <figcaption className="sr-only">{slide.caption}</figcaption>
            ) : (
              /* Caption plate — only legible on the front card, which is the point. */
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 to-transparent p-5 pt-12">
                <figcaption className="text-sm font-medium text-white">{slide.caption}</figcaption>
              </div>
            )}
          </motion.figure>
        );
      })}
    </div>
  );
}
