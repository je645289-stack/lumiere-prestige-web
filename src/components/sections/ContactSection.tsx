"use client";

import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Service, SiteConfig } from "@/types";
import { resolveContact } from "@/data/contact";
import { getDefaultWhatsAppLink, getPhoneLink, getWhatsAppLink, externalLinkProps } from "@/lib/utils";

const YEAR_OPTIONS = Array.from({ length: 35 }, (_, i) => 2026 - i);

export function ContactSection({
  config,
  services,
}: {
  config: SiteConfig;
  services: Service[];
}) {
  const { locale, t } = useLanguage();
  const contact = config.contact;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    service: "",
    date: "",
    message: "",
  });

  const serviceOptions = useMemo(() => {
    const names = services.map((s) => s.name);
    return [...names, t("contact.otherService")];
  }, [services, t]);

  const buildWhatsAppMessage = () => {
    const isEs = locale === "es";
    const lines = [
      t("contact.formIntro"),
      "",
      `${isEs ? "Nombre" : "Name"}: ${form.name}`,
      `${isEs ? "Teléfono" : "Phone"}: ${form.phone}`,
      `${isEs ? "Email" : "Email"}: ${form.email}`,
      `${isEs ? "Vehículo" : "Vehicle"}: ${form.year} ${form.make} ${form.model}`,
      `${isEs ? "Servicio" : "Service"}: ${form.service}`,
      form.date
        ? `${isEs ? "Fecha preferida" : "Preferred Date"}: ${form.date}`
        : "",
      form.message ? `${isEs ? "Mensaje" : "Message"}: ${form.message}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppLink(buildWhatsAppMessage(), contact);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contactCards = [
    {
      icon: MessageCircle,
      label: t("contact.whatsappCard"),
      action: t("contact.whatsappAction"),
      href: getDefaultWhatsAppLink(contact),
      external: false,
    },
    {
      icon: Phone,
      label: t("contact.callCard"),
      action: t("contact.callAction"),
      href: getPhoneLink(contact),
      external: false,
    },
    {
      icon: Mail,
      label: t("contact.emailCard"),
      action: t("contact.emailAction"),
      href: `mailto:${config.contact.email}`,
      external: false,
    },
    {
      icon: Instagram,
      label: t("contact.instagramCard"),
      action: t("contact.instagramAction"),
      href: config.social.instagram,
      external: true,
    },
  ];

  return (
    <>
      <Section id="contacto" className="bg-brand-light">
        <SectionHeader
          label={t("contact.quoteLabel")}
          title={config.cta.title}
          subtitle={config.cta.subtitle}
          light
        />

        <form onSubmit={handleWhatsAppSubmit} className="mx-auto max-w-2xl space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
              {t("contact.fullName")}
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
              placeholder={locale === "es" ? "Juan Pérez" : "John Smith"}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {t("contact.phone")}
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
                placeholder={resolveContact(contact).phoneDisplay}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {t("contact.email")}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
              {t("contact.vehicleInfo")}
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                required
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
                placeholder={t("contact.make")}
              />
              <input
                required
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
                placeholder={t("contact.model")}
              />
              <select
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
              >
                <option value="">{t("contact.year")}</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {t("contact.service")}
              </label>
              <select
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
              >
                <option value="">{t("contact.selectService")}</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {t("contact.preferredDate")}
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-field border-gray-300 bg-white text-brand-dark focus:border-brand-red"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-dark">
              {t("contact.message")}
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field resize-none border-gray-300 bg-white text-brand-dark focus:border-brand-red"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Send className="h-4 w-4" />
            {t("contact.sendWhatsApp")}
          </Button>

          <p className="text-center text-xs text-brand-light-muted">{t("contact.submitNote")}</p>
        </form>
      </Section>

      <Section id="cita" className="bg-brand-dark">
        <SectionHeader
          label={t("contact.touchLabel")}
          title={t("contact.bookTitle")}
          subtitle={t("contact.bookSubtitle")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : externalLinkProps(item.href))}
              className="group rounded border border-brand-border bg-brand-navy/50 p-6 text-center transition-all hover:border-brand-red/40 hover:bg-brand-navy"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-cream">
                {item.label}
              </h4>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-brand-red">
                {item.action}
                <ArrowRight className="h-3 w-3" />
              </p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
