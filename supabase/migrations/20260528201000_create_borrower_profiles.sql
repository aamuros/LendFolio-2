create type public.borrower_profile_status as enum ('incomplete', 'complete', 'needs_review');

create table public.borrower_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  business_name text not null default '',
  business_type text not null default '',
  business_description text not null default '',
  business_address text not null default '',
  city text not null default '',
  province text not null default '',
  years_operating integer,
  monthly_revenue numeric,
  monthly_expenses numeric,
  existing_debt numeric,
  requested_loan_purpose text not null default '',
  profile_status public.borrower_profile_status not null default 'incomplete',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.borrower_profiles enable row level security;

create policy "Borrowers can read own borrower profile"
  on public.borrower_profiles
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Borrowers can insert own borrower profile"
  on public.borrower_profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Borrowers can update own borrower profile"
  on public.borrower_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create trigger borrower_profiles_updated_at
  before update on public.borrower_profiles
  for each row
  execute function public.update_updated_at();

create or replace function public.handle_new_user()
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

  if _role = 'borrower' then
    insert into public.borrower_profiles (user_id)
    values (new.id);
  end if;

  return new;
end;
$$;
