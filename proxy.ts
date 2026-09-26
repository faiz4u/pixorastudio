import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

/**
 * Runs on every request. Refreshes the Supabase session cookie (required by
 * @supabase/ssr) and blocks unauthenticated access to /admin/**. The admin
 * dashboard's own layout re-checks the session server-side as defense in
 * depth, so a bug here can't be the only thing standing between the public
 * and write access.
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");
  // Signed-out admins must be able to request a reset link.
  const isForgotPasswordRoute = pathname.startsWith("/admin/forgot-password");

  if (pathname.startsWith("/admin/reset-password") && !user) {
    // Only reachable with the recovery session the email link creates.
    return NextResponse.redirect(new URL("/admin/forgot-password?error=invalid-link", request.url));
  }

  if (isAdminRoute && !isLoginRoute && !isForgotPasswordRoute && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on everything except static assets/images, so the session cookie
     * stays fresh across the whole app, not just /admin.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
