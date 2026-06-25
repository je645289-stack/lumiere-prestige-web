import { Section, SectionHeader } from "@/components/ui/Section";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonios" className="bg-brand-surface/50">
      <SectionHeader
        title="Lo que dicen nuestros clientes"
        subtitle="Testimonios reales de quienes han vivido la experiencia Lumière Prestige"
      />
      <TestimonialCarousel testimonials={testimonials} />
    </Section>
  );
}
