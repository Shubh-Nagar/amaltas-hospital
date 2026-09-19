import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { facilities } from '@/data/facilities';
import { resolveIcon } from '@/lib/icons';
import { PageHeader } from '@/components/ui/PageHeader';
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
      />
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const Icon = resolveIcon(f.icon);
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
