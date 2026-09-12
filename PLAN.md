# Delivery Plan & Log

Cross-check file for what was planned vs. what was actually delivered in each work session. Newest entry on top.

> This file was created on 2026-09-12, after Phases 0–3 were already built. Those phases have no separately-recorded "plan" — the entries below are reconstructed from their commit messages (`git log`) purely as a delivered-work record. Every entry from this point forward gets a real plan written before the work starts.

---

## 2026-09-12 — Brand color update

### Requested
- Add this `PLAN.md` file so planned work vs. delivered work can be cross-checked.
- Swap the theme's core colors:
  - Blue → `#461E9B`
  - Black → `#12151A`
  - White → `#FAFAFA`

### Plan
1. Locate every place color is defined for the site. The project has one source of truth: `app/globals.css`, which defines all theme tokens as CSS variables (`:root` / `.dark`) consumed via Tailwind v4's `@theme inline` block. No literal blue is used anywhere in the code — the closest match is the brand's purple/violet primary color (`--primary` / `--brand-deep`, previously `#4C1FBF`), so that family is what "blue" refers to.
2. Rebase the three color families on the new hex values, preserving the existing lightness/contrast relationships between related tokens (e.g. card should stay slightly lighter than background, brand-soft should stay a lighter tint than brand) rather than flattening every token to one identical hex:
   - **Primary/brand family** ("blue"): `--primary`, `--brand-deep`, `--sidebar-primary`, `--chart-3` → `#461E9B`. Derived tints `--brand`, `--accent`, `--ring`, `--sidebar-ring`, `--chart-1` and `--brand-hover`, `--brand-soft`, `--chart-2` recalculated proportionally from the same base so the palette stays internally consistent.
   - **Surface/background family** ("black"): `--background` → `#12151A`, with `--card`/`--popover`, `--secondary`, `--muted`, `--sidebar` shifted by the same deltas they had from the old background, to keep the existing depth hierarchy.
   - **Text/foreground family** ("white"): `--foreground`, `--card-foreground`, `--popover-foreground`, `--secondary-foreground`, `--sidebar-foreground`, `--primary-foreground`, `--accent-foreground`, `--sidebar-primary-foreground`, and the `::selection` text color → `#FAFAFA`. Translucent white borders (`--border`, `--input`, `--sidebar-border`) switched from `rgba(255,255,255,…)` to `rgba(250,250,250,…)` to match.
3. Override Tailwind v4's built-in `black` (`#000`) and `white` (`#fff`) utility colors globally via `--color-black: #12151a` / `--color-white: #fafafa` in the `@theme inline` block, so literal `bg-black/10`, `text-white`, `bg-white`, `border-white/10` usages already in the codebase (dialog/sheet overlays, marketing CTA banner, hero section, process section) pick up the new colors automatically without per-file edits.
4. Leave unrelated tokens untouched: muted-gray chart colors (`--chart-4`, `--chart-5`), `--muted-foreground`, `--destructive` (error red), and the scrollbar thumb color — none of these represent blue, black, or white.
5. Verify with `tsc --noEmit` (no color logic lives in TS, but confirms nothing else broke) and a visual review of the updated `globals.css`.

### Delivered
- Added this `PLAN.md`.
- Updated `app/globals.css`:
  - Primary/brand family → based on `#461E9B` (`--primary`, `--brand-deep`, `--sidebar-primary`, `--chart-3` = `#461e9b`; derived `--brand`/`--accent`/`--ring`/`--sidebar-ring`/`--chart-1` = `#744bdb`; `--brand-hover` = `#6433cc`; `--brand-soft`/`--chart-2` = `#b19bdb`).
  - Background/surface family → based on `#12151A` (`--background` = `#12151a`; `--card`/`--popover` = `#191b24`; `--secondary` = `#22212d`; `--muted` = `#1d1d2c`; `--sidebar` = `#161820`).
  - Foreground/white family → `#FAFAFA` everywhere text was previously off-white or pure white, and translucent border/input colors moved to `rgba(250,250,250,…)`.
  - `--color-white` / `--color-black` added to the `@theme inline` block so Tailwind's default `white`/`black` utilities resolve to `#fafafa` / `#12151a` project-wide.
  - `::selection` text color updated to `#fafafa`.
