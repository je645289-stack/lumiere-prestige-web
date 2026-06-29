"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { Product } from "@/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const [product, setProduct] = useState<Product | null>(null);
  const [provider, setProvider] = useState<"stripe" | "paypal" | "square">("stripe");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productId) {
      fetch(`/api/content/products`)
        .then((r) => r.json() as Promise<Product[]>)
        .then((products) => {
          const found = products.find((p) => p.id === productId);
          setProduct(found || null);
        });
    }
  }, [productId]);

  const handleCheckout = async () => {
    if (!product) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, provider }),
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (data.url) {
        window.location.href = data.url;
      } else if (data.message) {
        setMessage(data.message);
      } else {
        setMessage("Pagos no configurados aún. Contáctanos por WhatsApp para completar tu compra.");
      }
    } catch {
      setMessage("Error al procesar. Intenta de nuevo o contáctanos.");
    } finally {
      setLoading(false);
    }
  };

  if (!productId) {
    return (
      <Section className="pt-32 text-center">
        <p className="text-brand-muted">Selecciona un producto del catálogo para continuar.</p>
        <Button href="/catalogo" className="mt-4">Ver catálogo</Button>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section className="pt-32 text-center">
        <p className="text-brand-muted">Cargando producto...</p>
      </Section>
    );
  }

  return (
    <Section className="pt-32">
      <Link href="/catalogo" className="mb-8 inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold">
        <ArrowLeft className="h-4 w-4" /> Volver al catálogo
      </Link>

      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        {product.image ? (
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-lg border border-brand-border bg-brand-surface">
            <p className="font-display text-2xl font-bold text-brand-cream">{product.name}</p>
          </div>
        )}

        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cream">{product.name}</h1>
          <p className="mt-2 text-brand-muted">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-brand-gold">{product.price}</p>

          <div className="mt-8 rounded-lg border border-brand-border bg-brand-surface p-6">
            <div className="mb-4 flex items-center gap-2 text-brand-gold">
              <Lock className="h-5 w-5" />
              <span className="font-medium">Pago seguro</span>
            </div>

            <p className="mb-4 text-sm text-brand-muted">Selecciona método de pago:</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {(["stripe", "paypal", "square"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`rounded-lg px-4 py-2 text-sm capitalize transition-all ${
                    provider === p
                      ? "bg-brand-gold text-brand-dark font-medium"
                      : "border border-brand-border text-brand-muted hover:border-brand-gold"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <Button onClick={handleCheckout} disabled={loading} className="w-full">
              <CreditCard className="h-4 w-4" />
              {loading ? "Procesando..." : `Pagar con ${provider}`}
            </Button>

            {message && (
              <p className="mt-4 text-center text-sm text-brand-muted">{message}</p>
            )}

            <p className="mt-4 text-center text-xs text-brand-muted">
              Estructura preparada para Stripe, PayPal y Square. Activa las claves en .env para habilitar pagos reales.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Section className="pt-32 text-center"><p className="text-brand-muted">Cargando...</p></Section>}>
      <CheckoutContent />
    </Suspense>
  );
}
