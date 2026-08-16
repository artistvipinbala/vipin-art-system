import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, { message: "Enter a valid WhatsApp number" })
  .max(20, { message: "Enter a valid WhatsApp number" })
  .regex(/^[0-9+\-\s()]+$/, { message: "Enter a valid WhatsApp number" });

export const feedbackSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  whatsapp_number: phone,
  whatsapp_verified: z.boolean().default(false),
  feedback_rating: z.enum(["Very useful", "Useful", "Average", "Not useful"]),
  feedback_text: z.string().trim().min(2, { message: "This field is required" }).max(1000),
  biggest_challenge: z.string().trim().min(2, { message: "This field is required" }).max(1000),
  personal_question: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().trim().max(100).optional(),
  campaign: z.string().trim().max(100).optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export const supportApplicationSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255).optional().or(z.literal("")),
  whatsapp_number: phone.optional().or(z.literal("")),
  art_type: z.string().trim().max(200).optional(),
  age_range: z.string().trim().max(50).optional(),
  work_place: z.string().trim().max(200).optional(),
  spend_ready: z.string().trim().max(200).optional(),
  current_stage: z.string().trim().max(200).optional(),
  biggest_challenge: z.string().trim().max(200).optional(),
  desired_support: z.string().trim().max(200).optional(),
  seriousness: z.string().trim().max(200).optional(),
  source: z.string().trim().max(100).optional(),
  campaign: z.string().trim().max(100).optional(),
});


export type SupportApplicationInput = z.infer<typeof supportApplicationSchema>;
