import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { whatsappUrl } from "@/lib/contact";
import { PageSection, primaryCta, secondaryCta } from "@/components/marketing/page-header";

// Reached only after an enquiry is sent (components/marketing/contact-form.tsx),
// so it can be used as a conversion page in analytics. Kept out of search.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  "We read your brief and may message you on WhatsApp with one or two clarifying questions.",
  "Within one working day, you get our point of view, a scope and a fixed quote.",
  "Approve the quote and pay the 50% advance, and kickoff happens the same week.",
];

export default async function ThankYouPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <PageSection className="border-t-0">
        <div className="mx-auto max-w-2xl py-8 text-center">
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Brief received
          </p>
          <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            Thank you. We&apos;re on it.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">Here&apos;s what happens next:</p>
          <ol className="mt-6 flex flex-col gap-4 text-left">
            {NEXT_STEPS.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl border border-border bg-background p-5">
                <span className="text-base font-bold text-brand">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={whatsappUrl(settings.contact_whatsapp)} target="_blank" rel="noopener" className={primaryCta}>
              Message us on WhatsApp <span aria-hidden>&rarr;</span>
            </a>
            <Link href="/work" className={secondaryCta}>
              See our work
            </Link>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
