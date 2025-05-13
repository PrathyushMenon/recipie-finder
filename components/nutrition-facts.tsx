"use client"

import { motion } from "framer-motion"
import type { Nutrition } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NutritionFactsProps {
  nutrition?: Nutrition
}

export function NutritionFacts({ nutrition }: NutritionFactsProps) {
  if (!nutrition || !nutrition.nutrients) {
    return null
  }

  // Find key nutrients
  const calories = nutrition.nutrients.find((n) => n.name === "Calories")
  const fat = nutrition.nutrients.find((n) => n.name === "Fat")
  const carbs = nutrition.nutrients.find((n) => n.name === "Carbohydrates")
  const protein = nutrition.nutrients.find((n) => n.name === "Protein")
  const fiber = nutrition.nutrients.find((n) => n.name === "Fiber")
  const sugar = nutrition.nutrients.find((n) => n.name === "Sugar")
  const sodium = nutrition.nutrients.find((n) => n.name === "Sodium")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calories && (
              <motion.div variants={itemVariants} className="border-b pb-2">
                <div className="flex justify-between font-bold">
                  <span>Calories</span>
                  <span>
                    {Math.round(calories.amount)} {calories.unit}
                  </span>
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              {fat && (
                <motion.div variants={itemVariants} className="flex justify-between">
                  <span>Total Fat</span>
                  <span>
                    {Math.round(fat.amount)} {fat.unit}
                  </span>
                </motion.div>
              )}

              {carbs && (
                <motion.div variants={itemVariants} className="flex justify-between">
                  <span>Total Carbohydrates</span>
                  <span>
                    {Math.round(carbs.amount)} {carbs.unit}
                  </span>
                </motion.div>
              )}

              {fiber && (
                <motion.div variants={itemVariants} className="flex justify-between pl-4 text-sm">
                  <span>Dietary Fiber</span>
                  <span>
                    {Math.round(fiber.amount)} {fiber.unit}
                  </span>
                </motion.div>
              )}

              {sugar && (
                <motion.div variants={itemVariants} className="flex justify-between pl-4 text-sm">
                  <span>Sugars</span>
                  <span>
                    {Math.round(sugar.amount)} {sugar.unit}
                  </span>
                </motion.div>
              )}

              {protein && (
                <motion.div variants={itemVariants} className="flex justify-between">
                  <span>Protein</span>
                  <span>
                    {Math.round(protein.amount)} {protein.unit}
                  </span>
                </motion.div>
              )}

              {sodium && (
                <motion.div variants={itemVariants} className="flex justify-between">
                  <span>Sodium</span>
                  <span>
                    {Math.round(sodium.amount)} {sodium.unit}
                  </span>
                </motion.div>
              )}
            </div>

            <motion.p variants={itemVariants} className="text-xs text-muted-foreground mt-4">
              * Percent Daily Values are based on a 2,000 calorie diet.
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
