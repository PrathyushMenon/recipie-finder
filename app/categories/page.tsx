"use client"

import { PageTransition } from "@/components/page-transition"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Breakfast",
      image: "https://spoonacular.com/recipeImages/636589-556x370.jpg",
      description: "Start your day with delicious breakfast recipes",
    },
    {
      name: "Lunch",
      image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
      description: "Quick and easy lunch ideas for busy days",
    },
    {
      name: "Dinner",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      description: "Hearty dinner recipes for the whole family",
    },
    {
      name: "Desserts",
      image: "https://spoonacular.com/recipeImages/715449-556x370.jpg",
      description: "Sweet treats to satisfy your cravings",
    },
    {
      name: "Vegetarian",
      image: "https://spoonacular.com/recipeImages/716426-556x370.jpg",
      description: "Delicious meat-free recipes",
    },
    {
      name: "Vegan",
      image: "https://spoonacular.com/recipeImages/715415-556x370.jpg",
      description: "Plant-based recipes for everyone",
    },
    {
      name: "Gluten-Free",
      image: "https://spoonacular.com/recipeImages/716408-556x370.jpg",
      description: "Recipes without gluten but full of flavor",
    },
    {
      name: "Quick & Easy",
      image: "https://spoonacular.com/recipeImages/715421-556x370.jpg",
      description: "Ready in 30 minutes or less",
    },
  ]

  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Recipe Categories</h1>
          <p className="text-lg text-muted-foreground">
            Browse recipes by category to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-10" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </PageTransition>
  )
}
