import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DietFilterProvider } from "@/contexts/diet-filter-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Finder - Find Recipes With Ingredients You Have",
  description: "Discover delicious recipes you can make with ingredients you already have at home.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DietFilterProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </DietFilterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
