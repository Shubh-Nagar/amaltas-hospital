import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { ArticleGrid } from '@/components/content/ArticleGrid';

export default function EventsPage() {
  const items = articles.filter((a) => a.kind === 'event');
  return (
    <>
      <Seo title="Events" description="Health camps, awareness sessions and campus events at Amaltas." path="/events"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }]} title="Events" intro="Health camps, awareness sessions and campus events." image={pageImages.events} />
      <Container className="py-10"><ArticleGrid items={items} /></Container>
    </>
  );
}
