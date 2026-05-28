# Landing Page QA Checklist

## Automated Tests (vitest + testing-library)

- [ ] Page renders the LendFolio brand text
- [ ] Login link exists and points to `/login`
- [ ] Signup link exists and points to `/signup`
- [ ] Hero heading is present (h1)
- [ ] Hero CTA "Get started" links to `/signup`
- [ ] Hero CTA "Log in" links to `/login`
- [ ] Borrower role card renders
- [ ] Lender role card renders
- [ ] Manager role card renders
- [ ] Each role card has a "Learn more" link
- [ ] "Learn more" links point to correct routes (`/borrower`, `/lender`, `/manager`)
- [ ] Page uses semantic `<header>`, `<main>`, `<section>` landmarks
- [ ] Single h1 on the page
- [ ] Footer renders with copyright and legal links

## Manual QA Checklist

### Desktop (1440px)

- [ ] Header is ~56–64px tall with subtle bottom border
- [ ] LendFolio wordmark is left-aligned; login/signup right-aligned
- [ ] Hero is centered, max-width constrained, not overly sparse
- [ ] Hero heading is readable (not too large, not too small)
- [ ] Eyebrow badge is visible and muted
- [ ] CTA buttons are side-by-side, compact
- [ ] Role cards are 3-column, consistent height
- [ ] Card titles are 16px semibold
- [ ] Card body text is 14px muted
- [ ] MVP section is centered and compact
- [ ] Footer is clean, border-t, compact

### Tablet (~768px)

- [ ] Header does not overflow
- [ ] Hero text does not break awkwardly
- [ ] CTA buttons are side-by-side
- [ ] Role cards are 2-column
- [ ] Spacing feels balanced (not too much vertical emptiness)

### Mobile (~375px)

- [ ] Header does not overflow; wordmark is truncated or shrinks gracefully
- [ ] Hero heading scales to text-3xl
- [ ] CTA buttons stack vertically
- [ ] Role cards stack to 1 column with comfortable spacing
- [ ] No horizontal scrolling
- [ ] Footer stacks vertically

### Accessibility

- [ ] One h1 on the page
- [ ] All links/buttons have accessible text
- [ ] Color contrast meets WCAG AA (zinc-950 on white, zinc-500 on white)
- [ ] Focus states are visible (shadcn defaults)
- [ ] Keyboard navigation works through header, CTAs, role cards, footer

### Links

- [ ] Header LendFolio wordmark → `/`
- [ ] Header "Log in" → `/login`
- [ ] Header "Sign up" → `/signup`
- [ ] Hero "Get started" → `/signup`
- [ ] Hero "Log in" → `/login`
- [ ] Borrower card "Learn more" → `/borrower`
- [ ] Lender card "Learn more" → `/lender`
- [ ] Manager card "Learn more" → `/manager`
- [ ] Footer "Terms" → `/terms`
- [ ] Footer "Privacy" → `/privacy`
