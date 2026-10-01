import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A horizontally scrolling row that advances one card at a time on its own,
 * wrapping round at either end. Autoplay pauses on hover, focus or touch, and
 * is off under prefers-reduced-motion. Spread `trackProps` on the scrolling
 * list and wire `prev`/`next` to arrow buttons (see CarouselArrows).
 */
export function useStepCarousel<T extends HTMLElement>({ interval = 3500, gap = 20 } = {}) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  /* Bumped on every manual move so autoplay waits a full interval afterwards. */
  const [nudge, setNudge] = useState(0);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + gap), behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => step(1), interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduceMotion, nudge, interval]);

  const manual = (dir: 1 | -1) => { step(dir); setNudge((n) => n + 1); };

  return {
    trackProps: {
      ref,
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
      onTouchStart: () => setPaused(true),
      onTouchEnd: () => setPaused(false),
    },
    prev: () => manual(-1),
    next: () => manual(1),
  };
}

/** Previous / next buttons for a step carousel. */
export function CarouselArrows({ onPrev, onNext, className }: { onPrev: () => void; onNext: () => void; className?: string }) {
  const btn = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-700/20 bg-surface text-brand-800 transition-colors hover:bg-brand-700 hover:text-white';
  return (
    <div className={cn('flex gap-2', className)}>
      <button type="button" onClick={onPrev} aria-label="Previous" className={btn}>
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button type="button" onClick={onNext} aria-label="Next" className={btn}>
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

/** Shared classes for the scrolling list (bleeds to the page gutters). */
export const carouselTrackClass =
  '-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden';
