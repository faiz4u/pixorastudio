import Image from "next/image";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "@/lib/content/get-site-content";

const STUDIO_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Service" },
  { href: "#process", label: "Approach" },
  { href: "#contact", label: "About" },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-transparent.png"
            alt="Pixora Studio"
            width={193}
            height={40}
            className="h-[40px] w-[193px]"
          />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{settings.footer_tagline}</p>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Studio
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {STUDIO_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Social Links
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href={settings.social_instagram || "#"}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                Instagram <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href={settings.social_linkedin || "#"}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                WhatsApp <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="size-4 shrink-0" /> {settings.contact_whatsapp}
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4 shrink-0" /> {settings.contact_email}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {year} Pixora Studio. All rights reserved.
      </div>
    </footer>
  );
}
