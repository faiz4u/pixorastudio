import { createClient } from "@/lib/supabase/server";
import { LeadsTable } from "@/components/admin/leads-table";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Review contact-form submissions and update their status.
        </p>
      </div>

      <LeadsTable leads={leads ?? []} />
    </div>
  );
}
