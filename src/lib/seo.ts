import type { SiteConfig } from "@/types";
import { getSiteUrl } from "./utils";

export function buildLocalBusinessSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": config.seo.localBusiness.type,
    name: config.seo.localBusiness.name,
    description: config.seo.description,
    url: getSiteUrl(),
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.address,
      addressLocality: config.contact.city,
      addressCountry: config.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.contact.mapLat,
      longitude: config.contact.mapLng,
    },
    areaServed: config.seo.localBusiness.areaServed,
    image: config.seo.ogImage,
  };
}

export function buildMetadata(config: SiteConfig, page?: {
  title?: string;
  description?: string;
  path?: string;
}) {
  const title = page?.title
    ? `${page.title} | ${config.businessName}`
    : config.seo.title;
  const description = page?.description || config.seo.description;
  const url = `${getSiteUrl()}${page?.path || ""}`;

  return {
    title,
    description,
    keywords: config.seo.keywords.join(", "),
    openGraph: {
      title,
      description,
      url,
      siteName: config.businessName,
      images: [{ url: config.seo.ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      alternateLocale: ["es_ES"],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [config.seo.ogImage],
    },
    alternates: { canonical: url },
  };
}
