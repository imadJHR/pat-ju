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
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en")
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
  // Dans votre page principale
  const handleAddToCart = (productId: string, quantityInKg: number) => {
    // Trouver le produit par ID
    const product = products.find(p => p.id === productId)
    if (product) {
      // Appeler le store avec la quantité spécifiée
      useCart.getState().addItem(product, quantityInKg)
    }
  }

  const handleQuickView = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickViewOpen(true)
    }
  }

  const handleQuickViewClose = () => {
    setIsQuickViewOpen(false)
    setSelectedProduct(null)
  }

  const handleQuickViewAddToCart = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, language)
      }
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      <HeroSection language="fr" />
      <ProductShowcase language="fr" onAddToCart={handleAddToCart} onQuickView={handleQuickView} />
      <AboutSection language="fr" />
      <TestimonialsSection language="fr" />

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setSelectedProduct(null)}
        language={language}
        onAddToCart={handleAddToCart} // Bien passer la fonction qui accepte la quantité
      />
    </>
  )
}
