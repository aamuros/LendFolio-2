import { redirect } from "next/navigation"
import { type UserRole, roleRoutes } from "./types"

export function redirectByRole(role: UserRole): never {
  redirect(roleRoutes[role])
}
