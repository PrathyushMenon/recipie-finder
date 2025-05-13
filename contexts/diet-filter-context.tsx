"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DietType = "all" | "vegetarian" | "non-vegetarian"

interface DietFilterContextType {
  dietFilter: DietType
  setDietFilter: (diet: DietType) => void
}

const DietFilterContext = createContext<DietFilterContextType | undefined>(undefined)

export function DietFilterProvider({ children }: { children: ReactNode }) {
  const [dietFilter, setDietFilterState] = useState<DietType>("all")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load preference from localStorage on mount
  useEffect(() => {
    try {
      const savedDiet = localStorage.getItem("diet-preference")
      if (savedDiet && ["all", "vegetarian", "non-vegetarian"].includes(savedDiet)) {
        console.log(`Loaded diet filter from localStorage: ${savedDiet}`) // Debug log
        setDietFilterState(savedDiet as DietType)
      }
    } catch (error) {
      console.error("Error loading diet preference from localStorage:", error)
    }
    setIsInitialized(true)
  }, [])

  // Function to update diet filter
  const setDietFilter = (diet: DietType) => {
    console.log(`Setting diet filter to: ${diet}`) // Debug log
    setDietFilterState(diet)

    try {
      localStorage.setItem("diet-preference", diet)

      // Set cookie for server components
      document.cookie = `diet-preference=${diet}; path=/; max-age=31536000; SameSite=Strict`
    } catch (error) {
      console.error("Error saving diet preference:", error)
    }

    // Force a page refresh to apply the filter to server components
    window.location.reload()
  }

  // Don't render children until we've initialized the state from localStorage
  if (!isInitialized) {
    return null
  }

  return <DietFilterContext.Provider value={{ dietFilter, setDietFilter }}>{children}</DietFilterContext.Provider>
}

export function useDietFilter() {
  const context = useContext(DietFilterContext)
  if (context === undefined) {
    throw new Error("useDietFilter must be used within a DietFilterProvider")
  }
  return context
}
