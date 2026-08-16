import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { QuickIntake } from "@/components/funnel/QuickIntake";
import { ResultsSection } from "@/components/funnel/ResultsSection";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import { brand, media, pageTop, vsl } from "@/content/funnel";
import { track } from "@/lib/track";
import { Dialog, DialogContent } from "@/components/ui/dialog";


const title = "Artwork & Art Class Sales System — Artist Vipin Bala";
const description =
  "ഞാൻ എന്റെ artwork-കളും art class-കളും എങ്ങനെ sell ചെയ്യുന്നു — ആ full system ഒരു video-യിൽ open ആയി. Webinar അല്ല, registration വേണ്ട.";

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

function LandingPage() {
  const navigate = useNavigate();
  const [showIntake, setShowIntake] = useState(false);

  useEffect(() => {
    track("landing_page_visit");
  }, []);

  const goNext = () => {
    track("personal_support_click");
    try {
      window.sessionStorage.setItem("vb_from_video", "1");
    } catch {
      /* ignore */
    }
    // Ask the short intake questions here, in a popup, before the offer page.
    setShowIntake(true);
  };



  const headlineParts = pageTop.headline.split("Income");

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8 sm:px-8 sm:py-14">
        {/* ── First fold: eyebrow → headline → promise → badge → curiosity → video ── */}
        <section className="rise-in flex flex-col justify-center pb-4">
          <header className="text-center">
            <p className="text-[0.58rem] font-semibold tracking-[0.28em] text-sky uppercase sm:text-[0.66rem]">
              {pageTop.eyebrow}
            </p>

            <span className="mx-auto mt-5 block h-px w-12 bg-border" />

            <h1 className="text-mal mx-auto mt-5 max-w-2xl text-[1.32rem] leading-[1.5] font-extrabold text-foreground sm:text-[2rem]">
              {headlineParts[0]}
              {headlineParts.length > 1 && (
                <>
                  <span className="text-primary">Income</span>
                  {headlineParts.slice(1).join("Income")}
                </>
              )}
            </h1>

            <p className="text-mal mx-auto mt-4 max-w-xl text-[0.82rem] leading-[1.85] text-muted-foreground sm:text-[0.95rem]">
              {pageTop.sub}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[0.58rem] font-semibold tracking-[0.16em] text-secondary-foreground uppercase shadow-soft sm:text-[0.64rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {vsl.eyebrow}
            </span>
          </header>

          {/* Curiosity statement, right before the video */}
          <div className="mt-9 text-center">
            <h2 className="text-mal mx-auto max-w-2xl text-[1.02rem] leading-[1.6] font-bold text-foreground sm:text-[1.32rem]">
              {vsl.headline}
            </h2>
          </div>

          {/* Video stage — the focal point of the page */}
          <div className="mt-8">
            <p className="mb-3 text-center text-[0.56rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase sm:text-[0.62rem]">
              Free Training · Approx. 30 Minutes
            </p>

            <div className="surface-ink rounded-[1.5rem] border border-border p-2 shadow-card sm:p-3">
              <div className="overflow-hidden rounded-[1.15rem]">
                <VslPlayer
                  embedUrl={media.trainingVideoEmbedUrl}
                  placeholderLabel={media.trainingVideoPlaceholder}
                />
              </div>
            </div>

            <p className="mt-3 text-center text-[0.66rem] tracking-wide text-muted-foreground">
              {vsl.duration}
            </p>
          </div>
        </section>

        {/* ── Why this training matters + personal support CTA ── */}
        <section className="pb-10">
          <div className="rounded-[1.5rem] border border-border bg-card p-6 text-center shadow-card sm:p-8">
            <p className="text-mal text-[0.92rem] leading-[1.7] font-bold text-foreground sm:text-[1.05rem]">
              {vsl.reveal.line1}
            </p>
            <p className="text-mal mx-auto mt-3 max-w-xl text-[0.82rem] leading-[1.85] text-muted-foreground sm:text-[0.9rem]">
              {vsl.reveal.line2}
            </p>
            <p className="text-mal mx-auto mt-3 max-w-xl text-[0.82rem] leading-[1.85] text-muted-foreground sm:text-[0.9rem]">
              {vsl.belowVideo}
            </p>

            <button
              type="button"
              onClick={goNext}
              className="text-mal mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-primary px-8 text-[0.82rem] font-bold text-primary-foreground shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:w-auto sm:text-[0.92rem]"
            >
              {vsl.reveal.cta}
            </button>

            <p className="text-mal mx-auto mt-4 max-w-xl text-[0.74rem] leading-[1.8] text-muted-foreground/90">
              {vsl.reveal.note}
            </p>
          </div>
        </section>



        {/* The 5 short questions — asked in a popup before the offer page opens */}
        <Dialog open={showIntake} onOpenChange={setShowIntake}>
          <DialogContent
            
            className="max-h-[92svh] w-[calc(100vw-1.5rem)] max-w-lg overflow-y-auto border-none bg-transparent p-0 shadow-none sm:max-w-lg"
          >
            <QuickIntake
              onDone={() => {
                window.setTimeout(() => {
                  void navigate({ to: "/personal-support" });
                }, 900);
              }}
            />
          </DialogContent>
        </Dialog>


        <ResultsSection onSupportClick={goNext} />

        <footer className="pt-10 text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {brand.name}
        </footer>
      </div>
    </main>
  );
}
