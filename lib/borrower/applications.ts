"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/require-user"
import {
  loanApplicationSchema,
  parseAmount,
  parseTermValue,
  type LoanApplicationInput,
} from "@/lib/validation/loan-application"
import type { BorrowerProfileData } from "@/lib/borrower/profile"

export type LoanApplicationData = {
  id: string
  borrower_id: string
  borrower_profile_id: string
  requested_amount: number
  loan_purpose: string
  preferred_term_months: number
  repayment_plan: string
  borrower_notes: string
  status: "draft" | "submitted" | "withdrawn" | "accepted" | "declined"
  profile_snapshot: Record<string, unknown> | null
  submitted_at: string
  created_at: string
  updated_at: string
}

export type ApplicationActionResult = {
  success: boolean
  error?: string
  id?: string
}

export async function getBorrowerApplications(): Promise<LoanApplicationData[]> {
  const user = await requireUser()

  if (user.role !== "borrower") {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("loan_applications")
    .select("*")
    .eq("borrower_id", user.id)
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return data as LoanApplicationData[]
}

export async function createLoanApplication(
  input: LoanApplicationInput
): Promise<ApplicationActionResult> {
  const user = await requireUser()

  if (user.role !== "borrower") {
    return { success: false, error: "Only borrowers can submit loan applications." }
  }

  const parsed = loanApplicationSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form for errors and try again.",
    }
  }

  const data = parsed.data
  const amount = parseAmount(data.requested_amount)
  const term = parseTermValue(data.preferred_term_months)

  if (amount === null) {
    return { success: false, error: "Please enter a valid amount greater than 0." }
  }

  if (term === null) {
    return { success: false, error: "Please select a valid loan term." }
  }

  const supabase = await createClient()

  const { data: profile, error: profileError } = await supabase
    .from("borrower_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (profileError || !profile) {
    return {
      success: false,
      error: "You need a business profile before applying for a loan.",
    }
  }

  if (profile.profile_status !== "complete") {
    return {
      success: false,
      error: "Your business profile must be complete before submitting an application.",
    }
  }

  const borrowerProfile = profile as BorrowerProfileData
  const profileSnapshot: Record<string, unknown> = {
    id: borrowerProfile.id,
    user_id: borrowerProfile.user_id,
    business_name: borrowerProfile.business_name,
    business_type: borrowerProfile.business_type,
    business_description: borrowerProfile.business_description,
    business_address: borrowerProfile.business_address,
    city: borrowerProfile.city,
    province: borrowerProfile.province,
    years_operating: borrowerProfile.years_operating,
    monthly_revenue: borrowerProfile.monthly_revenue,
    monthly_expenses: borrowerProfile.monthly_expenses,
    existing_debt: borrowerProfile.existing_debt,
    requested_loan_purpose: borrowerProfile.requested_loan_purpose,
    profile_status: borrowerProfile.profile_status,
    created_at: borrowerProfile.created_at,
    updated_at: borrowerProfile.updated_at,
  }

  const { data: application, error: insertError } = await supabase
    .from("loan_applications")
    .insert({
      borrower_id: user.id,
      borrower_profile_id: borrowerProfile.id,
      requested_amount: amount,
      loan_purpose: data.loan_purpose,
      preferred_term_months: term,
      repayment_plan: data.repayment_plan,
      borrower_notes: data.borrower_notes ?? "",
      status: "submitted",
      profile_snapshot: profileSnapshot,
    })
    .select("id")
    .single()

  if (insertError || !application) {
    return { success: false, error: "Failed to submit your application. Please try again." }
  }

  revalidatePath("/borrower/applications")
  revalidatePath("/borrower")
  revalidateTag("loan-applications", "max")
  return { success: true, id: application.id }
}
