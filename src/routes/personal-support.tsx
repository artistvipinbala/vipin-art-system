import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

import { ComparisonTable } from "@/components/funnel/ComparisonTable";
import { CostOfAlone } from "@/components/funnel/CostOfAlone";
import { Footer } from "@/components/funnel/Footer";
import { Guarantee } from "@/components/funnel/Guarantee";
import { Navbar } from "@/components/funnel/Navbar";
import { PricingCards } from "@/components/funnel/PricingCards";
import { ProofSection } from "@/components/funnel/ProofSection";
import { PurchaseFaq } from "@/components/funnel/PurchaseFaq";
import { Eyebrow, Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { SupportForm } from "@/components/funnel/SupportForm";
import { Testimonials } from "@/components/funnel/Testimonials";
import { ValueStack } from "@/components/funnel/ValueStack";
import { VideoFrame } from "@/components/funnel/VideoSection";
import { intake, media, salesPage, whoFor } from "@/content/funnel";
import { track } from "@/lib/track";

const title = "Personal Support — Artist Income System | Vipin Bala";
const description =
  "Implementation ആണ് challenge. Direct guidance-ഓടെ artist income system faster ആയി implement ചെയ്യാൻ optional personal support option.";

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
      <Navbar />

      <Section tone="surface">
        <Eyebrow>Optional Personal Support</Eyebrow>
        <SectionHeading>{salesPage.headline}</SectionHeading>
        <Lead>{salesPage.sub}</Lead>

        {/* Extra offer — revealed only on this page, never on the video page */}
        <div className="mt-8">
          <SpecialOffer />
        </div>

        <div className="mt-8">
          <a
            href="#offers"
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-gradient-gold px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-glow sm:w-auto"
          >
            SEE OPTIONS & PRICING
          </a>
        </div>
      </Section>

      {/* SHORT EXPLAINER VIDEO */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          Personal Support എന്താണ് — ഒരു short video
        </SectionHeading>
        <div className="mt-6">
          <VideoFrame
            embedUrl={media.supportVideoEmbedUrl}
            placeholderLabel={media.supportVideoPlaceholder}
          />
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
          <p className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
            In this video, Vipin explains
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {salesPage.videoOutline.map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* COST OF DOING IT ALONE */}
      <CostOfAlone />

      {/* PROOF */}
      <ProofSection />
      <Testimonials />

      {/* VALUE ANCHOR + PRICE */}
      <Section id="offers">
        <SectionHeading className="text-xl sm:text-2xl">
          ഇതിന്റെ യഥാർത്ഥ value എത്രയാണ്?
        </SectionHeading>
        <div className="mt-8">
          <ValueStack />
        </div>
        <div className="mt-12">
          <SectionHeading className="text-xl sm:text-2xl">
            നിങ്ങൾക്ക് രണ്ട് options ഉണ്ട്
          </SectionHeading>
          <div className="mt-8">
            <PricingCards />
          </div>
          <p className="text-mal mt-5 text-xs text-muted-foreground">
            {intake.limitLabel}: {intake.limit} · Next batch: {intake.nextBatch}
          </p>
        </div>
      </Section>

      {/* RISK REVERSAL */}
      <Section tone="surface">
        <div>
          <Guarantee />
        </div>
      </Section>

      {/* COMPARISON */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          ഒറ്റയ്ക്ക് vs Self-Paced vs Personal Support
        </SectionHeading>
        <div className="mt-6">
          <ComparisonTable />
        </div>
      </Section>

      {/* WHO IS THIS FOR */}
      <Section tone="surface">
        <SectionHeading className="text-xl sm:text-2xl">Who is this for?</SectionHeading>
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

      {/* OBJECTION HANDLING */}
      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          വാങ്ങുന്നതിന് മുൻപ് സാധാരണ ചോദിക്കുന്ന ചോദ്യങ്ങൾ
        </SectionHeading>
        <div className="mt-6">
          <PurchaseFaq />
        </div>
      </Section>

      {/* APPLICATION FORM */}
      <Section id="apply" tone="surface">
        <SectionHeading className="text-xl sm:text-2xl">
          Personal Support-ന് apply ചെയ്യാം
        </SectionHeading>
        <Lead>
          Batch limited ആയതുകൊണ്ട് നിങ്ങളുടെ situation ആദ്യം അറിയണം. ഈ ചോദ്യങ്ങൾക്ക് ഉത്തരം
          തന്നാൽ ഞാൻ personally നോക്കി WhatsApp-ൽ reply ചെയ്യും.
        </Lead>
        <div className="mt-6">
          <SupportForm onDone={() => undefined} />
        </div>
      </Section>

      <Footer />
    </div>
  );
}
