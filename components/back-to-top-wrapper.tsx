"use client"

import { useState, useEffect } from "react"
import { BackToTop } from "./back-to-top"

export function BackToTopWrapper() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get initial language from localStorage
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
    }
  }, [])

  if (!mounted) {
    return <BackToTop language="fr" />
  }

  return <BackToTop language={language} />
}
