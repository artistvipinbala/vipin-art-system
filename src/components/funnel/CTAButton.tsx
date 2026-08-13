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
          "bg-primary text-primary-foreground shadow-soft hover:brightness-105 active:scale-[0.99]",
        variant === "outline" &&
          "border-2 border-border bg-card text-foreground hover:border-primary hover:text-primary",
        variant === "whatsapp" &&
          "bg-accent text-accent-foreground shadow-soft hover:brightness-105",
        className,
      )}
    >
      {children}
    </button>
  );
}
