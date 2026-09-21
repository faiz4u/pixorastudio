import type { PortfolioCategory } from "@/types/database";

/**
 * Single source of truth for the studio's launch copy, taken from the
 * approved mockup. Used two ways:
 *  - scripts/seed.ts inserts this into Supabase so the admin edits real
 *    content from day one instead of empty tables.
 *  - lib/content/get-site-content.ts falls back to it on the public site if
 *    Supabase hasn't been seeded yet (e.g. migrations not applied), so the
 *    site never shows broken/empty sections.
 * Once the admin edits a row in Supabase, the live row wins — this is only
 * ever a fallback/seed, never read directly by a page.
 */

export const SITE_SETTINGS_SEED = {
  hero_eyebrow: "Research · Strategy · Design",
  hero_heading: "Bihar's 1st Research-Driven Design Studio.",
  hero_subheading:
    "We turn research, strategy and design into meaningful digital experiences. Helping businesses, organizations and people move forward.",
  hero_cta_primary_label: "Get in Touch",
  hero_cta_primary_href: "#contact",
  hero_cta_secondary_label: "Explore Our Work",
  hero_cta_secondary_href: "#work",
  why_heading: "Research Before Aesthetics.",
  why_subheading: "We believe design should do more than look beautiful.",
  why_body:
    "It should solve problems, communicate clearly and create meaningful outcomes. That's why our approach starts with research and understanding — not decoration.",
  work_heading: "Real problem meaningful solutions.",
  capabilities_heading: "Eight disciplines, one studio.",
  capabilities_subheading:
    "Good design isn't a single moment. It's a process of understanding, exploring, testing and refining. Hire us for one thing or the whole system.",
  process_heading: "How we turn problems into possibilities.",
  process_subheading:
    "Every project is different. Our approach stays focused: understand deeply, think strategically, and design with purpose.",
  contact_heading: "Tell us what you're building.",
  contact_subheading:
    "Share a few details and we'll come back within one working day with a point of view, a scope and a fixed quote. No decks, no sales calls you didn't ask for.",
  contact_whatsapp: "+91-8083019809",
  contact_email: "pixorastudio8@gmail.com",
  contact_hours: "Mon-Sat, 10:00-18:00 IST",
  footer_tagline: "Bihar's first research-driven design studio. Rooted in Patna. Designing for the world.",
  social_instagram: "",
  social_linkedin: "",
} as const;

export const WHY_PRINCIPLES_SEED = [
  {
    title: "Understand Deeply",
    description: "We look beyond assumptions to understand people, behavior and context.",
  },
  {
    title: "Design Intentionally",
    description: "Every visual and interaction has a reason behind it.",
  },
  {
    title: "Create Meaningfully",
    description: "We design experiences that create value for people and businesses.",
  },
] as const;

export const MARQUEE_ITEMS = [
  "Brand Identity",
  "UI/UX Design",
  "Websites",
  "Social Creatives",
  "Pitch Decks",
] as const;

export const CAPABILITIES_SEED = [
  {
    title: "Graphic Design",
    description:
      "Brochures, flyers, posters, banners and marketing collateral that hold up in print and on screen.",
  },
  {
    title: "Branding & Identity",
    description:
      "Logos, brand guidelines, stationery and the full identity system your team can actually apply.",
  },
  {
    title: "Social Media Design",
    description: "Posts, stories, carousels and ad creatives — built as a kit, not one-offs.",
  },
  {
    title: "Presentation Design",
    description:
      "Pitch decks and investor presentations structured to hold attention and win the room.",
  },
  {
    title: "UI/UX Design",
    description: "Research, wireframes, interface design and prototypes tested with real users.",
  },
  {
    title: "Product Design",
    description:
      "End-to-end product experience: dashboards, web apps and the design system behind them.",
  },
  {
    title: "Website Design",
    description:
      "Modern, responsive, conversion-focused sites — designed for your funnel, not a template.",
  },
  {
    title: "Mobile App Design",
    description: "iOS and Android apps that feel native, obvious and genuinely nice to use.",
  },
] as const;

