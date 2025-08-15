"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

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
  const { items, isOpen, closeCart, removeItem, updateQuantity, getItemCount, getSubtotal } = useCart()
  const t = translations[language]
  const isRTL = language === "ar"

  const subtotal = getSubtotal()
  const shipping = subtotal > 500 ? 0 : 59.9
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side={isRTL ? "left" : "right"} className={`w-full sm:max-w-lg ${isRTL ? "rtl" : "ltr"}`}>
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="font-playfair text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {t.cart}
            {getItemCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getItemCount()}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-playfair text-lg font-semibold mb-2">{t.empty}</h3>
              <p className="text-muted-foreground mb-6">{t.emptyDescription}</p>
              <Button onClick={closeCart} className="bg-primary hover:bg-primary/90">
                {t.continueShopping}
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name[language]}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name[language]}</h4>
                        <p className="text-xs text-muted-foreground">{item.category[language]}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-primary">{item.price.toFixed(2)} MAD</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t.subtotal}</span>
                    <span>{subtotal.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t.shipping}</span>
                    <span>{shipping === 0 ? t.free : `${shipping.toFixed(2)} MAD`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>{t.total}</span>
                    <span className="text-primary">{total.toFixed(2)} MAD</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                    {t.checkout}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
