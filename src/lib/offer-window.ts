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

const KEY = "avb_offer_deadline";
const WINDOW_MS = todayOffer.windowMinutes * 60_000;

/**
 * A short rolling window that starts when the visitor opens the page. It never
 * "expires" into a closed state — when it runs out a fresh window starts, so
 * the price and the join option always stay available.
 */
export function getOfferDeadline() {
  let deadline = Number(window.sessionStorage.getItem(KEY));
  if (!deadline || Number.isNaN(deadline) || deadline <= Date.now()) {
    deadline = Date.now() + WINDOW_MS;
    window.sessionStorage.setItem(KEY, String(deadline));
  }
  return deadline;
}

/** Remaining ms in the current window, rolling over automatically. */
export function getOfferRemaining() {
  return Math.max(0, getOfferDeadline() - Date.now());
}

/** Rotating "seats left" number so the scarcity feels live (3 → 2 → 1 …). */
const SEAT_PATTERN = [4, 3, 2, 3, 1, 2];

export function getSeatsLeft(remainingMs: number) {
  const elapsedMinutes = Math.floor((WINDOW_MS - remainingMs) / 60_000);
  return SEAT_PATTERN[Math.min(elapsedMinutes, SEAT_PATTERN.length - 1) % SEAT_PATTERN.length];
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** mm:ss for a remaining-milliseconds value. */
export function formatLeft(ms: number) {
  const total = Math.floor(Math.max(0, ms) / 1000);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}
