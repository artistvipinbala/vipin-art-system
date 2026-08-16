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
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    track("landing_page_visit");
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pt-6 pb-24 sm:px-8 sm:py-10 md:pb-10">
        {/* ── First fold: eyebrow → headline → promise → badge → video intro → video ── */}
        <section className="rise-in flex flex-col justify-center">
          <header className="text-center">
            <p className="text-[0.56rem] font-semibold tracking-[0.26em] text-sky uppercase sm:text-[0.64rem]">
              {pageTop.eyebrow}
            </p>

            <h1 className="text-mal mx-auto mt-3 max-w-2xl text-[1.28rem] leading-[1.45] font-extrabold text-foreground sm:text-[1.9rem]">
              {headlineParts[0]}
              {headlineParts.length > 1 && (
                <>
                  <span className="text-primary">Income</span>
                  {headlineParts.slice(1).join("Income")}
                </>
              )}
            </h1>

            <p className="text-mal mx-auto mt-3 max-w-xl text-[0.8rem] leading-[1.75] text-muted-foreground sm:text-[0.92rem]">
              {pageTop.sub}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.55rem] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-soft sm:text-[0.6rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {vsl.eyebrow}
            </span>
          </header>

          {/* Curiosity statement, right before the video */}
          <h2 className="text-mal mx-auto mt-5 max-w-2xl text-center text-[0.96rem] leading-[1.55] font-bold text-foreground sm:text-[1.22rem]">
            {vsl.headline}
          </h2>

          {/* Video stage — the focal point of the page */}
          <div className="mt-4">
            <p className="mb-2 text-center text-[0.54rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-[0.6rem]">
              Free Training · Approx. 30 Minutes
            </p>

            <div className="surface-ink rounded-[1.25rem] border border-border/80 p-1.5 shadow-card">
              <div className="overflow-hidden rounded-[1rem] ring-1 ring-primary/15">
                <VslPlayer
                  embedUrl={media.trainingVideoEmbedUrl}
                  placeholderLabel={media.trainingVideoPlaceholder}
                />
              </div>
            </div>

            <p className="mt-2 text-center text-[0.64rem] tracking-wide text-muted-foreground">
              {vsl.duration}
            </p>
          </div>
        </section>

        {/* ── CTA directly below the video ── */}
        <section className="pt-4 pb-8">
          <div className="rounded-[1.25rem] border border-border bg-card p-5 text-center shadow-card sm:p-7">
            <p className="text-mal text-[0.9rem] leading-[1.65] font-bold text-foreground sm:text-[1.02rem]">
              {vsl.reveal.line1}
            </p>

            <button
              type="button"
              onClick={goNext}
              className="text-mal mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-primary px-8 text-[0.82rem] font-bold text-primary-foreground shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 sm:w-auto sm:text-[0.92rem]"
            >
              {vsl.reveal.cta}
            </button>

            <p className="text-mal mx-auto mt-3 max-w-xl text-[0.72rem] leading-[1.75] text-muted-foreground/90">
              {vsl.reveal.note}
            </p>

            <div className="mt-5 space-y-2 border-t border-border/70 pt-5">
              <p className="text-mal mx-auto max-w-xl text-[0.8rem] leading-[1.8] text-muted-foreground sm:text-[0.88rem]">
                {vsl.reveal.line2}
              </p>
              <p className="text-mal mx-auto max-w-xl text-[0.8rem] leading-[1.8] text-muted-foreground sm:text-[0.88rem]">
                {vsl.belowVideo}
              </p>
            </div>
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
