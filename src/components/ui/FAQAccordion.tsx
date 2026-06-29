"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const { l } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={cn(
              "overflow-hidden rounded-lg border bg-brand-surface transition-colors",
              isOpen ? "border-brand-red/50" : "border-brand-border"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-brand-red/5"
              aria-expanded={isOpen}
            >
              <span className="pr-4 font-heading font-semibold text-brand-cream">
                {l(faq.question)}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-brand-red transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 leading-relaxed text-brand-muted">{l(faq.answer)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
