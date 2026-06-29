/**
 * Bilingual string. Content authored through the CMS can be either a plain
 * string (shown in both languages) or an object with English/Spanish variants.
 * Use `localize()` from `@/lib/i18n` to resolve it for the active language.
 */
export type LocalizedString = string | { en: string; es: string };

export interface SiteConfig {
  businessName: string;
  tagline: LocalizedString;
  logo: string;
  hero: {
    badge: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    description: LocalizedString;
    primaryButton: { text: LocalizedString; href: string };
    secondaryButton: { text: LocalizedString; href: string };
    image: string;
    imageAlt: LocalizedString;
  };
  about: {
    title: LocalizedString;
    subtitle: LocalizedString;
    story: LocalizedString;
    experience: LocalizedString;
    mission: LocalizedString;
    trustReasons: LocalizedString[];
    image: string;
    imageAlt: LocalizedString;
    stats: { label: LocalizedString; value: string }[];
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
    schedule: { day: LocalizedString; hours: string }[];
    mapEmbedUrl: string;
    mapLat: number;
    mapLng: number;
  };
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    linkedin: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    localBusiness: {
      name: string;
      type: string;
      areaServed: string;
    };
  };
  integrations: {
    chatProvider: string;
    chatWidgetId: string;
    aiAssistantEnabled: boolean;
    paymentsEnabled: boolean;
    defaultPaymentProvider: "stripe" | "paypal" | "square";
    gaId: string;
    fbPixelId: string;
    calendlyUrl: string;
    instagramToken: string;
  };
  cta: {
    title: LocalizedString;
    subtitle: LocalizedString;
    primaryButton: { text: LocalizedString; href: string };
    secondaryButton: { text: LocalizedString; href: string };
  };
  theme: {
    accentColor: string;
  };
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface Service {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  icon: string;
  enabled: boolean;
  order: number;
  category: string;
}

/** Reused as "Promotions" in the public site (no prices are displayed). */
export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  /** Promo badge text, e.g. "20% OFF". */
  badge: string;
  category: string;
  enabled: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  comment: LocalizedString;
  rating: number;
  service: string;
  enabled: boolean;
  order: number;
}

export interface FAQ {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  enabled: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  enabled: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: LocalizedString;
  category: string;
  order: number;
  enabled: boolean;
}

export interface Benefit {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  type: "product" | "service" | "blog" | "gallery";
}

export type ContentType =
  | "site-config"
  | "sections"
  | "services"
  | "products"
  | "testimonials"
  | "faqs"
  | "blog-posts"
  | "gallery"
  | "benefits"
  | "process-steps"
  | "categories";
