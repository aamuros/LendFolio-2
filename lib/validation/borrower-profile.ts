import { z } from "zod"

export const requiredBorrowerProfileFields = [
  "business_name",
  "business_type",
  "business_description",
  "business_address",
  "city",
  "province",
  "years_operating",
  "monthly_revenue",
  "monthly_expenses",
  "requested_loan_purpose",
] as const

export type RequiredBorrowerProfileField =
  (typeof requiredBorrowerProfileFields)[number]

export const borrowerProfileFieldLabels: Record<
  RequiredBorrowerProfileField,
  string
> = {
  business_name: "Business name",
  business_type: "Business type",
  business_description: "Business description",
  business_address: "Business address",
  city: "City or municipality",
  province: "Province",
  years_operating: "Years in operation",
  monthly_revenue: "Monthly revenue",
  monthly_expenses: "Monthly expenses",
  requested_loan_purpose: "Loan purpose",
}

function isNonNegativeNumber(value: string): boolean {
  if (value.trim() === "") return false

  const num = Number(value)
  return Number.isFinite(num) && num >= 0
}

export const borrowerProfileSchema = z.object({
  business_name: z.string().trim().min(1, "Business name is required"),
  business_type: z.string().trim().min(1, "Business type is required"),
  business_description: z
    .string()
    .trim()
    .min(1, "Business description is required")
    .min(10, "Please provide a more detailed description"),
  business_address: z.string().trim().min(1, "Business address is required"),
  city: z.string().trim().min(1, "City is required"),
  province: z.string().trim().min(1, "Province is required"),
  years_operating: z
    .string()
    .trim()
    .min(1, "Years operating is required")
    .refine(isNonNegativeNumber, "Years operating must be 0 or greater"),
  monthly_revenue: z
    .string()
    .trim()
    .min(1, "Monthly revenue is required")
    .refine(isNonNegativeNumber, "Monthly revenue must be 0 or greater"),
  monthly_expenses: z
    .string()
    .trim()
    .min(1, "Monthly expenses is required")
    .refine(isNonNegativeNumber, "Monthly expenses must be 0 or greater"),
  existing_debt: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => value === undefined || value === "" || isNonNegativeNumber(value),
      "Existing debt must be 0 or greater"
    ),
  requested_loan_purpose: z.string().trim().min(1, "Loan purpose is required"),
})

export type BorrowerProfileInput = z.infer<typeof borrowerProfileSchema>

export const businessTypes = [
  { value: "sari-sari", label: "Sari-Sari Store" },
  { value: "food", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
  { value: "agriculture", label: "Agriculture" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "transportation", label: "Transportation" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other" },
] as const

export const provinces = [
  "Metro Manila",
  "Cebu",
  "Davao del Sur",
  "Bulacan",
  "Laguna",
  "Cavite",
  "Rizal",
  "Pampanga",
  "Batangas",
  "Pangasinan",
  "Iloilo",
  "Negros Occidental",
  "Zambales",
  "Tarlac",
  "Quezon",
  "Other",
] as const

export function computeProfileStatus(
  data: Record<string, unknown>
): "incomplete" | "complete" {
  return getMissingBorrowerProfileFields(data).length === 0
    ? "complete"
    : "incomplete"
}

export function getMissingBorrowerProfileFields(
  data: Record<string, unknown> | null | undefined
): RequiredBorrowerProfileField[] {
  if (!data) return [...requiredBorrowerProfileFields]

  const missing: RequiredBorrowerProfileField[] = []

  for (const field of requiredBorrowerProfileFields) {
    const value = data[field]

    if (typeof value === "string") {
      const trimmed = value.trim()
      if (trimmed === "" || (field === "business_description" && trimmed.length < 10)) {
        missing.push(field)
      }
      continue
    }

    if (
      field === "years_operating" ||
      field === "monthly_revenue" ||
      field === "monthly_expenses"
    ) {
      if (
        typeof value !== "number" ||
        !Number.isFinite(value) ||
        value < 0
      ) {
        missing.push(field)
      }
      continue
    }

    if (value === null || value === undefined) {
      missing.push(field)
    }
  }

  return missing
}

export function parseNumericField(value: string | undefined): number | null {
  if (!value || value.trim() === "") return null
  const num = Number(value)
  if (!Number.isFinite(num) || num < 0) return null
  return num
}
