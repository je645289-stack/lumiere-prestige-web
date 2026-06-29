"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Service, SiteConfig } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-6 w-6" /> : <Icons.Star className="h-6 w-6" />;
}

export function ServicesSection({
  services,
  config,
}: {
  services: Service[];
  config: SiteConfig;
}) {
  const { l, t } = useLanguage();

  return (
    <Section id="servicios">
      <SectionHeader title={t("services.title")} subtitle={t("services.subtitle")} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const name = l(service.name);
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glow-hover group flex flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-surface"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={service.image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-red text-white shadow-lg">
                  {getIcon(service.icon)}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-bold text-brand-cream">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                  {l(service.description)}
                </p>
                <Button
                  href={getWhatsAppLink(
                    config.contact.whatsapp,
                    `Hi, I'd like a quote for: ${name}`
                  )}
                  size="sm"
                  className="mt-5 w-full uppercase tracking-wide"
                >
                  {t("cta.requestQuote")}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Button href="/servicios" variant="secondary">
          {t("cta.viewAll")}
        </Button>
      </div>
    </Section>
  );
}
