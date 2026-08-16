import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, BadgeCheck, Loader2, PlayCircle, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { quickIntake as copy } from "@/content/funnel";
import { getCampaignParams } from "@/lib/campaign";
import { submitSupportApplication } from "@/lib/leads.functions";
import { supportApplicationSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";

const fieldClass =
  "text-mal mt-2 min-h-13 w-full rounded-full border border-sheet-border bg-sheet-field px-5 text-[0.95rem] text-sheet-foreground placeholder:text-sheet-muted/70 outline-none focus:border-primary focus:ring-0";
const labelClass = "text-mal text-[0.92rem] font-medium text-sheet-foreground";

type Values = {
  watched: string;
  work: string;
  problem: string;
  problem_other: string;
  commitment: string;
};

const empty: Values = {
  watched: "",
  work: "",
  problem: "",
  problem_other: "",
  commitment: "",
};

/**
 * Suitability check (not a lead form): one question per screen, no name /
 * email / phone. Question 1 gates on having watched the full video.
 */
export function QuickIntake({
  onDone,
  onWatchVideo,
}: {
  onDone: () => void;
  onWatchVideo?: () => void;
}) {
  const submit = useServerFn(submitSupportApplication);
  const [values, setValues] = useState<Values>(empty);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (key: keyof Values) => (v: string) => {
    setError("");
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const steps = useMemo(
    () => [
      {
        title: copy.labels.watched,
        sub: copy.watchedSub,
        valid: () => Boolean(values.watched),
        body: (
          <OptionList
            name="watched"
            options={[copy.watchedOptions.yes, copy.watchedOptions.no]}
            value={values.watched}
            onChange={set("watched")}
          />
        ),
      },
      {
        title: copy.labels.work,
        sub: "ഏതാണ് നിങ്ങളോട് ഏറ്റവും ചേരുന്നത്?",
        valid: () => Boolean(values.work),
        body: (
          <OptionList
            name="work"
            options={copy.workOptions}
            value={values.work}
            onChange={set("work")}
          />
        ),
      },
      {
        title: copy.labels.problem,
        sub: "ഒന്ന് select ചെയ്യൂ — ഇത് നോക്കിയാണ് ഇത് നിങ്ങൾക്ക് ചേരുമോ എന്ന് പറയുന്നത്.",
        valid: () =>
          values.problem === copy.otherOption
            ? values.problem_other.trim().length > 2
            : Boolean(values.problem),
        body: (
          <>
            <OptionList
              name="problem"
              options={[...copy.problemOptions, copy.otherOption]}
              value={values.problem}
              onChange={set("problem")}
            />
            {values.problem === copy.otherOption ? (
              <input
                aria-label={copy.otherOption}
                placeholder={copy.otherPlaceholder}
                maxLength={200}
                value={values.problem_other}
                onChange={(e) => set("problem_other")(e.target.value)}
                className={fieldClass}
              />
            ) : null}
          </>
        ),
      },
      {
        title: copy.labels.commitment,
        sub: copy.commitmentNote,
        valid: () => Boolean(values.commitment),
        body: (
          <OptionList
            name="commitment"
            options={copy.commitmentOptions}
            value={values.commitment}
            onChange={set("commitment")}
          />
        ),
      },
    ],
    [values],
  );

  const total = steps.length;
  const current = steps[step]!;
  const progress = Math.round(((step + 1) / total) * 100);
  const notWatched = values.watched === copy.watchedOptions.no;

  async function finish() {
    const challenge =
      values.problem === copy.otherOption ? values.problem_other : values.problem;
    const parsed = supportApplicationSchema.safeParse({
      art_type: values.work,
      current_stage: `Watched full video: ${values.watched}`,
      biggest_challenge: `${challenge} | Ready: ${values.commitment}`,
      ...getCampaignParams(),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? copy.error);
      return;
    }
    setBusy(true);
    try {
      await submit({ data: parsed.data });
      try {
        window.localStorage.setItem("avb_intake_done", "1");
      } catch {
        /* ignore */
      }
      track("support_form_completed");
      setDone(true);
      onDone();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function next() {
    if (!current.valid()) {
      setError(copy.error);
      return;
    }
    setError("");
    if (step === total - 1) {
      void finish();
      return;
    }
    setStep((s) => s + 1);
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-sheet p-7 text-sheet-foreground shadow-card">
        <p className="text-mal flex items-center gap-2 text-lg font-bold">
          <BadgeCheck className="h-5 w-5 shrink-0 text-primary" /> {copy.successTitle}
        </p>
        <p className="text-mal mt-2 text-sm text-sheet-muted">{copy.successSub}</p>
      </div>
    );
  }

  /* Not watched fully → send them back to the video instead of collecting data. */
  if (notWatched) {
    return (
      <div className="rounded-3xl bg-sheet p-7 text-sheet-foreground shadow-card">
        <h3 className="text-mal text-[1.25rem] leading-tight font-extrabold">
          {copy.notWatched.title}
        </h3>
        <p className="text-mal mt-3 text-[0.95rem] leading-relaxed text-sheet-muted">
          {copy.notWatched.body}
        </p>
        <button
          type="button"
          onClick={onWatchVideo}
          className="text-mal mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 text-[1rem] font-bold text-primary-foreground shadow-glow"
        >
          <PlayCircle className="h-4.5 w-4.5" /> {copy.notWatched.cta}
        </button>
        <button
          type="button"
          onClick={() => set("watched")(copy.watchedOptions.yes)}
          className="text-mal mt-3 w-full text-[0.85rem] font-semibold text-sheet-muted underline underline-offset-4"
        >
          {copy.notWatched.back}
        </button>
      </div>
    );
  }

  return (
    <div
      onFocus={() => track("support_form_started")}
      className="flex max-h-[88svh] flex-col overflow-hidden rounded-3xl bg-sheet text-sheet-foreground shadow-card"
    >
      {/* Step header + progress */}
      <div className="border-b border-sheet-border px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.72rem] font-bold tracking-[0.16em] text-sheet-muted uppercase">
            Step {step + 1} of {total}
          </p>
          <p className="text-[0.72rem] font-bold text-primary">{progress}%</p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sheet-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-mal mt-3 text-[0.75rem] leading-relaxed text-sheet-muted">
          {copy.sub}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h3 className="text-mal text-[1.35rem] leading-tight font-extrabold">
          {current.title}
        </h3>
        <p className="text-mal mt-2 text-[0.95rem] leading-relaxed text-sheet-muted">
          {current.sub}
        </p>
        <div className="mt-6">{current.body}</div>
        {error ? (
          <p className="text-mal mt-4 text-xs font-semibold text-destructive">{error}</p>
        ) : null}
        <p className="text-mal mt-6 flex items-center gap-1.5 text-[0.7rem] text-sheet-muted">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
        </p>
      </div>

      {/* Footer nav */}
      <div className="flex items-center gap-3 border-t border-sheet-border px-6 py-4">
        <button
          type="button"
          disabled={step === 0 || busy}
          onClick={() => {
            setError("");
            setStep((s) => Math.max(0, s - 1));
          }}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-sheet-border bg-sheet-field px-6 text-[0.95rem] font-semibold text-sheet-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={next}
          className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 text-[1rem] font-bold text-primary-foreground shadow-glow transition-all hover:brightness-105 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {step === total - 1 ? "SUBMIT" : "Next"}
          {busy ? null : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function OptionList({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <label
            key={option}
            className={`text-mal flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-[0.92rem] leading-relaxed transition-colors ${
              active
                ? "border-primary bg-primary/10 font-semibold"
                : "border-sheet-border bg-sheet-field"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              onChange={() => onChange(option)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}
