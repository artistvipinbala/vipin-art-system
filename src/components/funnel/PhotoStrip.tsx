import achievers from "@/assets/with-achievers.png.asset.json";
import stage from "@/assets/stage-speaking.png.asset.json";
import cutout from "@/assets/vipin-cutout.png.asset.json";

const photos = [
  { src: stage.url, alt: "Artist Vipin Bala speaking on stage" },
  { src: cutout.url, alt: "Artist Vipin Bala presenting at a seminar" },
  { src: achievers.url, alt: "Artist Vipin Bala with fellow achievers" },
];

/** Real moments — quiet credibility, no captions needed. */
export function PhotoStrip() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-center text-[0.6rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
        Real moments
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4">
        {photos.map((p) => (
          <figure
            key={p.src}
            className="overflow-hidden rounded-2xl border border-border/70 bg-secondary/40 shadow-card"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
