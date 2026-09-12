/**
 * One-time / re-runnable content seed for a fresh Supabase project.
 * Uploads the studio's real launch images to Storage and upserts the initial
 * site copy, capabilities, process steps, FAQ and 3 sample portfolio
 * projects — all taken from the approved mockup — so the admin has real
 * structure to edit from day one instead of empty tables.
 *
 * Run with: npm run db:seed
 * (requires the schema in supabase/migrations to already be applied)
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createAdminClient } from "../lib/supabase/admin";
import type { Database } from "../types/database";

type PortfolioInsert = Database["public"]["Tables"]["portfolio_projects"]["Insert"];

const projectRoot = path.resolve(__dirname, "..");
const supabase = createAdminClient();

async function uploadImage(bucket: string, storagePath: string, localFile: string) {
  const fileBuffer = await readFile(path.join(projectRoot, localFile));
  const contentType = localFile.endsWith(".jpeg") || localFile.endsWith(".jpg")
    ? "image/jpeg"
    : "image/png";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed for ${bucket}/${storagePath}: ${error.message}`);
  console.log(`  uploaded ${bucket}/${storagePath}`);
}

async function seedSiteImages() {
  console.log("Uploading site images...");
  await uploadImage("site-images", "hero.png", "public/seed/hero.png");
  await uploadImage("site-images", "about-office.png", "public/seed/about-office.png");
  await uploadImage("site-images", "cta.png", "public/seed/cta.png");

  const { error } = await supabase.from("site_images").upsert(
    [
      { slot: "hero", storage_path: "hero.png", alt_text: "Pixora Studio hero visual" },
      {
        slot: "about_office",
        storage_path: "about-office.png",
        alt_text: "Pixora Studio office desk setup",
      },
      { slot: "cta_banner", storage_path: "cta.png", alt_text: "Pixora Studio call to action" },
    ],
    { onConflict: "slot" },
  );
  if (error) throw new Error(`site_images upsert failed: ${error.message}`);
  console.log("  site_images rows upserted");
}

async function seedSiteSettings() {
  console.log("Upserting site_settings...");
  const { error } = await supabase.from("site_settings").upsert(
    {
      id: 1,
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
      contact_whatsapp: "+91-8083019809",
      contact_email: "pixorastudio8@gmail.com",
      contact_hours: "Mon-Sat, 10:00-18:00 IST",
      footer_tagline:
        "Bihar's first research-driven design studio. Rooted in Patna. Designing for the world.",
      social_instagram: "",
      social_linkedin: "",
    },
    { onConflict: "id" },
  );
  if (error) throw new Error(`site_settings upsert failed: ${error.message}`);
  console.log("  site_settings row upserted");
}

async function seedCapabilities() {
  console.log("Upserting capabilities...");
  const capabilities = [
    ["Graphic Design", "Brochures, flyers, posters, banners and marketing collateral that hold up in print and on screen."],
    ["Branding & Identity", "Logos, brand guidelines, stationery and the full identity system your team can actually apply."],
    ["Social Media Design", "Posts, stories, carousels and ad creatives — built as a kit, not one-offs."],
    ["Presentation Design", "Pitch decks and investor presentations structured to hold attention and win the room."],
    ["UI/UX Design", "Research, wireframes, interface design and prototypes tested with real users."],
    ["Product Design", "End-to-end product experience: dashboards, web apps and the design system behind them."],
    ["Website Design", "Modern, responsive, conversion-focused sites — designed for your funnel, not a template."],
    ["Mobile App Design", "iOS and Android apps that feel native, obvious and genuinely nice to use."],
  ];

  // Idempotent: clear and re-insert rather than upsert-by-title, since
  // capabilities have no natural unique key besides display order.
  await supabase.from("capabilities").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("capabilities").insert(
    capabilities.map(([title, description], index) => ({
      title,
      description,
      display_order: index,
    })),
  );
  if (error) throw new Error(`capabilities insert failed: ${error.message}`);
  console.log(`  ${capabilities.length} capabilities inserted`);
}

async function seedProcessSteps() {
  console.log("Upserting process_steps...");
  const steps = [
    ["Discover", "We listen, understand the context and uncover what really needs to be solved."],
    ["Research", "We explore people, behavior, competitors and context to reveal meaningful insights."],
    ["Create", "We transform research into ideas, concepts and experiences built around real needs."],
    ["Deliver", "We deliver thoughtful, scalable design and everything needed to take it forward."],
  ];

  await supabase.from("process_steps").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("process_steps").insert(
    steps.map(([title, description], index) => ({
      title,
      description,
      display_order: index,
    })),
  );
  if (error) throw new Error(`process_steps insert failed: ${error.message}`);
  console.log(`  ${steps.length} process steps inserted`);
}

async function seedFaqItems() {
  console.log("Upserting faq_items...");
  const faqs = [
    [
      "How do we start working together?",
      "Send the brief through the form or WhatsApp. We reply within a working day with our read on the problem, a scope and a fixed quote. Approve it, pay the 50% advance, and kickoff happens the same week.",
    ],
    [
      'What does "research-driven" actually mean?',
      "Before we design, we talk to your customers, study your competitors and audit what you already have. Every decision in the final work traces back to something we learned — not to taste.",
    ],
    [
      "What does a typical project cost?",
      "Every scope is quoted fixed — no hourly surprises. Identity work and websites usually start in the ₹50k–₹1.5L band; product design and retainers sit higher. Tell us your budget and we will tell you honestly what it can buy.",
    ],
    [
      "How long do things take?",
      "A logo and identity system: 2–3 weeks. A marketing website: 3–5 weeks. A product UI or design system: 6–10 weeks. Social kits and decks turn around in days.",
    ],
    [
      "Do you work with businesses outside Bihar?",
      "Yes. We are based in Patna and work remotely across India, the US and the Gulf. Local clients get in-person workshops; everyone else gets the same process over calls.",
    ],
    [
      "Do I own the files?",
      "Completely. You get source files, exports, font documentation and a handover call. No hostage design.",
    ],
  ];

  await supabase.from("faq_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("faq_items").insert(
    faqs.map(([question, answer], index) => ({
      question,
      answer,
      display_order: index,
    })),
  );
  if (error) throw new Error(`faq_items insert failed: ${error.message}`);
  console.log(`  ${faqs.length} faq items inserted`);
}

async function seedPortfolio() {
  console.log("Uploading portfolio sample images...");
  await uploadImage("portfolio", "naturals/cover.png", "public/seed/work-1.png");
  await uploadImage("portfolio", "invira-global/cover.png", "public/seed/work-2.png");
  await uploadImage("portfolio", "tvs-future-accessories/cover.png", "public/seed/work-3.png");

  const projects: PortfolioInsert[] = [
    {
      title: "Naturals",
      slug: "naturals",
      category: "branding",
      client_name: "Naturals",
      description: "Branding and social campaign identity for a haircare label.",
      cover_image_path: "naturals/cover.png",
      tags: ["Branding", "Social Campaign", "Identity"],
      display_order: 0,
    },
    {
      title: "Invira Global",
      slug: "invira-global",
      category: "ui_ux",
      client_name: "Invira Global",
      description: "Hiring web app UI/UX and creatives.",
      cover_image_path: "invira-global/cover.png",
      tags: ["UI/UX", "Web App"],
      display_order: 1,
    },
    {
      title: "TVS Future Accessories",
      slug: "tvs-future-accessories",
      category: "ui_ux",
      client_name: "TVS Future Accessories",
      description: "E-commerce website design.",
      cover_image_path: "tvs-future-accessories/cover.png",
      tags: ["E-commerce", "Website"],
      display_order: 2,
    },
  ];

  console.log("Upserting portfolio_projects...");
  const { error } = await supabase
    .from("portfolio_projects")
    .upsert(projects, { onConflict: "slug" });
  if (error) throw new Error(`portfolio_projects upsert failed: ${error.message}`);
  console.log(`  ${projects.length} portfolio projects upserted`);
}

async function main() {
  await seedSiteImages();
  await seedSiteSettings();
  await seedCapabilities();
  await seedProcessSteps();
  await seedFaqItems();
  await seedPortfolio();
  console.log("\nSeed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
