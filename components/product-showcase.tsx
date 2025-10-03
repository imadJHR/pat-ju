"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/data/products"

interface ProductShowcaseProps {
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string, quantityInKg?: number) => void
  onQuickView: (productId: string) => void
}

const translations = {
  en: {
    title: "Our Exquisite Collection",
    subtitle: "Made with love using traditional Moroccan recipes",
    categories: {
      all: "All Products",
      patisseries: "Pastries",
      boulangerie: "Bakery",
      viennoiserie: "Viennoiserie",
      sale: "Savory",
      beldi: "Traditional",
    },
    viewAll: "View More Products",
    showingResults: "Showing {count} products",
  },
  fr: {
    title: "Notre Collection Exquise",
    subtitle: "Fabriquées avec amour selon des recettes marocaines traditionnelles",
    categories: {
      all: "Tous les Produits",
      patisseries: "Pâtisseries",
      boulangerie: "Boulangerie",
      viennoiserie: "Viennoiserie",
      sale: "Salé",
      beldi: "Beldi",
    },
    viewAll: "Voir Plus de Produits",
    showingResults: "Affichage de {count} produits",
  },
  ar: {
    title: "مجموعتنا الرائعة",
    subtitle: "مصنوعة بحب وفقًا للوصفات المغربية التقليدية",
    categories: {
      all: "جميع المنتجات",
      patisseries: "حلويات",
      boulangerie: "مخبوزات",
      viennoiserie: "معجنات",
      sale: "مالح",
      beldi: "بلدي",
    },
    viewAll: "عرض المزيد من المنتجات",
    showingResults: "عرض {count} منتج",
  },
}


export function ProductShowcase({ language, onAddToCart, onQuickView }: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [displayCount, setDisplayCount] = useState(8)
  const t = translations[language]
  const isRTL = language === "ar"

  const categories = [
    { key: "all", label: t.categories.all },
    { key: "patisseries", label: t.categories.patisseries },
    { key: "boulangerie", label: t.categories.boulangerie },
    { key: "viennoiserie", label: t.categories.viennoiserie },
    { key: "sale", label: t.categories.sale },
    { key: "beldi", label: t.categories.beldi },
  ]

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true

    // Find the key (e.g., 'patisseries') that corresponds to the product's category name (e.g., 'Pâtisseries')
    const productCategoryKey = Object.entries(t.categories).find(
      ([key, value]) => value === product.category[language]
    )?.[0]

    return productCategoryKey === selectedCategory
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
                setDisplayCount(8) // Reset count on category change
              }}
              className={`transition-all duration-200 ${selectedCategory === category.key
                  ? "bg-[#d0a84b] text-white border-[#d0a84b] hover:bg-[#c2905e]"
                  : "border-[#e6e0d4] hover:bg-[#d0a84b]/30 hover:text-primary"
                }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="text-sm bg-[#c2905e] text-white">
            {t.showingResults.replace("{count}", displayedProducts.length.toString())}
          </Badge>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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
              onClick={() => setDisplayCount(displayCount + 8)}
              className="bg-transparent border-[#d0a84b] text-[#d0a84b] hover:bg-[#d0a84b] hover:text-white transition-all duration-200"
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