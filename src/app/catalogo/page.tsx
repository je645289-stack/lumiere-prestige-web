import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getDefaultWhatsAppLink, getPhoneLink } from "@/lib/utils";
import { isPaymentsEnabled } from "@/lib/payments";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return buildMetadata(config, {
    title: "Catálogo",
    description: "Catálogo completo de productos y experiencias premium de " + config.businessName,
    path: "/catalogo",
  });
}

export default async function CatalogoPage() {
  const data = await getSiteData();
  const paymentsOn = isPaymentsEnabled() || data.config.integrations.paymentsEnabled;
  const contact = data.config.contact;

  return (
    <>
      <Header config={data.config} sections={data.sections} />
      <main>
        <Section className="pt-32">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
          <h1 className="font-display text-4xl font-bold text-brand-cream md:text-5xl">
            Catálogo Premium
          </h1>
          <p className="mt-4 max-w-2xl text-brand-muted">
            Productos, membresías y experiencias exclusivas disponibles para ti.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <Card key={product.id} className="overflow-hidden p-0">
                {product.image && (
                  <div className="relative aspect-square">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="33vw" />
                    <span className="absolute left-3 top-3 rounded-full bg-brand-dark/80 px-3 py-1 text-xs text-brand-gold">
                      {product.category}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-brand-cream">{product.name}</h2>
                  <p className="mt-2 text-sm text-brand-muted">{product.description}</p>
                  <p className="mt-3 text-lg font-bold text-brand-gold">{product.price}</p>
                  <div className="mt-4 flex gap-2">
                    {paymentsOn ? (
                      <Button href={`/checkout?product=${product.id}`} size="sm" className="flex-1">
                        Comprar
                      </Button>
                    ) : (
                      <Button href={getDefaultWhatsAppLink(contact)} size="sm" className="flex-1">
                        Solicitar info
                      </Button>
                    )}
                    <Button href={getPhoneLink(contact)} variant="outline" size="sm" className="flex-1">
                      Contactar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      <Footer config={data.config} />
    </>
  );
}
