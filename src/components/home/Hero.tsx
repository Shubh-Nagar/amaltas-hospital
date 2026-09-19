import { CalendarPlus, Stethoscope, ShieldCheck, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmergencyButton } from '@/components/emergency/EmergencyButton';

/**
 * Hero. Visual panel shows an authentic Amaltas hospital photograph, layered
 * over the brand gradient + subtle pattern. Communicates trust, expertise and
 * care without overcrowding.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section className="relative overflow-hidden bg-brand-900 text-white" aria-label="Welcome">
      {/* Decorative background */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V0h32" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <motion.p {...rise(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
              <ShieldCheck className="h-4 w-4 text-accent-400" aria-hidden />
              NABH-accredited · {site.campusAcres}-acre campus
            </motion.p>
            <motion.h1 {...rise(0.08)} className="text-display text-white">
              Advanced care, <span className="text-accent-400">close to home.</span>
            </motion.h1>
            <motion.p {...rise(0.16)} className="mt-5 max-w-xl text-lead text-white/80">
              {site.name} brings multi-superspeciality medicine — heart, brain, cancer, kidney and more — to Dewas, with a focus on expertise and human care.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/patients/appointment" size="lg" variant="secondary">
                <CalendarPlus className="h-5 w-5" aria-hidden /> Book an Appointment
              </Button>
              <Button to="/doctors" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Stethoscope className="h-5 w-5" aria-hidden /> Find a Doctor
              </Button>
              <EmergencyButton className="!py-3.5" />
            </motion.div>

            <motion.p {...rise(0.32)} className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 text-accent-400" aria-hidden />
              {site.address.line1}, {site.address.city}, {site.address.state}
            </motion.p>
          </div>

          {/* Visual panel — authentic Amaltas hospital photograph */}
          <motion.div {...rise(0.2)} className="relative hidden lg:block">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="/images/gallery/entrance-ambulance-bay.webp"
                alt="Amaltas Super Speciality Hospital entrance and ambulance bay"
                width={1600}
                height={898}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-surface px-5 py-4 text-brand-900 shadow-card-hover">
              <p className="text-2xl font-semibold">24 / 7</p>
              <p className="text-xs text-muted">Emergency &amp; critical care</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
