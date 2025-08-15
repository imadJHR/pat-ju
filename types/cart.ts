export interface CartItem {
  id: string
  productId: string
  name: {
    en: string
    fr: string
    ar: string
  }
  price: number
  quantity: number
  image: string
  category: {
    en: string
    fr: string
    ar: string
  }
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  notes?: string
}

export interface Order {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  subtotal: number
  shipping: number
  total: number
  paymentMethod: "cod"
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered"
  createdAt: Date
}
