# Artist Vipin Bala — Free Training Funnel

A premium, minimal, mobile-first personal-brand funnel in Malayalam (with natural English terms), following the exact flow: Ad → Free Training → Feedback → Optional Personal Support → Offer.

## Pages

1. `/` — Free Training landing page (no sales pressure)
   - Hero: eyebrow, headline, supporting text, trust strip, primary CTA that smooth-scrolls to the video, "watch first, decide later" note, photo placeholder (stacks below headline on mobile)
   - Problem section + highlighted "problem is not your talent" statement
   - Why this free training + 3 cards (Real Process / Practical System / No Pressure)
   - Main training video (no autoplay, replaceable placeholder embed, 30–40 min note, "main training" indicator)
   - What's covered — 6 numbered cards
   - Transparency section with checklist + 4 clearly labeled screenshot placeholders
   - "Can you do this yourself?" positioning section
   - Post-video choice: two large cards → feedback flow or personal support flow
   - Feedback form (name, email, WhatsApp, usefulness rating, most useful, biggest challenge, optional question) with mock WhatsApp OTP step, then thank-you state
   - Optional WhatsApp community invite (placeholder link) + video-answer positioning
   - Personal message from Vipin + signature
   - FAQ accordion (12 questions, refund answer left as owner placeholder)
   - Final CTA + footer with placeholder policy links
   - Sticky bottom CTA on mobile

2. `/personal-support` — qualification + offer page
   - 6-step form (name, WhatsApp, current stage, biggest challenge, what you're looking for, seriousness) with validation and progress indicator
   - Sales video placeholder + "in this video" outline
   - Two offers: Self-Paced ₹5,999 and Personal Support ₹12,999 (support duration as an editable placeholder)
   - Comparison table, "who this is / isn't for" columns
   - Payment buttons open a `[PAYMENT GATEWAY PLACEHOLDER]` modal (no fake gateway)

3. `/thank-you` — post-submission onboarding placeholder with community invite

Plus Privacy / Terms / Refund / Contact placeholder routes so footer links resolve.

## Data (Lovable Cloud)

Enable Lovable Cloud and create:
- `leads` — name, email, whatsapp_number, whatsapp_verified, training_completed, feedback_rating, feedback_text, biggest_challenge, personal_question, support_interest, current_stage, desired_support, seriousness, source, campaign, created_at
- `support_applications` — lead_id, name, whatsapp_number, current_stage, biggest_challenge, desired_support, seriousness, status (New/Contacted/Qualified/Not Qualified/Joined/Follow Up), created_at

Both insert-only from the public page; nothing is publicly readable, so verification data and lead details stay private. No OTP codes are stored or exposed — verification is a mock UI flow ready to connect to a real provider later.

## Technical notes

- All copy, prices, links, video URLs, image placeholders and WhatsApp links live in one editable content config module (`src/content/funnel.ts`) so the owner can change them in one place.
- Reusable components: Navbar, Hero, VideoSection, ContentCard, CTAButton, FeedbackForm, MultiStepSupportForm, PricingCard, ComparisonTable, FAQAccordion, Footer, PaymentPlaceholderModal.
- Design tokens in `src/styles.css`: light/near-white base, orange + sky-blue accents, rounded cards, subtle shadows, strong type scale. No countdown timers, fake scarcity, fake testimonials, or autoplay.
- Server-side writes via TanStack `createServerFn` with Zod validation (client + server), toast feedback via sonner.
- A single `track(event)` helper with the named funnel events (page visit, video play/complete, feedback started/submitted, community click, support clicks, form started/completed, purchase clicks) that currently no-ops — integration-ready, no fake analytics.
- Per-route `head()` metadata; verified on mobile viewport before finishing.
