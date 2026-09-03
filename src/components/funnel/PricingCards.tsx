import { Check } from "lucide-react";

import { offers, links } from "@/content/funnel";
import { track } from "@/lib/track";

/** Single offer — ₹5,999 with everything included. */
export function PricingCards() {
  const plan = offers.everything;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-primary/60 bg-gradient-card p-6 shadow-glow sm:p-9">
      <span className="text-mal text-xs font-bold tracking-[0.15em] text-primary uppercase">
        {plan.tag}
      </span>
      <h3 className="text-mal mt-3 text-xl leading-snug font-bold sm:text-2xl">
        {plan.title}
      </h3>

      <div className="mt-5 flex items-end gap-3">
        <p className="text-4xl font-extrabold sm:text-5xl">{plan.price}</p>
      </div>
      <p className="text-mal mt-2 text-sm text-muted-foreground">{plan.priceNote}</p>

      <ul className="mt-7 space-y-3">
        {plan.includes.map((item) => (
          <li key={item} className="text-mal flex gap-3 text-sm sm:text-base">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={links.checkout}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("course_purchase_click")}
        className="text-mal mt-8 inline-flex w-full min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.99] sm:text-base"
      >
        {plan.cta}
      </a>
      <p className="text-mal mt-3 text-center text-xs text-muted-foreground">
        {offers.supportDuration}
      </p>
    </div>
  );
}
