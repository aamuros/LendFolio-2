import { createClient } from "@/lib/supabase/server"
import type { UserRole } from "@/lib/roles/types"

export type CurrentUser = {
  id: string
  email: string
  fullName: string
  role: UserRole
  status: "active" | "suspended"
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, status")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return null
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role as UserRole,
    status: profile.status as "active" | "suspended",
  }
}
