import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

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
        <h1 className="mb-6 text-lg font-semibold">Admin sign in</h1>
        <LoginForm redirectTo={redirectTo && redirectTo.startsWith("/admin") ? redirectTo : "/admin"} />
      </div>
    </main>
  );
}
