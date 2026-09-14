"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type MediaActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SITE_IMAGE_SLOTS = ["hero", "about_office", "cta_banner"] as const;

export async function saveSiteImage(
  _prevState: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const slot = formData.get("slot");
  const altText = String(formData.get("altText") ?? "");
  const file = formData.get("image");

  if (typeof slot !== "string" || !SITE_IMAGE_SLOTS.includes(slot as (typeof SITE_IMAGE_SLOTS)[number])) {
    return { status: "error", message: "Invalid image slot." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Choose an image to upload." };
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${slot}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type, upsert: true });
  if (uploadError) return { status: "error", message: uploadError.message };

  const { error } = await supabase
    .from("site_images")
    .upsert({ slot, storage_path: path, alt_text: altText }, { onConflict: "slot" });
  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/media");
  revalidatePath("/");
  return { status: "success", message: "Image updated." };
}
