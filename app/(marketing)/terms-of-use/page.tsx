import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { LEGAL, legalPlace, legalStudioIdentity } from "@/lib/content/legal";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms for using the ${LEGAL.studioName} website.`,
  alternates: { canonical: "/terms-of-use" },
};

/**
 * Website-use terms (browsing, forms, content). Client projects are covered
 * separately by /terms (Terms & Conditions).
 */
export default async function TermsOfUsePage() {
  const settings = await getSiteSettings();
  const mail = <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>;
  const studio = LEGAL.studioName;
  const seat = LEGAL.city
    ? `${legalPlace()}, India`
    : `the city of ${studio}'s principal place of business in ${LEGAL.state}, India`;

  const sections: LegalSection[] = [
    {
      id: "acceptance",
      title: "Acceptance",
      body: (
        <p>
          This website is operated by {legalStudioIdentity()}, {legalPlace()}, India. By using it, you agree to
          these Terms of Use and our <Link href="/privacy-policy">Privacy Policy</Link>. They are an electronic
          record under the Information Technology Act, 2000. We may update them at any time, and continuing to use
          the website means you accept the updated terms.
        </p>
      ),
    },
    {
      id: "permitted-use",
      title: "Permitted use",
      body: (
        <p>
          You may browse the website and contact us for genuine business enquiries. You must be at least 18, or
          use the website with a parent&rsquo;s or guardian&rsquo;s consent.
        </p>
      ),
    },
    {
      id: "prohibited-use",
      title: "Prohibited use",
      body: (
        <>
          <p>You must not:</p>
          <ul>
            <li>submit false information, or impersonate any person or business;</li>
            <li>send spam, automated or bulk submissions;</li>
            <li>upload or send malware, or try to hack, overload or bypass the website&rsquo;s security;</li>
            <li>scrape, copy or reuse our content or portfolio without written permission;</li>
            <li>
              share anything unlawful, defamatory, obscene or infringing, or otherwise break the Information
              Technology Act, 2000 or any other law.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "your-information",
      title: "Information you submit",
      body: (
        <p>
          You confirm that what you send us through our forms is accurate and that you have the right to share it.
          We handle it as described in our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      body: (
        <p>
          All content on this website, including designs, text, graphics, logos and code, is owned by {studio} or
          its licensors. Portfolio work belongs to the respective clients and is shown with their permission. You
          may view it for personal, non-commercial use only.
        </p>
      ),
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      body: (
        <p>
          Links to other websites such as Instagram, LinkedIn or WhatsApp are for convenience only. We don&rsquo;t
          control or endorse them and are not responsible for their content or policies.
        </p>
      ),
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      body: (
        <p>
          The website is provided &ldquo;as is&rdquo;. We don&rsquo;t guarantee that it will always be available,
          error-free or free of viruses, or that its content is complete or current. Nothing on it is a binding
          offer; each client project is governed by its own written proposal.
        </p>
      ),
    },
    {
      id: "liability",
      title: "Limitation of liability and indemnity",
      body: (
        <p>
          To the extent permitted by law, {studio} is not liable for any loss or damage arising from your use of,
          or inability to use, this website. You agree to indemnify {studio} against claims arising from your
          misuse of the website or breach of these terms.
        </p>
      ),
    },
    {
      id: "suspension",
      title: "Suspension of access",
      body: (
        <p>
          We may block or restrict access to the website for anyone who breaches these terms, without notice.
        </p>
      ),
    },
    {
      id: "general",
      title: "General",
      body: (
        <p>
          We are not responsible for delays or failures caused by events beyond our reasonable control. If any
          part of these terms is found invalid, the rest remains in effect. Not enforcing a right doesn&rsquo;t
          waive it. These terms and our Privacy Policy are the entire agreement for your use of the website.
        </p>
      ),
    },
    {
      id: "governing-law",
      title: "Governing law and disputes",
      body: (
        <p>
          These terms are governed by the laws of India. Disputes will be resolved by a sole arbitrator under the
          Arbitration and Conciliation Act, 1996, seated at {seat}, in English. Subject to this, the courts at{" "}
          {seat} have exclusive jurisdiction. Questions? Email {mail}.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lastUpdated={LEGAL.lastUpdated}
      intro={<p>The rules for using this website. Please read them along with our Privacy Policy.</p>}
      sections={sections}
    />
  );
}
