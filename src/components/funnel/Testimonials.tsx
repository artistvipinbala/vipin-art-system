import { Quote } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import { testimonials } from "@/content/funnel";

export function Testimonials() {
  if (testimonials.items.length === 0) return null;

  return (
    <Section tone="surface">
      <SectionHeading>{testimonials.headline}</SectionHeading>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.items.map((t) => (
          <blockquote
            key={t.name + t.quote}
            className="flex flex-col rounded-2xl border border-border bg-gradient-card p-6 shadow-card"
          >
            <Quote className="h-5 w-5 text-primary" />
            <p className="text-mal mt-4 flex-1 text-sm sm:text-base">{t.quote}</p>
            <footer className="mt-5 border-t border-border pt-4">
              <p className="font-bold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.situation}</p>
              <p className="mt-1 text-xs font-semibold text-primary">{t.result}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
