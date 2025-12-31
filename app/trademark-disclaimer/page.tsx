import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AlertTriangle, Shield } from 'lucide-react'

export default function TrademarkDisclaimerPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <AlertTriangle className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trademark Disclaimer</h1>
            <p className="text-lg text-gray-600">
              Important information about trademarks and brand usage on our website.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Trademarks</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-yellow-900 mb-2">Important Notice</h3>
                    <p className="text-yellow-800 text-sm">
                      Midas Technical Solutions is not affiliated with, endorsed by, or connected to Apple Inc.,
                      Google LLC, Motorola Mobility LLC, LG Electronics Inc., or any other trademark holders
                      mentioned on this website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trademark Usage</h2>
              <p className="text-gray-600 mb-4">
                All product names, logos, brands, trademarks, and service marks appearing on this website
                are the property of their respective owners. The use of these trademarks on our website
                is for informational and identification purposes only.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Permitted Use</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Product identification</li>
                    <li>• Compatibility information</li>
                    <li>• Educational purposes</li>
                    <li>• Fair use commentary</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">Prohibited Use</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Brand misrepresentation</li>
                    <li>• False endorsement claims</li>
                    <li>• Commercial exploitation</li>
                    <li>• Trademark dilution</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-600 mb-4">
                All content on this website, including but not limited to text, graphics, logos, images,
                audio clips, digital downloads, and software, is the property of Midas Technical Solutions
                or its content suppliers and is protected by international copyright laws.
              </p>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Our Commitment</h3>
                  <p className="text-blue-800 text-sm">
                    We respect the intellectual property rights of others and expect our users to do the same.
                    We will respond to clear notices of alleged copyright infringement.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">DMCA Notice</h2>
              <p className="text-gray-600 mb-4">
                If you believe that your work has been copied in a way that constitutes copyright infringement,
                please provide our designated agent with the following information:
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <ul className="space-y-2 text-gray-600 ml-4">
                  <li>• A physical or electronic signature of the copyright owner</li>
                  <li>• Identification of the copyrighted work claimed to have been infringed</li>
                  <li>• Identification of the material that is claimed to be infringing</li>
                  <li>• Your contact information</li>
                  <li>• A statement of good faith belief</li>
                  <li>• A statement of accuracy and authority</li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-900">DMCA Agent Contact:</p>
                <p className="text-gray-600">dmca@midastechnical.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about this trademark disclaimer or to report trademark concerns,
                please contact our legal department:
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
