import Link from "next/link";
import { getPortfolio } from "@/lib/content/get-site-content";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection, primaryCta } from "@/components/marketing/page-header";
import { WorkCards } from "@/components/marketing/work-cards";
import { CtaBanner } from "@/components/marketing/cta-banner";

export const metadata = pageMetadata({
  title: "Portfolio: Branding, UI/UX & Websites",
  description:
    "Selected brand identity, UI/UX and website design projects by Pixora Studio, a research-driven design studio in Patna, Bihar.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getPortfolio();

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
        eyebrow="Selected work"
        title="Real problems, meaningful solutions"
        actions={
          <Link href="/services" className={primaryCta}>
            See our services <span aria-hidden>&rarr;</span>
          </Link>
        }
      >
        <p>
          A selection of brand identity, UI/UX and website projects. Each one started with research
          into the people it was for.
        </p>
      </PageHeader>

      <PageSection>
        <WorkCards projects={projects} />
      </PageSection>

      <CtaBanner href="/contact" />
    </main>
  );
}
