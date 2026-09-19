import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { services } from '@/data/services';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { ServiceCard } from '@/components/services/ServiceCard';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Clinical and support services at Amaltas — emergency, diagnostics, imaging, radiation oncology and more."
        path="/services"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
      />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        title="Services"
        intro="Clinical and support services designed around patient needs."
      image={pageImages.services}
      />
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Container>
    </>
  );
}
