import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Progress } from "@/components/ui/progress"
import type { BorrowerProfileData } from "@/lib/borrower/profile"
import {
  borrowerProfileFieldLabels,
  getMissingBorrowerProfileFields,
} from "@/lib/validation/borrower-profile"

interface ProfileStatusCardProps {
  profile: BorrowerProfileData | null
}

function getCompletionPercentage(profile: BorrowerProfileData | null): number {
  const missing = getMissingBorrowerProfileFields(profile)
  const total = Object.keys(borrowerProfileFieldLabels).length
  return Math.round(((total - missing.length) / total) * 100)
}

function getMissingFields(profile: BorrowerProfileData | null): string[] {
  return getMissingBorrowerProfileFields(profile).map(
    (field) => borrowerProfileFieldLabels[field]
  )
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
