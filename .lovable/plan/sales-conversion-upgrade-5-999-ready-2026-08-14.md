# Sales Conversion Upgrade — ₹5,999 Ready

Goal: keep the honest "no pitch" angle (it's the differentiator) but add the proof, value framing, and decision pressure a ₹5,999 sale needs.

## 1. Proof layer (biggest lever)

- New proof section on `/` after the training video: student results, income screenshots, artwork-sold shots, WhatsApp message screenshots — each a clearly labelled slot in the content file so the owner drops in real images.
- Testimonial block (name + situation + result), structured for real entries only. Empty until real ones are supplied; the section hides itself when empty rather than showing fake social proof.
- Credibility strip near the hero: years teaching, students taught, artworks sold — owner-editable numbers, hidden if blank.

## 2. Reframe the "you can do it yourself" section

Keep the honesty, add the cost of going alone: time, trial-and-error, ad money wasted, months lost. Ends with a clear "faster with guidance vs slower alone" contrast, not an open exit.

## 3. Price justification on `/personal-support`

- Value anchor: what an agency/freelancer charges to build the same funnel, ads and automation, vs the course price.
- What's included, itemised, with an indicative value per item and the total, then the actual price.
- Bonuses section (owner-editable slots: templates, swipe files, ad structure, recordings).
- Risk reversal: real refund/guarantee wording replacing the current placeholder, plus "who should not buy" honesty which raises trust.
- Payment-plan line if applicable (owner-editable placeholder).

## 4. Fix the buyer flow

- Show pricing before the qualification form, not after: offers → "apply for personal support" form. Serious buyers should never be gated from seeing the price.
- Make "I want to do this myself" a real path: it leads to the self-paced ₹5,999 offer instead of dead-ending in the feedback form.
- Move the feedback form below the two choices on `/` so it stops competing with the buying decision, and keep the WhatsApp community as the exit for non-buyers.

## 5. Objection handling at the point of purchase

- Purchase-page FAQ answering the real blockers: "I have no audience", "I'm not good at tech", "will this work in Kerala/for my art type", "how much ad spend do I need", "how long until results", refund.
- Comparison table gets a third framing column: doing it alone.

## 6. Ethical urgency

No fake countdowns or fake scarcity. Instead: a real, owner-set intake limit for personal support ("X people per batch"), and a clear next-batch date field — both editable and easy to keep truthful.

## Technical notes

- All new copy, numbers, image slots, bonuses, guarantee text and batch limits go into `src/content/funnel.ts` so nothing is hardcoded in components.
- New components: `ProofSection`, `Testimonials`, `ValueStack`, `Guarantee`, `PurchaseFaq`, `CredibilityStrip`; each renders nothing when its content arrays are empty so the page never shows placeholder-looking gaps in production.
- Reorder sections in `src/routes/index.tsx` and `src/routes/personal-support.tsx`; no database or server-function changes needed.
- Existing dark indigo + gold theme and Malayalam-first copy style preserved throughout.
- Verify on a 390px viewport after the changes.
