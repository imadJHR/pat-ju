"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
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
  onAddToCart: (productId: string, quantityInKg: number) => void // IMPORTANT: quantityInKg est maintenant requis
  isFavorited?: boolean
  onToggleFavorite?: (productId: string) => void
}

// Fonction utilitaire pour calculer les réductions
const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function QuickViewModal({ 
  product, 
  isOpen, 
  onClose, 
  language, 
  onAddToCart,
  isFavorited = false,
  onToggleFavorite 
}: QuickViewModalProps) {
  const [quantityInKg, setQuantityInKg] = useState(0.5) // Défaut 0.5 kg
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const translations = useMemo(() => ({
    en: {
      addToCart: "Add to Cart",
      quantity: "Quantity (kg)",
      outOfStock: "Out of Stock",
      new: "New",
      bestseller: "Bestseller",
      reviews: "reviews",
      ingredients: "Ingredients",
      nutritionFacts: "Nutrition Facts",
      addToFavorites: "Add to Favorites",
      kg: "kg",
      perKg: "per kg",
    },
    fr: {
      addToCart: "Ajouter au Panier",
      quantity: "Quantité (kg)",
      outOfStock: "Rupture de Stock",
      new: "Nouveau",
      bestseller: "Bestseller",
      reviews: "avis",
      ingredients: "Ingrédients",
      nutritionFacts: "Valeurs Nutritionnelles",
      addToFavorites: "Ajouter aux Favoris",
      kg: "kg",
      perKg: "par kg",
    },
    ar: {
      addToCart: "أضف للسلة",
      quantity: "الكمية (كجم)",
      outOfStock: "نفد المخزون",
      new: "جديد",
      bestseller: "الأكثر مبيعاً",
      reviews: "تقييم",
      ingredients: "المكونات",
      nutritionFacts: "القيم الغذائية",
      addToFavorites: "أضف للمفضلة",
      kg: "كجم",
      perKg: "لكل كجم",
    },
  }), [])

  // Reset quantity when modal opens/closes or product changes
  useState(() => {
    if (isOpen && product) {
      setQuantityInKg(0.5)
    }
  })

  if (!product) return null

  const isRTL = language === "ar"
  const t = translations[language]
  const name = product.name[language]
  const description = product.description[language]
  const category = product.category[language]
  const ingredients = product.ingredients?.[language]

  const handleAddToCart = () => {
    // Passer la quantité actuelle au panier
    onAddToCart(product.id, quantityInKg)
    onClose()
    // Reset à 0.5 kg après ajout
    setQuantityInKg(0.5)
  }

  const handleToggleFavorite = () => {
    onToggleFavorite?.(product.id)
  }

  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0

  // Incréments et décréments en kg
  const incrementQuantity = () => {
    if (quantityInKg < 10) { // Limite maximale de 10kg
      setQuantityInKg(prev => parseFloat((prev + 0.1).toFixed(2)))
    }
  }

  const decrementQuantity = () => {
    if (quantityInKg > 0.1) { // Limite minimale de 0.1kg
      setQuantityInKg(prev => parseFloat((prev - 0.1).toFixed(2)))
    }
  }

  // Calcul du prix total pour la quantité sélectionnée
  const totalPrice = product.price * quantityInKg

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isRTL ? "rtl" : "ltr"}`}>
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-[#d0a84b] sr-only">
            {name} - {t.addToCart}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground" aria-label={t.new}>
                    {t.new}
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-[#d0a84b] text-primary-foreground" aria-label={t.bestseller}>
                    {t.bestseller}
                  </Badge>
                )}
              </div>

              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive" aria-label={`${discount}% discount`}>
                    -{discount}%
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View image ${index + 1} of ${product.images.length}`}
                    aria-current={index === selectedImageIndex}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${name} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
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
              <p className="text-[#847d7a] leading-relaxed">{description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} {t.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-bold text-[#d0a84b]">
                {product.price} MAD <span className="text-sm font-normal">/{t.perKg}</span>
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice} MAD
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="font-medium">{t.quantity}:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantityInKg <= 0.1}
                    aria-label="Decrease quantity by 0.1 kg"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[5ch] text-center" aria-live="polite">
                    {quantityInKg} {t.kg}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={incrementQuantity}
                    disabled={!product.inStock || quantityInKg >= 10}
                    aria-label="Increase quantity by 0.1 kg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price for Selected Quantity */}
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total pour {quantityInKg} {t.kg}:</span>
                  <span className="text-xl font-bold text-[#d0a84b]">
                    {totalPrice.toFixed(2)} MAD
                  </span>
                </div>
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
                {product.inStock ? `${t.addToCart} (${quantityInKg} ${t.kg})` : t.outOfStock}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleToggleFavorite}
                aria-label={isFavorited ? "Remove from favorites" : t.addToFavorites}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Additional Info */}
            {ingredients && (
              <div className="space-y-3 pt-4 border-t">
                <div>
                  <h4 className="font-semibold mb-2">{t.ingredients}</h4>
                  <p className="text-sm text-muted-foreground">
                    {ingredients}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}