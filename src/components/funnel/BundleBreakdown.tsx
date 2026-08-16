import { Check, Gift } from "lucide-react";

import { JoinNowInline } from "./JoinNowInline";
import groupImage from "@/assets/bundle/bundle-group.jpg.asset.json";
import { bundleBreakdown } from "@/content/bundle-breakdown";

/** Bonus / course breakdown: 3D box mockup + Malayalam value points per item. */
export function BundleBreakdown() {
  return (
    <div className="space-y-8">
      {/* Top summary banner */}
      <div className="rounded-3xl border border-primary/40 bg-card p-6 text-center shadow-card sm:p-8">
        <h2 className="text-mal text-xl leading-snug font-bold text-foreground sm:text-2xl md:text-3xl">
          {bundleBreakdown.headline}
        </h2>
        <p className="text-mal mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {bundleBreakdown.subtitle}
        </p>

        <div className="surface-ink mt-6 overflow-hidden rounded-2xl border border-border/70">
          <img
            src={groupImage.url}
            alt="Artist Vipin Bala personal support bundle — all courses and toolkits"
            className="h-full w-full object-contain"
          />
        </div>


        <div className="mt-6 flex flex-col items-center gap-3">
          <div>
            <p className="text-mal text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
              {bundleBreakdown.totalValueLabel}
            </p>
            <p className="text-2xl font-extrabold text-muted-foreground line-through sm:text-3xl">
              {bundleBreakdown.totalValue}
            </p>
          </div>
          <span className="text-mal inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-bold text-primary-foreground sm:text-sm">
            <Gift className="h-4 w-4 shrink-0" />
            {bundleBreakdown.offerBadge}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-5">
        {bundleBreakdown.items.map((item) => (
          <article
            key={item.title}
            className="grid grid-cols-1 gap-5 rounded-3xl border border-border bg-card p-5 shadow-soft sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:items-start sm:gap-6 sm:p-6 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
          >
            <div className="surface-ink overflow-hidden rounded-2xl border border-border/70">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <span className="text-mal inline-block rounded-full border border-primary/40 bg-secondary px-3 py-1 text-[0.7rem] font-bold tracking-wide text-primary">
                {item.tag}
              </span>
              <h3 className="mt-3 text-lg font-bold text-foreground sm:text-xl">{item.title}</h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-sm font-bold text-muted-foreground line-through">
                  {item.price}
                </span>
                <span className="text-mal rounded-full bg-primary/15 px-3 py-1 text-[0.7rem] font-bold text-primary">
                  {bundleBreakdown.freeBadge}
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-mal min-w-0 text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
