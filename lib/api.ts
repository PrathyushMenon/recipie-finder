import type { Recipe } from "./types"

const API_KEY = process.env.SPOONACULAR_API_KEY
const BASE_URL = "https://api.spoonacular.com"

// Helper function to add delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to handle API requests with retry logic
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, backoff = 1000) {
  try {
    const response = await fetch(url, options)

    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited. Retrying in ${backoff}ms...`)
      await delay(backoff)
      return fetchWithRetry(url, options, retries - 1, backoff * 2)
    }

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${await response.text()}`)
    }

    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`Request failed. Retrying in ${backoff}ms...`)
      await delay(backoff)
      return fetchWithRetry(url, options, retries - 1, backoff * 2)
    }
    throw error
  }
}

// Helper function to safely parse JSON
async function safeJsonParse(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    console.error("Error parsing JSON:", error)
    console.error("Response text:", await response.text())
    throw new Error("Invalid JSON response from API")
  }
}

/**
 * Fetches random recipes from the Spoonacular API
 */
export async function getRandomRecipes(number = 6, diet?: string): Promise<Recipe[]> {
  try {
    let url = `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`

    if (diet === "vegetarian") {
      url += "&tags=vegetarian"
    }

    try {
      const response = await fetchWithRetry(
        url,
        { next: { revalidate: 3600 } }, // Cache for 1 hour
      )

      const data = await safeJsonParse(response)
      return data.recipes || []
    } catch (error) {
      console.error("API request failed:", error)
      // Fall back to mock data
      return getMockRecipes(diet || "all")
    }
  } catch (error) {
    console.error("Error fetching random recipes:", error)
    // Fall back to mock data
    return getMockRecipes(diet || "all")
  }
}

/**
 * Fetches detailed information about a specific recipe
 */
export async function getRecipeDetails(id: number): Promise<Recipe | null> {
  try {
    const response = await fetchWithRetry(
      `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    )

    return await safeJsonParse(response)
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${id}:`, error)
    return null
  }
}

/**
 * Searches for recipes by ingredients
 */
export async function searchRecipesByIngredients(ingredients: string, diet?: string): Promise<Recipe[]> {
  try {
    const formattedIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .join(",+")

    const url = `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${formattedIngredients}&number=10&ranking=1&ignorePantry=false`

    try {
      const response = await fetchWithRetry(
        url,
        { cache: "no-store" }, // Don't cache search results
      )

      const recipes = await safeJsonParse(response)

      // If diet filter is applied, we need to get full recipe details to check diet information
      if (diet && diet !== "all") {
        // To avoid rate limiting, process recipes in batches
        const batchSize = 3
        let filteredRecipes: Recipe[] = []

        for (let i = 0; i < recipes.length; i += batchSize) {
          const batch = recipes.slice(i, i + batchSize)

          // Process batch with delay between requests
          const batchDetails = await Promise.all(
            batch.map(async (recipe: any, index: number) => {
              // Add delay between requests to avoid rate limiting
              if (index > 0) await delay(1000)
              return await getRecipeDetails(recipe.id)
            }),
          )

          // Filter batch based on diet preference
          const filteredBatch = batchDetails.filter((recipe: Recipe | null) => {
            if (!recipe) return false

            if (diet === "vegetarian") {
              return recipe.vegetarian === true
            } else if (diet === "non-vegetarian") {
              return recipe.vegetarian === false
            }

            return true
          })

          filteredRecipes = [...filteredRecipes, ...filteredBatch]

          // Add delay between batches
          if (i + batchSize < recipes.length) {
            await delay(2000)
          }
        }

        return filteredRecipes
      }

      // If no diet filter, just return the basic recipe data
      return recipes.map((recipe: any) => ({
        ...recipe,
        vegetarian: undefined, // We don't know without fetching details
      }))
    } catch (error) {
      console.error("API request failed:", error)
      // Fall back to mock data
      return getMockRecipes(diet || "all")
    }
  } catch (error) {
    console.error("Error searching recipes by ingredients:", error)
    // Fall back to mock data
    return getMockRecipes(diet || "all")
  }
}

/**
 * Fetches recipes by category
 */
