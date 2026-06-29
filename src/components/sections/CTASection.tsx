import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { getDefaultWhatsAppLink, resolveContactHref } from "@/lib/utils";

export function CTASection({ config }: { config: SiteConfig }) {
  const { cta } = config;
  const contact = config.contact;
  const primaryHref = resolveContactHref(cta.primaryButton.href, contact);
  const secondaryHref = resolveContactHref(cta.secondaryButton.href, contact);

  return (
    <Section id="cta-final" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 via-brand-gold/5 to-transparent" />
      <div className="relative rounded-2xl border border-brand-gold/20 bg-brand-surface p-10 text-center md:p-16">
        <h2 className="font-display text-3xl font-bold text-brand-cream md:text-4xl lg:text-5xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">{cta.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={primaryHref} size="lg">
            {cta.primaryButton.text}
          </Button>
          <Button href={secondaryHref} variant="secondary" size="lg">
            {cta.secondaryButton.text}
          </Button>
        </div>
        <p className="mt-8 text-sm text-brand-muted">
          {config.support.trainingDescription} · {config.support.supportDays} días de soporte ·{" "}
          {config.support.changeRounds} rondas de cambios incluidas
        </p>
      </div>
    </Section>
  );
}
