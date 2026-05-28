# LendFolio — Agile Sprint Plan

## Overview

LendFolio is built one testable Agile sprint at a time. Each sprint delivers a working, reviewable increment.

---

## Sprint 0 — Project Foundation

**Goal**: Clean project setup with all tooling, shared UI components, and placeholder routes.

**Deliverables**:
- Next.js App Router project with TypeScript and Tailwind CSS
- shadcn/ui configured with CSS variables and zinc/neutral base
- All required shadcn components installed
- Shared layout components: PageHeader, SectionCard, StatusBadge, EmptyState, DashboardShell
- Landing page with hero, role cards, and CTAs
- Placeholder routes: /login, /signup, /borrower, /lender, /manager, /terms, /privacy
- Supabase client placeholder files
- `.env.example` with Supabase keys
- Documentation: project-overview.md, agile-plan.md, database-plan.md

**Status**: In progress

---

## Sprint 1 — Authentication & Role Selection

**Goal**: Users can sign up, log in, select a role, and be redirected to their dashboard.

**Deliverables**:
- Supabase Auth integration (email + password)
- Signup form with email, password, role selection
- Login form with email and password
- Auth middleware to protect dashboard routes
- Role stored in user metadata or profiles table
- Redirect to /borrower, /lender, or /manager based on role
- Logout functionality
- Auth state in header (logged in vs. logged out)

---

## Sprint 2 — Borrower Profile

**Goal**: Borrowers can create and edit their business profile.

**Deliverables**:
- Business profile form (name, type, location, description, years operating)
- Profile stored in Supabase with RLS
- Profile view page
- Profile edit functionality
- Validation with Zod
- Profile completeness indicator

---

## Sprint 3 — Loan Application

**Goal**: Borrowers can submit loan applications.

**Deliverables**:
- Loan application form (amount, purpose, desired term, business details)
- Application stored in Supabase with RLS
- Application list view for borrowers
- Application detail view
- Status tracking (draft, submitted, under review)
- Validation with Zod

---

## Sprint 4 — Lender Approval & Profile

**Goal**: Managers can approve lenders. Lenders can set up their profile.

**Deliverables**:
- Lender application/approval workflow for managers
- Manager approval UI with approve/reject actions
- Lender profile form (name, organization, lending criteria)
- Lender profile stored in Supabase with RLS
- Approved lenders can access lender dashboard

---

## Sprint 5 — Offer Workflow

**Goal**: Lenders can send offers. Borrowers can view and accept offers.

**Deliverables**:
- Lender can view borrower applications
- Offer form (amount, interest rate, term, conditions)
- Offer stored in Supabase with RLS
- Borrower can view received offers side by side
- Borrower can accept one offer
- Status updates: pending, accepted, rejected
- Notifications (in-app) for new offers and acceptances

---

## Sprint 6 — Repayment Tracking

**Goal**: Borrowers can upload repayment proof. Lenders can verify it.

**Deliverables**:
- Repayment schedule based on accepted offer terms
- Borrower can upload repayment proof (image/document)
- Proof stored in Supabase Storage
- Lender can view and verify/reject repayment proof
- Repayment status tracking (pending, verified, rejected)
- Basic repayment progress indicator

---

## Sprint 7 — Manager Dashboard & Polish

**Goal**: Managers have full oversight. UI is polished and production-ready.

**Deliverables**:
- Manager dashboard with platform statistics
- Borrower verification workflow for managers
- Activity log / audit trail
- Responsive UI polish and accessibility audit
- Error handling and loading states throughout
- Basic documentation and onboarding flow

---

## Future Sprints (Post-MVP)

- Payment processing integration
- E-wallet integration
- Credit scoring
- Production e-KYC
- Advanced analytics and reporting
- Email notifications (Resend)
- End-to-end testing (Playwright)
- Multi-language support (Filipino/English)
