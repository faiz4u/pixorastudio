import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getCounts() {
  const supabase = await createClient();

  const [portfolio, newLeads, totalLeads] = await Promise.all([
    supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("leads").select("id", { count: "exact", head: true }),
  ]);

  return {
    portfolioCount: portfolio.count ?? 0,
    newLeadsCount: newLeads.count ?? 0,
    totalLeadsCount: totalLeads.count ?? 0,
    // Any error here almost certainly means the Phase 1 migrations haven't
    // been applied to this Supabase project yet.
    schemaReady: !portfolio.error && !newLeads.error && !totalLeads.error,
  };
}

export default async function AdminOverviewPage() {
  const { portfolioCount, newLeadsCount, totalLeadsCount, schemaReady } = await getCounts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {!schemaReady && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Couldn&apos;t read the database tables. Make sure the SQL in supabase/migrations has been
          run against this Supabase project.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Portfolio projects
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{portfolioCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">New leads</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{newLeadsCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total leads
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{totalLeadsCount}</CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/admin/portfolio" className="text-brand hover:underline">
          Manage portfolio &rarr;
        </Link>
        <Link href="/admin/leads" className="text-brand hover:underline">
          View leads &rarr;
        </Link>
        <Link href="/admin/content" className="text-brand hover:underline">
          Edit site content &rarr;
        </Link>
      </div>
    </div>
  );
}
