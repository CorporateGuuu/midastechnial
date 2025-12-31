import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Scale, AlertTriangle } from 'lucide-react'

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using our services.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Midas Technical Solutions website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Midas Technical Solutions website for personal, non-commercial transitory viewing only.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900 mb-1">Prohibited Uses</h3>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Modify or copy the materials</li>
                      <li>• Use the materials for commercial purposes</li>
                      <li>• Attempt to decompile or reverse engineer</li>
                      <li>• Remove any copyright or proprietary notations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products and Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Product Descriptions</h3>
                  <p className="text-gray-600">We strive to be as accurate as possible in describing our products. However, we do not warrant that product descriptions are error-free.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Pricing</h3>
                  <p className="text-gray-600">All prices are subject to change without notice. We reserve the right to modify or discontinue products without liability.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                  <p className="text-gray-600">Product availability is not guaranteed. We reserve the right to limit quantities or discontinue products.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Billing and Account Information</h2>
              <p className="text-gray-600 mb-4">
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Scale className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Payment Terms</h3>
                    <p className="text-sm text-blue-800">Payment is due at the time of purchase. We accept major credit cards and PayPal.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600">
                In no event shall Midas Technical Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-medium">Legal Department</p>
                <p className="text-gray-600">legal@midastechnical.com</p>
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
