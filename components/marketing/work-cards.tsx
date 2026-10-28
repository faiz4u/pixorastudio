import Image from "next/image";
import Link from "next/link";
import type { PortfolioCard } from "@/lib/content/get-site-content";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/content/site-content";
import { caseStudyPath, getCaseStudy, isCaseStudyVisible } from "@/lib/content/case-studies";
import { Reveal } from "@/components/marketing/reveal";

/**
 * Portfolio cards for inner pages. A card links to its case study once one is
 * visible, otherwise to the live project, otherwise not at all.
 */
export function WorkCards({ projects }: { projects: PortfolioCard[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const study = getCaseStudy(project.slug);
        const caseStudyHref = study && isCaseStudyVisible(study) ? caseStudyPath(project.slug) : null;
        const category = PORTFOLIO_CATEGORY_LABELS[project.category];

        const card = (
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/20">
            <div className="relative h-[220px] w-full overflow-hidden bg-muted">
              <Image
                src={project.coverImageUrl}
                alt={`${project.title}: ${category} project by Pixora Studio`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="font-label text-xs uppercase tracking-widest text-brand">{category}</p>
              <h3 className="text-lg font-bold">{project.title}</h3>
              {project.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              )}
              {caseStudyHref && (
                <p className="mt-auto pt-2 text-sm font-semibold text-foreground">
                  Read the case study <span aria-hidden>&rarr;</span>
                </p>
              )}
            </div>
          </article>
        );

        return (
          <Reveal key={project.id} delay={index * 90} className="h-full">
            {caseStudyHref ? (
              <Link href={caseStudyHref} className="block h-full rounded-3xl">
                {card}
              </Link>
            ) : project.projectUrl ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} (opens in a new tab)`}
                className="block h-full rounded-3xl"
              >
                {card}
              </a>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
