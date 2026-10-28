import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data. Pass
 * the full trail including Home and the current page; the last item renders
 * as plain text.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(items))} />
      <ol className="flex flex-wrap items-center gap-1.5 font-label text-xs uppercase tracking-widest text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-foreground">
                    {item.name}
                  </Link>
                  <ChevronRight aria-hidden className="size-3" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
