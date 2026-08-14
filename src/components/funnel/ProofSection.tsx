import { Placeholder } from "./Placeholder";
import { Lead, Section, SectionHeading } from "./Section";
import { proof } from "@/content/funnel";

export function ProofSection() {
  if (proof.items.length === 0) return null;

  return (
    <Section id="proof">
      <SectionHeading>{proof.headline}</SectionHeading>
      <Lead>{proof.text}</Lead>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {proof.items.map((item) => (
          <figure key={item.label} className="space-y-2">
            {item.src ? (
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full rounded-2xl border border-border object-cover shadow-card"
              />
            ) : (
              <Placeholder label={item.label} ratio="aspect-video" />
            )}
            <figcaption className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
