import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Monitor, Zap, Eye, CheckCircle } from 'lucide-react'

export default function DisplayBasePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center">
              <Monitor className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">DisplayBase</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium display technology solutions for crystal-clear visual performance.
              Advanced screens and display components for professional repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Monitor className="w-12 h-12 mx-auto text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4K Resolution</h3>
              <p className="text-gray-600 text-sm">Ultra-high definition displays</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Eye className="w-12 h-12 mx-auto text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crystal Clear</h3>
              <p className="text-gray-600 text-sm">Exceptional visual clarity</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Zap className="w-12 h-12 mx-auto text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Refresh</h3>
              <p className="text-gray-600 text-sm">High refresh rate technology</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Durable</h3>
              <p className="text-gray-600 text-sm">Scratch and impact resistant</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DisplayBase Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Display Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />OLED and LCD panels</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Touch screen digitizers</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Display controllers</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Backlight modules</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Smartphone screen repairs</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Tablet display replacement</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Laptop screen upgrades</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-600 mr-2" />Wearable device displays</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-cyan-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">DisplayBase Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4K</div>
                <div className="text-cyan-100">Ultra HD Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">120Hz</div>
                <div className="text-cyan-100">Refresh Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000:1</div>
                <div className="text-cyan-100">Contrast Ratio</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience DisplayBase Quality</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover premium display solutions that deliver stunning visual performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors">Shop Display Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Display Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
