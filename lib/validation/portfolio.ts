import { z } from "zod";

export const PORTFOLIO_CATEGORIES = ["branding", "social", "ui_ux", "product"] as const;

function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

// Accepts "example.com" too (adds https://) and rejects javascript:/data: etc.,
// since the value ends up in a public href.
const projectUrlSchema = z
  .string()
  .trim()
  .max(2000)
  .transform((value) => (value && !/^[a-z][a-z0-9+.-]*:/i.test(value) ? `https://${value}` : value))
  .refine((value) => value === "" || isHttpUrl(value), "Enter a valid project URL (http or https)");

export const portfolioSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  category: z.enum(PORTFOLIO_CATEGORIES),
  clientName: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  tags: z.string().trim().max(500).optional().or(z.literal("")),
  projectUrl: projectUrlSchema,
  displayOrder: z.coerce.number().int().min(0),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
