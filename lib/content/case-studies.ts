/**
 * Long-form case studies at /work/[slug], keyed by the portfolio project's
 * slug in Supabase (title, cover image and project URL come from there).
 *
 * The SEO report's case study template (section 9): context, problem,
 * research, process, solution, one measurable result or client quote.
 * These need the studio's own project knowledge, so every entry starts as a
 * draft. Drafts render in `next dev` for previewing but 404 in production and
 * stay out of the sitemap. Set `published: true` once every field is real —
 * never publish invented research findings, results or quotes.
 */

export type CaseStudy = {
  slug: string;
  published: boolean;
  /** <title> and meta description. */
  title: string;
  description: string;
  industry: string;
  location: string;
  /** Service pages (lib/content/services.ts) this project demonstrates. */
  services: string[];
  /** One paragraph. */
  problem: string;
  research: string[];
  process: string[];
  solution: string[];
  /** One measurable outcome, e.g. "Enquiries up 40% in the first month". */
  result: string | null;
  testimonial: { quote: string; name: string; role: string } | null;
};

/** Marks text the studio still has to write; drafts show it highlighted. */
export const TODO = "TODO:";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "naturals",
    published: false,
    title: "Naturals: Brand Identity and Social Campaign Case Study",
    description:
      "How Pixora Studio designed the brand and social campaign identity for Naturals, a haircare label, starting with research.",
    industry: "Haircare / beauty",
    location: `${TODO} city`,
    services: ["logo-brand-identity-design-patna", "social-media-design-patna"],
    problem: `${TODO} What did Naturals need, and why? One paragraph on the situation before the project.`,
    research: [
      `${TODO} What you studied (customers, competitors, existing brand) and who you spoke to.`,
      `${TODO} The two or three insights that shaped the design.`,
    ],
    process: [`${TODO} How the identity and campaign developed: concepts, iterations, key decisions.`],
    solution: [`${TODO} The final deliverables: logo, palette, campaign creatives, guidelines.`],
    result: null,
    testimonial: null,
  },
  {
    slug: "invira-global",
    published: false,
    title: "Invira Global: Hiring Web App UI/UX Case Study",
    description:
      "How Pixora Studio designed the UI/UX and creatives for Invira Global's hiring web app, from user research to final screens.",
    industry: "Recruitment / HR tech",
    location: `${TODO} city`,
    services: ["ui-ux-design-patna", "product-design"],
    problem: `${TODO} What problem did the hiring web app need to solve, and for whom (candidates, recruiters)?`,
    research: [
      `${TODO} Who you researched and how (interviews, competitor apps, existing flows).`,
      `${TODO} Key insights about candidates' and recruiters' needs.`,
    ],
    process: [`${TODO} Flows, wireframes, testing and how the design changed along the way.`],
    solution: [`${TODO} The final product: key screens and features you designed.`],
    result: null,
    testimonial: null,
  },
  {
    slug: "tvs-future-accessories",
    published: false,
    title: "TVS Future: E-commerce Website Design Case Study",
    description:
      "How Pixora Studio designed the TVS Future accessories e-commerce website around how customers browse and buy.",
    industry: "Automotive accessories / e-commerce",
    location: `${TODO} city`,
    services: ["website-design-patna", "ui-ux-design-patna"],
    problem: `${TODO} What the store needed: launch, redesign, conversion problems?`,
    research: [
      `${TODO} What you learned about how customers browse and buy accessories.`,
      `${TODO} Competitor stores reviewed and what you took from them.`,
    ],
    process: [`${TODO} Site structure, product page design, checkout flow decisions.`],
    solution: [`${TODO} The final website: key pages and features.`],
    result: null,
    testimonial: null,
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** Drafts are previewable locally but never served in production. */
export function isCaseStudyVisible(study: CaseStudy) {
  return study.published || process.env.NODE_ENV !== "production";
}

export function publishedCaseStudies() {
  return CASE_STUDIES.filter((study) => study.published);
}

export function caseStudyPath(slug: string) {
  return `/work/${slug}`;
}
