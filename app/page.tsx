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

  const handleAddToCart = (productId: string, quantityInKg: number) => {
    const product = products.find(p => p.id === productId)
    if (product) {
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

  // --- FIX: Create a handler that both closes the modal and clears the product ---
  const handleCloseModal = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      {/* NOTE: The type error on the 'language' prop below must be fixed in each child component's props definition. */}
      <HeroSection language="fr" />
      <ProductShowcase language={language} onAddToCart={handleAddToCart} onQuickView={handleQuickView} />
      <AboutSection language={language} />
      <TestimonialsSection language={language} />

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseModal} // Use the corrected handler
        language={language}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}