"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  loanApplicationSchema,
  preferredTerms,
  type LoanApplicationInput,
} from "@/lib/validation/loan-application"
import { createLoanApplication } from "@/lib/borrower/applications"

const defaultValues: LoanApplicationInput = {
  requested_amount: "",
  loan_purpose: "",
  preferred_term_months: "",
  repayment_plan: "",
  borrower_notes: "",
}

export function ApplicationForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<LoanApplicationInput>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues,
  })

  async function onSubmit(data: LoanApplicationInput) {
    setServerError(null)

    const result = await createLoanApplication(data)

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.")
      return
    }

    toast.success("Application submitted", {
      description: "Your loan application has been submitted successfully.",
    })

    router.push("/borrower/applications")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Loan Details</h3>
            <p className="text-sm text-muted-foreground">
              Specify the loan amount, term, and purpose for your application.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="requested_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Amount (PHP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 100000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_term_months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Term</FormLabel>
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {preferredTerms.map((term) => (
                        <SelectItem key={term.value} value={term.value}>
                          {term.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="loan_purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Purpose</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe how you plan to use the loan funds (e.g. purchase inventory, expand to a new location, buy equipment)."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repayment_plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repayment Plan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain how you plan to repay the loan (e.g. monthly revenue from sales, seasonal income from harvest)."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Additional Notes</h3>
            <p className="text-sm text-muted-foreground">
              Any additional information you would like lenders to know.
            </p>
          </div>

          <FormField
            control={form.control}
            name="borrower_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional context or information for lenders reviewing your application."
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Application will be submitted with your current business profile.
          </p>
          <div className="flex items-center gap-2">
            <Button
              nativeButton={false}
              type="button"
              variant="outline"
              render={<Link href="/borrower/applications" />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
