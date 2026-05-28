"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/require-user"
import {
  borrowerProfileSchema,
  computeProfileStatus,
  parseNumericField,
  type BorrowerProfileInput,
} from "@/lib/validation/borrower-profile"

export type BorrowerProfileData = {
  id: string
  business_name: string
  business_type: string
  business_description: string
  business_address: string
  city: string
  province: string
  years_operating: number | null
  monthly_revenue: number | null
  monthly_expenses: number | null
  existing_debt: number | null
  requested_loan_purpose: string
  profile_status: "incomplete" | "complete" | "needs_review"
  created_at: string
  updated_at: string
}

export type ProfileActionResult = {
  success: boolean
  error?: string
}

export async function getBorrowerProfile(): Promise<BorrowerProfileData | null> {
  const user = await requireUser()

  if (user.role !== "borrower") {
    return null
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("borrower_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (error || !data) {
    return null
  }

  return data as BorrowerProfileData
}

export async function saveBorrowerProfile(
  input: BorrowerProfileInput
): Promise<ProfileActionResult> {
  const user = await requireUser()

  if (user.role !== "borrower") {
    return { success: false, error: "Only borrowers can create a business profile." }
  }

  const parsed = borrowerProfileSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form for errors and try again.",
    }
  }

  const data = parsed.data
  const years = parseNumericField(data.years_operating)
  const revenue = parseNumericField(data.monthly_revenue)
  const expenses = parseNumericField(data.monthly_expenses)
  const debt = parseNumericField(data.existing_debt)

  if (years === null || revenue === null || expenses === null) {
    return {
      success: false,
      error: "Please enter valid numbers for financial fields.",
    }
  }

  const status = computeProfileStatus({
    ...data,
    years_operating: years,
    monthly_revenue: revenue,
    monthly_expenses: expenses,
  })

  const profileData = {
    business_name: data.business_name,
    business_type: data.business_type,
    business_description: data.business_description,
    business_address: data.business_address,
    city: data.city,
    province: data.province,
    years_operating: years,
    monthly_revenue: revenue,
    monthly_expenses: expenses,
    existing_debt: debt,
    requested_loan_purpose: data.requested_loan_purpose,
    profile_status: status,
  }

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from("borrower_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("borrower_profiles")
      .update(profileData)
      .eq("id", existing.id)

    if (error) {
      return { success: false, error: "Failed to update your profile. Please try again." }
    }
  } else {
    const { error } = await supabase
      .from("borrower_profiles")
      .insert({ ...profileData, user_id: user.id })

    if (error) {
      return { success: false, error: "Failed to create your profile. Please try again." }
    }
  }

  revalidatePath("/borrower/profile")
  revalidatePath("/borrower")
  return { success: true }
}
