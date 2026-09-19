import type { ReactNode } from 'react';
import { useState } from 'react';
import { Phone, Mail, MapPin, Navigation, Building2, Send } from 'lucide-react';
import { Seo, medicalOrgJsonLd } from '@/lib/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

const mapQuery = encodeURIComponent(`${site.name} ${site.address.line1} ${site.address.city}`);

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const valid = form.name.trim() && form.message.trim();

  return (
    <>
      <Seo title="Contact Us" description={`Contact ${site.name}, Dewas. Address, phone, email and directions.`} path="/contact" jsonLd={medicalOrgJsonLd()} />
      <PageHeader crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} title="Contact Us" intro="Reach us by phone, email or visit — and find your way to the campus." />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<Phone className="h-5 w-5" />} title="Toll Free" lines={[site.phone.tollFree, site.phone.primary]} href={`tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`} />
              <ContactCard icon={<Mail className="h-5 w-5" />} title="Email" lines={[site.email.general]} href={`mailto:${site.email.general}`} />
              <ContactCard icon={<MapPin className="h-5 w-5" />} title="Hospital" lines={[site.address.line1, `${site.address.city}, ${site.address.state} ${site.address.postalCode}`]} />
              <ContactCard icon={<Building2 className="h-5 w-5" />} title={site.cityOffice.label} lines={[site.cityOffice.line1, `${site.cityOffice.city} ${site.cityOffice.postalCode}`]} />
            </div>

            <div className="mt-6">
              <Button href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}><Navigation className="h-4 w-4" aria-hidden /> Get directions</Button>
            </div>

            {/* General enquiry form (non-medical). TODO: wire to secure endpoint. */}
            <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h2 className="text-h4 text-brand-900">Send a general enquiry</h2>
              {sent ? (
                <div className="mt-4"><EmptyState icon={<Send className="h-7 w-7" />} title="Message noted" description="Thank you. For medical or urgent matters, please call us directly." /></div>
              ) : (
                <div className="mt-4 grid gap-4">
                  <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Your name"
                    className="rounded-xl border border-line px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                  <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label="Email"
                    className="rounded-xl border border-line px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                  <textarea placeholder="How can we help? (Please don’t include sensitive medical details.)" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-label="Message"
                    className="rounded-xl border border-line px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                  <div><Button type="button" onClick={() => valid && setSent(true)}>Send enquiry</Button></div>
                </div>
              )}
            </div>
          </div>

          <div id="directions" className="min-h-[24rem] overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe title="Map to Amaltas" src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`} className="h-full min-h-[24rem] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </Container>
    </>
  );
}

function ContactCard({ icon, title, lines, href }: { icon: ReactNode; title: string; lines: string[]; href?: string }) {
  const body = (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 text-brand-600">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{title}</span></div>
      {lines.map((l) => <p key={l} className="mt-1 text-sm text-ink">{l}</p>)}
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-90">{body}</a> : body;
}
