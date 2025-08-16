"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Truck, MapPin, Phone, Mail, User } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { ShippingAddress } from "@/types/cart"

interface CheckoutFormProps {
  language: "en" | "fr" | "ar"
  onOrderComplete: (orderData: any) => void
}

const translations = {
  en: {
    checkout: "Checkout",
    shippingInfo: "Shipping Information",
    orderSummary: "Order Summary",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    codDescription: "Pay when your order arrives at your doorstep",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Street Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    notes: "Order Notes (Optional)",
    notesPlaceholder: "Any special instructions for your order...",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    placeOrder: "Place Order",
    free: "Free",
    processing: "Processing...",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
  },
  fr: {
    checkout: "Commande",
    shippingInfo: "Informations de Livraison",
    orderSummary: "Résumé de la Commande",
    paymentMethod: "Mode de Paiement",
    cashOnDelivery: "Paiement à la Livraison",
    codDescription: "Payez à la réception de votre commande",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse Email",
    phone: "Numéro de Téléphone",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code Postal",
    country: "Pays",
    notes: "Notes de Commande (Optionnel)",
    notesPlaceholder: "Instructions spéciales pour votre commande...",
    subtotal: "Sous-total",
    shipping: "Livraison",
    total: "Total",
    placeOrder: "Passer la Commande",
    free: "Gratuit",
    processing: "Traitement...",
    required: "Ce champ est requis",
    invalidEmail: "Veuillez entrer une adresse email valide",
    invalidPhone: "Veuillez entrer un numéro de téléphone valide",
  },
  ar: {
    checkout: "الدفع",
    shippingInfo: "معلومات الشحن",
    orderSummary: "ملخص الطلب",
    paymentMethod: "طريقة الدفع",
    cashOnDelivery: "الدفع عند الاستلام",
    codDescription: "ادفع عند وصول طلبك إلى باب منزلك",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "عنوان البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "عنوان الشارع",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    country: "البلد",
    notes: "ملاحظات الطلب (اختياري)",
    notesPlaceholder: "أي تعليمات خاصة لطلبك...",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    total: "المجموع",
    placeOrder: "تأكيد الطلب",
    free: "مجاني",
    processing: "جاري المعالجة...",
    required: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    invalidPhone: "يرجى إدخال رقم هاتف صحيح",
  },
}

const createSchema = (t: any) =>
  z.object({
    firstName: z.string().min(1, t.required),
    lastName: z.string().min(1, t.required),
    email: z.string().email(t.invalidEmail),
    phone: z.string().min(10, t.invalidPhone),
    address: z.string().min(1, t.required),
    city: z.string().min(1, t.required),
    postalCode: z.string().min(1, t.required),
    country: z.string().min(1, t.required),
    notes: z.string().optional(),
  })

export function CheckoutForm({ language, onOrderComplete }: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, getSubtotal, clearCart } = useCart()
  const t = translations[language]
  const isRTL = language === "ar"
  const schema = createSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(schema),
  })

  const subtotal = getSubtotal()
  const shipping = subtotal > 500 ? 0 : 59.9
  const total = subtotal + shipping

  const onSubmit = async (data: ShippingAddress) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const orderData = {
      id: `ORD-${Date.now()}`,
      items,
      shippingAddress: data,
      subtotal,
      shipping,
      total,
      paymentMethod: "cod" as const,
      status: "pending" as const,
      createdAt: new Date(),
    }
    clearCart()
    onOrderComplete(orderData)
    setIsProcessing(false)
  }

  return (
    <div className={`min-h-screen bg-[#f9f7f3] py-12 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-great-vibes text-3xl md:text-4xl text-[#d4b05d] mb-10 text-center">
          {t.checkout}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Shipping & Payment */}
          <div className="space-y-8">
            {/* Shipping Information Card */}
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#d4b05d] font-playfair text-xl">
                  <MapPin className="h-6 w-6 text-[#d4b05d]" />
                  {t.shippingInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black flex items-center gap-2">
                        <User className="h-4 w-4 text-[#d4b05d]" />
                        {t.firstName}
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
                        {t.lastName}
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
                        {t.email}
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
                        {t.phone}
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
                      {t.address}
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-black">
                        {t.city}
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
                        {t.postalCode}
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
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-black">
                        {t.country}
                      </Label>
                      <Input
                        id="country"
                        {...register("country")}
                        className={`bg-white border-black/20 ${errors.country ? "border-red-500" : ""}`}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-black">
                      {t.notes}
                    </Label>
                    <Textarea
                      id="notes"
                      {...register("notes")}
                      placeholder={t.notesPlaceholder}
                      className="bg-white border-black/20 min-h-[100px]"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#d4b05d] font-playfair text-xl">
                  <CreditCard className="h-6 w-6 text-[#d4b05d]" />
                  {t.paymentMethod}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 border border-[#d4b05d] rounded-lg bg-white">
                  <Truck className="h-8 w-8 text-[#d4b05d]" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#d4b05d]">{t.cashOnDelivery}</h4>
                    <p className="text-black/70">{t.codDescription}</p>
                  </div>
                  <Badge className="bg-[#d4b05d] text-white">{t.free}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:sticky lg:top-24">
            <Card className="bg-[#e6d7c3] border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#d4b05d] font-playfair text-xl">
                  {t.orderSummary}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 bg-white rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name[language]}
                        className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-black line-clamp-1">
                          {item.name[language]}
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

                {/* Order Totals */}
                <Separator className="bg-black/20" />
                <div className="space-y-3">
                  <div className="flex justify-between text-black">
                    <span>{t.subtotal}</span>
                    <span className="font-medium">{subtotal.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>{t.shipping}</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-[#d4b05d]">{t.free}</span>
                      ) : (
                        `${shipping.toFixed(2)} MAD`
                      )}
                    </span>
                  </div>
                  <Separator className="bg-black/20" />
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-black">{t.total}</span>
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
                      <span className="animate-pulse">•••</span> {t.processing}
                    </>
                  ) : (
                    t.placeOrder
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
