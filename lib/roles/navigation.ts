import type { UserRole } from "./types"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  HandCoinsIcon,
  WalletIcon,
  Building2Icon,
  UsersIcon,
  ShieldCheckIcon,
  ClipboardListIcon,
  ScrollTextIcon,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const roleNavigation: Record<UserRole, NavItem[]> = {
  borrower: [
    { label: "Overview", href: "/borrower", icon: LayoutDashboardIcon },
    { label: "Business Profile", href: "/borrower/profile", icon: Building2Icon },
    { label: "Applications", href: "/borrower/applications", icon: FileTextIcon },
    { label: "Offers", href: "/borrower/offers", icon: HandCoinsIcon },
    { label: "Loans", href: "/borrower/loans", icon: WalletIcon },
  ],
  lender: [
    { label: "Overview", href: "/lender", icon: LayoutDashboardIcon },
    { label: "Applications", href: "/lender/applications", icon: FileTextIcon },
    { label: "Offers", href: "/lender/offers", icon: HandCoinsIcon },
    { label: "Repayments", href: "/lender/repayments", icon: WalletIcon },
  ],
  manager: [
    { label: "Overview", href: "/manager", icon: LayoutDashboardIcon },
    { label: "Lenders", href: "/manager/lenders", icon: ShieldCheckIcon },
    { label: "Borrowers", href: "/manager/borrowers", icon: UsersIcon },
    { label: "Applications", href: "/manager/applications", icon: ClipboardListIcon },
    { label: "Audit Logs", href: "/manager/audit-logs", icon: ScrollTextIcon },
  ],
}

export const roleLabels: Record<UserRole, string> = {
  borrower: "Borrower",
  lender: "Lender",
  manager: "Manager",
}
