import { Check, Gift } from "lucide-react";

import { bundle, offers, valueStack } from "@/content/funnel";

/** Bundle breakdown → total → the single ₹5,999 price. */
export function ValueStack() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <h3 className="text-mal text-lg font-bold sm:text-xl">{bundle.headline}</h3>
        <p className="text-mal mt-2 text-sm text-muted-foreground">{bundle.sub}</p>

        <ul className="mt-5 divide-y divide-border">
          {bundle.courses.map((row) => (
            <li key={row.item} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span className="text-mal flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {row.item}
              </span>
              <span className="shrink-0 font-bold">{row.price}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-mal text-xs font-bold tracking-wide text-muted-foreground uppercase">
              {bundle.totalLabel}
            </p>
            <p className="text-xl font-bold text-muted-foreground line-through">{bundle.total}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-mal text-xs font-bold tracking-wide text-primary uppercase">
              {valueStack.youPayLabel}
            </p>
            <p className="text-3xl font-extrabold sm:text-4xl">{offers.everything.price}</p>
          </div>
        </div>
        <p className="text-mal mt-3 text-xs text-muted-foreground">{bundle.note}</p>
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
