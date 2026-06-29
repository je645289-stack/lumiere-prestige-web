"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n";
import type { SiteConfig, SectionConfig } from "@/types";

const navLinks: { href: string; key: string }[] = [
  { href: "/#inicio", key: "nav.home" },
  { href: "/#servicios", key: "nav.services" },
  { href: "/#sobre-nosotros", key: "nav.about" },
  { href: "/#galeria", key: "nav.gallery" },
  { href: "/#promociones", key: "nav.promotions" },
  { href: "/#testimonios", key: "nav.testimonials" },
  { href: "/#contacto", key: "nav.contact" },
];

export function Header({
  config,
}: {
  config: SiteConfig;
  sections?: SectionConfig[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggle } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [first, ...rest] = config.businessName.split(" ");

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-brand-dark/95 shadow-lg shadow-black/30 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/#inicio" className="group">
          <span className="font-display text-2xl tracking-wide text-brand-cream md:text-3xl">
            {first} <span className="text-brand-red">{rest.join(" ")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-red"
            >
              {t(link.key)}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-full border border-brand-border px-3 py-1.5 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-red hover:text-brand-red"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {lang.toUpperCase()}
          </button>
          <Button href="/#reservar" size="sm" className="uppercase tracking-wide">
            {t("nav.book")}
          </Button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggle}
            className="flex items-center gap-1 rounded-full border border-brand-border px-2.5 py-1 text-xs font-semibold text-brand-cream"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <button
            className="text-brand-cream"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-brand-border bg-brand-dark/98 px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-brand-cream hover:text-brand-red"
              >
                {t(link.key)}
              </Link>
            ))}
            <Button
              href="/#reservar"
              size="sm"
              className="mt-2 uppercase tracking-wide"
            >
              {t("nav.book")}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
