import { Section, SectionHeader } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <Section id="faq">
      <SectionHeader
        title="Preguntas Frecuentes"
        subtitle="Resolvemos las dudas más comunes de nuestros clientes"
      />
      <FAQAccordion faqs={faqs} />
    </Section>
  );
}
