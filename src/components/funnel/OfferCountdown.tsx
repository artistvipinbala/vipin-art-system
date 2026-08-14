import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { CTAButton } from "./CTAButton";
import { todayOffer } from "@/content/funnel";
import { track } from "@/lib/track";

/** IST date key so the label always matches "today" for the viewer. */
function istDateKey(now: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function istDateLabel(now: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function OfferCountdown({ onExpiredCta }: { onExpiredCta?: () => void }) {
  const [dateLabel, setDateLabel] = useState("");
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    setDateLabel(istDateLabel(now));

    const key = `avb_offer_deadline_${istDateKey(now)}`;
    let deadline = Number(window.localStorage.getItem(key));
    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + todayOffer.windowMinutes * 60_000;
      window.localStorage.setItem(key, String(deadline));
    }

    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === null) return null;

  const expired = left <= 0;
  const totalSeconds = Math.floor(left / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (expired) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
          {dateLabel}
        </p>
        <h3 className="text-mal mt-3 text-lg font-bold sm:text-xl">
          {todayOffer.expired.title}
        </h3>
        <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">
          {todayOffer.expired.body}
        </p>
        <div className="mt-5 flex flex-wrap items-baseline gap-3">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {todayOffer.expired.priceLabel}
          </span>
          <span className="text-2xl font-extrabold sm:text-3xl">
            {todayOffer.expired.price}
          </span>
        </div>
        {onExpiredCta ? (
          <CTAButton
            variant="outline"
            className="text-mal mt-6 w-full sm:w-auto"
            onClick={() => {
              track("support_purchase_click");
              onExpiredCta();
            }}
          >
            {todayOffer.expired.cta}
          </CTAButton>
        ) : null}
        <p className="text-mal mt-4 text-xs text-muted-foreground">
          {todayOffer.expired.soft}
        </p>
      </div>
    );
  }

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
          <span
            className="text-2xl font-extrabold tabular-nums sm:text-3xl"
            aria-live="polite"
          >
            {pad(minutes)}:{pad(seconds)}
          </span>
        </div>
      </div>
      <h3 className="text-mal mt-5 text-lg leading-snug font-bold sm:text-xl">
        {todayOffer.headline}
      </h3>
      <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">
        {todayOffer.sub}
      </p>
      <p className="text-mal mt-4 text-sm">
        <span className="font-extrabold text-primary">{todayOffer.live.price}</span>{" "}
        <span className="text-muted-foreground">{todayOffer.live.note}</span>
      </p>
    </div>
  );
}
