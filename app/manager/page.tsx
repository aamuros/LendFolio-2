import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell } from "@/components/layout"
import { PageHeader, SectionCard, EmptyState } from "@/components/shared"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import {
  ShieldCheckIcon,
  UsersIcon,
  ClipboardListIcon,
  ScrollTextIcon,
  TrendingUpIcon,
  UserCheckIcon,
  AlertTriangleIcon,
} from "lucide-react"

export default async function ManagerPage() {
  const user = await requireUser()

  if (user.role !== "manager") {
    redirect(`/${user.role}`)
  }

  const displayName = user.fullName || user.email.split("@")[0]

  return (
    <DashboardShell user={user} navItems={roleNavigation.manager}>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        description="Platform oversight: lender approvals, borrower verification, and activity monitoring."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUpIcon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-sm text-muted-foreground">Total applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <UserCheckIcon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-sm text-muted-foreground">Active lenders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <AlertTriangleIcon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-sm text-muted-foreground">Pending reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <SectionCard title="Lender Approvals" description="Review and approve lender applications">
          <EmptyState
            title="No pending approvals"
            description="Lender applications awaiting your review will appear here."
            icon={ShieldCheckIcon}
          />
        </SectionCard>

        <SectionCard title="Borrower Verification" description="Verify borrower identities and documents">
          <EmptyState
            title="No pending verifications"
            description="Borrower profiles awaiting verification will appear here."
            icon={UsersIcon}
          />
        </SectionCard>

        <SectionCard title="Application Monitoring" description="Overview of all loan applications">
          <EmptyState
            title="No applications"
            description="Platform-wide loan application activity will appear here."
            icon={ClipboardListIcon}
          />
        </SectionCard>

        <SectionCard title="Audit Logs" description="Platform activity and compliance tracking">
          <EmptyState
            title="No activity logged"
            description="System audit logs and activity records will appear here."
            icon={ScrollTextIcon}
          />
        </SectionCard>
      </div>
    </DashboardShell>
  )
}
