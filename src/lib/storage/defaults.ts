/**
 * Default content bundled with the worker. These JSON files seed the site the
 * first time it runs against an empty Cloudflare KV namespace (production cold
 * start) and act as the source of truth for local development.
 */
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

export const DEFAULT_CONTENT: Record<ContentType, unknown> = {
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

export function getDefaultContent<T>(type: ContentType): T {
  return DEFAULT_CONTENT[type] as T;
}
