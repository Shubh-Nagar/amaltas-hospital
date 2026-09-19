import { Seo, medicalOrgJsonLd } from '@/lib/seo/Seo';
import { Hero } from '@/components/home/Hero';
import { QuickActions } from '@/components/home/QuickActions';
import { WhatBringsYou, CentresOfExcellence } from '@/components/home/CareExplorer';
import { TrustStats, WhyAmaltas, AdvancedTech } from '@/components/home/TrustSections';
import { FeaturedDoctors, FacilitiesShowcase, CampusShowcase } from '@/components/home/PeopleAndPlace';
import { PatientStories, HealthInsights, AccreditationsStrip, LocationSection, FinalCta } from '@/components/home/ClosingSections';
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
      <WhatBringsYou />
      <CentresOfExcellence />
      <TrustStats />
      <FeaturedDoctors />
      <AdvancedTech />
      <WhyAmaltas />
      <FacilitiesShowcase />
      <CampusShowcase />
      <PatientStories />
      <HealthInsights />
      <AccreditationsStrip />
      <LocationSection />
      <FinalCta />
    </>
  );
}
