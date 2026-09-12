import Image from "next/image";
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
            src="/brand/logo-wordmark.png"
            alt="Pixora Studio"
            width={150}
            height={32}
            className="h-[32px] w-[150px]"
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
                className="text-muted-foreground hover:text-foreground"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={settings.social_linkedin || "#"}
                className="text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, "")}`}
                className="text-muted-foreground hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="text-muted-foreground">{settings.contact_whatsapp}</li>
            <li className="text-muted-foreground">{settings.contact_email}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {year} Pixora Studio. All rights reserved.
      </div>
    </footer>
  );
}
