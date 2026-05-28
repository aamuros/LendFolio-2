import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusVariant = "default" | "secondary" | "destructive" | "outline"

const statusMap: Record<string, StatusVariant> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  active: "default",
  completed: "default",
  overdue: "destructive",
  draft: "secondary",
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusMap[status.toLowerCase()] ?? "secondary"

  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {status}
    </Badge>
  )
}
