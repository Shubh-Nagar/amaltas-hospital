import { CalendarPlus, Ambulance, ShieldCheck, Wallet, BedDouble, FileText, ArrowRight } from 'lucide-react';
import { Seo, breadcrumbJsonLd } from '@/lib/seo/Seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { pageImages } from '@/data/pageImages';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

const items = [
  { icon: CalendarPlus, title: 'Book an Appointment', body: 'Request a visit with the right specialist.', to: '/patients/appointment' },
  { icon: Ambulance, title: 'Emergency', body: '24/7 emergency and trauma care.', to: '/patients/emergency' },
  { icon: BedDouble, title: 'Wards & Rooms', body: 'Room categories to suit patient needs.', to: '/facilities/wards-rooms' },
  { icon: Wallet, title: 'Insurance & Cashless', body: 'Insurance and scheme support.', to: '/contact', note: true },
  { icon: ShieldCheck, title: 'Health Packages', body: 'Preventive health check packages.', to: '/contact', note: true },
  { icon: FileText, title: 'Patient Guide', body: 'What to bring and how to prepare.', to: '/articles/preparing-for-first-consultation' },
];

export default function PatientsPage() {
  return (
    <>
      <Seo title="Patients & Visitors" description="Everything you need to plan a visit to Amaltas — appointments, emergency, admission, facilities and more." path="/patients"
        jsonLd={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Patients & Visitors', path: '/patients' }])} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Patients & Visitors', path: '/patients' }]} title="Patients & Visitors" intro="Plan your visit and find the support you need." image={pageImages.patients} />
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} to={it.to} className="p-6">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><it.icon className="h-6 w-6" aria-hidden /></span>
              <h2 className="text-h4 text-brand-900">{it.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{it.body}{it.note ? ' [Details to be verified].' : ''}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition-all group-hover:gap-2">Learn more <ArrowRight className="h-4 w-4" aria-hidden /></span>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
