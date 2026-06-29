import type { Locale } from "@/i18n/types";
import {
  esBenefits,
  esFaqs,
  esGallery,
  esProcessSteps,
  esProducts,
  esServices,
} from "@/i18n/content-es";
import type { getSiteData } from "@/lib/site-data";

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;

export function localizeSiteData(data: SiteData, locale: Locale): SiteData {
  if (locale === "en") return data;

  // CMS config is the single source of truth — only translate list items by id.
  return {
    ...data,
    services: data.services.map((s) => {
      const t = esServices[s.id];
      return t ? { ...s, name: t.name, description: t.description } : s;
    }),
    products: data.products.map((p) => {
      const t = esProducts[p.id];
      if (!t) return p;
      return {
        ...p,
        ...(t.name ? { name: t.name } : {}),
        ...(t.priceLabel !== undefined ? { priceLabel: t.priceLabel } : {}),
        ...(t.price ? { price: t.price } : {}),
        ...(t.features ? { features: t.features } : {}),
      };
    }),
    faqs: data.faqs.map((f) => {
      const t = esFaqs[f.id];
      return t ? { ...f, question: t.question, answer: t.answer } : f;
    }),
    benefits: data.benefits.map((b) => {
      const t = esBenefits[b.id];
      return t ? { ...b, title: t.title } : b;
    }),
    processSteps: data.processSteps.map((step) => {
      const t = esProcessSteps[step.id];
      return t ? { ...step, title: t.title, description: t.description } : step;
    }),
    gallery: data.gallery.map((item) => {
      const t = esGallery[item.id];
      return t
        ? { ...item, category: t.category, description: t.description, alt: t.alt }
        : item;
    }),
  };
}
