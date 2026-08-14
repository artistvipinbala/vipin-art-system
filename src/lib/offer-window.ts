import { todayOffer } from "@/content/funnel";

/** IST date key so "today" always matches the viewer in India. */
export function istDateKey(now: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function istDateLabel(now: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
}

/**
 * One shared deadline per day, stored in the browser, so the countdown in the
 * page and the countdown in the sticky join bar always show the same time.
 */
export function getOfferDeadline() {
  const key = `avb_offer_deadline_${istDateKey(new Date())}`;
  let deadline = Number(window.localStorage.getItem(key));
  if (!deadline || Number.isNaN(deadline)) {
    deadline = Date.now() + todayOffer.windowMinutes * 60_000;
    window.localStorage.setItem(key, String(deadline));
  }
  return deadline;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** mm:ss for a remaining-milliseconds value. */
export function formatLeft(ms: number) {
  const total = Math.floor(Math.max(0, ms) / 1000);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}
