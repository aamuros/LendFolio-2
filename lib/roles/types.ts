export type UserRole = "borrower" | "lender" | "manager"

export const roleRoutes: Record<UserRole, string> = {
  borrower: "/borrower",
  lender: "/lender",
  manager: "/manager",
}
