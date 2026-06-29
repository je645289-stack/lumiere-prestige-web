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
import { getDefaultWhatsAppLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return buildMetadata(config, {
    title: "Servicios",
    description: "Conoce todos nuestros servicios premium en " + config.businessName,
    path: "/servicios",
  });
}

export default async function ServiciosPage() {
  const data = await getSiteData();
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
            Todos nuestros servicios
          </h1>
          <p className="mt-4 max-w-2xl text-brand-muted">
            Explora nuestra gama completa de servicios premium diseñados para ti.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {data.services.map((service) => (
              <Card key={service.id} className="overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image src={service.image} alt={service.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-brand-gold">{service.category}</span>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-brand-cream">{service.name}</h2>
                  <p className="mt-3 text-brand-muted leading-relaxed">{service.description}</p>
                  {service.price && <p className="mt-3 font-semibold text-brand-gold">{service.price}</p>}
                  <div className="mt-4 flex gap-2">
                    <Button href={getDefaultWhatsAppLink(contact)} size="sm">
                      Reservar
                    </Button>
                    <Button href={getDefaultWhatsAppLink(contact)} variant="outline" size="sm">
                      Cotizar
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
