"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/data/products"

interface ProductShowcaseProps {
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string) => void
  onQuickView: (productId: string) => void
}

const translations = {
  en: {
    title: "Notre Collection Exquise",
    subtitle: "Fabriquées avec amour selon des recettes marocaines traditionnelles",
    all: "Tous les Produits",
    almond: "La Pâtisseries",
    traditional: "Boulangeries",
    layered: "La Viennoiseries",
    date: "Sale",
    filled: "Beldi",
    viewAll: "Voir Plus des Produits",
    showingResults: "Affichage de {count} produits",
  },
  fr: {
    title: "Notre Collection Exquise",
    subtitle: "Fabriquées avec amour selon des recettes marocaines traditionnelles",
    all: "Tous les Produits",
    traditional: "Boulangeries",
    almond: "La Pâtisseries",
    layered: "La Viennoiseries",
    date: "Sale",
    filled: "Beldi",
    viewAll: "Voir Plus des Produits",
    showingResults: "Affichage de {count} produits",
  },
  ar: {
    title: "Notre Collection Exquise",
    subtitle: "Fabriquées avec amour selon des recettes marocaines traditionnelles",
    all: "Tous les Produits",
    traditional: "Boulangeries",
    almond: "La Pâtisseries",
    layered: "La Viennoiseries",
    date: "Sale",
    filled: "Beldi",
    viewAll: "Voir Plus des Produits",
    showingResults: "Affichage de {count} produits",
  },
}

export function ProductShowcase({ language, onAddToCart, onQuickView }: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [displayCount, setDisplayCount] = useState(6)
  const t = translations[language]
  const isRTL = language === "ar"
  const categories = [
    { key: "all", label: t.all },
    { key: "traditional", label: t.traditional },
    { key: "almond", label: t.almond },
    { key: "layered", label: t.layered },
    { key: "date", label: t.date },
    { key: "filled", label: t.filled },
    { key: "phyllo", label: t.phyllo },
  ]

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true
    const categoryKey = product.category.en.toLowerCase().replace(" ", "")
    return categoryKey.includes(selectedCategory) || selectedCategory.includes(categoryKey)
  })

  const displayedProducts = filteredProducts.slice(0, displayCount)

  return (
    <section id="products" className={`py-16 bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-great-vibes text-4xl md:text-5xl text-[#d0a84b] mb-4">{t.title}</h2>
          <p className="font-playfair text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.key)
                setDisplayCount(6)
              }}
              className={`transition-all border-[#e6e0d4] duration-200 ${selectedCategory === category.key
                ? "bg-[#d0a84b] text-primary-foreground"
                : "hover:bg-[#d0a84b]/30 hover:text-primary"
                }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center  mb-8">
          <Badge variant="secondary" className="text-sm bg-[#c2905e] text-white">
            {t.showingResults.replace("{count}", displayedProducts.length.toString())}
          </Badge>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="animate-fade-in-up "
              style={{ animationDelay: `${displayedProducts.indexOf(product) * 100}ms` }}
            >
              <ProductCard product={product} language={language} onAddToCart={onAddToCart} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredProducts.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDisplayCount(displayCount + 6)}
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {t.viewAll}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
