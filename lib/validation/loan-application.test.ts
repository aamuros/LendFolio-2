import { describe, it, expect } from "vitest"
import {
  loanApplicationSchema,
  parseAmount,
  parseTermValue,
  validTermValues,
} from "./loan-application"

describe("loanApplicationSchema", () => {
  const validInput = {
    requested_amount: "100000",
    loan_purpose: "Purchase new inventory for the store expansion",
    preferred_term_months: "6",
    repayment_plan: "Monthly payments from daily sales revenue over the loan term",
  }

  it("accepts valid input", () => {
    const result = loanApplicationSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it("rejects empty requested_amount", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      requested_amount: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects zero requested_amount", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      requested_amount: "0",
    })
    expect(result.success).toBe(false)
  })

  it("rejects negative requested_amount", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      requested_amount: "-500",
    })
    expect(result.success).toBe(false)
  })

  it("rejects non-numeric requested_amount", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      requested_amount: "abc",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty loan_purpose", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      loan_purpose: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects short loan_purpose", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      loan_purpose: "Short",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty preferred_term_months", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      preferred_term_months: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects unsupported preferred_term_months", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      preferred_term_months: "24",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty repayment_plan", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      repayment_plan: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects short repayment_plan", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      repayment_plan: "Short",
    })
    expect(result.success).toBe(false)
  })

  it("accepts optional borrower_notes", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      borrower_notes: "Some additional notes",
    })
    expect(result.success).toBe(true)
  })

  it("accepts empty borrower_notes", () => {
    const result = loanApplicationSchema.safeParse({
      ...validInput,
      borrower_notes: "",
    })
    expect(result.success).toBe(true)
  })

  it("accepts missing borrower_notes", () => {
    const result = loanApplicationSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })
})

describe("parseAmount", () => {
  it("parses valid positive number", () => {
    expect(parseAmount("100000")).toBe(100000)
  })

  it("parses decimal amount", () => {
    expect(parseAmount("50000.50")).toBe(50000.5)
  })

  it("returns null for zero", () => {
    expect(parseAmount("0")).toBeNull()
  })

  it("returns null for negative", () => {
    expect(parseAmount("-100")).toBeNull()
  })

  it("returns null for non-numeric", () => {
    expect(parseAmount("abc")).toBeNull()
  })

  it("returns null for empty string", () => {
    expect(parseAmount("")).toBeNull()
  })
})

describe("parseTermValue", () => {
  it.each(validTermValues)("parses valid term %d", (term) => {
    expect(parseTermValue(String(term))).toBe(term)
  })

  it("returns null for invalid term", () => {
    expect(parseTermValue("2")).toBeNull()
    expect(parseTermValue("24")).toBeNull()
    expect(parseTermValue("0")).toBeNull()
  })

  it("returns null for non-numeric", () => {
    expect(parseTermValue("abc")).toBeNull()
  })

  it("returns null for empty string", () => {
    expect(parseTermValue("")).toBeNull()
  })
})
