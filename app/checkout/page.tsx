// src/app/checkout/page.tsx
"use client"
import { useState } from "react"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/hooks/use-cart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

interface OrderData {
  id: string;
}

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const { getItemCount } = useCart()

  const handleOrderComplete = (data: OrderData) => {
    setOrderData(data)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(data)
    localStorage.setItem("orders", JSON.stringify(orders))
  }

  if (orderData) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#e6d7c3] border-none shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-[#d4b05d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#d4b05d]" />
            </div>
            <h1 className="font-great-vibes text-3xl text-[#d4b05d] mb-3">Commande Confirmée !</h1>
            <p className="text-black/70 mb-6">Merci pour votre commande</p>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <p className="text-sm font-medium text-black mb-2">Numéro de Commande</p>
              <p className="font-mono text-2xl font-bold text-[#d4b05d]">{orderData.id}</p>
            </div>
            <div className="text-left space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-black/70">
                  Nous avons reçu votre commande et commencerons à préparer vos délicieuses pâtisseries marocaines immédiatement.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-black/70">
                  Vous recevrez un appel de confirmation dans les 24 heures pour confirmer vos détails de livraison.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowLeft className="h-5 w-5 text-[#d4b05d] mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-[#d4b05d]">
                  Rappel : Le paiement est dû à la livraison (Paiement à la Livraison)
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-medium rounded-lg transition-colors">
                  Retour à l&apos;Accueil
                </Button>
              </Link>
              <Link href="/#products">
                <Button variant="outline" className="w-full bg-transparent border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d]/10 py-6 text-lg font-medium rounded-lg transition-colors">
                  Continuer les Achats
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (getItemCount() === 0) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#e6d7c3] border-none shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-[#d4b05d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-[#d4b05d]" />
            </div>
            <h1 className="font-playfair text-2xl font-semibold text-black mb-3">Votre panier est vide</h1>
            <p className="text-black/70 mb-8">Ajoutez des articles à votre panier avant de procéder au paiement</p>
            <Link href="/#products">
              <Button className="bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-medium rounded-lg transition-colors">
                Continuer les Achats
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3]">
      <CheckoutForm onOrderComplete={handleOrderComplete} />
    </div>
  )
}