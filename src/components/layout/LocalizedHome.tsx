"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromotionsSection } from "@/components/sections/PromotionsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { MobileServiceSection } from "@/components/sections/MobileServiceSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeSiteData, type SiteData } from "@/lib/localize-data";
import { isSectionEnabled } from "@/lib/sections";
import { useMergedSiteData } from "@/lib/use-cms-content";

export function LocalizedHome({ data: serverData }: { data: SiteData }) {
  const { locale } = useLanguage();
  const data = useMergedSiteData(serverData);
  const localized = useMemo(() => localizeSiteData(data, locale), [data, locale]);
  const { config, sections } = localized;

  return (
    <>
      <Header config={config} sections={sections} />
      <main>
        {isSectionEnabled(sections, "hero") && <HeroSection config={config} />}
        {isSectionEnabled(sections, "promotions") && <PromotionsSection config={config} />}
        {isSectionEnabled(sections, "about") && <AboutSection config={config} />}
        {isSectionEnabled(sections, "services") && (
          <ServicesSection services={localized.services} />
        )}
        {isSectionEnabled(sections, "catalog") && (
          <CatalogSection products={localized.products} config={config} />
        )}
        {isSectionEnabled(sections, "mobile-service") && (
          <MobileServiceSection config={config} />
        )}
        {isSectionEnabled(sections, "benefits") && (
          <BenefitsSection benefits={localized.benefits} />
        )}
        {isSectionEnabled(sections, "process") && (
          <ProcessSection steps={localized.processSteps} contact={config.contact} />
        )}
        {isSectionEnabled(sections, "gallery") && (
          <GallerySection gallery={localized.gallery} />
        )}
        {isSectionEnabled(sections, "testimonials") && (
          <TestimonialsSection testimonials={localized.testimonials} />
        )}
        {isSectionEnabled(sections, "faq") && (
          <FAQSection faqs={localized.faqs} config={config} />
        )}
        {isSectionEnabled(sections, "contact") && (
          <ContactSection config={config} services={localized.services} />
        )}
        {isSectionEnabled(sections, "location") && <LocationSection config={config} />}
      </main>
      <Footer config={config} services={localized.services} />
    </>
  );
}
