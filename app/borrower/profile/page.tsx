import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/layout"
import { PageHeader, SectionCard } from "@/components/shared"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import { getBorrowerProfile } from "@/lib/borrower/profile"
import { ProfileStatusCard } from "@/components/borrower/profile-status-card"
import { BorrowerProfileForm } from "@/components/borrower/borrower-profile-form"
import {
  borrowerProfileFieldLabels,
  getMissingBorrowerProfileFields,
} from "@/lib/validation/borrower-profile"
import { AlertTriangleIcon, InfoIcon } from "lucide-react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Business Profile | LendFolio",
  description: "Complete your business profile to start applying for loans from verified lenders.",
}

export default async function BorrowerProfilePage() {
  const user = await requireUser()

  if (user.role !== "borrower") {
    redirect(`/${user.role}`)
  }

  return (
    <DashboardShell user={user} navItems={roleNavigation.borrower}>
      <PageHeader
        title="Business Profile"
        description="Complete your business profile to start applying for loans from verified lenders."
      />

      <Suspense fallback={<ProfilePageSkeleton />}>
        <ProfileContent />
      </Suspense>
    </DashboardShell>
  )
}

async function ProfileContent() {
  const profile = await getBorrowerProfile()
  const missingFields = getMissingBorrowerProfileFields(profile)
  const hasMissingFields = missingFields.length > 0

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Alert>
          <InfoIcon />
          <AlertDescription>
            Lenders review your business profile to evaluate loan applications.
            A complete profile increases your chances of receiving competitive offers.
          </AlertDescription>
        </Alert>

        {hasMissingFields && (
          <Alert variant="destructive">
            <AlertTriangleIcon />
            <AlertDescription>
              Add the missing details before applying:{" "}
              {missingFields
                .map((field) => borrowerProfileFieldLabels[field].toLowerCase())
                .join(", ")}
              .
            </AlertDescription>
          </Alert>
        )}

        <SectionCard title="Business Details" description="Your business and financial information">
          <BorrowerProfileForm profile={profile} />
        </SectionCard>
      </div>

      <div className="space-y-6">
        <ProfileStatusCard profile={profile} />
      </div>
    </div>
  )
}

function ProfilePageSkeleton() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-16 w-full" />
        <div className="rounded-lg border p-6 space-y-6">
          <Skeleton className="h-6 w-40" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border p-6 space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
      </div>
    </div>
  )
}
