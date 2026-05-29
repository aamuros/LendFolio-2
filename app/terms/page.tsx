import type { Metadata } from "next"
import { DashboardShell, PageHeader, SectionCard } from "@/components/layout"

export const metadata: Metadata = {
  title: "Terms of Service | LendFolio",
  description: "LendFolio terms of service - rules and guidelines for using the platform.",
}

export default function TermsPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using LendFolio."
      />

      <div className="mt-6">
        <SectionCard>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground">
              These Terms of Service govern your use of LendFolio, a financing
              workflow platform for Filipino micro-entrepreneurs, verified
              lenders, and platform managers.
            </p>

            <h3 className="mt-6 text-lg font-semibold">1. Acceptance of Terms</h3>
            <p className="text-muted-foreground">
              By accessing or using LendFolio, you agree to be bound by these
              terms. If you do not agree, do not use the platform.
            </p>

            <h3 className="mt-6 text-lg font-semibold">2. Eligibility</h3>
            <p className="text-muted-foreground">
              You must be at least 18 years old and a resident of the Philippines
              to use LendFolio. Lenders must be approved by a platform manager
              before they can send offers.
            </p>

            <h3 className="mt-6 text-lg font-semibold">3. User Responsibilities</h3>
            <p className="text-muted-foreground">
              You are responsible for the accuracy of all information you provide.
              Misrepresentation may result in account suspension or removal.
            </p>

            <h3 className="mt-6 text-lg font-semibold">4. Platform Role</h3>
            <p className="text-muted-foreground">
              LendFolio facilitates connections between borrowers and lenders. We
              do not guarantee loan approval, offer terms, or repayment. All
              lending decisions are made between users.
            </p>

            <h3 className="mt-6 text-lg font-semibold">5. Changes</h3>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of the
              platform constitutes acceptance of the updated terms.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Last updated: Placeholder — terms will be finalized before public
              launch.
            </p>
          </div>
        </SectionCard>
      </div>
    </DashboardShell>
  )
}
