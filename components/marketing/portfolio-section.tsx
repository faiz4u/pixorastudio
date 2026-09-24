import { getPortfolio, getSiteSettings } from "@/lib/content/get-site-content";
import { PortfolioFilterGrid } from "@/components/marketing/portfolio-filter-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";

export async function PortfolioSection() {
  const [projects, settings] = await Promise.all([getPortfolio(), getSiteSettings()]);

  return (
    <section id="work" className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            01 &mdash; Selected Work
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            {settings.work_heading}
          </h2>
        </Reveal>

        <div className="mt-12">
          <PortfolioFilterGrid projects={projects} />
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="font-semibold text-foreground text-md">
            Like what you see? Let&apos;s build something together.
          </p>
          <Button
            asChild
            className="h-auto rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.04] hover:bg-brand-hover active:scale-[0.97]"
          >
            <a href="#contact">Get in Touch &nbsp; &rarr;</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
