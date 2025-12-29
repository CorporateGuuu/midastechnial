'use client'

import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { Product, CartItem } from '../types'

interface CartItemProps {
  item: CartItem
}

function CartItemComponent({ item }: CartItemProps) {
  const { updateItemQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.title}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-12 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <div className="text-lg font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 p-1"
      >
        ×
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, cartTotal, clearCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Clear Cart
                </button>
                <button 
                  onClick={() => alert('Checkout functionality coming soon!')}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>

              {cartTotal >= 99 && (
                <div className="text-sm text-green-600 text-center mt-2">
                  ✅ Free shipping!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
