import Image from "next/image";
import { getProcessSteps, getSiteSettings } from "@/lib/content/get-site-content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";

export async function ProcessSection() {
  const [steps, settings] = await Promise.all([getProcessSteps(), getSiteSettings()]);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-border bg-background px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 -right-56 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,_#744bdb_0%,_transparent_70%)] opacity-25"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal direction="left">
            <div>
              <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                03 &mdash; Process
              </p>
              <h2 className="max-w-xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
                {settings.process_heading}
              </h2>
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <p className="text-xl leading-relaxed text-foreground">
              {settings.process_subheading}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* Desktop only: one strip with the 01-04 circles and the dashed path drawn in.
              Its circle centres sit at 5.7/35.2/64.7/94.3% of its width (29.5% apart), so
              sizing it to (container + gap) / 4 / 0.2951 lands them on the 4-col grid
              centres below (col pitch = (container + gap) / 4, gap-10 = 2.5rem). */}
          <div
            aria-hidden
            className="pointer-events-none relative mx-auto hidden aspect-[4784/560] lg:block"
            style={{ width: "calc((100% + 2.5rem) / 4 / 0.2951)" }}
          >
            <Image
              src="/CTA-Line-image.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 1120px, 90vw"
              className="object-fill"
            />
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2 lg:-mt-[calc((100%+2.5rem)*0.029-1.5rem)] lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 120}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6 grid size-14 place-items-center rounded-full bg-primary text-base font-bold text-white transition-transform duration-300 hover:scale-110 lg:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-3 text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button
            asChild
            className="h-auto rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.04] hover:bg-brand-hover active:scale-[0.97]"
          >
            <a href="#contact" className="inline-flex items-center gap-2">
              Contact Now <span aria-hidden>&rarr;</span>
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
