import { Play } from "lucide-react";
import { useState } from "react";

import { Placeholder } from "./Placeholder";
import { track, type FunnelEvent } from "@/lib/track";

/**
 * Video container. Never autoplays.
 * Owner: set the embed URL in src/content/funnel.ts (media.*EmbedUrl).
 */
export function VideoFrame({
  embedUrl,
  placeholderLabel,
  playEvent,
}: {
  embedUrl: string;
  placeholderLabel: string;
  playEvent?: FunnelEvent;
}) {
  const [started, setStarted] = useState(false);

  if (!embedUrl) {
    return (
      <Placeholder
        label={placeholderLabel}
        ratio="aspect-video"
        className="bg-foreground/[0.04]"
      />
    );
  }

  if (!started) {
    return (
      <button
        type="button"
        onClick={() => {
          setStarted(true);
          if (playEvent) track(playEvent);
        }}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-foreground/[0.06]"
        aria-label="Play training video"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform group-hover:scale-105">
          <Play className="h-6 w-6" />
        </span>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-foreground/[0.06]">
      <iframe
        src={embedUrl}
        title="Training video"
        className="h-full w-full"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
