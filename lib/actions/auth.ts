"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import { loginSchema, forgotPasswordSchema } from "@/lib/validation/auth";
import { passwordSchema } from "@/lib/validation/account";

export type LoginActionState = {
  error?: string;
};

/**
 * Signs in the admin with email/password. There is no public sign-up flow —
 * the one admin account is created directly in the Supabase dashboard — so
 * this only ever authenticates that single user.
 */
export async function login(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "Incorrect email or password." };
  }

  const redirectTo = formData.get("redirectTo");
  redirect(typeof redirectTo === "string" && redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type PasswordResetActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Emails a password-reset link. The link goes through Supabase, then to
 * /auth/callback (which exchanges it for a short-lived session) and on to
 * /admin/reset-password. Always reports success for a valid address so the
 * form can't be used to discover which emails have an account.
 */
export async function requestPasswordReset(
  _prevState: PasswordResetActionState,
  formData: FormData,
): Promise<PasswordResetActionState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const redirectTo = new URL("/auth/callback", env.NEXT_PUBLIC_SITE_URL);
  redirectTo.searchParams.set("next", "/admin/reset-password");

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: redirectTo.toString(),
  });

  // Supabase Auth rate-limits reset emails itself; surface that one case,
  // since telling the admin to wait doesn't reveal whether the account exists.
  if (error?.status === 429) {
    return { status: "error", message: "Too many requests — please wait a minute and try again." };
  }

  return {
    status: "success",
    message: "If that email belongs to an admin account, a reset link is on its way. Check your inbox.",
  };
}

/** Sets a new password for the user signed in via the reset link's session. */
export async function resetPassword(
  _prevState: PasswordResetActionState,
  formData: FormData,
): Promise<PasswordResetActionState> {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { status: "error", message: "Your reset link has expired. Request a new one." };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: error.message };

  redirect("/admin");
}
