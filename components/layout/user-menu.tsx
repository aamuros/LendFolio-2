"use client"

import { useRouter } from "next/navigation"
import { Loader2Icon, LogOutIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/actions"
import type { UserRole } from "@/lib/roles/types"
import { roleLabels } from "@/lib/roles/navigation"

interface UserMenuProps {
  user: {
    email: string
    fullName: string
    role: UserRole
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsLoggingOut(true)
    const result = await signOut()

    if (!result.success) {
      toast.error(result.error ?? "Failed to log out. Please try again.")
      setIsLoggingOut(false)
      return
    }

    router.push("/login")
  }

  const displayName = user.fullName || user.email.split("@")[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" />}
      >
        <UserIcon />
        <span className="hidden sm:inline">{displayName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Badge variant="secondary" className="capitalize">
              {roleLabels[user.role]}
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <LogOutIcon />
          )}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
