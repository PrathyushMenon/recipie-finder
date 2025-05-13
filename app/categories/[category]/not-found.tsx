import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sorry, we couldn't find any recipes in this category or with your current diet filter.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/categories">Browse Categories</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
