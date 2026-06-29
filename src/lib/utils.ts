import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { contactInfo, resolveContact, type ContactFields } from "@/data/contact";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(dateStr: string, locale = "es-MX"): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** WhatsApp chat URL — uses CMS contact when provided. */
export function getWhatsAppLink(
  message: string = contactInfo.whatsappMessage,
  contact?: ContactFields
): string {
  const c = resolveContact(contact);
  return `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Default WhatsApp URL with the standard pre-filled message. */
export function getDefaultWhatsAppLink(contact?: ContactFields): string {
  return getWhatsAppLink(contactInfo.whatsappMessage, contact);
}

/** Phone dial URL — uses CMS contact when provided. */
export function getPhoneLink(contact?: ContactFields): string {
  const c = resolveContact(contact);
  return `tel:${c.phone}`;
}

/** Resolves magic href tokens from site config (`whatsapp`, `phone`, `tel`). */
export function resolveContactHref(href: string, contact?: ContactFields): string {
  if (href === "whatsapp") return getDefaultWhatsAppLink(contact);
  if (href === "phone" || href === "tel" || href.startsWith("tel:")) return getPhoneLink(contact);
  return href;
}

export function isWhatsAppHref(href: string): boolean {
  return href.includes("wa.me/") || href.includes("api.whatsapp.com/");
}

export function externalLinkProps(href: string): { target?: string; rel?: string } {
  if (isWhatsAppHref(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