export async function getRecipesByCategory(category: string, number = 10, diet?: string): Promise<Recipe[]> {
  try {
    let url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${category}&number=${number}`

    if (diet === "vegetarian") {
      url += "&diet=vegetarian"
    }

    try {
      const response = await fetchWithRetry(
        url,
        { next: { revalidate: 3600 } }, // Cache for 1 hour
      )

      const data = await safeJsonParse(response)

      // For non-vegetarian filter or to get complete recipe data, we need to get full recipe details
      // But we'll limit the number of recipes to avoid rate limiting
      const limitedResults = data.results.slice(0, 6)

      // Process recipes in batches to avoid rate limiting
      const batchSize = 2
      let recipeDetails: (Recipe | null)[] = []

      for (let i = 0; i < limitedResults.length; i += batchSize) {
        const batch = limitedResults.slice(i, i + batchSize)

        // Process batch with delay between requests
        const batchDetails = await Promise.all(
          batch.map(async (recipe: any, index: number) => {
            // Add delay between requests to avoid rate limiting
            if (index > 0) await delay(1000)
            return await getRecipeDetails(recipe.id)
          }),
        )

        recipeDetails = [...recipeDetails, ...batchDetails]

        // Add delay between batches
        if (i + batchSize < limitedResults.length) {
          await delay(2000)
        }
      }

      // Filter out null values and apply diet filter for non-vegetarian
      const filteredRecipes = recipeDetails.filter((recipe: Recipe | null) => {
        if (!recipe) return false

        if (diet === "non-vegetarian") {
          return recipe.vegetarian === false
        }

        return true
      })

      return filteredRecipes
    } catch (error) {
      console.error("API request failed:", error)
      // Fall back to mock data
      return getMockRecipes(category)
    }
  } catch (error) {
    console.error(`Error fetching recipes for category ${category}:`, error)
    // Fall back to mock data
    return getMockRecipes(category)
  }
}

/**
 * Fetches a limited set of mock recipes when API is rate limited
 */
export function getMockRecipes(category: string): Recipe[] {
  // Mock data for when the API is rate limited
  const mockRecipes: Recipe[] = [
    {
      id: 1,
      title: "Vegetarian Pasta Primavera",
      image: "https://spoonacular.com/recipeImages/654959-556x370.jpg",
      vegetarian: true,
      readyInMinutes: 30,
      servings: 4,
      summary: "A delicious vegetarian pasta with fresh spring vegetables.",
    },
    {
      id: 2,
      title: "Grilled Chicken Salad",
      image: "https://spoonacular.com/recipeImages/661340-556x370.jpg",
      vegetarian: false,
      readyInMinutes: 25,
      servings: 2,
      summary: "A healthy grilled chicken salad with mixed greens and vinaigrette.",
    },
    {
      id: 3,
      title: "Beef Stir Fry",
      image: "https://spoonacular.com/recipeImages/642539-556x370.jpg",
      vegetarian: false,
      readyInMinutes: 35,
      servings: 4,
      summary: "A quick and easy beef stir fry with vegetables and soy sauce.",
    },
    {
      id: 4,
      title: "Vegetable Curry",
      image: "https://spoonacular.com/recipeImages/716426-556x370.jpg",
      vegetarian: true,
      readyInMinutes: 45,
      servings: 6,
      summary: "A flavorful vegetable curry with coconut milk and spices.",
    },
    {
      id: 5,
      title: "Chocolate Chip Cookies",
      image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      vegetarian: true,
      readyInMinutes: 40,
      servings: 24,
      summary: "Classic chocolate chip cookies that are crispy on the outside and chewy on the inside.",
    },
    {
      id: 6,
      title: "Salmon with Roasted Vegetables",
      image: "https://spoonacular.com/recipeImages/659135-556x370.jpg",
      vegetarian: false,
      readyInMinutes: 50,
      servings: 2,
      summary: "Baked salmon with a variety of roasted vegetables and herbs.",
    },
  ]

  // Filter based on category
  let filteredRecipes = [...mockRecipes]

  if (category.toLowerCase() === "vegetarian") {
    filteredRecipes = mockRecipes.filter((recipe) => recipe.vegetarian)
  } else if (category.toLowerCase() === "non-vegetarian") {
    filteredRecipes = mockRecipes.filter((recipe) => !recipe.vegetarian)
  } else if (category.toLowerCase() === "breakfast") {
    filteredRecipes = mockRecipes.slice(0, 2)
  } else if (category.toLowerCase() === "lunch") {
    filteredRecipes = mockRecipes.slice(1, 4)
  } else if (category.toLowerCase() === "dinner") {
    filteredRecipes = mockRecipes.slice(2, 5)
  } else if (category.toLowerCase() === "desserts") {
    filteredRecipes = [mockRecipes[4]]
  }

  return filteredRecipes
}
