import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CalendarCheck, CalendarPlus, Phone, ShieldCheck, Siren } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  localISODate,
  normaliseIndianMobile,
  validateEmail,
  validateFutureDate,
  validateIndianMobile,
  validateName,
} from '@/lib/validation';

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
type Errors = Partial<Record<keyof Form, string>>;
const empty: Form = { name: '', mobile: '', email: '', speciality: '', doctor: '', date: '' };
/** Field order, used to focus the first invalid field on submit. */
const fieldOrder: (keyof Form)[] = ['name', 'mobile', 'email', 'speciality', 'doctor', 'date'];
/** How far ahead an appointment can be requested. */
const MAX_DAYS_AHEAD = 90;

const inputCls = (invalid?: boolean) =>
  cn(
    'w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus-visible:ring-2',
    invalid
      ? 'border-error focus-visible:border-error focus-visible:ring-error/30'
      : 'border-line focus-visible:border-brand-500 focus-visible:ring-brand-500/30',
  );

function validate(form: Form, doctorNames: string[]): Errors {
  const err: Errors = {
    name: validateName(form.name),
    mobile: validateIndianMobile(form.mobile),
    email: validateEmail(form.email),
    speciality: form.speciality ? undefined : 'Please select a speciality.',
    doctor: form.doctor && !doctorNames.includes(form.doctor) ? 'Please choose a doctor from the list.' : undefined,
    date: validateFutureDate(form.date, MAX_DAYS_AHEAD),
  };
  return Object.fromEntries(Object.entries(err).filter(([, v]) => v)) as Errors;
}

/**
 * "Contact for Emergency Services" beside the "Book an Appointment" form —
 * both carried over from the amaltashospital.in homepage. Like the full
 * booking page this collects a REQUEST; the team calls back to confirm.
 * TODO(integration): POST to the scheduling endpoint.
 */
export function AppointmentSection() {
  const [form, setForm] = useState<Form>(empty);
  /* Errors show for a field once it's been left (blurred) or after a submit attempt. */
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const slug = specialityOptions.find((o) => o.label === form.speciality)?.slug;
  const doctorOptions = doctors
    .filter((d) => !slug || d.specialtySlugs.includes(slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const allErrors = validate(form, doctorOptions.map((d) => d.name));
  const errorFor = (k: keyof Form) => (submitted || touched[k] ? allErrors[k] : undefined);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: keyof Form) => setTouched((t) => ({ ...t, [k]: true }));
  /** Shared props wiring a control to its label, error and touched state. */
  const control = (k: keyof Form) => ({
    id: `appt-${k}`,
    name: k,
    onBlur: () => touch(k),
    'aria-invalid': errorFor(k) ? true : undefined,
    'aria-describedby': errorFor(k) ? `appt-${k}-error` : undefined,
    className: inputCls(!!errorFor(k)),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const first = fieldOrder.find((k) => allErrors[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#appt-${first}`)?.focus();
      return;
    }
    // Store tidy values: collapsed whitespace, 10-digit mobile, trimmed email.
    setForm((f) => ({
      ...f,
      name: f.name.trim().replace(/\s+/g, ' '),
      mobile: normaliseIndianMobile(f.mobile) ?? f.mobile,
      email: f.email.trim(),
    }));
    setSent(true);
  }

  function reset() {
    setForm(empty);
    setTouched({});
    setSubmitted(false);
    setSent(false);
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
                <Button type="button" variant="outline" className="mt-6" onClick={reset}>
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

                <form ref={formRef} onSubmit={submit} noValidate className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field id="appt-name" label="Name" required error={errorFor('name')}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Name"
                      maxLength={60}
                      required
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      {...control('name')}
                    />
                  </Field>
                  <Field id="appt-mobile" label="Mobile Number" required error={errorFor('mobile')}>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      maxLength={16}
                      required
                      value={form.mobile}
                      /* Only digits, +, spaces and dashes can be typed. */
                      onChange={(e) => set('mobile', e.target.value.replace(/[^\d+\s-]/g, ''))}
                      {...control('mobile')}
                    />
                  </Field>
                  <Field id="appt-email" label="Email Id" error={errorFor('email')}>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Email Id (optional)"
                      maxLength={254}
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      {...control('email')}
                    />
                  </Field>
                  <Field id="appt-speciality" label="Speciality" required error={errorFor('speciality')}>
                    <select
                      required
                      value={form.speciality}
                      onChange={(e) => { set('speciality', e.target.value); set('doctor', ''); }}
                      {...control('speciality')}
                    >
                      <option value="">Select Speciality</option>
                      {specialityOptions.map((o) => <option key={o.label} value={o.label}>{o.label}</option>)}
                    </select>
                  </Field>
                  <Field id="appt-doctor" label="Doctor (optional)" error={errorFor('doctor')}>
                    <select value={form.doctor} onChange={(e) => set('doctor', e.target.value)} {...control('doctor')}>
                      <option value="">Any available doctor</option>
                      {doctorOptions.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
                    </select>
                  </Field>
                  <Field id="appt-date" label="Preferred Date" required error={errorFor('date')}>
                    <input
                      type="date"
                      required
                      min={localISODate()}
                      max={localISODate(MAX_DAYS_AHEAD)}
                      value={form.date}
                      onChange={(e) => set('date', e.target.value)}
                      {...control('date')}
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

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
        {required && <span className="text-emergency" aria-hidden> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
