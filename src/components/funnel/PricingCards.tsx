import { Check } from "lucide-react";
import { useState } from "react";

import { CTAButton } from "./CTAButton";
import { PaymentModal } from "./PaymentModal";
import { offers } from "@/content/funnel";
import { track } from "@/lib/track";

export function PricingCards() {
  const [plan, setPlan] = useState<null | { name: string; price: string }>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <PlanCard
          tag={offers.selfPaced.tag}
          title={offers.selfPaced.title}
          price={offers.selfPaced.price}
          includes={offers.selfPaced.includes}
          cta={`${offers.selfPaced.cta} — ${offers.selfPaced.price}`}
          onClick={() => {
            track("course_purchase_click");
            setPlan({ name: offers.selfPaced.title, price: offers.selfPaced.price });
          }}
        />
        <PlanCard
          highlight
          tag={offers.personal.tag}
          title={offers.personal.title}
          price={offers.personal.price}
          includes={offers.personal.includes}
          footnote={`Personal Support Duration: ${offers.supportDuration}`}
          cta={`${offers.personal.cta} — ${offers.personal.price}`}
          onClick={() => {
            track("support_purchase_click");
            setPlan({ name: offers.personal.title, price: offers.personal.price });
          }}
        />
      </div>
      <PaymentModal
        open={plan !== null}
        onOpenChange={(open) => !open && setPlan(null)}
        planName={plan?.name ?? ""}
        price={plan?.price ?? ""}
      />
    </>
  );
}

function PlanCard({
  tag,
  title,
  price,
  includes,
  cta,
  onClick,
  footnote,
  highlight,
}: {
  tag: string;
  title: string;
  price: string;
  includes: string[];
  cta: string;
  onClick: () => void;
  footnote?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "bg-gradient-card flex flex-col rounded-3xl border p-6 sm:p-8 " +
        (highlight ? "border-primary/70 shadow-glow" : "border-border shadow-card")
      }
    >

      <span className="text-xs font-bold tracking-[0.15em] text-muted-foreground">{tag}</span>
      <h3 className="text-mal mt-3 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-3xl font-extrabold">{price}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footnote ? <p className="mt-5 text-xs text-muted-foreground">{footnote}</p> : null}
      <CTAButton
        variant={highlight ? "primary" : "outline"}
        className="mt-6 w-full"
        onClick={onClick}
      >
        {cta}
      </CTAButton>
    </div>
  );
}
