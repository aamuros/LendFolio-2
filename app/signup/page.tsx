import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-8" })}
      >
        ← Back to home
      </Link>
      <SignupForm />
    </div>
  )
}
