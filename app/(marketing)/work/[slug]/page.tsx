import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolio, getSiteSettings } from "@/lib/content/get-site-content";
import {
  CASE_STUDIES,
  TODO,
  caseStudyPath,
  getCaseStudy,
  isCaseStudyVisible,
} from "@/lib/content/case-studies";
import { getService, servicePath } from "@/lib/content/services";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection, SectionHeading, primaryCta } from "@/components/marketing/page-header";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study || !isCaseStudyVisible(study)) return {};
  return {
    ...pageMetadata({ title: study.title, description: study.description, path: caseStudyPath(study.slug) }),
    ...(!study.published && { robots: { index: false, follow: false } }),
  };
}

/** Draft placeholders stand out when previewing locally. */
function Copy({ text }: { text: string }) {
  return text.startsWith(TODO) ? (
    <p className="rounded-lg border border-dashed border-amber-400/60 bg-amber-400/10 p-3 text-amber-200">{text}</p>
  ) : (
    <p>{text}</p>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study || !isCaseStudyVisible(study)) notFound();

  const [portfolio, settings] = await Promise.all([getPortfolio(), getSiteSettings()]);
  const project = portfolio.find((item) => item.slug === study.slug);
  if (!project) notFound();

  const services = study.services.map(getService).filter((item) => item !== undefined);
  const prose = "flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground";

  return (
    <main>
      {!study.published && (
        <p className="bg-amber-400 px-6 py-2 text-center text-sm font-semibold text-black">
          Draft case study: visible in local development only. Fill in lib/content/case-studies.ts
          and set published: true.
        </p>
      )}

      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: caseStudyPath(study.slug) },
        ]}
        eyebrow="Case study"
        title={project.title}
      >
        {project.description && <p>{project.description}</p>}
        <dl className="mt-2 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-label uppercase tracking-widest">Client</dt>
            <dd className="mt-1 text-base font-semibold text-foreground">{project.clientName ?? project.title}</dd>
          </div>
          <div>
            <dt className="font-label uppercase tracking-widest">Industry</dt>
            <dd className="mt-1 text-base font-semibold text-foreground">{study.industry}</dd>
          </div>
          <div>
            <dt className="font-label uppercase tracking-widest">Services</dt>
            <dd className="mt-1 flex flex-wrap gap-x-3 text-base font-semibold text-foreground">
              {services.map((service) => (
                <Link key={service.slug} href={servicePath(service.slug)} className="hover:text-brand">
                  {service.name}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
      </PageHeader>

      <div className="px-6 sm:px-10 lg:px-20">
        <Reveal className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden rounded-3xl bg-muted">
          <Image
            src={project.coverImageUrl}
            alt={`${project.title} project by Pixora Studio`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </Reveal>
      </div>

      <PageSection className="mt-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-14">
          <Reveal>
            <SectionHeading eyebrow="01" title="The problem" />
            <div className={prose}>
              <Copy text={study.problem} />
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="02" title="Research" />
            <div className={prose}>
              {study.research.map((text) => (
                <Copy key={text} text={text} />
              ))}
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="03" title="Process" />
            <div className={prose}>
              {study.process.map((text) => (
                <Copy key={text} text={text} />
              ))}
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="04" title="The solution" />
            <div className={prose}>
              {study.solution.map((text) => (
                <Copy key={text} text={text} />
              ))}
            </div>
          </Reveal>
          {(study.result || study.testimonial) && (
            <Reveal>
              <SectionHeading eyebrow="05" title="The result" />
              {study.result && <p className="text-2xl font-bold">{study.result}</p>}
              {study.testimonial && (
                <figure className="mt-6 rounded-2xl border border-border bg-background p-8">
                  <blockquote className="text-xl leading-relaxed">&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    {study.testimonial.name}, {study.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </Reveal>
          )}
        </div>
      </PageSection>

      <PageSection>
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-background p-8 sm:p-12">
          <h2 className="font-heading text-2xl font-extrabold uppercase sm:text-4xl">Need similar work?</h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Tell us what you&apos;re building. We&apos;ll come back within one working day with a scope
            and a fixed quote.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappUrl(settings.contact_whatsapp, `Hi Pixora Studio, I saw the ${project.title} project and I'd like something similar.`)}
              target="_blank"
              rel="noopener"
              className={primaryCta}
            >
              Start a project on WhatsApp <span aria-hidden>&rarr;</span>
            </a>
            {services[0] && (
              <Link href={servicePath(services[0].slug)} className="self-center text-sm font-semibold text-brand hover:underline">
                More about {services[0].name} in Patna
              </Link>
            )}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
