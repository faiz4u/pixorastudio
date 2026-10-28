import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqPageJsonLd, jsonLdScript } from "@/lib/seo";

/**
 * FAQ accordion plus FAQPage structured data. Answers are force-mounted so
 * they're in the server-rendered HTML even while collapsed.
 */
export function FaqList({ faqs }: { faqs: ReadonlyArray<{ id?: string; question: string; answer: string }> }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(faqs))} />
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl border border-border bg-background px-6 sm:px-10"
      >
        {faqs.map((faq, index) => {
          const value = faq.id ?? `faq-${index}`;
          return (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="py-7 text-left text-lg font-semibold sm:py-8 sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                forceMount
                className="pb-7 text-sm leading-relaxed text-muted-foreground sm:pb-8 sm:text-base"
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
