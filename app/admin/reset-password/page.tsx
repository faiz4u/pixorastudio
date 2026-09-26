import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

/**
 * Reached from the password-reset email via /auth/callback, which has
 * already signed the admin in with a recovery session. Lives outside the
 * (dashboard) group so it renders without the admin sidebar.
 */
export default async function AdminResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/forgot-password?error=invalid-link");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <Image
        src="/brand/logo-wordmark.png"
        alt="Pixora Studio"
        width={180}
        height={40}
        className="h-[40px] w-[180px]"
        priority
      />
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <h1 className="mb-2 text-lg font-semibold">Set a new password</h1>
        <p className="mb-6 truncate text-sm text-muted-foreground">For {user.email}</p>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
