"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Card } from "./Card";
import type { Testimonial } from "@/types";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <Card key={t.id} className="flex flex-col">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < t.rating ? "fill-brand-gold text-brand-gold" : "text-brand-border"}`}
              />
            ))}
          </div>
          <p className="mb-6 flex-1 text-brand-muted leading-relaxed italic">
            &ldquo;{t.comment}&rdquo;
          </p>
          <div className="flex items-center gap-3 border-t border-brand-border pt-4">
            {t.photo && (
              <Image
                src={t.photo}
                alt={t.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-brand-cream">{t.name}</p>
              <p className="text-sm text-brand-gold">{t.service}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
