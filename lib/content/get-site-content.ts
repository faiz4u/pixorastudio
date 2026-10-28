import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { PortfolioCategory } from "@/types/database";
import {
  SITE_SETTINGS_SEED,
  WHY_PRINCIPLES_SEED,
  CAPABILITIES_SEED,
  PROCESS_STEPS_SEED,
  FAQ_SEED,
  PORTFOLIO_SEED,
  SITE_IMAGES_SEED,
} from "@/lib/content/site-content";

/**
 * Every getter below reads from Supabase and falls back to the seed content
 * if the table is missing/empty (e.g. migrations not applied yet, or a fresh
 * checkout) so the public site always renders something reasonable instead
 * of a broken/empty section.
 *
 * Each getter is wrapped in React cache(), so the many sections that read
 * the same row (site settings, logo) share one query per request.
 */

export const getSiteSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data ?? SITE_SETTINGS_SEED;
});

export const getWhyPrinciples = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("why_principles")
    .select("*")
    .order("display_order", { ascending: true });

  if (data && data.length > 0) return data;
  return WHY_PRINCIPLES_SEED.map((item, index) => ({
    id: `seed-${index}`,
    display_order: index,
    ...item,
  }));
});

export const getCapabilities = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("capabilities")
    .select("*")
    .order("display_order", { ascending: true });

  if (data && data.length > 0) return data;
  return CAPABILITIES_SEED.map((item, index) => ({
    id: `seed-${index}`,
    display_order: index,
    ...item,
  }));
});

export const getProcessSteps = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("process_steps")
    .select("*")
    .order("display_order", { ascending: true });

  if (data && data.length > 0) return data;
  return PROCESS_STEPS_SEED.map((item, index) => ({
    id: `seed-${index}`,
    display_order: index,
    ...item,
  }));
});

export const getFaqItems = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (data && data.length > 0) return data;
  return FAQ_SEED.map((item, index) => ({ id: `seed-${index}`, display_order: index, ...item }));
});

export type PortfolioCard = {
  id: string;
  title: string;
  slug: string;
  category: PortfolioCategory;
  clientName: string | null;
  description: string | null;
  projectUrl: string | null;
  coverImageUrl: string;
};

export const getPortfolio = cache(async (): Promise<PortfolioCard[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  if (data && data.length > 0) {
    return data.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      clientName: project.client_name,
      description: project.description,
      projectUrl: project.project_url ?? null,
      coverImageUrl: project.cover_image_path
        ? getPublicStorageUrl("portfolio", project.cover_image_path, project.updated_at)
        : "/seed/work-1.png",
    }));
  }

  return PORTFOLIO_SEED.map((project, index) => ({
    id: `seed-${index}`,
    title: project.title,
    slug: project.slug,
    category: project.category,
    clientName: project.clientName,
    description: project.description,
    projectUrl: null,
    coverImageUrl: project.localCoverImage,
  }));
});

export const getSiteImage = cache(async (slot: keyof typeof SITE_IMAGES_SEED) => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_images").select("*").eq("slot", slot).maybeSingle();

  if (data) {
    return { url: getPublicStorageUrl("site-images", data.storage_path, data.updated_at), alt: data.alt_text };
  }

  const fallback = SITE_IMAGES_SEED[slot];
  return { url: fallback.localPath, alt: fallback.alt };
});
