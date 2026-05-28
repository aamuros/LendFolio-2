import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export function SectionCard({ title, description, children, className, headerAction }: SectionCardProps) {
  return (
    <Card className={cn("", className)}>
      {(title || description || headerAction) && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
