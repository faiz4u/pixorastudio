import Image from "next/image";

/**
 * Temporary placeholder homepage. Confirms the scaffold, brand theme and
 * fonts are wired up correctly. Replaced with the full section-by-section
 * build (hero, portfolio, capabilities, process, contact, FAQ, footer) in the
 * public-site phase.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/brand/logo-wordmark.png"
        alt="Pixora Studio"
        width={220}
        height={48}
        priority
      />
      <p className="max-w-xl font-label text-xs uppercase tracking-[0.3em] text-brand">
        Research &middot; Strategy &middot; Design
      </p>
      <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-6xl">
        Bihar&apos;s <span className="text-brand">1st</span> research-driven design studio.
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Full site build in progress — scaffold, theme and Supabase backend are wired up.
      </p>
    </main>
  );
}
