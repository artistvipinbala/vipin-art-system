/**
 * Analytics hook-point. Integration-ready: wire this to Meta Pixel / GA4 later.
 * Intentionally a no-op right now — no fake analytics.
 */
export type FunnelEvent =
  | "landing_page_visit"
  | "video_play"
  | "video_complete"
  | "feedback_started"
  | "feedback_submitted"
  | "whatsapp_community_click"
  | "personal_support_click"
  | "support_form_started"
  | "support_form_completed"
  | "course_purchase_click"
  | "support_purchase_click";

export function track(event: FunnelEvent, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // Integration point — e.g. window.fbq?.("trackCustom", event, payload)
  void event;
  void payload;
}
