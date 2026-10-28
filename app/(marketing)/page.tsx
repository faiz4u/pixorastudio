import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { Marquee } from "@/components/marketing/marquee";
import { WhySection } from "@/components/marketing/why-section";
import { PortfolioSection } from "@/components/marketing/portfolio-section";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { ContactSection } from "@/components/marketing/contact-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { getSiteImage, getSiteSettings } from "@/lib/content/get-site-content";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  jsonLdScript,
  pageMetadata,
  professionalServiceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const [settings, logo] = await Promise.all([getSiteSettings(), getSiteImage("logo")]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd(settings, logo.url))}
      />
      <HeroSection />
      <Marquee />
      <WhySection />
      <PortfolioSection />
      <CapabilitiesSection />
      <ProcessSection />
      <ContactSection />
      <FaqSection />
      <CtaBanner />
    </main>
  );
}
