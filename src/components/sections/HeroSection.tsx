"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { SiteConfig } from "@/types";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export function HeroSection({ config }: { config: SiteConfig }) {
  const { hero } = config;
  const { l, t } = useLanguage();

  const resolveHref = (href: string, message: string) => {
    if (href === "whatsapp") return getWhatsAppLink(config.contact.whatsapp, message);
    if (href === "call") return getPhoneLink(config.contact.phone);
    return href;
  };

  const quoteMsg = `Hi ${config.businessName}, I'd like a free quote for my vehicle.`;

  return (
    <Section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
      containerClassName="relative z-10"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt={l(hero.imageAlt)}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40" />
      </div>

      {/* Decorative red/blue light glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 z-0 h-96 w-96 rounded-full bg-brand-red/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 z-0 h-96 w-96 rounded-full bg-brand-blue/20 blur-[120px]" />

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-red-bright">
            <Sparkles className="h-4 w-4" />
            {l(hero.badge)}
          </span>

          <h1 className="font-display text-5xl leading-none text-brand-cream sm:text-6xl md:text-7xl lg:text-8xl">
            {l(hero.title)}
          </h1>

          <p className="mt-6 max-w-2xl font-heading text-lg font-medium text-brand-cream/90 md:text-xl">
            {l(hero.subtitle)}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-brand-muted">
            {l(hero.description)}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={resolveHref(hero.primaryButton.href, quoteMsg)}
              size="lg"
              className="uppercase tracking-wide"
            >
              {l(hero.primaryButton.text)}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={resolveHref(hero.secondaryButton.href, quoteMsg)}
              variant="secondary"
              size="lg"
              className="uppercase tracking-wide"
            >
              <Phone className="h-5 w-5" />
              {l(hero.secondaryButton.text)}
            </Button>
          </div>
        </motion.div>
      </div>

      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-brand-red"
        aria-label={t("hero.scroll")}
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </Section>
  );
}
