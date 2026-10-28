import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { DesignShapes } from "@/components/marketing/design-shapes";
import { MobileContactBar } from "@/components/marketing/mobile-contact-bar";
import { NotFoundContent } from "@/components/marketing/not-found-content";
import { getSiteImage } from "@/lib/content/get-site-content";

// Next adds noindex to 404 responses on its own; this just replaces the
// homepage title the 404 would otherwise inherit from the root layout.
export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * 404 for URLs that match no route. It renders inside the root layout only,
 * so it adds the marketing chrome itself (same pieces as
 * app/(marketing)/layout.tsx). notFound() calls from marketing pages use
 * app/(marketing)/not-found.tsx instead, which that layout already wraps.
 */
export default async function NotFound() {
  const logo = await getSiteImage("logo");

  return (
    <>
      <DesignShapes />
      <SiteHeader logo={logo} />
      <NotFoundContent />
      <SiteFooter />
      <MobileContactBar />
    </>
  );
}
