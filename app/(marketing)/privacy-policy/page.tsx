import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content/get-site-content";
import { LEGAL, legalPlace, legalStudioIdentity } from "@/lib/content/legal";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${LEGAL.studioName} collects, uses and protects personal data under India's Digital Personal Data Protection Act, 2023.`,
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const mail = <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>;
  const studio = LEGAL.studioName;

  const sections: LegalSection[] = [
    {
      id: "who-we-are",
      title: "Who we are",
      body: (
        <p>
          {legalStudioIdentity()} is a design studio based in {legalPlace()}, India. For personal data collected
          through this website, we are the Data Fiduciary under the Digital Personal Data Protection Act, 2023
          (&ldquo;DPDP Act&rdquo;).
          {LEGAL.address && (
            <>
              {" "}
              Our address: {LEGAL.address}.
            </>
          )}
        </p>
      ),
    },
    {
      id: "data-we-collect",
      title: "What we collect",
      body: (
        <ul>
          <li>
            <strong>Contact form:</strong> name, WhatsApp number, services of interest, budget range and message.
          </li>
          <li>
            <strong>Appointment requests:</strong> name, email, preferred date and time, and notes.
          </li>
          <li>
            <strong>Clients:</strong> business and billing details (including GSTIN) and project communications.
          </li>
          <li>
            <strong>Security:</strong> a hashed (unreadable) form of your IP address to block spam, deleted within
            24 hours.
          </li>
        </ul>
      ),
    },
    {
      id: "how-we-use",
      title: "How we use it",
      body: (
        <>
          <p>
            Only to reply to your enquiry, arrange meetings, deliver projects, send invoices, keep the website
            secure and meet legal requirements such as GST and tax records. You give us this data voluntarily for
            these purposes, which the DPDP Act permits.
          </p>
          <p>We never sell your data or use it for advertising.</p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      body: (
        <p>
          We don&rsquo;t use analytics, advertising or tracking cookies. The only cookies are those needed to keep
          our team signed in to the website&rsquo;s admin area.
        </p>
      ),
    },
    {
      id: "sharing",
      title: "Sharing and storage",
      body: (
        <p>
          We share data only with service providers that help us run the studio: Supabase (database), Resend
          (email) and our website host. They may store data on servers outside India, which the DPDP Act allows
          except for countries restricted by the Government of India. We will also disclose data if required by
          law.
        </p>
      ),
    },
    {
      id: "retention-and-security",
      title: "Retention and security",
      body: (
        <p>
          Enquiries that don&rsquo;t become projects are deleted within 24 months. Client records are kept as long
          as Indian tax and accounting laws require. We protect data with encrypted (HTTPS) connections and
          restricted, login-protected access. If a data breach occurs, we will inform affected people and the
          Data Protection Board of India as the law requires.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: (
        <>
          <p>
            Under the DPDP Act you can ask us to show you the data we hold about you, correct or update it, delete
            it, or withdraw your consent. You can also raise a grievance and nominate someone to act for you. Email{" "}
            {mail} and we will respond within 30 days. We may first verify your identity to protect your data.
          </p>
          <p>
            Withdrawing consent is as easy as giving it: just email us. We will then stop using your data and
            delete it, unless the law requires us to keep it. Processing done before you withdrew stays valid.
          </p>
          <p>
            In return, the DPDP Act asks you to give accurate information, not impersonate anyone and not file
            false or frivolous complaints.
          </p>
        </>
      ),
    },
    {
      id: "grievance-officer",
      title: "Grievance Officer",
      body: (
        <>
          <p>
            <strong>{LEGAL.grievanceOfficerName || `Grievance Officer, ${studio}`}</strong>
            <br />
            Email: {mail}
            <br />
            {legalPlace()}, India
          </p>
          <p>
            If you&rsquo;re not satisfied with our response, you may complain to the Data Protection Board of
            India.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes",
      body: (
        <p>
          We may update this policy from time to time and will change the date above when we do. See also our{" "}
          <Link href="/terms-of-use">Terms of Use</Link>.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LEGAL.lastUpdated}
      intro={
        <p>
          This policy explains what personal data we collect, why, and your rights under the Digital Personal
          Data Protection Act, 2023 and the Information Technology Act, 2000.
        </p>
      }
      sections={sections}
    />
  );
}
