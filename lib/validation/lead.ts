import { z } from "zod";
import { honeypotField, formRenderedAtField } from "@/lib/validation/spam";
import { consentField } from "@/lib/validation/consent";

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  whatsappNumber: z.string().trim().min(6, "Enter a valid WhatsApp number").max(30),
  projectTypes: z.array(z.string()).min(1, "Select at least one option"),
  budgetRange: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: consentField,
  // Honeypot: real visitors never fill this in (it's visually hidden). A
  // submission with it populated is almost certainly a bot.
  company: honeypotField,
  // Set client-side on mount; rejects submissions that arrive faster than a
  // human could plausibly fill the form.
  formRenderedAt: formRenderedAtField,
});

export type LeadInput = z.infer<typeof leadSchema>;

export { PROJECT_TYPE_OPTIONS, BUDGET_RANGE_OPTIONS } from "@/lib/validation/lead-options";
