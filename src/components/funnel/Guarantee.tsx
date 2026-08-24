import { X } from "lucide-react";

import { guarantee } from "@/content/funnel";

export function Guarantee() {
  return (
    <div className="mx-auto max-w-2xl">
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
      </div>
    </div>
  );
}
