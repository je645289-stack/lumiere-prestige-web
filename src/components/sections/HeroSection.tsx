"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteConfig } from "@/types";
import { getDefaultWhatsAppLink, getPhoneLink } from "@/lib/utils";

const DEFAULT_HERO_VIDEO = "/videos/hero-video.mp4";

export function HeroSection({ config }: { config: SiteConfig }) {
  const { hero } = config;
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = hero.video ?? DEFAULT_HERO_VIDEO;
  const contact = config.contact;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => {});
  }, [videoSrc]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          {hero.badge && (
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-red" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                {hero.badge}
              </p>
            </div>
          )}

          <h1 className="font-display text-5xl font-semibold leading-[1.1] text-brand-cream md:text-6xl lg:text-7xl xl:text-8xl">
            {hero.title}
            {hero.titleAccent && (
              <>
                <br />
                <span className="text-brand-red">{hero.titleAccent}</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl font-display text-lg italic text-brand-cream/90 md:text-xl">
            {hero.subtitle}
          </p>

          {hero.description && (
            <p className="mt-4 max-w-xl text-brand-muted leading-relaxed">{hero.description}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={getDefaultWhatsAppLink(contact)} size="lg">
              {hero.primaryButton.text}
            </Button>
            <Button href={hero.secondaryButton.href} variant="secondary" size="lg">
              {hero.secondaryButton.text}
            </Button>
          </div>

          {hero.tertiaryButton && (
            <a
              href={getPhoneLink(contact)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-cream/80 transition-colors hover:text-brand-red"
            >
              <Phone className="h-4 w-4" />
              {hero.tertiaryButton.text}
            </a>
          )}
        </motion.div>
      </div>

      <a
        href="#promociones"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-brand-cream/60 transition-colors hover:text-brand-red"
        aria-label={t("hero.scroll")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          {t("hero.scroll")}
        </span>
        <ChevronDown className="h-5 w-5 animate-scroll-bounce" />
      </a>
    </section>
  );
}
