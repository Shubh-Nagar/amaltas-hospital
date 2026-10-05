import { useEffect, useState } from 'react';
import { Calendar, MapPin, Images } from 'lucide-react';
import type { Article, ArticleKind, ImageAsset } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Placeholder } from '@/components/ui/Placeholder';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

const base: Record<ArticleKind, string> = { article: '/articles', news: '/news', event: '/events' };

export function ArticleGrid({ items }: { items: Article[] }) {
  if (items.length === 0) {
    return <EmptyState title="Nothing here yet" description="Content will appear here once published." />;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <ArticleCard key={`${a.kind}-${a.slug}`} article={a} />
      ))}
    </div>
  );
}

function ArticleCard({ article: a }: { article: Article }) {
  /* Tracked on the whole card (not just the photo) so the filmstrip starts the
     moment the pointer or keyboard focus lands anywhere on it. */
  const [active, setActive] = useState(false);

  return (
    <div
      className="h-full"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Card to={`${base[a.kind]}/${a.slug}`} className="flex h-full flex-col overflow-hidden">
        {a.gallery && a.gallery.length > 1 ? (
          <EventCardFilmstrip cover={a.cover} photos={a.gallery} playing={active} />
        ) : (
          <Placeholder asset={a.cover} aspect="aspect-[16/9]" rounded="rounded-none" label={a.category ?? a.kind} />
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            {a.category && <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{a.category}</span>}
            {a.sample && <Badge tone="muted">Sample</Badge>}
          </div>
          <h3 className="mt-1 text-h4 text-brand-900">{a.title}</h3>
          <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
          <div className="mt-auto pt-4 text-xs text-muted">
            {a.kind === 'event' && a.eventDate ? (
              <span className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" aria-hidden /> {formatDate(a.eventDate)}</span>
                {a.eventLocation && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden /> {a.eventLocation}</span>}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" aria-hidden /> {formatDate(a.publishedAt)}</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

const FRAME_MS = 1800;

/**
 * Event-card cover that crossfades through the event's gallery photos while
 * `playing` — a quick glimpse of the event without opening the full gallery.
 * Advances to the next photo immediately when playback starts, then every
 * FRAME_MS; returns to the cover when it stops.
 *
 * Only the cover and the first upcoming frame load up front; the rest mount on
 * first play. The cover stays underneath as a backdrop, so a frame that hasn't
 * finished loading never flashes blank.
 */
function EventCardFilmstrip({ cover, photos, playing }: { cover?: ImageAsset; photos: ImageAsset[]; playing: boolean }) {
  const frames = cover ? [cover, ...photos] : photos;
  const count = frames.length;
  const [active, setActive] = useState(0);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    if (!playing || count <= 1) {
      setActive(0);
      return;
    }
    setPrimed(true);
    setActive(1);
    const id = setInterval(() => setActive((a) => (a + 1) % count), FRAME_MS);
    return () => clearInterval(id);
  }, [playing, count]);

  return (
    <div className="relative aspect-[16/9] overflow-hidden">
      {frames.map((f, i) =>
        i <= 1 || primed ? (
          <img
            key={i}
            src={f.src}
            alt=""
            loading={i === 0 ? 'lazy' : primed ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === 0 || i === active ? 1 : 0,
              transform: playing ? 'scale(1.08)' : 'scale(1)',
              transition: 'opacity 500ms ease, transform 7000ms ease-out',
            }}
          />
        ) : null,
      )}

      <span className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        <Images className="h-3.5 w-3.5" aria-hidden /> {count} photo{count === 1 ? '' : 's'}
      </span>

      {count > 1 && (
        <div className={cn('absolute inset-x-0 bottom-0 z-10 flex gap-1 p-2 transition-opacity duration-300', playing ? 'opacity-100' : 'opacity-0')}>
          {frames.map((_, i) => (
            <span key={i} className={cn('h-[3px] flex-1 rounded-full transition-colors', i === active ? 'bg-accent-500' : 'bg-white/30')} />
          ))}
        </div>
      )}
    </div>
  );
}
