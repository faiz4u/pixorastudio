import type { Metadata } from "next";
import { env } from "@/lib/env";
import { SERVICES, servicePath, type Service } from "@/lib/content/services";
import { ABOUT } from "@/lib/content/about";

/**
 * Search-facing copy and structured-data helpers, following the SEO strategy
 * report (docs/private/Pixora_Studio_SEO_Strategy_Report.pdf, not committed; sections 7 and 10).
 * Titles stay under ~60 characters and descriptions under ~155 so Google
 * doesn't truncate them.
 */

export const SITE_NAME = "Pixora Studio";

export const OG_IMAGE_ALT = "Pixora Studio, a research-driven design studio in Patna, Bihar";

export const HOME_TITLE = "Design Studio in Patna | Branding, UI/UX - Pixora Studio";

export const HOME_DESCRIPTION =
  "Bihar's first research-driven design studio in Patna. Brand identity, UI/UX, websites, social creatives and pitch decks. Fixed quote in 1 day.";

/**
 * Title, description, canonical and social tags for one public page. Next
 * replaces (not merges) a layout's openGraph/twitter objects when a page sets
 * its own, so every page builds the full set here instead of relying on the
 * root layout.
 *
 * `title` is run through the root layout's "%s | Pixora Studio" template;
 * pass `absoluteTitle` for a title that already names the studio.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  // Setting openGraph here also drops the image app/opengraph-image.tsx would
  // contribute, so point at it explicitly.
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

/** Absolute URL for a site path, e.g. absoluteUrl("/privacy-policy"). */
export function absoluteUrl(path = "/") {
  return new URL(path, env.NEXT_PUBLIC_SITE_URL).toString();
}

/**
 * Serializes JSON-LD for a <script type="application/ld+json"> tag. Escapes
 * "<" so CMS-edited strings can't close the script tag (per the Next.js
 * JSON-LD guide).
 */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

type StudioDetails = {
  contact_whatsapp: string;
  contact_email: string;
  social_instagram: string;
  social_linkedin: string;
};

/** ProfessionalService (a LocalBusiness subtype) for the homepage. */
export function professionalServiceJsonLd(settings: StudioDetails, logoUrl: string) {
  const sameAs = [settings.social_instagram, settings.social_linkedin, ABOUT.googleBusinessProfile].filter(
    Boolean,
  );

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#studio"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(logoUrl),
    image: absoluteUrl("/opengraph-image"),
    description:
      "Research-driven design studio in Patna offering brand identity, UI/UX, product design, websites, social creatives and pitch decks.",
    telephone: settings.contact_whatsapp,
    email: settings.contact_email,
    // Service-area business: city and region only, no street address (see
    // the report's Google Business Profile checklist, step 3).
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    knowsAbout: SERVICES.map((service) => service.name),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function faqPageJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** BreadcrumbList for inner pages; pairs with components/marketing/breadcrumbs.tsx. */
export function breadcrumbJsonLd(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Service, provided by the homepage's ProfessionalService entity. */
export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": absoluteUrl("/#studio") },
    areaServed: [
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: absoluteUrl(article.path),
    image: absoluteUrl("/opengraph-image"),
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: { "@id": absoluteUrl("/#studio") },
  };
}
