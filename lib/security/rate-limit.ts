import "server-only";
import { headers } from "next/headers";
import { createHmac } from "node:crypto";
import { env } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Best-effort caller identifier from the platform's proxy headers, turned
 * into a keyed hash (HMAC with the server-only secret key) so we never store
 * a visitor's raw IP address. A plain SHA-256 of an IP isn't enough: the
 * IPv4 space is small enough to reverse by brute force. `x-real-ip` is
 * preferred because hosting platforms set it themselves, whereas the first
 * `x-forwarded-for` entry can be supplied by the client. Falls back to a
 * constant when no proxy header is present (e.g. local dev) — rate limiting
 * still applies, just shared across all such callers.
 */
async function getRequestIdentifier() {
  const headerList = await headers();
  const ip =
    headerList.get("x-real-ip")?.trim() ||
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return createHmac("sha256", env.SUPABASE_SECRET_KEY).update(ip).digest("hex");
}

/**
 * Atomically checks and records a hit against a per-source, per-visitor
 * limit via the `check_and_record_rate_limit` Postgres function (see
 * supabase/migrations/0006_rate_limiting.sql). The function is executable
 * only with the secret key (0007_security_hardening.sql), so the public
 * can't call it to record hits against someone else. Fails open (allows the
 * request through) if the check itself errors — a database hiccup should
 * never block a genuine visitor.
 */
export async function checkRateLimit(
  source: "lead" | "appointment",
  options: { maxHits: number; windowSeconds: number },
): Promise<boolean> {
  const identifier = await getRequestIdentifier();
  const { data, error } = await createAdminClient().rpc("check_and_record_rate_limit", {
    p_source: source,
    p_identifier: identifier,
    p_max_hits: options.maxHits,
    p_window_seconds: options.windowSeconds,
  });

  if (error) return true;
  return data === true;
}
