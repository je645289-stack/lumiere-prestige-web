import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { SiteConfig } from "@/types";

export function AboutSection({ config }: { config: SiteConfig }) {
  const { about } = config;

  return (
    <Section id="sobre-nosotros" className="bg-brand-light">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <SectionHeader
            label={about.label || "About Us"}
            title={about.title}
            centered={false}
            light
            className="mb-8"
          />

          <p className="text-brand-light-muted leading-relaxed">{about.story}</p>
          {about.experience && (
            <p className="mt-4 text-brand-light-muted leading-relaxed">{about.experience}</p>
          )}

          <div className="mt-10 grid grid-cols-2 gap-6">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-display text-4xl font-bold text-brand-dark md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-light-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
