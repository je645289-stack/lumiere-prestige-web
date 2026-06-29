"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Service, SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function ContactSection({
  config,
  services,
}: {
  config: SiteConfig;
  services: Service[];
}) {
  const { l, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass =
    "w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:border-brand-red focus:outline-none";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "quote" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", vehicle: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contacto">
      <SectionHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-brand-muted">
                {t("contact.name")} *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-brand-muted">
                  {t("contact.phone")} *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="475-689-8301"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-brand-muted">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-brand-muted">
                  {t("contact.vehicle")}
                </label>
                <input
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  className={inputClass}
                  placeholder={t("contact.vehiclePlaceholder")}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-brand-muted">
                  {t("contact.service")}
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={inputClass}
                >
                  <option value="">{t("contact.selectService")}</option>
                  {services.map((s) => (
                    <option key={s.id} value={l(s.name)}>
                      {l(s.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-brand-muted">
                {t("contact.message")}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full uppercase tracking-wide">
              <Send className="h-4 w-4" />
              {status === "loading" ? t("contact.sending") : t("contact.submit")}
            </Button>

            {status === "success" && (
              <p className="text-center text-sm text-green-400">{t("contact.success")}</p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400">{t("contact.error")}</p>
            )}
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={getWhatsAppLink(config.contact.whatsapp)} variant="secondary" size="sm">
              <MessageCircle className="h-4 w-4" /> {t("cta.whatsapp")}
            </Button>
            <Button href={getPhoneLink(config.contact.phone)} variant="outline" size="sm">
              <Phone className="h-4 w-4" /> {t("cta.call")}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              icon: MapPin,
              label: t("contact.address"),
              value: `${config.contact.address}, ${config.contact.city}`,
              href: `https://www.google.com/maps/search/?api=1&query=${config.contact.mapLat},${config.contact.mapLng}`,
            },
            {
              icon: Phone,
              label: t("contact.phone"),
              value: config.contact.phone,
              href: getPhoneLink(config.contact.phone),
            },
            {
              icon: Mail,
              label: t("contact.email"),
              value: config.contact.email,
              href: `mailto:${config.contact.email}`,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-brand-muted">{item.label}</p>
                <a href={item.href} className="text-brand-cream transition-colors hover:text-brand-red">
                  {item.value}
                </a>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-brand-muted">{t("contact.hours")}</p>
              {config.contact.schedule.map((s, i) => (
                <p key={i} className="text-sm text-brand-cream">
                  <span className="text-brand-muted">{l(s.day)}:</span> {s.hours}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-brand-muted">{t("contact.follow")}</p>
            <div className="flex gap-4">
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-red">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-red">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-brand-border">
            <iframe
              src={config.contact.mapEmbedUrl}
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${config.businessName}`}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
