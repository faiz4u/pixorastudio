import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { getSiteSettings, getSiteImage } from "@/lib/content/get-site-content";
import { SERVICES, servicePath } from "@/lib/content/services";
import { ABOUT } from "@/lib/content/about";
import { telUrl, whatsappUrl } from "@/lib/contact";

const STUDIO_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export async function SiteFooter() {
  const [settings, logo] = await Promise.all([getSiteSettings(), getSiteImage("logo")]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 pt-16 pb-8 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1.2fr_0.8fr_1fr]">
        <div>
          <Image
            src={logo.url}
            alt={logo.alt}
            width={193}
            height={40}
            className="h-[40px] w-[193px] object-contain object-left"
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
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)} className="text-muted-foreground hover:text-foreground">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Social Links
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {/* Hidden until set in admin, rather than linking to "#". */}
            {settings.social_instagram && (
              <li>
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  Instagram <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            )}
            {settings.social_linkedin && (
              <li>
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            )}
            <li>
              <a
                href={whatsappUrl(settings.contact_whatsapp)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                WhatsApp <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            {ABOUT.googleBusinessProfile && (
              <li>
                <a
                  href={ABOUT.googleBusinessProfile}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  Find us on Google <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={telUrl(settings.contact_whatsapp)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Phone className="size-4 shrink-0" /> {settings.contact_whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.contact_email}`}
                className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" /> {settings.contact_email}
              </a>
            </li>
            <li className="text-muted-foreground">Patna, Bihar, India</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {year} Pixora Studio. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="hover:text-foreground">
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
}
