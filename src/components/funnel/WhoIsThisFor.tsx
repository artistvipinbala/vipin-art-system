import { Check, X } from "lucide-react";

const forYou = [
  "Artwork വരയ്ക്കാൻ അറിയുന്ന artist ആണെങ്കിൽ",
  "Instagram/Facebook-ൽ artworks post ചെയ്യുന്നുണ്ടെങ്കിൽ",
  "Artwork ഉണ്ടെങ്കിലും regular orders കിട്ടുന്നില്ലെങ്കിൽ",
  "Commission works കിട്ടാൻ ആഗ്രഹിക്കുന്നുണ്ടെങ്കിൽ",
  "Art class തുടങ്ങാൻ ആഗ്രഹിക്കുന്നുണ്ടെങ്കിൽ",
  "Already art sell ചെയ്യുന്നുണ്ടെങ്കിലും sales predictable അല്ലെങ്കിൽ",
  "Social media ഉപയോഗിക്കുന്നുണ്ടെങ്കിലും അതിൽ നിന്ന് customers വരുന്നില്ലെങ്കിൽ",
];

const notForYou = [
  "Art പഠിക്കാൻ മാത്രം ആഗ്രഹിക്കുന്ന beginner ആണെങ്കിൽ",
  "Drawing skill improve ചെയ്യാനുള്ള course അന്വേഷിക്കുന്നുണ്ടെങ്കിൽ",
  "“ഒറ്റ ദിവസം കൊണ്ട് income” ഉണ്ടാക്കാനുള്ള shortcut അന്വേഷിക്കുന്നുണ്ടെങ്കിൽ",
];

export function WhoIsThisFor() {
  return (
    <section className="rise-in pt-2 pb-6">
      <div className="rounded-[1.25rem] border border-border bg-card p-5 shadow-card sm:p-7">
        <h2 className="text-mal text-center text-[0.95rem] font-extrabold tracking-wide text-foreground uppercase sm:text-[1.1rem]">
          WHO IS THIS FOR?
        </h2>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-mal mb-3 text-[0.72rem] font-bold tracking-wide text-primary uppercase sm:text-[0.78rem]">
              ഈ training നിങ്ങൾക്കുള്ളതാണ്, നിങ്ങൾ…
            </p>
            <ul className="space-y-2.5">
              {forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.72rem] leading-[1.55] text-foreground/90 sm:text-[0.82rem]">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-muted/30 bg-muted/10 p-4">
            <p className="text-mal mb-3 text-[0.72rem] font-bold tracking-wide text-muted-foreground uppercase sm:text-[0.78rem]">
              ഇത് നിങ്ങൾക്കുള്ളതല്ല, നിങ്ങൾ…
            </p>
            <ul className="space-y-2.5">
              {notForYou.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.72rem] leading-[1.55] text-muted-foreground sm:text-[0.82rem]">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted/40">
                    <X className="h-2.5 w-2.5 text-muted-foreground" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
