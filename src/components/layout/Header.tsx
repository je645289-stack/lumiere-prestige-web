"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { SiteConfig, SectionConfig } from "@/types";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#galeria", label: "Galería" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
];

export function Header({
  config,
  sections,
}: {
  config: SiteConfig;
  sections: SectionConfig[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleLinks = navLinks.filter((link) => {
    const sectionId = link.href.replace("#", "").replace("sobre-nosotros", "about").replace("catalogo", "catalog");
    const map: Record<string, string> = {
      inicio: "hero",
      "sobre-nosotros": "about",
      servicios: "services",
      catalogo: "catalog",
      galeria: "gallery",
      blog: "blog",
      contacto: "contact",
    };
    return sections.some((s) => s.id === map[sectionId.replace("#", "")] || s.id === sectionId);
  });

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#inicio" className="group">
          <span className="font-display text-xl font-bold text-brand-cream md:text-2xl">
            {config.businessName.split(" ")[0]}{" "}
            <span className="text-brand-gold">{config.businessName.split(" ").slice(1).join(" ")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-brand-muted transition-colors hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contacto" size="sm">
            Reservar
          </Button>
        </nav>

        <button
          className="lg:hidden text-brand-cream"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-brand-border bg-brand-dark/98 px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {visibleLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-brand-cream hover:text-brand-gold"
              >
                {link.label}
              </a>
            ))}
            <Button href="#contacto" size="sm" className="mt-2">
              Reservar ahora
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
