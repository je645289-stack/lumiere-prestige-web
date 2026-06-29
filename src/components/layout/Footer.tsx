"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Service, SiteConfig } from "@/types";
import { resolveContact } from "@/data/contact";
import { getDefaultWhatsAppLink, getPhoneLink, externalLinkProps } from "@/lib/utils";
import { useMergedConfig } from "@/lib/use-cms-content";

export function Footer({
  config: serverConfig,
  services = [],
}: {
  config: SiteConfig;
  services?: Service[];
}) {
  const { tf } = useLanguage();
  const config = useMergedConfig(serverConfig);
  const currentYear = new Date().getFullYear();
  const serviceLinks = services.slice(0, 7);
  const contact = config.contact;
  const resolved = resolveContact(contact);
  const whatsappUrl = getDefaultWhatsAppLink(contact);

  return (
    <footer className="border-t border-brand-border bg-brand-darker">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              {config.tagline}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold text-brand-cream">
              {tf("footer.tagline")}
            </h3>
            <p className="mt-3 text-sm text-brand-muted leading-relaxed">
              {tf("footer.serving", { city: config.contact.city })}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-cream">
              {tf("footer.contact")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappUrl}
                  {...externalLinkProps(whatsappUrl)}
                  className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-red"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={getPhoneLink(contact)}
                  className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-red"
                >
                  <Phone className="h-4 w-4" /> {resolved.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-red"
                >
                  <Mail className="h-4 w-4" /> {config.contact.email}
                </a>
              </li>
              {config.social.instagram && (
                <li>
                  <a
                    href={config.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-red"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-cream">
              {tf("footer.services")}
            </h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicios"
                    className="text-brand-muted transition-colors hover:text-brand-red"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-cream">
              {tf("footer.hours")}
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              {config.contact.schedule.map((s) => (
                <li key={s.day}>
                  <span className="text-brand-cream">{s.day}:</span> {s.hours}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 md:flex-row">
          <p className="text-sm text-brand-muted">
            &copy; {currentYear} {config.businessName}. {tf("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-brand-muted hover:text-brand-red transition-colors">
              {tf("footer.privacy")}
            </a>
            <a href="#" className="text-brand-muted hover:text-brand-red transition-colors">
              {tf("footer.terms")}
            </a>
            <Link href="/admin" className="text-brand-muted hover:text-brand-red transition-colors">
              {tf("footer.admin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
