"use client";

import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Benefit } from "@/types";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-5 w-5" /> : <Icons.Star className="h-5 w-5" />;
}

export function BenefitsSection({ benefits }: { benefits: Benefit[] }) {
  const { t } = useLanguage();

  return (
    <Section id="beneficios" className="bg-brand-dark">
      <SectionHeader
        label={t("benefits.label")}
        title={t("benefits.title")}
        subtitle={t("benefits.subtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="flex items-center gap-3 rounded border border-brand-border bg-brand-navy/50 px-5 py-4 transition-colors hover:border-brand-red/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-red/10 text-brand-red">
              {getIcon(benefit.icon)}
            </div>
            <span className="text-sm font-medium text-brand-cream">{benefit.title}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="#contacto" variant="secondary">
          {t("process.getEstimate")}
        </Button>
      </div>
    </Section>
  );
}
