"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { QuickViewModal } from "@/components/quick-view-modal"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

export default function HomePage() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr") // Default to 'fr' for consistency
  const [isClient, setIsClient] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Listen for language changes from navigation
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
      if (newLanguage) {
        setLanguage(newLanguage)
      }
    }

    window.addEventListener("languageChanged", handleLanguageChange)
    return () => window.removeEventListener("languageChanged", handleLanguageChange)
  }, [])

  // --- FIX 1: Use the `addItem` from the hook for consistency and remove the direct `getState` call ---
  const handleAddToCart = (productId: string, quantityInKg: number) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      // Appeler le store avec la quantité spécifiée
      addItem(product, quantityInKg)
    }
  }

  const handleQuickView = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickViewOpen(true)
    }
  }

  // --- FIX 2: The function below was unused and contained the type error. It has been removed. ---
  /*
  const handleQuickViewAddToCart = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, language) // This was the line with the error
      }
    }
  }
  */

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return null
  }

  return (
    <>
      {/* --- IMPROVEMENT: Pass the dynamic language state to all child components --- */}
      <HeroSection language={language} />
      <ProductShowcase language={language} onAddToCart={handleAddToCart} onQuickView={handleQuickView} />
      <AboutSection language={language} />
      <TestimonialsSection language={language} />

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setSelectedProduct(null)}
        language={language}
        onAddToCart={handleAddToCart} // This correctly passes the function that accepts the quantity
      />
    </>
  )
}