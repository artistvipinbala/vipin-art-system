import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { links, offers, todayOffer } from "@/content/funnel";
import { formatLeft, getOfferRemaining, getSeatsLeft } from "@/lib/offer-window";
import { track } from "@/lib/track";

/** Join bar fixed to the bottom: live countdown, seats left and one button. */
export function StickyJoinBar({ revealAfterId }: { revealAfterId?: string }) {
  const [left, setLeft] = useState<number | null>(null);
  const [visible, setVisible] = useState(!revealAfterId);

  useEffect(() => {
    const tick = () => setLeft(getOfferRemaining());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!revealAfterId) return;
    const onScroll = () => {
      const el = document.getElementById(revealAfterId);
      if (!el) return;
      setVisible(el.getBoundingClientRect().top <= window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfterId]);

  if (left === null || !visible) return null;
  const seats = getSeatsLeft(left);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/30 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-mal truncate text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
            {todayOffer.seatsLabel}: {seats} {todayOffer.seatsSuffix}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold">
            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="tabular-nums" aria-live="polite">
              {formatLeft(left)}
            </span>
            <span className="text-muted-foreground line-through">
              · {todayOffer.regular.price}
            </span>
            <span className="text-primary">{offers.everything.price}</span>
          </p>
        </div>
        <a
          href={links.checkout}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("course_purchase_click")}
          className="text-mal inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold px-5 text-sm font-bold tracking-wide text-primary-foreground shadow-glow active:scale-[0.99]"
        >
          JOIN WITH OFFER
        </a>
      </div>
    </div>
  );
}
