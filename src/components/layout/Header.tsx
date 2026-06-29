"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteConfig, SectionConfig } from "@/types";
import { getDefaultWhatsAppLink } from "@/lib/utils";
import type { Locale } from "@/i18n/types";
import { useMergedConfig, useMergedSections } from "@/lib/use-cms-content";

const navLinkKeys = [
  { href: "#inicio", key: "nav.home" as const, section: "hero" },
  { href: "#sobre-nosotros", key: "nav.about" as const, section: "about" },
  { href: "#servicios", key: "nav.services" as const, section: "services" },
  { href: "#galeria", key: "nav.gallery" as const, section: "gallery" },
  { href: "#faq", key: "nav.faq" as const, section: "faq" },
  { href: "#contacto", key: "nav.contact" as const, section: "contact" },
];

function LanguageToggle({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  return (
    <div className="flex items-center gap-1 rounded border border-brand-border bg-brand-navy px-3 py-1.5 text-xs font-medium text-brand-cream">
      <Globe className="h-3.5 w-3.5" />
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "transition-colors",
          locale === "en" ? "text-brand-red" : "text-brand-muted hover:text-brand-cream"
        )}
      >
        EN
      </button>
      <span className="text-brand-muted">|</span>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={cn(
          "transition-colors",
          locale === "es" ? "text-brand-red" : "text-brand-muted hover:text-brand-cream"
        )}
      >
        ES
      </button>
    </div>
  );
}

export function Header({
  config: serverConfig,
  sections: serverSections,
}: {
  config: SiteConfig;
  sections: SectionConfig[];
}) {
  const { locale, setLocale, t } = useLanguage();
  const config = useMergedConfig(serverConfig);
  const sections = useMergedSections(serverSections);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleLinks = useMemo(
    () => navLinkKeys.filter((link) => sections.some((s) => s.id === link.section && s.enabled)),
    [sections]
  );
  const contact = config.contact;

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-brand-dark/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-2">
          <span className="font-label text-sm font-bold uppercase tracking-widest text-brand-cream md:text-base">
            Albert
          </span>
          <span className="hidden font-label text-sm font-bold uppercase tracking-widest text-brand-red sm:inline">
            Auto
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-brand-cream/90 transition-colors hover:text-brand-red"
            >
              {t(link.key)}
            </a>
          ))}

          <LanguageToggle locale={locale} setLocale={setLocale} />

          <Button href={getDefaultWhatsAppLink(contact)} size="sm">
            <MessageCircle className="h-4 w-4" />
            {t("nav.getQuote")}
          </Button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle locale={locale} setLocale={setLocale} />
          <button
            className="text-brand-cream"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t("nav.menu")}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-brand-border bg-brand-dark/98 px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {visibleLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-brand-cream hover:text-brand-red"
              >
                {t(link.key)}
              </a>
            ))}
            <Button
              href={getDefaultWhatsAppLink(contact)}
              size="sm"
              className="mt-2"
            >
              <MessageCircle className="h-4 w-4" />
              {t("nav.getQuote")}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
