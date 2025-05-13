import { getRandomRecipes, getMockRecipes } from "@/lib/api"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeCardSkeleton } from "@/components/recipe-card-skeleton"
import { cookies } from "next/headers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export async function RecipeList() {
  // Get diet preference from cookie if available
  const cookieStore = cookies()
  const dietPreference = cookieStore.get("diet-preference")?.value || "all"

  let recipes = []
  let isUsingMockData = false

  try {
    recipes = await getRandomRecipes(6, dietPreference)

    // If no recipes returned, use mock data
    if (!recipes || recipes.length === 0) {
      recipes = getMockRecipes(dietPreference)
      isUsingMockData = true
    }
  } catch (error) {
    console.error("Error in RecipeList:", error)
    recipes = getMockRecipes(dietPreference)
    isUsingMockData = true
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground">
          No recipes available at the moment. Try searching for specific ingredients.
        </p>
      </div>
    )
  }

  return (
    <>
      {isUsingMockData && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>API Issue Detected</AlertTitle>
          <AlertDescription>
            We're currently showing sample recipes due to an API issue. Please try again later for real-time data.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={index} />
        ))}
      </div>
    </>
  )
}

export function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}
