"use client"

import { useState, useEffect } from "react"
import { Navigation } from "./navigation"

// Assuming NavigationProps is defined in './navigation' like this:
// export type NavigationProps = {
//   language: "en" | "fr" | "ar";
//   setLanguage: (lang: "en" | "fr" | "ar") => void; // The corrected prop name
//   isDarkMode: boolean;
//   onThemeToggle: () => void;
// };

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

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialThemeIsDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDarkMode(initialThemeIsDark)
    
    // Apply initial theme immediately without waiting for the next effect
    if (initialThemeIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

  }, [])

  // Update document attributes when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      localStorage.setItem("language", language)
      // Optional: Dispatch a global event so other components can listen for changes
      window.dispatchEvent(new CustomEvent("languageChange", { detail: { language } }));
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

  // Don't render the full component until mounted to avoid hydration mismatch
  if (!mounted) {
    // Render a minimal, static skeleton that matches the server-rendered HTML
    return (
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
               {/* Using a generic name for the skeleton to avoid language-specific text */}
              <h1 className="font-great-vibes text-2xl md:text-3xl text-gray-800 font-bold">Moroccan Pastries</h1>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <Navigation
      language={language}
      // FIX: Changed prop name from 'onLanguageChange' to 'setLanguage'
      // and passed the state setter directly.
      setLanguage={setLanguage}
      isDarkMode={isDarkMode}
      onThemeToggle={handleThemeToggle}
    />
  )
}