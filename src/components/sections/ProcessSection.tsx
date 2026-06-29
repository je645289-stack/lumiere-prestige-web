"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { ProcessStep } from "@/types";
import { useLanguage } from "@/lib/i18n";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-7 w-7" /> : <Icons.Star className="h-7 w-7" />;
}

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const { l, t } = useLanguage();

  return (
    <Section id="proceso" className="bg-brand-secondary">
      <SectionHeader title={t("process.title")} subtitle={t("process.subtitle")} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative rounded-xl border border-brand-border bg-brand-surface p-7 text-center"
          >
            <span className="absolute right-4 top-3 font-display text-5xl text-brand-red/15">
              {String(step.step).padStart(2, "0")}
            </span>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-red bg-brand-dark text-brand-red">
              {getIcon(step.icon)}
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-cream">
              {l(step.title)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {l(step.description)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
