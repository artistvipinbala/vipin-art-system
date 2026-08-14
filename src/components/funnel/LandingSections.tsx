import { ArrowRight, Check, Sparkles, X } from "lucide-react";

import { Placeholder } from "./Placeholder";
import { Eyebrow, Lead, Section, SectionHeading } from "./Section";
import {
  aboutVipin,
  audienceSection,
  incomeStreams,
  learnList,
  mechanism,
  media,
  painSection,
  transformation,
} from "@/content/funnel";

/* ---------------------------------------------- problem / relatability */
export function PainSection() {
  return (
    <Section id="problem">
      <SectionHeading>{painSection.headline}</SectionHeading>
      <div className="mt-4 space-y-1">
        {painSection.copy.map((line) => (
          <p key={line} className="text-mal text-base text-muted-foreground sm:text-lg">
            {line}
          </p>
        ))}
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {painSection.points.map((p) => (
          <li
            key={p}
            className="text-mal flex gap-3 rounded-2xl border border-border bg-gradient-card p-4 text-sm shadow-card sm:text-base"
          >
            <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <p className="text-mal mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-5 text-base font-bold sm:text-lg">
        {painSection.closing}
      </p>
    </Section>
  );
}

/* ---------------------------------------------- income streams */
export function IncomeStreams() {
  return (
    <Section tone="surface">
      <SectionHeading>{incomeStreams.headline}</SectionHeading>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {incomeStreams.items.map((item) => (
          <div
            key={item}
            className="flex min-h-20 items-center rounded-2xl border border-border bg-card p-4 text-sm font-semibold shadow-soft"
          >
            {item}
          </div>
        ))}
      </div>
      <Lead>{incomeStreams.note}</Lead>
    </Section>
  );
}

/* ---------------------------------------------- unique mechanism */
export function Mechanism() {
  return (
    <Section id="framework">
      <Eyebrow>{mechanism.eyebrow}</Eyebrow>
      <SectionHeading className="text-primary">{mechanism.title}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {mechanism.steps.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-primary/30 bg-gradient-card p-6 shadow-card"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-primary">{s.no}</span>
            <h3 className="mt-2 text-lg font-extrabold sm:text-xl">{s.title}</h3>
            <p className="text-mal mt-2 text-sm text-muted-foreground sm:text-base">{s.text}</p>
            {i < mechanism.steps.length - 1 ? (
              <ArrowRight className="absolute right-4 bottom-4 h-4 w-4 text-primary/50" />
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------- what they learn */
export function LearnList() {
  return (
    <Section tone="surface">
      <SectionHeading>{learnList.headline}</SectionHeading>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {learnList.items.map((item) => (
          <li
            key={item}
            className="text-mal flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-soft sm:text-base"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------- who is this for / not for */
export function AudienceSection() {
  return (
    <Section>
      <SectionHeading>{audienceSection.headline}</SectionHeading>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {audienceSection.cards.map((c) => (
          <div
            key={c}
            className="flex min-h-20 items-center gap-2 rounded-2xl border border-border bg-gradient-card p-4 text-sm font-semibold shadow-card"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            {c}
          </div>
        ))}
      </div>
      <Lead>{audienceSection.note}</Lead>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-base font-bold sm:text-lg">{audienceSection.notForHeadline}</h3>
        <ul className="mt-4 space-y-3">
          {audienceSection.notFor.map((n) => (
            <li key={n} className="flex gap-3 text-sm text-muted-foreground sm:text-base">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------------------------------------- about vipin */
export function AboutVipin() {
  return (
    <Section tone="surface">
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:items-center">
        <div>
          {media.heroPhoto ? (
            <img
              src={media.heroPhoto}
              alt="Artist Vipin Bala"
              loading="lazy"
              className="w-full rounded-3xl border border-border object-cover shadow-card"
            />
          ) : (
            /* PLACEHOLDER — replace media.heroPhoto in src/content/funnel.ts */
            <Placeholder label={media.heroPhotoPlaceholder} ratio="aspect-[4/5]" />
          )}
        </div>
        <div>
          <SectionHeading>{aboutVipin.headline}</SectionHeading>
          <div className="mt-4 flex flex-wrap gap-2">
            {aboutVipin.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-primary/40 px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase"
              >
                {r}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-4">
            {aboutVipin.paragraphs.map((p) => (
              <p key={p} className="text-mal text-sm text-muted-foreground sm:text-base">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------- before → after */
function Column({
  label,
  steps,
  highlight,
}: {
  label: string;
  steps: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl border border-primary/50 bg-gradient-card p-6 shadow-glow"
          : "rounded-2xl border border-border bg-card p-6 shadow-soft"
      }
    >
      <p
        className={
          highlight
            ? "text-xs font-bold tracking-[0.2em] text-primary"
            : "text-xs font-bold tracking-[0.2em] text-muted-foreground"
        }
      >
        {label}
      </p>
      <ul className="mt-4 space-y-2">
        {steps.map((s) => (
          <li key={s} className="text-mal text-sm font-semibold sm:text-base">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Transformation() {
  return (
    <Section>
      <SectionHeading>{transformation.headline}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Column label={transformation.before.label} steps={transformation.before.steps} />
        <Column label={transformation.after.label} steps={transformation.after.steps} highlight />
      </div>
    </Section>
  );
}
