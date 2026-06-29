"use client";

import { Check, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Product, SiteConfig } from "@/types";
import { getDefaultWhatsAppLink } from "@/lib/utils";

export function CatalogSection({
  products,
  config,
}: {
  products: Product[];
  config: SiteConfig;
}) {
  const { t } = useLanguage();
  const contact = config.contact;

  return (
    <Section id="catalogo" className="bg-brand-dark bg-section-gradient">
      <SectionHeader
        label={t("catalog.label")}
        title={t("catalog.title")}
        subtitle={t("catalog.subtitle")}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-sm border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
              {product.name}
            </h3>

            <div className="mt-4">
              {product.priceLabel && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-light-muted">
                  {product.priceLabel}
                </p>
              )}
              <p className="font-display text-3xl font-bold text-brand-dark">{product.price}</p>
            </div>

            <hr className="my-4 border-gray-200" />

            {product.features && (
              <ul className="flex-1 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-brand-light-muted"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-dark" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 space-y-2">
              <Button href={getDefaultWhatsAppLink(contact)} size="sm" className="w-full">
                {t("catalog.bookNow")}
              </Button>
              <Button href={getDefaultWhatsAppLink(contact)} variant="dark" size="sm" className="w-full border-gray-200 bg-gray-100 text-brand-dark hover:bg-gray-200">
                {t("catalog.requestQuote")}
              </Button>
              <Button href={getDefaultWhatsAppLink(contact)} variant="dark" size="sm" className="w-full border-gray-200 bg-gray-100 text-brand-dark hover:bg-gray-200">
                <MessageCircle className="h-3.5 w-3.5" />
                {t("catalog.whatsapp")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-brand-muted">{t("catalog.priceNote")}</p>
    </Section>
  );
}
