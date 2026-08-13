import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CTAButton } from "./CTAButton";
import { CommunityCard } from "./CommunityCard";
import { feedback as copy } from "@/content/funnel";
import { submitFeedback } from "@/lib/leads.functions";
import { feedbackSchema } from "@/lib/leads.schemas";
import { track } from "@/lib/track";
import { getCampaignParams } from "@/lib/campaign";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "mt-2 min-h-12 rounded-xl bg-card";

export function FeedbackForm() {
  const submit = useServerFn(submitFeedback);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    whatsapp_number: "",
    feedback_rating: "",
    feedback_text: "",
    biggest_challenge: "",
    personal_question: "",
  });

  // Mock verification flow — ready to connect a real WhatsApp/SMS OTP provider later.
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const set = (key: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-6 w-6 text-primary" />
          <p className="text-mal text-base font-semibold sm:text-lg">{copy.success}</p>
        </div>
        <div className="mt-8">
          <CommunityCard />
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = feedbackSchema.safeParse({
      ...values,
      whatsapp_verified: verified,
      ...getCampaignParams(),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await submit({ data: parsed.data });
      track("feedback_submitted");
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => track("feedback_started")}
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            className={fieldClass}
            maxLength={100}
          />
          <FieldError message={errors["name"]} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            className={fieldClass}
            maxLength={255}
          />
          <FieldError message={errors["email"]} />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <Input
          id="whatsapp"
          inputMode="tel"
          value={values.whatsapp_number}
          onChange={(e) => set("whatsapp_number")(e.target.value)}
          className={fieldClass}
          maxLength={20}
        />
        <FieldError message={errors["whatsapp_number"]} />

        <div className="mt-3 rounded-xl border border-dashed border-border bg-surface p-4">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Verify WhatsApp Number (optional)
          </p>
          {verified ? (
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <BadgeCheck className="h-4 w-4" /> Number verified
            </p>
          ) : !otpSent ? (
            <CTAButton
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() => setOtpSent(true)}
            >
              SEND OTP
            </CTAButton>
          ) : (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input
                aria-label="Enter OTP"
                placeholder="Enter OTP"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="min-h-12 rounded-xl bg-card sm:max-w-[180px]"
                maxLength={6}
              />
              <CTAButton
                type="button"
                variant="outline"
                onClick={() => {
                  if (otp.trim().length < 4) {
                    toast.error("Enter the OTP you received.");
                    return;
                  }
                  setVerified(true);
                }}
              >
                VERIFY NUMBER
              </CTAButton>
            </div>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">How useful was this training?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {copy.ratings.map((rating) => (
            <label
              key={rating}
              className={
                "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm transition-colors " +
                (values.feedback_rating === rating
                  ? "border-primary bg-primary/10 font-semibold text-primary"
                  : "border-border bg-card hover:border-primary/50")
              }
            >
              <input
                type="radio"
                name="feedback_rating"
                value={rating}
                checked={values.feedback_rating === rating}
                onChange={() => set("feedback_rating")(rating)}
                className="sr-only"
              />
              {rating}
            </label>
          ))}
        </div>
        <FieldError message={errors["feedback_rating"]} />
      </fieldset>

      <div className="mt-6">
        <Label htmlFor="useful" className="text-mal">
          {copy.q1}
        </Label>
        <Textarea
          id="useful"
          value={values.feedback_text}
          onChange={(e) => set("feedback_text")(e.target.value)}
          className="mt-2 min-h-24 rounded-xl bg-card"
          maxLength={1000}
        />
        <FieldError message={errors["feedback_text"]} />
      </div>

      <div className="mt-6">
        <Label htmlFor="challenge" className="text-mal">
          {copy.q2}
        </Label>
        <Textarea
          id="challenge"
          value={values.biggest_challenge}
          onChange={(e) => set("biggest_challenge")(e.target.value)}
          className="mt-2 min-h-24 rounded-xl bg-card"
          maxLength={1000}
        />
        <FieldError message={errors["biggest_challenge"]} />
      </div>

      <div className="mt-6">
        <Label htmlFor="question" className="text-mal">
          {copy.q3}
        </Label>
        <Textarea
          id="question"
          value={values.personal_question}
          onChange={(e) => set("personal_question")(e.target.value)}
          className="mt-2 min-h-20 rounded-xl bg-card"
          maxLength={1000}
        />
      </div>

      <CTAButton type="submit" className="mt-8 w-full" disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {copy.submit}
      </CTAButton>
    </form>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-destructive">{message}</p>;
}
