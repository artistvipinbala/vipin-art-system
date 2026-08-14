import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, BadgeCheck, Loader2, ShieldCheck } from "lucide-react";
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
const optional = new Set(["email", "work_place"]);

export function SupportForm({
  onDone,
  onSkip,
}: {
  onDone: () => void;
  onSkip?: () => void;
}) {
  const submit = useServerFn(submitSupportApplication);
  const [started, setStarted] = useState(false);
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
        <p className="text-mal flex items-center gap-2 text-base font-semibold sm:text-lg">
          <BadgeCheck className="h-5 w-5 text-primary" /> Thank you! നിങ്ങളുടെ വിവരങ്ങൾ എനിക്ക്
          കിട്ടി.
        </p>
        <p className="text-mal mt-2 text-sm text-muted-foreground">
          ഞാൻ ഇത് നേരിട്ട് നോക്കി WhatsApp-ൽ reply ചെയ്യും. അതുവരെ താഴെയുള്ള details നോക്കാം.
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <p className="text-mal text-xs font-bold tracking-[0.14em] text-primary uppercase">
          {supportForm.intro.eyebrow}
        </p>
        <h3 className="text-mal mt-3 text-lg font-bold sm:text-xl">
          {supportForm.intro.headline}
        </h3>
        <p className="text-mal mt-3 text-sm text-muted-foreground sm:text-base">
          {supportForm.intro.sub}
        </p>
        <CTAButton
          className="text-mal mt-6 w-full"
          onClick={() => {
            track("support_form_started");
            setStarted(true);
          }}
        >
          {supportForm.intro.start}
        </CTAButton>
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-mal mt-4 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {supportForm.intro.skip}
          </button>
        ) : null}
        <p className="text-mal mt-4 flex items-center justify-center gap-1.5 text-[0.7rem] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> നിങ്ങളുടെ വിവരങ്ങൾ ഞാൻ മാത്രം കാണും. Spam ഇല്ല.
        </p>
      </div>
    );
  }

  function next() {
    if (!value.trim() && !optional.has(current.key)) {
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
      email: answers["email"] ?? "",
      whatsapp_number: answers["whatsapp"],
      art_type: answers["art_type"],
      age_range: answers["age_range"],
      work_place: answers["work_place"],
      spend_ready: answers["spend_ready"],
      current_stage: answers["current_stage"],
      biggest_challenge: answers["biggest_challenge"],
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
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
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

      <h3 className="text-mal mt-6 text-lg leading-snug font-bold sm:text-xl">
        {current.label}
      </h3>

      {current.type === "text" ? (
        <Input
          value={value}
          inputMode={
            current.key === "whatsapp"
              ? "tel"
              : current.key === "email"
                ? "email"
                : "text"
          }
          onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
          className="mt-4 min-h-12 rounded-xl bg-card"
          maxLength={current.key === "whatsapp" ? 20 : 255}
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

      <CTAButton className="text-mal mt-6 w-full" onClick={next} disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {step < steps.length - 1 ? "NEXT" : supportForm.submit}
      </CTAButton>
      {optional.has(current.key) && step < steps.length - 1 ? (
        <button
          type="button"
          onClick={() => setStep(step + 1)}
          className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-primary"
        >
          Skip
        </button>
      ) : null}
    </div>
  );
}
