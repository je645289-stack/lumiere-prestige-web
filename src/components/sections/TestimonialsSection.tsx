"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import type { Testimonial } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();
  return (
    <Section id="testimonios" className="bg-brand-secondary">
      <SectionHeader title={t("testimonials.title")} subtitle={t("testimonials.subtitle")} />
      <TestimonialCarousel testimonials={testimonials} />
    </Section>
  );
}
