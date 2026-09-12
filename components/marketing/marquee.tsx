import { MARQUEE_ITEMS } from "@/lib/content/site-content";

/**
 * Infinite scrolling strip of service names, alternating with a purple
 * diamond separator. Duplicates the item list once so the CSS animation can
 * loop seamlessly at -50% translate without a visible seam.
 */
export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden border-y border-border bg-background py-10 sm:py-10 `lg:py-[40px]`">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap sm:gap-12 `lg:gap-[38px]`">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-7 sm:gap-10 lg:gap-[38px]"
          >
            <span className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-4xl">
              {item}
            </span>
            <span className="text-2xl text-brand sm:text-3xl lg:text-5xl">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
