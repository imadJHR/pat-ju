"use client"
import { useState, useCallback, memo } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
import type { Product } from "@/types/product"

const translations = {
  en: {
    addToCart: "Add to Cart",
    quickView: "Quick View",
    outOfStock: "Out of Stock",
    new: "New",
    bestseller: "Bestseller",
    reviews: "reviews",
    viewProduct: "View product details",
    selectImage: "Select image",
    currentImage: "Current image",
    rating: "Rating",
    outOf5: "out of 5",
    perKg: "per kg",
  },
  fr: {
    addToCart: "Ajouter au Panier",
    quickView: "Aperçu Rapide",
    outOfStock: "Rupture de Stock",
    new: "Nouveau",
    bestseller: "Bestseller",
    reviews: "avis",
    viewProduct: "Voir les détails du produit",
    selectImage: "Sélectionner l'image",
    currentImage: "Image actuelle",
    rating: "Note",
    outOf5: "sur 5",
    perKg: "par kg",
  },
  ar: {
    addToCart: "أضف للسلة",
    quickView: "عرض سريع",
    outOfStock: "نفد المخزون",
    new: "جديد",
    bestseller: "الأكثر مبيعاً",
    reviews: "تقييم",
    viewProduct: "عرض تفاصيل المنتج",
    selectImage: "اختر الصورة",
    currentImage: "الصورة الحالية",
    rating: "التقييم",
    outOf5: "من 5",
    perKg: "لكل كجم",
  },
}

interface ProductCardProps {
  product: Product
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string, quantityInKg?: number) => void
  onQuickView: (productId: string) => void
  isPriority?: boolean
}

export const ProductCard = memo(function ProductCard({
  product,
  language,
  onAddToCart,
  onQuickView,
  isPriority = false,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const isRTL = language === "ar"
  const name = product.name[language]
  const description = product.description[language]
  const category = product.category[language]
  const t = translations[language]

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickView(product.id)
  }, [onQuickView, product.id])

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    // S'assurer de passer un nombre valide
    onAddToCart(product.id, 0.5)
  }, [onAddToCart, product.id])

  const handleImageSelect = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setCurrentImageIndex(index)
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card
      className={`group bg-[#f4ead5] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-xl border-none ${isRTL ? "rtl" : "ltr"}`}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      role="article"
      aria-label={name}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.images[currentImageIndex] || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          priority={isPriority}
        />

        {/* Hover Overlay with Actions */}
        <div
          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4"
          aria-hidden="true"
        >
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground shadow-lg rounded-full px-4 py-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30"
            onClick={handleQuickView}
            onKeyDown={(e) => e.key === 'Enter' && handleQuickView(e as any)}
          >
            <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
            {t.quickView}
          </Button>
        </div>

        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <Badge
              className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full text-xs"
              aria-label={t.new}
            >
              {t.new}
            </Badge>
          )}
          {product.isBestseller && (
            <Badge
              className="bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full text-xs"
              aria-label={t.bestseller}
            >
              {t.bestseller}
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              variant="destructive"
              className="font-medium px-2 py-0.5 rounded-full text-xs"
              aria-label={t.outOfStock}
            >
              {t.outOfStock}
            </Badge>
          )}
        </div>

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10"
            role="tablist"
            aria-label={`${t.selectImage} for ${name}`}
          >
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30 ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                onClick={() => handleImageSelect(index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                role="tab"
                aria-selected={index === currentImageIndex}
                aria-label={`${t.selectImage} ${index + 1} ${index === currentImageIndex ? `, ${t.currentImage}` : ''}`}
                tabIndex={0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-4 bg-white rounded-b-xl">
        <div className="space-y-2">
          <p className="text-sm text-[#918981] font-medium">{category}</p>

          <h3 className="font-playfair text-lg font-semibold text-foreground line-clamp-1">
            {name}
          </h3>

          <p className="text-sm text-[#918981] line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Rating */}
          <div
            className="flex items-center gap-1"
            aria-label={`${t.rating}: ${product.rating} ${t.outOf5} from ${product.reviewCount} ${t.reviews}`}
          >
            <div className="flex" role="img" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {product.rating} ({product.reviewCount} {t.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-bold text-[#d0a84b]">
              {formatPrice(product.price)} <span className="text-sm font-normal">/{t.perKg}</span>
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-[#d0a84b] hover:bg-[#b8953a] text-primary-foreground font-medium transition-all duration-200 rounded-lg py-2 mt-2 focus:ring-2 focus:ring-[#d0a84b] focus:ring-offset-2"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            aria-label={product.inStock ? `${t.addToCart} ${name} (0.5 kg)` : t.outOfStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
            {product.inStock ? `${t.addToCart} (0.5 kg)` : t.outOfStock}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})