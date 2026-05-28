"use client"

import * as React from "react"
import { LandmarkIcon, HandCoinsIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type RoleOptionCardProps = {
  role: "borrower" | "lender"
  selected: boolean
  onSelect: () => void
}

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

export function RoleOptionCard({ role, selected, onSelect }: RoleOptionCardProps) {
  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-card"
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckIcon className="size-3" />
        </span>
      )}
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-lg",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{config.title}</p>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </button>
  )
}
