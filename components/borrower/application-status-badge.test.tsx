import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ApplicationStatusBadge } from "./application-status-badge"

describe("ApplicationStatusBadge", () => {
  it("renders submitted status", () => {
    render(<ApplicationStatusBadge status="submitted" />)
    expect(screen.getByText("Submitted")).toBeDefined()
  })

  it("renders draft status", () => {
    render(<ApplicationStatusBadge status="draft" />)
    expect(screen.getByText("Draft")).toBeDefined()
  })

  it("renders withdrawn status", () => {
    render(<ApplicationStatusBadge status="withdrawn" />)
    expect(screen.getByText("Withdrawn")).toBeDefined()
  })

  it("renders accepted status", () => {
    render(<ApplicationStatusBadge status="accepted" />)
    expect(screen.getByText("Accepted")).toBeDefined()
  })

  it("renders declined status", () => {
    render(<ApplicationStatusBadge status="declined" />)
    expect(screen.getByText("Declined")).toBeDefined()
  })

  it("renders unknown status as-is", () => {
    render(<ApplicationStatusBadge status="unknown" />)
    expect(screen.getByText("unknown")).toBeDefined()
  })
})