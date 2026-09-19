import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { facilities } from '@/data/facilities';
import { resolveIcon } from '@/lib/icons';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export default function FacilitiesPage() {
  return (
    <>
      <Seo
        title="Facilities"
        description="Facilities at Amaltas Super Speciality Hospital — emergency, ICU, operation theatres, diagnostics, pharmacy and more."
        path="/facilities"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Facilities', path: '/facilities' }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Facilities', path: '/facilities' }]}
        title="Facilities"
        intro="Comprehensive infrastructure supporting care across every stage of a patient's journey."
      image={pageImages.facilities}
      />
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const Icon = resolveIcon(f.icon);
            /* Photographed facilities lead with the image; the rest keep the
               icon card, at the same height so the grid stays even. */
            if (f.image) {
              return (
                <Card key={f.slug} to={`/facilities/${f.slug}`} className="group overflow-hidden p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={f.image.src}
                      alt={f.image.alt}
                      width={f.image.width}
                      height={f.image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950/70 text-accent-400 backdrop-blur-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-h4 text-brand-900">{f.name}</h2>
                    <p className="mt-1.5 text-sm text-muted">{f.summary}</p>
                  </div>
                </Card>
              );
            }
            return (
              <Card key={f.slug} to={`/facilities/${f.slug}`} className="p-6">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><Icon className="h-6 w-6" aria-hidden /></span>
                <h2 className="text-h4 text-brand-900">{f.name}</h2>
                <p className="mt-1.5 text-sm text-muted">{f.summary}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
