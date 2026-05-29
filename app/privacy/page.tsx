import type { Metadata } from "next"
import { DashboardShell, PageHeader, SectionCard } from "@/components/layout"

export const metadata: Metadata = {
  title: "Privacy Policy | LendFolio",
  description: "LendFolio privacy policy - how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Privacy Policy"
        description="How LendFolio collects, uses, and protects your information."
      />

      <div className="mt-6">
        <SectionCard>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground">
              Your privacy is important to us. This policy explains what data we
              collect and how we use it.
            </p>

            <h3 className="mt-6 text-lg font-semibold">1. Information We Collect</h3>
            <p className="text-muted-foreground">
              We collect information you provide directly, including your name,
              email address, business details, and loan application data. We also
              collect usage data such as pages visited and actions taken.
            </p>

            <h3 className="mt-6 text-lg font-semibold">2. How We Use Your Information</h3>
            <p className="text-muted-foreground">
              We use your information to operate the platform, match borrowers
              with lenders, verify identities, and communicate with you about
              your account.
            </p>

            <h3 className="mt-6 text-lg font-semibold">3. Data Sharing</h3>
            <p className="text-muted-foreground">
              We share borrower application data with verified lenders for the
              purpose of generating offers. We do not sell your personal data to
              third parties.
            </p>

            <h3 className="mt-6 text-lg font-semibold">4. Data Security</h3>
            <p className="text-muted-foreground">
              We use industry-standard security measures including encrypted
              storage and secure authentication to protect your data.
            </p>

            <h3 className="mt-6 text-lg font-semibold">5. Your Rights</h3>
            <p className="text-muted-foreground">
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting support.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Last updated: Placeholder — policy will be finalized before public
              launch.
            </p>
          </div>
        </SectionCard>
      </div>
    </DashboardShell>
  )
}
