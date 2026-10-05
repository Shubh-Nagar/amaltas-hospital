import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { pressClippingSlots } from '@/data/press';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { ArticleGrid } from '@/components/content/ArticleGrid';
import type { ImageAsset } from '@/types';

/** Clippings are rendered in batches — there are several hundred of them. */
const PAGE_SIZE = 24;

/**
 * Newest clippings first (press.ts lists them oldest first). WordPress
 * thumbnail copies (e.g. `-150x150.png`) duplicate a full-size clipping, so skip them.
 */
const clippings: ImageAsset[] = pressClippingSlots
  .flatMap((slot) => (slot.image ? [slot.image] : []))
  .filter((img) => !/-\d+x\d+\.\w+$/.test(img.src))
  .reverse();

export default function NewsPage() {
  const items = articles.filter((a) => a.kind === 'news');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visibleClippings = clippings.slice(0, shown);

  return (
    <>
      <Seo
        title="News"
        description="Announcements and updates from Amaltas Super Speciality Hospital."
        path="/news"
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
        ])}
      />

      <PageHeader
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
        ]}
        title="News"
        intro="Announcements and updates from Amaltas."
      image={pageImages.news}
      />

      {/* Only true news posts — events live on /events. */}
      {items.length > 0 && (
        <Container className="py-10">
          <ArticleGrid items={items} />
        </Container>
      )}

      <Section className="bg-brand-50/60" ariaLabel="In the media">
        <SectionHeading
          eyebrow="In the media"
          title="As featured in the local press"
          description="Newspaper coverage of Amaltas Hospital — tap any clipping to read it full size."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleClippings.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group cursor-zoom-in overflow-hidden rounded-[18px] bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label={`Open clipping ${i + 1} of ${clippings.length}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>

        {shown < clippings.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-6 py-2.5 text-sm font-semibold text-brand-800 shadow-card transition hover:border-brand-400 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Newspaper className="h-4 w-4" aria-hidden />
              Load more clippings
              <span className="text-muted">({clippings.length - shown} more)</span>
            </button>
          </div>
        )}

        {/* The viewer pages through every clipping, not just the loaded ones. */}
        <Lightbox photos={clippings} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
      </Section>
    </>
  );
}
