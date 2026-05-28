import { z } from "zod"

export const borrowerProfileSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  business_type: z.string().min(1, "Business type is required"),
  business_description: z
    .string()
    .min(1, "Business description is required")
    .min(10, "Please provide a more detailed description"),
  business_address: z.string().min(1, "Business address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  years_operating: z.string().min(1, "Years operating is required"),
  monthly_revenue: z.string().min(1, "Monthly revenue is required"),
  monthly_expenses: z.string().min(1, "Monthly expenses is required"),
  existing_debt: z.string().optional(),
  requested_loan_purpose: z.string().min(1, "Loan purpose is required"),
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
  const requiredFields = [
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
  ]

  for (const field of requiredFields) {
    const value = data[field]
    if (value === null || value === undefined || value === "") {
      return "incomplete"
    }
  }

  return "complete"
}

export function parseNumericField(value: string | undefined): number | null {
  if (!value || value.trim() === "") return null
  const num = Number(value)
  if (isNaN(num) || num < 0) return null
  return num
}
