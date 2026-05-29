"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { LandmarkIcon, HandCoinsIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type RoleOptionCardProps = {
  role: "borrower" | "lender"
} & Omit<Radio.Root.Props, "value">

const roleConfig = {
  borrower: {
    icon: LandmarkIcon,
    title: "Borrower",
    description: "Apply for loans, compare offers, and track repayments.",
  },
  lender: {
    icon: HandCoinsIcon,
    title: "Lender",
    description: "Review applications, send offers, and verify repayments.",
  },
} as const

export function RoleOptionCard({ role, className, ...props }: RoleOptionCardProps) {
  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <Radio.Root
      value={role}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all",
        "hover:border-primary/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "border-border bg-card",
        "data-[checked]:border-primary data-[checked]:bg-muted/50 data-[checked]:ring-1 data-[checked]:ring-primary",
        className
      )}
      {...props}
    >
      <Radio.Indicator
        className={cn(
          "absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
          "data-[unchecked]:hidden"
        )}
      >
        <CheckIcon className="size-3" />
      </Radio.Indicator>
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-lg",
          "bg-muted text-muted-foreground",
          "group-data-[checked]:bg-primary group-data-[checked]:text-primary-foreground"
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{config.title}</p>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </Radio.Root>
  )
}
