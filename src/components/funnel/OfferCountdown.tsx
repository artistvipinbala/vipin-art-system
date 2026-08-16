import { Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { todayOffer } from "@/content/funnel";
import { formatLeft, getOfferRemaining, getSeatsLeft, istDateLabel } from "@/lib/offer-window";

/**
 * Rolling 20-minute urgency window. It never shows an "offer closed" state —
 * the rate and the join option stay available at all times.
 */
export function OfferCountdown() {
  const [dateLabel, setDateLabel] = useState("");
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    setDateLabel(istDateLabel(new Date()));
    const tick = () => setLeft(getOfferRemaining());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === null) return null;
  const seats = getSeatsLeft(left);

  return (
    <div className="rounded-3xl border border-primary/40 bg-gradient-card p-6 shadow-glow sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">
            {todayOffer.eyebrow}
          </p>
          <p className="text-mal mt-1 text-sm text-muted-foreground">
            {todayOffer.dateLabel} · {dateLabel}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-primary/40 bg-background/40 px-4 py-2.5">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-2xl font-extrabold tabular-nums sm:text-3xl" aria-live="polite">
            {formatLeft(left)}
          </span>
        </div>
      </div>

      <h3 className="text-mal mt-5 text-lg leading-snug font-bold sm:text-xl">
        {todayOffer.headline}
      </h3>
      <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">{todayOffer.sub}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-mal inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-2 text-sm font-bold text-primary">
          <Users className="h-4 w-4 shrink-0" />
          {todayOffer.seatsLabel}: {seats} {todayOffer.seatsSuffix}
        </span>
        <span className="text-mal text-sm">
          <span className="font-extrabold text-primary">{todayOffer.live.price}</span>{" "}
          <span className="text-muted-foreground">{todayOffer.live.note}</span>
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-2 border-t border-border/60 pt-4">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {todayOffer.regular.priceLabel}
        </span>
        <span className="text-lg font-extrabold text-muted-foreground line-through">
          {todayOffer.regular.price}
        </span>
        <span className="text-mal text-xs text-muted-foreground">{todayOffer.regularNote}</span>
      </div>

      <p className="text-mal mt-4 text-sm text-muted-foreground">{todayOffer.nudge}</p>
    </div>
  );
}
