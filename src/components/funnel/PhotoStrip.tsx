import achievers from "@/assets/with-achievers.png.asset.json";
import stage from "@/assets/stage-speaking.png.asset.json";
import cutout from "@/assets/vipin-cutout.png.asset.json";

const photos = {
  stage: { src: stage.url, alt: "Artist Vipin Bala speaking on stage" },
  seminar: { src: cutout.url, alt: "Artist Vipin Bala presenting at a seminar" },
  achievers: { src: achievers.url, alt: "Artist Vipin Bala with fellow achievers" },
} as const;

export type PhotoKey = keyof typeof photos;

/** One real moment at a time — spread across the page as you scroll. */
export function PhotoStrip({ photo }: { photo: PhotoKey }) {
  const p = photos[photo];
  return (
    <div className="mx-auto max-w-xl">
      <p className="text-center text-[0.6rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
        Real moments
      </p>
      <figure className="mt-4 overflow-hidden rounded-[1.5rem] border border-border/70 bg-secondary/40 shadow-card">
        <img
          src={p.src}
          alt={p.alt}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/10]"
        />
      </figure>
    </div>
  );
}
