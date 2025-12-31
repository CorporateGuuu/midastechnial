import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Truck, RefreshCw, Shield, Clock } from 'lucide-react'

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <RefreshCw className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Return Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We want you to be completely satisfied with your purchase. Our hassle-free return policy
              ensures you can shop with confidence.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
              <div className="font-semibold text-gray-900">30 Days</div>
              <div className="text-sm text-gray-600">Return Window</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Truck className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
              <div className="font-semibold text-gray-900">Free Shipping</div>
              <div className="text-sm text-gray-600">Return Labels</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
              <div className="font-semibold text-gray-900">No Restocking</div>
              <div className="text-sm text-gray-600">Fees</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <RefreshCw className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
              <div className="font-semibold text-gray-900">Easy Process</div>
              <div className="text-sm text-gray-600">Simple Returns</div>
            </div>
          </div>

          {/* Return Policy Details */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Return Policy Details</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility for Returns</h3>
                <ul className="space-y-2 text-gray-600 ml-6">
                  <li>• Items must be returned within 30 days of purchase</li>
                  <li>• Items must be unused and in original packaging</li>
                  <li>• All accessories and manuals must be included</li>
                  <li>• Items must be in resalable condition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Non-Returnable Items</h3>
                <ul className="space-y-2 text-gray-600 ml-6">
                  <li>• Items damaged due to misuse or abuse</li>
                  <li>• Items missing original packaging or accessories</li>
                  <li>• Items with removed serial numbers or warranty seals</li>
                  <li>• Custom or personalized items</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Process</h3>
                <ol className="space-y-2 text-gray-600 ml-6">
                  <li>1. Contact our support team to initiate return</li>
                  <li>2. Receive prepaid return shipping label</li>
                  <li>3. Pack item securely in original packaging</li>
                  <li>4. Ship item using provided label</li>
                  <li>5. Receive refund within 5-7 business days</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-[#D4AF37] rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Refund Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Original Payment</div>
                <div className="text-yellow-100 text-sm">Refunded to original payment method</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">5-7 Days</div>
                <div className="text-yellow-100 text-sm">Processing time after receipt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">$0 Fees</div>
                <div className="text-yellow-100 text-sm">No restocking or processing fees</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Need Help with a Return?</h2>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Our support team is ready to assist you with any questions about returns or exchanges.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:returns@midastechnical.com"
                  className="inline-block bg-[#D4AF37] text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Start Return Process
                </Link>
                <Link
                  href="/support"
                  className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
