import { Check, X } from "lucide-react";

import { eduCompare } from "@/content/funnel";

/** Traditional education (lakhs + years) vs starting today. */
export function EduCompare() {
  const normal = eduCompare.rows[0]!;
  const here = eduCompare.rows[1]!;

  return (
    <div>
      <h2 className="text-mal text-xl font-extrabold sm:text-2xl">{eduCompare.headline}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-mal text-sm font-bold tracking-wide text-muted-foreground uppercase">
            {normal.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {normal.points.map((p) => (
              <li key={p} className="text-mal flex gap-2">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-primary/70 bg-gradient-card p-6 shadow-glow">
          <p className="text-mal text-sm font-bold tracking-wide text-primary uppercase">
            {here.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {here.points.map((p) => (
              <li key={p} className="text-mal flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-mal mt-6 text-sm text-muted-foreground">{eduCompare.closing}</p>
    </div>
  );
}
