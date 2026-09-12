import { z } from "zod";

/**
 * Validates process.env once at startup so a missing/misconfigured variable
 * fails fast with a clear message instead of causing a confusing runtime error
 * deep inside Supabase/Resend calls.
 */
// Turns "" (how an unset var lands via .env files) into undefined so
// `.optional()` behaves as expected instead of failing validation.
const optionalString = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().optional(),
);
const optionalEmail = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().email().optional(),
);

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  RESEND_API_KEY: optionalString,
  LEAD_NOTIFICATION_FROM_EMAIL: optionalEmail,
  LEAD_NOTIFICATION_TO_EMAIL: optionalEmail,
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_NOTIFICATION_FROM_EMAIL: process.env.LEAD_NOTIFICATION_FROM_EMAIL,
  LEAD_NOTIFICATION_TO_EMAIL: process.env.LEAD_NOTIFICATION_TO_EMAIL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)}`,
  );
}

export const env = parsed.data;

/** True once Resend + sender/recipient addresses are all configured. */
export const isLeadEmailConfigured = Boolean(
  env.RESEND_API_KEY && env.LEAD_NOTIFICATION_FROM_EMAIL && env.LEAD_NOTIFICATION_TO_EMAIL,
);
