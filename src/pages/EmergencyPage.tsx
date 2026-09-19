import { Phone, Navigation, AlertTriangle, Clock } from 'lucide-react';
import { Seo } from '@/lib/seo/Seo';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';

const tel = `tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`;
const mapQuery = encodeURIComponent(`${site.name} ${site.address.line1} ${site.address.city}`);

export default function EmergencyPage() {
  return (
    <>
      <Seo title="Emergency 24/7" description={`24/7 emergency care at ${site.name}, Dewas. Call ${site.phone.tollFree}.`} path="/patients/emergency" />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Patients & Visitors', path: '/patients' }, { name: 'Emergency', path: '/patients/emergency' }]}
        title="Emergency Care — 24 / 7"
        intro="In a medical emergency, call us immediately. Our emergency department operates around the clock."
      />
      <Container className="py-10">
        <div className="rounded-3xl bg-emergency px-6 py-10 text-center text-white">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10" aria-hidden />
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Call now</p>
          <a href={tel} className="mt-1 block font-display text-4xl font-semibold sm:text-5xl">{site.phone.tollFree}</a>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={tel} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-emergency"><Phone className="h-5 w-5" aria-hidden /> Call emergency</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"><Navigation className="h-5 w-5" aria-hidden /> Directions</a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-5"><Clock className="mb-2 h-6 w-6 text-brand-600" aria-hidden /><h2 className="font-semibold text-brand-900">Open 24/7</h2><p className="mt-1 text-sm text-muted">Emergency and casualty services are available at all hours.</p></div>
          <div className="rounded-2xl border border-line bg-surface p-5"><AlertTriangle className="mb-2 h-6 w-6 text-brand-600" aria-hidden /><h2 className="font-semibold text-brand-900">Trauma &amp; polytrauma</h2><p className="mt-1 text-sm text-muted">Support for accidents and serious injuries, backed by critical care.</p></div>
          <div className="rounded-2xl border border-line bg-surface p-5"><Navigation className="mb-2 h-6 w-6 text-brand-600" aria-hidden /><h2 className="font-semibold text-brand-900">Easy to reach</h2><p className="mt-1 text-sm text-muted">{site.address.line1}, {site.address.city}.</p></div>
        </div>
        <p className="mt-6 text-sm text-muted">[CONTENT REQUIRES VERIFICATION] Confirm the dedicated emergency phone number and ambulance details before launch.</p>
      </Container>
    </>
  );
}
