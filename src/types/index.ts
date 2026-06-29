export interface SiteConfig {
  businessName: string;
  tagline: string;
  logo: string;
  hero: {
    badge?: string;
    title: string;
    titleAccent?: string;
    subtitle: string;
    description: string;
    primaryButton: { text: string; href: string };
    secondaryButton: { text: string; href: string };
    tertiaryButton?: { text: string; href: string };
    /** Background video from /public, e.g. /videos/hero-video.mp4 */
    video?: string;
    /** Poster while video loads; falls back to image */
    videoPoster?: string;
    image: string;
    imageAlt: string;
  };
  promotions?: {
    label: string;
    title: string;
    offers: string[];
    buttonText: string;
    buttonHref: string;
  };
  mobileService?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  about: {
    label?: string;
    title: string;
    subtitle: string;
    story: string;
    experience?: string;
    mission?: string;
    trustReasons?: string[];
    image: string;
    imageAlt: string;
    stats: { label: string; value: string }[];
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
    schedule: { day: string; hours: string }[];
    mapEmbedUrl: string;
    mapLat: number;
    mapLng: number;
    serviceArea?: string;
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
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButton: { text: string; href: string };
    secondaryButton: { text: string; href: string };
  };
  support: {
    supportDays: number;
    changeRounds: number;
    trainingIncluded: boolean;
    trainingDescription: string;
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
  name: string;
  description: string;
  image: string;
  icon: string;
  price?: string;
  enabled: boolean;
  order: number;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: string;
  priceLabel?: string;
  features?: string[];
  category: string;
  enabled: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  comment: string;
  rating: number;
  service: string;
  enabled: boolean;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
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
  beforeImage?: string;
  afterImage?: string;
  alt: string;
  description?: string;
  category: string;
  order: number;
  enabled: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
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
