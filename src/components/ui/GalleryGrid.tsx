"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { l, t } = useLanguage();
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [active, setActive] = useState<string>("__all");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const filtered =
    active === "__all" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {[{ key: "__all", label: t("gallery.all") }, ...categories.map((c) => ({ key: c, label: c }))].map(
          (cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                active === cat.key
                  ? "bg-brand-red font-medium text-white"
                  : "border border-brand-border text-brand-muted hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {cat.label}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-brand-border"
          >
            <Image
              src={item.image}
              alt={l(item.alt)}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 rounded bg-brand-red/90 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-brand-surface p-2 text-brand-cream hover:text-brand-red"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.image}
              alt={l(lightbox.alt)}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-brand-muted">{l(lightbox.alt)}</p>
          </div>
        </div>
      )}
    </>
  );
}
