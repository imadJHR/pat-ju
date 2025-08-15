"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/hooks/use-cart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

const translations = {
  en: {
    orderConfirmed: "Order Confirmed!",
    thankYou: "Thank you for your order",
    orderNumber: "Order Number",
    orderDetails: "We've received your order and will begin preparing your delicious Moroccan pastries right away.",
    deliveryInfo: "You'll receive a confirmation call within 24 hours to confirm your delivery details.",
    paymentReminder: "Remember: Payment is due upon delivery (Cash on Delivery)",
    backToHome: "Back to Home",
    continueShopping: "Continue Shopping",
    emptyCart: "Your cart is empty",
    emptyCartDescription: "Add some items to your cart before proceeding to checkout",
  },
  fr: {
    orderConfirmed: "Commande Confirmée !",
    thankYou: "Merci pour votre commande",
    orderNumber: "Numéro de Commande",
    orderDetails:
      "Nous avons reçu votre commande et commencerons à préparer vos délicieuses pâtisseries marocaines immédiatement.",
    deliveryInfo: "Vous recevrez un appel de confirmation dans les 24 heures pour confirmer vos détails de livraison.",
    paymentReminder: "Rappel : Le paiement est dû à la livraison (Paiement à la Livraison)",
    backToHome: "Retour à l'Accueil",
    continueShopping: "Continuer les Achats",
    emptyCart: "Votre panier est vide",
    emptyCartDescription: "Ajoutez des articles à votre panier avant de procéder au paiement",
  },
  ar: {
    orderConfirmed: "تم تأكيد الطلب!",
    thankYou: "شكراً لك على طلبك",
    orderNumber: "رقم الطلب",
    orderDetails: "لقد تلقينا طلبك وسنبدأ في تحضير المعجنات المغربية اللذيذة على الفور.",
    deliveryInfo: "ستتلقى مكالمة تأكيد خلال 24 ساعة لتأكيد تفاصيل التسليم.",
    paymentReminder: "تذكير: الدفع مستحق عند التسليم (الدفع عند الاستلام)",
    backToHome: "العودة للرئيسية",
    continueShopping: "متابعة التسوق",
    emptyCart: "سلتك فارغة",
    emptyCartDescription: "أضف بعض العناصر إلى سلتك قبل المتابعة للدفع",
  },
}

export default function CheckoutPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en")
  const [orderData, setOrderData] = useState<any>(null)
  const { items, getItemCount } = useCart()
  const router = useRouter()
  const t = translations[language]
  const isRTL = language === "ar"

  // Get language from localStorage or URL params
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage) {
      setLanguage(savedLanguage)
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const handleOrderComplete = (data: any) => {
    setOrderData(data)
    // Save order to localStorage for order tracking
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(data)
    localStorage.setItem("orders", JSON.stringify(orders))
  }

  // Show order confirmation
  if (orderData) {
    return (
      <div className={`min-h-screen bg-background flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"}`}>
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="font-great-vibes text-2xl text-primary mb-2">{t.orderConfirmed}</h1>
            <p className="text-muted-foreground mb-4">{t.thankYou}</p>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium mb-1">{t.orderNumber}</p>
              <p className="font-mono text-lg font-bold text-primary">{orderData.id}</p>
            </div>

            <div className="text-left space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{t.orderDetails}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{t.deliveryInfo}</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowLeft className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-primary">{t.paymentReminder}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/90">{t.backToHome}</Button>
              </Link>
              <Link href="/#products">
                <Button variant="outline" className="w-full bg-transparent">
                  {t.continueShopping}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show empty cart message
  if (getItemCount() === 0) {
    return (
      <div className={`min-h-screen bg-background flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"}`}>
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-playfair text-xl font-semibold mb-2">{t.emptyCart}</h1>
            <p className="text-muted-foreground mb-6">{t.emptyCartDescription}</p>
            <Link href="/#products">
              <Button className="bg-primary hover:bg-primary/90">{t.continueShopping}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutForm language={language} onOrderComplete={handleOrderComplete} />
    </div>
  )
}
