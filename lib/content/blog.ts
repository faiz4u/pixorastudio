/**
 * Blog posts (/blog/[slug]) from the SEO report's 90-day content calendar
 * (section 9). Posts are plain data rendered by app/(marketing)/blog, so
 * adding one means adding an entry here; it then appears on /blog and in
 * the sitemap automatically.
 *
 * Keep posts factual and general. Pricing guides and anything quoting market
 * figures need the studio's own numbers (see docs/SEO-TODO.md).
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-10-28". */
  date: string;
  updated?: string;
  /** Service page (lib/content/services.ts) the post links to in its CTA. */
  service: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-research-comes-before-design",
    title: "Why Research Comes Before Design: Our Process",
    description:
      "Why Pixora Studio starts every brand, website and app project with research, and what that research actually involves.",
    date: "2026-10-28",
    service: "ui-ux-design-patna",
    body: [
      {
        type: "p",
        text: "Most people think of design as the visible part: the logo, the colours, the screens. That part matters, but it is the last step. The decisions that make a design work or fail are made earlier, when someone decides who the design is for and what it needs to do. At Pixora Studio, that earlier step is research, and it is the reason we exist.",
      },
      { type: "h2", text: "Design without research is guesswork" },
      {
        type: "p",
        text: "When a project skips research, the design is shaped by whoever has the strongest opinion in the room. Sometimes that works. Often it produces something that looks good to the business owner but doesn't speak to their customers, or a website that is beautiful but doesn't answer the questions visitors actually have.",
      },
      {
        type: "p",
        text: "Research replaces opinion with evidence. It doesn't need to be slow or expensive. Even a few days of focused work changes the brief, and a better brief produces better design.",
      },
      { type: "h2", text: "What our research involves" },
      {
        type: "p",
        text: "The exact methods depend on the project, but most of our work combines a few of these:",
      },
      {
        type: "ul",
        items: [
          "Stakeholder conversations: understanding the business, its goals and its constraints from the people who run it.",
          "Customer interviews: talking to the people the design is for about what they need, what frustrates them and how they make decisions.",
          "Competitor mapping: looking at how competitors present themselves, to find where you can stand apart rather than blend in.",
          "Audits: reviewing your existing brand, website or app to see what is working and what isn't.",
          "Usability testing: putting prototypes in front of real users before anything is built, and fixing what they struggle with.",
        ],
      },
      { type: "h2", text: "How research turns into design" },
      {
        type: "p",
        text: "Research is only useful if it changes what gets made. We turn our findings into a short set of insights and a clear brief: who the design is for, what it must communicate and how success will be judged. Every design decision after that point can be traced back to something we learned.",
      },
      {
        type: "p",
        text: "That traceability is valuable for our clients too. When someone on your team asks why the logo is shaped the way it is, or why the enquiry form is at the top of the page, there is an answer that isn't just taste.",
      },
      { type: "h2", text: "Our four-step process" },
      {
        type: "ol",
        items: [
          "Discover: we listen, understand the context and uncover what really needs to be solved.",
          "Research: we explore people, behaviour, competitors and context to reveal meaningful insights.",
          "Create: we turn research into ideas, concepts and experiences built around real needs.",
          "Deliver: we hand over thoughtful, scalable design and everything needed to take it forward.",
        ],
      },
      { type: "h2", text: "Does every project need research?" },
      {
        type: "p",
        text: "The depth varies. A social media kit for an established brand needs a quick audit, not a month of interviews. A new product needs much more. What doesn't change is the habit of asking who the work is for before deciding what it should look like. That is what research-driven design means to us.",
      },
    ],
  },
  {
    slug: "what-is-brand-identity",
    title: "What Is Brand Identity? A Guide for Bihar Businesses",
    description:
      "What brand identity means, what it includes beyond a logo, and how a clear identity helps a Bihar business earn trust.",
    date: "2026-10-28",
    service: "logo-brand-identity-design-patna",
    body: [
      {
        type: "p",
        text: "Ask most business owners about their brand and they will show you their logo. A logo is important, but it is only one piece of something bigger. Your brand identity is the complete set of visual and verbal signals that tell people who you are, and it shapes whether they trust you before they have spoken to you.",
      },
      { type: "h2", text: "Brand, brand identity and logo: what's the difference?" },
      {
        type: "ul",
        items: [
          "Your brand is what people think and feel about your business. You can influence it, but it lives in their heads.",
          "Your brand identity is everything you control that shapes that perception: your name, logo, colours, typography, imagery and tone of voice.",
          "Your logo is the most visible single element of that identity, the mark people recognise.",
        ],
      },
      { type: "h2", text: "What a complete brand identity includes" },
      {
        type: "ul",
        items: [
          "A logo, with versions for different uses: signboards, social media profile pictures, invoices and favicons.",
          "A colour palette, with exact values for print and screen so your blue is the same everywhere.",
          "Typography: the fonts used for headings and body text.",
          "Imagery style: the kind of photos, illustrations and icons that feel like you.",
          "Tone of voice: how you write, from Instagram captions to WhatsApp replies.",
          "Brand guidelines: a document that explains how to use all of the above.",
        ],
      },
      { type: "h2", text: "Why it matters for local businesses" },
      {
        type: "p",
        text: "In a city like Patna, customers often find a business through a signboard, a WhatsApp forward, an Instagram post and a Google listing, sometimes all in the same week. If each of those looks different, the business feels less established than it is. A consistent identity makes every touchpoint reinforce the others.",
      },
      {
        type: "p",
        text: "It also makes everyday work easier. When your team has templates and clear rules, a new poster or social post takes minutes instead of a debate about colours.",
      },
      { type: "h2", text: "Signs your brand identity needs work" },
      {
        type: "ul",
        items: [
          "Your logo looks different on your signboard, visiting card and social profiles.",
          "Every poster or post is designed from scratch by whoever is available.",
          "Customers confuse you with a competitor.",
          "Your business has grown, but your branding still looks like it did on day one.",
          "You feel the need to explain your business in person because your material doesn't do it for you.",
        ],
      },
      { type: "h2", text: "How a brand identity project works" },
      {
        type: "p",
        text: "A good identity project starts with research, not sketches: understanding your customers, mapping your competitors and agreeing what you want to be known for. Design comes next, then a set of guidelines and templates so the identity is applied consistently. At Pixora Studio, a logo and identity system usually takes two to three weeks.",
      },
    ],
  },
  {
    slug: "ui-vs-ux-what-does-your-startup-need-first",
    title: "UI vs UX: What Does Your Startup Need First?",
    description:
      "The difference between UI and UX design, explained for founders, and how to decide where to invest first.",
    date: "2026-10-28",
    service: "ui-ux-design-patna",
    body: [
      {
        type: "p",
        text: "UI and UX are often said together, as if they were one thing. They are closely related, but they answer different questions. For a startup with limited time and money, knowing the difference helps you spend on the right thing at the right moment.",
      },
      { type: "h2", text: "UX: how the product works" },
      {
        type: "p",
        text: "UX (user experience) design is about whether people can get done what they came to do. It covers the structure of the product, the flow from one step to the next, what information appears where and how the product behaves when something goes wrong. UX work includes user research, information architecture, user flows, wireframes and usability testing.",
      },
      { type: "h2", text: "UI: how the product looks and feels" },
      {
        type: "p",
        text: "UI (user interface) design is about the visual layer of each screen: layout, typography, colour, icons, buttons and the components that make up the interface. Good UI makes a product feel trustworthy and makes the important things on each screen obvious.",
      },
      { type: "h2", text: "A simple way to remember it" },
      {
        type: "p",
        text: "UX decides that a booking flow should have three steps and what each one asks for. UI decides what those three screens look like. A beautiful interface on a confusing flow still loses users; a clear flow with a rough interface usually keeps them.",
      },
      { type: "h2", text: "What should a startup invest in first?" },
      {
        type: "p",
        text: "For most early-stage products, UX comes first. Before you have product-market fit, the biggest risk is building the wrong thing or building the right thing in a way users don't understand. Research and testing with wireframes or simple prototypes are cheap ways to reduce that risk.",
      },
      {
        type: "ul",
        items: [
          "Prioritise UX if you're building something new, users are dropping off and you don't know why, or your product has complex workflows.",
          "Prioritise UI if the product works well but looks untrustworthy, you are preparing for a launch or fundraise, or your interface has become inconsistent as features were added.",
        ],
      },
      { type: "h2", text: "In practice, you need both" },
      {
        type: "p",
        text: "The two are not really separate projects. The best results come from designing them together, starting with UX and letting the UI grow out of it. As the product matures, a design system ties both together so new features stay consistent without being redesigned from scratch.",
      },
      {
        type: "p",
        text: "If you are not sure where your product stands, a short usability review is a good place to start. It shows quickly whether the problem is in how the product works, how it looks, or both.",
      },
    ],
  },
  {
    slug: "branding-checklist-for-coaching-institutes",
    title: "Branding Checklist for Coaching Institutes",
    description:
      "A practical branding checklist for coaching institutes in Patna and Bihar: identity, print, social media, website and admission season.",
    date: "2026-10-28",
    service: "logo-brand-identity-design-patna",
    body: [
      {
        type: "p",
        text: "Coaching institutes compete hard for the same students, often on the same street. Results and faculty matter most, but presentation decides whether a student or parent takes a closer look. Use this checklist to see where your institute's branding is strong and where it needs work.",
      },
      { type: "h2", text: "1. Identity basics" },
      {
        type: "ul",
        items: [
          "One logo, used the same way everywhere, with a simple version that works small on WhatsApp and ID cards.",
          "A defined colour palette and fonts, written down so everyone uses the same ones.",
          "A clear one-line description of what makes your institute different, beyond 'best results'.",
        ],
      },
      { type: "h2", text: "2. Signage and the physical space" },
      {
        type: "ul",
        items: [
          "A signboard that is readable from across the street, with the name and the main courses, not a list of everything.",
          "Consistent branding inside the classroom and reception, where parents form their first impression.",
          "Branded ID cards, notebooks or study material covers that students carry around the city.",
        ],
      },
      { type: "h2", text: "3. Admission material" },
      {
        type: "ul",
        items: [
          "A brochure that leads with what parents and students ask first: courses, faculty, results, schedules and fees.",
          "Result posters with a consistent template, so every year's toppers reinforce the same brand.",
          "A WhatsApp-friendly PDF version of every printed piece.",
        ],
      },
      { type: "h2", text: "4. Social media" },
      {
        type: "ul",
        items: [
          "Templates for recurring posts: results, new batches, faculty introductions, holidays and announcements.",
          "A consistent profile picture and cover across Instagram, Facebook, YouTube and WhatsApp Business.",
          "Real photos of classrooms, faculty and students (with permission) rather than stock images.",
        ],
      },
      { type: "h2", text: "5. Website and Google" },
      {
        type: "ul",
        items: [
          "A mobile-friendly website with a page for each course, faculty profiles and verified results.",
          "An enquiry form and WhatsApp button that reach someone who replies quickly.",
          "A complete Google Business Profile with photos, timings and replies to reviews.",
        ],
      },
      { type: "h2", text: "6. Before admission season" },
      {
        type: "ul",
        items: [
          "Brochures, posters and social templates ready before the season starts, not during it.",
          "One campaign idea that runs across print, social and the website.",
          "A plan for collecting and sharing results and testimonials as soon as they come in.",
        ],
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "If you ticked fewer than half of these, start with the identity basics: everything else is easier once the logo, colours and message are settled. If the basics are in place, focus on templates for admission season, because that is where consistency pays off most.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

/** Newest first. */
export function sortedPosts() {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

/** "28 October 2026", in Indian time regardless of where the server runs. */
export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
