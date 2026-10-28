/**
 * Service landing pages (/services/[slug]), following the SEO report's URL
 * map (section 6), on-page blueprint (section 7) and service page template.
 *
 * Copy here is code-owned rather than CMS-edited: each page is written for one
 * keyword cluster and mixes structured data, internal links and FAQs that
 * have to stay in sync. Facts (timelines, payment terms, file ownership) are
 * the same ones the homepage FAQ already promises — keep them consistent.
 *
 * `startingFrom` is shown as a "starting from" pricing signal when set. Leave
 * it null until the studio confirms a number (see docs/SEO-TODO.md).
 */

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short name for nav, cards and breadcrumbs. */
  name: string;
  /** <title>, without the " | Pixora Studio" suffix the layout template adds. */
  title: string;
  description: string;
  h1: string;
  /** One-line summary for cards on /services and the homepage. */
  summary: string;
  intro: string[];
  audience: string[];
  deliverables: string[];
  /** How the research step shapes this service: the studio's differentiator. */
  research: { heading: string; body: string[] };
  process: Array<{ title: string; description: string }>;
  timeline: string;
  startingFrom: string | null;
  faqs: ServiceFaq[];
  /** Portfolio slugs (lib/content/case-studies.ts) that demonstrate this service. */
  caseStudies: string[];
  related: string[];
  /** Capability titles in the CMS that should link to this page. */
  capabilityTitles: string[];
  /** Enquiry form option this service maps to (lib/validation/lead.ts). */
  projectType: string;
};

const OWNERSHIP_FAQ: ServiceFaq = {
  question: "Do I own the final files?",
  answer:
    "Yes, completely. At handover you get the source files, exports for every format you need, font and colour documentation, and a handover call. Nothing is held back.",
};

const PAYMENT_FAQ: ServiceFaq = {
  question: "How do payment and kickoff work?",
  answer:
    "Every project is quoted at a fixed price within one working day of your brief. Once you approve the scope and pay a 50% advance, kickoff happens the same week. The balance is due at handover.",
};

