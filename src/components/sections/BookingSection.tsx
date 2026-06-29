"use client";

import { useState } from "react";
import { CalendarCheck, Send } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Service, SiteConfig } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function BookingSection({
  config,
  services,
}: {
  config: SiteConfig;
  services: Service[];
}) {
  const { l, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    datetime: "",
    service: "",
    vehicle: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass =
    "w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-3 text-brand-cream placeholder:text-brand-muted focus:border-brand-red focus:outline-none";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: "booking",
          message: `Appointment request — Date/Time: ${form.datetime}, Vehicle: ${form.vehicle}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", datetime: "", service: "", vehicle: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="reservar" className="bg-brand-secondary">
      <SectionHeader title={t("booking.title")} subtitle={t("booking.subtitle")} />

      <div className="mx-auto max-w-2xl rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-brand-muted">{t("contact.name")} *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-brand-muted">{t("contact.phone")} *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="475-689-8301"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-brand-muted">{t("booking.datetime")} *</label>
            <input
              required
              type="datetime-local"
              value={form.datetime}
              onChange={(e) => setForm({ ...form, datetime: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-brand-muted">{t("contact.service")}</label>
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
            <div>
              <label className="mb-1 block text-sm text-brand-muted">{t("contact.vehicle")}</label>
              <input
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className={inputClass}
                placeholder={t("contact.vehiclePlaceholder")}
              />
            </div>
          </div>

          <Button type="submit" disabled={status === "loading"} className="w-full uppercase tracking-wide">
            <Send className="h-4 w-4" />
            {status === "loading" ? t("contact.sending") : t("booking.submit")}
          </Button>

          {status === "success" && (
            <p className="text-center text-sm text-green-400">{t("contact.success")}</p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-400">{t("contact.error")}</p>
          )}
        </form>

        {config.integrations.calendlyUrl && (
          <div className="mt-6 border-t border-brand-border pt-6 text-center">
            <p className="mb-3 text-sm text-brand-muted">{t("booking.calendly")}</p>
            <Button href={config.integrations.calendlyUrl} variant="secondary">
              <CalendarCheck className="h-4 w-4" /> Calendly
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
