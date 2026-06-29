"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/Section";
import type { SiteConfig } from "@/types";
import { useLanguage } from "@/lib/i18n";

function CountUp({ value, active }: { value: string; active: boolean }) {
  // Split into prefix / number / suffix, e.g. "1,000+" -> "" "1000" "+"
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const [display, setDisplay] = useState(match ? match[1] + "0" + match[3] : value);

  useEffect(() => {
    if (!active || !match) {
      if (!match) setDisplay(value);
      return;
    }
    const prefix = match[1];
    const numeric = parseFloat(match[2].replace(/,/g, ""));
    const suffix = match[3];
    const isFloat = match[2].includes(".");
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      const formatted = isFloat
        ? current.toFixed(1)
        : Math.round(current).toLocaleString("en-US");
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, match]);

  return <span>{display}</span>;
}

export function StatsSection({ config }: { config: SiteConfig }) {
  const { l, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="stats" className="relative overflow-hidden bg-brand-secondary">
      <div className="pointer-events-none absolute inset-0 bg-red-blue opacity-[0.06]" />
      <div className="relative mb-12 text-center">
        <h2 className="font-display text-3xl tracking-tight text-brand-cream md:text-4xl">
          {t("stats.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-muted">{t("stats.subtitle")}</p>
      </div>

      <div ref={ref} className="relative grid grid-cols-2 gap-6 md:grid-cols-4">
        {config.about.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glow-hover rounded-xl border border-brand-border bg-brand-surface p-6 text-center"
          >
            <p className="font-display text-4xl text-gradient md:text-5xl">
              <CountUp value={stat.value} active={inView} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-muted">
              {l(stat.label)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
