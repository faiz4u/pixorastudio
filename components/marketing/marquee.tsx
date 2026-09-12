import { MARQUEE_ITEMS } from "@/lib/content/site-content";

/**
 * Infinite scrolling strip of service names, alternating with a purple
 * diamond separator. Duplicates the item list once so the CSS animation can
 * loop seamlessly at -50% translate without a visible seam.
 */
export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden border-y border-border bg-background py-5">
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-6">
            <span className="text-2xl font-extrabold uppercase tracking-tight text-foreground sm:text-3xl">
              {item}
            </span>
            <span className="text-xl text-brand">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
