"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { GalleryItem, SiteConfig } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function InstagramSection({
  images,
  config,
}: {
  images: GalleryItem[];
  config: SiteConfig;
}) {
  const { l, t } = useLanguage();
  const handle = "@albert_auto_detailing";
  const feed = images.slice(0, 8);

  return (
    <Section id="instagram" className="bg-brand-secondary">
      <SectionHeader title={t("instagram.title")} subtitle={t("instagram.subtitle")} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
        {feed.map((item) => (
          <a
            key={item.id}
            href={config.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg border border-brand-border"
          >
            <Image
              src={item.image}
              alt={l(item.alt)}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/0 transition-colors group-hover:bg-brand-dark/60">
              <Instagram className="h-7 w-7 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href={config.social.instagram} className="uppercase tracking-wide">
          <Instagram className="h-5 w-5" />
          {t("instagram.follow")} {handle}
        </Button>
      </div>
    </Section>
  );
}
