"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"
import type { CartItem } from "@/types/cart"

interface CartDrawerProps {
  language: "en" | "fr" | "ar"
}

const translations = {
  en: {
    cart: "Shopping Cart",
    empty: "Your cart is empty",
    emptyDescription: "Add some delicious pastries to get started",
    continueShopping: "Continue Shopping",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    checkout: "Proceed to Checkout",
    remove: "Remove",
    quantity: "Quantity",
    free: "Free",
    decreaseQuantity: "Decrease quantity by 0.1 kg",
    increaseQuantity: "Increase quantity by 0.1 kg",
    removeItem: "Remove item",
    items: "items",
    item: "item",
    kg: "kg",
    totalWeight: "Total Weight",
  },
  fr: {
    cart: "Panier",
    empty: "Votre panier est vide",
    emptyDescription: "Ajoutez de délicieuses pâtisseries pour commencer",
    continueShopping: "Continuer les Achats",
    subtotal: "Sous-total",
    shipping: "Livraison",
    total: "Total",
    checkout: "Procéder au Paiement",
    remove: "Supprimer",
    quantity: "Quantité",
    free: "Gratuit",
    decreaseQuantity: "Diminuer la quantité de 0.1 kg",
    increaseQuantity: "Augmenter la quantité de 0.1 kg",
    removeItem: "Supprimer l'article",
    items: "articles",
    item: "article",
    kg: "kg",
    totalWeight: "Poids Total",
  },
  ar: {
    cart: "سلة التسوق",
    empty: "سلتك فارغة",
    emptyDescription: "أضف بعض المعجنات اللذيذة للبدء",
    continueShopping: "متابعة التسوق",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    total: "المجموع",
    checkout: "المتابعة للدفع",
    remove: "إزالة",
    quantity: "الكمية",
    free: "مجاني",
    decreaseQuantity: "تقليل الكمية بمقدار ٠.١ كجم",
    increaseQuantity: "زيادة الكمية بمقدار ٠.١ كجم",
    removeItem: "إزالة العنصر",
    items: "عناصر",
    item: "عنصر",
    kg: "كجم",
    totalWeight: "الوزن الإجمالي",
  },
}

// Configuration des frais de port
const SHIPPING_CONFIG = {
  fee: 30,
  freeThreshold: 500,
  currency: "MAD"
} as const

