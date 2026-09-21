import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { DesignShapes } from "@/components/marketing/design-shapes";
import { getSiteImage } from "@/lib/content/get-site-content";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const logo = await getSiteImage("logo");

  return (
    <>
      <DesignShapes />
      <SiteHeader logo={logo} />
      {children}
      <SiteFooter />
    </>
  );
}
