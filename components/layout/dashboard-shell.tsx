import Link from "next/link"
import { cn } from "@/lib/utils"
import { DashboardNav } from "./dashboard-nav"
import { UserMenu } from "./user-menu"
import { Button } from "@/components/ui/button"
import type { NavItem } from "@/lib/roles/navigation"
import type { UserRole } from "@/lib/roles/types"

interface DashboardShellProps {
  children: React.ReactNode
  user?: {
    email: string
    fullName: string
    role: UserRole
  }
  navItems?: NavItem[]
  className?: string
}

export function DashboardShell({
  children,
  user,
  navItems,
  className,
}: DashboardShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-14 max-w-screen-2xl items-center gap-4 px-4">
          <Link
            href={user ? `/${user.role}` : "/"}
            className="mr-2 flex shrink-0 items-center font-semibold"
          >
            LendFolio
          </Link>
          {user && navItems && <DashboardNav items={navItems} />}
          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button variant="ghost" size="sm" render={<Link href="/login" />}>
                  Log in
                </Button>
                <Button size="sm" render={<Link href="/signup" />}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className={cn("container flex-1 px-4 py-6", className)}>
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LendFolio</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
