import { getCapabilities } from "@/lib/content/get-site-content";

export async function CapabilitiesSection() {
  const capabilities = await getCapabilities();

  return (
    <section id="services" className="border-t border-border bg-[#0b0a12] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              02 &mdash; Capabilities
            </p>
            <h2 className="max-w-xl text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              Eight disciplines, one studio.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Good design isn&apos;t a single moment. It&apos;s a process of understanding, exploring,
            testing and refining. Hire us for one thing or the whole system.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className="flex min-h-[220px] flex-col justify-between gap-6 bg-[#0a0910] p-8 transition-colors hover:bg-[#120f1e]"
            >
              <span className="font-label text-xs tracking-widest text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-3 text-lg font-bold">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
