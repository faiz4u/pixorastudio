"use server";

import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { env, isLeadEmailConfigured } from "@/lib/env";
import { appointmentSchema, TIME_SLOT_LABELS } from "@/lib/validation/appointment";
import { RATE_LIMIT_MESSAGE } from "@/lib/validation/spam";
import { checkRateLimit } from "@/lib/security/rate-limit";
import type { AppointmentStatus, AppointmentTimeSlot } from "@/types/database";

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
    consent: formData.get("consent"),
    company: formData.get("company") ?? "",
    formRenderedAt: formData.get("formRenderedAt") ?? "",
  });

  if (!parsed.success) {
    // The spam checks share a deliberately vague message, so log which field
    // actually failed while developing.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[appointment] validation failed:", parsed.error.issues.map((i) => i.path.join(".")));
    }
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

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/appointments");
}

export async function deleteAppointment(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/appointments");
}
