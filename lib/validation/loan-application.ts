import { z } from "zod"

export const loanApplicationSchema = z.object({
  requested_amount: z
    .string()
    .min(1, "Requested amount is required")
    .refine(
      (val) => {
        const num = Number(val)
        return !isNaN(num) && num > 0
      },
      { message: "Amount must be greater than 0" }
    ),
  loan_purpose: z
    .string()
    .min(1, "Loan purpose is required")
    .min(10, "Please provide a more detailed loan purpose"),
  preferred_term_months: z.string().min(1, "Preferred term is required"),
  repayment_plan: z
    .string()
    .min(1, "Repayment plan is required")
    .min(10, "Please provide a more detailed repayment plan"),
  borrower_notes: z.string().optional(),
})

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>

export const preferredTerms = [
  { value: "1", label: "1 month" },
  { value: "3", label: "3 months" },
  { value: "6", term: "6 months", label: "6 months" },
  { value: "12", label: "12 months" },
] as const

export const validTermValues = [1, 3, 6, 12] as const

export function parseTermValue(value: string): number | null {
  const num = Number(value)
  if (isNaN(num)) return null
  if (!(validTermValues as readonly number[]).includes(num)) return null
  return num
}

export function parseAmount(value: string): number | null {
  const num = Number(value)
  if (isNaN(num) || num <= 0) return null
  return num
}
