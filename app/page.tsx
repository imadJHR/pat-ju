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
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [isClient, setIsClient] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
      if (newLanguage) {
        setLanguage(newLanguage)
      }
    }

    window.addEventListener("languageChanged", handleLanguageChange)
    return () => window.removeEventListener("languageChanged", handleLanguageChange)
  }, [])

  // --- FIX: Make `quantityInKg` optional and provide a default value ---
  const handleAddToCart = (productId: string, quantityInKg?: number) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      // Use the provided quantity, or default to 0.5 if it's undefined
      const quantityToAdd = quantityInKg ?? 0.5
      addItem(product, quantityToAdd)
    }
  }

  const handleQuickView = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickViewOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      {/* Ensure all components use the dynamic language state */}
      <HeroSection language="fr" />
      <ProductShowcase language={language} onAddToCart={handleAddToCart} onQuickView={handleQuickView} />
      <AboutSection language={language} />
      <TestimonialsSection language={language} />

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseModal}
        language={language}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}