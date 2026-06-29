import type { ContentType } from "@/types";

import siteConfig from "../../../data/site-config.json";
import sections from "../../../data/sections.json";
import services from "../../../data/services.json";
import products from "../../../data/products.json";
import testimonials from "../../../data/testimonials.json";
import faqs from "../../../data/faqs.json";
import blogPosts from "../../../data/blog-posts.json";
import gallery from "../../../data/gallery.json";
import benefits from "../../../data/benefits.json";
import processSteps from "../../../data/process-steps.json";
import categories from "../../../data/categories.json";

export const FILE_MAP: Record<ContentType, string> = {
  "site-config": "site-config.json",
  sections: "sections.json",
  services: "services.json",
  products: "products.json",
  testimonials: "testimonials.json",
  faqs: "faqs.json",
  "blog-posts": "blog-posts.json",
  gallery: "gallery.json",
  benefits: "benefits.json",
  "process-steps": "process-steps.json",
  categories: "categories.json",
};

/** KV key prefix for CMS content blobs */
export function kvKey(type: ContentType): string {
  return `cms:${type}`;
}

export const DEFAULTS: Record<ContentType, unknown> = {
  "site-config": siteConfig,
  sections,
  services,
  products,
  testimonials,
  faqs,
  "blog-posts": blogPosts,
  gallery,
  benefits,
  "process-steps": processSteps,
  categories,
};

export function getDefault<T>(type: ContentType): T {
  return structuredClone(DEFAULTS[type]) as T;
}
