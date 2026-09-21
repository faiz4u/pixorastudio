-- QA bugs 01-05: section headings/subheadings and the "Why Pixora" principles
-- were hardcoded in the marketing components, so the admin had no way to edit
-- them. This adds the missing site_settings columns and a why_principles table
-- that mirrors the existing capabilities/process_steps shape.

-- ── bugs 02-05: per-section heading & subheading copy ───────────────
alter table public.site_settings
  add column if not exists work_heading text not null default '',
  add column if not exists capabilities_heading text not null default '',
  add column if not exists capabilities_subheading text not null default '',
  add column if not exists process_heading text not null default '',
  add column if not exists process_subheading text not null default '',
  add column if not exists contact_heading text not null default '',
  add column if not exists contact_subheading text not null default '';

-- ── bug 01: "Why Pixora" 3 Principles ───────────────────────────────
create table if not exists public.why_principles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.why_principles enable row level security;

create policy "public reads why principles"
  on public.why_principles for select
  to anon, authenticated
  using (true);

create policy "admin writes why principles"
  on public.why_principles for insert
  to authenticated
  with check (true);

create policy "admin updates why principles"
  on public.why_principles for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes why principles"
  on public.why_principles for delete
  to authenticated
  using (true);

create trigger why_principles_set_updated_at
  before update on public.why_principles
  for each row execute function public.set_updated_at();
