"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { FAQ, SiteConfig } from "@/types";
import { getDefaultWhatsAppLink } from "@/lib/utils";

export function FAQSection({ faqs, config }: { faqs: FAQ[]; config: SiteConfig }) {
  const { t } = useLanguage();

  return (
    <Section id="faq" className="bg-brand-dark">
      <SectionHeader label={t("faq.label")} title={t("faq.title")} />

      <FAQAccordion faqs={faqs} />

      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-brand-muted">{t("faq.moreQuestions")}</p>
        <Button href={getDefaultWhatsAppLink(config.contact)}>
          {t("faq.requestQuote")}
        </Button>
      </div>
    </Section>
  );
}
