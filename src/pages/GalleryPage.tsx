import { useMemo, useState } from 'react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { gallery } from '@/data/gallery';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { Placeholder } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils';

export default function GalleryPage() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean) as string[]))], []);
  const [active, setActive] = useState('All');
  const items = active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  return (
    <>
      <Seo title="Gallery" description="Photos of the Amaltas campus, facilities and events." path="/gallery"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]} title="Gallery" intro="A look at our campus, facilities and community." />
      <Container className="py-10">
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={active === c} onClick={() => setActive(c)}
              className={cn('rounded-full px-4 py-2 text-sm font-medium transition-colors', active === c ? 'bg-brand-700 text-white' : 'border border-line bg-surface text-brand-800 hover:bg-brand-50')}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <figure key={g.id} className="overflow-hidden rounded-2xl border border-line shadow-card">
              <Placeholder asset={g.image} aspect="aspect-square" rounded="rounded-none" label={g.caption} />
              <figcaption className="bg-surface px-3 py-2 text-xs text-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
