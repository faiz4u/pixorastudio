import { getSiteImage } from "@/lib/content/get-site-content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";

export async function CtaBanner() {
  const ctaImage = await getSiteImage("cta_banner");

  return (
    <section
      className="relative overflow-hidden bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-16 lg:px-20 lg:py-16"
      style={{ backgroundImage: `url(${ctaImage.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Have a challenge?
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            Ready to bring your ideas to life
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90">
            Whether you&apos;re building a new brand, redesigning a website or solving a complex
            digital problem, we&apos;d love to understand what you&apos;re working on.
          </p>
        </div>
        <Button
          asChild
          className="h-auto shrink-0 rounded-full bg-white px-8 py-4 text-base font-bold text-primary transition-transform duration-300 hover:scale-[1.04] hover:bg-white/90 active:scale-[0.97]"
        >
          <a href="#contact" className="inline-flex items-center gap-2">
            Start a Project <span aria-hidden>&rarr;</span>
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
