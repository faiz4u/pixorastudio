import Image from "next/image";
import { getSiteSettings } from "@/lib/content/get-site-content";

/** Splits "Bihar's 1st Research-Driven Design Studio." so "1st Research-Driven"
 * (a leading number token and any hyphenated compound word) renders in the
 * primary brand color, matching the mockup's highlighted "1ST". */
function HeroHeading({ heading }: { heading: string }) {
  const words = heading.split(" ");
  return (
    <h1 className="max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[1.25] tracking-[0.05em] sm:text-5xl xl:text-6xl 2xl:text-7xl">
      {words.map((word, index) => (
        <span key={index}>
          <span className={/^\d/.test(word) || word.includes("-") ? "text-primary" : undefined}>
            {word}
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}

export async function HeroSection() {
  const settings = await getSiteSettings();

  return (
    <section className="relative isolate overflow-hidden px-6 py-16 pt-10 sm:px-10 sm:py-20 sm:pt-14 lg:px-20 lg:py-24 lg:pt-16">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="-z-10 object-cover object-right"
      />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
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
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
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
      </div>
    </section>
  );
}
