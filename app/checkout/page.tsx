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
      <div className={`min-h-screen bg-[#f9f7f3] flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"}`}>
        <Card className="w-full max-w-md bg-[#e6d7c3] border-none shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-[#d4b05d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#d4b05d]" />
            </div>
            <h1 className="font-great-vibes text-3xl text-[#d4b05d] mb-3">{t.orderConfirmed}</h1>
            <p className="text-black/70 mb-6">{t.thankYou}</p>

            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <p className="text-sm font-medium text-black mb-2">{t.orderNumber}</p>
              <p className="font-mono text-2xl font-bold text-[#d4b05d]">{orderData.id}</p>
            </div>

            <div className="text-left space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-black/70">{t.orderDetails}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-black/70">{t.deliveryInfo}</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowLeft className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-[#d4b05d]">{t.paymentReminder}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-medium rounded-lg transition-colors">
                  {t.backToHome}
                </Button>
              </Link>
              <Link href="/#products">
                <Button variant="outline" className="w-full bg-transparent border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d]/10 py-6 text-lg font-medium rounded-lg transition-colors">
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
      <div className={`min-h-screen bg-[#f9f7f3] flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"}`}>
        <Card className="w-full max-w-md bg-[#e6d7c3] border-none shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-[#d4b05d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-[#d4b05d]" />
            </div>
            <h1 className="font-playfair text-2xl font-semibold text-black mb-3">{t.emptyCart}</h1>
            <p className="text-black/70 mb-8">{t.emptyCartDescription}</p>
            <Link href="/#products">
              <Button className="bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-medium rounded-lg transition-colors">
                {t.continueShopping}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3]">
      <CheckoutForm language={language} onOrderComplete={handleOrderComplete} />
    </div>
  )
}
