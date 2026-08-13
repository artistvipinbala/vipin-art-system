import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "whatsapp";

export function CTAButton({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex w-full min-h-13 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base",
        variant === "primary" &&
          "bg-gradient-gold text-primary-foreground shadow-glow hover:brightness-110 active:scale-[0.99]",
        variant === "outline" &&
          "border border-border bg-card/60 text-foreground hover:border-primary hover:text-primary",
        variant === "whatsapp" &&
          "bg-accent text-accent-foreground shadow-glow hover:brightness-110",
        className,
      )}
    >

      {children}
    </button>
  );
}
