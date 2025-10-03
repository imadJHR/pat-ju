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

// --- FIX 1: Define specific types to avoid 'any' ---
type Translatable = {
  fr?: string
  en?: string
  ar?: string
}

// Assuming the shape of these types from their usage
export interface CartItem {
  id: string
  name: string | Translatable
  image?: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  firstName: string
  lastName:string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  notes?: string
}
// --- End of FIX 1 ---

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

// --- IMPROVEMENT 1: Correct WhatsApp number format ---
// Le format international pour wa.me n'inclut pas le '+'
const WHATSAPP_PHONE = "212666890902" // Remplacez par votre numéro Maroc

const WHATSAPP_MESSAGE_TEMPLATE = `
Nouvelle commande reçue!

Commande ID: {orderId}
Date: {orderDate}

🛒 PRODUITS:
{products}

👤 INFORMATIONS CLIENT:
Nom: {firstName} {lastName}
Email: {email}
Téléphone: {phone}
Adresse: {address}
Ville: {city}
Code Postal: {postalCode}
Notes: {notes}

💰 TOTAL: {total} MAD
Méthode de paiement: Paiement à la livraison
`.trim()

// --- IMPROVEMENT 2: Add more specific validation for Moroccan phone numbers ---
const formSchema = z.object({
  firstName: z.string().min(1, "Ce champ est requis"),
  lastName: z.string().min(1, "Ce champ est requis"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string()
    .regex(/^0[5-7]\d{8}$/, "Le numéro doit être un format marocain valide (ex: 0612345678)"),
  address: z.string().min(1, "Ce champ est requis"),
  city: z.string().min(1, "Ce champ est requis"),
  postalCode: z.string().min(1, "Ce champ est requis"),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof formSchema>

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, getSubtotal, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(formSchema),
  })

  const subtotal = getSubtotal()
  const shipping = 0
  const total = subtotal + shipping

  // --- FIX 2: Update function to use the `Translatable` type ---
  const getSafeProductName = (item: CartItem): string => {
    if (!item.name) return "Produit"
    
    // Si le nom est un objet de traductions, prendre le français
    if (typeof item.name === 'object' && item.name !== null) {
      // Cast to our specific Translatable type, not 'any'
      const nameTranslations = item.name as Translatable
      return nameTranslations.fr || nameTranslations.en || "Produit"
    }
    
    // Si c'est déjà une string, la retourner directement
    return item.name.toString()
  }
  // --- End of FIX 2 ---

  // Fonction pour formater les produits dans le message
  const formatProductsMessage = (items: CartItem[]): string => {
    return items.map(item => {
      const productName = getSafeProductName(item)
      return `• ${productName} (${item.quantity} kg) - ${(item.price * item.quantity).toFixed(2)} MAD`
    }).join('\n')
  }

  // Fonction pour envoyer la commande vers WhatsApp
  const sendOrderToWhatsApp = (orderData: OrderData, formData: CheckoutFormData) => {
    const productsText = formatProductsMessage(items)
    const orderDate = new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const message = WHATSAPP_MESSAGE_TEMPLATE
      .replace('{orderId}', orderData.id)
      .replace('{orderDate}', orderDate)
      .replace('{products}', productsText)
      .replace('{firstName}', formData.firstName)
      .replace('{lastName}', formData.lastName)
      .replace('{email}', formData.email)
      .replace('{phone}', formData.phone)
      .replace('{address}', formData.address)
      .replace('{city}', formData.city)
      .replace('{postalCode}', formData.postalCode)
      .replace('{notes}', formData.notes || 'Aucune note')
      .replace('{total}', total.toFixed(2))

    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message)
    // Créer l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`

    // Ouvrir dans un nouvel onglet
    window.open(whatsappUrl, '_blank')
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)

    // Simule une requête réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const orderData: OrderData = {
      id: `ORD-${Date.now()}`,
      items,
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

    // 1. Envoyer la commande vers WhatsApp
    sendOrderToWhatsApp(orderData, data)

    // 2. Appeler la callback pour compléter la commande
    onOrderComplete(orderData)

    // 3. Vider le panier
    clearCart()

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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                </form>
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
                  {items.map((item) => {
                    const productName = getSafeProductName(item)
                    return (
                      <div key={item.id} className="flex items-start gap-4 p-3 bg-white rounded-lg">
                        <div className="w-14 h-14 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={productName}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-black line-clamp-1">
                            {productName}
                          </h4>
                          <p className="text-xs text-black/60">
                            {item.quantity} kg × {item.price.toFixed(2)} MAD
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-[#d4b05d]">
                          {(item.price * item.quantity).toFixed(2)} MAD
                        </span>
                      </div>
                    )
                  })}
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 text-center">
                    <strong>Important :</strong> Après validation, vous serez redirigé vers WhatsApp pour confirmer votre commande
                  </p>
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
                      Préparation de la commande...
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