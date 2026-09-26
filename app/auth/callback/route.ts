import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing point for Supabase auth email links (currently just password
 * reset). Exchanges the link's one-time code for a session cookie, then
 * forwards to `next`. Handles both the default PKCE `?code=` link and the
 * `?token_hash=&type=` form used by customised email templates.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  // Only ever forward within the admin area, never to an arbitrary URL.
  const nextParam = searchParams.get("next");
  const next = nextParam?.startsWith("/admin/") ? nextParam : "/admin";

  const supabase = await createClient();

  let failed = true;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    failed = Boolean(error);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    failed = Boolean(error);
  }

  if (failed) {
    return NextResponse.redirect(new URL("/admin/forgot-password?error=invalid-link", request.url));
  }

  return NextResponse.redirect(new URL(next, request.url));
}
