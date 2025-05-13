export interface Recipe {
  id: number
  title: string
  image: string
  imageType?: string
  servings?: number
  readyInMinutes?: number
  license?: string
  sourceName?: string
  sourceUrl?: string
  spoonacularSourceUrl?: string
  healthScore?: number
  spoonacularScore?: number
  pricePerServing?: number
  analyzedInstructions?: AnalyzedInstruction[]
  cheap?: boolean
  creditsText?: string
  cuisines?: string[]
  dairyFree?: boolean
  diets?: string[]
  gaps?: string
  glutenFree?: boolean
  instructions?: string
  ketogenic?: boolean
  lowFodmap?: boolean
  occasions?: string[]
  sustainable?: boolean
  vegan?: boolean
  vegetarian?: boolean
  veryHealthy?: boolean
  veryPopular?: boolean
  whole30?: boolean
  weightWatcherSmartPoints?: number
  dishTypes?: string[]
  extendedIngredients?: Ingredient[]
  summary?: string
  winePairing?: WinePairing
  nutrition?: Nutrition
}

export interface AnalyzedInstruction {
  name: string
  steps: Step[]
}

export interface Step {
  number: number
  step: string
  ingredients?: Ingredient[]
  equipment?: Equipment[]
  length?: Length
}

export interface Equipment {
  id: number
  name: string
  localizedName: string
  image: string
}

export interface Ingredient {
  id?: number
  aisle?: string
  image?: string
  consistency?: string
  name: string
  nameClean?: string
  original?: string
  originalName?: string
  amount: number
  unit: string
  meta?: string[]
  measures?: {
    us: Measure
    metric: Measure
  }
}

export interface Measure {
  amount: number
  unitShort: string
  unitLong: string
}

export interface Length {
  number: number
  unit: string
}

export interface WinePairing {
  pairedWines: string[]
  pairingText: string
  productMatches: ProductMatch[]
}

export interface ProductMatch {
  id: number
  title: string
  description: string
  price: string
  imageUrl: string
  averageRating: number
  ratingCount: number
  score: number
  link: string
}

export interface Nutrition {
  nutrients: Nutrient[]
  properties?: Property[]
  flavonoids?: Flavonoid[]
  ingredients?: IngredientNutrition[]
  caloricBreakdown?: CaloricBreakdown
  weightPerServing?: WeightPerServing
}

export interface Nutrient {
  name: string
  amount: number
  unit: string
  percentOfDailyNeeds?: number
}

export interface Property {
  name: string
  amount: number
  unit: string
}

export interface Flavonoid {
  name: string
  amount: number
  unit: string
}

export interface IngredientNutrition {
  id: number
  name: string
  amount: number
  unit: string
  nutrients: Nutrient[]
}

export interface CaloricBreakdown {
  percentProtein: number
  percentFat: number
  percentCarbs: number
}

export interface WeightPerServing {
  amount: number
  unit: string
}
