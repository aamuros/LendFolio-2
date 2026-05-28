import { redirect } from "next/navigation"
import { getCurrentUser, type CurrentUser } from "./get-current-user"

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
