import { Newspaper } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { pressClippingSlots } from '@/data/press';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Placeholder } from '@/components/ui/Placeholder';
import { ArticleGrid } from '@/components/content/ArticleGrid';

export default function NewsPage() {
  const items = articles.filter((a) => a.kind === 'news');

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
      />

      <Container className="py-10">
        <ArticleGrid items={items} />
      </Container>

      <Section className="bg-brand-50/60" ariaLabel="In the media">
        <SectionHeading
          eyebrow="In the media"
          title="As featured in the local press"
          description="Newspaper clippings covering Amaltas will appear here — each verified clipping replaces one of the slots below."
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pressClippingSlots.map((slot) => (
            <div key={slot.id} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              {/* Clipping frame — drop a scanned newspaper clipping into slot.image in src/data/press.ts */}
              <Placeholder asset={slot.image} aspect="aspect-[4/5]" rounded="rounded-none" label="Newspaper clipping" />

              {/* Caption strip */}
              <div className="bg-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-brand-950">
                Amaltas Hospital — Media Coverage
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Newspaper className="h-4 w-4 shrink-0" aria-hidden /> Clippings will be reproduced from local newspaper coverage of Amaltas, once verified for reuse.
        </p>
      </Section>
    </>
  );
}
