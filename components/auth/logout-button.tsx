"use client"

import { useRouter } from "next/navigation"
import { Loader2Icon, LogOutIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth/actions"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsLoading(true)
    const result = await signOut()

    if (!result.success) {
      toast.error(result.error ?? "Failed to log out. Please try again.")
      setIsLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <LogOutIcon />
      )}
      Log out
    </Button>
  )
}
