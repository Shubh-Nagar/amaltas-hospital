import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { ArticleGrid } from '@/components/content/ArticleGrid';

export default function EventsPage() {
  /* Newest first; events without a confirmed date fall back to when they were posted. */
  const items = articles
    .filter((a) => a.kind === 'event')
    .sort((a, b) => (b.eventDate ?? b.publishedAt).localeCompare(a.eventDate ?? a.publishedAt));
  return (
    <>
      <Seo title="Events" description="Health camps, awareness sessions and campus events at Amaltas." path="/events"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }]} title="Events" intro="Health camps, awareness sessions and campus events." image={pageImages.events} />
      <Container className="py-10"><ArticleGrid items={items} /></Container>
    </>
  );
}
