import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Endless horizontal scroller. Items are rendered twice so the loop is
 * seamless; the second copy is hidden from assistive tech and keyboard.
 * Pauses on hover/focus. Under prefers-reduced-motion it stops animating and
 * becomes a normal swipeable row.
 */
export function Marquee<T>({
  items,
  render,
  getKey,
  duration = 40,
  reverse = false,
  className,
  itemClassName,
}: {
  items: T[];
  render: (item: T, copy: boolean) => ReactNode;
  getKey: (item: T) => string;
  /** Seconds for one full loop. */
  duration?: number;
  /** Scroll left-to-right instead of right-to-left. */
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div
      className={cn(
        'group/marquee relative overflow-hidden motion-reduce:overflow-x-auto',
        '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]',
        className,
      )}
    >
      <ul
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
        className={cn(
          'marquee-track flex w-max gap-4 py-2',
          reverse && 'marquee-ltr',
        )}
      >
        {[false, true].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy ? 'b' : 'a'}-${getKey(item)}`}
              aria-hidden={copy || undefined}
              className={cn('shrink-0', copy && 'motion-reduce:hidden', itemClassName)}
            >
              {render(item, copy)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
