import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { specialties } from '@/data/specialties';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { SpecialtyCard } from '@/components/specialties/SpecialtyCard';

export default function SpecialtiesPage() {
  return (
    <>
      <Seo
        title="Specialties & Centres of Excellence"
        description="Explore superspecialities at Amaltas — Cardiology, Neurosciences, Oncology, Nephrology, Orthopaedics and more."
        path="/specialties"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Specialties', path: '/specialties' }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Specialties', path: '/specialties' }]}
        title="Specialties & Centres of Excellence"
        intro="Integrated, multi-superspeciality care across our core disciplines."
      image={pageImages.specialties}
      />
      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s) => <SpecialtyCard key={s.slug} specialty={s} featured />)}
        </div>
      </Container>
    </>
  );
}
