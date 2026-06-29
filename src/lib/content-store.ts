import { getDefault } from "@/lib/storage/defaults";
import type {
  Benefit,
  BlogPost,
  ContentType,
  FAQ,
  GalleryItem,
  ProcessStep,
  Product,
  SectionConfig,
  Service,
  SiteConfig,
  Testimonial,
} from "@/types";
import type { SiteData } from "@/lib/localize-data";

/** Shared localStorage prefix — admin and public site use the same keys. */
export const CMS_CLIENT_PREFIX = "lumiere-cms:";

export const CMS_UPDATED_EVENT = "cms-content-saved";

export const CMS_BROADCAST_CHANNEL = "lumiere-cms-sync";

const TS_SUFFIX = ":updatedAt";

type ContentListener = () => void;

const contentListeners = new Set<ContentListener>();

function clientTimestampKey(type: ContentType): string {
  return `${clientStorageKey(type)}${TS_SUFFIX}`;
}

export function clientStorageKey(type: ContentType): string {
  return `${CMS_CLIENT_PREFIX}${type}`;
}

export function getDefaultContent<T>(type: ContentType): T {
  return getDefault<T>(type);
}

function emitContentChange(type: ContentType): void {
  contentListeners.forEach((listener) => listener());

  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: { type } }));

  try {
    new BroadcastChannel(CMS_BROADCAST_CHANNEL).postMessage({
      type: "admin-saved",
      contentType: type,
    });
  } catch {
    // BroadcastChannel unavailable
  }

  if (window.parent !== window) {
    window.parent.postMessage({ type: "admin-saved", contentType: type }, window.location.origin);
  }
}

/** Subscribe to CMS content changes (same tab, iframe, or other tabs). */
export function subscribeToContentStore(listener: ContentListener): () => void {
  contentListeners.add(listener);

  if (typeof window === "undefined") {
    return () => contentListeners.delete(listener);
  }

  const onWindowEvent = () => listener();
  const onMessage = (event: MessageEvent) => {
    if (event.data?.type === "admin-saved") listener();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith(CMS_CLIENT_PREFIX)) listener();
  };

  let channel: BroadcastChannel | null = null;
  const onBroadcast = (event: MessageEvent) => {
    if (event.data?.type === "admin-saved") listener();
  };

  window.addEventListener(CMS_UPDATED_EVENT, onWindowEvent);
  window.addEventListener("message", onMessage);
  window.addEventListener("storage", onStorage);

  try {
    channel = new BroadcastChannel(CMS_BROADCAST_CHANNEL);
    channel.addEventListener("message", onBroadcast);
  } catch {
    channel = null;
  }

  return () => {
    contentListeners.delete(listener);
    window.removeEventListener(CMS_UPDATED_EVENT, onWindowEvent);
    window.removeEventListener("message", onMessage);
    window.removeEventListener("storage", onStorage);
    channel?.removeEventListener("message", onBroadcast);
    channel?.close();
  };
}

export function saveToClientCache(type: ContentType, data: unknown): void {
  if (typeof window === "undefined") {
    throw new Error("Cannot save CMS content outside the browser");
  }

  const serialized = JSON.stringify(data);
  localStorage.setItem(clientStorageKey(type), serialized);
  localStorage.setItem(clientTimestampKey(type), Date.now().toString());

  const readBack = localStorage.getItem(clientStorageKey(type));
  if (readBack !== serialized) {
    throw new Error("No se pudo guardar en localStorage");
  }

  emitContentChange(type);
}

export function readFromClientCache<T>(type: ContentType): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(clientStorageKey(type));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function readContentOrDefault<T>(type: ContentType, fallback?: T): T {
  const cached = readFromClientCache<T>(type);
  if (cached !== null) return cached;
  if (fallback !== undefined) return fallback;
  return getDefaultContent<T>(type);
}

export function clearClientCache(type?: ContentType): void {
  if (typeof window === "undefined") return;
  if (type) {
    localStorage.removeItem(clientStorageKey(type));
    localStorage.removeItem(clientTimestampKey(type));
    emitContentChange(type);
    return;
  }
  Object.keys(localStorage)
    .filter((k) => k.startsWith(CMS_CLIENT_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
  emitContentChange("site-config");
}

export function notifyContentSaved(type: ContentType): void {
  emitContentChange(type);
}

function filterEnabled<T extends { enabled: boolean; order?: number }>(
  items: T[],
  sortByOrder = true
): T[] {
  const filtered = items.filter((item) => item.enabled);
  if (!sortByOrder) return filtered;
  return filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Merge localStorage CMS overrides over server-rendered defaults. Client only. */
export function mergeSiteDataFromStorage(serverData: SiteData): SiteData {
  if (typeof window === "undefined") return serverData;

  const config = readFromClientCache<SiteConfig>("site-config") ?? serverData.config;
  const sectionsRaw = readFromClientCache<SectionConfig[]>("sections");
  const servicesRaw = readFromClientCache<Service[]>("services");
  const productsRaw = readFromClientCache<Product[]>("products");
  const testimonialsRaw = readFromClientCache<Testimonial[]>("testimonials");
  const faqsRaw = readFromClientCache<FAQ[]>("faqs");
  const blogPostsRaw = readFromClientCache<BlogPost[]>("blog-posts");
  const galleryRaw = readFromClientCache<GalleryItem[]>("gallery");
  const benefitsRaw = readFromClientCache<Benefit[]>("benefits");
  const processStepsRaw = readFromClientCache<ProcessStep[]>("process-steps");

  return {
    config,
    sections: sectionsRaw ? filterEnabled(sectionsRaw) : serverData.sections,
    services: servicesRaw ? filterEnabled(servicesRaw) : serverData.services,
    products: productsRaw ? filterEnabled(productsRaw) : serverData.products,
    testimonials: testimonialsRaw ? filterEnabled(testimonialsRaw) : serverData.testimonials,
    faqs: faqsRaw ? filterEnabled(faqsRaw) : serverData.faqs,
    blogPosts: blogPostsRaw ? filterEnabled(blogPostsRaw, false) : serverData.blogPosts,
    gallery: galleryRaw ? filterEnabled(galleryRaw) : serverData.gallery,
    benefits: benefitsRaw ? filterEnabled(benefitsRaw) : serverData.benefits,
    processSteps: processStepsRaw ? filterEnabled(processStepsRaw) : serverData.processSteps,
  };
}

/** Load content for admin panels: localStorage first, then API seed. */
export async function loadAdminContent<T>(type: ContentType): Promise<T> {
  const cached = readFromClientCache<T>(type);
  if (cached !== null) return cached;

  const res = await fetch(`/api/content/${type}`, { credentials: "include" });
  if (!res.ok) {
    return getDefaultContent<T>(type);
  }

  const data = (await res.json()) as T;
  saveToClientCache(type, data);
  return data;
}

export type SaveContentResult = {
  localSaved: boolean;
  serverSynced: boolean;
};

/** Save to localStorage (primary) and sync to KV API when authenticated. */
export async function saveContent(
  type: ContentType,
  data: unknown
): Promise<SaveContentResult> {
  saveToClientCache(type, data);

  try {
    const res = await fetch(`/api/content/${type}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { localSaved: true, serverSynced: res.ok };
  } catch {
    return { localSaved: true, serverSynced: false };
  }
}

/** Restore defaults in localStorage and sync KV when possible. */
export async function resetContent(type: ContentType): Promise<void> {
  const defaults = getDefaultContent(type);
  saveToClientCache(type, defaults);

  try {
    await fetch(`/api/content/${type}`, { method: "DELETE", credentials: "include" });
  } catch {
    // local reset still applied
  }
}
