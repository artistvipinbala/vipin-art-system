import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";

import { CommunityCard } from "@/components/funnel/CommunityCard";
import { Footer } from "@/components/funnel/Footer";
import { Navbar } from "@/components/funnel/Navbar";
import { Lead, Section, SectionHeading } from "@/components/funnel/Section";

const title = "Thank You — Artist Vipin Bala";
const description =
  "നിങ്ങളുടെ വിവരങ്ങൾ ലഭിച്ചു. അടുത്ത steps ഇവിടെ കാണാം — free artist growth community, course options.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Section>
        <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-primary uppercase">
          <BadgeCheck className="h-5 w-5" /> Received
        </p>
        <SectionHeading className="mt-3">
          Thank you! നിങ്ങളുടെ വിവരങ്ങൾ ലഭിച്ചു.
        </SectionHeading>
        <Lead>
          ഞാൻ personally review ചെയ്യും. അടുത്തതായി എന്ത് ചെയ്യാം എന്ന് താഴെ കാണാം.
          [ONBOARDING DETAILS PLACEHOLDER — OWNER TO FINALIZE]
        </Lead>
        <div className="mt-8">
          <CommunityCard />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/personal-support"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold tracking-wide text-primary-foreground"
          >
            SEE COURSE &amp; SUPPORT OPTIONS
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-13 items-center justify-center rounded-full border-2 border-border bg-card px-6 text-sm font-bold tracking-wide"
          >
            BACK TO TRAINING
          </Link>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
