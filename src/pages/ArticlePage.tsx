import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import type { ArticleKind } from '@/types';
import { Seo, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { articles } from '@/data/articles';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Placeholder } from '@/components/ui/Placeholder';
import { Badge } from '@/components/ui/Badge';
import { VerificationNote } from '@/components/ui/VerificationNote';
import { Lightbox } from '@/components/ui/Lightbox';
import { formatDate } from '@/lib/utils';
import NotFoundPage from './NotFoundPage';

const meta: Record<ArticleKind, { crumb: string; base: string }> = {
  article: { crumb: 'Health Insights', base: '/articles' },
  news: { crumb: 'News', base: '/news' },
  event: { crumb: 'Events', base: '/events' },
};

/** Shared detail template for articles, news and events (resolved by kind). */
export default function ArticlePage({ kind }: { kind: ArticleKind }) {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const article = articles.find((a) => a.slug === slug && a.kind === kind);
  if (!article) return <NotFoundPage />;

  const m = meta[article.kind];
  const path = `${m.base}/${article.slug}`;

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={path}
        type="article"
        jsonLd={[
          articleJsonLd(article.title, article.excerpt, article.publishedAt, path),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: m.crumb, path: m.base }, { name: article.title, path }]),
        ]}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: m.crumb, path: m.base }, { name: article.title, path }]}
        title={article.title}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          {article.category && <Badge>{article.category}</Badge>}
          {article.sample && <Badge tone="muted">Sample content</Badge>}
          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" aria-hidden /> {formatDate(article.publishedAt)}</span>
          {article.author && <span>· {article.author}</span>}
          {article.kind === 'event' && article.eventDate && (
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" aria-hidden /> Event: {formatDate(article.eventDate)}</span>
          )}
          {article.kind === 'event' && article.eventLocation && (
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" aria-hidden /> {article.eventLocation}</span>
          )}
        </div>
      </PageHeader>

      <Container className="py-10">
        {article.sample && <VerificationNote>Sample content — replace with real, reviewed editorial before launch.</VerificationNote>}
        <div className="mx-auto max-w-3xl">
          <Placeholder asset={article.cover} aspect="aspect-[16/8]" label={article.category ?? article.kind} className="mb-8" />
          <article className="prose-editorial" dangerouslySetInnerHTML={{ __html: article.body }} />

          {article.gallery && article.gallery.length > 0 && (
            <section className="mt-10" aria-label="Photo gallery">
              <h2 className="text-h4 text-brand-900">Photos</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {article.gallery.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label={`Open photo ${i + 1} of ${article.gallery!.length}`}
                  >
                    <Placeholder asset={photo} aspect="aspect-square" rounded="rounded-xl" className="transition-transform duration-200 hover:scale-105" />
                  </button>
                ))}
              </div>
              <Lightbox photos={article.gallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
            </section>
          )}

          <Link to={m.base} className="mt-10 inline-flex items-center gap-1 font-medium text-brand-700 hover:gap-2 transition-all">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to {m.crumb}
          </Link>
        </div>
      </Container>
    </>
  );
}
