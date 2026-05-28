import { cn } from "@/lib/utils"
import { InboxIcon } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = InboxIcon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icon className="size-10 text-muted-foreground/50" />
        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  )
}
