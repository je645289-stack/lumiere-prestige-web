import { Section, SectionHeader } from "@/components/ui/Section";
import type { ProcessStep } from "@/types";

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <Section id="proceso" className="bg-brand-surface/50">
      <SectionHeader
        title="Nuestro Proceso"
        subtitle="Un camino claro y profesional hacia resultados excepcionales"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-8 top-0 hidden h-full w-px bg-brand-gold/30 md:block" />

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="relative flex gap-6 md:gap-8">
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-dark font-display text-xl font-bold text-brand-gold">
                {step.step}
              </div>
              <div className="flex-1 rounded-lg border border-brand-border bg-brand-surface p-6">
                <h3 className="font-display text-xl font-semibold text-brand-cream">
                  {step.title}
                </h3>
                <p className="mt-2 text-brand-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
