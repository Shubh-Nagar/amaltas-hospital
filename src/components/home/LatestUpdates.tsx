import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CalendarDays, MapPin, Play } from 'lucide-react';
import { articles } from '@/data/articles';
import { corporateVideo, youtubeThumb } from '@/data/patientStories';
import { formatDate, cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { VideoModal } from '@/components/ui/VideoModal';

/** Latest events and activities (events and hospital news), newest first. */
const updates = articles
  .filter((a) => a.kind === 'event' || a.kind === 'news')
  .filter((a, i, all) => all.findIndex((b) => b.slug === a.slug) === i)
  .sort((a, b) => (b.eventDate ?? b.publishedAt).localeCompare(a.eventDate ?? a.publishedAt))
  .slice(0, 6);

/** Award photographs from the "Awards & Accreditations" slider on amaltashospital.in. */
const awards = ['01.jpeg', '02.jpeg', '03.jpeg', '04.jpeg', '05.jpeg', '06.jpg'].map((f) => `/images/awards/award-${f}`);

function ColumnTitle({ children, href, label = 'View all' }: { children: string; href?: string; label?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-display text-xl font-semibold text-brand-900">{children}</h3>
      {href && (
        <Link to={href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
          {label} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/** Auto-advancing crossfade slider with dots; pauses on hover/focus. */
function Rotator({ count, label, children }: { count: number; label: string; children: (active: number) => ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-950 shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {children(active)}
      <div className="absolute bottom-3 left-5 z-10 flex gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${label} ${i + 1}`}
            className={cn('h-1.5 rounded-full transition-all duration-300', i === active ? 'w-6 bg-accent-400' : 'w-1.5 bg-white/50 hover:bg-white')}
          />
        ))}
      </div>
    </div>
  );
}

const slide = (on: boolean) => cn('absolute inset-0 transition-opacity duration-700', on ? 'opacity-100' : 'pointer-events-none opacity-0');

/**
 * Latest Updates — the corporate video, our latest events & activities and
 * awards, side by side (as on the amaltashospital.in homepage, in Metro
 * Hospital's three-column layout).
 */
export function LatestUpdates() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section ariaLabel="Latest updates">
      <SectionHeading
        align="center"
        eyebrow="Latest updates"
        title="What’s happening at Amaltas"
        description="Our latest events, activities and recognitions."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Corporate video */}
        <Reveal>
          <ColumnTitle>Corporate Video</ColumnTitle>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-950 text-left shadow-card"
            aria-label={`Play video: ${corporateVideo.title}`}
          >
            <img src={youtubeThumb(corporateVideo.youtubeId)} alt="" loading="lazy" className="h-full w-full scale-[1.34] object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.4]" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-800 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/40" />
              <Play className="relative ml-1 h-7 w-7 fill-current" aria-hidden />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white">{corporateVideo.title}</span>
          </button>
          <p lang="hi" className="mt-3 line-clamp-3 text-sm text-muted">{corporateVideo.caption}</p>
        </Reveal>

        {/* Events & activities */}
        <Reveal delay={0.06}>
          <ColumnTitle href="/events">Events & Activities</ColumnTitle>
          <Rotator count={updates.length} label="update">
            {(active) =>
              updates.map((u, i) => (
                <Link
                  key={u.slug}
                  to={`/${u.kind === 'event' ? 'events' : 'news'}/${u.slug}`}
                  aria-hidden={i !== active}
                  tabIndex={i === active ? 0 : -1}
                  className={cn('group', slide(i === active))}
                >
                  {u.cover && <img src={u.cover.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5 pb-9 text-white">
                    <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/75">
                      <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden />{formatDate(u.eventDate ?? u.publishedAt)}</span>
                      {u.eventLocation && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden />{u.eventLocation}</span>}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block font-semibold leading-snug">{u.title}</span>
                  </span>
                </Link>
              ))
            }
          </Rotator>
          <ul className="mt-3 grid gap-1.5">
            {updates.slice(0, 3).map((u) => (
              <li key={u.slug}>
                <Link to={`/${u.kind === 'event' ? 'events' : 'news'}/${u.slug}`} className="group flex items-baseline gap-2 text-sm">
                  <span className="shrink-0 text-xs text-muted">{formatDate(u.eventDate ?? u.publishedAt).replace(/ \d{4}$/, '')}</span>
                  <span className="truncate font-medium text-brand-900 group-hover:text-brand-700">{u.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Awards & accreditations */}
        <Reveal delay={0.12}>
          <ColumnTitle href="/about#accreditations">Awards & Accreditations</ColumnTitle>
          <Rotator count={awards.length} label="award">
            {(active) =>
              awards.map((src, i) => (
                <div key={src} aria-hidden={i !== active} className={slide(i === active)}>
                  <img src={src} alt={i === active ? 'Amaltas Hospital receiving an award' : ''} loading="lazy" className="h-full w-full object-cover" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                </div>
              ))
            }
          </Rotator>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <Award className="h-4 w-4 shrink-0 text-accent-600" aria-hidden />
            Recognitions received by Amaltas Hospital and its leadership.
          </p>
        </Reveal>
      </div>

      <VideoModal youtubeId={playing ? corporateVideo.youtubeId : null} title={corporateVideo.title} onClose={() => setPlaying(false)} />
    </Section>
  );
}
