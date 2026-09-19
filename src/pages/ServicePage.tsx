import { useParams } from 'react-router-dom';
import { CalendarPlus, CheckCircle2, Users } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { services } from '@/data/services';
import { specialties } from '@/data/specialties';
import { resolveIcon } from '@/lib/icons';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages, serviceImages } from '@/data/pageImages';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VerificationNote } from '@/components/ui/VerificationNote';
import NotFoundPage from './NotFoundPage';

/** Reusable data-driven Service template. */
export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFoundPage />;

  const Icon = resolveIcon(service.icon);
  const path = `/services/${service.slug}`;
  const relatedSpecialties = specialties.filter((sp) => service.relatedSpecialtySlugs?.includes(sp.slug));

  return (
    <>
      <Seo
        title={service.name}
        description={service.summary}
        path={path}
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.name, path }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.name, path }]}
        title={service.name}
        intro={service.summary}
        image={serviceImages[service.slug] ?? pageImages.services}
      >
        <div className="flex flex-wrap items-center gap-3">
          {service.is24x7 && <Badge tone="emergency">Available 24/7</Badge>}
          <Button to="/patients/appointment"><CalendarPlus className="h-4 w-4" aria-hidden /> Enquire / Book</Button>
        </div>
      </PageHeader>

      <Container className="py-10">
        {!service.verified && <VerificationNote>This service record is unverified — confirm availability and details before publishing.</VerificationNote>}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-700"><Icon className="h-7 w-7" aria-hidden /></span>
            <div className="prose-editorial"><p>{service.description}</p></div>

            {service.whoItHelps && (
              <div className="mt-8 rounded-2xl border border-line bg-brand-50/60 p-5">
                <div className="flex items-center gap-2 text-brand-700"><Users className="h-5 w-5" aria-hidden /><h2 className="text-h4 text-brand-900">Who it helps</h2></div>
                <p className="mt-2 text-ink/90">{service.whoItHelps}</p>
              </div>
            )}

            {service.whatToExpect && service.whatToExpect.length > 0 && (
              <section className="mt-8" aria-labelledby="expect-heading">
                <h2 id="expect-heading" className="text-h3 text-brand-900">What to expect</h2>
                <ul className="mt-4 space-y-2.5">
                  {service.whatToExpect.map((step) => (
                    <li key={step} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden /><span>{step}</span></li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {relatedSpecialties.length > 0 && (
              <Card className="p-5">
                <h2 className="text-h4 text-brand-900">Related specialties</h2>
                <ul className="mt-3 space-y-1.5">
                  {relatedSpecialties.map((sp) => (
                    <li key={sp.slug}><Button to={`/specialties/${sp.slug}`} variant="ghost" size="sm" className="w-full justify-start">{sp.name}</Button></li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>
        </div>
      </Container>
    </>
  );
}
