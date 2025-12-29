import { useState } from 'react'
import { useCart as useCartStore } from '../store/cartStore'
import { Product } from '../types'

export const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore()

  const [isOpen, setIsOpen] = useState(false)

  const addToCart = (product: Product) => {
    addItem(product)
  }

  const removeFromCart = (productId: string) => {
    removeItem(productId)
  }

  const updateItemQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen(!isOpen)

  const cartItemCount = getTotalItems()
  const cartTotal = getTotalPrice()

  return {
    items,
    isOpen,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    setIsOpen
  }
}
