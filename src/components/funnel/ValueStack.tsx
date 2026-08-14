import { Check, Gift } from "lucide-react";

import { offers, valueStack } from "@/content/funnel";

export function ValueStack() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <h3 className="text-mal text-lg font-bold sm:text-xl">{valueStack.headline}</h3>
        <ul className="mt-5 divide-y divide-border">
          {valueStack.anchors.map((row) => (
            <li key={row.item} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span className="text-muted-foreground">{row.item}</span>
              <span className="shrink-0 font-bold">{row.price}</span>
            </li>
          ))}
        </ul>
        <p className="text-mal mt-4 text-xs text-muted-foreground sm:text-sm">
          {valueStack.anchorNote}
        </p>
      </div>

      <div className="rounded-3xl border border-primary/60 bg-gradient-card p-6 shadow-glow sm:p-8">
        <h3 className="text-mal text-lg font-bold sm:text-xl">{valueStack.includedHeadline}</h3>
        <ul className="mt-5 divide-y divide-border">
          {valueStack.included.map((row) => (
            <li key={row.item} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {row.item}
              </span>
              <span className="shrink-0 font-bold text-muted-foreground">{row.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              {valueStack.totalLabel}
            </p>
            <p className="text-xl font-bold text-muted-foreground line-through">
              {valueStack.total}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold tracking-wide text-primary uppercase">
              {valueStack.youPayLabel}
            </p>
            <p className="text-3xl font-extrabold sm:text-4xl">{offers.selfPaced.price}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{valueStack.paymentPlan}</p>
      </div>

      <div>
        <h3 className="text-mal text-lg font-bold sm:text-xl">{valueStack.bonusHeadline}</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {valueStack.bonuses.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <Gift className="h-5 w-5 text-primary" />
              <p className="text-mal mt-3 font-bold">{b.title}</p>
              <p className="text-mal mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
