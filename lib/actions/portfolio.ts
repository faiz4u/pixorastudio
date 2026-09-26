"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { portfolioSchema } from "@/lib/validation/portfolio";
import { imageExtension, validateSiteImageFile } from "@/lib/validation/media";

export type PortfolioActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function savePortfolioProject(
  _prevState: PortfolioActionState,
  formData: FormData,
): Promise<PortfolioActionState> {
  const parsed = portfolioSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    clientName: formData.get("clientName") ?? "",
    description: formData.get("description") ?? "",
    tags: formData.get("tags") ?? "",
    projectUrl: formData.get("projectUrl") ?? "",
    displayOrder: formData.get("displayOrder") || 0,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const id = formData.get("id");
  const isEditing = typeof id === "string" && id.length > 0;
  const isFeatured = formData.get("isFeatured") === "on";
  const published = formData.get("published") === "on";
  const tags = parsed.data.tags
    ? parsed.data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const supabase = await createClient();

  let coverImagePath: string | undefined;
  const coverImage = formData.get("coverImage");
  if (coverImage instanceof File && coverImage.size > 0) {
    const fileError = validateSiteImageFile(coverImage);
    if (fileError) return { status: "error", message: fileError };
    // Extension from the validated type, never the uploaded filename.
    const ext = imageExtension(coverImage.type);
    const path = `${parsed.data.slug}/cover-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, coverImage, { contentType: coverImage.type, upsert: true });
    if (uploadError) {
      return { status: "error", message: `Image upload failed: ${uploadError.message}` };
    }
    coverImagePath = path;
  }

  const row = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    category: parsed.data.category,
    client_name: parsed.data.clientName || null,
    description: parsed.data.description || null,
    project_url: parsed.data.projectUrl || null,
    tags,
    is_featured: isFeatured,
    published,
    display_order: parsed.data.displayOrder,
    ...(coverImagePath ? { cover_image_path: coverImagePath } : {}),
  };

  const { error } = isEditing
    ? await supabase.from("portfolio_projects").update(row).eq("id", id as string)
    : await supabase.from("portfolio_projects").insert(row);

  if (error) {
    return {
      status: "error",
      message: error.message.includes("duplicate") ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { status: "success", message: isEditing ? "Project updated." : "Project created." };
}

export async function deletePortfolioProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function setPortfolioPublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_projects").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function setPortfolioFeatured(id: string, isFeatured: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_projects").update({ is_featured: isFeatured }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/portfolio");
}
