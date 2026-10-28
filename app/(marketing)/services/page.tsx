import Link from "next/link";
import { SERVICES, servicePath } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection, primaryCta } from "@/components/marketing/page-header";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Reveal } from "@/components/marketing/reveal";

export const metadata = pageMetadata({
  title: "Design Services in Patna",
  description:
    "Brand identity, UI/UX, product design, websites, social media creatives, pitch decks and graphic design from a research-driven studio in Patna.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        eyebrow="Services"
        title="Design services, one studio"
        actions={
          <Link href="/contact" className={primaryCta}>
            Start a project <span aria-hidden>&rarr;</span>
          </Link>
        }
      >
        <p>
          From a first logo to a full product design system, every project at Pixora Studio starts
          with research into your customers and competitors. Hire us for one service or the whole
          system. Based in Patna, working with businesses across Bihar and India.
        </p>
      </PageHeader>

      <PageSection>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <li className="h-full">
                <Link
                  href={servicePath(service.slug)}
                  className="group flex h-full min-h-[220px] flex-col gap-3 bg-background p-8 transition-colors hover:bg-brand"
                >
                  <span className="text-base font-bold text-brand transition-colors group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-bold">{service.name}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/80">
                    {service.summary}
                  </p>
                  <span className="mt-auto text-sm font-semibold">
                    Explore <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </PageSection>

      <CtaBanner href="/contact" />
    </main>
  );
}
