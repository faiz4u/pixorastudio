import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import { PortfolioManager, type AdminPortfolioProject } from "@/components/admin/portfolio-manager";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("display_order", { ascending: true });

  const projects: AdminPortfolioProject[] = (data ?? []).map((project) => ({
    ...project,
    coverImageUrl: project.cover_image_path
      ? getPublicStorageUrl("portfolio", project.cover_image_path)
      : null,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Portfolio</h1>
        <p className="text-sm text-muted-foreground">
          Create, edit, and publish portfolio projects shown on the public site.
        </p>
      </div>

      <PortfolioManager projects={projects} />
    </div>
  );
}
