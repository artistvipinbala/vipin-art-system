import { Play } from "lucide-react";
import { useState } from "react";

import proudVideo from "@/assets/proud-reel.mp4.asset.json";
import { results, vsl } from "@/content/funnel";

function SupportCta({ onClick }: { onClick?: (() => void) | undefined }) {
  if (!onClick) return null;
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        onClick={onClick}
        className="text-mal inline-flex min-h-13 w-full items-center justify-center rounded-full bg-gradient-gold px-7 text-[0.8rem] font-bold text-primary-foreground shadow-glow transition-all hover:brightness-105 sm:w-auto sm:text-sm"
      >
        {vsl.reveal.cta}
      </button>
      <p className="text-mal mt-2 text-[0.7rem] text-muted-foreground">{vsl.reveal.note}</p>
    </div>
  );
}

function Gallery({ items }: { items: { src: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 shadow-card"
        >
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <figcaption className="px-2 py-2 text-center text-[0.62rem] font-semibold tracking-wide text-muted-foreground uppercase">
            {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ResultsSection({ onSupportClick }: { onSupportClick?: () => void }) {
  const [playing, setPlaying] = useState(false);
  const videoUrl = results.proud.videoUrl || proudVideo.url;

  return (
    <section className="mt-16 border-t border-border/60 pt-12">
      <div className="text-center">
        <p className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">
          {results.eyebrow}
        </p>
        <h2 className="text-mal mx-auto mt-3 max-w-2xl text-[1.15rem] leading-[1.35] font-bold sm:text-[1.5rem]">
          {results.headline}
        </h2>
        <p className="text-mal mx-auto mt-3 max-w-2xl text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
          {results.sub}
        </p>
      </div>

      {/* Proud moment */}
      <div className="mt-10 rounded-3xl border border-border/70 bg-gradient-card p-4 shadow-card sm:p-6">
        <p className="text-center text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">
          {results.proud.eyebrow}
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:items-center">
          <div>
            {playing ? (
              <video
                src={videoUrl}
                poster={results.proud.poster}
                controls
                autoPlay
                playsInline
                className="aspect-[3/4] w-full rounded-2xl bg-foreground/[0.06] object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play proud moment video"
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-foreground/[0.06]"
              >
                <img
                  src={results.proud.poster}
                  alt={results.proud.caption}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
                    <Play className="h-6 w-6 translate-x-[2px]" />
                  </span>
                </span>
              </button>
            )}
            <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">
              {results.proud.caption}
            </p>
          </div>
          <div className="text-mal space-y-3 text-[0.85rem] leading-relaxed sm:text-sm">
            <p>{results.proud.quote}</p>
            <p className="text-muted-foreground">{results.proud.quote2}</p>
            <p className="pt-2 text-sm font-bold text-primary">{results.proud.signature}</p>
          </div>
        </div>
      </div>

      <SupportCta onClick={onSupportClick} />

      {/* Artworks */}
      <div className="mt-10">
        <p className="mb-4 text-center text-[0.62rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Artworks
        </p>
        <Gallery items={results.artworks} />
      </div>

      <SupportCta onClick={onSupportClick} />

      {/* Moments */}
      <div className="mt-10">
        <p className="mb-4 text-center text-[0.62rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Moments
        </p>
        <Gallery items={results.achievements} />
      </div>

      <SupportCta onClick={onSupportClick} />
    </section>
  );
}
