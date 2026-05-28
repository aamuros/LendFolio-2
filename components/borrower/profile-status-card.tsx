import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Progress } from "@/components/ui/progress"
import type { BorrowerProfileData } from "@/lib/borrower/profile"

interface ProfileStatusCardProps {
  profile: BorrowerProfileData | null
}

const requiredFields = [
  "business_name",
  "business_type",
  "business_description",
  "business_address",
  "city",
  "province",
  "years_operating",
  "monthly_revenue",
  "monthly_expenses",
  "requested_loan_purpose",
] as const

function getCompletionPercentage(profile: BorrowerProfileData | null): number {
  if (!profile) return 0

  let filled = 0
  for (const field of requiredFields) {
    const value = profile[field]
    if (value !== null && value !== undefined && value !== "") {
      filled++
    }
  }

  return Math.round((filled / requiredFields.length) * 100)
}

function getMissingFields(profile: BorrowerProfileData | null): string[] {
  if (!profile) return requiredFields.map(formatFieldName)

  const missing: string[] = []
  for (const field of requiredFields) {
    const value = profile[field]
    if (value === null || value === undefined || value === "") {
      missing.push(formatFieldName(field))
    }
  }
  return missing
}

function formatFieldName(field: string): string {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function ProfileStatusCard({ profile }: ProfileStatusCardProps) {
  const percentage = getCompletionPercentage(profile)
  const missing = getMissingFields(profile)
  const status = profile?.profile_status ?? "incomplete"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Profile Completion</CardTitle>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} />
        </div>

        {missing.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Missing information</p>
            <ul className="text-sm text-muted-foreground space-y-0.5">
              {missing.map((field) => (
                <li key={field} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                  {field}
                </li>
              ))}
            </ul>
          </div>
        )}

        {percentage === 100 && (
          <p className="text-sm text-muted-foreground">
            Your business profile is complete. You can now apply for loans.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
