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

alter table public.loan_applications enable row level security;

create policy "Borrowers can read own loan applications"
  on public.loan_applications
  for select
  to authenticated
  using (borrower_id = auth.uid());

create policy "Borrowers can insert own loan applications"
  on public.loan_applications
  for insert
  to authenticated
  with check (borrower_id = auth.uid());

create policy "Borrowers can update own draft loan applications"
  on public.loan_applications
  for update
  to authenticated
  using (borrower_id = auth.uid() and status = 'draft')
  with check (borrower_id = auth.uid());

create trigger loan_applications_updated_at
  before update on public.loan_applications
  for each row
  execute function public.update_updated_at();
