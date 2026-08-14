import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { EduCompare } from "@/components/funnel/EduCompare";
import { Footer } from "@/components/funnel/Footer";
import { Guarantee } from "@/components/funnel/Guarantee";
import { Letter } from "@/components/funnel/Letter";
import { OfferCountdown } from "@/components/funnel/OfferCountdown";
import { PricingCards } from "@/components/funnel/PricingCards";
import { PurchaseFaq } from "@/components/funnel/PurchaseFaq";
import { QuickIntake } from "@/components/funnel/QuickIntake";
import { Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { SpecialOffer } from "@/components/funnel/SpecialOffer";
import { StickyJoinBar } from "@/components/funnel/StickyJoinBar";
import { ValueStack } from "@/components/funnel/ValueStack";
import { WhyIShare } from "@/components/funnel/WhyIShare";
import { WhyPayment } from "@/components/funnel/WhyPayment";
import { brand, intake, offers } from "@/content/funnel";
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
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    track("support_page_visit");
    try {
      if (window.localStorage.getItem("avb_intake_done") === "1") setRevealed(true);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Quiet header — no nav, no distractions */}
      <div className="border-b border-border/50 px-5 py-5 text-center sm:px-8">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          {brand.name}
        </p>
      </div>

      {/* 1 — PERSONAL LETTER */}
      <Section tone="surface">
        <Letter />
      </Section>

      {/* 2 — THE ONLY FORM: 5 questions, before any price */}
      <Section id="apply">
        <div className="mx-auto max-w-xl">
          <QuickIntake
            onDone={() => {
              setRevealed(true);
              window.setTimeout(() => {
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
          />
        </div>
      </Section>

      {revealed ? (
        <>
          {/* 3 — WHAT'S INSIDE → TODAY'S WINDOW → PRICE */}
          <Section id="offers" tone="surface">
            <SectionHeading className="text-xl sm:text-2xl">
              നിങ്ങൾക്ക് എന്തൊക്കെ കിട്ടും
            </SectionHeading>
            <div className="mt-8">
              <ValueStack />
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <OfferCountdown />
            </div>

            <div className="mt-8">
              <SectionHeading className="text-xl sm:text-2xl">
                ഒരു price. എല്ലാ support-ഉം ഉള്ളിൽ.
              </SectionHeading>
              <Lead>
                Options ഇല്ല, upsell ഇല്ല. {offers.everything.price} — അതിൽ എല്ലാം ഉണ്ട്.
              </Lead>
              <div className="mt-8">
                <PricingCards />
              </div>
              <p className="text-mal mt-5 text-center text-xs text-muted-foreground">
                {intake.note}
              </p>
            </div>
          </Section>

          {/* 4 — EXTRA FOR THOSE WHO START TODAY */}
          <Section>
            <div className="mx-auto max-w-2xl">
              <SpecialOffer />
            </div>
          </Section>

          {/* 5 — WHY I SHARE THIS OPENLY */}
          <Section tone="surface">
            <WhyIShare />
          </Section>

          {/* 6 — WHY THERE IS A PRICE AT ALL */}
          <Section>
            <WhyPayment />
          </Section>

          {/* 7 — DEGREE vs STARTING TODAY */}
          <Section tone="surface">
            <EduCompare />
          </Section>

          {/* 8 — RISK REVERSAL */}
          <Section>
            <Guarantee />
          </Section>

          {/* 9 — NATURAL DOUBTS */}
          <Section tone="surface">
            <SectionHeading className="text-xl sm:text-2xl">
              മനസ്സിൽ വരുന്ന സ്വാഭാവിക സംശയങ്ങൾ
            </SectionHeading>
            <div className="mt-6">
              <PurchaseFaq />
            </div>
          </Section>
        </>
      ) : null}

      <Footer />

      {revealed ? <StickyJoinBar /> : null}
    </div>
  );
}
