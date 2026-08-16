import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Loader2, PlayCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { quickIntake as copy } from "@/content/funnel";
import { getCampaignParams } from "@/lib/campaign";
import { submitSupportApplication } from "@/lib/leads.functions";
import { supportApplicationSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";

type Stage = "q1" | "q1-ack" | "q2" | "q2-ack" | "q3" | "q3-ack" | "final" | "not-watched";

const STEP_OF: Record<Stage, number> = {
  q1: 1,
  "q1-ack": 1,
  "not-watched": 1,
  q2: 2,
  "q2-ack": 2,
  q3: 3,
  "q3-ack": 3,
  final: 3,
};

/**
 * The ONE Personal Support flow: a 3-step consultation conversation.
 * Response-first — every answer gets an acknowledgement before the next step.
 */
export function QuickIntake({
  onDone,
  onWatchVideo,
}: {
  onDone: () => void;
  onWatchVideo?: () => void;
}) {
  const submit = useServerFn(submitSupportApplication);
  const [stage, setStage] = useState<Stage>("q1");
  const [watched, setWatched] = useState<string>("");
  const [problem, setProblem] = useState<number | null>(null);
  const [goal, setGoal] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const step = STEP_OF[stage];

  async function finish() {
    const problemLabel = problem !== null ? copy.steps.problem.options[problem]!.label : "";
    const goalLabel = goal !== null ? copy.steps.goal.options[goal]!.label : "";
    const parsed = supportApplicationSchema.safeParse({
      current_stage: `Watched full video: ${watched || "Yes"}`,
      biggest_challenge: problemLabel.slice(0, 200),
      desired_support: goalLabel.slice(0, 200),
      ...getCampaignParams(),
    });
    setBusy(true);
    try {
      if (parsed.success) await submit({ data: parsed.data });
      try {
        window.localStorage.setItem("avb_intake_done", "1");
      } catch {
        /* ignore */
      }
      track("support_form_completed");
      onDone();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  /* ── Not watched: send them back to the training instead of qualifying ── */
  if (stage === "not-watched") {
    return (
      <Shell step={step}>
        <h3 className="text-mal text-[1.3rem] leading-tight font-extrabold">
          {copy.notWatched.title}
        </h3>
        <p className="text-mal mt-3 text-[0.95rem] leading-relaxed text-sheet-muted">
          {copy.notWatched.body}
        </p>
        <PrimaryButton
          onClick={() => {
            track("intake_watch_video");
            onWatchVideo?.();
          }}
        >
          <PlayCircle className="h-4.5 w-4.5" /> {copy.notWatched.cta}
        </PrimaryButton>
        <button
          type="button"
          onClick={() => {
            setWatched(copy.steps.watched.yes);
            setStage("q1-ack");
          }}
          className="text-mal mt-3 w-full text-[0.85rem] font-semibold text-sheet-muted underline underline-offset-4"
        >
          {copy.notWatched.back}
        </button>
      </Shell>
    );
  }

  /* ── Acknowledgement screens ── */
  if (stage === "q1-ack" || stage === "q2-ack" || stage === "q3-ack") {
    const text =
      stage === "q1-ack"
        ? copy.steps.watched.ack
        : stage === "q2-ack"
          ? copy.steps.problem.options[problem ?? 0]!.ack
          : copy.steps.goal.options[goal ?? 0]!.ack;
    const nextStage: Stage =
      stage === "q1-ack" ? "q2" : stage === "q2-ack" ? "q3" : "final";
    const backStage: Stage = stage === "q1-ack" ? "q1" : stage === "q2-ack" ? "q2" : "q3";
    return (
      <Shell step={step}>
        <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/8 p-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground">
            <Check className="h-4 w-4" />
          </span>
          <p className="text-mal text-[0.98rem] leading-relaxed font-medium">{text}</p>
        </div>
        <PrimaryButton onClick={() => setStage(nextStage)}>
          {copy.continue}
        </PrimaryButton>
        <BackLink onClick={() => setStage(backStage)} />
      </Shell>
    );
  }

  /* ── Final transition ── */
  if (stage === "final") {
    return (
      <Shell step={3}>
        <h3 className="text-mal text-[1.3rem] leading-tight font-extrabold">
          {copy.final.title}
        </h3>
        <p className="text-mal mt-3 text-[0.95rem] leading-relaxed text-sheet-muted">
          {copy.final.body}
        </p>
        <PrimaryButton disabled={busy} onClick={() => void finish()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {copy.final.cta}
        </PrimaryButton>
        <BackLink onClick={() => setStage("q3-ack")} />
        <p className="text-mal mt-5 flex items-center gap-1.5 text-[0.7rem] text-sheet-muted">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
        </p>
      </Shell>
    );
  }

  /* ── Question screens ── */
  const isQ1 = stage === "q1";
  const q = isQ1 ? copy.steps.watched : stage === "q2" ? copy.steps.problem : copy.steps.goal;
  const options = isQ1
    ? [copy.steps.watched.yes, copy.steps.watched.no]
    : (stage === "q2" ? copy.steps.problem.options : copy.steps.goal.options).map(
        (o) => o.label,
      );
  const selected = isQ1
    ? watched
    : stage === "q2"
      ? problem !== null
        ? options[problem]!
        : ""
      : goal !== null
        ? options[goal]!
        : "";

  function pick(value: string, index: number) {
    setError("");
    if (isQ1) {
      setWatched(value);
      return;
    }
    if (stage === "q2") setProblem(index);
    else setGoal(index);
  }

  function next() {
    if (!selected) {
      setError(copy.error);
      return;
    }
    setError("");
    if (isQ1) {
      setStage(watched === copy.steps.watched.no ? "not-watched" : "q1-ack");
      return;
    }
    setStage(stage === "q2" ? "q2-ack" : "q3-ack");
  }

  return (
    <Shell step={step} onFocus={() => track("support_form_started")}>
      <h3 className="text-mal text-[1.28rem] leading-tight font-extrabold">{q.title}</h3>
      <p className="text-mal mt-2 text-[0.9rem] leading-relaxed text-sheet-muted">{q.sub}</p>
      <div className="mt-5 space-y-2.5">
        {options.map((option, index) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => pick(option, index)}
              className={`text-mal flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-[0.92rem] leading-relaxed transition-colors ${
                active
                  ? "border-primary bg-primary/10 font-semibold"
                  : "border-sheet-border bg-sheet-field hover:border-primary/40"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  active
                    ? "border-primary bg-gradient-gold text-primary-foreground"
                    : "border-sheet-border"
                }`}
              >
                {active ? <Check className="h-3 w-3" /> : null}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-mal mt-4 text-xs font-semibold text-destructive">{error}</p>
      ) : null}
      <PrimaryButton onClick={next}>
        {copy.continue.replace(" →", "")} <ArrowRight className="h-4 w-4" />
      </PrimaryButton>
      {isQ1 ? null : <BackLink onClick={() => setStage(stage === "q2" ? "q1-ack" : "q2-ack")} />}
      <p className="text-mal mt-5 flex items-center gap-1.5 text-[0.7rem] text-sheet-muted">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
      </p>
    </Shell>
  );
}

function Shell({
  step,
  children,
  onFocus,
}: {
  step: number;
  children: React.ReactNode;
  onFocus?: () => void;
}) {
  return (
    <div
      onFocus={onFocus}
      className="max-h-[88svh] overflow-y-auto rounded-[1.75rem] bg-sheet px-6 py-7 text-sheet-foreground shadow-card sm:px-8"
    >
      <StepDots current={step} />
      <div className="mt-6">{children}</div>
    </div>
  );
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full text-[0.95rem] font-bold transition-all ${
              n <= current
                ? "bg-gradient-gold text-primary-foreground shadow-glow"
                : "bg-sheet-field text-sheet-muted"
            }`}
          >
            {n < current ? <Check className="h-4 w-4" /> : n}
          </span>
          {n < 3 ? (
            <span
              className={`h-1 w-10 sm:w-16 ${n < current ? "bg-primary" : "bg-sheet-border"}`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="text-mal mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 text-[0.95rem] font-bold text-primary-foreground shadow-glow transition-all hover:brightness-105 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-mal mt-3 w-full text-[0.85rem] font-semibold text-sheet-muted"
    >
      {copy.back}
    </button>
  );
}
