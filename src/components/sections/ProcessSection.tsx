"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ContactFields } from "@/data/contact";
import { getDefaultWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ProcessStep } from "@/types";

export function ProcessSection({
  steps,
  contact,
}: {
  steps: ProcessStep[];
  contact?: ContactFields;
}) {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <Section id="proceso" className="bg-brand-light overflow-hidden">
      <SectionHeader
        label={t("process.label")}
        title={t("process.title")}
        subtitle={t("process.subtitle")}
        light
      />

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="w-[280px] shrink-0 snap-start rounded border border-gray-200 bg-white p-6 shadow-sm md:w-[300px]"
            >
              <span className="font-display text-4xl font-bold text-brand-red/20">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-wide text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-light-muted">
                {step.description}
              </p>
              <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                {step.step}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red"
            aria-label={t("process.prev")}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red"
            aria-label={t("process.next")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button href={getDefaultWhatsAppLink(contact)}>{t("faq.requestQuote")}</Button>
      </div>
    </Section>
  );
}
