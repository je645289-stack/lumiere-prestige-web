"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type { FAQ } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const { t } = useLanguage();
  return (
    <Section id="faq">
      <SectionHeader title={t("faq.title")} subtitle={t("faq.subtitle")} />
      <FAQAccordion faqs={faqs} />
    </Section>
  );
}
