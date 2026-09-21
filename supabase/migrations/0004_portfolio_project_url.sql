-- Optional link to the live project / case study. When set, the portfolio card
-- on the public site links out to it.
alter table public.portfolio_projects
  add column if not exists project_url text;
