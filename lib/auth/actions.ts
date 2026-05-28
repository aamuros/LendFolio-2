"use server"

import { createClient } from "@/lib/supabase/server"
import { env } from "@/lib/supabase/env"
import type { UserRole } from "@/lib/roles/types"

export type AuthResult = {
  success: boolean
  error?: string
  role?: UserRole
}

function isSupabaseConfigured(): boolean {
  return env.SUPABASE_URL !== "" && env.SUPABASE_ANON_KEY !== ""
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Authentication is not configured. Please set up Supabase environment variables.",
    }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()

  return { success: true, role: (profile?.role as UserRole) ?? "borrower" }
}

export async function signUp(
  email: string,
  password: string,
  role: UserRole
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Authentication is not configured. Please set up Supabase environment variables.",
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return { success: true }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
