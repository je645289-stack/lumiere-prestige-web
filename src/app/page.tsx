import { getSiteData, isSectionEnabled } from "@/lib/site-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/integrations/FloatingButtons";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { CTASection } from "@/components/sections/CTASection";

export default async function HomePage() {
  const data = await getSiteData();
  const { config, sections } = data;

  return (
    <>
      <Header config={config} sections={sections} />
      <main>
        {isSectionEnabled(sections, "hero") && <HeroSection config={config} />}
        {isSectionEnabled(sections, "about") && <AboutSection config={config} />}
        {isSectionEnabled(sections, "services") && (
          <ServicesSection services={data.services} config={config} />
        )}
        {isSectionEnabled(sections, "catalog") && (
          <CatalogSection products={data.products} config={config} />
        )}
        {isSectionEnabled(sections, "benefits") && (
          <BenefitsSection benefits={data.benefits} />
        )}
        {isSectionEnabled(sections, "process") && (
          <ProcessSection steps={data.processSteps} />
        )}
        {isSectionEnabled(sections, "gallery") && (
          <GallerySection gallery={data.gallery} />
        )}
        {isSectionEnabled(sections, "testimonials") && (
          <TestimonialsSection testimonials={data.testimonials} />
        )}
        {isSectionEnabled(sections, "faq") && <FAQSection faqs={data.faqs} />}
        {isSectionEnabled(sections, "blog") && (
          <BlogSection posts={data.blogPosts} />
        )}
        {isSectionEnabled(sections, "contact") && (
          <ContactSection config={config} />
        )}
        {isSectionEnabled(sections, "location") && (
          <LocationSection config={config} />
        )}
        {isSectionEnabled(sections, "cta") && <CTASection config={config} />}
      </main>
      <Footer config={config} />
      <FloatingButtons config={config} />
    </>
  );
}
