"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Product, SiteConfig } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function PromotionsSection({
  promotions,
  config,
}: {
  promotions: Product[];
  config: SiteConfig;
}) {
  const { l, t } = useLanguage();

  return (
    <Section id="promociones" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-red-blue opacity-[0.07]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-brand-red/20 blur-[120px]" />

      <div className="relative">
        <SectionHeader title={t("promotions.title")} subtitle={t("promotions.subtitle")} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo, i) => {
            const title = l(promo.name);
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
                className="glow-hover group flex flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-surface"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent" />
                  {promo.badge && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      <Tag className="h-3 w-3" />
                      {promo.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-brand-cream">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                    {l(promo.description)}
                  </p>
                  <Button
                    href={getWhatsAppLink(
                      config.contact.whatsapp,
                      `Hi, I'd like to claim this offer: ${title} (${promo.badge})`
                    )}
                    size="sm"
                    className="mt-5 w-full uppercase tracking-wide"
                  >
                    {t("cta.claimOffer")}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
