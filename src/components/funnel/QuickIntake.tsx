import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, PlayCircle, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { quickIntake as copy } from "@/content/funnel";
import { getCampaignParams } from "@/lib/campaign";
import { submitSupportApplication } from "@/lib/leads.functions";
import { supportApplicationSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";

type Stage = 1 | 2 | 3 | "final" | "not-watched";

/**
 * The ONE Personal Support flow: a 3-step consultation conversation.
 * One click per step — selecting an option shows a short personal
 * acknowledgement and then moves on by itself. No extra Continue clicks.
 */
export function QuickIntake({
  onDone,
  onWatchVideo,
}: {
  onDone: () => void;
  onWatchVideo?: () => void;
}) {
  const submit = useServerFn(submitSupportApplication);
  const [stage, setStage] = useState<Stage>(1);
  const [ack, setAck] = useState("");
  const [pending, setPending] = useState<string>("");
  const [watched, setWatched] = useState("");
  const [problem, setProblem] = useState<number | null>(null);
  const [goal, setGoal] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const step = stage === "final" ? 3 : stage === "not-watched" ? 1 : stage;

  function advance(to: Stage, ackText: string, _label: string) {
    setPending("");
    setAck(ackText);
    setStage(to);
  }


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

  /* ── Not watched: back to the training instead of qualifying ── */
  if (stage === "not-watched") {
    return (
      <Shell step={step}>
        <h3 className="text-mal text-[1.3rem] leading-tight font-extrabold">
          {copy.notWatched.title}
        </h3>
        <p className="text-mal mt-3 text-[0.95rem] leading-relaxed text-sheet-muted">
          {copy.notWatched.body}
        </p>
        <PrimaryButton onClick={() => onWatchVideo?.()}>
          <PlayCircle className="h-4.5 w-4.5" /> {copy.notWatched.cta}
        </PrimaryButton>
        <button
          type="button"
          onClick={() => {
            setWatched(copy.steps.watched.yes);
            setAck(copy.steps.watched.ack);
            setStage(2);
          }}
          className="text-mal mt-3 w-full text-[0.85rem] font-semibold text-sheet-muted underline underline-offset-4"
        >
          {copy.notWatched.back}
        </button>
      </Shell>
    );
  }

  /* ── Final transition ── */
  if (stage === "final") {
    return (
      <Shell step={3}>
        <AckBanner text={ack} />
        <h3 className="text-mal mt-5 text-[1.3rem] leading-tight font-extrabold">
          {copy.final.title}
        </h3>
        <p className="text-mal mt-3 text-[0.95rem] leading-relaxed text-sheet-muted">
          {copy.final.body}
        </p>
        <PrimaryButton disabled={busy} onClick={() => void finish()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {copy.final.cta}
        </PrimaryButton>
        <BackLink
          onClick={() => {
            setAck(copy.steps.problem.options[problem ?? 0]!.ack);
            setStage(3);
          }}
        />
        <p className="text-mal mt-5 flex items-center gap-1.5 text-[0.7rem] text-sheet-muted">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
        </p>
      </Shell>
    );
  }

  /* ── Question screens ── */
  const q = stage === 1 ? copy.steps.watched : stage === 2 ? copy.steps.problem : copy.steps.goal;
  const options =
    stage === 1
      ? [copy.steps.watched.yes, copy.steps.watched.no]
      : (stage === 2 ? copy.steps.problem.options : copy.steps.goal.options).map((o) => o.label);
  const selected =
    pending ||
    (stage === 1
      ? watched
      : stage === 2
        ? problem !== null
          ? options[problem]!
          : ""
        : goal !== null
          ? options[goal]!
          : "");

  function pick(label: string, index: number) {
    if (pending) return;
    if (stage === 1) {
      setWatched(label);
      if (label === copy.steps.watched.no) {
        setAck("");
        setStage("not-watched");
        return;
      }
      advance(2, copy.steps.watched.ack, label);
      return;
    }
    if (stage === 2) {
      setProblem(index);
      advance(3, copy.steps.problem.options[index]!.ack, label);
      return;
    }
    setGoal(index);
    advance("final", copy.steps.goal.options[index]!.ack, label);
  }

  return (
    <Shell step={step} onFocus={() => track("support_form_started")}>
      {stage !== 1 && ack ? <AckBanner text={ack} /> : null}
      <h3 className={`text-mal text-[1.28rem] leading-tight font-extrabold ${stage !== 1 && ack ? "mt-5" : ""}`}>
        {q.title}
      </h3>
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

      {pending ? (
        <div className="mt-5">
          <AckBanner text={ack} />
        </div>
      ) : null}

      {stage === 1 ? null : (
        <BackLink
          onClick={() => {
            if (timer.current) window.clearTimeout(timer.current);
            setPending("");
            if (stage === 2) {
              setAck("");
              setStage(1);
            } else {
              setAck(copy.steps.watched.ack);
              setStage(2);
            }
          }}
        />
      )}
      <p className="text-mal mt-5 flex items-center gap-1.5 text-[0.7rem] text-sheet-muted">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
      </p>
    </Shell>
  );
}

function AckBanner({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/8 p-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground">
        <Check className="h-4 w-4" />
      </span>
      <p className="text-mal text-[0.95rem] leading-relaxed font-medium">{text}</p>
    </div>
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
