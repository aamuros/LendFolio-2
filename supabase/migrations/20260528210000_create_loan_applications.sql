create type public.application_status as enum ('draft', 'submitted', 'withdrawn', 'accepted', 'declined');

create table public.loan_applications (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid not null references public.profiles (id) on delete cascade,
  borrower_profile_id uuid not null references public.borrower_profiles (id) on delete cascade,
  requested_amount numeric not null,
  loan_purpose text not null,
  preferred_term_months integer not null,
  repayment_plan text not null,
  borrower_notes text not null default '',
  status public.application_status not null default 'submitted',
  profile_snapshot jsonb,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.loan_applications
  add constraint loan_applications_requested_amount_positive
    check (requested_amount > 0),
  add constraint loan_applications_preferred_term_allowed
    check (preferred_term_months in (1, 3, 6, 12));

alter table public.loan_applications enable row level security;

create policy "Borrowers can read own loan applications"
  on public.loan_applications
  for select
  to authenticated
  using (
    borrower_id = auth.uid()
    and exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'borrower'
    )
  );

create policy "Borrowers can insert own loan applications"
  on public.loan_applications
  for insert
  to authenticated
  with check (
    borrower_id = auth.uid()
    and status = 'submitted'
    and exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'borrower'
    )
    and exists (
      select 1
      from public.borrower_profiles
      where borrower_profiles.id = borrower_profile_id
        and borrower_profiles.user_id = auth.uid()
        and borrower_profiles.profile_status = 'complete'
    )
  );

create trigger loan_applications_updated_at
  before update on public.loan_applications
  for each row
  execute function public.update_updated_at();
