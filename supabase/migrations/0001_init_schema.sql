-- Phase 1: core schema for Pixora Studio's dynamic content.
-- Single-admin model: every "write" policy below grants access to any
-- authenticated user because exactly one admin account will ever exist
-- (created directly in the Supabase dashboard, not through public sign-up).

-- ── portfolio_projects ──────────────────────────────────────────────
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (category in ('branding', 'social', 'ui_ux', 'product')),
  client_name text,
  description text,
  cover_image_path text,
  gallery jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_published_order_idx
  on public.portfolio_projects (published, display_order);
create index if not exists portfolio_projects_category_idx
  on public.portfolio_projects (category);

alter table public.portfolio_projects enable row level security;

create policy "public reads published portfolio projects"
  on public.portfolio_projects for select
  to anon, authenticated
  using (published = true);

create policy "admin reads all portfolio projects"
  on public.portfolio_projects for select
  to authenticated
  using (true);

create policy "admin writes portfolio projects"
  on public.portfolio_projects for insert
  to authenticated
  with check (true);

create policy "admin updates portfolio projects"
  on public.portfolio_projects for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes portfolio projects"
  on public.portfolio_projects for delete
  to authenticated
  using (true);

-- ── leads (contact form submissions) ────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp_number text not null,
  project_types text[] not null default '{}',
  budget_range text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

alter table public.leads enable row level security;

create policy "anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "admin reads leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "admin updates leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes leads"
  on public.leads for delete
  to authenticated
  using (true);

-- ── site_settings (singleton row of editable copy/contact info) ────
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  hero_eyebrow text not null default '',
  hero_heading text not null default '',
  hero_subheading text not null default '',
  hero_cta_primary_label text not null default '',
  hero_cta_primary_href text not null default '',
  hero_cta_secondary_label text not null default '',
  hero_cta_secondary_href text not null default '',
  why_heading text not null default '',
  why_subheading text not null default '',
  why_body text not null default '',
  contact_whatsapp text not null default '',
  contact_email text not null default '',
  contact_hours text not null default '',
  footer_tagline text not null default '',
  social_instagram text not null default '',
  social_linkedin text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "public reads site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "admin updates site settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

create policy "admin inserts site settings"
  on public.site_settings for insert
  to authenticated
  with check (true);

-- ── capabilities (the 8 disciplines grid) ───────────────────────────
create table if not exists public.capabilities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.capabilities enable row level security;

create policy "public reads capabilities"
  on public.capabilities for select
  to anon, authenticated
  using (true);

create policy "admin writes capabilities"
  on public.capabilities for insert
  to authenticated
  with check (true);

create policy "admin updates capabilities"
  on public.capabilities for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes capabilities"
  on public.capabilities for delete
  to authenticated
  using (true);

-- ── process_steps (Discover / Research / Create / Deliver) ─────────
create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.process_steps enable row level security;

create policy "public reads process steps"
  on public.process_steps for select
  to anon, authenticated
  using (true);

create policy "admin writes process steps"
  on public.process_steps for insert
  to authenticated
  with check (true);

create policy "admin updates process steps"
  on public.process_steps for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes process steps"
  on public.process_steps for delete
  to authenticated
  using (true);

-- ── faq_items ────────────────────────────────────────────────────────
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.faq_items enable row level security;

create policy "public reads faq items"
  on public.faq_items for select
  to anon, authenticated
  using (true);

create policy "admin writes faq items"
  on public.faq_items for insert
  to authenticated
  with check (true);

create policy "admin updates faq items"
  on public.faq_items for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes faq items"
  on public.faq_items for delete
  to authenticated
  using (true);

-- ── site_images (named single-image slots: hero, about, cta, ...) ──
create table if not exists public.site_images (
  slot text primary key,
  storage_path text not null,
  alt_text text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_images enable row level security;

create policy "public reads site images"
  on public.site_images for select
  to anon, authenticated
  using (true);

create policy "admin writes site images"
  on public.site_images for insert
  to authenticated
  with check (true);

create policy "admin updates site images"
  on public.site_images for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes site images"
  on public.site_images for delete
  to authenticated
  using (true);

-- Keep updated_at current on every UPDATE.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger portfolio_projects_set_updated_at
  before update on public.portfolio_projects
  for each row execute function public.set_updated_at();

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

create trigger capabilities_set_updated_at
  before update on public.capabilities
  for each row execute function public.set_updated_at();

create trigger process_steps_set_updated_at
  before update on public.process_steps
  for each row execute function public.set_updated_at();

create trigger faq_items_set_updated_at
  before update on public.faq_items
  for each row execute function public.set_updated_at();

create trigger site_images_set_updated_at
  before update on public.site_images
  for each row execute function public.set_updated_at();
