"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Ingredient } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IngredientsProps {
  ingredients: Ingredient[]
}

export function Ingredients({ ingredients }: IngredientsProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])

  if (!ingredients || ingredients.length === 0) {
    return null
  }

  const toggleIngredient = (index: number) => {
    setSelectedIngredients((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ingredients</CardTitle>
          <Button variant="outline" size="sm" className="text-xs">
            <ShoppingCart className="mr-2 h-3 w-3" />
            Add all to shopping list
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <motion.li
                key={index}
                className={`flex items-start p-2 rounded-md cursor-pointer transition-colors ${
                  selectedIngredients.includes(index)
                    ? "bg-primary/10 line-through text-muted-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => toggleIngredient(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Check
                  className={`mr-2 h-5 w-5 flex-shrink-0 mt-0.5 ${
                    selectedIngredients.includes(index) ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                  {ingredient.original &&
                    ingredient.original !== `${ingredient.amount} ${ingredient.unit} ${ingredient.name}` && (
                      <span className="text-sm text-muted-foreground ml-2">({ingredient.original})</span>
                    )}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
