"use client"

import { useState, useEffect } from "react"
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
  borrowerProfileSchema,
  businessTypes,
  provinces,
  type BorrowerProfileInput,
} from "@/lib/validation/borrower-profile"
import {
  saveBorrowerProfile,
  type BorrowerProfileData,
} from "@/lib/borrower/profile"

interface BorrowerProfileFormProps {
  profile: BorrowerProfileData | null
}

const defaultValues: BorrowerProfileInput = {
  business_name: "",
  business_type: "",
  business_description: "",
  business_address: "",
  city: "",
  province: "",
  years_operating: "",
  monthly_revenue: "",
  monthly_expenses: "",
  existing_debt: "",
  requested_loan_purpose: "",
}

export function BorrowerProfileForm({ profile }: BorrowerProfileFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<BorrowerProfileInput>({
    resolver: zodResolver(borrowerProfileSchema),
    defaultValues,
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        business_name: profile.business_name ?? "",
        business_type: profile.business_type ?? "",
        business_description: profile.business_description ?? "",
        business_address: profile.business_address ?? "",
        city: profile.city ?? "",
        province: profile.province ?? "",
        years_operating:
          profile.years_operating !== null
            ? String(profile.years_operating)
            : "",
        monthly_revenue:
          profile.monthly_revenue !== null
            ? String(profile.monthly_revenue)
            : "",
        monthly_expenses:
          profile.monthly_expenses !== null
            ? String(profile.monthly_expenses)
            : "",
        existing_debt:
          profile.existing_debt !== null
            ? String(profile.existing_debt)
            : "",
        requested_loan_purpose: profile.requested_loan_purpose ?? "",
      })
    }
  }, [profile, form])

  async function onSubmit(data: BorrowerProfileInput) {
    setServerError(null)

    const result = await saveBorrowerProfile(data)

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.")
      return
    }

    toast.success("Profile saved", {
      description: "Your business profile has been updated successfully.",
    })
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
            <h3 className="text-lg font-medium">Business Information</h3>
            <p className="text-sm text-muted-foreground">
              Tell us about your business to help lenders understand your operations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Maria's Sari-Sari Store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
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
            name="business_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what your business does, your products or services, and your target customers."
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
            name="requested_loan_purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Purpose</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe how you plan to use the loan funds (e.g. inventory, equipment, expansion)."
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

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Business Location</h3>
            <p className="text-sm text-muted-foreground">
              Where is your business located?
            </p>
          </div>

          <FormField
            control={form.control}
            name="business_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 123 Rizal Street, Barangay San Isidro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City / Municipality</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Quezon City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Financial Details</h3>
            <p className="text-sm text-muted-foreground">
              Provide an overview of your business finances. This helps lenders assess your application.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="years_operating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years in Operation</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="existing_debt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Existing Debt (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 50000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="monthly_revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Revenue (PHP)</FormLabel>
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
              name="monthly_expenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses (PHP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 75000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {profile?.updated_at
              ? `Last updated ${new Date(profile.updated_at).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}`
              : "Not yet saved"}
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" />
                Saving…
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
