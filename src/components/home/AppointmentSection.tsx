import { useState, type FormEvent, type ReactNode } from 'react';
import { CalendarCheck, CalendarPlus, Phone, ShieldCheck, Siren } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, '')}`;

/**
 * Specialities offered in the amaltashospital.in appointment form, mapped to
 * our specialty slugs (where we have one) so the doctor list can be narrowed.
 */
const specialityOptions: { label: string; slug?: string }[] = [
  { label: 'Oncology', slug: 'oncology' },
  { label: 'Cardiology', slug: 'cardiology' },
  { label: 'Nephrology', slug: 'nephrology' },
  { label: 'Neurology', slug: 'neurosciences' },
  { label: 'Urology', slug: 'urology' },
  { label: 'Gastroenterology', slug: 'gastroenterology' },
  { label: 'Plastic Surgery' },
  { label: 'Kidney Transplant', slug: 'nephrology' },
  { label: 'Orthopedics & Joint Replacement', slug: 'orthopaedics' },
  { label: 'General Surgery' },
  { label: 'Minimally Invasive Laparoscopic Surgery' },
  { label: 'Diabetes & Endocrinology' },
  { label: 'Critical Care' },
  { label: 'Dental' },
  { label: 'Dermatology' },
  { label: 'ENT Department', slug: 'ent' },
  { label: 'Eye Care', slug: 'ophthalmology' },
  { label: 'Anaesthesiology' },
  { label: 'Infertility (IVF)', slug: 'obstetrics-gynaecology' },
  { label: 'Obstetrics and Gynaecology', slug: 'obstetrics-gynaecology' },
  { label: 'Respiratory Medicine', slug: 'general-medicine' },
  { label: 'ICU' },
];

interface Form {
  name: string;
  mobile: string;
  email: string;
  speciality: string;
  doctor: string;
  date: string;
}
const empty: Form = { name: '', mobile: '', email: '', speciality: '', doctor: '', date: '' };

const inputCls =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/30';

/**
 * "Contact for Emergency Services" beside the "Book an Appointment" form —
 * both carried over from the amaltashospital.in homepage. Like the full
 * booking page this collects a REQUEST; the team calls back to confirm.
 * TODO(integration): POST to the scheduling endpoint.
 */
export function AppointmentSection() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const slug = specialityOptions.find((o) => o.label === form.speciality)?.slug;
  const doctorOptions = doctors
    .filter((d) => !slug || d.specialtySlugs.includes(slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  function submit(e: FormEvent) {
    e.preventDefault();
    const err: typeof errors = {};
    if (!form.name.trim()) err.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{7,}$/.test(form.mobile.trim())) err.mobile = 'Please enter a valid mobile number.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email address.';
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  }

  return (
    <section aria-label="Book an appointment" className="py-14 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Emergency panel */}
          <div className="relative isolate overflow-hidden bg-brand-900 p-8 text-white sm:p-10">
            <img
              src="/images/gallery/emergency-bay.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900/85 via-brand-800/65 to-brand-700/40" />

            <span className="inline-flex items-center gap-2 rounded-full bg-emergency px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Siren className="h-3.5 w-3.5" aria-hidden /> 24×7 Emergency
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white drop-shadow-sm sm:text-4xl">Contact for Emergency Services</h2>
            <p className="mt-3 max-w-md text-white/90">
              If you need immediate assistance, please call our emergency numbers. Our medical team is available 24x7 for your support.
            </p>

            <a
              href={tel(site.phone.emergency)}
              className="group mt-7 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition-colors hover:bg-white/15"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emergency">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emergency/50" />
                <Phone className="relative h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/70">Hospital Emergency Helpline</span>
                <span className="block font-display text-2xl font-semibold tracking-wide">{site.phone.emergency}</span>
              </span>
            </a>

            <p className="mt-6 flex items-center gap-2 text-sm text-white/85">
              <ShieldCheck className="h-4 w-4 text-accent-400" aria-hidden /> Your safety and health are our top priority.
            </p>
            <Button to="/contact" variant="outline" size="sm" className="mt-6 border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>

          {/* Booking form */}
          <div className="p-8 sm:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <CalendarCheck className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="text-h3 text-brand-900">Request received</h3>
                <p className="mt-2 max-w-sm text-muted">
                  Thank you, {form.name}. Our team will call you on {form.mobile} to confirm your appointment.
                </p>
                <Button type="button" variant="outline" className="mt-6" onClick={() => { setForm(empty); setSent(false); }}>
                  Book another
                </Button>
              </div>
            ) : (
              <Reveal>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
                  <span className="h-px w-6 bg-accent-500" aria-hidden /> Appointment
                </span>
                <h2 className="mt-3 text-h2">Book an Appointment</h2>
                <p className="mt-2 text-muted">Fill in your details and our team will call you to confirm a time.</p>

                <form onSubmit={submit} noValidate className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required error={errors.name}>
                    <input type="text" autoComplete="name" placeholder="Name" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Mobile Number" required error={errors.mobile}>
                    <input type="tel" autoComplete="tel" placeholder="Mobile Number" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Email Id" error={errors.email}>
                    <input type="email" autoComplete="email" placeholder="Email Id" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Speciality">
                    <select value={form.speciality} onChange={(e) => { set('speciality', e.target.value); set('doctor', ''); }} className={inputCls}>
                      <option value="">Select Speciality</option>
                      {specialityOptions.map((o) => <option key={o.label} value={o.label}>{o.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Doctor">
                    <select value={form.doctor} onChange={(e) => set('doctor', e.target.value)} className={inputCls}>
                      <option value="">Select Doctors</option>
                      {doctorOptions.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Preferred Date">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.date}
                      onChange={(e) => set('date', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full !py-3.5 sm:w-auto sm:min-w-[14rem]">
                      <CalendarPlus className="h-4 w-4" aria-hidden /> Make Appointment
                    </Button>
                  </div>
                  <p className="text-xs text-muted sm:col-span-2">
                    This is a request, not a confirmed booking. Please don’t share sensitive medical details here.
                  </p>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
        {required && <span className="text-emergency"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-error" role="alert">{error}</span>}
    </label>
  );
}
