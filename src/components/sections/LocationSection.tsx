import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink } from "@/lib/utils";

export function LocationSection({ config }: { config: SiteConfig }) {
  return (
    <Section id="ubicacion" className="bg-brand-surface/50">
      <SectionHeader
        title="Ubicación"
        subtitle={`Visítanos en ${config.contact.city}`}
      />

      <div className="overflow-hidden rounded-lg border border-brand-border">
        <iframe
          src={config.contact.mapEmbedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${config.businessName}`}
          className="w-full"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button
          href={`https://www.google.com/maps/search/?api=1&query=${config.contact.mapLat},${config.contact.mapLng}`}
          variant="secondary"
        >
          Abrir en Google Maps
        </Button>
        <Button
          href={getWhatsAppLink(
            config.contact.whatsapp,
            `Hola, necesito indicaciones para llegar a ${config.businessName}`
          )}
          variant="outline"
        >
          Pedir indicaciones por WhatsApp
        </Button>
      </div>
    </Section>
  );
}
