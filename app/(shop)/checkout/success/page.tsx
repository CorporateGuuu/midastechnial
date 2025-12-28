import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect("/");
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    });

    if (!session) {
      redirect("/");
    }

    // Calculate totals from line items
    const lineItems = session.line_items?.data || [];
    const subtotal = lineItems.reduce((sum, item) => {
      return sum + ((item.amount_total || 0) / 100);
    }, 0);

    const shipping = session.shipping_cost?.amount_total
      ? session.shipping_cost.amount_total / 100
      : 0;

    const total = session.amount_total ? session.amount_total / 100 : 0;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Order #{sessionId.slice(-8).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {lineItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.description || item.price?.metadata?.name || 'Product'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice((item.amount_total || 0) / 100)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Information
                </h2>
                <div className="text-gray-700">
                  <p>Shipping details will be provided in your confirmation email.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Your order will be shipped to the address provided during checkout.
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h2>
                <div className="text-gray-700">
                  <p>Payment Method: **** **** **** ****</p>
                  <p>Email: {session.customer_details?.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Payment processed securely by Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Order Status</h3>
                <p className="text-blue-700">
                  Your order is being processed. You will receive an email confirmation shortly with tracking information.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href="/products"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                >
                  Continue Shopping
                </a>
                <a
                  href="/orders"
                  className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors block text-center"
                >
                  View Order History
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    redirect("/");
  }
}
