"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Benefit } from "@/types";
import { useLanguage } from "@/lib/i18n";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-7 w-7" /> : <Icons.Star className="h-7 w-7" />;
}

export function BenefitsSection({ benefits }: { benefits: Benefit[] }) {
  const { l, t } = useLanguage();

  return (
    <Section id="beneficios">
      <SectionHeader title={t("benefits.title")} subtitle={t("benefits.subtitle")} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="glow-hover rounded-xl border border-brand-border bg-brand-surface p-7 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-blue text-white">
              {getIcon(benefit.icon)}
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-cream">
              {l(benefit.title)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {l(benefit.description)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
