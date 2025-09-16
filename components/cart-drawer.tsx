"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"

// Define the props interface for the component
interface CartDrawerProps {
  language: "en" | "fr" | "ar"
}

// Translations for multi-language support
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
  },
}

export function CartDrawer({ language }: CartDrawerProps) {
  // Destructure cart state and actions from the custom hook
  const { items, isOpen, closeCart, removeItem, updateQuantity, getItemCount, getSubtotal } = useCart()
  
  // Select the correct translation based on the language prop
  const t = translations[language]
  const isRTL = language === "ar"

  // Calculate costs
  const subtotal = getSubtotal()
  const shippingFee = 30 // Example shipping fee of 30 MAD
  const shipping = subtotal > 500 ? 0 : shippingFee // Free shipping for orders over 500 MAD
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className={`w-full sm:max-w-lg bg-[#e6d7c3] ${isRTL ? "rtl" : "ltr"} flex flex-col`}
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#d4b05d]/20">
          <SheetTitle className="font-playfair text-2xl font-semibold text-[#d4b05d] flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-[#d4b05d]" />
            {t.cart}
            {getItemCount() > 0 && (
              <Badge className="bg-[#d4b05d] text-white ml-2">{getItemCount()}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Conditional Rendering: Show empty state or cart items */}
        {items.length === 0 ? (
          // Empty Cart State
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <ShoppingCart className="h-20 w-20 text-[#d4b05d]/30 mb-6" />
            <h3 className="font-playfair text-xl font-semibold text-black mb-2">{t.empty}</h3>
            <p className="text-black/70 mb-8 max-w-sm">{t.emptyDescription}</p>
            <Button
              onClick={closeCart}
              className="bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white font-medium transition-colors"
            >
              {t.continueShopping}
            </Button>
          </div>
        ) : (
          // Cart with items
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-black/10"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name[language]}
                    width={80}
                    height={80}
                    className="object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-medium text-lg text-black line-clamp-1">{item.name[language]}</h4>
                    <p className="text-sm text-black/60">{item.category[language]}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-[#d4b05d]">{item.price.toFixed(2)} MAD</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-black/20 rounded-md px-2 py-1">
                          <button
                            type="button"
                            className="p-1 text-black/60 hover:text-[#d4b05d] transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-1 text-black/60 hover:text-[#d4b05d] transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="p-1 text-black/40 hover:text-red-500 transition-colors"
                          onClick={() => removeItem(item.id)}
                          aria-label={t.remove}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary & Checkout */}
            <div className="p-6 pt-4 border-t border-black/10 bg-[#e6d7c3]">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg font-medium text-black">
                  <span>{t.subtotal}</span>
                  <span>{subtotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-lg text-black/70">
                  <span>{t.shipping}</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-[#d4b05d]">{t.free}</span> : `${shipping.toFixed(2)} MAD`}
                  </span>
                </div>
                <Separator className="my-3 bg-black/10" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-black">{t.total}</span>
                  <span className="text-[#d4b05d]">{total.toFixed(2)} MAD</span>
                </div>
              </div>
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button className="w-full bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-semibold rounded-lg transition-colors">
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