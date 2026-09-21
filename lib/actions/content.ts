"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { siteSettingsSchema, titledItemSchema, faqItemSchema } from "@/lib/validation/content";

export type ContentActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function refreshContentPaths() {
  revalidatePath("/admin/content");
  revalidatePath("/");
}

export async function saveSiteSettings(
  _prevState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = siteSettingsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...parsed.data }, { onConflict: "id" });

  if (error) return { status: "error", message: error.message };

  refreshContentPaths();
  return { status: "success", message: "Site copy saved." };
}

type TitledTable = "capabilities" | "process_steps" | "why_principles";

async function saveTitledItem(table: TitledTable, formData: FormData): Promise<ContentActionState> {
  const parsed = titledItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const id = formData.get("id");
  const isEditing = typeof id === "string" && id.length > 0;
  const supabase = await createClient();

  if (isEditing) {
    const { error } = await supabase.from(table).update(parsed.data).eq("id", id as string);
    if (error) return { status: "error", message: error.message };
  } else {
    const { count } = await supabase.from(table).select("id", { count: "exact", head: true });
    const { error } = await supabase.from(table).insert({ ...parsed.data, display_order: count ?? 0 });
    if (error) return { status: "error", message: error.message };
  }

  refreshContentPaths();
  return { status: "success", message: isEditing ? "Saved." : "Added." };
}

async function deleteTitledItem(table: TitledTable, id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshContentPaths();
}

export async function saveWhyPrinciple(_prevState: ContentActionState, formData: FormData) {
  return saveTitledItem("why_principles", formData);
}

export async function deleteWhyPrinciple(id: string) {
  return deleteTitledItem("why_principles", id);
}

export async function saveCapability(_prevState: ContentActionState, formData: FormData) {
  return saveTitledItem("capabilities", formData);
}

export async function deleteCapability(id: string) {
  return deleteTitledItem("capabilities", id);
}

export async function saveProcessStep(_prevState: ContentActionState, formData: FormData) {
  return saveTitledItem("process_steps", formData);
}

export async function deleteProcessStep(id: string) {
  return deleteTitledItem("process_steps", id);
}

export async function saveFaqItem(
  _prevState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = faqItemSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const id = formData.get("id");
  const isEditing = typeof id === "string" && id.length > 0;
  const supabase = await createClient();

  if (isEditing) {
    const { error } = await supabase.from("faq_items").update(parsed.data).eq("id", id as string);
    if (error) return { status: "error", message: error.message };
  } else {
    const { count } = await supabase.from("faq_items").select("id", { count: "exact", head: true });
    const { error } = await supabase
      .from("faq_items")
      .insert({ ...parsed.data, display_order: count ?? 0 });
    if (error) return { status: "error", message: error.message };
  }

  refreshContentPaths();
  return { status: "success", message: isEditing ? "Saved." : "Added." };
}

export async function deleteFaqItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshContentPaths();
}
