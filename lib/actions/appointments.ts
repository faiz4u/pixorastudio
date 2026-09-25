"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { env, isLeadEmailConfigured } from "@/lib/env";
import { appointmentSchema, TIME_SLOT_LABELS } from "@/lib/validation/appointment";
import { RATE_LIMIT_MESSAGE } from "@/lib/validation/spam";
import { checkRateLimit } from "@/lib/security/rate-limit";
import type { AppointmentTimeSlot } from "@/types/database";

export type AppointmentActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitAppointment(
  _prevState: AppointmentActionState,
  formData: FormData,
): Promise<AppointmentActionState> {
  const parsed = appointmentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    preferredDate: formData.get("preferredDate"),
    timeSlot: formData.get("timeSlot"),
    notes: formData.get("notes") ?? "",
    company: formData.get("company") ?? "",
    formRenderedAt: formData.get("formRenderedAt") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, email, preferredDate, timeSlot, notes } = parsed.data;

  const supabase = await createClient();

  const allowed = await checkRateLimit(supabase, "appointment", { maxHits: 3, windowSeconds: 3600 });
  if (!allowed) {
    return { status: "error", message: RATE_LIMIT_MESSAGE };
  }

  const { error } = await supabase.from("appointments").insert({
    name,
    email,
    preferred_date: preferredDate,
    time_slot: timeSlot,
    notes: notes || null,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong. Please try again or email us directly.",
    };
  }

  await notifyAdminOfAppointment({ name, email, preferredDate, timeSlot, notes });

  return {
    status: "success",
    message: "Request sent — we'll confirm your slot by email shortly.",
  };
}

async function notifyAdminOfAppointment(appointment: {
  name: string;
  email: string;
  preferredDate: string;
  timeSlot: AppointmentTimeSlot;
  notes?: string;
}) {
  if (!isLeadEmailConfigured) return; // Resend isn't configured yet — safe no-op.

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: env.LEAD_NOTIFICATION_FROM_EMAIL!,
      to: env.LEAD_NOTIFICATION_TO_EMAIL!,
      subject: `New appointment request: ${appointment.name}`,
      text: [
        `Name: ${appointment.name}`,
        `Email: ${appointment.email}`,
        `Preferred date: ${appointment.preferredDate}`,
        `Preferred time: ${TIME_SLOT_LABELS[appointment.timeSlot]}`,
        `Notes: ${appointment.notes || "(none)"}`,
      ].join("\n"),
    });
  } catch {
    // The request is already saved; a failed email alert shouldn't fail
    // the user-facing submission.
  }
}
