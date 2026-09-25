-- Phase 6: server-side rate limiting for public form submissions (leads +
-- appointments), on top of the existing honeypot field.
--
-- The hits table has NO public policies (RLS enabled, zero grants), so it is
-- completely inaccessible to anon/authenticated directly. The only way in is
-- the SECURITY DEFINER function below, which atomically checks the recent
-- hit count for a (source, identifier) pair and records a new hit — anon
-- callers can EXECUTE it but can never SELECT/INSERT/DELETE the table
-- directly or see other visitors' identifiers.

create table if not exists public.form_rate_limits (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('lead', 'appointment')),
  identifier text not null,
  created_at timestamptz not null default now()
);

create index if not exists form_rate_limits_lookup_idx
  on public.form_rate_limits (source, identifier, created_at desc);

alter table public.form_rate_limits enable row level security;

create or replace function public.check_and_record_rate_limit(
  p_source text,
  p_identifier text,
  p_max_hits integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  hit_count integer;
begin
  -- Keep the table small: drop anything older than a day, well past any
  -- window we use.
  delete from public.form_rate_limits where created_at < now() - interval '1 day';

  select count(*) into hit_count
  from public.form_rate_limits
  where source = p_source
    and identifier = p_identifier
    and created_at > now() - make_interval(secs => p_window_seconds);

  if hit_count >= p_max_hits then
    return false;
  end if;

  insert into public.form_rate_limits (source, identifier) values (p_source, p_identifier);
  return true;
end;
$$;

revoke all on function public.check_and_record_rate_limit(text, text, integer, integer) from public;
grant execute on function public.check_and_record_rate_limit(text, text, integer, integer)
  to anon, authenticated;
