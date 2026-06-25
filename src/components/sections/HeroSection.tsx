"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { SiteConfig } from "@/types";

export function HeroSection({ config }: { config: SiteConfig }) {
  const { hero } = config;

  return (
    <Section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      containerClassName="relative z-10"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/60" />
      </div>

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-gold">
            {config.tagline}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-brand-cream md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-4 text-xl text-brand-gold-light">{hero.subtitle}</p>
          <p className="mt-6 max-w-xl text-brand-muted leading-relaxed">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={hero.primaryButton.href} size="lg">
              {hero.primaryButton.text}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={hero.secondaryButton.href} variant="secondary" size="lg">
              {hero.secondaryButton.text}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-brand-gold/20 shadow-2xl shadow-brand-gold/10">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </motion.div>
      </div>

      <a
        href="#sobre-nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-brand-gold"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </Section>
  );
}
