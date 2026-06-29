"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone } from "lucide-react";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function CTASection({ config }: { config: SiteConfig }) {
  const { cta } = config;
  const { l } = useLanguage();

  const quoteMsg = `Hi ${config.businessName}, I'd like a free quote and to claim the 20% off offer.`;
  const resolve = (href: string) => {
    if (href === "whatsapp") return getWhatsAppLink(config.contact.whatsapp, quoteMsg);
    if (href === "call") return getPhoneLink(config.contact.phone);
    return href;
  };

  return (
    <Section id="cta-final" className="relative overflow-hidden">
      <div className="relative overflow-hidden rounded-2xl border border-brand-red/30 p-10 text-center md:p-16">
        <div className="absolute inset-0 bg-red-blue opacity-90" />
        <div className="absolute inset-0 bg-brand-dark/40" />
        <div className="relative">
          <h2 className="font-display text-4xl text-white md:text-5xl lg:text-6xl">
            {l(cta.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{l(cta.subtitle)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href={resolve(cta.primaryButton.href)}
              size="lg"
              className="bg-white uppercase tracking-wide text-brand-red hover:bg-white/90"
            >
              {l(cta.primaryButton.text)}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={resolve(cta.secondaryButton.href)}
              size="lg"
              className="border border-white bg-transparent uppercase tracking-wide text-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {l(cta.secondaryButton.text)}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
