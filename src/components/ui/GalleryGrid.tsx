"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-brand-dark/0 transition-colors group-hover:bg-brand-dark/40" />
            <span className="absolute bottom-2 left-2 rounded bg-brand-dark/70 px-2 py-1 text-xs text-brand-cream opacity-0 transition-opacity group-hover:opacity-100">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-brand-surface p-2 text-brand-cream hover:text-brand-gold"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-5xl">
            <Image
              src={lightbox.image}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-brand-muted">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
