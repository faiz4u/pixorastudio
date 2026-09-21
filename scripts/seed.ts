/**
 * One-time / re-runnable content seed for a fresh Supabase project.
 * Uploads the studio's real launch images to Storage and upserts the initial
 * site copy, capabilities, process steps, FAQ and sample portfolio projects
 * (all defined once in lib/content/site-content.ts) so the admin has real
 * structure to edit from day one instead of empty tables.
 *
 * Run with: npm run db:seed
 * (requires the schema in supabase/migrations to already be applied)
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createAdminClient } from "../lib/supabase/admin";
import {
  SITE_SETTINGS_SEED,
  WHY_PRINCIPLES_SEED,
  CAPABILITIES_SEED,
  PROCESS_STEPS_SEED,
  FAQ_SEED,
  PORTFOLIO_SEED,
  SITE_IMAGES_SEED,
} from "../lib/content/site-content";

const projectRoot = path.resolve(__dirname, "..");
const supabase = createAdminClient();

async function uploadImage(bucket: string, storagePath: string, localFile: string) {
  const fileBuffer = await readFile(path.join(projectRoot, "public", localFile));
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
  for (const { storagePath, localPath } of Object.values(SITE_IMAGES_SEED)) {
    await uploadImage("site-images", storagePath, localPath.replace(/^\//, ""));
  }

  const { error } = await supabase.from("site_images").upsert(
    Object.entries(SITE_IMAGES_SEED).map(([slot, { storagePath, alt }]) => ({
      slot,
      storage_path: storagePath,
      alt_text: alt,
    })),
    { onConflict: "slot" },
  );
  if (error) throw new Error(`site_images upsert failed: ${error.message}`);
  console.log("  site_images rows upserted");
}

async function seedSiteSettings() {
  console.log("Upserting site_settings...");
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...SITE_SETTINGS_SEED }, { onConflict: "id" });
  if (error) throw new Error(`site_settings upsert failed: ${error.message}`);
  console.log("  site_settings row upserted");
}

async function seedWhyPrinciples() {
  console.log("Upserting why_principles...");
  await supabase.from("why_principles").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("why_principles").insert(
    WHY_PRINCIPLES_SEED.map((principle, index) => ({ ...principle, display_order: index })),
  );
  if (error) throw new Error(`why_principles insert failed: ${error.message}`);
  console.log(`  ${WHY_PRINCIPLES_SEED.length} why principles inserted`);
}

async function seedCapabilities() {
  console.log("Upserting capabilities...");
  // Idempotent: clear and re-insert rather than upsert-by-title, since
  // capabilities have no natural unique key besides display order.
  await supabase.from("capabilities").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("capabilities").insert(
    CAPABILITIES_SEED.map((capability, index) => ({ ...capability, display_order: index })),
  );
  if (error) throw new Error(`capabilities insert failed: ${error.message}`);
  console.log(`  ${CAPABILITIES_SEED.length} capabilities inserted`);
}

async function seedProcessSteps() {
  console.log("Upserting process_steps...");
  await supabase.from("process_steps").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("process_steps").insert(
    PROCESS_STEPS_SEED.map((step, index) => ({ ...step, display_order: index })),
  );
  if (error) throw new Error(`process_steps insert failed: ${error.message}`);
  console.log(`  ${PROCESS_STEPS_SEED.length} process steps inserted`);
}

async function seedFaqItems() {
  console.log("Upserting faq_items...");
  await supabase.from("faq_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("faq_items").insert(
    FAQ_SEED.map((faq, index) => ({ ...faq, display_order: index })),
  );
  if (error) throw new Error(`faq_items insert failed: ${error.message}`);
  console.log(`  ${FAQ_SEED.length} faq items inserted`);
}

async function seedPortfolio() {
  console.log("Uploading portfolio sample images...");
  for (const project of PORTFOLIO_SEED) {
    await uploadImage("portfolio", project.storagePath, project.localCoverImage.replace(/^\//, ""));
  }

  console.log("Upserting portfolio_projects...");
  const { error } = await supabase.from("portfolio_projects").upsert(
    PORTFOLIO_SEED.map((project, index) => ({
      title: project.title,
      slug: project.slug,
      category: project.category,
      client_name: project.clientName,
      description: project.description,
      cover_image_path: project.storagePath,
      tags: project.tags,
      display_order: index,
    })),
    { onConflict: "slug" },
  );
  if (error) throw new Error(`portfolio_projects upsert failed: ${error.message}`);
  console.log(`  ${PORTFOLIO_SEED.length} portfolio projects upserted`);
}

async function main() {
  await seedSiteImages();
  await seedSiteSettings();
  await seedWhyPrinciples();
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
