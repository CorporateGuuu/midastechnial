import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CreditCard, Smartphone, Wallet } from 'lucide-react'

export default function PaymentMethodsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <CreditCard className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Methods</h1>
            <p className="text-lg text-gray-600">
              We accept a variety of secure payment methods for your convenience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accepted Payment Methods</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Credit Cards */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-8 h-8 text-[#D4AF37] mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Credit Cards</h3>
                </div>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• Visa</li>
                  <li>• MasterCard</li>
                  <li>• American Express</li>
                  <li>• Discover</li>
                </ul>
                <p className="text-sm text-gray-500">
                  All major credit cards accepted with secure SSL encryption
                </p>
              </div>

              {/* Digital Wallets */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Wallet className="w-8 h-8 text-[#D4AF37] mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Digital Wallets</h3>
                </div>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• PayPal</li>
                  <li>• Apple Pay</li>
                  <li>• Google Pay</li>
                </ul>
                <p className="text-sm text-gray-500">
                  Fast and secure checkout with your preferred digital wallet
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">SSL</span>
                  </div>
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">PCI</span>
                  </div>
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">3D</span>
                  </div>
                  <span>3D Secure verification</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Processing</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  All payments are processed through secure, PCI DSS compliant gateways.
                  Your payment information is encrypted and never stored on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Confirmation</h3>
                <p className="text-gray-600">
                  Once payment is processed, you'll receive an immediate confirmation email
                  with your order details and tracking information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Information</h3>
                <p className="text-gray-600">
                  Your billing address must match the credit card statement address for security purposes.
                  We may request additional verification for large orders.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#D4AF37] rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help with Payment?</h3>
            <p className="text-yellow-100 mb-6">
              Our support team is here to help with any payment questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@midastechnical.com"
                className="inline-block bg-white text-[#D4AF37] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/support"
                className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#D4AF37] transition-colors"
              >
                Payment FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
