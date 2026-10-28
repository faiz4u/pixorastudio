import Link from "next/link";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { SERVICES, servicePath } from "@/lib/content/services";
import { BUDGET_RANGE_OPTIONS } from "@/lib/validation/lead";
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
import { Reveal } from "@/components/marketing/reveal";

export const metadata = pageMetadata({
  title: "Logo, Website & UI/UX Design Pricing in Patna",
  absoluteTitle: true,
  description:
    "How much logo, website and UI/UX design costs at Pixora Studio, Patna. Fixed prices, typical budgets and timelines, and a quote within one working day.",
  path: "/pricing",
});

/**
 * Bands match the homepage FAQ ("identity work and websites usually start in
 * the ₹50k–₹1.5L band; product design and retainers sit higher") and the
 * enquiry form's budget options. Per-service "starting from" figures come
 * from lib/content/services.ts once the studio sets them.
 */
const BANDS: Array<{ range: (typeof BUDGET_RANGE_OPTIONS)[number]; fits: string }> = [
  {
    range: "Under ₹50k",
    fits: "Focused, smaller scopes: a social media kit, a pitch deck, print collateral, or a logo refresh.",
  },
  {
    range: "₹50k – ₹1.5L",
    fits: "Where most brand identity and marketing website projects sit.",
  },
  {
    range: "₹1.5L – ₹5L",
    fits: "Larger identity systems, multi-section websites, and UI/UX for an app or web product.",
  },
  {
    range: "₹5L+ / retainer",
    fits: "End-to-end product design, design systems and ongoing monthly design support.",
  },
];

const PRICE_FACTORS = [
  "Scope: the number of deliverables, pages, screens or templates",
  "Research depth: how many interviews, audits and rounds of user testing",
  "Content: whether you supply final copy and photos, or need help shaping them",
  "Timeline: rush deadlines need more people working in parallel",
];

const PRICING_FAQS = [
  {
    question: "Why don't you charge by the hour?",
    answer:
      "Fixed prices protect you from surprise bills and let you budget with confidence. We agree the scope up front, quote one price, and stick to it.",
  },
  {
    question: "What if my budget is smaller than the band?",
    answer:
      "Tell us your budget when you send your brief. We will tell you honestly what it can buy, and suggest a smaller first phase if that makes more sense.",
  },
  {
    question: "How do payments work?",
    answer:
      "A 50% advance once you approve the quote, and the balance at handover. Kickoff happens the same week as the advance.",
  },
  {
    question: "Is anything not included in the quote?",
    answer:
      "Third-party costs such as printing, stock photos, paid fonts, domains and hosting are not included unless the quote says so. We flag them before you approve.",
  },
];

export default async function PricingPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
        eyebrow="Pricing"
        title="Clear, fixed design pricing"
        actions={
          <>
            <a
              href={whatsappUrl(settings.contact_whatsapp, "Hi Pixora Studio, I'd like a quote for a project.")}
              target="_blank"
              rel="noopener"
              className={primaryCta}
            >
              Get a fixed quote in 1 day <span aria-hidden>&rarr;</span>
            </a>
            <Link href="/contact" className={secondaryCta}>
              Send a brief
            </Link>
          </>
        }
      >
        <p>
          Every project at Pixora Studio is quoted at a fixed price, within one working day of your
          brief. No hourly billing and no surprise invoices. Here is what typical projects cost, and
          what moves the price.
        </p>
      </PageHeader>

      <PageSection>
        <SectionHeading eyebrow="Typical budgets" title="Where projects usually land" />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {BANDS.map((band, index) => (
            <Reveal key={band.range} delay={index * 80} className="h-full">
              <li className="flex h-full flex-col gap-3 bg-background p-8">
                <p className="text-2xl font-extrabold text-brand">{band.range}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{band.fits}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="By service" title="Timelines and pricing per service" />
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary font-label text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th scope="col" className="p-4 sm:p-5">Service</th>
                <th scope="col" className="hidden p-5 sm:table-cell">Typical timeline</th>
                <th scope="col" className="p-4 sm:p-5">Price</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((service) => (
                <tr key={service.slug} className="border-t border-border bg-background">
                  <th scope="row" className="p-4 font-semibold sm:p-5">
                    <Link href={servicePath(service.slug)} className="hover:text-brand">
                      {service.name}
                    </Link>
                  </th>
                  <td className="hidden p-5 text-muted-foreground sm:table-cell">{service.timeline}</td>
                  <td className="p-4 text-muted-foreground sm:p-5">
                    {service.startingFrom ? `From ${service.startingFrom}` : "Fixed quote per project"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading eyebrow="What moves the price" title="What affects the cost" />
            <ul className="flex list-disc flex-col gap-3 pl-5 text-lg leading-relaxed text-muted-foreground">
              {PRICE_FACTORS.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <SectionHeading eyebrow="Always included" title="In every quote" />
            <ul className="flex list-disc flex-col gap-3 pl-5 text-lg leading-relaxed text-muted-foreground">
              <li>Research into your customers and competitors before design starts</li>
              <li>Full ownership of every final file, with source files and exports</li>
              <li>A handover call so your team knows how to use what we made</li>
            </ul>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Pricing questions" />
          <FaqList faqs={PRICING_FAQS} />
        </div>
      </PageSection>
    </main>
  );
}
