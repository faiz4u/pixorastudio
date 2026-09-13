import { getCapabilities } from "@/lib/content/get-site-content";

export async function CapabilitiesSection() {
  const capabilities = (await getCapabilities()).slice(0, 6);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-border bg-background px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 -left-56 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,_#744bdb_0%,_transparent_70%)] opacity-25"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              02 &mdash; Capabilities
            </p>
            <h2 className="max-w-xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              Eight disciplines, one studio.
            </h2>
          </div>
          <p className="text-xl leading-relaxed text-foreground">
            Good design isn&apos;t a single moment. It&apos;s a process of understanding, exploring,
            testing and refining. Hire us for one thing or the whole system.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className="group flex min-h-[220px] flex-col gap-3 bg-background p-8 transition-colors hover:bg-brand"
            >
              <span className="text-base font-bold text-brand transition-colors group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-3 text-lg font-bold">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/80">
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
