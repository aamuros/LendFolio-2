import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const roles = [
  {
    title: "Borrowers",
    description:
      "Create a business profile, submit loan applications, compare structured offers from verified lenders, and track your repayment progress.",
    href: "/borrower",
  },
  {
    title: "Lenders",
    description:
      "Review borrower applications, send competitive offers, and verify repayment evidence with a streamlined workflow.",
    href: "/lender",
  },
  {
    title: "Managers",
    description:
      "Approve lenders, review borrower verification, and monitor platform activity to keep lending fair and transparent.",
    href: "/manager",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-zinc-950"
          >
            LendFolio
          </Link>
          <div className="ml-auto flex items-center gap-1.5">
            <Link
              href="/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ size: "sm" })}
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4 text-xs">
              Free-first micro-lending platform
            </Badge>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Connecting Filipino micro-entrepreneurs with verified lenders
            </h1>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-zinc-500 sm:text-[15px]">
              LendFolio streamlines the lending workflow — from application to
              repayment — so borrowers can access fair financing and lenders can
              deploy capital with confidence.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get started
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Log in
              </Link>
            </div>
          </div>
        </section>

        {/* Role cards */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-16">
            <div className="mb-8 text-center sm:mb-10">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                Built for every role
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Whether you borrow, lend, or manage — LendFolio has you covered.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {roles.map((role) => (
                <Card
                  key={role.title}
                  className="bg-white shadow-none ring-zinc-200"
                >
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <CardDescription className="text-[13px] leading-relaxed text-zinc-500">
                      {role.description}
                    </CardDescription>
                    <div className="mt-auto pt-4">
                      <Link
                        href={role.href}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        Learn more
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* MVP note */}
        <section className="border-t border-zinc-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-16 text-center">
            <Badge variant="outline" className="mb-4 text-xs">
              MVP
            </Badge>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              Free-first, open, and transparent
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
              LendFolio is built to be accessible. No hidden fees, no paywalls.
              The core lending workflow is free for all users during the MVP phase.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 sm:px-6 py-4 text-[13px] text-zinc-400 sm:flex-row">
          <p>&copy; 2026 LendFolio</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-zinc-950">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-zinc-950">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
