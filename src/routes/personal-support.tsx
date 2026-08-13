import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ComparisonTable } from "@/components/funnel/ComparisonTable";
import { Footer } from "@/components/funnel/Footer";
import { Navbar } from "@/components/funnel/Navbar";
import { PricingCards } from "@/components/funnel/PricingCards";
import { Eyebrow, Lead, Section, SectionHeading } from "@/components/funnel/Section";
import { SupportForm } from "@/components/funnel/SupportForm";
import { VideoFrame } from "@/components/funnel/VideoSection";
import { media, salesPage, whoFor } from "@/content/funnel";
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
  const [qualified, setQualified] = useState(false);

  useEffect(() => {
    track("support_form_started");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <Section tone="surface">
        <Eyebrow>Optional Personal Support</Eyebrow>
        <SectionHeading>{salesPage.headline}</SectionHeading>
        <Lead>{salesPage.sub}</Lead>
      </Section>

      <Section>
        <SectionHeading className="text-xl sm:text-2xl">
          ആദ്യം കുറച്ച് ചോദ്യങ്ങൾ — നിങ്ങളുടെ situation മനസ്സിലാക്കാൻ
        </SectionHeading>
        <div className="mt-6">
          <SupportForm onDone={() => setQualified(true)} />
        </div>
      </Section>

      {qualified ? (
        <>
          <Section tone="surface">
            <SectionHeading className="text-xl sm:text-2xl">
              Personal Support എന്താണ് — ഒരു short video
            </SectionHeading>
            <div className="mt-6">
              <VideoFrame
                embedUrl={media.supportVideoEmbedUrl}
                placeholderLabel={media.supportVideoPlaceholder}
              />
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
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

          <Section>
            <SectionHeading className="text-xl sm:text-2xl">
              നിങ്ങൾക്ക് രണ്ട് options ഉണ്ട്
            </SectionHeading>
            <div className="mt-8">
              <PricingCards />
            </div>
          </Section>

          <Section tone="surface">
            <SectionHeading className="text-xl sm:text-2xl">
              Self-Paced vs Personal Support
            </SectionHeading>
            <div className="mt-6">
              <ComparisonTable />
            </div>
          </Section>

          <Section>
            <SectionHeading className="text-xl sm:text-2xl">Who is this for?</SectionHeading>
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
        </>
      ) : null}

      <Footer />
    </div>
  );
}
