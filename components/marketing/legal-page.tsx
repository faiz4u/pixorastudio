import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

// Long-form text styling for section bodies (the project has no typography plugin).
const prose =
  "text-[15px] leading-relaxed text-muted-foreground [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&>*:first-child]:mt-0";

/**
 * Shared layout for the Privacy Policy and Terms pages: title block, a sticky
 * contents list on large screens, then numbered sections. The article sits on
 * a solid background so the animated shapes pass behind the text.
 */
export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="px-6 pt-12 pb-16 sm:px-10 sm:pt-16 sm:pb-20 lg:px-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <div className={`mt-6 ${prose}`}>{intro}</div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Contents" className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-border bg-background p-5">
              <p className="mb-3 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contents
              </p>
              <ol className="flex flex-col gap-2 text-sm">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-muted-foreground hover:text-foreground">
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0 rounded-3xl border border-border bg-background p-6 sm:p-10">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0"
              >
                <h2 className="font-heading text-xl font-bold sm:text-2xl">
                  {index + 1}. {section.title}
                </h2>
                <div className={`mt-4 ${prose}`}>{section.body}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
