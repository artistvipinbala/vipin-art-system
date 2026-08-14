import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { QuickIntake } from "@/components/funnel/QuickIntake";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import { brand, media, pageTop, vsl } from "@/content/funnel";
import { track } from "@/lib/track";


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
    // Ask the short intake questions here, before the offer page.
    try {
      if (window.localStorage.getItem("avb_intake_done") === "1") {
        void navigate({ to: "/personal-support" });
        return;
      }
    } catch {
      /* ignore */
    }
    setShowIntake(true);
    window.setTimeout(() => {
      document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-6 sm:px-6 sm:py-10">
        {/* Top block — headline first, then the video */}
        <header className="pt-2 text-center">
          <p className="text-[0.68rem] font-bold tracking-[0.18em] text-primary uppercase">
            {pageTop.eyebrow}
          </p>
          <h1 className="text-mal mx-auto mt-4 max-w-2xl text-[1.4rem] leading-[1.3] font-extrabold sm:text-[2rem]">
            {pageTop.headline}
          </h1>
          <p className="text-mal mx-auto mt-4 max-w-2xl text-[0.85rem] leading-relaxed text-muted-foreground sm:text-base">
            {pageTop.sub}
          </p>
        </header>

        {/* Video sits in the centre of the first screen */}
        <div className="flex flex-1 flex-col justify-center py-6">
          <div className="text-center">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">
              {vsl.eyebrow}
            </p>
            <h2 className="text-mal mx-auto mt-3 max-w-2xl text-[1.05rem] leading-[1.35] font-bold sm:text-[1.35rem]">
              {vsl.headline}
            </h2>
          </div>


          <div className="mt-5 rounded-[1.75rem] bg-gradient-gold p-[2px] shadow-glow">
            <div className="overflow-hidden rounded-[1.65rem] bg-background">
              <VslPlayer
                embedUrl={media.trainingVideoEmbedUrl}
                placeholderLabel={media.trainingVideoPlaceholder}
                gateSeconds={vsl.gateSeconds}
                onGateReached={onGateReached}
              />
            </div>
          </div>

          <p className="mt-3 text-center text-[0.7rem] tracking-wide text-muted-foreground/70">
            {vsl.duration}
          </p>
          <p className="text-mal mx-auto mt-3 max-w-2xl text-center text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
            {vsl.sub}
          </p>
          <p className="text-mal mx-auto mt-2 max-w-2xl text-center text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
            {vsl.belowVideo}
          </p>
        </div>

        {/* Appears only after the video has been watched */}
        {unlocked && !showIntake ? (
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

        {/* The 5 short questions — asked before the offer page opens */}
        {showIntake ? (
          <section id="intake" className="mt-12">
            <QuickIntake
              onDone={() => {
                window.setTimeout(() => {
                  void navigate({ to: "/personal-support" });
                }, 900);
              }}
            />
          </section>
        ) : null}


        <footer className="pt-10 text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {brand.name}
        </footer>
      </div>
    </main>
  );
}
