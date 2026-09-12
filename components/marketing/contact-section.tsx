import { getSiteSettings } from "@/lib/content/get-site-content";
import { ContactForm } from "@/components/marketing/contact-form";

export async function ContactSection() {
  const settings = await getSiteSettings();

  return (
    <section id="contact" className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            04 &mdash; Start a Project
          </p>
          <h2 className="max-w-md font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Share a few details and we&apos;ll come back within one working day with a point of
            view, a scope and a fixed quote. No decks, no sales calls you didn&apos;t ask for.
          </p>

          <dl className="mt-10 flex flex-col gap-6">
            <div>
              <dt className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                WhatsApp
              </dt>
              <dd className="text-base font-semibold">{settings.contact_whatsapp}</dd>
            </div>
            <div>
              <dt className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </dt>
              <dd className="text-base font-semibold">{settings.contact_email}</dd>
            </div>
            <div>
              <dt className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                Working hours
              </dt>
              <dd className="text-base font-semibold">{settings.contact_hours}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
