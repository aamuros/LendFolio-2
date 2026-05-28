# LendFolio — Database Plan

## Overview

LendFolio uses Supabase Postgres with Row Level Security (RLS). This document outlines the intended tables and relationships. Migrations will be implemented in future sprints.

---

## Tables

### `profiles`

User profile linked to Supabase Auth.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, references auth.users |
| email | text | Unique |
| full_name | text | |
| role | enum | borrower, lender, manager |
| status | enum | active, suspended |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

### `borrower_profiles`

Extended profile for borrowers.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| business_name | text | |
| business_type | text | |
| location | text | |
| description | text | |
| years_operating | integer | |
| verification_status | enum | pending, verified, rejected |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `lender_profiles`

Extended profile for lenders.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| organization_name | text | |
| lending_focus | text | |
| approval_status | enum | pending, approved, rejected |
| approved_by | uuid | FK → profiles.id (manager) |
| approved_at | timestamptz | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `loan_applications`

Borrower loan applications.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| borrower_id | uuid | FK → profiles.id |
| amount | numeric | Requested amount |
| purpose | text | |
| term_months | integer | Desired repayment term |
| status | enum | draft, submitted, under_review, offers_received, closed |
| details | jsonb | Flexible additional details |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `offers`

Lender offers on loan applications.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| application_id | uuid | FK → loan_applications.id |
| lender_id | uuid | FK → profiles.id |
| amount | numeric | Offered amount |
| interest_rate | numeric | Percentage |
| term_months | integer | |
| conditions | text | |
| status | enum | pending, accepted, rejected, withdrawn |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `repayments`

Repayment records linked to accepted offers.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| offer_id | uuid | FK → offers.id |
| borrower_id | uuid | FK → profiles.id |
| amount | numeric | Repayment amount |
| due_date | date | |
| proof_url | text | Supabase Storage URL |
| status | enum | pending, submitted, verified, rejected |
| verified_by | uuid | FK → profiles.id (lender) |
| verified_at | timestamptz | |
| created_at | timestamptz | |

### `notifications`

In-app notifications.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| type | text | e.g. offer_received, repayment_verified |
| title | text | |
| message | text | |
| read | boolean | Default false |
| created_at | timestamptz | |

### `audit_logs`

Activity audit trail.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| actor_id | uuid | FK → profiles.id |
| action | text | e.g. offer_sent, application_approved |
| entity_type | text | e.g. offer, loan_application |
| entity_id | uuid | |
| metadata | jsonb | |
| created_at | timestamptz | |

---

## Enums

```sql
CREATE TYPE user_role AS ENUM ('borrower', 'lender', 'manager');
CREATE TYPE user_status AS ENUM ('active', 'suspended');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'offers_received', 'closed');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE repayment_status AS ENUM ('pending', 'submitted', 'verified', 'rejected');
```

---

## Row Level Security (RLS) Strategy

- **profiles**: Users can read their own profile. Managers can read all profiles.
- **borrower_profiles**: Borrowers can read/write their own. Lenders can read verified profiles. Managers can read all.
- **lender_profiles**: Lenders can read/write their own. Managers can read/write all.
- **loan_applications**: Borrowers can CRUD their own. Lenders can read submitted applications. Managers can read all.
- **offers**: Lenders can CRUD their own offers. Borrowers can read offers on their applications. Managers can read all.
- **repayments**: Borrowers can CRUD their own. Lenders can read/update (verify) on their offers. Managers can read all.
- **notifications**: Users can read their own. System can insert.
- **audit_logs**: Managers can read all. System can insert.

---

## Indexes (Planned)

- `profiles(email)` — unique
- `borrower_profiles(user_id)` — unique
- `lender_profiles(user_id)` — unique
- `loan_applications(borrower_id, status)`
- `offers(application_id, status)`
- `repayments(offer_id, status)`
- `notifications(user_id, read)`

---

## Notes

- All tables will use UUID primary keys generated by Supabase.
- Timestamps will use `timestamptz` with timezone awareness.
- JSONB columns allow flexible extension without schema changes.
- Migrations will be created incrementally as sprints require them.
