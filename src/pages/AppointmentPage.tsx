import type { ReactNode } from 'react';
import { useState } from 'react';
import { Check, CalendarCheck, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import { Seo } from '@/lib/seo/Seo';
import { specialties } from '@/data/specialties';
import { doctors } from '@/data/doctors';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Appointment REQUEST flow. No real-time scheduling API exists, so we do NOT
 * fabricate availability. The form collects a request and is structured so a
 * scheduling API can be integrated at the `submit` step later.
 *
 * TODO(integration): POST the payload to a secure backend endpoint. Do not
 * store patient data client-side. See docs/architecture/technical-architecture.md.
 */
const steps = ['Specialty', 'Doctor', 'Preferred time', 'Your details'] as const;

interface FormState {
  specialty: string;
  doctor: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  reason: string;
}

const emptyForm: FormState = { specialty: '', doctor: '', date: '', slot: '', name: '', phone: '', reason: '' };

export default function AppointmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const doctorOptions = doctors.filter((d) => !form.specialty || d.specialtySlugs.includes(form.specialty));

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  function validateStep(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (step === 0 && !form.specialty) e.specialty = 'Please choose a specialty.';
    if (step === 2 && !form.date) e.date = 'Please choose a preferred date.';
    if (step === 3) {
      if (!form.name.trim()) e.name = 'Please enter your name.';
      if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Please enter a valid phone number.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1)); }
  function back() { setErrors({}); setStep((s) => Math.max(s - 1, 0)); }
  function submit() {
    if (!validateStep()) return;
    // TODO: send `form` to secure scheduling endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Seo title="Appointment requested" path="/patients/appointment" noIndex />
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700"><CalendarCheck className="h-8 w-8" aria-hidden /></span>
          <h1 className="text-h2 text-brand-900">Request received</h1>
          <p className="mt-3 max-w-md text-muted">
            Thank you, {form.name || 'there'}. Your appointment request has been noted. Our team will contact you on {form.phone || 'your number'} to confirm a time.
          </p>
          <p className="mt-2 text-sm text-muted">This is a request, not a confirmed booking. For urgent needs, please call us.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={`tel:${site.phone.tollFree.replace(/[^+\d]/g, '')}`}><Phone className="h-4 w-4" aria-hidden /> Call {site.phone.tollFree}</Button>
            <Button to="/" variant="outline">Back to home</Button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Seo title="Book an Appointment" description="Request an appointment at Amaltas Super Speciality Hospital." path="/patients/appointment" />
      <PageHeader
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Patients & Visitors', path: '/patients' }, { name: 'Appointment', path: '/patients/appointment' }]}
        title="Book an Appointment"
        intro="Request a visit in a few steps. Our team will call to confirm — we never show unverified availability."
      />

      <Container className="py-10">
        <div className="mx-auto max-w-2xl">
          {/* Stepper */}
          <ol className="mb-8 flex items-center">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={cn('flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    i < step ? 'border-brand-600 bg-brand-600 text-white' : i === step ? 'border-brand-600 text-brand-700' : 'border-line text-muted')}>
                    {i < step ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                  </span>
                  <span className={cn('hidden text-xs sm:block', i === step ? 'font-semibold text-brand-800' : 'text-muted')}>{label}</span>
                </div>
                {i < steps.length - 1 && <span className={cn('mx-2 h-0.5 flex-1', i < step ? 'bg-brand-600' : 'bg-line')} aria-hidden />}
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            {step === 0 && (
              <Field label="Choose a specialty" error={errors.specialty}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {specialties.map((s) => (
                    <button key={s.slug} type="button" onClick={() => { set('specialty', s.slug); set('doctor', ''); }}
                      className={cn('rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                        form.specialty === s.slug ? 'border-brand-600 bg-brand-50 font-medium text-brand-800' : 'border-line hover:bg-brand-50/50')}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </Field>
            )}

            {step === 1 && (
              <Field label="Choose a doctor (optional)" error={errors.doctor}>
                <div className="grid gap-2">
                  <button type="button" onClick={() => set('doctor', '')}
                    className={cn('rounded-xl border px-4 py-3 text-left text-sm', form.doctor === '' ? 'border-brand-600 bg-brand-50 font-medium' : 'border-line hover:bg-brand-50/50')}>
                    No preference — assign the right specialist
                  </button>
                  {doctorOptions.map((d) => (
                    <button key={d.slug} type="button" onClick={() => set('doctor', d.slug)}
                      className={cn('rounded-xl border px-4 py-3 text-left text-sm', form.doctor === d.slug ? 'border-brand-600 bg-brand-50 font-medium' : 'border-line hover:bg-brand-50/50')}>
                      {d.name} <span className="text-muted">· {d.role ?? d.qualifications}</span>
                    </button>
                  ))}
                </div>
              </Field>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <Field label="Preferred date" error={errors.date}>
                  <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => set('date', e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                </Field>
                <Field label="Preferred time of day">
                  <div className="grid grid-cols-3 gap-2">
                    {['Morning', 'Afternoon', 'Evening'].map((slot) => (
                      <button key={slot} type="button" onClick={() => set('slot', slot)}
                        className={cn('rounded-xl border px-4 py-3 text-sm', form.slot === slot ? 'border-brand-600 bg-brand-50 font-medium' : 'border-line hover:bg-brand-50/50')}>
                        {slot}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted">Times are preferences only. Our team will confirm actual availability by phone.</p>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5">
                <Field label="Full name" error={errors.name}>
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name"
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="+91…"
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                </Field>
                <Field label="Reason for visit (optional)">
                  <textarea value={form.reason} onChange={(e) => set('reason', e.target.value)} rows={3}
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />
                </Field>
                <p className="text-xs text-muted">By submitting, you agree to be contacted about this request. Please don’t share sensitive medical details here.</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={back} className={step === 0 ? 'invisible' : ''}>
                <ChevronLeft className="h-4 w-4" aria-hidden /> Back
              </Button>
              {step < steps.length - 1 ? (
                <Button type="button" onClick={next}>Continue <ChevronRight className="h-4 w-4" aria-hidden /></Button>
              ) : (
                <Button type="button" onClick={submit}>Submit request</Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-900">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-error" role="alert">{error}</p>}
    </div>
  );
}
