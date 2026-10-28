import type { ServiceFaq } from "@/lib/content/services";

/**
 * Industry landing pages (/industries/[slug]) for the SEO report's Track A
 * buyers (section 4). The report warns against thin, near-duplicate pages:
 * only add an industry here with copy written specifically for it, and add
 * real local client examples as soon as there are some.
 */
export type Industry = {
  slug: string;
  name: string;
  /** Used in sentences, e.g. "branding for our coaching institute". */
  singular: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  challenges: Array<{ title: string; description: string }>;
  /** What we design for this industry, each linked to a service page. */
  offerings: Array<{ service: string; description: string }>;
  faqs: ServiceFaq[];
  /** Related blog post slugs. */
  posts: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "coaching-institutes",
    name: "Coaching Institutes",
    singular: "coaching institute",
    title: "Coaching Institute Branding in Patna",
    description:
      "Branding, logos, admission brochures, result posters, social creatives and websites for coaching institutes in Patna and across Bihar.",
    h1: "Coaching Institute Branding in Patna",
    intro: [
      "Patna has one of the most competitive coaching markets in India. Students and parents compare institutes on results, faculty and trust, and they judge all three partly by how an institute presents itself, from the board outside the building to the admission brochure and the Instagram page.",
      "We design brands and marketing material for coaching institutes that want to look as credible as their results are. Everything starts with research into how students and parents choose.",
    ],
    challenges: [
      {
        title: "Every institute looks the same",
        description:
          "Most coaching brands use the same blue-and-red palettes, topper photo grids and crowded flyers. A distinctive identity makes you recognisable on a street full of signboards.",
      },
      {
        title: "Inconsistent material across branches and batches",
        description:
          "Posters, brochures and social posts made by different people at different times erode trust. A clear brand system keeps every piece consistent.",
      },
      {
        title: "Parents and students need different messages",
        description:
          "Students care about faculty, peers and results; parents care about safety, discipline and value. Good material speaks to both without becoming cluttered.",
      },
      {
        title: "Admission season is short",
        description:
          "Brochures, result posters and campaign creatives all need to be ready at once. Templates designed in advance let you move fast when it matters.",
      },
    ],
    offerings: [
      {
        service: "logo-brand-identity-design-patna",
        description: "A logo and identity system that works on signboards, ID cards, books and WhatsApp.",
      },
      {
        service: "graphic-design-patna",
        description: "Admission brochures, prospectuses, result posters, banners and hoardings, print-ready.",
      },
      {
        service: "social-media-design-patna",
        description: "Templates for results, batch announcements, faculty introductions and admission campaigns.",
      },
      {
        service: "website-design-patna",
        description: "A website with course pages, faculty profiles, results and an enquiry form that reaches you on WhatsApp.",
      },
    ],
    faqs: [
      {
        question: "Can you design our admission material before the session starts?",
        answer:
          "Yes. Share your session dates when you send your brief. We plan the work so brochures, posters and social templates are ready before admissions open.",
      },
      {
        question: "We already have a logo. Can you work with it?",
        answer:
          "Yes. If your logo has recognition worth keeping, we refine it and build a consistent system around it rather than starting over.",
      },
      {
        question: "Can our staff update the posters and social posts themselves?",
        answer:
          "Yes. We design editable templates for recurring material such as results, batch timings and announcements, so your team can update them without a designer.",
      },
      {
        question: "Do you work with institutes outside Patna?",
        answer:
          "Yes. We are based in Patna and work with institutes across Bihar and India, meeting in person where we can and over calls everywhere else.",
      },
    ],
    posts: ["branding-checklist-for-coaching-institutes", "what-is-brand-identity"],
  },
  {
    slug: "schools",
    name: "Schools",
    singular: "school",
    title: "School Branding and Website Design in Patna",
    description:
      "Logos, prospectuses, signage, social media and websites for schools in Patna and Bihar, designed around how parents choose a school.",
    h1: "School Branding and Website Design in Patna",
    intro: [
      "Choosing a school is one of the biggest decisions a family makes. Parents visit, ask around, and look closely at everything a school puts out: its website, its prospectus, its social media and even its signage.",
      "We help schools in Patna and across Bihar present themselves clearly and consistently, so the first impression matches the quality of the education inside. Every project starts with research into what parents in your area are looking for.",
    ],
    challenges: [
      {
        title: "Parents research online first",
        description:
          "Before visiting, most parents check a school's website and social media on their phone. An outdated or hard-to-use website loses families before they ever see the campus.",
      },
      {
        title: "A brand that has grown without a plan",
        description:
          "Logos redrawn over the years, different colours on uniforms, buses and letterheads. A brand system brings them back together.",
      },
      {
        title: "Too much information, no hierarchy",
        description:
          "Prospectuses and websites often try to say everything at once. Parents need the essentials first: curriculum, safety, facilities, fees and how to apply.",
      },
      {
        title: "Communicating all year, not just at admission time",
        description:
          "Events, results and achievements are the best proof of a school's quality. A simple social media system makes sharing them easy and consistent.",
      },
    ],
    offerings: [
      {
        service: "logo-brand-identity-design-patna",
        description: "A logo, crest and identity system for uniforms, signage, stationery and certificates.",
      },
      {
        service: "website-design-patna",
        description: "A mobile-friendly website with admissions information, facilities, notices and an enquiry form.",
      },
      {
        service: "graphic-design-patna",
        description: "Prospectuses, admission brochures, signage, banners and event material.",
      },
      {
        service: "social-media-design-patna",
        description: "Templates for events, achievements, notices and admission campaigns.",
      },
    ],
    faqs: [
      {
        question: "Can you redesign our school logo without losing its heritage?",
        answer:
          "Yes. For established schools we usually refine the existing crest or logo so it works better in print and on screen, keeping the elements parents and alumni recognise.",
      },
      {
        question: "Can school staff update the website?",
        answer:
          "We design the website so notices, events and admission details are easy to update, and hand over guidance for your staff or developer.",
      },
      {
        question: "How long does a school website take?",
        answer:
          "A school website usually takes 3–5 weeks to design, depending on the number of pages and how ready the content is.",
      },
      {
        question: "Do you also design prospectuses and admission material?",
        answer:
          "Yes. We design prospectuses, brochures, forms and admission campaign creatives, consistent with your brand and website.",
      },
    ],
    posts: ["what-is-brand-identity", "how-to-choose-a-design-agency-in-patna"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    singular: "real-estate business",
    title: "Real Estate Branding in Patna",
    description:
      "Project branding, brochures, hoardings, social creatives and websites for builders and real-estate firms in Patna and Bihar.",
    h1: "Real Estate Branding and Brochure Design in Patna",
    intro: [
      "Buying a home is the largest purchase most families make, and they often decide before a project is finished. That means your brochure, hoardings and website have to do the job a finished building would: make the project feel real, trustworthy and worth the price.",
      "We design brands and sales material for builders, developers and real-estate firms in Patna and across Bihar, starting with research into who the project is for and what they need to be convinced of.",
    ],
    challenges: [
      {
        title: "Selling something that isn't built yet",
        description:
          "Buyers need to picture the finished home. Clear floor plans, honest renders and a well-structured brochure do more than a page of adjectives.",
      },
      {
        title: "Every project needs its own identity",
        description:
          "Each project competes with others nearby, so it needs a name, look and story of its own, while still carrying the developer's reputation.",
      },
      {
        title: "Trust is the real sale",
        description:
          "Families want to know the builder will deliver. Track record, approvals and completed projects need to be easy to find, not buried on the last page.",
      },
      {
        title: "Many formats at once",
        description:
          "A launch needs brochures, hoardings, site banners, social ads, WhatsApp creatives and a website, all consistent and all ready on the same day.",
      },
    ],
    offerings: [
      {
        service: "logo-brand-identity-design-patna",
        description: "Developer brands and individual project identities: name lock-ups, logos, palettes and guidelines.",
      },
      {
        service: "graphic-design-patna",
        description: "Project brochures with floor plans and specifications, hoardings, site banners and standees.",
      },
      {
        service: "social-media-design-patna",
        description: "Launch campaigns, ad creatives and WhatsApp-ready creatives for site visits and offers.",
      },
      {
        service: "website-design-patna",
        description: "Project microsites and developer websites with plans, amenities, location and an enquiry form.",
      },
    ],
    faqs: [
      {
        question: "Can you design a brochure before the renders are ready?",
        answer:
          "We can start on the structure, copy hierarchy and design system while renders are in progress, and drop them in once they're final, so the launch isn't delayed.",
      },
      {
        question: "Do you create a separate identity for each project?",
        answer:
          "Yes, if the project needs to stand on its own in the market. We keep a consistent link to the developer's brand so buyers know who is behind it.",
      },
      {
        question: "Can you make WhatsApp versions of the brochure?",
        answer:
          "Yes. Every printed piece comes with a lighter digital version for sharing on WhatsApp and social media.",
      },
      {
        question: "Do you work on hoardings and site branding?",
        answer:
          "Yes. We design hoardings, site barricade graphics, banners and standees, and deliver print-ready files in the sizes your vendor needs.",
      },
    ],
    posts: ["what-is-brand-identity", "how-to-choose-a-design-agency-in-patna"],
  },
  {
    slug: "healthcare",
    name: "Clinics & Hospitals",
    singular: "clinic",
    title: "Clinic and Hospital Branding in Patna",
    description:
      "Branding, signage, patient information, social media and websites for clinics, diagnostic centres and hospitals in Patna and Bihar.",
    h1: "Clinic and Hospital Branding in Patna",
    intro: [
      "Patients choose a clinic or hospital on trust. Before they walk in, they look at the signboard, ask around, check Google and often visit the website or Instagram page. Each of those either reassures them or raises a doubt.",
      "We design calm, clear brands and patient-facing material for clinics, diagnostic centres and hospitals in Patna and across Bihar, built on research into what patients and their families need to know.",
    ],
    challenges: [
      {
        title: "Looking trustworthy without looking cold",
        description:
          "Healthcare brands need to feel professional and safe, but also approachable. The right balance of colour, type and tone makes a real difference.",
      },
      {
        title: "Information patients can actually use",
        description:
          "Timings, doctors, specialities, tests and preparation instructions are often scattered or hard to read. Clear design reduces calls and confusion at the front desk.",
      },
      {
        title: "Finding your way around",
        description:
          "In a busy clinic or hospital, good signage and wayfinding make people less anxious and help staff work more smoothly.",
      },
      {
        title: "Communicating responsibly",
        description:
          "Health communication should inform, not overpromise. Designs need to stay clear, accurate and respectful of patients' privacy.",
      },
    ],
    offerings: [
      {
        service: "logo-brand-identity-design-patna",
        description: "A logo and identity system for signage, prescriptions, reports, uniforms and stationery.",
      },
      {
        service: "graphic-design-patna",
        description: "Patient information leaflets, test preparation guides, signage, wayfinding and health camp material.",
      },
      {
        service: "website-design-patna",
        description: "A website with doctors, specialities, timings, test information and a booking or WhatsApp enquiry flow.",
      },
      {
        service: "social-media-design-patna",
        description: "Templates for health awareness posts, doctor introductions, camp announcements and timings.",
      },
    ],
    faqs: [
      {
        question: "Can you design a report and prescription template too?",
        answer:
          "Yes. We design prescription pads, report templates, letterheads and other documents so every piece a patient takes home carries your brand.",
      },
      {
        question: "Can patients book appointments through the website?",
        answer:
          "We design the booking or enquiry flow, whether that's a form, a WhatsApp link or an integration with the system you already use, and hand it over to your developer.",
      },
      {
        question: "Do you design signage for the building?",
        answer:
          "Yes. We design external signboards and internal wayfinding, and deliver files your signage vendor can produce.",
      },
      {
        question: "Do you write the medical content?",
        answer:
          "No. Medical information should come from your doctors. We structure and design it so it is easy for patients to read.",
      },
    ],
    posts: ["what-is-brand-identity", "how-to-choose-a-design-agency-in-patna"],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function industryPath(slug: string) {
  return `/industries/${slug}`;
}
