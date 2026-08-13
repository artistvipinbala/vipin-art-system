import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-b border-border/60 px-5 py-14 sm:px-8 sm:py-20",
        tone === "surface" && "bg-surface",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-mal text-2xl leading-snug font-bold text-foreground sm:text-3xl md:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-mal mt-4 text-base text-muted-foreground sm:text-lg", className)}>
      {children}
    </p>
  );
}
