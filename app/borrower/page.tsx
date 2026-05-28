import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardShell } from "@/components/layout"
import { PageHeader, SectionCard, EmptyState } from "@/components/shared"
import { requireUser } from "@/lib/auth/require-user"
import { roleNavigation } from "@/lib/roles/navigation"
import { getBorrowerProfile } from "@/lib/borrower/profile"
import {
  Building2Icon,
  FileTextIcon,
  HandCoinsIcon,
  WalletIcon,
  ArrowRightIcon,
} from "lucide-react"

export default async function BorrowerPage() {
  const user = await requireUser()

  if (user.role !== "borrower") {
    redirect(`/${user.role}`)
  }

  const displayName = user.fullName || user.email.split("@")[0]
  const profile = await getBorrowerProfile()
  const isProfileComplete = profile?.profile_status === "complete"

  return (
    <DashboardShell user={user} navItems={roleNavigation.borrower}>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        description="Manage your business profile, loan applications, and repayment tracking."
      />

      {!isProfileComplete && (
        <div className="mt-6">
          <Card className="border-dashed">
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Complete your business profile</h3>
                  <Badge variant="secondary">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set up your business profile to start applying for loans from verified lenders.
                </p>
              </div>
              <Button size="sm" render={<Link href="/borrower/profile" />}>
                Get started
                <ArrowRightIcon />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <SectionCard title="Business Profile" description="Your business information and documents">
          <EmptyState
            title={isProfileComplete ? "Profile complete" : "No profile yet"}
            description={
              isProfileComplete
                ? "Your business profile is set up and ready for loan applications."
                : "Create your business profile to start applying for loans."
            }
            icon={Building2Icon}
            action={
              <Button size="sm" render={<Link href="/borrower/profile" />}>
                {isProfileComplete ? "View profile" : "Create profile"}
              </Button>
            }
          />
        </SectionCard>

        <SectionCard title="Loan Applications" description="Track your submitted applications">
          <EmptyState
            title="No applications"
            description="Submit your first loan application once your profile is complete."
            icon={FileTextIcon}
            action={
              isProfileComplete ? (
                <Button size="sm" render={<Link href="/borrower/applications/new" />}>
                  New application
                </Button>
              ) : (
                <Button disabled size="sm">New application</Button>
              )
            }
          />
        </SectionCard>

        <SectionCard title="Offers" description="Offers from verified lenders">
          <EmptyState
            title="No offers received"
            description="Offers from verified lenders will appear here once you submit an application."
            icon={HandCoinsIcon}
          />
        </SectionCard>

        <SectionCard title="Repayment" description="Loan repayment tracking">
          <EmptyState
            title="No active loans"
            description="Track your repayment progress and upload payment proof here."
            icon={WalletIcon}
          />
        </SectionCard>
      </div>
    </DashboardShell>
  )
}
