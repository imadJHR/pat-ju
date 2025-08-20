"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string) => void
  onQuickView: (productId: string) => void
}

export function ProductCard({ product, language, onAddToCart, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const isRTL = language === "ar"
  const name = product.name[language]
  const description = product.description[language]
  const category = product.category[language]

  const translations = {
    en: {
      addToCart: "Add to Cart",
      quickView: "Quick View",
      outOfStock: "Out of Stock",
      new: "New",
      bestseller: "Bestseller",
      reviews: "reviews",
    },
    fr: {
      addToCart: "Ajouter au Panier",
      quickView: "Aperçu Rapide",
      outOfStock: "Rupture de Stock",
      new: "Nouveau",
      bestseller: "Bestseller",
      reviews: "avis",
    },
    ar: {
      addToCart: "أضف للسلة",
      quickView: "عرض سريع",
      outOfStock: "نفد المخزون",
      new: "جديد",
      bestseller: "الأكثر مبيعاً",
      reviews: "تقييم",
    },
  }

  const t = translations[language]

  return (
    <Card
      className={`group bg-[#f4ead5] relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2  border-border ${isRTL ? "rtl" : "ltr"}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[currentImageIndex] || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay with Actions */}
        <div
          className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2`}
        >
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground shadow-lg"
            onClick={() => onQuickView(product.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            {t.quickView}
          </Button>
          
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-accent text-accent-foreground font-medium">{t.new}</Badge>}
          {product.isBestseller && (
            <Badge className="bg-[#d0a84b] text-primary-foreground font-medium">{t.bestseller}</Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="font-medium">
              {t.outOfStock}
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          </div>
        )}

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-sm text-[#918981]  mb-1 font-medium">{category}</p>

        {/* Product Name */}
        <h3 className="font-playfair text-lg font-semibold text-foreground mb-2 line-clamp-1">{name}</h3>

        {/* Description */}
        <p className="text-sm text-[#918981]  mb-3 line-clamp-2 leading-relaxed">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            {product.rating} ({product.reviewCount} {t.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-[#d0a84b]">{product.price.toFixed(2)} MAD</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.originalPrice.toFixed(2)} MAD</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-[#d0a84b] hover:bg-[#d0a84b]/90 text-primary-foreground font-medium transition-all duration-200 transform hover:scale-105"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? t.addToCart : t.outOfStock}
        </Button>
      </CardContent>
    </Card>
  )
}