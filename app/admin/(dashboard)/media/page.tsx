import { getSiteImage } from "@/lib/content/get-site-content";
import { MediaManager, type SiteImageSlot } from "@/components/admin/media-manager";

const SLOT_LABELS: Record<SiteImageSlot["slot"], string> = {
  hero: "Hero image",
  about_office: "About / office image",
  cta_banner: "CTA banner image",
};

export default async function AdminMediaPage() {
  const slots = await Promise.all(
    (Object.keys(SLOT_LABELS) as SiteImageSlot["slot"][]).map(async (slot) => {
      const image = await getSiteImage(slot);
      return { slot, label: SLOT_LABELS[slot], url: image.url, altText: image.alt };
    }),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Media</h1>
        <p className="text-sm text-muted-foreground">Replace the hero, about and CTA images.</p>
      </div>

      <MediaManager slots={slots} />
    </div>
  );
}
