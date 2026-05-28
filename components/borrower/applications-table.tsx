import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ApplicationStatusBadge } from "./application-status-badge"
import type { LoanApplicationData } from "@/lib/borrower/applications"

interface ApplicationsTableProps {
  applications: LoanApplicationData[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatTerm(months: number): string {
  if (months === 1) return "1 month"
  return `${months} months`
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">
              {formatDate(app.created_at)}
            </TableCell>
            <TableCell>{formatCurrency(app.requested_amount)}</TableCell>
            <TableCell>{formatTerm(app.preferred_term_months)}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {app.loan_purpose}
            </TableCell>
            <TableCell>
              <ApplicationStatusBadge status={app.status} />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" render={<Link href={`/borrower/applications/${app.id}`} />}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
