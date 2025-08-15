"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react"
import type { Product } from "@/types/product"

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string, quantity: number) => void
}

export function QuickViewModal({ product, isOpen, onClose, language, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!product) return null

  const isRTL = language === "ar"
  const name = product.name[language]
  const description = product.description[language]
  const category = product.category[language]

  const translations = {
    en: {
      addToCart: "Add to Cart",
      quantity: "Quantity",
      outOfStock: "Out of Stock",
      new: "New",
      bestseller: "Bestseller",
      reviews: "reviews",
      ingredients: "Ingredients",
      nutritionFacts: "Nutrition Facts",
      addToFavorites: "Add to Favorites",
    },
    fr: {
      addToCart: "Ajouter au Panier",
      quantity: "Quantité",
      outOfStock: "Rupture de Stock",
      new: "Nouveau",
      bestseller: "Bestseller",
      reviews: "avis",
      ingredients: "Ingrédients",
      nutritionFacts: "Valeurs Nutritionnelles",
      addToFavorites: "Ajouter aux Favoris",
    },
    ar: {
      addToCart: "أضف للسلة",
      quantity: "الكمية",
      outOfStock: "نفد المخزون",
      new: "جديد",
      bestseller: "الأكثر مبيعاً",
      reviews: "تقييم",
      ingredients: "المكونات",
      nutritionFacts: "القيم الغذائية",
      addToFavorites: "أضف للمفضلة",
    },
  }

  const t = translations[language]

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isRTL ? "rtl" : "ltr"}`}>
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-[#d0a84b]">{name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-accent text-accent-foreground">{t.new}</Badge>}
                {product.isBestseller && <Badge className="bg-[#d0a84b] text-primary-foreground">{t.bestseller}</Badge>}
              </div>

              {/* Price Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#847d7a] font-medium mb-1">{category}</p>
              <h2 className="font-playfair text-2xl font-semibold text-foreground mb-2">{name}</h2>
              <p className="text-[#847d7a]  leading-relaxed">{description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
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
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} {t.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#d0a84b]">{product.price} MAD</span>
              {product.originalPrice && (
                <span className="text-lg text-[#77707f] line-through">{product.originalPrice} MAD</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">{t.quantity}:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} disabled={!product.inStock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#d0a84b] hover:bg-[#d0a84b]/90 text-primary-foreground"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? t.addToCart : t.outOfStock}
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsFavorited(!isFavorited)}>
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <h4 className="font-semibold mb-2">{t.ingredients}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "en" &&
                    "Traditional Moroccan ingredients including almonds, honey, orange blossom water, and authentic spices."}
                  {language === "fr" &&
                    "Ingrédients marocains traditionnels incluant amandes, miel, eau de fleur d'oranger et épices authentiques."}
                  {language === "ar" && "مكونات مغربية تقليدية تشمل اللوز والعسل وماء زهر البرتقال والتوابل الأصيلة."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
