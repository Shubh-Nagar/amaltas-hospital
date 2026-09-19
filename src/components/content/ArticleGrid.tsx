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
        <Card key={a.slug} to={`${base[a.kind]}/${a.slug}`} className="flex h-full flex-col overflow-hidden">
          {a.gallery && a.gallery.length > 1 ? (
            <EventCardFilmstrip cover={a.cover} photos={a.gallery} />
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
      ))}
    </div>
  );
}

/**
 * Event-card cover that crossfades through the event's gallery photos while
 * hovered — a quick glimpse of the event without opening the full gallery.
 * Shows just the first frame (cover) whenever the card isn't hovered.
 */
function EventCardFilmstrip({ cover, photos }: { cover?: ImageAsset; photos: ImageAsset[] }) {
  const frames = cover ? [cover, ...photos] : photos;
  const count = frames.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || count <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), 1800);
    return () => clearInterval(id);
  }, [hovered, count]);

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(0); }}
    >
      {frames.map((f, i) => (
        <img
          key={i}
          src={f.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'opacity 500ms ease, transform 7000ms ease-out',
          }}
        />
      ))}

      <span className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        <Images className="h-3.5 w-3.5" aria-hidden /> {count} photo{count === 1 ? '' : 's'}
      </span>

      {count > 1 && (
        <div className={cn('absolute inset-x-0 bottom-0 flex gap-1 p-2 transition-opacity duration-300', hovered ? 'opacity-100' : 'opacity-0')}>
          {frames.map((_, i) => (
            <span key={i} className={cn('h-[3px] flex-1 rounded-full transition-colors', i === active ? 'bg-accent-500' : 'bg-white/30')} />
          ))}
        </div>
      )}
    </div>
  );
}
