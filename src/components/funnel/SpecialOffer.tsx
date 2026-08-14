import { Gift, Check } from "lucide-react";

import { specialOffer } from "@/content/funnel";

/** Extra offer — rendered only on the page after the video CTA click. */
export function SpecialOffer() {
  return (
    <div className="rounded-3xl border border-primary/40 bg-gradient-card p-6 shadow-glow sm:p-8">
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-primary uppercase">
        <Gift className="h-4 w-4" />
        {specialOffer.eyebrow}
      </p>
      <h2 className="text-mal mt-3 text-xl leading-snug font-extrabold sm:text-2xl">
        {specialOffer.headline}
      </h2>
      <ul className="mt-5 space-y-3">
        {specialOffer.items.map((item) => (
          <li key={item} className="text-mal flex gap-2.5 text-sm sm:text-base">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-mal mt-5 text-xs text-muted-foreground">{specialOffer.note}</p>
    </div>
  );
}
