import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Skeleton className="mb-8 h-8 w-28" />
      <div className="w-full max-w-sm rounded-lg border p-6 space-y-6">
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-7 w-32" />
          <Skeleton className="mx-auto h-4 w-48" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="mx-auto h-4 w-36" />
      </div>
    </div>
  )
}
