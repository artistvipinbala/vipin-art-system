import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { BundleBreakdown } from "@/components/funnel/BundleBreakdown";
import { EduCompare } from "@/components/funnel/EduCompare";
import { Footer } from "@/components/funnel/Footer";
import { Guarantee } from "@/components/funnel/Guarantee";
import { JoinNowInline } from "@/components/funnel/JoinNowInline";
import { Letter } from "@/components/funnel/Letter";
import { OfferCountdown } from "@/components/funnel/OfferCountdown";
import { PhotoStrip } from "@/components/funnel/PhotoStrip";
import { PricingCards } from "@/components/funnel/PricingCards";
import { PurchaseFaq } from "@/components/funnel/PurchaseFaq";
import { Section, SectionHeading } from "@/components/funnel/Section";
import { StickyJoinBar } from "@/components/funnel/StickyJoinBar";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import { WhyIShare } from "@/components/funnel/WhyIShare";
import { brand, media, offers } from "@/content/funnel";
import { track } from "@/lib/track";

const title = "Artist Income System — ₹5,999 | Artist Vipin Bala";
const description =
  "എല്ലാ courses-ഉം weekly live class-ഉം WhatsApp support-ഉം lifetime access-ഉം ചേർന്ന full bundle — ₹5,999. ഒരു artist-ന് വേണ്ടി തയ്യാറാക്കിയത്.";

export const Route = createFileRoute("/personal-support")({
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
  component: PersonalSupportPage,
});

function PersonalSupportPage() {
  useEffect(() => {
    track("support_page_visit");
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Quiet header — no nav, no distractions */}
      <div className="border-b border-border/50 px-5 py-5 text-center sm:px-8">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          {brand.name}
        </p>
      </div>

      {/* 1 — BENEFIT HEADING + VIDEO */}
      <div className="mx-auto w-full max-w-3xl px-5 pt-7 text-center sm:px-6 sm:pt-10">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-primary uppercase">
          Personal Support
        </p>
        <h1 className="text-mal mt-3 text-2xl leading-snug font-bold text-foreground sm:text-3xl md:text-4xl">
          Personal Support benefits എന്തൊക്കെയാണ്?
        </h1>
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 pt-6 sm:px-6">
        <div className="surface-ink rounded-[1.5rem] border border-border p-2 shadow-card sm:p-3">
          <div className="overflow-hidden rounded-[1.15rem]">
            <VslPlayer
              embedUrl={media.supportVideoEmbedUrl}
              placeholderLabel={media.supportVideoPlaceholder}
            />
          </div>
        </div>
        <div className="mt-6">
          <JoinNowInline targetId="offers" />
        </div>
      </div>


      {/* 2 — DESCRIPTION UNDER THE VIDEO */}
      <Section tone="surface">
        <Letter />
        <div className="mt-10">
          <PhotoStrip photo="stage" />
        </div>
      </Section>


      {/* 3 — WHAT'S INSIDE → TODAY'S DATE/TIME → PRICE */}
      <Section id="offers">
        <BundleBreakdown />


        <div className="mx-auto mt-12 max-w-2xl">
          <OfferCountdown />
        </div>

        <div id="pricing" className="mt-8 scroll-mt-6">
          <PricingCards />
        </div>
      </Section>

      {/* 5 — WHY I SHARE THIS OPENLY */}
      <Section>
        <div className="mb-12">
          <PhotoStrip photo="seminar" />
        </div>
        <WhyIShare />
        <div className="mt-10">
          <JoinNowInline />
        </div>
      </Section>

      {/* 6 — DEGREE vs STARTING TODAY */}
      <Section>
        <div className="mb-12">
          <PhotoStrip photo="achievers" />
        </div>
        <EduCompare />
        <div className="mt-10">
          <JoinNowInline />
        </div>
      </Section>


      {/* 8 — RISK REVERSAL */}
      <Section tone="surface">
        <Guarantee />
      </Section>

      {/* 9 — NATURAL DOUBTS */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          Frequently Asked Questions
        </SectionHeading>
        <div className="mt-6">
          <PurchaseFaq />
        </div>
      </Section>

      <Footer />

      <StickyJoinBar revealAfterId="offers" />
    </div>
  );
}

