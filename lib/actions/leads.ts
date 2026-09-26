"use server";

import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { env, isLeadEmailConfigured } from "@/lib/env";
import { leadSchema } from "@/lib/validation/lead";
import { RATE_LIMIT_MESSAGE } from "@/lib/validation/spam";
import { checkRateLimit } from "@/lib/security/rate-limit";
import type { LeadStatus } from "@/types/database";

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
    consent: formData.get("consent"),
    company: formData.get("company") ?? "",
    formRenderedAt: formData.get("formRenderedAt") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, whatsappNumber, projectTypes, budgetRange, message } = parsed.data;

  const allowed = await checkRateLimit("lead", { maxHits: 5, windowSeconds: 3600 });
  if (!allowed) {
    return { status: "error", message: RATE_LIMIT_MESSAGE };
  }

  // Inserted with the secret key: the public has no insert access
  // (0007_security_hardening.sql), so every submission must pass the checks above.
  const { error } = await createAdminClient().from("leads").insert({
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

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}
