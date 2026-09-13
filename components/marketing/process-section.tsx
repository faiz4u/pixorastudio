import Image from "next/image";
import { getProcessSteps } from "@/lib/content/get-site-content";
import { Button } from "@/components/ui/button";

export async function ProcessSection() {
  const steps = await getProcessSteps();

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
          <div>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              03 &mdash; Process
            </p>
            <h2 className="max-w-xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              How we turn problems into possibilities.
            </h2>
          </div>
          <p className="text-xl leading-relaxed text-foreground">
            Every project is different. Our approach stays focused: understand deeply, think
            strategically, and design with purpose.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Each segment spans exactly circle-center to circle-center for a 4-col grid
              with gap-10: width = 25% + gap/4, offset by k*width + (colWidth/2). */}
          <div
            className="pointer-events-none absolute top-0 hidden h-16 w-[calc(25%+0.625rem)] lg:block"
            style={{ left: "calc(12.5% - 0.9375rem)" }}
          >
            <Image src="/CTA-line.png" alt="" fill className="object-fill" />
          </div>
          <div
            className="pointer-events-none absolute top-0 hidden h-16 w-[calc(25%+0.625rem)] lg:block"
            style={{ left: "calc(37.5% - 0.3125rem)" }}
          >
            <Image src="/CTA-line.png" alt="" fill className="object-fill" />
          </div>
          <div
            className="pointer-events-none absolute top-0 hidden h-16 w-[calc(25%+0.625rem)] lg:block"
            style={{ left: "calc(62.5% + 0.3125rem)" }}
          >
            <Image src="/CTA-line.png" alt="" fill className="object-fill" />
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 grid size-14 place-items-center rounded-full bg-primary text-base font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            asChild
            className="h-auto rounded-full bg-brand px-8 py-4 text-sm font-bold text-white hover:bg-brand-hover"
          >
            <a href="#contact" className="inline-flex items-center gap-2">
              Contact Now <span aria-hidden>&rarr;</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
