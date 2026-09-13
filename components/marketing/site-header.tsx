"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 backdrop-blur sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-[22px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-transparent.png"
            alt="Pixora Studio"
            width={260}
            height={54}
            className="h-[54px] w-[260px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            asChild
            className="h-[46px] w-[180px] rounded-full bg-brand px-[14px] py-[7px] text-white hover:bg-brand-hover"
          >
            <a href="#contact" className="inline-flex items-center justify-center gap-2">
              Start a project <span aria-hidden>&rarr;</span>
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Start a project <span aria-hidden>&rarr;</span>
          </a>
        </nav>
      )}
    </header>
  );
}
