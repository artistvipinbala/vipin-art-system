import { MessageCircle } from "lucide-react";

import { CTAButton } from "./CTAButton";
import { community, links } from "@/content/funnel";
import { track } from "@/lib/track";

export function CommunityCard() {
  const isPlaceholder = links.whatsappCommunity.startsWith("[");

  return (
    <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
      <h3 className="text-mal text-lg font-bold">{community.headline}</h3>
      <p className="text-mal mt-2 text-sm text-muted-foreground">{community.text}</p>
      {isPlaceholder ? (
        <>
          <CTAButton variant="whatsapp" className="mt-5" disabled>
            <MessageCircle className="h-4 w-4" />
            {community.cta}
          </CTAButton>
          <p className="mt-2 text-xs text-muted-foreground">{links.whatsappCommunity}</p>
        </>
      ) : (
        <a
          href={links.whatsappCommunity}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_community_click")}
          className="mt-5 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          {community.cta}
        </a>
      )}
      <p className="text-mal mt-4 text-xs text-muted-foreground">{community.videoAnswers}</p>
    </div>
  );
}
