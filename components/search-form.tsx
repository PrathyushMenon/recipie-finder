"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Leaf, Drumstick } from "lucide-react"
import { useDietFilter } from "@/contexts/diet-filter-context"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface SearchRecipeResult {
  id: number
  title: string
  image: string
  vegetarian?: boolean
}

interface SearchFormProps {
  searchAction: (ingredients: string, diet?: string) => Promise<SearchRecipeResult[]>
}

export function SearchForm({ searchAction }: SearchFormProps) {
  const [ingredients, setIngredients] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState<SearchRecipeResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { dietFilter } = useDietFilter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log(`Searching with diet filter: ${dietFilter}`) // Debug log
      const results = await searchAction(ingredients, dietFilter)
      console.log(`Got ${results.length} results`) // Debug log

      // Log vegetarian status of results
      results.forEach((recipe, index) => {
        console.log(`Recipe ${index}: ${recipe.title}, vegetarian: ${recipe.vegetarian}`)
      })

      setRecipes(results)

      if (results.length === 0) {
        setError(
          `No ${dietFilter !== "all" ? dietFilter + " " : ""}recipes found with those ingredients. Try adding more ingredients or using different ones.`,
        )
      } else if (results.length === 1) {
        // If only one recipe is found, redirect to its details page
        router.push(`/recipes/${results[0].id}`)
      }
    } catch (err) {
      console.error("Search error:", err) // Debug log
      setError("Failed to search recipes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
            Enter ingredients you have (separated by commas)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              id="ingredients"
              placeholder="e.g., chicken, rice, onions"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
            <div className="mt-2">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>Find {dietFilter !== "all" ? `${dietFilter} ` : ""}Recipes</>
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            For best results, enter at least 3 ingredients
            {dietFilter !== "all" && (
              <span className="ml-1">
                (Filtering for <span className="font-medium">{dietFilter}</span> recipes)
              </span>
            )}
          </p>
        </motion.div>
      </motion.form>

      {error && (
        <motion.div
          className="p-4 bg-destructive/10 text-destructive rounded-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {recipes.length > 0 && (
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 className="text-xl font-semibold" variants={itemVariants}>
            Found {recipes.length} {dietFilter !== "all" ? `${dietFilter} ` : ""}recipes
          </motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" variants={itemVariants}>
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {recipe.vegetarian !== undefined && (
                        <div
                          className={`absolute top-2 left-2 p-1 rounded-full ${
                            recipe.vegetarian ? "bg-green-500/90" : "bg-red-500/90"
                          }`}
                        >
                          {recipe.vegetarian ? (
                            <Leaf className="h-4 w-4 text-white" />
                          ) : (
                            <Drumstick className="h-4 w-4 text-white" />
                          )}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-2">{recipe.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
