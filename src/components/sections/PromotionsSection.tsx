import { Tag } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";

export function PromotionsSection({ config }: { config: SiteConfig }) {
  const promotions = config.promotions;
  if (!promotions) return null;

  return (
    <Section
      id="promociones"
      className="bg-brand-dark bg-section-gradient"
    >
      <SectionHeader label={promotions.label} title={promotions.title} />

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.offers.map((offer) => (
          <div
            key={offer}
            className="rounded border border-brand-accent/30 bg-brand-navy/40 px-6 py-8 text-center backdrop-blur-sm transition-colors hover:border-brand-accent/60"
          >
            <p className="text-sm font-medium leading-relaxed text-brand-cream">{offer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href={promotions.buttonHref} size="lg">
          <Tag className="h-4 w-4" />
          {promotions.buttonText}
        </Button>
      </div>
    </Section>
  );
}
