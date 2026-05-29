import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardShell } from "@/components/layout"
import { PageHeader, SectionCard } from "@/components/shared"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import { getBorrowerProfile } from "@/lib/borrower/profile"
import { ApplicationForm } from "@/components/borrower/application-form"
import { AlertTriangleIcon, ArrowRightIcon } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "New Loan Application | LendFolio",
  description: "Submit a new loan application to get offers from verified lenders.",
}

export default async function NewApplicationPage() {
  const user = await requireUser()

  if (user.role !== "borrower") {
    redirect(`/${user.role}`)
  }

  return (
    <DashboardShell user={user} navItems={roleNavigation.borrower}>
      <PageHeader
        title="New Loan Application"
        description="Complete the form below to submit a new loan application."
      />

      <div className="mt-6">
        <Suspense fallback={<ApplicationFormSkeleton />}>
          <ApplicationFormLoader />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

async function ApplicationFormLoader() {
  const profile = await getBorrowerProfile()

  if (!profile) {
    return (
      <SectionCard>
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangleIcon />
            <AlertDescription>
              You need to create a business profile before you can apply for a loan.
            </AlertDescription>
          </Alert>
          <Button render={<Link href="/borrower/profile" />}>
            Create business profile
            <ArrowRightIcon />
          </Button>
        </div>
      </SectionCard>
    )
  }

  if (profile.profile_status !== "complete") {
    return (
      <SectionCard>
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangleIcon />
            <AlertDescription>
              Your business profile is incomplete. Please complete all required fields before submitting a loan application.
            </AlertDescription>
          </Alert>
          <Button render={<Link href="/borrower/profile" />}>
            Complete business profile
            <ArrowRightIcon />
          </Button>
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard
      title="Application Details"
      description="Provide the details for your loan request. Your current business profile will be attached automatically."
    >
      <ApplicationForm />
    </SectionCard>
  )
}

function ApplicationFormSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}
