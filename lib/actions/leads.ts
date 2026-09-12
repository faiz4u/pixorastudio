"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { env, isLeadEmailConfigured } from "@/lib/env";
import { leadSchema } from "@/lib/validation/lead";

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLead(
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    whatsappNumber: formData.get("whatsappNumber"),
    projectTypes: formData.getAll("projectTypes"),
    budgetRange: formData.get("budgetRange") ?? "",
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, whatsappNumber, projectTypes, budgetRange, message } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    whatsapp_number: whatsappNumber,
    project_types: projectTypes,
    budget_range: budgetRange || null,
    message: message || null,
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again or WhatsApp us directly." };
  }

  await notifyAdminOfLead({ name, whatsappNumber, projectTypes, budgetRange, message });

  return { status: "success", message: "Thanks — we'll get back to you within a working day." };
}

async function notifyAdminOfLead(lead: {
  name: string;
  whatsappNumber: string;
  projectTypes: string[];
  budgetRange?: string;
  message?: string;
}) {
  if (!isLeadEmailConfigured) return; // Resend isn't configured yet — safe no-op.

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: env.LEAD_NOTIFICATION_FROM_EMAIL!,
      to: env.LEAD_NOTIFICATION_TO_EMAIL!,
      subject: `New lead: ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `WhatsApp: ${lead.whatsappNumber}`,
        `Project types: ${lead.projectTypes.join(", ")}`,
        `Budget: ${lead.budgetRange || "Not specified"}`,
        `Message: ${lead.message || "(none)"}`,
      ].join("\n"),
    });
  } catch {
    // The lead is already saved in the database; a failed email alert
    // shouldn't fail the user-facing submission.
  }
}
