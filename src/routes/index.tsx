import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Footer } from "@/components/funnel/Footer";
import {
  AboutVipin,
  AudienceSection,
  IncomeStreams,
  LearnList,
  Mechanism,
  PainSection,
  Transformation,
} from "@/components/funnel/LandingSections";
import { PricingCards } from "@/components/funnel/PricingCards";
import { ProofSection } from "@/components/funnel/ProofSection";
import { Eyebrow, Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { Testimonials } from "@/components/funnel/Testimonials";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  landingFaqs,
  landingFinalCta,
  media,
  offerIntro,
  salesHero,
  vsl,
  vslSection,
} from "@/content/funnel";
import { track } from "@/lib/track";

const title = "Art Income Training (Malayalam) — Artist Vipin Bala";
const description =
  "നിങ്ങളുടെ Drawing, Painting, Craft അല്ലെങ്കിൽ Teaching skill ഉപയോഗിച്ച് artwork sales, art classes, workshops, products വഴി income ഉണ്ടാക്കാനുള്ള practical system — free Malayalam training.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function scrollToOffer() {
  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CtaButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-mal inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-gold px-8 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:brightness-105 active:scale-[0.99] sm:w-auto sm:text-base"
    >
      {label}
    </button>
  );
}

function LandingPage() {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    track("landing_page_visit");
  }, []);

  const onGateReached = useCallback(() => setWatched(true), []);

  const goOffer = () => {
    track("course_purchase_click");
    scrollToOffer();
  };

  return (
    <main className="bg-background">
      {/* ---------------- HERO + VSL ---------------- */}
      <section className="border-b border-border/60 px-5 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-center text-[0.65rem] font-bold tracking-[0.2em] text-primary uppercase sm:text-xs">
            {salesHero.eyebrow}
          </p>
          <h1 className="text-mal mx-auto mt-4 max-w-2xl text-center text-[1.25rem] leading-[1.35] font-bold sm:text-[1.75rem]">
            {salesHero.headline}
          </h1>
          <p className="text-mal mx-auto mt-4 max-w-2xl text-center text-[0.85rem] leading-relaxed text-muted-foreground sm:text-base">
            {salesHero.support}
          </p>

          <div className="mt-9 text-center">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">
              {vslSection.eyebrow}
            </p>
            <h2 className="text-mal mx-auto mt-3 max-w-2xl text-base leading-snug font-bold sm:text-xl">
              {vslSection.headline}
            </h2>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-gradient-gold p-[2px] shadow-glow">
            <div className="overflow-hidden rounded-[1.65rem] bg-background">
              <VslPlayer
                embedUrl={media.trainingVideoEmbedUrl}
                placeholderLabel={media.trainingVideoPlaceholder}
                gateSeconds={vsl.gateSeconds}
                onGateReached={onGateReached}
              />
            </div>
          </div>

          <p className="text-mal mx-auto mt-4 max-w-2xl text-center text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
            {vslSection.sub}
          </p>

          <div className="mt-6 text-center">
            <CtaButton label={vslSection.cta} onClick={goOffer} />
            {watched ? (
              <p className="text-mal mt-3 text-xs text-muted-foreground">{vsl.reveal.note}</p>
            ) : null}
          </div>
        </div>
      </section>

      <PainSection />
      <IncomeStreams />
      <Mechanism />
      <LearnList />
      <AudienceSection />
      <AboutVipin />

      {/* SOCIAL PROOF — placeholder slots until real screenshots/testimonials exist */}
      <ProofSection />
      <Testimonials />

      <Transformation />

      {/* ---------------- OFFER ---------------- */}
      <Section id="offer" tone="surface">
        <Eyebrow>{offerIntro.eyebrow}</Eyebrow>
        <SectionHeading>{offerIntro.headline}</SectionHeading>
        <Lead>{offerIntro.sub}</Lead>
        <div className="mt-8">
          <PricingCards />
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section>
        <SectionHeading>FAQ</SectionHeading>
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {landingFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`lf-${i}`}>
                <AccordionTrigger className="text-mal text-left text-sm font-semibold sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-mal text-sm text-muted-foreground sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ---------------- FINAL CTA ---------------- */}
      <Section className="text-center">
        <SectionHeading className="mx-auto max-w-2xl">{landingFinalCta.headline}</SectionHeading>
        <p className="text-mal mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {landingFinalCta.sub}
        </p>
        <div className="mt-8">
          <CtaButton label={landingFinalCta.cta} onClick={goOffer} />
        </div>
        <p className="text-mal mx-auto mt-3 max-w-xl text-xs text-muted-foreground">
          {landingFinalCta.micro}
        </p>
      </Section>

      <Footer />
    </main>
  );
}
