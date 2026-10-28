import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { INDUSTRIES, getIndustry, industryPath } from "@/lib/content/industries";
import { getService, servicePath } from "@/lib/content/services";
import { blogPath, getPost } from "@/lib/content/blog";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import {
  PageHeader,
  PageSection,
  SectionHeading,
  primaryCta,
  secondaryCta,
} from "@/components/marketing/page-header";
import { FaqList } from "@/components/marketing/faq-list";
import { ContactSection } from "@/components/marketing/contact-section";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.title,
    description: industry.description,
    path: industryPath(industry.slug),
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const settings = await getSiteSettings();
  const posts = industry.posts.map(getPost).filter((post) => post !== undefined);

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: industryPath(industry.slug) },
        ]}
        eyebrow={`Design for ${industry.name.toLowerCase()}`}
        title={industry.h1}
        actions={
          <>
            <a
              href={whatsappUrl(
                settings.contact_whatsapp,
                `Hi Pixora Studio, I'd like a quote for branding for our ${industry.singular}.`,
              )}
              target="_blank"
              rel="noopener"
              className={primaryCta}
            >
              Get a fixed quote in 1 day <span aria-hidden>&rarr;</span>
            </a>
            <a href="#contact" className={secondaryCta}>
              Send a brief
            </a>
          </>
        }
      >
        {industry.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHeader>

      <PageSection>
        <SectionHeading eyebrow="What we hear" title="Common challenges" />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {industry.challenges.map((challenge, index) => (
            <Reveal key={challenge.title} delay={index * 80} className="h-full">
              <li className="h-full bg-background p-8">
                <h3 className="text-lg font-bold">{challenge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{challenge.description}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="What we design" title={`Design for ${industry.name.toLowerCase()}`} />
        <ul className="grid gap-6 sm:grid-cols-2">
          {industry.offerings.map((offering) => {
            const service = getService(offering.service);
            if (!service) return null;
            return (
              <li key={offering.service}>
                <Link
                  href={servicePath(service.slug)}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-background p-8 transition-colors hover:border-brand"
                >
                  <h3 className="text-lg font-bold group-hover:text-brand">{service.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{offering.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Asked & answered" />
          <FaqList faqs={industry.faqs} />
        </div>
      </PageSection>

      {posts.length > 0 && (
        <PageSection>
          <SectionHeading eyebrow="Further reading" title="Guides" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={blogPath(post.slug)}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-background p-8 transition-colors hover:border-brand"
                >
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <ContactSection eyebrow="Start a project" />
    </main>
  );
}
