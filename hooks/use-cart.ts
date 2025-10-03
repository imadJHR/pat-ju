"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/product"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantityInKg?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantityInKg: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getTotalWeight: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantityInKg?: number) => {
        // Validation des données avec valeur par défaut sécurisée
        if (!product?.id || !product.name || typeof product.price !== 'number') {
          console.error('Produit invalide:', product)
          return
        }

        // Valeur par défaut sécurisée et validation
        const safeQuantity = typeof quantityInKg === 'number' && quantityInKg > 0 
          ? parseFloat(quantityInKg.toFixed(2)) 
          : 0.5

        if (safeQuantity <= 0) {
          console.error('Quantité doit être supérieure à 0')
          return
        }

        const { items } = get()
        const existingItem = items.find((item) => item.productId === product.id)

        if (existingItem) {
          // Si l'article existe déjà, mettre à jour la quantité
          const newQuantity = parseFloat((existingItem.quantity + safeQuantity).toFixed(2))
          set({
            items: items.map((item) =>
              item.productId === product.id 
                ? { 
                    ...item, 
                    quantity: newQuantity
                  } 
                : item
            ),
          })
        } else {
          // Créer un nouvel article avec la quantité spécifiée
          const newItem: CartItem = {
            id: `cart-${product.id}-${crypto.randomUUID() || Date.now()}`,
            productId: product.id,
            name: typeof product.name === 'string' ? product.name : product.name.fr || product.name.en || "Produit",
            price: product.price,
            quantity: safeQuantity,
            image: product.images?.[0] || '/default-image.jpg',
            category: typeof product.category === 'string' ? product.category : product.category.fr || product.category.en || "",
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
      },

      updateQuantity: (itemId: string, quantityInKg: number) => {
        // Validation du paramètre
        const safeQuantity = typeof quantityInKg === 'number' ? quantityInKg : 0.5
        
        if (safeQuantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        // Limiter la quantité maximum à 10kg par article
        const maxQuantity = 10
        const actualQuantity = parseFloat(Math.min(safeQuantity, maxQuantity).toFixed(2))
        
        set({
          items: get().items.map((item) => 
            item.id === itemId ? { ...item, quantity: actualQuantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + 1, 0)
      },

      getSubtotal: () => {
        return parseFloat(get().items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))
      },

      getTotalWeight: () => {
        return parseFloat(get().items.reduce((total, item) => total + item.quantity, 0).toFixed(2))
      },
    }),
    {
      name: "cart-storage",
      version: 1,
    },
  ),
)