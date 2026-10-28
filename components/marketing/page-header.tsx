import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";
import { Enter } from "@/components/marketing/enter";

/**
 * Opening block for inner marketing pages: breadcrumbs, eyebrow, the page's
 * single H1, intro copy and optional calls to action. Mirrors the homepage
 * hero's type scale at a smaller size.
 */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  children,
  actions,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-12 sm:px-10 sm:pt-14 sm:pb-16 lg:px-20 lg:pt-16 lg:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,_rgba(116,75,219,0.3)_0%,_transparent_55%)]"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">
          <Enter>
            <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand-text">
              {eyebrow}
            </p>
          </Enter>
          <Enter delay={100} fade={false}>
            <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl xl:text-6xl">
              {title}
            </h1>
          </Enter>
          {children && (
            <Enter delay={200}>
              <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
                {children}
              </div>
            </Enter>
          )}
          {actions && (
            <Enter delay={300}>
              <div className="mt-9 flex flex-wrap gap-4">{actions}</div>
            </Enter>
          )}
        </div>
      </div>
    </section>
  );
}

/** Primary and secondary pill buttons, matching the homepage hero CTAs. */
export const primaryCta =
  "inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-brand-hover active:scale-[0.97]";
export const secondaryCta =
  "inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:border-brand active:scale-[0.97]";

/** Eyebrow + H2 used to open each section on inner pages. */
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand-text">{eyebrow}</p>
      <h2 className="max-w-2xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/** Horizontal section wrapper with the site's standard gutters. */
export function PageSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`border-t border-border px-6 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
