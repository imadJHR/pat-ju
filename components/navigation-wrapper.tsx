"use client"

import { useState, useEffect } from "react"
import { Navigation } from "./navigation"

export function NavigationWrapper() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)

    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }

    // Load saved theme from localStoragezz
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark))
  }, [])

  // Update document attributes when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  // Update theme when isDarkMode changes
  useEffect(() => {
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }, [isDarkMode, mounted])


  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="font-great-vibes text-2xl md:text-3xl text-primary font-bold">Pâtisserie Marocaine</h1>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <Navigation
      language={language}
      isDarkMode={isDarkMode}
      onThemeToggle={handleThemeToggle}
    />
  )
}
