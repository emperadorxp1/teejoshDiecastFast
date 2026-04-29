create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  quantity integer not null default 1,
  category text,
  status text not null default 'Disponible',
  image_url text,
  created_at timestamp with time zone default now()
);

alter table products enable row level security;

create policy "Public can read available products"
on products for select
using (status = 'Disponible' and quantity > 0);

create policy "Authenticated admin can read products"
on products for select
to authenticated
using (true);

create policy "Authenticated admin can insert products"
on products for insert
to authenticated
with check (true);

create policy "Authenticated admin can update products"
on products for update
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Authenticated admin can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "Authenticated admin can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');
