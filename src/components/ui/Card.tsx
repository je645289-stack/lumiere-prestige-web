import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-brand-border bg-brand-surface p-6",
        hover && "transition-all duration-300 hover:border-brand-red/30 hover:shadow-lg hover:shadow-brand-red/5",
        className
      )}
    >
      {children}
    </div>
  );
}
