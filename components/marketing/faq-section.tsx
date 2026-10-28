import { getFaqItems } from "@/lib/content/get-site-content";
import { FaqList } from "@/components/marketing/faq-list";
import { Reveal } from "@/components/marketing/reveal";

export async function FaqSection() {
  const faqs = await getFaqItems();

  return (
    <section id="faq" className="border-t border-border px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal direction="left">
          <div>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              05 &mdash; FAQ
            </p>
            <h2 className="max-w-sm font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              Asked &amp; answered.
            </h2>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Still unsure? Send the question on WhatsApp, you&apos;ll get a straight answer, not a
              brochure.
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <FaqList faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
