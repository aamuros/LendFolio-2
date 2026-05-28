"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/require-user"
import {
  loanApplicationSchema,
  parseAmount,
  parseTermValue,
  type LoanApplicationInput,
} from "@/lib/validation/loan-application"

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
    .single()

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

  const profileSnapshot: Record<string, unknown> = {
    business_name: profile.business_name,
    business_type: profile.business_type,
    business_description: profile.business_description,
    business_address: profile.business_address,
    city: profile.city,
    province: profile.province,
    years_operating: profile.years_operating,
    monthly_revenue: profile.monthly_revenue,
    monthly_expenses: profile.monthly_expenses,
    existing_debt: profile.existing_debt,
    requested_loan_purpose: profile.requested_loan_purpose,
    profile_status: profile.profile_status,
  }

  const { data: application, error: insertError } = await supabase
    .from("loan_applications")
    .insert({
      borrower_id: user.id,
      borrower_profile_id: profile.id,
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
  return { success: true, id: application.id }
}
