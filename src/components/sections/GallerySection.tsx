"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { GalleryItem } from "@/types";

export function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  const { t } = useLanguage();
  const comparisonItems = gallery.filter((item) => item.beforeImage && item.afterImage);

  return (
    <Section id="galeria" className="bg-brand-dark">
      <SectionHeader
        label={t("gallery.label")}
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {comparisonItems.map((item) => (
          <div key={item.id}>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-cream">
              {item.category}
            </h3>
            {item.description && (
              <p className="mt-2 text-sm text-brand-muted">{item.description}</p>
            )}
            <div className="mt-4">
              <BeforeAfterSlider
                beforeImage={item.beforeImage!}
                afterImage={item.afterImage!}
                alt={item.alt}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-brand-muted">{t("gallery.dragHint")}</p>
    </Section>
  );
}
