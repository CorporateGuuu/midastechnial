import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Wrench, Settings, Star, CheckCircle } from 'lucide-react'

export default function ScrewBoxPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
              <Settings className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ScrewBox 2.0</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tool organization system with precision fasteners and repair kits.
              The ultimate toolkit for modern device repair specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Wrench className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Precision Tools</h3>
              <p className="text-gray-600 text-sm">Professional-grade fasteners</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Settings className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organized</h3>
              <p className="text-gray-600 text-sm">Smart storage solutions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Star className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Kits</h3>
              <p className="text-gray-600 text-sm">Everything you need</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Durable</h3>
              <p className="text-gray-600 text-sm">Built to last</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">ScrewBox 2.0 Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tool Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Precision screwdrivers</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Magnetic bit holders</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Anti-static tools</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Custom fastener sets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Organization System</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Modular storage trays</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Color-coded organization</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Quick-access design</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-orange-600 mr-2" />Expandable system</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">ScrewBox 2.0 Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-orange-100">Precision Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-orange-100">Faster Repairs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">0</div>
                <div className="text-orange-100">Lost Tools</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Your ScrewBox 2.0</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional tool organization that keeps your workspace efficient and productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors">Shop ScrewBox Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Tool Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
