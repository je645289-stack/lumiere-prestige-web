import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import type { Benefit } from "@/types";

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ? <Icon className="h-8 w-8" /> : <Icons.Star className="h-8 w-8" />;
}

export function BenefitsSection({ benefits }: { benefits: Benefit[] }) {
  return (
    <Section id="beneficios">
      <SectionHeader
        title="Beneficios Exclusivos"
        subtitle="Razones por las que miles de clientes eligen nuestra experiencia premium"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <Card key={benefit.id} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
              {getIcon(benefit.icon)}
            </div>
            <h3 className="font-display text-lg font-semibold text-brand-cream">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm text-brand-muted leading-relaxed">
              {benefit.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
