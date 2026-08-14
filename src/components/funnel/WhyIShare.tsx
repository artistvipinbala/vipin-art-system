import { Quote } from "lucide-react";

import { whyIShare } from "@/content/funnel";

/** Vipin's real intention — why he shares everything openly. */
export function WhyIShare() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-mal text-xs font-bold tracking-[0.16em] text-primary uppercase">
        {whyIShare.eyebrow}
      </p>
      <h2 className="text-mal mt-4 text-2xl leading-snug font-extrabold sm:text-[1.9rem]">
        {whyIShare.headline}
      </h2>

      <div className="mt-6 space-y-4">
        {whyIShare.paragraphs.map((p) => (
          <p
            key={p}
            className="text-mal text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-card p-6 shadow-card">
        <div className="flex items-center gap-2">
          <Quote className="h-4 w-4 text-primary" />
          <p className="text-mal text-xs font-bold tracking-[0.16em] text-primary uppercase">
            {whyIShare.dream.label}
          </p>
        </div>
        <p className="text-mal mt-3 text-sm leading-relaxed sm:text-base">
          {whyIShare.dream.text}
        </p>
      </div>

      <p className="text-mal mt-6 text-sm leading-relaxed font-semibold sm:text-base">
        {whyIShare.closing}
      </p>
      <p className="text-mal mt-3 text-sm font-bold">{whyIShare.signature}</p>
    </div>
  );
}
