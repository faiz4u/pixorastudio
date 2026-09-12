"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/content/site-content";
import type { PortfolioCard } from "@/lib/content/get-site-content";
import type { PortfolioCategory } from "@/types/database";

const FILTERS: Array<{ value: PortfolioCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "branding", label: "Branding" },
  { value: "social", label: "Social" },
  { value: "ui_ux", label: "UI/UX" },
  { value: "product", label: "Product Design" },
];

export function PortfolioFilterGrid({ projects }: { projects: PortfolioCard[] }) {
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors",
              filter === item.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-brand/60"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  {project.clientName ? `${project.clientName} · ` : ""}
                  {PORTFOLIO_CATEGORY_LABELS[project.category]}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-soft/40 text-brand-soft">
                &rarr;
              </span>
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
