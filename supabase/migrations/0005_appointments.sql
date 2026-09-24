-- Phase 5: appointment-booking requests from the "book a meeting" contact
-- section icon. Mirrors the leads table's single-admin RLS shape.

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  preferred_date date not null,
  time_slot text not null check (time_slot in ('morning', 'afternoon', 'evening')),
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists appointments_status_created_idx
  on public.appointments (status, created_at desc);

alter table public.appointments enable row level security;

create policy "anyone can request an appointment"
  on public.appointments for insert
  to anon, authenticated
  with check (true);

create policy "admin reads appointments"
  on public.appointments for select
  to authenticated
  using (true);

create policy "admin updates appointments"
  on public.appointments for update
  to authenticated
  using (true)
  with check (true);

create policy "admin deletes appointments"
  on public.appointments for delete
  to authenticated
  using (true);
