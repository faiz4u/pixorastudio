import { getSiteSettings } from "@/lib/content/get-site-content";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection, primaryCta, secondaryCta } from "@/components/marketing/page-header";
import { ContactSection } from "@/components/marketing/contact-section";

export const metadata = pageMetadata({
  title: "Contact Pixora Studio, Patna | Fixed Quote in 1 Day",
  absoluteTitle: true,
  description:
    "Contact Pixora Studio in Patna on WhatsApp, phone or email. Share your brief and get a scope and fixed quote within one working day.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        eyebrow="Contact"
        title="Contact Pixora Studio, Patna"
        actions={
          <>
            <a href={whatsappUrl(settings.contact_whatsapp)} target="_blank" rel="noopener" className={primaryCta}>
              Message us on WhatsApp <span aria-hidden>&rarr;</span>
            </a>
            <a href={telUrl(settings.contact_whatsapp)} className={secondaryCta}>
              Call {settings.contact_whatsapp}
            </a>
          </>
        }
      >
        <p>
          Share a few details about your project and we&apos;ll come back within one working day
          with a point of view, a scope and a fixed quote.
        </p>
      </PageHeader>

      <ContactSection eyebrow="Send a brief" />

      <PageSection>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">Based in</p>
            <p className="mt-2 text-lg font-semibold">Patna, Bihar, India</p>
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">Areas we serve</p>
            <p className="mt-2 text-lg font-semibold">
              Patna and Bihar, plus clients across India and abroad over calls.
            </p>
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">Working hours</p>
            <p className="mt-2 text-lg font-semibold">{settings.contact_hours}</p>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
