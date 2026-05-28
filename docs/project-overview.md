# LendFolio — Project Overview

## What is LendFolio?

LendFolio is a mobile-first financing workflow platform for Filipino micro-entrepreneurs. It connects borrowers who need small business loans with verified lenders who want to deploy capital, and platform managers who ensure the process is fair and transparent.

## Who uses it?

### Borrowers
- Filipino micro-entrepreneurs seeking business financing
- Create a business profile with relevant details
- Submit loan applications with desired amount and terms
- Receive structured offers from approved lenders
- Accept one offer and track repayment progress
- Upload repayment proof for lender verification

### Lenders
- Verified individuals or organizations providing capital
- Review borrower applications and business profiles
- Send structured offers with proposed terms
- Verify repayment proof submitted by borrowers
- Track lending history and portfolio

### Managers
- Platform administrators who oversee operations
- Approve lender applications to join the platform
- Review and verify borrower profiles
- Monitor platform activity and lending health
- Ensure compliance and fairness

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Security | Supabase Row Level Security |
| Storage | Supabase Storage |
| Forms | React Hook Form + Zod |
| Testing | Vitest |
| CI | GitHub Actions |
| Hosting | Vercel Hobby (free tier) |

## Design principles

- **Mobile-first**: Every screen is designed for small screens first.
- **Free-tier-first**: No paid services required for core functionality.
- **Clean and credible**: Professional UI that builds trust.
- **Accessible**: Semantic HTML and keyboard navigation.
- **Simple**: Avoid clutter and unnecessary complexity.

## What LendFolio is NOT

- Not a payment processor
- Not a credit scoring engine
- Not an e-KYC provider
- Not a banking app
- Not a native mobile app

These may be explored in future phases but are explicitly out of scope for the MVP.
