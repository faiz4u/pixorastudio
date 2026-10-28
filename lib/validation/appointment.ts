import { z } from "zod";
import { honeypotField, formRenderedAtField } from "@/lib/validation/spam";
import { consentField } from "@/lib/validation/consent";
import { TIME_SLOTS } from "@/lib/validation/appointment-options";

export { TIME_SLOTS, TIME_SLOT_LABELS } from "@/lib/validation/appointment-options";

function isTodayOrLater(value: string) {
  const picked = new Date(value);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  picked.setHours(0, 0, 0, 0);
  return picked >= today;
}

export const appointmentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  preferredDate: z
    .string()
    .trim()
    .min(1, "Pick a date")
    .refine(isTodayOrLater, "Pick a date from today onward"),
  timeSlot: z.enum(TIME_SLOTS, { message: "Pick a time slot" }),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: consentField,
  // Honeypot: real visitors never fill this in (it's visually hidden). A
  // submission with it populated is almost certainly a bot.
  company: honeypotField,
  // Set client-side when the booking modal opens; rejects submissions that
  // arrive faster than a human could plausibly fill the form.
  formRenderedAt: formRenderedAtField,
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
