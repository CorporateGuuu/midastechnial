import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Smartphone, Battery, Wifi, CheckCircle } from 'lucide-react'

export default function CasperPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Casper</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent mobile device solutions with advanced connectivity and power management.
              Next-generation components for modern device repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Smartphone className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Integration</h3>
              <p className="text-gray-600 text-sm">Seamless device connectivity</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Battery className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Power Management</h3>
              <p className="text-gray-600 text-sm">Advanced battery optimization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Wifi className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wireless Tech</h3>
              <p className="text-gray-600 text-sm">Latest wireless standards</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Future Proof</h3>
              <p className="text-gray-600 text-sm">Designed for tomorrow's devices</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Casper Innovations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />AI-powered diagnostics</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Predictive maintenance</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Smart charging technology</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Wireless power transfer</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Device Compatibility</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Latest smartphone models</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Wearable technology</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />IoT device integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-600 mr-2" />Cross-platform compatibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Casper Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5G</div>
                <div className="text-purple-100">Ready</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">IoT</div>
                <div className="text-purple-100">Enabled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">AI</div>
                <div className="text-purple-100">Powered</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover Casper Solutions</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the future of mobile device technology with Casper innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">Shop Casper Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Technical Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
