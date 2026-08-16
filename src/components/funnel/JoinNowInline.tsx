import { ArrowDown } from "lucide-react";

import { track } from "@/lib/track";

/** Mid-page shortcut that scrolls the visitor down to the pricing block. */
export function JoinNowInline({ label = "JOIN NOW" }: { label?: string }) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => {
          track("join_now_inline_click");
          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="text-mal inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 text-sm font-bold tracking-wide text-primary-foreground shadow-glow transition active:scale-[0.99] sm:text-base"
      >
        {label}
        <ArrowDown className="h-4 w-4 shrink-0" />
      </button>
    </div>
  );
}
