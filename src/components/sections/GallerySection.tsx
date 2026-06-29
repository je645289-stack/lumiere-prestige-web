"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import type { GalleryItem } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  const { t } = useLanguage();
  return (
    <Section id="galeria">
      <SectionHeader title={t("gallery.title")} subtitle={t("gallery.subtitle")} />
      <GalleryGrid items={gallery} />
    </Section>
  );
}
