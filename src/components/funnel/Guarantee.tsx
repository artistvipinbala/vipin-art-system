import { ShieldCheck, X } from "lucide-react";

import { guarantee, intake } from "@/content/funnel";

export function Guarantee() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-accent/50 bg-accent/10 p-6 sm:p-8">
        <ShieldCheck className="h-6 w-6 text-accent" />
        <h3 className="text-mal mt-3 text-lg font-bold sm:text-xl">{guarantee.headline}</h3>
        <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">
          {guarantee.body}
        </p>
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <h3 className="text-mal text-lg font-bold sm:text-xl">{guarantee.honest.title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {guarantee.honest.points.map((p) => (
            <li key={p} className="text-mal flex gap-2">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-mal mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
          {"\n"}
        </p>
      </div>
    </div>
  );
}
