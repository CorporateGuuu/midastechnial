'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useCart } from '@/hooks/useCart'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShoppingCart, FileText, Share2, Trash2, Plus, Minus, X } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPage() {
  const { data: session } = useSession()
  const { items, updateItemQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const [activeTab, setActiveTab] = useState<'all' | 'parts' | 'accessories' | 'devices'>('all')
  const [showClearModal, setShowClearModal] = useState(false)

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
            priceId: item.stripePriceId || undefined,
            quantity: item.quantity,
            title: item.title,
            price: item.price,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

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

  // Filter items based on active tab
  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true
    if (activeTab === 'parts') return !['accessories', 'pre-owned'].includes(item.category)
    if (activeTab === 'accessories') return item.category === 'accessories'
    if (activeTab === 'devices') return item.category === 'pre-owned'
    return true
  })

  const subtotal = cartTotal
  const shipping = subtotal >= 99 ? 0 : 9.99
  const total = subtotal + shipping

  // CSV Export Functionality
  const handleCsvExport = () => {
    const csvContent = [
      ['Product', 'Category', 'Quantity', 'Price', 'Total'].join(','),
      ...filteredItems.map(item => [
        `"${item.title.replace(/"/g, '""')}"`,
        item.category,
        item.quantity,
        item.price.toFixed(2),
        (item.price * item.quantity).toFixed(2)
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'cart-export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Forward Cart Functionality
  const handleForwardCart = () => {
    const cartData = filteredItems.map(item => `${item.title} (${item.quantity}x)`).join(', ')
    const subject = encodeURIComponent('Shared Cart from Midas Technical Solutions')
    const body = encodeURIComponent(`Check out this cart I created:\n\n${cartData}\n\nTotal: $${total.toFixed(2)}\n\nView at: ${window.location.origin}/cart`)

    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  // Clear Cart with Confirmation
  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear all items from your cart? This action cannot be undone.')) {
      clearCart()
      setShowClearModal(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'parts'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Parts ({items.filter(item => !['accessories', 'pre-owned'].includes(item.category)).length})
          </button>
          <button
            onClick={() => setActiveTab('accessories')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'accessories'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Accessories ({items.filter(item => item.category === 'accessories').length})
          </button>
          {session && (
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'devices'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Devices ({items.filter(item => item.category === 'pre-owned').length})
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4">
            <ShoppingCart className="w-32 h-32 mx-auto text-gray-300 mb-8" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your cart is empty!</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 font-semibold text-lg underline underline-offset-2"
              >
                Create a Quick Order!
              </Link>
              <span className="hidden sm:block text-gray-400">|</span>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-semibold text-lg underline underline-offset-2"
              >
                Continue Shopping!
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 capitalize">{item.category.replace('-', ' ')}</p>
                      <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Item total</span>
                    <span className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {/* Bottom Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button
                    onClick={handleCsvExport}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    CSV
                  </button>
                  <button
                    onClick={handleForwardCart}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Forward Cart
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    Order Total: ${total.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                  </div>
                </div>

                <button
                  className="w-full bg-red-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 mb-6 shadow-md"
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: items.length === 0 ? '#9ca3af' : '#dc2626',
                    boxShadow: items.length > 0 ? '0 4px 14px 0 rgba(220, 38, 38, 0.25)' : 'none'
                  }}
                >
                  Proceed to Checkout
                </button>

                <div className="text-center border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.622 1.566 1.035.974 1.481 2.408 1.068 3.868L18.113 21.337h-4.612l1.24-6.065H7.076l-1.241 6.065zm3.648-14.59c-.612-.207-1.42-.357-2.222-.357-.979 0-1.969.253-2.618.757l.956 4.642c.647-.504 1.637-.757 2.616-.757.805 0 1.613.15 2.225.357l-.957-4.642zm4.684 4.642c-.646-.504-1.637-.757-2.616-.757-.805 0-1.613.15-2.225.357l.957 4.642c.612-.207 1.42-.357 2.222-.357.979 0 1.969.253 2.618.757l-.956-4.642z"/>
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">PayPal</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Buy now and pay later with PayPal. <a href="#" className="text-blue-600 hover:underline font-medium">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  )
}
