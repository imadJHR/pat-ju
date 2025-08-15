export interface Product {
  id: string
  name: {
    en: string
    fr: string
    ar: string
  }
  description: {
    en: string
    fr: string
    ar: string
  }
  price: number
  originalPrice?: number
  images: string[]
  category: {
    en: string
    fr: string
    ar: string
  }
  ingredients: {
    en: string[]
    fr: string[]
    ar: string[]
  }
  isNew?: boolean
  isBestseller?: boolean
  inStock: boolean
  rating: number
  reviewCount: number
}
