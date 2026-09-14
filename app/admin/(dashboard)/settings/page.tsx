import { createClient } from "@/lib/supabase/server";
import { AccountSettingsForm } from "@/components/admin/account-settings-form";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Account security settings.</p>
      </div>

      <AccountSettingsForm email={user?.email ?? ""} />
    </div>
  );
}
