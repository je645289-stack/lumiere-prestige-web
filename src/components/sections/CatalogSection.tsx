"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Product, SiteConfig } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";
import { isPaymentsEnabled } from "@/lib/payments";

export function CatalogSection({
  products,
  config,
}: {
  products: Product[];
  config: SiteConfig;
}) {
  const categories = [...new Set(products.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const paymentsOn = isPaymentsEnabled() || config.integrations.paymentsEnabled;

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Section id="catalogo" className="bg-brand-surface/50">
      <SectionHeader
        title="Catálogo Premium"
        subtitle="Productos y experiencias exclusivas disponibles para ti"
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["Todos", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm transition-all ${
              activeCategory === cat
                ? "bg-brand-gold text-brand-dark font-medium"
                : "border border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <Card key={product.id} className="flex flex-col p-0 overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute left-3 top-3 rounded-full bg-brand-dark/80 px-3 py-1 text-xs text-brand-gold">
                {product.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-brand-cream">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-brand-muted">{product.description}</p>
              <p className="mt-3 text-lg font-bold text-brand-gold">{product.price}</p>
              <div className="mt-4 flex gap-2">
                {paymentsOn ? (
                  <Button href={`/checkout?product=${product.id}`} size="sm" className="flex-1">
                    Comprar
                  </Button>
                ) : (
                  <Button
                    href={getWhatsAppLink(
                      config.contact.whatsapp,
                      `Hola, me interesa: ${product.name} (${product.price})`
                    )}
                    size="sm"
                    className="flex-1"
                  >
                    Solicitar info
                  </Button>
                )}
                <Button href="#contacto" variant="outline" size="sm" className="flex-1">
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/catalogo" variant="secondary">
          Ver catálogo completo
        </Button>
      </div>
    </Section>
  );
}
