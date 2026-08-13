import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, BadgeCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CTAButton } from "./CTAButton";
import { supportForm } from "@/content/funnel";
import { getCampaignParams } from "@/lib/campaign";
import { submitSupportApplication } from "@/lib/leads.functions";
import { supportApplicationSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const steps = supportForm.steps;

export function SupportForm({ onDone }: { onDone: () => void }) {
  const submit = useServerFn(submitSupportApplication);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = steps[step]!;
  const value = answers[current.key] ?? "";

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <p className="flex items-center gap-2 text-mal text-base font-semibold sm:text-lg">
          <BadgeCheck className="h-5 w-5 text-primary" /> Thank you! നിങ്ങളുടെ വിവരങ്ങൾ ലഭിച്ചു.
        </p>
        <p className="text-mal mt-2 text-sm text-muted-foreground">
          താഴെയുള്ള video കണ്ട് options നോക്കാം.
        </p>
      </div>
    );
  }

  function next() {
    if (!value.trim()) {
      setError("ഈ field പൂരിപ്പിക്കണം.");
      return;
    }
    if (current.key === "whatsapp" && value.trim().length < 8) {
      setError("Enter a valid WhatsApp number");
      return;
    }
    setError("");
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    void finish();
  }

  async function finish() {
    const parsed = supportApplicationSchema.safeParse({
      name: answers["name"],
      whatsapp_number: answers["whatsapp"],
      current_stage: answers["current_stage"],
      biggest_challenge: answers["biggest_challenge"],
      desired_support: answers["desired_support"],
      seriousness: answers["seriousness"],
      ...getCampaignParams(),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your answers.");
      return;
    }
    setBusy(true);
    try {
      await submit({ data: parsed.data });
      track("support_form_completed");
      setDone(true);
      onDone();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
      onFocus={() => track("support_form_started")}
    >
      <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <span>
          Step {step + 1} / {steps.length}
        </span>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        ) : null}
      </div>
      <Progress value={((step + 1) / steps.length) * 100} className="mt-3 h-1.5" />

      <h3 className="text-mal mt-6 text-lg font-bold sm:text-xl">{current.label}</h3>

      {current.type === "text" ? (
        <Input
          value={value}
          inputMode={current.key === "whatsapp" ? "tel" : "text"}
          onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
          className="mt-4 min-h-12 rounded-xl bg-card"
          maxLength={current.key === "whatsapp" ? 20 : 100}
        />
      ) : (
        <div className="mt-4 grid gap-2">
          {current.options?.map((option) => (
            <label
              key={option}
              className={
                "text-mal flex min-h-12 cursor-pointer items-center rounded-xl border px-4 py-3 text-sm transition-colors " +
                (value === option
                  ? "border-primary bg-primary/10 font-semibold text-primary"
                  : "border-border bg-card hover:border-primary/50")
              }
            >
              <input
                type="radio"
                name={current.key}
                value={option}
                checked={value === option}
                onChange={() => setAnswers({ ...answers, [current.key]: option })}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {error ? <p className="mt-3 text-xs font-medium text-destructive">{error}</p> : null}

      <CTAButton className="mt-6 w-full" onClick={next} disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {step < steps.length - 1 ? "NEXT" : supportForm.submit}
      </CTAButton>
    </div>
  );
}
