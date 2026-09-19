import { CalendarPlus, Stethoscope, ShieldCheck, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmergencyButton } from '@/components/emergency/EmergencyButton';
import { AmbulanceRunner } from '@/components/home/AmbulanceRunner';
import { HeroAccreditations } from '@/components/home/HeroAccreditations';
import { HeroImageStack } from '@/components/home/HeroImageStack';

/**
 * Hero. A full-bleed Amaltas campus photograph under a deep forest-green wash
 * (matching amaltasuniversity.in), with the headline and calls to action set
 * over the image. The wash is layered left-dark so the type always clears
 * WCAG contrast regardless of what the photograph is doing behind it.
 */
export function Hero() {
  const reduce = useReducedMotion();
  /* Soft green halo behind the hero copy — lets the wash stay light without
     the white type dropping below contrast over the sunlit facade. */
  const shade = '[text-shadow:0_2px_24px_rgb(11_44_24_/_0.85),0_1px_3px_rgb(11_44_24_/_0.6)]';
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section className="relative overflow-hidden bg-brand-900 text-white" aria-label="Welcome">
      {/* Campus photograph under a deep-green wash */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/images/gallery/entrance-ambulance-bay.webp"
          alt=""
          width={1600}
          height={898}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Wash kept deliberately light so the campus reads through; the copy
            carries its own shadow (see `shade`) rather than leaning on the wash. */}
        {/* Horizontal ramp only — all the darkening sits under the copy on the
            left and falls to nothing on the right, where there is no text.
            Mobile keeps more cover because the copy runs the full width. */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/35 lg:from-brand-950/80 lg:via-brand-950/25 lg:to-transparent" />
        {/* Bottom fade only, so the ambulance's road keeps a dark surface. */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
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

      <Container className="relative z-10">
        <div className="grid items-center gap-10 pb-32 pt-28 sm:pb-36 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-40 lg:pt-36">
          <div>
            <motion.p {...rise(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-950/50 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-accent-400" aria-hidden />
              NABH-accredited · {site.campusAcres}-acre campus
            </motion.p>
            <motion.h1 {...rise(0.08)} className={`text-display text-white ${shade}`}>
              Advanced care, <span className="text-accent-400">close to home.</span>
            </motion.h1>
            <motion.p {...rise(0.16)} className={`mt-5 max-w-xl text-lead text-white/90 ${shade}`}>
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

            <motion.p {...rise(0.32)} className={`mt-6 flex items-center gap-2 text-sm text-white/85 ${shade}`}>
              <MapPin className="h-4 w-4 text-accent-400" aria-hidden />
              {site.address.line1}, {site.address.city}, {site.address.state}
            </motion.p>

            <motion.div {...rise(0.4)} className="mt-7">
              <HeroAccreditations />
            </motion.div>
          </div>

          {/* Cycling deck of campus photographs */}
          <motion.div {...rise(0.2)} className="hidden lg:flex lg:justify-end">
            <HeroImageStack />
          </motion.div>
        </div>
      </Container>

      {/* Ambulance driving across the bottom of the green hero */}
      <AmbulanceRunner />
    </section>
  );
}
