import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/funnel/Footer";
import { Navbar } from "@/components/funnel/Navbar";
import { Lead, Section, SectionHeading } from "@/components/funnel/Section";

const title = "Terms & Conditions — Artist Vipin Bala";
const description =
  "Artist Vipin Bala free training funnel — terms and conditions. Owner to finalize the full text.";

export const Route = createFileRoute("/terms")({
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
        <SectionHeading>Terms &amp; Conditions</SectionHeading>
        <Lead>[TERMS &amp; CONDITIONS PLACEHOLDER — OWNER TO FINALIZE]</Lead>
      </Section>
      <Footer />
    </div>
  ),
});
