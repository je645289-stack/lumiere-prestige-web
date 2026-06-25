import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Service, SiteConfig } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-6 w-6" /> : <Icons.Star className="h-6 w-6" />;
}

export function ServicesSection({
  services,
  config,
}: {
  services: Service[];
  config: SiteConfig;
}) {
  return (
    <Section id="servicios">
      <SectionHeader
        title="Nuestros Servicios"
        subtitle="Experiencias premium diseñadas para superar tus expectativas"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="mb-2 flex items-center gap-2 text-brand-gold">
              {getIcon(service.icon)}
              <span className="text-xs uppercase tracking-wider">{service.category}</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-brand-cream">
              {service.name}
            </h3>
            <p className="mt-2 flex-1 text-sm text-brand-muted leading-relaxed">
              {service.description}
            </p>
            {service.price && (
              <p className="mt-3 font-semibold text-brand-gold">{service.price}</p>
            )}
            <div className="mt-4 flex gap-2">
              <Button
                href={getWhatsAppLink(
                  config.contact.whatsapp,
                  `Hola, me interesa el servicio: ${service.name}`
                )}
                size="sm"
                className="flex-1"
              >
                Reservar
              </Button>
              <Button href="#contacto" variant="outline" size="sm" className="flex-1">
                Cotizar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/servicios" variant="secondary">
          Ver todos los servicios
        </Button>
      </div>
    </Section>
  );
}
