import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CTAButton } from "./CTAButton";
import { quickIntake as copy } from "@/content/funnel";
import { getCampaignParams } from "@/lib/campaign";
import { submitSupportApplication } from "@/lib/leads.functions";
import { supportApplicationSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORE_KEY = "avb_lead";
const fieldClass = "mt-2 min-h-12 rounded-xl bg-card";
const selectClass =
  "text-mal mt-2 min-h-12 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground";

type Values = {
  name: string;
  email: string;
  whatsapp: string;
  work: string;
  problem: string;
  problem_other: string;
  commitment: string;
};

const empty: Values = {
  name: "",
  email: "",
  whatsapp: "",
  work: "",
  problem: "",
  problem_other: "",
  commitment: "",
};

/**
 * The only form in the funnel: 5 short questions, one screen.
 * Asked BEFORE the price is shown. Browser autofill is enabled through
 * autoComplete + a saved copy of the last answers in this browser.
 */
export function QuickIntake({ onDone }: { onDone: () => void }) {
  const submit = useServerFn(submitSupportApplication);
  const [values, setValues] = useState<Values>(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Autofill from this browser (same artist coming back / after the video).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORE_KEY);
      if (saved) setValues((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {
      /* ignore */
    }
  }, []);

  const set = (key: keyof Values) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const challenge =
      values.problem === copy.otherOption ? values.problem_other : values.problem;
    const parsed = supportApplicationSchema.safeParse({
      name: values.name,
      email: values.email,
      whatsapp_number: values.whatsapp,
      art_type: values.work,
      biggest_challenge: values.commitment
        ? `${challenge} | Ready: ${values.commitment}`
        : challenge,
      ...getCampaignParams(),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? copy.error);
      return;
    }
    if (!values.work || !challenge.trim() || !values.commitment) {
      setError(copy.error);
      return;
    }
    setError("");
    setBusy(true);
    try {
      await submit({ data: parsed.data });
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(values));
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

  if (done) {
    return (
      <div className="rounded-3xl border border-primary/50 bg-gradient-card p-6 shadow-card sm:p-8">
        <p className="text-mal flex items-center gap-2 text-base font-semibold sm:text-lg">
          <BadgeCheck className="h-5 w-5 shrink-0 text-primary" /> {copy.successTitle}
        </p>
        <p className="text-mal mt-2 text-sm text-muted-foreground">{copy.successSub}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => track("support_form_started")}
      className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8"
    >
      <p className="text-mal text-[0.7rem] font-bold tracking-[0.14em] text-primary uppercase">
        {copy.eyebrow}
      </p>
      <h3 className="text-mal mt-3 text-lg leading-snug font-bold sm:text-xl">
        {copy.headline}
      </h3>
      <p className="text-mal mt-2 text-sm text-muted-foreground">{copy.sub}</p>

      <div className="mt-6">
        <Label htmlFor="qi-name" className="text-mal">
          {copy.labels.name}
        </Label>
        <Input
          id="qi-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
          className={fieldClass}
          maxLength={100}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="qi-phone" className="text-mal">
          {copy.labels.whatsapp}
        </Label>
        <Input
          id="qi-phone"
          name="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.whatsapp}
          onChange={(e) => set("whatsapp")(e.target.value)}
          className={fieldClass}
          maxLength={20}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="qi-email" className="text-mal">
          {copy.labels.email}
        </Label>
        <Input
          id="qi-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          className={fieldClass}
          maxLength={255}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="qi-work" className="text-mal">
          {copy.labels.work}
        </Label>
        <select
          id="qi-work"
          value={values.work}
          onChange={(e) => set("work")(e.target.value)}
          className={selectClass}
        >
          <option value="">{copy.placeholder}</option>
          {copy.workOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Label htmlFor="qi-problem" className="text-mal">
          {copy.labels.problem}
        </Label>
        <select
          id="qi-problem"
          value={values.problem}
          onChange={(e) => set("problem")(e.target.value)}
          className={selectClass}
        >
          <option value="">{copy.placeholder}</option>
          {copy.problemOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value={copy.otherOption}>{copy.otherOption}</option>
        </select>
        {values.problem === copy.otherOption ? (
          <Input
            aria-label={copy.otherOption}
            placeholder={copy.otherPlaceholder}
            value={values.problem_other}
            onChange={(e) => set("problem_other")(e.target.value)}
            className={fieldClass}
            maxLength={200}
          />
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-mal text-sm font-semibold">{copy.labels.commitment}</p>
        <p className="text-mal mt-2 text-xs leading-relaxed text-muted-foreground">
          {copy.commitmentNote}
        </p>
        <div className="mt-3 space-y-2">
          {copy.commitmentOptions.map((option) => (
            <label
              key={option}
              className="text-mal flex cursor-pointer items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-xs leading-relaxed"
            >
              <input
                type="radio"
                name="commitment"
                value={option}
                checked={values.commitment === option}
                onChange={() => set("commitment")(option)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {error ? (
        <p className="text-mal mt-4 text-xs font-medium text-destructive">{error}</p>
      ) : null}

      <CTAButton type="submit" className="text-mal mt-7 w-full" disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {copy.submit}
      </CTAButton>
      <p className="text-mal mt-4 flex items-center justify-center gap-1.5 text-center text-[0.7rem] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {copy.privacy}
      </p>
    </form>
  );
}
