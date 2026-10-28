import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-up entrance for content that's visible on load (hero, page headers).
 * Same motion as <Reveal>, but pure CSS: <Reveal> keeps content at opacity 0
 * until hydration and an IntersectionObserver fire, which delays Largest
 * Contentful Paint for anything above the fold. Use <Reveal> below the fold.
 *
 * Pass `fade={false}` on the page's H1 so it is visible (and counts as LCP)
 * from the first paint and only slides into place.
 */
export function Enter({
  children,
  delay = 0,
  fade = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  fade?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(fade ? "animate-enter" : "animate-enter-rise", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
