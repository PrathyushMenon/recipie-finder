"use server"

import { searchRecipesByIngredients as searchApi } from "./api"
import type { Recipe } from "./types"

/**
 * Server action to search for recipes by ingredients
 */
export async function searchRecipesByIngredients(ingredients: string, diet?: string) {
  try {
    console.log(`Server action called with diet: ${diet}`) // Debug log

    // Make sure diet is one of the valid options
    const validDiet = diet && ["all", "vegetarian", "non-vegetarian"].includes(diet) ? diet : "all"

    const recipes = await searchApi(ingredients, validDiet)
    console.log(`API returned ${recipes.length} recipes`) // Debug log

    // Return more recipe details instead of just IDs
    return recipes.map((recipe: Recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      vegetarian: recipe.vegetarian,
    }))
  } catch (error) {
    console.error("Error in searchRecipesByIngredients action:", error)
    throw new Error("Failed to search recipes")
  }
}
