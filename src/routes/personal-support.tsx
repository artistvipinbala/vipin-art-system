import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

import { ComparisonTable } from "@/components/funnel/ComparisonTable";
import { CostOfAlone } from "@/components/funnel/CostOfAlone";
import { EduCompare } from "@/components/funnel/EduCompare";
import { Footer } from "@/components/funnel/Footer";
import { Guarantee } from "@/components/funnel/Guarantee";
import { Letter } from "@/components/funnel/Letter";
import { PricingCards } from "@/components/funnel/PricingCards";
import { ProofSection } from "@/components/funnel/ProofSection";
import { PurchaseFaq } from "@/components/funnel/PurchaseFaq";
import { Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { SpecialOffer } from "@/components/funnel/SpecialOffer";
import { SupportForm } from "@/components/funnel/SupportForm";
import { Testimonials } from "@/components/funnel/Testimonials";
import { ValueStack } from "@/components/funnel/ValueStack";
import { brand, intake, offers, whoFor } from "@/content/funnel";
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
    <div className="min-h-screen">
      {/* Quiet header — no nav, no distractions */}
      <div className="border-b border-border/50 px-5 py-5 text-center sm:px-8">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
          {brand.name}
        </p>
      </div>

      {/* PERSONAL LETTER */}
      <Section tone="surface">
        <Letter />
      </Section>

      {/* WHAT HAPPENS WHEN YOU DO IT ALONE */}
      <CostOfAlone />

      {/* THE HONEST MATH: normal education vs starting today */}
      <Section>
        <EduCompare />
      </Section>

      {/* PROOF */}
      <ProofSection />
      <Testimonials />

      {/* BUNDLE VALUE → PRICE */}
      <Section id="offers" tone="surface">
        <SectionHeading className="text-xl sm:text-2xl">
          ഇതിനുള്ളിൽ എന്തൊക്കെയുണ്ട്
        </SectionHeading>
        <div className="mt-8">
          <ValueStack />
        </div>

        <div className="mt-14">
          <SectionHeading className="text-xl sm:text-2xl">
            ഒരു price. എല്ലാ support-ഉം ഉള്ളിൽ.
          </SectionHeading>
          <Lead>
            ഇതിൽ options ഇല്ല, upsell ഇല്ല. {offers.everything.price} — അതിൽ എല്ലാം ഉണ്ട്.
          </Lead>
          <div className="mx-auto mt-8 max-w-2xl">
            <OfferCountdown
              onExpiredCta={() => {
                document
                  .getElementById("apply")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
          <div className="mt-8">
            <PricingCards />
          </div>
          <p className="text-mal mt-5 text-center text-xs text-muted-foreground">
            {intake.note}
          </p>
        </div>

      </Section>

      {/* EXTRA FOR THOSE WHO START NOW — only on this page */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <SpecialOffer />
        </div>
      </Section>

      {/* RISK REVERSAL */}
      <Section tone="surface">
        <Guarantee />
      </Section>

      {/* ALONE VS WITH ME */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          ഒറ്റയ്ക്ക് ചെയ്യുന്നതും ഒപ്പം ഞാൻ ഉള്ളതും
        </SectionHeading>
        <div className="mt-6">
          <ComparisonTable />
        </div>
      </Section>

      {/* WHO IS THIS FOR */}
      <Section tone="surface">
        <SectionHeading className="text-xl sm:text-2xl">
          ഇത് ആർക്കുവേണ്ടിയാണ്
        </SectionHeading>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
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
          <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
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

      {/* OBJECTIONS */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          മനസ്സിൽ വരുന്ന സ്വാഭാവിക സംശയങ്ങൾ
        </SectionHeading>
        <div className="mt-6">
          <PurchaseFaq />
        </div>
      </Section>

      {/* SOFT CONTACT — not a gate */}
      <Section id="apply" tone="surface">
        <SectionHeading className="text-xl sm:text-2xl">
          ഇനിയും ഒരു സംശയം ബാക്കിയുണ്ടോ?
        </SectionHeading>
        <Lead>
          വാങ്ങാൻ ഈ form പൂരിപ്പിക്കേണ്ട ആവശ്യമില്ല. നിങ്ങളുടെ situation എഴുതിയാൽ ഞാൻ personally
          നോക്കി WhatsApp-ൽ സത്യസന്ധമായി reply ചെയ്യും — ഇത് നിങ്ങൾക്ക് ചേരില്ല എന്നാണെങ്കിൽ
          അതും പറയും.
        </Lead>
        <div className="mt-6">
          <SupportForm onDone={() => undefined} />
        </div>
      </Section>

      <Footer />
    </div>
  );
}
