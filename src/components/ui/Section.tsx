import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-16", className)}>
      <div className="mb-4 inline-block h-px w-12 bg-brand-gold" />
      <h2 className="font-display text-3xl font-bold tracking-tight text-brand-cream md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">{subtitle}</p>
      )}
    </div>
  );
}
