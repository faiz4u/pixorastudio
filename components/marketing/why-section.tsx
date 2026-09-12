import Image from "next/image";
import { getSiteSettings, getSiteImage } from "@/lib/content/get-site-content";
import { WHY_PRINCIPLES } from "@/lib/content/site-content";

export async function WhySection() {
  const [settings, officeImage] = await Promise.all([
    getSiteSettings(),
    getSiteImage("about_office"),
  ]);

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Why Pixora
          </p>
          <h2 className="max-w-md font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            {settings.why_heading}
          </h2>
          <p className="mt-5 max-w-md text-base font-semibold text-foreground">
            {settings.why_subheading}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {settings.why_body}
          </p>

          <p className="mt-10 mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            3 Principles
          </p>
          <ol className="flex flex-col gap-5">
            {WHY_PRINCIPLES.map((principle, index) => (
              <li key={principle.title}>
                <p className="font-label text-xs font-semibold uppercase tracking-widest text-brand">
                  {String(index + 1).padStart(2, "0")} &mdash; {principle.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={officeImage.url}
            alt={officeImage.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
