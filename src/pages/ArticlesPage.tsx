import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { ArticleGrid } from '@/components/content/ArticleGrid';

export default function ArticlesPage() {
  const items = articles.filter((a) => a.kind === 'article');
  return (
    <>
      <Seo title="Health Articles" description="Practical, general health information from the Amaltas health desk." path="/articles"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Health Insights', path: '/articles' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Health Insights', path: '/articles' }]} title="Health Articles" intro="Practical, general health information to help you stay informed." />
      <Container className="py-10"><ArticleGrid items={items} /></Container>
    </>
  );
}
