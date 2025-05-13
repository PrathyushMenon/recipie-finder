"use client"

import { Leaf, Drumstick } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDietFilter } from "@/contexts/diet-filter-context"
import { motion } from "framer-motion"

export function DietToggle() {
  const { dietFilter, setDietFilter } = useDietFilter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={`relative ${dietFilter !== "all" ? "border-primary" : ""}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: dietFilter === "vegetarian" ? 1 : 0.8,
              opacity: dietFilter === "vegetarian" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Leaf className="h-[1.2rem] w-[1.2rem] text-green-500" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: dietFilter === "non-vegetarian" ? 1 : 0.8,
              opacity: dietFilter === "non-vegetarian" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Drumstick className="h-[1.2rem] w-[1.2rem] text-red-500" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: dietFilter === "all" ? 1 : 0.8,
              opacity: dietFilter === "all" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <div className="flex">
              <Leaf className="h-[1.2rem] w-[1.2rem] text-green-500 -mr-1" />
              <Drumstick className="h-[1.2rem] w-[1.2rem] text-red-500 -ml-1" />
            </div>
          </motion.div>
          <span className="sr-only">Toggle diet filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDietFilter("all")}>
          <div className="flex items-center">
            <div className="flex mr-2">
              <Leaf className="h-4 w-4 text-green-500 -mr-1" />
              <Drumstick className="h-4 w-4 text-red-500 -ml-1" />
            </div>
            All Recipes
            {dietFilter === "all" && <span className="ml-2 text-primary">✓</span>}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDietFilter("vegetarian")}>
          <Leaf className="mr-2 h-4 w-4 text-green-500" />
          Vegetarian Only
          {dietFilter === "vegetarian" && <span className="ml-2 text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDietFilter("non-vegetarian")}>
          <Drumstick className="mr-2 h-4 w-4 text-red-500" />
          Non-Vegetarian Only
          {dietFilter === "non-vegetarian" && <span className="ml-2 text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