export function CartDrawer({ language }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getItemCount, getSubtotal, getTotalWeight } = useCart()
  
  const t = translations[language]
  const isRTL = language === "ar"

  // Validation des données
  const safeItems = Array.isArray(items) ? items : []
  const itemCount = getItemCount?.() || 0
  const subtotal = getSubtotal?.() || 0
  const totalWeight = getTotalWeight?.() || 0
  
  const shipping = subtotal > SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.fee
  const total = subtotal + shipping

  // Formater les prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  // Fonction pour obtenir le nom sécurisé d'un produit
  const getSafeProductName = (item: CartItem): string => {
    if (!item.name) return "Produit"
    
    // Si le nom est un objet de traductions, prendre la bonne langue
    if (typeof item.name === 'object' && item.name !== null) {
      return (item.name as any)[language] || item.name.fr || item.name.en || "Produit"
    }
    
    // Si c'est déjà une string, la retourner directement
    return item.name.toString()
  }

  // Fonction pour obtenir la catégorie sécurisée
  const getSafeCategory = (item: CartItem): string => {
    if (!item.category) return ""
    
    // Si la catégorie est un objet de traductions
    if (typeof item.category === 'object' && item.category !== null) {
      return (item.category as any)[language] || item.category.fr || item.category.en || ""
    }
    
    // Si c'est déjà une string
    return item.category.toString()
  }

  const handleQuantityDecrease = (item: CartItem) => {
    const newQuantity = parseFloat((item.quantity - 0.1).toFixed(2))
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleQuantityIncrease = (item: CartItem) => {
    const newQuantity = parseFloat((item.quantity + 0.1).toFixed(2))
    updateQuantity(item.id, newQuantity)
  }

  const getItemCountText = () => {
    if (itemCount === 1) return `1 ${t.item}`
    return `${itemCount} ${t.items}`
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className={`w-full sm:max-w-lg bg-[#e6d7c3] ${isRTL ? "rtl" : "ltr"} flex flex-col`}
        aria-label={t.cart}
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#d4b05d]/20">
          <SheetTitle className="font-playfair text-2xl font-semibold text-[#d4b05d] flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-[#d4b05d]" aria-hidden="true" />
            {t.cart}
            {itemCount > 0 && (
              <Badge 
                className="bg-[#d4b05d] text-white ml-2"
                aria-label={getItemCountText()}
              >
                {itemCount}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Conditional Rendering: Show empty state or cart items */}
        {safeItems.length === 0 ? (
          // Empty Cart State
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <ShoppingCart className="h-20 w-20 text-[#d4b05d]/30 mb-6" aria-hidden="true" />
            <h3 className="font-playfair text-xl font-semibold text-black mb-2">{t.empty}</h3>
            <p className="text-black/70 mb-8 max-w-sm">{t.emptyDescription}</p>
            <Button
              onClick={closeCart}
              className="bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white font-medium transition-colors focus:ring-2 focus:ring-[#d4b05d] focus:ring-offset-2"
            >
              {t.continueShopping}
            </Button>
          </div>
        ) : (
          // Cart with items
          <>
            {/* Cart Items List */}
            <div 
              className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
              aria-live="polite"
              aria-label={`${getItemCountText()} in cart`}
            >
              {safeItems.map((item) => {
                const productName = getSafeProductName(item)
                const category = getSafeCategory(item)
                
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-black/10"
                    role="listitem"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={productName}
                        fill
                        sizes="80px"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-medium text-lg text-black line-clamp-1">{productName}</h4>
                      {category && (
                        <p className="text-sm text-black/60">{category}</p>
                      )}
                      
                      {/* Price per kg and total for quantity */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-black/70">
                          {formatPrice(item.price)} / {t.kg}
                        </div>
                        <div className="font-bold text-[#d4b05d]">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex items-center gap-2 border border-black/20 rounded-md px-2 py-1"
                            role="group"
                            aria-label={`${t.quantity} for ${productName}`}
                          >
                            <button
                              type="button"
                              className="p-1 text-black/60 hover:text-[#d4b05d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4b05d] focus:ring-offset-1 rounded"
                              onClick={() => handleQuantityDecrease(item)}
                              aria-label={t.decreaseQuantity}
                              disabled={item.quantity <= 0.1}
                            >
                              <Minus className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <span 
                              className="w-12 text-center text-sm font-medium"
                              aria-live="polite"
                            >
                              {item.quantity} {t.kg}
                            </span>
                            <button
                              type="button"
                              className="p-1 text-black/60 hover:text-[#d4b05d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4b05d] focus:ring-offset-1 rounded"
                              onClick={() => handleQuantityIncrease(item)}
                              aria-label={t.increaseQuantity}
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="p-1 text-black/40 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                            onClick={() => removeItem(item.id)}
                            aria-label={`${t.removeItem} ${productName}`}
                          >
                            <Trash2 className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary & Checkout */}
            <div className="p-6 pt-4 border-t border-black/10 bg-[#e6d7c3] space-y-4">
              {/* Total Weight */}
              <div className="flex justify-between text-lg font-medium text-black">
                <span>{t.totalWeight}:</span>
                <span>{totalWeight} {t.kg}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-lg font-medium text-black">
                  <span>{t.subtotal}</span>
                  <span>{formatPrice(subtotal)} {SHIPPING_CONFIG.currency}</span>
                </div>
                <div className="flex justify-between text-lg text-black/70">
                  <span>{t.shipping}</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#d4b05d]">{t.free}</span>
                    ) : (
                      `${formatPrice(shipping)} ${SHIPPING_CONFIG.currency}`
                    )}
                  </span>
                </div>
                {subtotal < SHIPPING_CONFIG.freeThreshold && (
                  <p className="text-sm text-black/60 text-center">
                    {isRTL ? 
                      `أضف ${formatPrice(SHIPPING_CONFIG.freeThreshold - subtotal)} ${SHIPPING_CONFIG.currency} أخرى للشحن المجاني` :
                      `Add ${formatPrice(SHIPPING_CONFIG.freeThreshold - subtotal)} ${SHIPPING_CONFIG.currency} more for free shipping`
                    }
                  </p>
                )}
                <Separator className="my-3 bg-black/10" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-black">{t.total}</span>
                  <span className="text-[#d4b05d]">
                    {formatPrice(total)} {SHIPPING_CONFIG.currency}
                  </span>
                </div>
              </div>
              
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button 
                  className="w-full bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-[#d4b05d] focus:ring-offset-2"
                  aria-label={`${t.checkout} - ${formatPrice(total)} ${SHIPPING_CONFIG.currency}`}
                >
                  {t.checkout}
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}