"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { AnalyzedInstruction } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CookingInstructionsProps {
  instructions: AnalyzedInstruction[]
}

export function CookingInstructions({ instructions }: CookingInstructionsProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  if (!instructions || instructions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cooking Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No detailed instructions available for this recipe. Please check the original recipe source for cooking
            directions.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Cooking Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          {instructions.map((instruction, instructionIndex) => (
            <div key={instructionIndex} className="mb-6 last:mb-0">
              {instruction.name && <h3 className="font-medium mb-3">{instruction.name}</h3>}

              <ol className="space-y-4">
                {instruction.steps.map((step) => (
                  <motion.li
                    key={step.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: step.number * 0.1 }}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className={`flex items-start p-4 cursor-pointer ${
                        activeStep === step.number ? "bg-accent" : "hover:bg-accent/50"
                      }`}
                      onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
                    >
                      <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm font-medium mr-3 flex-shrink-0">
                        {step.number}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{step.step}</p>

                        {activeStep === step.number && step.ingredients && step.ingredients.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3"
                          >
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Ingredients used in this step:
                            </p>
                            <ul className="text-sm text-muted-foreground list-disc pl-5">
                              {step.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient.name}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {activeStep === step.number ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
