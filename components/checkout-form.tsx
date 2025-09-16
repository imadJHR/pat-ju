"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Truck, MapPin, Phone, Mail, User } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { ShippingAddress, CartItem } from "@/types/cart"

interface CheckoutFormProps {
  onOrderComplete: (orderData: OrderData) => void
}

interface OrderData {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  subtotal: number
  shipping: number
  total: number
  paymentMethod: "cod"
  status: "pending"
  createdAt: Date
}

// Schéma de validation Zod avec les messages en français
const formSchema = z.object({
  firstName: z.string().min(1, "Ce champ est requis"),
  lastName: z.string().min(1, "Ce champ est requis"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  address: z.string().min(1, "Ce champ est requis"),
  city: z.string().min(1, "Ce champ est requis"),
  postalCode: z.string().min(1, "Ce champ est requis"),
  notes: z.string().optional(),
})

// FIX 1: Infer the form's data type directly from the Zod schema.
type CheckoutFormData = z.infer<typeof formSchema>

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, getSubtotal, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    // FIX 2: Use the inferred type for useForm.
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(formSchema),
  })

  const subtotal = getSubtotal()
  // La livraison est toujours gratuite
  const shipping = 0
  const total = subtotal + shipping

  // FIX 3: Use the inferred type in the onSubmit function signature.
  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)
    // Simule une requête réseau
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderData: OrderData = {
      id: `ORD-${Date.now()}`,
      items,
      // FIX 4: Construct the full ShippingAddress object by adding the missing 'country' field.
      shippingAddress: {
        ...data,
        country: "Morocco",
      },
      subtotal,
      shipping,
      total,
      paymentMethod: "cod",
      status: "pending",
      createdAt: new Date(),
    }

    clearCart()
    onOrderComplete(orderData)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-great-vibes text-3xl md:text-4xl text-[#d4b05d] mb-10 text-center">
          Commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Colonne de gauche : Livraison & Paiement */}
          <div className="space-y-8">
            {/* Carte d'informations de livraison */}
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#d4b05d] font-playfair text-xl">
                  <MapPin className="h-6 w-6 text-[#d4b05d]" />
                  Informations de Livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* NOTE: We removed the <form> tag here because handleSubmit will manage it */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black flex items-center gap-2">
                        <User className="h-4 w-4 text-[#d4b05d]" />
                        Prénom
                      </Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={`bg-white border-black/20 ${errors.firstName ? "border-red-500" : ""}`}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-black">
                        Nom
                      </Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={`bg-white border-black/20 ${errors.lastName ? "border-red-500" : ""}`}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#d4b05d]" />
                        Adresse Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`bg-white border-black/20 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-black flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#d4b05d]" />
                        Numéro de Téléphone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={`bg-white border-black/20 ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-black">
                      Adresse
                    </Label>
                    <Input
                      id="address"
                      {...register("address")}
                      className={`bg-white border-black/20 ${errors.address ? "border-red-500" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-black">
                        Ville
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={`bg-white border-black/20 ${errors.city ? "border-red-500" : ""}`}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-black">
                        Code Postal
                      </Label>
                      <Input
                        id="postalCode"
                        {...register("postalCode")}
                        className={`bg-white border-black/20 ${errors.postalCode ? "border-red-500" : ""}`}
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-black">
                      Notes de Commande (Optionnel)
                    </Label>
                    <Textarea
                      id="notes"
                      {...register("notes")}
                      placeholder="Instructions spéciales pour votre commande..."
                      className="bg-white border-black/20 min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte du mode de paiement */}
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#d4b05d] font-playfair text-xl">
                  <CreditCard className="h-6 w-6 text-[#d4b05d]" />
                  Mode de Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 border border-[#d4b05d] rounded-lg bg-white">
                  <Truck className="h-8 w-8 text-[#d4b05d]" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#d4b05d]">Paiement à la Livraison</h4>
                    <p className="text-black/70">Payez à la réception de votre commande</p>
                  </div>
                  <Badge className="bg-[#d4b05d] text-white">Sélectionné</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de droite : Résumé de la commande */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#d4b05d] font-playfair text-xl">
                  Résumé de la Commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Articles de la commande */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 bg-white rounded-lg">
                      <div className="w-14 h-14 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name.fr}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-black line-clamp-1">
                          {item.name.fr}
                        </h4>
                        <p className="text-xs text-black/60">
                          {item.quantity} × {item.price.toFixed(2)} MAD
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#d4b05d]">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totaux de la commande */}
                <Separator className="bg-black/20" />
                <div className="space-y-3">
                  <div className="flex justify-between text-black">
                    <span>Sous-total</span>
                    <span className="font-medium">{subtotal.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Livraison</span>
                    <span className="font-medium">
                      <span className="text-[#d4b05d]">Gratuit</span>
                    </span>
                  </div>
                  <Separator className="bg-black/20" />
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-[#d4b05d]">{total.toFixed(2)} MAD</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-[#d4b05d] hover:bg-[#b89943] text-white py-6 text-lg font-medium rounded-lg transition-colors mt-4"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </>
                  ) : (
                    "Passer la Commande"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}