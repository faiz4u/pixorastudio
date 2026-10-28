import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getPortfolio, getSiteSettings } from "@/lib/content/get-site-content";
import { SERVICES, getService, servicePath } from "@/lib/content/services";
import { whatsappUrl } from "@/lib/contact";
import { jsonLdScript, pageMetadata, serviceJsonLd } from "@/lib/seo";
import {
  PageHeader,
  PageSection,
  SectionHeading,
  primaryCta,
  secondaryCta,
} from "@/components/marketing/page-header";
import { FaqList } from "@/components/marketing/faq-list";
import { WorkCards } from "@/components/marketing/work-cards";
import { ContactSection } from "@/components/marketing/contact-section";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    // Titles that already carry a second phrase after "|" (per the SEO
    // report) would pass 60 characters with the studio suffix added.
    absoluteTitle: service.title.includes("|"),
    description: service.description,
    path: servicePath(service.slug),
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const [settings, portfolio] = await Promise.all([getSiteSettings(), getPortfolio()]);
  const work = portfolio.filter((project) => service.caseStudies.includes(project.slug));
  const related = service.related.map(getService).filter((item) => item !== undefined);
  const quoteUrl = whatsappUrl(
    settings.contact_whatsapp,
    `Hi Pixora Studio, I'd like a quote for ${service.name}.`,
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd(service))} />

      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: servicePath(service.slug) },
        ]}
        eyebrow="Services"
        title={service.h1}
        actions={
          <>
            <a href={quoteUrl} target="_blank" rel="noopener" className={primaryCta}>
              Get a fixed quote in 1 day <span aria-hidden>&rarr;</span>
            </a>
            <a href="#contact" className={secondaryCta}>
              Send a brief
            </a>
          </>
        }
      >
        {service.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHeader>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading eyebrow="Who it's for" title="Built for businesses like yours" />
            <ul className="flex flex-col gap-4">
              {service.audience.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed">
                  <Check aria-hidden className="mt-1.5 size-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <SectionHeading eyebrow="What you get" title="Deliverables" />
            <ul className="flex flex-col gap-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed">
                  <Check aria-hidden className="mt-1.5 size-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal direction="left">
            <SectionHeading eyebrow="Research-driven" title={service.research.heading} />
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
              {service.research.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {service.process.map((step, index) => (
                <li key={step.title} className="flex flex-col gap-2 bg-background p-6">
                  <span className="text-base font-bold text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid gap-6 rounded-2xl border border-border bg-background p-8 sm:grid-cols-2">
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">Timeline</p>
            <p className="mt-2 text-lg font-semibold">{service.timeline}</p>
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">Pricing</p>
            <p className="mt-2 text-lg font-semibold">
              {service.startingFrom
                ? `Starting from ${service.startingFrom}. Fixed quote within one working day.`
                : "Fixed price, quoted within one working day of your brief."}
            </p>
            <Link href="/pricing" className="mt-2 inline-block text-sm text-brand hover:underline">
              See how our pricing works
            </Link>
          </div>
        </Reveal>
      </PageSection>

      {work.length > 0 && (
        <PageSection>
          <SectionHeading eyebrow="Selected work" title={`${service.name} projects`} />
          <WorkCards projects={work} />
        </PageSection>
      )}

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal direction="left">
            <SectionHeading eyebrow="FAQ" title={`${service.name}: asked & answered`} />
          </Reveal>
          <Reveal direction="right" delay={100}>
            <FaqList faqs={service.faqs} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Related services" title="Often booked together" />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={servicePath(item.slug)}
                className="group flex h-full flex-col gap-3 bg-background p-8 transition-colors hover:bg-brand"
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-white/80">
                  {item.summary}
                </p>
                <span className="mt-auto text-sm font-semibold">
                  Learn more <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <ContactSection eyebrow="Start a project" />
    </main>
  );
}
