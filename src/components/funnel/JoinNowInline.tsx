import { ArrowDown } from "lucide-react";

import { track } from "@/lib/track";

/** Mid-page shortcut. With `href` it links out; otherwise scrolls to the pricing block. */
export function JoinNowInline({
  label = "JOIN NOW",
  targetId = "pricing",
  href,
}: {
  label?: string;
  targetId?: string;
  href?: string;
}) {
  const className =
    "text-mal inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 text-sm font-bold tracking-wide text-primary-foreground shadow-glow transition active:scale-[0.99] sm:text-base";

  return (
    <div className="flex justify-center">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("join_now_inline_click")}
          className={className}
        >
          {label}
          <ArrowDown className="h-4 w-4 shrink-0" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => {
            track("join_now_inline_click");
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={className}
        >
          {label}
          <ArrowDown className="h-4 w-4 shrink-0" />
        </button>
      )}
    </div>
  );
}
