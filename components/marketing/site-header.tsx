"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ logo }: { logo: { url: string; alt: string } }) {
  const [open, setOpen] = useState(false);

  // While the mobile menu is open: lock page scroll behind the overlay and
  // let Escape close it. Also closes it if the viewport grows past the md
  // breakpoint, where the menu button disappears and couldn't close it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 backdrop-blur sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-[22px]">
        <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.03]">
          <Image
            src={logo.url}
            alt={logo.alt}
            width={260}
            height={54}
            className="h-9 w-auto object-contain object-left sm:h-[54px] sm:w-[260px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            className="h-[46px] w-[180px] rounded-full bg-brand px-[14px] py-[7px] text-white transition-transform duration-300 hover:scale-[1.05] hover:bg-brand-hover active:scale-[0.97]"
          >
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2">
              Start a project <span aria-hidden>&rarr;</span>
            </Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
          // Password managers / form-filler extensions tag buttons with
          // their own attribute (fdprocessedid) before React hydrates,
          // which React otherwise flags as a hydration mismatch.
          suppressHydrationWarning
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu overlays the page instead of sitting in the header's
          flow, so opening it no longer pushes the content down. Positioned
          absolute rather than fixed: the header's backdrop-blur makes it the
          containing block for fixed children anyway. The backdrop spans the
          rest of the viewport and closes the menu when tapped. */}
      {open && (
        <div className="absolute inset-x-0 top-full md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="animate-in fade-in absolute inset-x-0 top-0 h-dvh bg-black/60 duration-300"
          />
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className={cn(
              "animate-in fade-in slide-in-from-top-2 relative flex flex-col gap-1 border-b border-border px-6 py-4 shadow-2xl duration-300 sm:px-10",
              // Solid enough to read over any section; the header's own blur
              // doesn't reach this panel.
              "bg-background/95 backdrop-blur",
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-hover"
            >
              Start a project <span aria-hidden>&rarr;</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
