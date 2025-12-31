import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <Lock className="w-5 h-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Account Information</h3>
                    <p>Name, email address, phone number, and billing/shipping addresses</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Eye className="w-5 h-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Usage Data</h3>
                    <p>Website usage patterns, device information, and IP addresses</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Communication Data</h3>
                    <p>Customer service interactions and feedback</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Process and fulfill your orders</li>
                <li>• Provide customer support and technical assistance</li>
                <li>• Send order confirmations and shipping updates</li>
                <li>• Improve our products and services</li>
                <li>• Send marketing communications (with your consent)</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• With shipping carriers to deliver your orders</li>
                <li>• With payment processors to complete transactions</li>
                <li>• When required by law or to protect our rights</li>
                <li>• With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your personal information,
                including SSL encryption, secure payment processing, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Access and review your personal information</li>
                <li>• Correct inaccurate or incomplete data</li>
                <li>• Request deletion of your personal information</li>
                <li>• Opt out of marketing communications</li>
                <li>• Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-medium">Privacy Officer</p>
                <p className="text-gray-600">privacy@midastechnical.com</p>
                <p className="text-gray-600">1-800-MIDAS-01</p>
              </div>
            </section>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 text-center">
                Last updated: December 30, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
