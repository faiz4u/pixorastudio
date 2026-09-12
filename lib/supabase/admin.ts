import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Privileged Supabase client using the secret key. Bypasses Row Level
 * Security entirely — never import this outside trusted server code (server
 * actions/route handlers that have already verified the caller is the admin),
 * and never send this key to the browser.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
