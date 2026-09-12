import { getSiteImage } from "@/lib/content/get-site-content";
import { Button } from "@/components/ui/button";

export async function CtaBanner() {
  const ctaImage = await getSiteImage("cta_banner");

  return (
    <section
      className="relative overflow-hidden bg-primary px-6 py-20 text-primary-foreground"
      style={{ backgroundImage: `url(${ctaImage.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Have a challenge?
          </p>
          <h2 className="max-w-xl text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            Ready to bring your ideas to life
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80">
            Whether you&apos;re building a new brand, redesigning a website or solving a complex
            digital problem, we&apos;d love to understand what you&apos;re working on.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="shrink-0 rounded-full bg-white text-primary hover:bg-white/90"
        >
          <a href="#contact">Start a Project &rarr;</a>
        </Button>
      </div>
    </section>
  );
}
