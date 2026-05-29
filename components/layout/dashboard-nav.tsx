"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2Icon,
  FileTextIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  MenuIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { NavIcon, NavItem } from "@/lib/roles/navigation"

const navIcons: Record<NavIcon, React.ComponentType<{ className?: string }>> = {
  applications: FileTextIcon,
  auditLogs: ScrollTextIcon,
  borrowers: UsersIcon,
  businessProfile: Building2Icon,
  lenders: ShieldCheckIcon,
  loans: WalletIcon,
  offers: HandCoinsIcon,
  overview: LayoutDashboardIcon,
  repayments: WalletIcon,
}

interface DashboardNavProps {
  items: NavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string) {
    if (href === items[0]?.href) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex">
        {items.map((item) => {
          const Icon = navIcons[item.icon]

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive(item.href)
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon-sm" className="md:hidden" />
          }
        >
          <MenuIcon />
          <span className="sr-only">Open navigation</span>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {items.map((item) => {
              const Icon = navIcons[item.icon]

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
