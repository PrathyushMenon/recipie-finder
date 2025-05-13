"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Github, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  }

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <motion.footer
      className="border-t py-12 md:py-16 bg-background"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recipe Finder</h3>
            <p className="text-sm text-muted-foreground">
              Discover delicious recipes with ingredients you already have at home. Our mission is to make cooking
              easier and more enjoyable for everyone.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            <span className="flex items-center justify-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Recipe Finder Team
            </span>
            <span className="mt-2 block">
              Recipe data provided by{" "}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Spoonacular API
              </a>
            </span>
            <span className="mt-1 block">© {new Date().getFullYear()} Recipe Finder. All rights reserved.</span>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
