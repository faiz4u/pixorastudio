-- Phase 7: security hardening, so the database enforces what the Privacy
-- Policy and Terms of Use promise.
--
--  1. Only listed admins (not "any signed-in account") can read or change
--     leads, appointments, site content and storage.
--  2. The public can no longer insert leads/appointments directly with the
--     publishable key; the server inserts them (secret key) after validation,
--     consent, honeypot and rate-limit checks.
--  3. The rate-limit function is callable only by the server.
--  4. Consent is recorded with each lead/appointment (DPDP Act s.6(10)).
--  5. Scheduled clean-up enforces the policy's retention periods.
--  6. Storage buckets accept only raster image types, up to 2 MB.
--
-- BEFORE RUNNING: replace the placeholder email in step 1 with your admin
-- account's email. The migration aborts if no admin gets registered, so it
-- can't lock you out.

-- 1. Admin allow-list -------------------------------------------------------

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- RLS on with no policies: invisible to anon/authenticated. Managed only from
-- the Supabase dashboard / SQL editor.
alter table public.admin_users enable row level security;

insert into public.admin_users (user_id)
select id from auth.users where email = 'REPLACE_WITH_ADMIN_EMAIL@example.com'
on conflict do nothing;

do $$
begin
  if not exists (select 1 from public.admin_users) then
    raise exception 'No admin registered: replace REPLACE_WITH_ADMIN_EMAIL@example.com in 0007_security_hardening.sql with your admin account email and run again.';
  end if;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Tighten every "to authenticated" admin policy (public tables plus the two
-- storage buckets) from "any signed-in user" to "a listed admin", keeping any
-- existing condition such as the bucket check. Public read policies are
-- granted to {anon,authenticated} and are left untouched. Idempotent.
do $$
declare
  p record;
begin
  for p in
    select schemaname, tablename, policyname, cmd, qual, with_check
    from pg_policies
    where roles = '{authenticated}'
      and (
        schemaname = 'public'
        or (schemaname = 'storage' and tablename = 'objects' and policyname like 'admin % bucket')
      )
      and coalesce(qual, '') not like '%is_admin()%'
      and coalesce(with_check, '') not like '%is_admin()%'
  loop
    if p.cmd = 'INSERT' then
      execute format(
        'alter policy %I on %I.%I with check (public.is_admin() and (%s))',
        p.policyname, p.schemaname, p.tablename, p.with_check
      );
    elsif p.cmd = 'UPDATE' then
      execute format(
        'alter policy %I on %I.%I using (public.is_admin() and (%s)) with check (public.is_admin() and (%s))',
        p.policyname, p.schemaname, p.tablename, p.qual, coalesce(p.with_check, p.qual)
      );
    else
      execute format(
        'alter policy %I on %I.%I using (public.is_admin() and (%s))',
        p.policyname, p.schemaname, p.tablename, p.qual
      );
    end if;
  end loop;
end;
$$;

-- 2. No direct public inserts ----------------------------------------------

drop policy if exists "anyone can submit a lead" on public.leads;
drop policy if exists "anyone can request an appointment" on public.appointments;

-- 3. Rate-limit function: server (secret key) only --------------------------

revoke execute on function public.check_and_record_rate_limit(text, text, integer, integer)
  from anon, authenticated;
grant execute on function public.check_and_record_rate_limit(text, text, integer, integer)
  to service_role;

-- 4. Consent record ---------------------------------------------------------

alter table public.leads
  add column if not exists consent_at timestamptz,
  add column if not exists consent_version text;

alter table public.appointments
  add column if not exists consent_at timestamptz,
  add column if not exists consent_version text;

-- 5. Retention clean-up (pg_cron) --------------------------------------------

create extension if not exists pg_cron;

select cron.unschedule(jobname)
from cron.job
where jobname in ('purge-form-rate-limits', 'purge-old-enquiries');

-- Hashed IPs are only needed for the rate-limit window (max 1 hour); purge
-- hourly, well within the 24 hours the Privacy Policy promises.
select cron.schedule(
  'purge-form-rate-limits',
  '0 * * * *',
  $$delete from public.form_rate_limits where created_at < now() - interval '2 hours'$$
);

-- Enquiries and appointment requests are deleted after 24 months, as the
-- Privacy Policy states. Client records needed for tax live in your
-- invoicing/accounting records, not these tables.
select cron.schedule(
  'purge-old-enquiries',
  '30 3 * * *',
  $$
    delete from public.leads where created_at < now() - interval '24 months';
    delete from public.appointments where created_at < now() - interval '24 months';
  $$
);

-- 6. Storage: raster images only (blocks SVG/HTML uploads) -----------------

update storage.buckets
set allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
    file_size_limit = 2 * 1024 * 1024
where id in ('portfolio', 'site-images');
