import { createClient } from "@/lib/supabase/server";
import { SITE_SETTINGS_SEED } from "@/lib/content/site-content";
import { ContentEditor } from "@/components/admin/content-editor";

export default async function AdminContentPage() {
  const supabase = await createClient();

  const [{ data: settings }, { data: capabilities }, { data: processSteps }, { data: faqItems }] =
    await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("capabilities").select("*").order("display_order", { ascending: true }),
      supabase.from("process_steps").select("*").order("display_order", { ascending: true }),
      supabase.from("faq_items").select("*").order("display_order", { ascending: true }),
    ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Content</h1>
        <p className="text-sm text-muted-foreground">
          Edit hero copy, &quot;Why Pixora&quot;, capabilities, process steps and FAQ.
        </p>
      </div>

      <ContentEditor
        settings={settings ?? { id: 1, ...SITE_SETTINGS_SEED, updated_at: new Date().toISOString() }}
        capabilities={capabilities ?? []}
        processSteps={processSteps ?? []}
        faqItems={faqItems ?? []}
      />
    </div>
  );
}
