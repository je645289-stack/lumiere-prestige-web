import { cn, externalLinkProps } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const variants = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark font-semibold uppercase tracking-wider shadow-lg shadow-brand-red/20",
  secondary:
    "bg-transparent border border-white/40 text-white hover:border-white hover:bg-white/10 font-semibold uppercase tracking-wider",
  outline:
    "bg-transparent border border-brand-border text-brand-cream hover:border-brand-red hover:text-brand-red",
  ghost: "bg-transparent text-brand-cream hover:text-brand-red",
  dark: "bg-brand-navy border border-brand-border text-brand-cream hover:border-brand-red hover:text-brand-red font-semibold uppercase tracking-wider text-sm",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50 disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes} {...externalLinkProps(href)}>
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
