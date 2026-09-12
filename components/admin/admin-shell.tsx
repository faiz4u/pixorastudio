"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Inbox,
  FileText,
  Image as ImageIcon,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  adminEmail,
  children,
}: {
  adminEmail: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar p-4 md:flex">
        <div className="mb-6 px-2 text-sm font-semibold uppercase tracking-widest text-brand">
          Pixora Admin
        </div>
        <NavLinks />
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <p className="truncate px-2 text-xs text-muted-foreground">{adminEmail}</p>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm" className="w-full justify-start gap-2">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border p-4 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar p-4">
              <div className="mb-6 px-2 text-sm font-semibold uppercase tracking-widest text-brand">
                Pixora Admin
              </div>
              <NavLinks onNavigate={() => setMobileOpen(false)} />
              <div className="mt-auto flex flex-col gap-2 pt-4">
                <p className="truncate px-2 text-xs text-muted-foreground">{adminEmail}</p>
                <form action={logout}>
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Pixora Admin
          </span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
