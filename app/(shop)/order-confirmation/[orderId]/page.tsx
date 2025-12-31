'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface OrderData {
  id: string
  items: OrderItem[]
  total: number
  shippingCost: number
  status: string
  trackingNumber?: string
  trackingUrl?: string
  carrier?: string
  createdAt: string
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
        } else {
          setError('Order not found')
        }
      } catch (err) {
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId, session, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Order Not Found</h1>
            <p className="text-red-600 mb-6">{error || 'The order you\'re looking for doesn\'t exist.'}</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = order.total - order.shippingCost

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase from MobileSentrix</p>
        <p className="text-sm text-gray-500 mt-2">Order #{order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  order.status === 'shipped' ? 'bg-green-500' :
                  order.status === 'paid' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
                <span className="font-medium capitalize">{order.status}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {order.trackingNumber && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-semibold text-blue-800 mb-2">Shipping Information</h3>
                <p className="text-blue-700 text-sm">
                  <span className="font-medium">Carrier:</span> {order.carrier || 'Standard Shipping'}
                </p>
                <p className="text-blue-700 text-sm">
                  <span className="font-medium">Tracking:</span> {order.trackingNumber}
                </p>
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your email for order confirmation</li>
                <li>• You'll receive shipping updates via email and SMS</li>
                <li>• Track your package once shipped</li>
                <li>• Contact support if you have questions</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Link
                href="/products"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 text-center block"
              >
                Continue Shopping
              </Link>

              <Link
                href="/portal/orders"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 text-center block"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help with any questions about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@mobilesentrix.com"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Email Support
            </a>
            <a
              href="tel:1-800-MOBILEX"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
