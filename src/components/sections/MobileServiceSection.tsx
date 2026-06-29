import { Truck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";

export function MobileServiceSection({ config }: { config: SiteConfig }) {
  const mobile = config.mobileService;
  if (!mobile) return null;

  return (
    <Section id="servicio-movil" className="border-y border-brand-border bg-brand-navy/50">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
          <Truck className="h-8 w-8" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-brand-cream md:text-4xl">
          {mobile.title}
        </h2>
        <div className="section-accent-line" />
        <p className="mt-4 text-brand-muted leading-relaxed">{mobile.description}</p>
        <div className="mt-8">
          <Button href={mobile.buttonHref} size="lg">
            {mobile.buttonText}
          </Button>
        </div>
      </div>
    </Section>
  );
}
