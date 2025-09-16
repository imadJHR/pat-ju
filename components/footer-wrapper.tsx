"use client"

import { useState, useEffect } from "react"
import { Footer } from "./footer"

export function FooterWrapper() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get language from localStorage or default to French
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
      if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    }

    // Listen for storage changes
    window.addEventListener("storage", handleLanguageChange)

    // Custom event for same-page language changes
    window.addEventListener("languageChange", handleLanguageChange)

    return () => {
      window.removeEventListener("storage", handleLanguageChange)
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <Footer  />
  }

  return <Footer />
}
