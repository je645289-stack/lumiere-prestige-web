import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const variants = {
  primary:
    "bg-brand-gold text-brand-dark hover:bg-brand-gold-light font-semibold shadow-lg shadow-brand-gold/20",
  secondary:
    "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold/10",
  outline:
    "bg-transparent border border-brand-border text-brand-cream hover:border-brand-gold hover:text-brand-gold",
  ghost: "bg-transparent text-brand-cream hover:text-brand-gold",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
