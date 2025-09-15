"use client"
import { useState, useCallback, memo } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
// Assuming your Product type matches the data you provided
// It should include `price: number` and `originalPrice?: number`
import type { Product } from "@/types/product"

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

interface ProductCardProps {
  product: Product
  language: "en" | "fr" | "ar"
  onAddToCart: (productId: string) => void
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

  const handleQuickView = useCallback(() => {
    onQuickView(product.id)
  }, [onQuickView, product.id])

  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id)
  }, [onAddToCart, product.id])

  // Helper for price formatting.
  // The currency is set to MAD (Moroccan Dirham) based on the product data.
  // Note: This function is no longer used by the new price style but is kept for potential future use.
  const formatPrice = (priceValue: number) => {
    return new Intl.NumberFormat(language, {
      style: "currency",
      currency: "MAD",
    }).format(priceValue);
  }

  return (
    <Card
      className={`group bg-[#f4ead5] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-xl border-none ${isRTL ? "rtl" : "ltr"}`}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
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
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground shadow-lg rounded-full px-4 py-2"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4 mr-1" />
            {t.quickView}
          </Button>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && <Badge className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full text-xs">{t.new}</Badge>}
          {product.isBestseller && <Badge className="bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full text-xs">{t.bestseller}</Badge>}
          {!product.inStock && <Badge variant="destructive" className="font-medium px-2 py-0.5 rounded-full text-xs">{t.outOfStock}</Badge>}
        </div>
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Card Content */}
      <CardContent className="p-4 bg-white rounded-b-xl">
        <div className="space-y-2">
          <p className="text-sm text-[#918981] font-medium">{category}</p>
          <h3 className="font-playfair text-lg font-semibold text-foreground line-clamp-1">{name}</h3>
          <p className="text-sm text-[#918981] line-clamp-2 leading-relaxed">{description}</p>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {product.rating} ({product.reviewCount} {t.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#d0a84b]">{product.price} MAD</span>
          </div>

          <Button
            className="w-full bg-[#d0a84b] hover:bg-[#b8953a] text-primary-foreground font-medium transition-all duration-200 rounded-lg py-2 mt-2"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? t.addToCart : t.outOfStock}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})