export const SERVICES: Service[] = [
  {
    slug: "logo-brand-identity-design-patna",
    name: "Logo & Brand Identity",
    title: "Logo & Brand Identity Design in Patna",
    description:
      "Research-led logo and brand identity design for Patna and Bihar businesses. Logo, guidelines and stationery. Get a fixed quote in 1 day on WhatsApp.",
    h1: "Logo and Brand Identity Design in Patna",
    summary: "Logos, brand guidelines and stationery: the full identity system your team can actually apply.",
    intro: [
      "A logo is the most visible part of a brand, but it is only one part. We design complete brand identities for businesses in Patna and across Bihar: the logo, the colours, the type, the tone of voice and the rules that hold them together on a signboard, a WhatsApp profile picture and a printed brochure alike.",
      "Every identity starts with research into your customers and competitors, so the final design is built on a reason, not on taste. You get a fixed quote within one working day.",
    ],
    audience: [
      "New businesses that need a brand before they open their doors",
      "Established Patna businesses whose logo looks different on every signboard, post and invoice",
      "Coaching institutes, schools, clinics, retailers and restaurants competing for attention in a crowded local market",
      "Startups preparing to raise money or launch a product, who need to look credible from day one",
    ],
    deliverables: [
      "Primary logo, secondary marks and an icon for social profiles and favicons",
      "Colour palette and typography system, with print and digital values",
      "Brand guidelines document showing how to use (and not use) every element",
      "Stationery: business cards, letterhead and email signature",
      "Social media profile kit: profile images, cover images and post templates",
      "Source files and exports in every format you need",
    ],
    research: {
      heading: "Why we research before we sketch",
      body: [
        "Before drawing a single logo concept, we talk to you and, where possible, to your customers. We audit how your current brand appears in the real world, map what your competitors in Patna and beyond look and sound like, and find the space where you can stand apart.",
        "That research becomes a short brand strategy: who you are for, what you promise and how you should feel. Every design decision afterwards, from the shape of the mark to the colour of a button, traces back to it. It is also what makes the identity easy to defend when someone on your team asks why it looks the way it does.",
      ],
    },
    process: [
      { title: "Discover", description: "A working session to understand your business, audience, goals and constraints." },
      { title: "Research", description: "Competitor mapping, a brand audit and customer insight, distilled into a one-page strategy." },
      { title: "Create", description: "Logo concepts and identity directions, refined with your feedback into one system." },
      { title: "Deliver", description: "Guidelines, stationery, social kit and every source file, with a handover call." },
    ],
    timeline: "A logo and identity system usually takes 2–3 weeks.",
    startingFrom: null,
    faqs: [
      {
        question: "How much does logo design cost in Patna?",
        answer:
          "Identity projects are quoted at a fixed price based on scope. A logo on its own costs less than a complete identity with guidelines, stationery and a social kit. Identity work usually sits in the ₹50k–₹1.5L band; share your budget and we will tell you honestly what it can buy.",
      },
      {
        question: "Can you redesign our existing logo instead of starting over?",
        answer:
          "Yes. If your current logo has recognition worth keeping, we refine it rather than replace it, and build the missing system around it so it is applied consistently.",
      },
      {
        question: "Do you only work with businesses in Patna?",
        answer:
          "No. We are based in Patna and work with businesses across Bihar and India. Local clients can meet us in person for workshops; everyone else gets the same process over calls.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: ["naturals"],
    related: ["social-media-design-patna", "graphic-design-patna", "website-design-patna"],
    capabilityTitles: ["Branding & Identity"],
    projectType: "Branding",
  },
  {
    slug: "ui-ux-design-patna",
    name: "UI/UX Design",
    title: "UI/UX Design Agency in Patna",
    description:
      "Research-driven UI/UX design for startups and businesses in Patna and across India. User research, wireframes, prototypes and design systems.",
    h1: "UI/UX Design Agency in Patna",
    summary: "Research, wireframes, interface design and prototypes for web and mobile apps, tested with real users.",
    intro: [
      "Good UI/UX design makes a product obvious to use. We design websites, web apps and iOS and Android apps for startups and businesses in Patna and across India, starting with research into the people who will use them.",
      "From the first interview to a clickable prototype your developers can build from, every screen is designed to solve a real problem for a real user.",
    ],
    audience: [
      "Startups designing their first product or MVP",
      "Businesses building a customer portal, booking flow or internal tool",
      "Product teams whose app works but confuses users, with drop-offs they can't explain",
      "Founders who need a prototype to test an idea or show investors",
    ],
    deliverables: [
      "User research: interviews, surveys and a review of how people use your product today",
      "User flows and information architecture",
      "Wireframes for every key screen",
      "High-fidelity UI design for web and mobile (iOS and Android)",
      "Clickable prototype in Figma, tested with real users",
      "Developer handover: specs, assets and a component library",
    ],
    research: {
      heading: "UX research is where the value is",
      body: [
        "Most interface problems are not visual. They come from designing for an assumed user instead of an actual one. We start by learning how your users think: what they are trying to do, where they get stuck today and what words they use for things.",
        "Those insights shape the flows and wireframes before any colour or typography is applied. We then test the prototype with real users and fix what they struggle with, while changes are still cheap, before a line of production code is written.",
      ],
    },
    process: [
      { title: "Discover", description: "Goals, constraints, existing data and the questions the research needs to answer." },
      { title: "Research", description: "User interviews, competitor review and a usability audit of any existing product." },
      { title: "Create", description: "Flows, wireframes, UI design and a clickable prototype, tested and refined." },
      { title: "Deliver", description: "Developer-ready designs, specs and components, plus support during build." },
    ],
    timeline: "A product UI or design system usually takes 6–10 weeks, depending on the number of screens and flows.",
    startingFrom: null,
    faqs: [
      {
        question: "What is the difference between UI and UX?",
        answer:
          "UX (user experience) is how the product works: the flows, structure and logic that let someone get a task done. UI (user interface) is how it looks: the layout, type, colour and components on each screen. We design both, starting with UX.",
      },
      {
        question: "Do you design mobile apps as well as websites?",
        answer:
          "Yes. We design iOS and Android apps, responsive websites and web apps, and make sure each feels native to the platform it runs on.",
      },
      {
        question: "Do you also build the app?",
        answer:
          "We focus on research and design, and hand over developer-ready files with specs and components. We can work alongside your developers through the build.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: ["invira-global"],
    related: ["product-design", "website-design-patna", "pitch-deck-design"],
    capabilityTitles: ["UI/UX Design", "Mobile App Design"],
    projectType: "UI/UX Design",
  },
  {
    slug: "website-design-patna",
    name: "Website Design",
    title: "Website Design Company in Patna",
    description:
      "Fast, conversion-focused website design in Patna, built on research into your customers. Fixed quote within one working day. Start on WhatsApp.",
    h1: "Website Design Company in Patna",
    summary: "Modern, responsive, conversion-focused websites designed around your customers, not a template.",
    intro: [
      "Your website is often the first place a customer decides whether to trust you. We design fast, responsive websites for businesses in Patna and across India, structured around what your customers need to know before they call, message or buy.",
      "No templates. Every site starts with research into your audience and competitors, and is designed to turn visitors into enquiries.",
    ],
    audience: [
      "Local businesses that rely on word of mouth and need a credible place to send people",
      "Businesses with an outdated site that doesn't work well on mobile",
      "Coaching institutes, schools, clinics and real-estate firms that need clear course, service or property pages",
      "Startups and e-commerce brands launching a new product or store",
    ],
    deliverables: [
      "Site structure and page plan based on what your customers search for",
      "Responsive design for mobile, tablet and desktop",
      "Homepage, service or product pages, about and contact pages",
      "Clear calls to action: WhatsApp, call and enquiry forms",
      "SEO foundations: page titles, headings and structure search engines understand",
      "Developer-ready design files for your developers to build from",
    ],
    research: {
      heading: "Designed for the people who will use it",
      body: [
        "A good-looking website that nobody uses to get in touch has failed. We research what your customers are looking for, what questions they ask before buying and what your competitors' sites do well and badly.",
        "That shapes the page structure, the order of information and where the calls to action sit. In Bihar, most visitors arrive on a phone and prefer WhatsApp, so we design mobile-first and make contacting you one tap away.",
      ],
    },
    process: [
      { title: "Discover", description: "Your goals, audience, content and the actions you want visitors to take." },
      { title: "Research", description: "Competitor sites, customer questions and search behaviour, turned into a sitemap." },
      { title: "Create", description: "Wireframes, then full visual design for every page and screen size." },
      { title: "Deliver", description: "Developer-ready designs and a launch checklist." },
    ],
    timeline: "A marketing website usually takes 3–5 weeks.",
    startingFrom: null,
    faqs: [
      {
        question: "How much does website design cost in Patna?",
        answer:
          "Website projects are quoted at a fixed price based on the number of pages and features. Marketing websites usually sit in the ₹50k–₹1.5L band. Share your budget and we will tell you what it can include.",
      },
      {
        question: "Will my website work well on mobile?",
        answer:
          "Yes. We design mobile-first, because most visitors in India arrive on a phone, then adapt the design for tablet and desktop.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Yes. We start by auditing what your current site does well and badly, then redesign the structure and visuals so it brings in more enquiries.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: ["tvs-future-accessories"],
    related: ["ui-ux-design-patna", "logo-brand-identity-design-patna", "social-media-design-patna"],
    capabilityTitles: ["Website Design"],
    projectType: "Website Design",
  },
  {
    slug: "social-media-design-patna",
    name: "Social Media Design",
    title: "Social Media Design in Patna",
    description:
      "Posts, stories, carousels and ad creatives designed as a kit for Patna and Bihar brands. Consistent, on-brand and fast to deliver.",
    h1: "Social Media Creative Design in Patna",
    summary: "Posts, stories, carousels and ad creatives, built as a reusable kit rather than one-offs.",
    intro: [
      "Most brands in Patna post on Instagram, Facebook and WhatsApp every week, but few look consistent doing it. We design social media creatives as a system: a kit of templates, styles and rules that keeps every post on-brand, whoever makes it.",
      "From launch campaigns to monthly content, we design creatives that stop the scroll and still look like you.",
    ],
    audience: [
      "Businesses posting regularly but without a consistent look",
      "Brands launching a product, a new branch or a seasonal campaign",
      "Coaching institutes and schools announcing admissions and results",
      "Teams that want templates they can reuse in-house",
    ],
    deliverables: [
      "Social media style guide built on your brand identity",
      "Editable templates for posts, carousels, stories and reels covers",
      "Campaign creatives for launches, offers and announcements",
      "Ad creatives sized for Instagram, Facebook and WhatsApp",
      "Profile and highlight cover designs",
    ],
    research: {
      heading: "Content that fits your audience",
      body: [
        "We look at what your audience engages with, what your competitors post and where your current feed is inconsistent. That tells us which formats, messages and visual styles are worth investing in.",
        "The result is a kit that works for your actual content: the offers you run, the announcements you make and the stories you tell, not a generic template pack.",
      ],
    },
    process: [
      { title: "Discover", description: "Your goals, channels, posting rhythm and the content you already make." },
      { title: "Research", description: "An audit of your feed and competitors' to find what works for your audience." },
      { title: "Create", description: "A style guide and template kit, plus the first set of campaign creatives." },
      { title: "Deliver", description: "Editable templates and exports, ready for your team to use." },
    ],
    timeline: "Social media kits usually turn around in days, depending on the number of templates.",
    startingFrom: null,
    faqs: [
      {
        question: "Do you manage our social media accounts?",
        answer:
          "We focus on design: the visual system, templates and campaign creatives. Your team, or your marketing partner, handles posting and community management.",
      },
      {
        question: "Can we edit the templates ourselves?",
        answer:
          "Yes. We design templates in tools your team can use, so you can update text and images without coming back to us for every post.",
      },
      {
        question: "Do we need a brand identity first?",
        answer:
          "It helps. If you already have one, we build the kit on top of it. If you don't, we can design both together so they work as one system.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: ["naturals"],
    related: ["logo-brand-identity-design-patna", "graphic-design-patna", "pitch-deck-design"],
    capabilityTitles: ["Social Media Design"],
    projectType: "Social Media",
  },
  {
    slug: "pitch-deck-design",
    name: "Pitch Deck Design",
    title: "Pitch Deck Design Services in India",
    description:
      "Investor-ready pitch decks and presentations designed to hold attention and win the room. Based in Patna, serving startups across India.",
    h1: "Pitch Deck Design for Startups",
    summary: "Pitch decks and investor presentations structured to hold attention and win the room.",
    intro: [
      "Investors see hundreds of decks. The ones that get a second meeting tell a clear story and make it easy to understand the opportunity quickly. We design pitch decks and presentations for startups across India, from a first angel round to a sales presentation for enterprise buyers.",
      "We work on the story and the structure as well as the slides, so the deck makes your case even when you are not in the room to present it.",
    ],
    audience: [
      "Founders raising a pre-seed, seed or Series A round",
      "Startups applying to incubators, accelerators or government schemes",
      "Businesses pitching to large clients, partners or distributors",
      "Teams with a strong product and a weak deck",
    ],
    deliverables: [
      "Story and slide structure: problem, solution, market, traction, team and ask",
      "Custom slide design built on your brand",
      "Charts and diagrams that make your numbers easy to read",
      "A presenting version and a send-ahead version that reads on its own",
      "Editable files in PowerPoint, Keynote or Google Slides",
    ],
    research: {
      heading: "Story first, slides second",
      body: [
        "We start by understanding your business and who you are pitching to. What an angel investor needs to hear is different from what a corporate buyer needs, and the deck's structure should reflect that.",
        "We pressure-test the narrative, cut what doesn't earn its place and make sure every slide answers a question your audience will have. Then we design it.",
      ],
    },
    process: [
      { title: "Discover", description: "Your business, your audience and the outcome you need from the pitch." },
      { title: "Research", description: "Your existing material, numbers and story, restructured into a clear narrative." },
      { title: "Create", description: "Slide design, charts and visuals, refined with your feedback." },
      { title: "Deliver", description: "Editable presenting and send-ahead versions, ready to share." },
    ],
    timeline: "Pitch decks usually turn around in days to two weeks, depending on length and how ready the story is.",
    startingFrom: null,
    faqs: [
      {
        question: "Do you write the content of the deck?",
        answer:
          "We help shape the story and structure, and tighten the wording on every slide. You provide the facts: your numbers, product details and plans.",
      },
      {
        question: "Which format will I get?",
        answer:
          "Your choice of PowerPoint, Keynote or Google Slides, fully editable, plus a PDF for sending.",
      },
      {
        question: "Can you work to an investor deadline?",
        answer:
          "Tell us the date when you share your brief. We will say honestly whether we can meet it before you commit.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: [],
    related: ["product-design", "logo-brand-identity-design-patna", "ui-ux-design-patna"],
    capabilityTitles: ["Presentation Design"],
    projectType: "Presentation Design",
  },
  {
    slug: "product-design",
    name: "Product Design",
    title: "Product Design Studio in India | SaaS & Web Apps",
    description:
      "End-to-end product design for SaaS, dashboards and web apps: research, UX, UI and the design system. Patna-based studio working across India.",
    h1: "Product Design Studio for Startups and SaaS",
    summary: "End-to-end product design: dashboards, web apps and the design system behind them.",
    intro: [
      "Product design covers the whole experience of a digital product: what it does, how it works and how it looks. We design SaaS products, dashboards, web apps and internal tools for startups and product teams across India, from the first MVP to a mature design system.",
      "We are based in Patna and work remotely with teams anywhere, using the same research-first process on every project.",
    ],
    audience: [
      "Founders designing an MVP and deciding what to build first",
      "SaaS companies with a growing product and an inconsistent interface",
      "Teams building dashboards, admin panels and data-heavy tools",
      "Businesses replacing spreadsheets with a custom internal tool",
    ],
    deliverables: [
      "Product discovery: user research, jobs-to-be-done and feature priorities",
      "Information architecture and user flows",
      "Wireframes and high-fidelity UI for every key screen",
      "Dashboard and data-visualisation design",
      "Design system: components, tokens and usage guidelines",
      "Clickable prototypes and developer handover",
    ],
    research: {
      heading: "Building the right product, not just a good-looking one",
      body: [
        "The most expensive mistake in product development is building something nobody needs. We start with research into your users and their work, so the first version solves a real problem and the roadmap is grounded in evidence.",
        "As the product grows, a design system keeps it consistent and lets your team ship new features faster, without redesigning the same button every sprint.",
      ],
    },
    process: [
      { title: "Discover", description: "Your users, business model, technical constraints and success metrics." },
      { title: "Research", description: "User interviews, workflow mapping and prioritising what to build first." },
      { title: "Create", description: "Flows, UI and prototypes, tested with users and refined in short cycles." },
      { title: "Deliver", description: "A documented design system and developer-ready files, with build support." },
    ],
    timeline: "Product design and design systems usually take 6–10 weeks, and many teams continue on a retainer.",
    startingFrom: null,
    faqs: [
      {
        question: "What is the difference between product design and UI/UX design?",
        answer:
          "UI/UX design focuses on the interface and experience of specific screens and flows. Product design is broader: it also covers what the product should do, which features come first and the design system that keeps it consistent as it grows.",
      },
      {
        question: "Can you design an MVP for our startup?",
        answer:
          "Yes. We help you decide what the smallest useful version is, design it, and test it with users before you spend on development.",
      },
      {
        question: "Do you work on retainers?",
        answer:
          "Yes. Growing products need continuous design. Retainers give your team dedicated design time each month at a fixed cost.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: ["invira-global"],
    related: ["ui-ux-design-patna", "pitch-deck-design", "website-design-patna"],
    capabilityTitles: ["Product Design"],
    projectType: "Product Design",
  },
  {
    slug: "graphic-design-patna",
    name: "Graphic Design",
    title: "Graphic Designer in Patna | Brochures & Posters",
    description:
      "Brochures, flyers, posters and marketing collateral that hold up in print and on screen. Graphic design in Patna with a fixed quote in 1 day.",
    h1: "Graphic Design in Patna",
    summary: "Brochures, flyers, posters, banners and marketing collateral that hold up in print and on screen.",
    intro: [
      "Printed material still does a lot of work for Bihar businesses: admission brochures, property flyers, menus, hoardings and event posters. We design marketing collateral that is clear, on-brand and ready for print, as well as for sharing on WhatsApp.",
      "Every piece is designed to communicate one message quickly, not to fill the page.",
    ],
    audience: [
      "Coaching institutes and schools preparing admission material",
      "Real-estate firms launching a new project",
      "Restaurants, retailers and clinics needing menus, flyers and signage",
      "Businesses preparing for an event, exhibition or launch",
    ],
    deliverables: [
      "Brochures and catalogues",
      "Flyers, leaflets and posters",
      "Banners, hoardings and standees",
      "Menus, price lists and signage",
      "Print-ready files with the correct bleed and colour settings, plus digital versions for WhatsApp and social",
    ],
    research: {
      heading: "Clear message first",
      body: [
        "Before designing, we pin down who the piece is for and the one thing it needs to make them do: call, visit, enrol or buy. That decides the hierarchy of the page, what goes on the cover and what gets cut.",
        "We also check how it will be used, whether that is a printed brochure handed over at a counter or a PDF forwarded on WhatsApp, so it works in the real world.",
      ],
    },
    process: [
      { title: "Discover", description: "The purpose, audience, format and print quantities." },
      { title: "Research", description: "Your content and competitors' material, shaped into a clear message hierarchy." },
      { title: "Create", description: "Layout and design concepts, refined with your feedback." },
      { title: "Deliver", description: "Print-ready and digital files, with printer guidance if you need it." },
    ],
    timeline: "Most collateral turns around in days, depending on the number of pieces and pages.",
    startingFrom: null,
    faqs: [
      {
        question: "Do you handle printing?",
        answer:
          "We deliver print-ready files with the correct bleed, colour and resolution settings, and can coordinate with your printer.",
      },
      {
        question: "Can you match our existing brand?",
        answer:
          "Yes. We follow your existing brand guidelines. If you don't have any, we keep the material consistent with your logo and colours, or can design a full identity.",
      },
      {
        question: "Can I get a WhatsApp-friendly version?",
        answer:
          "Yes. Every piece comes with a digital version sized and compressed for sharing on WhatsApp and social media.",
      },
      OWNERSHIP_FAQ,
      PAYMENT_FAQ,
    ],
    caseStudies: [],
    related: ["logo-brand-identity-design-patna", "social-media-design-patna", "website-design-patna"],
    capabilityTitles: ["Graphic Design"],
    projectType: "Graphic Design",
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

/** Service page for a CMS capability title, so homepage cards can link to it. */
export function getServiceForCapability(title: string) {
  return SERVICES.find((service) => service.capabilityTitles.includes(title));
}

export function servicePath(slug: string) {
  return `/services/${slug}`;
}
