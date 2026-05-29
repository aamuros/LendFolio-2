import { Skeleton } from "@/components/ui/skeleton"

export default function BorrowerLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-14 max-w-screen-2xl items-center gap-4 px-4">
          <Skeleton className="h-5 w-20" />
          <div className="hidden items-center gap-1 md:flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
          <div className="ml-auto">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>
      <main className="container flex-1 px-4 py-6">
        <div className="space-y-1">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 space-y-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-28" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
