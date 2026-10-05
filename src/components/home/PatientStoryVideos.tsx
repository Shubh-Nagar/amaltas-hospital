import { useState } from 'react';
import { Expand, Play, Quote, Star, Youtube } from 'lucide-react';
import { patientStories, youtubeThumb, type PatientStory } from '@/data/patientStories';
import { patientReviews, happyPatientPhotos, type PatientReview } from '@/data/patientReviews';
import { site } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { VideoModal } from '@/components/ui/VideoModal';
import { Lightbox } from '@/components/ui/Lightbox';

const reviewPhotos = patientReviews.map((r) => ({ src: r.image, alt: `Google review by ${r.name}`, width: 1080, height: 1080 }));

function ReviewCard({ review, copy, onOpen }: { review: PatientReview; copy: boolean; onOpen: () => void }) {
  return (
    <figure className="flex h-full w-[19rem] flex-col rounded-2xl bg-white p-5 text-ink shadow-lg sm:w-[22rem]">
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 font-semibold text-white">
          {review.name.charAt(0)}
        </span>
        <figcaption className="min-w-0">
          <span className="block truncate font-semibold text-brand-900">{review.name}</span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <span className="flex text-amber-400" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />)}
            </span>
            on Google
          </span>
        </figcaption>
        <Quote className="ml-auto h-6 w-6 shrink-0 text-brand-100" aria-hidden />
      </div>
      <blockquote lang={review.lang === 'hi' ? 'hi' : 'hi-Latn'} className="mt-4 line-clamp-5 flex-1 text-sm leading-relaxed text-ink/85">
        “{review.text}”
      </blockquote>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
        <span className="truncate text-xs font-semibold text-brand-600">{review.about}</span>
        <button
          type="button"
          onClick={onOpen}
          tabIndex={copy ? -1 : undefined}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
          aria-label={`View ${review.name}'s original review`}
        >
          <Expand className="h-3.5 w-3.5" aria-hidden /> View
        </button>
      </div>
    </figure>
  );
}

function VideoCard({ story, copy, onPlay }: { story: PatientStory; copy: boolean; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      tabIndex={copy ? -1 : undefined}
      className="group block w-[19rem] text-left focus-visible:outline-none sm:w-[22rem]"
      aria-label={`Play story: ${story.title}`}
    >
      <span className="relative block aspect-video overflow-hidden rounded-2xl bg-brand-900 ring-1 ring-white/10 group-focus-visible:ring-2 group-focus-visible:ring-accent-400">
        <img src={youtubeThumb(story.youtubeId)} alt="" loading="lazy" className="h-full w-full scale-[1.34] object-cover transition-transform duration-700 group-hover:scale-[1.42]" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emergency text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-800">{story.tag}</span>
      </span>
      <span className="mt-3 line-clamp-2 block font-semibold leading-snug text-white group-hover:text-accent-400">{story.title}</span>
      <span lang="hi" className="mt-1 line-clamp-1 block text-xs text-white/55">{story.titleHi}</span>
    </button>
  );
}

/**
 * Patient's Story — two scrolling rows: real Google reviews from patients
 * (transcribed from the hospital's "Happy Patient Review" cards) on top, and
 * patient video stories from the hospital's YouTube channel below.
 */
export function PatientStoryVideos() {
  const [playing, setPlaying] = useState<PatientStory | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);

  return (
    <Section bleed className="relative isolate overflow-hidden bg-brand-950 text-white" ariaLabel="Patient stories">
      {/* Background: doctor on a ward round, under a deep brand overlay so cards stay legible */}
      <img
        src="/images/gallery/doctor-ward-round.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/80 via-brand-950/55 to-brand-950/80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--accent-500)/0.18),transparent_55%)]" />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-400">
              <span className="h-px w-6 bg-accent-500" aria-hidden /> Patient's story
            </span>
            <h2 className="mt-3 text-h2 text-white">Happy patients, in their own words</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-3">
                {happyPatientPhotos.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-950" />
                ))}
              </div>
              <p className="text-sm text-white/70">Reviews and recovery stories shared by our patients and their families.</p>
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-10 grid gap-6">
        {/* Row 1 — written reviews */}
        <Marquee
          items={patientReviews}
          getKey={(rv) => rv.name}
          duration={90}
          reverse
          render={(rv, copy) => <ReviewCard review={rv} copy={copy} onOpen={() => setPhoto(patientReviews.indexOf(rv))} />}
        />
        {/* Row 2 — video stories, scrolling the other way */}
        <Marquee
          items={patientStories}
          getKey={(s) => s.youtubeId}
          duration={80}
          render={(s, copy) => <VideoCard story={s} copy={copy} onPlay={() => setPlaying(s)} />}
        />
      </div>

      <Container>
        <div className="mt-8 flex justify-center">
          <Button href={site.social.youtube} variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Youtube className="h-4 w-4" aria-hidden /> View all on YouTube
          </Button>
        </div>
      </Container>

      <VideoModal youtubeId={playing?.youtubeId ?? null} title={playing?.title} onClose={() => setPlaying(null)} />
      <Lightbox photos={reviewPhotos} index={photo} onClose={() => setPhoto(null)} onChange={setPhoto} />
    </Section>
  );
}
