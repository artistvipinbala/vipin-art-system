import { whyPayment } from "@/content/funnel";

/** Honest explanation of why the program has a price. Mobile-first. */
export function WhyPayment() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-mal text-[0.7rem] font-bold tracking-[0.16em] text-primary uppercase sm:text-xs">
        {whyPayment.eyebrow}
      </p>
      <h2 className="text-mal mt-3 text-xl leading-snug font-extrabold sm:mt-4 sm:text-[1.9rem]">
        {whyPayment.headline}
      </h2>
      <p className="text-mal mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {whyPayment.intro}
      </p>

      <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
        {whyPayment.reasons.map((r, i) => (
          <div
            key={r.title}
            className="rounded-2xl border border-border bg-gradient-card p-4 shadow-card sm:p-6"
          >
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[0.7rem] font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-mal text-sm leading-snug font-bold sm:text-base">
                  {r.title}
                </p>
                <p className="text-mal mt-2 text-[0.85rem] leading-relaxed text-muted-foreground sm:text-sm">
                  {r.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-mal mt-6 border-l-2 border-primary/60 pl-4 text-sm leading-relaxed sm:text-base">
        {whyPayment.closing}
      </p>
    </div>
  );
}
