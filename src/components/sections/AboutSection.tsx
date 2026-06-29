"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppLink } from "@/lib/utils";

export function AboutSection({ config }: { config: SiteConfig }) {
  const { about } = config;
  const { l, t } = useLanguage();

  return (
    <Section id="sobre-nosotros" className="bg-brand-secondary">
      <SectionHeader title={l(about.title)} subtitle={l(about.subtitle)} />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-border"
        >
          <Image
            src={about.image}
            alt={l(about.imageAlt)}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-brand-blue/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-wide text-brand-red">
              {t("about.story")}
            </h3>
            <p className="leading-relaxed text-brand-muted">{l(about.story)}</p>
          </div>
          <div>
            <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-wide text-brand-red">
              {t("about.mission")}
            </h3>
            <p className="leading-relaxed text-brand-muted">{l(about.mission)}</p>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-lg font-bold uppercase tracking-wide text-brand-red">
              {t("about.why")}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.trustReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-brand-cream">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <span className="text-sm">{l(reason)}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            href={getWhatsAppLink(
              config.contact.whatsapp,
              "Hi, I'd like a free quote for my vehicle."
            )}
            className="uppercase tracking-wide"
          >
            {t("cta.getQuote")}
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
