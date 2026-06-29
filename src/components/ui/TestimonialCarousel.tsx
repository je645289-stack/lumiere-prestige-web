"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Testimonial } from "@/types";
import { useLanguage } from "@/lib/i18n";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const { l } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((tItem, i) => (
        <motion.div
          key={tItem.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
          className="glow-hover relative flex flex-col rounded-xl border border-brand-border bg-brand-surface p-6"
        >
          <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-red/20" />
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`h-4 w-4 ${
                  idx < tItem.rating ? "fill-brand-red text-brand-red" : "text-brand-border"
                }`}
              />
            ))}
          </div>
          <p className="mb-6 flex-1 italic leading-relaxed text-brand-cream/90">
            &ldquo;{l(tItem.comment)}&rdquo;
          </p>
          <div className="flex items-center gap-3 border-t border-brand-border pt-4">
            {tItem.photo && (
              <Image
                src={tItem.photo}
                alt={tItem.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-red/30"
              />
            )}
            <div>
              <p className="font-heading font-semibold text-brand-cream">{tItem.name}</p>
              <p className="text-sm text-brand-red">{tItem.service}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
