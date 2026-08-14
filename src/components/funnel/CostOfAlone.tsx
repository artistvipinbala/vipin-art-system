import { ArrowRight, Check, X } from "lucide-react";

import { Lead, Section, SectionHeading } from "./Section";
import { costOfAlone } from "@/content/funnel";

export function CostOfAlone() {
  return (
    <Section tone="surface">
      <SectionHeading>{costOfAlone.headline}</SectionHeading>
      <Lead>{costOfAlone.text}</Lead>

      <ul className="mt-6 space-y-2">
        {costOfAlone.items.map((item) => (
          <li key={item} className="text-mal flex gap-3 text-sm sm:text-base">
            <X className="mt-1 h-4 w-4 shrink-0 text-destructive/70" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-mal text-sm font-bold tracking-wide text-muted-foreground uppercase">
            {costOfAlone.slow.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {costOfAlone.slow.points.map((p) => (
              <li key={p} className="text-mal flex gap-2">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-primary/70 bg-gradient-card p-6 shadow-glow">
          <p className="text-mal text-sm font-bold tracking-wide text-primary uppercase">
            {costOfAlone.fast.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {costOfAlone.fast.points.map((p) => (
              <li key={p} className="text-mal flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-mal mt-6 flex gap-3 text-sm text-muted-foreground sm:text-base">
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
        {costOfAlone.closing}
      </p>
    </Section>
  );
}
