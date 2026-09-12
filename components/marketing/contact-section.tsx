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
          <p className="mt-5 max-w-md text-xl leading-relaxed text-foreground">
            Share a few details and we&apos;ll come back within one working day with a point of
            view, a scope and a fixed quote. No decks, no sales calls you didn&apos;t ask for.
          </p>

          <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
            <div className="flex items-center justify-between gap-4 p-7">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  WhatsApp
                </p>
                <p className="mt-2 text-xl font-bold">{settings.contact_whatsapp}</p>
              </div>
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, "")}`}
                aria-label="Message us on WhatsApp"
                className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                &#8599;
              </a>
            </div>
            <div className="flex items-center justify-between gap-4 p-7">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  Email ID
                </p>
                <p className="mt-2 text-xl font-bold">{settings.contact_email}</p>
              </div>
              <a
                href={`mailto:${settings.contact_email}`}
                aria-label="Email us"
                className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                &#8599;
              </a>
            </div>
            <div className="flex items-center justify-between gap-4 p-7">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  Working hours
                </p>
                <p className="mt-2 text-xl font-bold">{settings.contact_hours}</p>
              </div>
              <p className="shrink-0 text-right text-sm text-foreground">
                Working remotely
                <br />
                worldwide
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
