'use client'

import { useCart } from '@/hooks/useCart'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPage() {
  const { items, updateItemQuantity, removeFromCart, cartTotal, clearCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      updateItemQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) {
        alert('Stripe failed to load')
        return
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            priceId: item.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      })

      const { url } = await response.json()

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong during checkout')
    }
  }

  const total = cartTotal

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <a
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{total >= 99 ? 'FREE' : '$9.99'}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(total + (total >= 99 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
