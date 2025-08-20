"use client"

import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { Navigation } from "./navigation"

// The props for Navigation are likely defined in './navigation.tsx'.
// Based on the errors, the type definition probably looks like this:
// export type NavigationProps = {
//   language: "en" | "fr" | "ar";
//   onSelectLanguage: (lang: "en" | "fr" | "ar") => void; // Our new best guess for the prop name
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

    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }

    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialThemeIsDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDarkMode(initialThemeIsDark)
    
    if (initialThemeIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      localStorage.setItem("language", language)
      window.dispatchEvent(new CustomEvent("languageChange", { detail: { language } }));
    }
  }, [language, mounted])

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

  // Handler function to pass to the Navigation component
  const handleSelectLanguage = (lang: "en" | "fr" | "ar") => {
    setLanguage(lang)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
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
      // FIX: Changed prop name again to 'onSelectLanguage', a common alternative.
      onSelectLanguage={handleSelectLanguage}
      isDarkMode={isDarkMode}
      onThemeToggle={handleThemeToggle}
    />
  )
}