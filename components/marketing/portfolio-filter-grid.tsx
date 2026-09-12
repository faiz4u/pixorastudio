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
                ? "bg-brand text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-[2fr_1fr_1fr]">
        {visible.map((project, index) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-3xl bg-card transition-colors"
          >
            <div className="relative h-[200px] w-full overflow-hidden bg-muted sm:h-[240px]">
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                sizes={index === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
                className={cn(
                  "object-center transition-transform duration-500 group-hover:scale-105",
                  index === 0 ? "object-contain" : "object-cover",
                )}
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.clientName ? `${project.clientName} · ` : ""}
                  {PORTFOLIO_CATEGORY_LABELS[project.category]}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                &#8599;
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
