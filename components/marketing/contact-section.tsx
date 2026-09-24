import { getSiteSettings } from "@/lib/content/get-site-content";
import { ContactForm } from "@/components/marketing/contact-form";
import { Reveal } from "@/components/marketing/reveal";
import { BookAppointmentModal } from "@/components/marketing/book-appointment-modal";

export async function ContactSection() {
  const settings = await getSiteSettings();

  return (
    <section id="contact" className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-stretch gap-14 lg:grid-cols-2">
        <Reveal direction="left">
          <div>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              04 &mdash; Start a Project
            </p>
            <h2 className="max-w-md font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              {settings.contact_heading}
            </h2>
            <p className="mt-5 max-w-md text-xl leading-relaxed text-foreground">
              {settings.contact_subheading}
            </p>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
              <div className="flex items-center justify-between gap-4 p-7">
                <div className="min-w-0">
                  <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                    WhatsApp
                  </p>
                  <p className="mt-2 break-words text-xl font-bold">{settings.contact_whatsapp}</p>
                </div>
                <a
                  href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, "")}`}
                  aria-label="Message us on WhatsApp"
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white"
                >
                  &#8599;
                </a>
              </div>
              <div className="flex items-center justify-between gap-4 p-7">
                <div className="min-w-0">
                  <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                    Email ID
                  </p>
                  <p className="mt-2 break-all text-xl font-bold">{settings.contact_email}</p>
                </div>
                <a
                  href={`mailto:${settings.contact_email}`}
                  aria-label="Email us"
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white"
                >
                  &#8599;
                </a>
              </div>
              <div className="flex items-center justify-between gap-4 p-7">
                <div className="min-w-0">
                  <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                    Working hours
                  </p>
                  <p className="mt-2 break-words text-xl font-bold">{settings.contact_hours}</p>
                </div>
                <BookAppointmentModal />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="h-full">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
