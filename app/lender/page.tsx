import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell } from "@/components/layout"
import { PageHeader, SectionCard, EmptyState, StatusBadge } from "@/components/shared"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import {
  FileTextIcon,
  HandCoinsIcon,
  WalletIcon,
  BarChart3Icon,
} from "lucide-react"

export default async function LenderPage() {
  const user = await requireUser()

  if (user.role !== "lender") {
    redirect(`/${user.role}`)
  }

  const displayName = user.fullName || user.email.split("@")[0]

  return (
    <DashboardShell user={user} navItems={roleNavigation.lender}>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        description="Review borrower applications, send offers, and verify repayments."
      />

      <div className="mt-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Verification status</h3>
                <StatusBadge status="pending" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your lender account is pending verification. You&apos;ll be able to browse borrower applications once approved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <SectionCard title="Borrower Applications" description="Loan requests awaiting review">
          <EmptyState
            title="No applications available"
            description="Borrower loan applications pending review will appear here."
            icon={FileTextIcon}
          />
        </SectionCard>

        <SectionCard title="Your Offers" description="Track offers sent to borrowers">
          <EmptyState
            title="No offers sent"
            description="Offers you send to borrowers will be tracked here."
            icon={HandCoinsIcon}
            action={<Button disabled size="sm">Browse applications</Button>}
          />
        </SectionCard>

        <SectionCard title="Repayment Verification" description="Review borrower payment proof">
          <EmptyState
            title="Nothing to verify"
            description="Repayment proof submitted by borrowers will appear here for your review."
            icon={WalletIcon}
          />
        </SectionCard>

        <SectionCard title="Lending Summary" description="Your lending performance overview">
          <EmptyState
            title="No activity yet"
            description="Your lending statistics and portfolio performance will appear here."
            icon={BarChart3Icon}
          />
        </SectionCard>
      </div>
    </DashboardShell>
  )
}
