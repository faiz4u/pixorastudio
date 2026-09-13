"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/content/site-content";
import type { PortfolioCard } from "@/lib/content/get-site-content";
import type { PortfolioCategory } from "@/types/database";
import { Reveal } from "@/components/marketing/reveal";

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
            suppressHydrationWarning
            onClick={() => setFilter(item.value)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95",
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
          <Reveal key={project.id} delay={index * 90} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/20">
              <div className="relative h-[200px] w-full overflow-hidden bg-muted sm:h-[240px]">
                <Image
                  src={project.coverImageUrl}
                  alt={project.title}
                  fill
                  sizes={index === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  &#8599;
                </span>
              </div>
            </article>
          </Reveal>
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
