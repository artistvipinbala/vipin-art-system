import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { QuickIntake } from "@/components/funnel/QuickIntake";
import { ResultsSection } from "@/components/funnel/ResultsSection";
import { VslPlayer } from "@/components/funnel/VslPlayer";
import { brand, media, milestones, pageTop, vsl } from "@/content/funnel";
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
        <div className="flex min-h-[calc(100svh-3rem)] flex-col justify-center gap-5">
          <header className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/25 bg-sky/10 px-3 py-1 text-[0.55rem] font-bold tracking-[0.16em] text-sky uppercase sm:text-[0.62rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              {pageTop.eyebrow}
            </span>

            <h1
              className="text-mal text-gradient-gold mx-auto mt-3 max-w-[19rem] text-[1.22rem] leading-[1.32] font-extrabold sm:max-w-2xl sm:text-[1.85rem]"
              style={{ filter: "drop-shadow(0 2px 22px oklch(0.7 0.188 45.1 / 0.32))" }}
            >
              {pageTop.headline}
            </h1>
            <p className="text-mal mx-auto mt-2.5 max-w-[21rem] text-[0.76rem] leading-relaxed text-muted-foreground sm:max-w-xl sm:text-sm">
              {pageTop.sub}
            </p>
          </header>

          {/* Video — the focal point of the first screen */}
          <div className="flex flex-col">
            <div className="relative rounded-[1.75rem] bg-gradient-gold p-[1.5px] shadow-glow">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl"
                style={{ background: "var(--gradient-gold)", opacity: 0.18 }}
              />
              <div className="overflow-hidden rounded-[1.65rem] bg-background">
                <VslPlayer
                  embedUrl={media.trainingVideoEmbedUrl}
                  placeholderLabel={media.trainingVideoPlaceholder}
                  gateSeconds={vsl.gateSeconds}
                  onGateReached={onGateReached}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.6rem] font-semibold tracking-[0.1em] text-muted-foreground/80 uppercase">
              <span>{vsl.duration}</span>
              <span className="text-primary/60">•</span>
              <span>{vsl.eyebrow}</span>
            </div>

            <p className="text-mal mx-auto mt-3 max-w-[22rem] text-center text-[0.76rem] leading-relaxed text-muted-foreground sm:max-w-xl sm:text-sm">
              {vsl.sub}
            </p>
          </div>
        </div>


        {/* Achievements so far */}
        <section className="mt-10 rounded-3xl border border-border/70 bg-gradient-card p-5 shadow-card sm:p-7">
          <p className="text-center text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">
            {milestones.eyebrow}
          </p>
          <h2 className="text-mal mx-auto mt-3 max-w-xl text-center text-[1.05rem] leading-[1.35] font-bold sm:text-[1.3rem]">
            {milestones.headline}
          </h2>
          <p className="text-mal mx-auto mt-3 max-w-xl text-center text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
            {milestones.sub}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {milestones.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-background/40 px-4 py-4 text-center"
              >
                <p className="text-[1.15rem] font-extrabold text-primary sm:text-[1.35rem]">
                  {item.value}
                </p>
                <p className="text-mal mt-1 text-[0.72rem] leading-snug text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-mal mt-5 text-center text-[0.72rem] text-muted-foreground/80">
            {milestones.note}
          </p>
        </section>

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
