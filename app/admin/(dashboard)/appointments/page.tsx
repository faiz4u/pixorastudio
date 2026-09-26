import { createClient } from "@/lib/supabase/server";
import { AppointmentsTable } from "@/components/admin/appointments-table";

export default async function AdminAppointmentsPage() {
  const supabase = await createClient();
  // Soonest requested date first, so upcoming meetings are at the top.
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .order("preferred_date", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-sm text-muted-foreground">
          Review meeting requests and mark them confirmed or cancelled once you&apos;ve replied.
        </p>
      </div>

      <AppointmentsTable appointments={appointments ?? []} />
    </div>
  );
}
