import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Wraps every authenticated admin page with the sidebar shell. The proxy
 * (middleware.ts -> proxy.ts) already redirects unauthenticated requests to
 * /admin/login before they reach here; this check is defense in depth so a
 * bug in the proxy can't be the only thing gating write access.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell adminEmail={user.email ?? "Admin"}>{children}</AdminShell>;
}
