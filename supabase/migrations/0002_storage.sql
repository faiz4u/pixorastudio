-- Phase 1: storage buckets for portfolio and general site images.
-- Both buckets are public-read (the marketing site is public) and
-- writable only by the authenticated admin.

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "public reads portfolio bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

create policy "admin writes portfolio bucket"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

create policy "admin updates portfolio bucket"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio')
  with check (bucket_id = 'portfolio');

create policy "admin deletes portfolio bucket"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');

create policy "public reads site-images bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-images');

create policy "admin writes site-images bucket"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

create policy "admin updates site-images bucket"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images')
  with check (bucket_id = 'site-images');

create policy "admin deletes site-images bucket"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images');
