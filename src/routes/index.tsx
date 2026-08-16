import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

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
  const [unlocked, setUnlocked] = useState(false);
  const [showIntake, setShowIntake] = useState(false);

  useEffect(() => {
    track("landing_page_visit");
  }, []);

  const onGateReached = useCallback(() => setUnlocked(true), []);

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



  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-6 sm:px-6 sm:py-10">
        {/* First screen — headline + video, vertically centred */}
        <div className="flex min-h-[calc(100svh-3rem)] flex-col justify-center">
        <header className="text-center">
          <p className="text-sky text-[0.6rem] font-bold tracking-[0.18em] uppercase sm:text-[0.68rem]">
            {pageTop.eyebrow}
          </p>

          <h1
            className="text-mal text-gradient-gold mx-auto mt-2 max-w-2xl text-[1.1rem] leading-[1.3] font-extrabold sm:text-[1.7rem]"
            style={{ filter: "drop-shadow(0 2px 18px oklch(0.7 0.188 45.1 / 0.35))" }}
          >
            {pageTop.headline}
          </h1>
          <p className="text-mal mx-auto mt-2 max-w-xl text-[0.74rem] leading-relaxed text-muted-foreground sm:text-sm">
            {pageTop.sub}
          </p>
        </header>

        {/* Video sits in the centre of the first screen */}
        <div className="flex flex-col justify-center py-3">

          <div className="text-center">
            <p className="text-[0.58rem] font-bold tracking-[0.16em] text-primary uppercase">
              {vsl.eyebrow}
            </p>
            <h2 className="text-mal mx-auto mt-2 max-w-2xl text-[0.95rem] leading-[1.35] font-bold sm:text-[1.2rem]">
              {vsl.headline}
            </h2>
          </div>


          <div className="mt-4 rounded-[1.75rem] bg-gradient-gold p-[2px] shadow-glow">
            <div className="overflow-hidden rounded-[1.65rem] bg-background">
              <VslPlayer
                embedUrl={media.trainingVideoEmbedUrl}
                placeholderLabel={media.trainingVideoPlaceholder}
                gateSeconds={vsl.gateSeconds}
                onGateReached={onGateReached}
              />
            </div>
          </div>

          <p className="mt-2 text-center text-[0.66rem] tracking-wide text-muted-foreground/70">
            {vsl.duration}
          </p>
          <p className="text-mal mx-auto mt-2 max-w-xl text-center text-[0.74rem] leading-relaxed text-muted-foreground sm:text-sm">
            {vsl.sub}
          </p>
          <p className="text-mal mx-auto mt-1 max-w-xl text-center text-[0.74rem] leading-relaxed text-muted-foreground sm:text-sm">
            {vsl.belowVideo}
          </p>
        </div>
        </div>




        {/* Appears only after the video has been watched */}
        {unlocked ? (
          <section className="mt-12 rounded-3xl border border-border/70 bg-gradient-card p-6 text-center shadow-card sm:p-8">
            <p className="text-mal text-base font-bold sm:text-lg">{vsl.reveal.line1}</p>
            <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">
              {vsl.reveal.line2}
            </p>
            <button
              type="button"
              onClick={goNext}
              className="text-mal mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-gold px-8 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:brightness-105 sm:w-auto sm:text-base"
            >
              {vsl.reveal.cta}
            </button>
            <p className="text-mal mt-3 text-xs text-muted-foreground">{vsl.reveal.note}</p>
          </section>
        ) : null}

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
