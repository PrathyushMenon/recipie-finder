import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { RecipeList, RecipeListSkeleton } from "@/components/recipe-list"
import { searchRecipesByIngredients } from "@/lib/actions"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-primary mb-3">Recipe Finder</h1>
            <p className="text-lg text-muted-foreground">
              Find delicious recipes with ingredients you already have at home
            </p>
          </div>

          <SearchForm searchAction={searchRecipesByIngredients} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Popular Recipes</h2>
          <Suspense fallback={<RecipeListSkeleton />}>
            <RecipeList />
          </Suspense>
        </section>
      </main>
    </PageTransition>
  )
}
