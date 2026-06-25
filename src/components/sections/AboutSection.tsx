import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { SiteConfig } from "@/types";

export function AboutSection({ config }: { config: SiteConfig }) {
  const { about } = config;

  return (
    <Section id="sobre-nosotros" className="bg-brand-surface/50">
      <SectionHeader title={about.title} subtitle={about.subtitle} />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brand-gold">Nuestra historia</h3>
            <p className="text-brand-muted leading-relaxed">{about.story}</p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brand-gold">Experiencia</h3>
            <p className="text-brand-muted leading-relaxed">{about.experience}</p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brand-gold">Misión</h3>
            <p className="text-brand-muted leading-relaxed">{about.mission}</p>
          </div>

          <div>
            <h3 className="mb-3 font-display text-xl font-semibold text-brand-gold">
              ¿Por qué confiar en nosotros?
            </h3>
            <ul className="space-y-2">
              {about.trustReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-brand-muted">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {about.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-brand-border bg-brand-dark p-6 text-center"
          >
            <p className="font-display text-3xl font-bold text-brand-gold md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
