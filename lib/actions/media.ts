"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { validateSiteImageFile } from "@/lib/validation/media";

export type MediaActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SITE_IMAGE_SLOTS = ["logo", "hero", "about_office", "cta_banner"] as const;

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
  const fileError = validateSiteImageFile(file);
  if (fileError) return { status: "error", message: fileError };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("site_images")
    .select("storage_path")
    .eq("slot", slot)
    .maybeSingle();

  // A fresh filename per upload: overwriting the same path keeps serving the
  // old image from the CDN/image cache (max-age=3600) and leaves orphans
  // behind when the extension changes.
  const rawExt = file.name.includes(".") ? file.name.split(".").pop()! : "";
  const ext = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  const path = `${slot}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { status: "error", message: uploadError.message };

  const { error } = await supabase
    .from("site_images")
    .upsert({ slot, storage_path: path, alt_text: altText }, { onConflict: "slot" });
  if (error) {
    await supabase.storage.from("site-images").remove([path]);
    return { status: "error", message: error.message };
  }

  // Best effort: the new image is already live, a leftover file is harmless.
  if (existing?.storage_path && existing.storage_path !== path) {
    await supabase.storage.from("site-images").remove([existing.storage_path]);
  }

  revalidatePath("/admin/media");
  revalidatePath("/", "layout");
  return { status: "success", message: "Image updated." };
}
