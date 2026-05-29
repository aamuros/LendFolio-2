import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/layout"
import { PageHeader, EmptyState } from "@/components/shared"
import { SectionCard } from "@/components/layout/section-card"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import { getBorrowerApplications } from "@/lib/borrower/applications"
import { ApplicationsTable } from "@/components/borrower/applications-table"
import { FileTextIcon, PlusIcon } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Loan Applications | LendFolio",
  description: "Track and manage your loan applications.",
}

export default async function BorrowerApplicationsPage() {
  const user = await requireUser()

  if (user.role !== "borrower") {
    redirect(`/${user.role}`)
  }

  return (
    <DashboardShell user={user} navItems={roleNavigation.borrower}>
      <PageHeader
        title="Loan Applications"
        description="Track and manage your loan applications."
      >
        <Button render={<Link href="/borrower/applications/new" />}>
          <PlusIcon />
          New application
        </Button>
      </PageHeader>

      <div className="mt-6">
        <SectionCard>
          <Suspense fallback={<ApplicationsTableSkeleton />}>
            <ApplicationsListLoader />
          </Suspense>
        </SectionCard>
      </div>
    </DashboardShell>
  )
}

async function ApplicationsListLoader() {
  const applications = await getBorrowerApplications()

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Submit your first loan application to get started. You'll need a complete business profile first."
        icon={FileTextIcon}
        action={
          <Button render={<Link href="/borrower/applications/new" />}>
            <PlusIcon />
            New application
          </Button>
        }
      />
    )
  }

  return <ApplicationsTable applications={applications} />
}

function ApplicationsTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  )
}
