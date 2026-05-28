import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import HomePage from "./page"

function renderHomePage() {
  return render(<HomePage />)
}

describe("Landing Page", () => {
  describe("branding", () => {
    it("renders the LendFolio brand", () => {
      renderHomePage()
      const brand = screen.getAllByText("LendFolio")
      expect(brand.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("navigation", () => {
    it("renders login links pointing to /login", () => {
      renderHomePage()
      const loginLinks = screen.getAllByRole("link", { name: /log in/i })
      expect(loginLinks.length).toBeGreaterThanOrEqual(1)
      loginLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", "/login")
      })
    })

    it("renders signup link pointing to /signup", () => {
      renderHomePage()
      const signupLinks = screen.getAllByRole("link", { name: /sign up/i })
      expect(signupLinks.length).toBeGreaterThanOrEqual(1)
      expect(signupLinks[0]).toHaveAttribute("href", "/signup")
    })
  })

  describe("hero", () => {
    it("renders a single h1 heading", () => {
      renderHomePage()
      const headings = screen.getAllByRole("heading", { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it("renders the hero CTA 'Get started' linking to /signup", () => {
      renderHomePage()
      const cta = screen.getByRole("link", { name: /get started/i })
      expect(cta).toHaveAttribute("href", "/signup")
    })
  })

  describe("role cards", () => {
    it("renders the Borrower role card", () => {
      renderHomePage()
      expect(screen.getByText("Borrowers")).toBeDefined()
    })

    it("renders the Lender role card", () => {
      renderHomePage()
      expect(screen.getByText("Lenders")).toBeDefined()
    })

    it("renders the Manager role card", () => {
      renderHomePage()
      expect(screen.getByText("Managers")).toBeDefined()
    })

    it("renders 'Learn more' links for each role", () => {
      renderHomePage()
      const learnMoreLinks = screen.getAllByRole("link", { name: /learn more/i })
      expect(learnMoreLinks).toHaveLength(3)
    })

    it("links role cards to correct routes", () => {
      renderHomePage()
      const learnMoreLinks = screen.getAllByRole("link", { name: /learn more/i })
      expect(learnMoreLinks[0]).toHaveAttribute("href", "/borrower")
      expect(learnMoreLinks[1]).toHaveAttribute("href", "/lender")
      expect(learnMoreLinks[2]).toHaveAttribute("href", "/manager")
    })
  })

  describe("semantic structure", () => {
    it("uses semantic header landmark", () => {
      const { container } = renderHomePage()
      expect(container.querySelector("header")).not.toBeNull()
    })

    it("uses semantic main landmark", () => {
      const { container } = renderHomePage()
      expect(container.querySelector("main")).not.toBeNull()
    })

    it("uses section elements", () => {
      const { container } = renderHomePage()
      const sections = container.querySelectorAll("section")
      expect(sections.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe("footer", () => {
    it("renders copyright text", () => {
      renderHomePage()
      expect(screen.getByText(/© \d{4} LendFolio/)).toBeDefined()
    })

    it("renders Terms link pointing to /terms", () => {
      renderHomePage()
      const terms = screen.getByRole("link", { name: /terms/i })
      expect(terms).toHaveAttribute("href", "/terms")
    })

    it("renders Privacy link pointing to /privacy", () => {
      renderHomePage()
      const privacy = screen.getByRole("link", { name: /privacy/i })
      expect(privacy).toHaveAttribute("href", "/privacy")
    })
  })
})