import { z } from "zod";

export const siteSettingsSchema = z.object({
  hero_eyebrow: z.string().trim().max(200).optional().or(z.literal("")),
  hero_heading: z.string().trim().min(1, "Required").max(300),
  hero_subheading: z.string().trim().max(500).optional().or(z.literal("")),
  hero_cta_primary_label: z.string().trim().max(60).optional().or(z.literal("")),
  hero_cta_primary_href: z.string().trim().max(300).optional().or(z.literal("")),
  hero_cta_secondary_label: z.string().trim().max(60).optional().or(z.literal("")),
  hero_cta_secondary_href: z.string().trim().max(300).optional().or(z.literal("")),
  why_heading: z.string().trim().min(1, "Required").max(300),
  why_subheading: z.string().trim().max(300).optional().or(z.literal("")),
  why_body: z.string().trim().max(1000).optional().or(z.literal("")),
  contact_whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  contact_email: z.string().trim().max(200).optional().or(z.literal("")),
  contact_hours: z.string().trim().max(200).optional().or(z.literal("")),
  footer_tagline: z.string().trim().max(300).optional().or(z.literal("")),
  social_instagram: z.string().trim().max(300).optional().or(z.literal("")),
  social_linkedin: z.string().trim().max(300).optional().or(z.literal("")),
});

export const titledItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(1000),
});

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(300),
  answer: z.string().trim().min(1, "Answer is required").max(2000),
});
