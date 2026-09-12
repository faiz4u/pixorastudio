import Image from "next/image";
import { getSiteSettings, getSiteImage } from "@/lib/content/get-site-content";

/** Splits "Bihar's 1st Research-Driven Design Studio." so "1st" (or any
 * standalone number token) renders in the brand accent color, matching the
 * mockup's highlighted "1ST". */
function HeroHeading({ heading }: { heading: string }) {
  const words = heading.split(" ");
  return (
    <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
      {words.map((word, index) => (
        <span key={index}>
          <span className={/^\d/.test(word) ? "text-brand" : undefined}>{word}</span>{" "}
        </span>
      ))}
    </h1>
  );
}

export async function HeroSection() {
  const [settings, heroImage] = await Promise.all([getSiteSettings(), getSiteImage("hero")]);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {settings.hero_eyebrow}
          </p>
          <HeroHeading heading={settings.hero_heading} />
          <p className="mt-6 max-w-xl font-label text-base font-light leading-relaxed text-muted-foreground">
            {settings.hero_subheading}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={settings.hero_cta_primary_href}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-colors hover:bg-brand hover:text-white"
            >
              {settings.hero_cta_primary_label} <span aria-hidden>&rarr;</span>
            </a>
            <a
              href={settings.hero_cta_secondary_href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-brand"
            >
              {settings.hero_cta_secondary_label}
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
