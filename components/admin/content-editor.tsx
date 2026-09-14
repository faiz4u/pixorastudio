"use client";

import type { Database } from "@/types/database";
import { saveCapability, deleteCapability, saveProcessStep, deleteProcessStep } from "@/lib/actions/content";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { TitledItemsManager } from "@/components/admin/titled-items-manager";
import { FaqItemsManager, type FaqItem } from "@/components/admin/faq-items-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
type Capability = Database["public"]["Tables"]["capabilities"]["Row"];
type ProcessStep = Database["public"]["Tables"]["process_steps"]["Row"];

export function ContentEditor({
  settings,
  capabilities,
  processSteps,
  faqItems,
}: {
  settings: SiteSettings;
  capabilities: Capability[];
  processSteps: ProcessStep[];
  faqItems: FaqItem[];
}) {
  return (
    <Tabs defaultValue="copy">
      <TabsList>
        <TabsTrigger value="copy">Site copy</TabsTrigger>
        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        <TabsTrigger value="process">Process</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="copy" className="pt-6">
        <SiteSettingsForm settings={settings} />
      </TabsContent>

      <TabsContent value="capabilities" className="pt-6">
        <TitledItemsManager
          items={capabilities}
          itemLabel="capability"
          saveAction={saveCapability}
          deleteAction={deleteCapability}
        />
      </TabsContent>

      <TabsContent value="process" className="pt-6">
        <TitledItemsManager
          items={processSteps}
          itemLabel="process step"
          saveAction={saveProcessStep}
          deleteAction={deleteProcessStep}
        />
      </TabsContent>

      <TabsContent value="faq" className="pt-6">
        <FaqItemsManager items={faqItems} />
      </TabsContent>
    </Tabs>
  );
}
