import { MessageCircle, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { telUrl, whatsappUrl } from "@/lib/contact";

/**
 * Sticky WhatsApp + Call bar on phones (SEO report, section 11): most Bihar
 * visitors arrive on mobile and prefer WhatsApp, so contact stays one tap
 * away on every page. Renders its own spacer so it never covers the footer.
 */
export async function MobileContactBar() {
  const settings = await getSiteSettings();

  return (
    <>
      <div aria-hidden className="h-16 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-border bg-border pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={whatsappUrl(settings.contact_whatsapp)}
          target="_blank"
          rel="noopener"
          className="flex h-16 items-center justify-center gap-2 bg-brand text-sm font-bold text-white"
        >
          <MessageCircle aria-hidden className="size-5" /> WhatsApp
        </a>
        <a
          href={telUrl(settings.contact_whatsapp)}
          className="flex h-16 items-center justify-center gap-2 bg-background text-sm font-bold"
        >
          <Phone aria-hidden className="size-5" /> Call
        </a>
      </div>
    </>
  );
}
