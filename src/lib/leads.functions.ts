import { createServerFn } from "@tanstack/react-start";

import { feedbackSchema, supportApplicationSchema } from "./leads.schemas";

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        whatsapp_number: data.whatsapp_number,
        whatsapp_verified: data.whatsapp_verified,
        training_completed: true,
        feedback_rating: data.feedback_rating,
        feedback_text: data.feedback_text,
        biggest_challenge: data.biggest_challenge,
        personal_question: data.personal_question ?? null,
        support_interest: false,
        source: data.source ?? null,
        campaign: data.campaign ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("submitFeedback failed", error.message);
      throw new Error("Could not save your feedback. Please try again.");
    }

    return { id: row.id };
  });

export const submitSupportApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => supportApplicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        whatsapp_number: data.whatsapp_number,
        support_interest: true,
        current_stage: data.current_stage,
        biggest_challenge: data.biggest_challenge,
        desired_support: data.desired_support,
        seriousness: data.seriousness,
        source: data.source ?? null,
        campaign: data.campaign ?? null,
      })
      .select("id")
      .single();

    if (leadError) {
      console.error("submitSupportApplication lead insert failed", leadError.message);
      throw new Error("Could not save your details. Please try again.");
    }

    const { error: appError } = await supabaseAdmin.from("support_applications").insert({
      lead_id: lead.id,
      name: data.name,
      whatsapp_number: data.whatsapp_number,
      current_stage: data.current_stage,
      biggest_challenge: data.biggest_challenge,
      desired_support: data.desired_support,
      seriousness: data.seriousness,
      status: "New",
    });

    if (appError) {
      console.error("submitSupportApplication insert failed", appError.message);
      throw new Error("Could not save your application. Please try again.");
    }

    return { id: lead.id };
  });
