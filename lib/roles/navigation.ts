import type { UserRole } from "./types"

export type NavItem = {
  label: string
  href: string
  icon: NavIcon
}

export type NavIcon =
  | "applications"
  | "auditLogs"
  | "borrowers"
  | "businessProfile"
  | "lenders"
  | "loans"
  | "offers"
  | "overview"
  | "repayments"

export const roleNavigation: Record<UserRole, NavItem[]> = {
  borrower: [
    { label: "Overview", href: "/borrower", icon: "overview" },
    { label: "Business Profile", href: "/borrower/profile", icon: "businessProfile" },
    { label: "Applications", href: "/borrower/applications", icon: "applications" },
    { label: "Offers", href: "/borrower/offers", icon: "offers" },
    { label: "Loans", href: "/borrower/loans", icon: "loans" },
  ],
  lender: [
    { label: "Overview", href: "/lender", icon: "overview" },
    { label: "Applications", href: "/lender/applications", icon: "applications" },
    { label: "Offers", href: "/lender/offers", icon: "offers" },
    { label: "Repayments", href: "/lender/repayments", icon: "repayments" },
  ],
  manager: [
    { label: "Overview", href: "/manager", icon: "overview" },
    { label: "Lenders", href: "/manager/lenders", icon: "lenders" },
    { label: "Borrowers", href: "/manager/borrowers", icon: "borrowers" },
    { label: "Applications", href: "/manager/applications", icon: "applications" },
    { label: "Audit Logs", href: "/manager/audit-logs", icon: "auditLogs" },
  ],
}

export const roleLabels: Record<UserRole, string> = {
  borrower: "Borrower",
  lender: "Lender",
  manager: "Manager",
}
