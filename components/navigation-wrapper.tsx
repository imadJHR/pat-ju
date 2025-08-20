// components/navigation-wrapper.tsx
"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Navigation } from './navigation' // Your main navigation component

export function NavigationWrapper() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  // --- ADDED: Language state management ---
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('fr')

  useEffect(() => {
    // This handles hydration errors with next-themes
    setMounted(true)
    // You could also load the language from localStorage here
    const storedLang = localStorage.getItem('language')
    if (storedLang && ['en', 'fr', 'ar'].includes(storedLang)) {
      setLanguage(storedLang as 'en' | 'fr' | 'ar');
    }
  }, [])

  // --- ADDED: Handler to change language and save it ---
  const handleLanguageChange = (lang: 'en' | 'fr' | 'ar') => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    // This line is important for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    // A simple height placeholder can prevent layout shift
    return <header className="h-20" />
  }

  return (
    <Navigation
      language={language}
      onLanguageChange={handleLanguageChange}
      isDarkMode={theme === 'dark'}
      onThemeToggle={handleThemeToggle}
    />
  )
}