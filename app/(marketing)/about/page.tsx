import Image from "next/image";
import Link from "next/link";
import {
  getProcessSteps,
  getSiteImage,
  getSiteSettings,
  getWhyPrinciples,
} from "@/lib/content/get-site-content";
import { ABOUT } from "@/lib/content/about";
import { SERVICES, servicePath } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";
import {
  PageHeader,
  PageSection,
  SectionHeading,
  primaryCta,
  secondaryCta,
} from "@/components/marketing/page-header";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Reveal } from "@/components/marketing/reveal";

export const metadata = pageMetadata({
  title: "About Our Research-Driven Studio in Patna",
  description:
    "Pixora Studio is a research-driven design studio in Patna, Bihar. We design brands and digital products for Bihar's businesses and India's startups.",
  path: "/about",
});

const PILLARS = [
  {
    title: "Research before aesthetics",
    description: "Every project starts by understanding people, competitors and context, not by picking colours.",
  },
  {
    title: "A fixed quote in one working day",
    description: "Send a brief and get a scope and a fixed price within a working day. No hourly surprises.",
  },
  {
    title: "Patna-rooted, India-capable",
    description:
      "We meet local clients in person, and run the same process over calls for clients across India and abroad.",
  },
  {
    title: "One studio for brand, product and presentation",
    description: "Identity, websites, apps, social creatives and decks, designed to work as one system.",
  },
];

export default async function AboutPage() {
  const [settings, principles, steps, officeImage] = await Promise.all([
    getSiteSettings(),
    getWhyPrinciples(),
    getProcessSteps(),
    getSiteImage("about_office"),
  ]);
  const { founder } = ABOUT;

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About Pixora Studio"
        title="A research-driven design studio in Patna"
        actions={
          <>
            <Link href="/contact" className={primaryCta}>
              Start a project <span aria-hidden>&rarr;</span>
            </Link>
            <Link href="/work" className={secondaryCta}>
              See our work
            </Link>
          </>
        }
      >
        <p>
          Pixora Studio designs brands and digital products for Bihar&apos;s businesses and
          India&apos;s startups, starting with research, not decoration.
          {ABOUT.foundedYear && ` Founded in Patna in ${ABOUT.foundedYear}.`}
        </p>
        {ABOUT.firstStudioBasis && <p>{ABOUT.firstStudioBasis}</p>}
      </PageHeader>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <SectionHeading eyebrow="Why we exist" title={settings.why_heading} />
            <p className="text-2xl font-semibold">{settings.why_subheading}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{settings.why_body}</p>
          </Reveal>
          <Reveal direction="right" delay={100} className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src={officeImage.url}
              alt={officeImage.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </PageSection>

      {founder.name && (
        <PageSection>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            {founder.photo && (
              <Reveal direction="left" className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} at Pixora Studio`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </Reveal>
            )}
            <Reveal direction="right" delay={100}>
              <SectionHeading eyebrow="The founder" title={founder.name} />
              <p className="font-label text-xs uppercase tracking-widest text-brand">{founder.role}</p>
              <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
                {founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  {founder.name} on LinkedIn &#8599;
                </a>
              )}
            </Reveal>
          </div>
        </PageSection>
      )}

      <PageSection>
        <SectionHeading eyebrow="What we believe" title={`${principles.length} principles`} />
        <ol className="grid gap-8 sm:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.id} delay={index * 80}>
              <li>
                <p className="text-xl font-bold text-brand">
                  {String(index + 1).padStart(2, "0")} &mdash; {principle.title}
                </p>
                <p className="mt-2 text-lg text-muted-foreground">{principle.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="How we work" title="Four promises on every project" />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <li key={pillar.title} className="bg-background p-8">
              <h3 className="text-lg font-bold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
            </li>
          ))}
        </ul>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.id}>
              <span className="text-base font-bold text-brand">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold uppercase tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="What we do" title="Services" />
        <ul className="flex flex-wrap gap-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={servicePath(service.slug)}
                className="inline-block rounded-full border border-brand/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-brand hover:text-white"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <CtaBanner href="/contact" />
    </main>
  );
}
