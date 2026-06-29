"use client";

import { MapPin, Clock, Truck } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteConfig } from "@/types";

export function LocationSection({ config }: { config: SiteConfig }) {
  const { t, tf } = useLanguage();

  return (
    <Section id="ubicacion" className="bg-brand-light">
      <SectionHeader label={t("location.label")} title={t("location.title")} light />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-red/10 text-brand-red">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-light-muted">
                {t("location.address")}
              </p>
              <p className="mt-1 text-brand-dark">{config.contact.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${config.contact.mapLat},${config.contact.mapLng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-brand-red hover:underline"
              >
                {t("location.openMaps")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-red/10 text-brand-red">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-light-muted">
                {t("location.hours")}
              </p>
              {config.contact.schedule.map((s) => (
                <p key={s.day} className="mt-1 text-brand-dark">
                  {s.day}: {s.hours}
                </p>
              ))}
            </div>
          </div>

          {config.contact.serviceArea && (
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-light-muted">
                  {t("location.serviceArea")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-brand-light-muted">
                  {config.contact.serviceArea}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-sm border border-gray-200 shadow-lg">
          <iframe
            src={config.contact.mapEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={tf("location.mapTitle", { name: config.businessName })}
            className="w-full"
          />
        </div>
      </div>
    </Section>
  );
}
