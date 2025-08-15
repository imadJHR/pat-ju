"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

interface BackToTopProps {
  language: "en" | "fr" | "ar"
}

const translations = {
  en: { backToTop: "Back to top" },
  fr: { backToTop: "Retour en haut" },
  ar: { backToTop: "العودة للأعلى" },
}

export function BackToTop({ language }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label={t.backToTop}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
