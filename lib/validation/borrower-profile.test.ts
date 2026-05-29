import { describe, expect, it } from "vitest"
import {
  borrowerProfileSchema,
  computeProfileStatus,
  getMissingBorrowerProfileFields,
  parseNumericField,
} from "./borrower-profile"

describe("borrowerProfileSchema", () => {
  const validInput = {
    business_name: "Maria's Sari-Sari Store",
    business_type: "sari-sari",
    business_description: "A neighborhood store selling daily essentials.",
    business_address: "123 Rizal Street",
    city: "Quezon City",
    province: "Metro Manila",
    years_operating: "3",
    monthly_revenue: "100000",
    monthly_expenses: "75000",
    existing_debt: "",
    requested_loan_purpose: "Buy additional inventory for peak season",
  }

  it("accepts valid input", () => {
    expect(borrowerProfileSchema.safeParse(validInput).success).toBe(true)
  })

  it("rejects empty business_name", () => {
    const result = borrowerProfileSchema.safeParse({
      ...validInput,
      business_name: " ",
    })

    expect(result.success).toBe(false)
  })

  it("rejects one or two character business descriptions", () => {
    const result = borrowerProfileSchema.safeParse({
      ...validInput,
      business_description: "ok",
    })

    expect(result.success).toBe(false)
  })

  it("accepts zero values for required numeric fields", () => {
    const result = borrowerProfileSchema.safeParse({
      ...validInput,
      years_operating: "0",
      monthly_revenue: "0",
      monthly_expenses: "0",
    })

    expect(result.success).toBe(true)
  })

  it("rejects negative required numeric fields", () => {
    const result = borrowerProfileSchema.safeParse({
      ...validInput,
      monthly_revenue: "-1",
    })

    expect(result.success).toBe(false)
  })

  it("rejects negative existing_debt when provided", () => {
    const result = borrowerProfileSchema.safeParse({
      ...validInput,
      existing_debt: "-1",
    })

    expect(result.success).toBe(false)
  })
})

describe("borrower profile readiness", () => {
  it("returns complete when required fields are valid", () => {
    expect(
      computeProfileStatus({
        business_name: "Maria's Sari-Sari Store",
        business_type: "sari-sari",
        business_description: "A neighborhood store selling daily essentials.",
        business_address: "123 Rizal Street",
        city: "Quezon City",
        province: "Metro Manila",
        years_operating: 0,
        monthly_revenue: 0,
        monthly_expenses: 0,
        requested_loan_purpose: "Buy additional inventory for peak season",
      })
    ).toBe("complete")
  })

  it("returns incomplete when required numbers are invalid", () => {
    expect(
      computeProfileStatus({
        business_name: "Maria's Sari-Sari Store",
        business_type: "sari-sari",
        business_description: "A neighborhood store selling daily essentials.",
        business_address: "123 Rizal Street",
        city: "Quezon City",
        province: "Metro Manila",
        years_operating: -1,
        monthly_revenue: 0,
        monthly_expenses: 0,
        requested_loan_purpose: "Buy additional inventory for peak season",
      })
    ).toBe("incomplete")
  })

  it("lists missing required fields", () => {
    expect(getMissingBorrowerProfileFields(null)).toContain("business_name")
  })
})

describe("parseNumericField", () => {
  it("parses zero and positive values", () => {
    expect(parseNumericField("0")).toBe(0)
    expect(parseNumericField("100.5")).toBe(100.5)
  })

  it("returns null for negative, non-numeric, or empty values", () => {
    expect(parseNumericField("-1")).toBeNull()
    expect(parseNumericField("abc")).toBeNull()
    expect(parseNumericField("")).toBeNull()
  })
})
