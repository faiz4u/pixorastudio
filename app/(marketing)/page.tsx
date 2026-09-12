import { HeroSection } from "@/components/marketing/hero-section";
import { Marquee } from "@/components/marketing/marquee";
import { WhySection } from "@/components/marketing/why-section";
import { PortfolioSection } from "@/components/marketing/portfolio-section";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { ContactSection } from "@/components/marketing/contact-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HomePage() {
  return (
    <main>
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
