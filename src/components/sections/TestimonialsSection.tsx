"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();
  const hasReviews = testimonials.length > 0;

  return (
    <Section id="testimonios" className="bg-brand-light">
      <SectionHeader
        label={t("testimonials.label")}
        title={t("testimonials.title")}
        light
      />

      {hasReviews ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="text-brand-red">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-brand-light-muted italic">
                &ldquo;{item.comment}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-dark">{item.name}</p>
              {item.service && (
                <p className="text-xs text-brand-light-muted">{item.service}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md text-center">
          <p className="text-brand-light-muted">{t("testimonials.empty")}</p>
          <div className="mt-6">
            <Button href="#contacto">{t("testimonials.writeReview")}</Button>
          </div>
        </div>
      )}
    </Section>
  );
}
