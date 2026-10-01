import { Seo, medicalOrgJsonLd } from '@/lib/seo/Seo';
import { Hero } from '@/components/home/Hero';
import { QuickActions } from '@/components/home/QuickActions';
import { AppointmentSection } from '@/components/home/AppointmentSection';
import { CentreOfExcellence } from '@/components/home/CentreOfExcellence';
import { /* TrustStats, */ WhyAmaltas /* , AdvancedTech */ } from '@/components/home/TrustSections';
import { /* FeaturedDoctors, */ FacilitiesShowcase, CampusShowcase } from '@/components/home/PeopleAndPlace';
import { Leadership } from '@/components/home/Leadership';
import { LatestUpdates } from '@/components/home/LatestUpdates';
import { PatientStoryVideos } from '@/components/home/PatientStoryVideos';
// import { PhotoMosaic } from '@/components/home/PhotoMosaic';
import { HospitalNetwork } from '@/components/home/HospitalNetwork';
import { Blogs } from '@/components/home/Blogs';
import { /* AccreditationsStrip, */ LocationSection /* , FinalCta */ } from '@/components/home/ClosingSections';
import { site } from '@/data/site';

export default function HomePage() {
  return (
    <>
      <Seo
        title={`${site.name}, Dewas | NABH-Accredited Multi-Superspeciality Care`}
        description={site.descriptionShort}
        path="/"
        jsonLd={medicalOrgJsonLd()}
      />
      <Hero />
      <QuickActions />
      <AppointmentSection />
      <CentreOfExcellence />
      {/* Stats strip (27.4 acres · NABH · 24/7) — hidden for now */}
      {/* <TrustStats /> */}
      <Leadership />
      {/* Meet our doctors — hidden for now */}
      {/* <FeaturedDoctors /> */}
      {/* Advanced technology: Modern infrastructure for complex care — hidden for now */}
      {/* <AdvancedTech /> */}
      <WhyAmaltas />
      <FacilitiesShowcase />
      <LatestUpdates />
      <PatientStoryVideos />
      {/* A look around the hospital — hidden for now */}
      {/* <PhotoMosaic /> */}
      <CampusShowcase />
      <HospitalNetwork />
      <Blogs />
      {/* Accredited & recognised (NABH) strip — hidden for now */}
      {/* <AccreditationsStrip /> */}
      <LocationSection />
      {/* Final CTA: Your health deserves the right care. — hidden for now */}
      {/* <FinalCta /> */}
    </>
  );
}
