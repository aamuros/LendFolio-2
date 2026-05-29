"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginSchema, type LoginInput } from "@/lib/validation/auth"
import { signIn } from "@/lib/auth/actions"
import { roleRoutes, type UserRole } from "@/lib/roles/types"

function getPostLoginDestination(role: UserRole) {
  const fallback = roleRoutes[role]

  if (typeof window === "undefined") {
    return fallback
  }

  const redirectTo = new URLSearchParams(window.location.search).get("redirect")

  if (!redirectTo) {
    return fallback
  }

  try {
    const url = new URL(redirectTo, window.location.origin)
    const isSameOrigin = url.origin === window.location.origin
    const isRoleRoute =
      url.pathname === fallback || url.pathname.startsWith(`${fallback}/`)

    if (isSameOrigin && isRoleRoute) {
      return `${url.pathname}${url.search}${url.hash}`
    }
  } catch {
    return fallback
  }

  return fallback
}

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginInput) {
    setServerError(null)

    const result = await signIn(data.email, data.password)

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.")
      return
    }

    const role = (result.role ?? "borrower") as UserRole

    toast.success("Welcome back!", {
      description: "You have been logged in successfully.",
    })

    window.location.replace(getPostLoginDestination(role))
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Log in to your LendFolio account</CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Logging in…
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-foreground">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
