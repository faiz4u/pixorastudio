import "server-only";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import type { createClient } from "@/lib/supabase/server";

/**
 * Best-effort caller identifier from the platform's proxy headers, hashed so
 * we never store a visitor's raw IP address. Falls back to a constant when
 * no proxy header is present (e.g. local dev) — rate limiting still applies,
 * just shared across all such callers.
 */
async function getRequestIdentifier() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Atomically checks and records a hit against a per-source, per-visitor
 * limit via the `check_and_record_rate_limit` Postgres function (see
 * supabase/migrations/0006_rate_limiting.sql). Fails open (allows the
 * request through) if the check itself errors — a database hiccup should
 * never block a genuine visitor.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  source: "lead" | "appointment",
  options: { maxHits: number; windowSeconds: number },
): Promise<boolean> {
  const identifier = await getRequestIdentifier();
  const { data, error } = await supabase.rpc("check_and_record_rate_limit", {
    p_source: source,
    p_identifier: identifier,
    p_max_hits: options.maxHits,
    p_window_seconds: options.windowSeconds,
  });

  if (error) return true;
  return data === true;
}
