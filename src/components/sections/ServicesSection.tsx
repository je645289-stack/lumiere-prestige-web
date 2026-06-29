"use client";

import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Service } from "@/types";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-6 w-6" /> : <Icons.Star className="h-6 w-6" />;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const { t } = useLanguage();

  return (
    <Section id="servicios" className="bg-brand-light">
      <SectionHeader label={t("services.label")} title={t("services.title")} light />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="group rounded border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-red/30 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
              {getIcon(service.icon)}
            </div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-dark">
              {service.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-light-muted">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
