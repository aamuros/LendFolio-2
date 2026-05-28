import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ApplicationStatus = "draft" | "submitted" | "withdrawn" | "accepted" | "declined"

const statusConfig: Record<ApplicationStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Draft", variant: "secondary" },
  submitted: { label: "Submitted", variant: "default" },
  withdrawn: { label: "Withdrawn", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  declined: { label: "Declined", variant: "destructive" },
}

interface ApplicationStatusBadgeProps {
  status: string
  className?: string
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const config = statusConfig[status as ApplicationStatus] ?? {
    label: status,
    variant: "secondary" as const,
  }

  return (
    <Badge variant={config.variant} className={cn("capitalize", className)}>
      {config.label}
    </Badge>
  )
}
