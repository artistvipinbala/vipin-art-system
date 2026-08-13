import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

import { CTAButton } from "@/components/funnel/CTAButton";
import { FaqAccordion } from "@/components/funnel/FaqAccordion";
import { FeedbackForm } from "@/components/funnel/FeedbackForm";
import { Footer } from "@/components/funnel/Footer";
import { Navbar } from "@/components/funnel/Navbar";
import { NumberedCard } from "@/components/funnel/NumberedCard";
import { Placeholder } from "@/components/funnel/Placeholder";
import { Eyebrow, Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { StickyCta } from "@/components/funnel/StickyCta";
import { VideoFrame } from "@/components/funnel/VideoSection";
import {
  choices,
  covered,
  feedback,
  hero,
  media,
  personalMessage,
  positioning,
  problem,
  training,
  transparency,
  whoFor,
  why,
  finalCta,
  brand,
} from "@/content/funnel";
import { track } from "@/lib/track";

const title = "Free Practical Training for Artists — Artist Vipin Bala";
const description =
  "ഒരു artist ആയി income ഉണ്ടാക്കാൻ Vipin Bala personally ഉപയോഗിക്കുന്ന complete system — 30–40 മിനിറ്റ് free practical training. No hard sales pitch.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    track("landing_page_visit");
  }, []);

  const goToSupport = () => {
    track("personal_support_click");
    void navigate({ to: "/personal-support" });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-border/60 bg-surface px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="text-mal text-[1.75rem] leading-tight font-extrabold sm:text-4xl md:text-[2.75rem]">
              {hero.headline}
            </h1>
            <Lead>{hero.support}</Lead>

            <ul className="mt-6 flex flex-wrap gap-2">
              {hero.trust.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="#free-training"
                className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-soft transition-all hover:brightness-105 sm:w-auto sm:text-base"
              >
                {hero.cta}
              </a>
              <p className="mt-3 text-xs text-muted-foreground">{hero.note}</p>
            </div>
          </div>

          <div>
            {media.heroPhoto ? (
              <img
                src={media.heroPhoto}
                alt={`${brand.name} — artist and art business mentor`}
                className="w-full rounded-3xl object-cover shadow-card"
                loading="eager"
              />
            ) : (
              <Placeholder label={media.heroPhotoPlaceholder} ratio="aspect-[4/5]" />
            )}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section>
        <SectionHeading>{problem.headline}</SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
              Many artists can
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {problem.can.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
              But they still struggle with
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {problem.struggle.map((item) => (
                <li key={item} className="flex gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-mal mt-8 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 text-base font-semibold sm:text-lg">
          {problem.highlight}
        </p>
      </Section>

      {/* WHY */}
      <Section tone="surface">
        <SectionHeading>{why.headline}</SectionHeading>
        <ul className="mt-6 space-y-2">
          {why.not.map((item) => (
            <li key={item} className="text-mal flex gap-2 text-sm text-muted-foreground sm:text-base">
              <X className="mt-1 h-4 w-4 shrink-0 text-destructive/70" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-mal mt-6 rounded-2xl bg-card p-6 text-base shadow-soft sm:text-lg">
          {why.instead}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {why.cards.map((card) => (
            <NumberedCard key={card.no} no={card.no} title={card.title} text={card.text} />
          ))}
        </div>
      </Section>

      {/* MAIN TRAINING VIDEO */}
      <Section id="free-training">
        <Eyebrow>Main Training</Eyebrow>
        <SectionHeading>{training.title}</SectionHeading>
        <div className="mt-6">
          <VideoFrame
            embedUrl={media.trainingVideoEmbedUrl}
            placeholderLabel={media.trainingVideoPlaceholder}
            playEvent="video_play"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-muted-foreground">{training.duration}</span>
          <span className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
            Step 1 of 2 — Main Training
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 rounded-full bg-primary" />
        </div>
        <p className="text-mal mt-5 text-sm text-muted-foreground sm:text-base">{training.note}</p>
      </Section>

      {/* WHAT IS COVERED */}
      <Section tone="surface">
        <SectionHeading>{covered.headline}</SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {covered.items.map((item) => (
            <NumberedCard key={item.no} no={item.no} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>

      {/* TRANSPARENCY */}
      <Section>
        <SectionHeading>{transparency.headline}</SectionHeading>
        <Lead>{transparency.text}</Lead>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {transparency.checklist.map((item) => (
            <li
              key={item}
              className="text-mal flex gap-3 rounded-xl border border-border bg-card p-4 text-sm shadow-soft"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {transparency.screenshots.map((label) => (
            <Placeholder key={label} label={label} ratio="aspect-video" />
          ))}
        </div>
      </Section>

      {/* POSITIONING */}
      <Section tone="surface">
        <div className="rounded-3xl bg-card p-6 shadow-card sm:p-10">
          <SectionHeading>{positioning.question}</SectionHeading>
          <p className="text-mal mt-4 text-xl font-extrabold text-primary sm:text-2xl">
            {positioning.answer}
          </p>
          <ul className="mt-6 space-y-3">
            {positioning.points.map((point) => (
              <li key={point} className="text-mal flex gap-3 text-sm sm:text-base">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-mal mt-6 border-t border-border pt-6 text-sm text-muted-foreground sm:text-base">
            {positioning.closing}
          </p>
        </div>
      </Section>

      {/* POST-VIDEO ACTION */}
      <Section id="next-step">
        <SectionHeading>{choices.headline}</SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-mal text-lg font-bold sm:text-xl">{choices.option1.title}</h3>
            <p className="text-mal mt-3 flex-1 text-sm text-muted-foreground">
              {choices.option1.text}
            </p>
            <a
              href="#feedback"
              className="mt-6 inline-flex min-h-13 items-center justify-center rounded-full border-2 border-border bg-card px-6 text-sm font-bold tracking-wide transition-colors hover:border-primary hover:text-primary"
            >
              {choices.option1.cta}
            </a>
          </div>
          <div className="flex flex-col rounded-3xl border border-primary bg-card p-6 shadow-card sm:p-8">
            <h3 className="text-mal text-lg font-bold sm:text-xl">{choices.option2.title}</h3>
            <p className="text-mal mt-3 flex-1 text-sm text-muted-foreground">
              {choices.option2.text}
            </p>
            <CTAButton className="mt-6 w-full" onClick={goToSupport}>
              {choices.option2.cta}
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* FEEDBACK */}
      <Section id="feedback" tone="surface">
        <SectionHeading>{feedback.headline}</SectionHeading>
        <Lead>{feedback.sub}</Lead>
        <div className="mt-8">
          <FeedbackForm />
        </div>
      </Section>

      {/* WHO IS THIS FOR */}
      <Section>
        <SectionHeading>Who is this for?</SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-bold tracking-wide text-primary uppercase">
              This is for you if
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {whoFor.yes.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
              This is NOT for you if
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {whoFor.no.map((item) => (
                <li key={item} className="flex gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* PERSONAL MESSAGE */}
      <Section tone="surface">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <SectionHeading>{personalMessage.headline}</SectionHeading>
          <div className="mt-5 space-y-4">
            {personalMessage.paragraphs.map((p) => (
              <p key={p} className="text-mal text-sm text-muted-foreground sm:text-base">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 font-bold">{personalMessage.signature}</p>
          <p className="text-sm text-muted-foreground">{brand.role}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading>FAQ</SectionHeading>
        <div className="mt-6">
          <FaqAccordion />
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section tone="surface">
        <div className="rounded-3xl bg-card p-6 text-center shadow-card sm:p-12">
          <SectionHeading>{finalCta.headline}</SectionHeading>
          <p className="text-mal mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {finalCta.text}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#free-training"
              className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-soft sm:w-auto"
            >
              {finalCta.primary}
            </a>
            <CTAButton variant="outline" onClick={goToSupport}>
              {finalCta.secondary}
            </CTAButton>
          </div>
        </div>
      </Section>

      <Footer />
      <StickyCta label={hero.cta} href="#free-training" />
    </div>
  );
}