- Confirmed `npx tsc --noEmit` passes with no errors.
- Not changed (intentionally out of scope): `--muted-foreground`, `--chart-4`, `--chart-5`, `--destructive`, and the scrollbar thumb color — these are grays/red unrelated to the blue/black/white request.

### Follow-ups / things to verify visually
- Run `npm run dev` and eyeball the homepage, admin dashboard, and any dialogs/sheets to confirm the new palette reads well (not yet visually verified in a browser this session).
- If any component hardcodes a hex color instead of using a theme token, it won't have picked up this change — none were found in this pass (`--color-white`/`--color-black` override handles all literal `black`/`white` Tailwind class usages found in `dialog.tsx`, `sheet.tsx`, `cta-banner.tsx`, `hero-section.tsx`, `process-section.tsx`).

---

## 2026-09-12 — Add reference copies of the mockup assets to `public/`

### Delivered (commit `5ea2b59`)
- Duplicated the same source images already organized under `public/seed/` and `public/brand/` into loose files at the `public/` root (`Frame 1000007128.png`, `about-us.png`, `cta-bg.png`, `hero-image.png`, `landingpage.png`, `work-sample1.png`, `work-sample2.png`, `work-sample3.png`).
- Kept as-is per user request rather than removed, for quick reference at the `public/` root — not otherwise referenced by app code.

---

## 2026-09-12 — Phase 3: full public marketing site

### Delivered (commit `8128835`)
- Every mockup section built as server components reading live Supabase content, with graceful fallback to `lib/content/site-content.ts` (the same data `scripts/seed.ts` inserts) so the site renders correctly even before migrations/seed are applied: Header/mobile nav, Hero, service marquee, Why Pixora, filterable Selected Work grid, all 8 Capabilities, 4-step Process, lead-capture Contact form (+ server action with honeypot spam protection, wired to Resend when configured), FAQ accordion, closing CTA banner, Footer.
- `lib/supabase/storage.ts` builds public Storage URLs for Supabase-backed images, falling back to the local `/seed` assets otherwise.
- Verified visually in-browser section by section against the mockup; matches closely at desktop width.

---

## 2026-09-12 — Phase 2: admin auth flow and dashboard shell

### Delivered (commit `bd3dff5`)
- Real Supabase email/password login (server action + zod validation, React `useActionState` for pending/error states).
- Admin dashboard route group with sidebar/topbar shell (mobile sheet), logout action, and a defense-in-depth session check in its layout on top of the proxy's redirect.
- Overview page wired to live counts (portfolio/leads), with a visible warning if the Phase 1 migrations haven't been applied yet.
- Placeholder pages for Portfolio/Leads/Content/Media/Settings, to be built out in the admin CRUD phase.
- Fixed a Next/Image + Tailwind preflight aspect-ratio warning on the brand logo by pinning width/height via className.

---

## 2026-09-12 — Phase 1: database schema, storage buckets, and content seed script

### Delivered (commit `bf2a39c`)
- SQL migrations (`supabase/migrations`) for `portfolio_projects`, `leads`, `site_settings`, `capabilities`, `process_steps`, `faq_items` and `site_images`, each with RLS: public read (published only for portfolio), full CRUD restricted to the single authenticated admin.
- Storage buckets (`portfolio`, `site-images`): public read, admin write.
- `scripts/seed.ts` uploads the studio's real launch images and inserts the actual mockup copy (hero/why/contact text, all 8 capabilities, the 4 process steps, the 6 FAQ items, 3 sample portfolio projects) so the admin edits real content from day one.
- `types/database.ts` hand-written to match the schema (Supabase client generics), replacing the Phase 0 placeholder.

---

## 2026-09-12 — Phase 0: scaffold Next.js + Supabase + shadcn foundation

### Delivered (commit `8e54428`)
- Next.js 16 (App Router, TS, Tailwind v4) with route groups for the public marketing site and the admin dashboard.
- shadcn/ui initialized (Radix base, Nova preset) with the Pixora brand palette (dark, purple accent) and Archivo/Montserrat fonts pulled from the studio's design source.
- Supabase client/server/admin helpers (`@supabase/ssr`) and a proxy (middleware) that refreshes sessions and gates `/admin/**`.
- Validated env access via `lib/env.ts` (zod), `.env.example` template.
- Brand logos and mockup seed images copied into `public/` for later use.
