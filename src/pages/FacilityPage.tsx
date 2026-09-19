import { useParams } from 'react-router-dom';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { facilities } from '@/data/facilities';
import { resolveIcon } from '@/lib/icons';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Placeholder } from '@/components/ui/Placeholder';
import { Button } from '@/components/ui/Button';
import { VerificationNote } from '@/components/ui/VerificationNote';
import NotFoundPage from './NotFoundPage';

export default function FacilityPage() {
  const { slug } = useParams();
  const facility = facilities.find((f) => f.slug === slug);
  if (!facility) return <NotFoundPage />;
  const Icon = resolveIcon(facility.icon);
  const path = `/facilities/${facility.slug}`;

  return (
    <>
      <Seo title={facility.name} description={facility.summary} path={path}
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Facilities', path: '/facilities' }, { name: facility.name, path }])} />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Facilities', path: '/facilities' }, { name: facility.name, path }]}
        title={facility.name}
        intro={facility.summary}
        image={facility.image ?? pageImages.facilities}
      />
      <Container className="py-10">
        {!facility.verified && <VerificationNote>This facility record is unverified — confirm details before publishing.</VerificationNote>}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"><Icon className="h-7 w-7" aria-hidden /></span>
            <div className="prose-editorial"><p>{facility.description ?? facility.summary}</p></div>
            <p className="mt-6 text-sm text-muted">Detailed information about this facility will be added from verified hospital records.</p>
            <div className="mt-6"><Button to="/patients/appointment">Book an Appointment</Button></div>
          </div>
          <Placeholder asset={facility.image} aspect="aspect-[4/3]" label={`${facility.name} — photo`} />
        </div>
      </Container>
    </>
  );
}
