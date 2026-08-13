import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/funnel/Footer";
import { Navbar } from "@/components/funnel/Navbar";
import { Lead, Section, SectionHeading } from "@/components/funnel/Section";

const title = "Privacy Policy — Artist Vipin Bala";
const description =
  "Artist Vipin Bala free training funnel — privacy policy. Owner to finalize the full policy text.";

export const Route = createFileRoute("/privacy")({
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
  component: () => (
    <div className="min-h-screen">
      <Navbar />
      <Section>
        <SectionHeading>Privacy Policy</SectionHeading>
        <Lead>[PRIVACY POLICY PLACEHOLDER — OWNER TO FINALIZE]</Lead>
      </Section>
      <Footer />
    </div>
  ),
});
