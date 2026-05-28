create type public.user_role as enum ('borrower', 'lender', 'manager');
create type public.profile_status as enum ('active', 'suspended');
create type public.verification_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.user_role not null,
  status public.profile_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lender_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  organization_name text not null default '',
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.lender_profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

create policy "Users can update own safe fields"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Lenders can read own lender profile"
  on public.lender_profiles
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Lenders can update own lender profile"
  on public.lender_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  _role text;
  _email text;
begin
  _role := coalesce(new.raw_user_meta_data ->> 'role', '');
  _email := coalesce(new.email, '');

  insert into public.profiles (id, email, role)
  values (
    new.id,
    _email,
    case
      when _role in ('borrower', 'lender', 'manager') then _role::public.user_role
      else 'borrower'::public.user_role
    end
  );

  if _role = 'lender' then
    insert into public.lender_profiles (user_id)
    values (new.id);
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

create function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at();

create trigger lender_profiles_updated_at
  before update on public.lender_profiles
  for each row
  execute function public.update_updated_at();
