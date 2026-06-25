import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export function Footer({ config }: { config: SiteConfig }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-darker">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-xl font-bold text-brand-cream">
              {config.businessName}
            </h3>
            <p className="mt-3 text-sm text-brand-muted leading-relaxed">
              {config.tagline}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={config.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={getWhatsAppLink(config.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-brand-cream">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#servicios", label: "Servicios" },
                { href: "#catalogo", label: "Catálogo" },
                { href: "#galeria", label: "Galería" },
                { href: "#blog", label: "Blog" },
                { href: "#faq", label: "FAQ" },
                { href: "#contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-brand-muted hover:text-brand-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-brand-cream">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-brand-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                {config.contact.address}, {config.contact.city}
              </li>
              <li>
                <a
                  href={getPhoneLink(config.contact.phone)}
                  className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-gold" />
                  {config.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-gold" />
                  {config.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-brand-cream">Horario</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              {config.contact.schedule.map((s) => (
                <li key={s.day}>
                  <span className="text-brand-cream">{s.day}:</span> {s.hours}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-4">
              <p className="text-xs text-brand-muted">
                Incluye {config.support.supportDays} días de soporte,{" "}
                {config.support.changeRounds} rondas de cambios y capacitación personalizada.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 md:flex-row">
          <p className="text-sm text-brand-muted">
            &copy; {currentYear} {config.businessName}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/admin" className="text-brand-muted hover:text-brand-gold transition-colors">
              Panel Admin
            </Link>
            <a href="#inicio" className="text-brand-muted hover:text-brand-gold transition-colors">
              Volver arriba
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
