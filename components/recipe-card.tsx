"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Users, ChevronRight, Leaf, Drumstick } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RecipeCardProps {
  recipe: Recipe
  index?: number
}

export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative aspect-video overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute top-2 left-2 flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center justify-center rounded-full w-7 h-7 ${
                      recipe.vegetarian ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}
                  >
                    {recipe.vegetarian ? <Leaf className="h-4 w-4" /> : <Drumstick className="h-4 w-4" />}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {recipe.readyInMinutes && (
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {recipe.readyInMinutes} min
            </div>
          )}
        </div>
        <CardContent className="pt-6 flex-1">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
            {recipe.servings && (
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {recipe.summary && (
            <p className="text-sm text-muted-foreground line-clamp-3">{recipe.summary.replace(/<[^>]*>/g, "")}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full group">
            <Link href={`/recipes/${recipe.id}`}>
              <span>View Recipe</span>
              <motion.div className="ml-2" initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
