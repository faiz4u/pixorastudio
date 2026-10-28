import Link from "next/link";
import { INDUSTRIES, industryPath } from "@/lib/content/industries";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection, primaryCta } from "@/components/marketing/page-header";
import { CtaBanner } from "@/components/marketing/cta-banner";

export const metadata = pageMetadata({
  title: "Industries We Design For in Patna and Bihar",
  description:
    "Branding, websites and marketing design for coaching institutes, schools and other Bihar businesses, from a research-driven studio in Patna.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
        eyebrow="Industries"
        title="Design for Bihar's businesses"
        actions={
          <Link href="/services" className={primaryCta}>
            See all services <span aria-hidden>&rarr;</span>
          </Link>
        }
      >
        <p>
          Every industry buys differently. These pages cover what we have learned about designing for
          specific sectors in Patna and across Bihar.
        </p>
      </PageHeader>

      <PageSection>
        <ul className="grid gap-6 sm:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <li key={industry.slug}>
              <Link
                href={industryPath(industry.slug)}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-background p-8 transition-colors hover:border-brand"
              >
                <h2 className="text-xl font-bold">{industry.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
                <span className="mt-auto text-sm font-semibold text-brand-text">
                  Learn more <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <CtaBanner href="/contact" />
    </main>
  );
}
