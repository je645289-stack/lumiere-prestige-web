import { getSiteData, isSectionEnabled } from "@/lib/site-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/integrations/FloatingButtons";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PromotionsSection } from "@/components/sections/PromotionsSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { CTASection } from "@/components/sections/CTASection";

export default async function HomePage() {
  const data = await getSiteData();
  const { config, sections } = data;

  return (
    <>
      <Header config={config} sections={sections} />
      <main>
        {isSectionEnabled(sections, "hero") && <HeroSection config={config} />}
        {isSectionEnabled(sections, "stats") && <StatsSection config={config} />}
        {isSectionEnabled(sections, "services") && (
          <ServicesSection services={data.services} config={config} />
        )}
        {isSectionEnabled(sections, "about") && <AboutSection config={config} />}
        {isSectionEnabled(sections, "benefits") && (
          <BenefitsSection benefits={data.benefits} />
        )}
        {isSectionEnabled(sections, "gallery") && (
          <GallerySection gallery={data.gallery} />
        )}
        {isSectionEnabled(sections, "promotions") && (
          <PromotionsSection promotions={data.products} config={config} />
        )}
        {isSectionEnabled(sections, "process") && (
          <ProcessSection steps={data.processSteps} />
        )}
        {isSectionEnabled(sections, "testimonials") && (
          <TestimonialsSection testimonials={data.testimonials} />
        )}
        {isSectionEnabled(sections, "faq") && <FAQSection faqs={data.faqs} />}
        {isSectionEnabled(sections, "instagram") && (
          <InstagramSection images={data.gallery} config={config} />
        )}
        {isSectionEnabled(sections, "contact") && (
          <ContactSection config={config} services={data.services} />
        )}
        {isSectionEnabled(sections, "booking") && (
          <BookingSection config={config} services={data.services} />
        )}
        {isSectionEnabled(sections, "blog") && (
          <BlogSection posts={data.blogPosts} />
        )}
        {isSectionEnabled(sections, "cta") && <CTASection config={config} />}
      </main>
      <Footer config={config} />
      <FloatingButtons config={config} />
    </>
  );
}
