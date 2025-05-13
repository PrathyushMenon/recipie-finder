"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Search, Home, BookOpen, Info, Mail } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { DietToggle } from "@/components/diet-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Categories", href: "/categories", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "About", href: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="h-4 w-4 mr-2" /> },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Search className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Recipe Finder
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              className="flex items-center space-x-6"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                        layoutId="navbar-underline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex items-center space-x-2">
              <DietToggle />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center space-x-2 mr-2">
              <DietToggle />
              <ModeToggle />
            </div>
            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-accent" aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-1 border-t">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-md text-sm font-medium ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
