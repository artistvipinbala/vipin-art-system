import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Placeholder } from "./Placeholder";
import { track } from "@/lib/track";

/**
 * Distraction-free VSL player.
 * Never autoplays. Calls onGateReached() after the viewer has watched
 * `gateSeconds` of the video (see vsl.gateSeconds in src/content/funnel.ts).
 */
export function VslPlayer({
  embedUrl,
  placeholderLabel,
  gateSeconds = 0,
  onGateReached,
}: {
  embedUrl: string;
  placeholderLabel: string;
  gateSeconds?: number;
  onGateReached?: () => void;
}) {
  const [started, setStarted] = useState(false);
  const gateFired = useRef(false);

  useEffect(() => {
    if (!started) return;
    const id = window.setTimeout(() => {
      if (gateFired.current) return;
      gateFired.current = true;
      track("video_complete");
      onGateReached?.();
    }, gateSeconds * 1000);
    return () => window.clearTimeout(id);
  }, [started, gateSeconds, onGateReached]);

  // No video configured yet: show the placeholder and unlock so the page
  // can still be reviewed end-to-end.
  useEffect(() => {
    if (embedUrl || gateFired.current) return;
    gateFired.current = true;
    onGateReached?.();
  }, [embedUrl, onGateReached]);

  if (!embedUrl) {
    return (
      <Placeholder
        label={placeholderLabel}
        ratio="aspect-video"
        className="bg-ink text-ink-foreground"
      />
    );
  }

  if (!started) {
    return (
      <button
        type="button"
        onClick={() => {
          setStarted(true);
          track("video_play");
        }}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[1.15rem] bg-ink"
        aria-label="Play the training video"
      >
        <span className="flex h-18 w-18 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-105">
          <Play className="h-7 w-7 translate-x-[2px]" />
        </span>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-[1.15rem] bg-ink">
      <iframe
        src={embedUrl}
        title="Artist income system — training"
        className="h-full w-full"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
