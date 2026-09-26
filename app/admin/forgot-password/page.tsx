import Image from "next/image";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/admin/forgot-password-form";

export default async function AdminForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

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
        <h1 className="mb-2 text-lg font-semibold">Reset your password</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your admin email and we&apos;ll send you a link to set a new password.
        </p>

        {error === "invalid-link" && (
          <p className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            That reset link is invalid or has expired. Request a new one below — and open it in the
            same browser you requested it from.
          </p>
        )}

        <ForgotPasswordForm />

        <Link href="/admin/login" className="mt-6 block text-center text-sm text-brand hover:underline">
          &larr; Back to sign in
        </Link>
      </div>
    </main>
  );
}