export const PROCESS_STEPS_SEED = [
  {
    title: "Discover",
    description: "We listen, understand the context and uncover what really needs to be solved.",
  },
  {
    title: "Research",
    description:
      "We explore people, behavior, competitors and context to reveal meaningful insights.",
  },
  {
    title: "Create",
    description:
      "We transform research into ideas, concepts and experiences built around real needs.",
  },
  {
    title: "Deliver",
    description:
      "We deliver thoughtful, scalable design and everything needed to take it forward.",
  },
] as const;

export const FAQ_SEED = [
  {
    question: "How do we start working together?",
    answer:
      "Send the brief through the form or WhatsApp. We reply within a working day with our read on the problem, a scope and a fixed quote. Approve it, pay the 50% advance, and kickoff happens the same week.",
  },
  {
    question: 'What does "research-driven" actually mean?',
    answer:
      "Before we design, we talk to your customers, study your competitors and audit what you already have. Every decision in the final work traces back to something we learned — not to taste.",
  },
  {
    question: "What does a typical project cost?",
    answer:
      "Every scope is quoted fixed — no hourly surprises. Identity work and websites usually start in the ₹50k–₹1.5L band; product design and retainers sit higher. Tell us your budget and we will tell you honestly what it can buy.",
  },
  {
    question: "How long do things take?",
    answer:
      "A logo and identity system: 2–3 weeks. A marketing website: 3–5 weeks. A product UI or design system: 6–10 weeks. Social kits and decks turn around in days.",
  },
  {
    question: "Do you work with businesses outside Bihar?",
    answer:
      "Yes. We are based in Patna and work remotely across India, the US and the Gulf. Local clients get in-person workshops; everyone else gets the same process over calls.",
  },
  {
    question: "Do I own the files?",
    answer:
      "Completely. You get source files, exports, font documentation and a handover call. No hostage design.",
  },
] as const;

export const PORTFOLIO_SEED: Array<{
  title: string;
  slug: string;
  category: PortfolioCategory;
  clientName: string;
  description: string;
  tags: string[];
  localCoverImage: string;
  storagePath: string;
}> = [
    {
      title: "Naturals",
      slug: "naturals",
      category: "branding",
      clientName: "Naturals",
      description: "Branding and social campaign identity for a haircare label.",
      tags: ["Branding", "Social Campaign", "Identity"],
      localCoverImage: "/seed/work-1.png",
      storagePath: "naturals/cover.png",
    },
    {
      title: "Invira Global",
      slug: "invira-global",
      category: "ui_ux",
      clientName: "Invira Global",
      description: "Hiring web app UI/UX and creatives.",
      tags: ["UI/UX", "Web App"],
      localCoverImage: "/seed/work-2.png",
      storagePath: "invira-global/cover.png",
    },
    {
      title: "TVS Future",
      slug: "tvs-future-accessories",
      category: "ui_ux",
      clientName: "TVS Future",
      description: "E-commerce website design.",
      tags: ["E-commerce", "Website"],
      localCoverImage: "/seed/work-3.png",
      storagePath: "tvs-future-accessories/cover.png",
    },
  ];

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  branding: "Branding",
  social: "Social",
  ui_ux: "UI/UX",
  product: "Product",
};

export const SITE_IMAGES_SEED = {
  logo: {
    localPath: "/logo-transparent.png",
    storagePath: "logo.png",
    alt: "Pixora Studio",
  },
  hero: { localPath: "/seed/hero.png", storagePath: "hero.png", alt: "Pixora Studio hero visual" },
  about_office: {
    localPath: "/seed/about-office.png",
    storagePath: "about-office.png",
    alt: "Pixora Studio office desk setup",
  },
  cta_banner: {
    localPath: "/seed/cta.png",
    storagePath: "cta.png",
    alt: "Pixora Studio call to action",
  },
} as const;
