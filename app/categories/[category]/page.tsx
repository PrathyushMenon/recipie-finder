import { PageTransition } from "@/components/page-transition"
import { getRecipesByCategory, getMockRecipes } from "@/lib/api"
import { RecipeCard } from "@/components/recipe-card"
import { cookies } from "next/headers"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Format the category name for display
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Get diet preference from cookie if available
  const cookieStore = cookies()
  const dietPreference = cookieStore.get("diet-preference")?.value || "all"

  // Fetch recipes for this category
  let recipes = []
  let isUsingMockData = false

  try {
    recipes = await getRecipesByCategory(categoryName, 12, dietPreference)

    // If no recipes found, use mock data
    if (!recipes || recipes.length === 0) {
      recipes = getMockRecipes(categoryName)
      isUsingMockData = true

      // Filter mock recipes based on diet preference
      if (dietPreference === "vegetarian") {
        recipes = recipes.filter((recipe) => recipe.vegetarian)
      } else if (dietPreference === "non-vegetarian") {
        recipes = recipes.filter((recipe) => !recipe.vegetarian)
      }
    }
  } catch (error) {
    console.error(`Error fetching recipes for category ${categoryName}:`, error)
    recipes = getMockRecipes(categoryName)
    isUsingMockData = true

    // Filter mock recipes based on diet preference
    if (dietPreference === "vegetarian") {
      recipes = recipes.filter((recipe) => recipe.vegetarian)
    } else if (dietPreference === "non-vegetarian") {
      recipes = recipes.filter((recipe) => !recipe.vegetarian)
    }
  }

  // If still no recipes, show empty state
  if (recipes.length === 0) {
    return (
      <PageTransition>
        <main className="container mx-auto px-4 py-8">
          <Link href="/categories" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to categories
          </Link>

          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl font-bold mb-4">{categoryName} Recipes</h1>
            <p className="text-lg text-muted-foreground">
              No {dietPreference !== "all" ? dietPreference + " " : ""}recipes found in this category.
            </p>
          </div>

          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">Try a different category or change your diet filter.</p>
          </div>
        </main>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <Link href="/categories" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to categories
        </Link>

        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4">{categoryName} Recipes</h1>
          <p className="text-lg text-muted-foreground">
            Discover delicious {categoryName.toLowerCase()} recipes
            {dietPreference !== "all" && ` (${dietPreference} only)`}
          </p>
        </div>

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
      </main>
    </PageTransition>
  )
}
