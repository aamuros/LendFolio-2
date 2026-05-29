import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusVariant = "default" | "secondary" | "destructive" | "outline"

const statusMap: Record<string, StatusVariant> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  active: "default",
  completed: "default",
  complete: "default",
  overdue: "destructive",
  draft: "secondary",
  incomplete: "secondary",
  needs_review: "outline",
  suspended: "destructive",
  verified: "default",
  unverified: "secondary",
  submitted: "default",
  withdrawn: "outline",
  accepted: "default",
  declined: "destructive",
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replaceAll(" ", "_")
  const variant = statusMap[normalizedStatus] ?? "secondary"
  const label = status.replaceAll("_", " ")

  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {label}
    </Badge>
  )
}
