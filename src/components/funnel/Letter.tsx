import { letter } from "@/content/funnel";

/** Personal letter — human voice, not a pitch. */
export function Letter() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-mal text-xs font-bold tracking-[0.16em] text-primary uppercase">
        {letter.eyebrow}
      </p>
      <h1 className="text-mal mt-4 text-2xl leading-snug font-extrabold sm:text-[2rem]">
        {letter.headline}
      </h1>
      <div className="mt-6 space-y-4">
        {letter.paragraphs.map((p) => (
          <p key={p} className="text-mal text-sm leading-relaxed text-muted-foreground sm:text-base">
            {p}
          </p>
        ))}
      </div>
      <p className="text-mal mt-6 text-sm font-bold">{letter.signature}</p>
    </div>
  );
}
