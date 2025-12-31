import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Scissors, Shield, Layers, CheckCircle } from 'lucide-react'

export default function TapeBasePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <Layers className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">TapeBase</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium adhesive solutions for professional device repairs and assembly.
              High-quality tapes and adhesives trusted by repair specialists worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strong Bond</h3>
              <p className="text-gray-600 text-sm">Industrial-grade adhesion</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Layers className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Purpose</h3>
              <p className="text-gray-600 text-sm">Various tape types</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Scissors className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Application</h3>
              <p className="text-gray-600 text-sm">Clean and precise</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable</h3>
              <p className="text-gray-600 text-sm">Consistent performance</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">TapeBase Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tape Products</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Conductive tapes</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />EMI shielding tapes</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Thermal interface tapes</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Precision die-cut tapes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Screen repairs</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Battery assembly</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Cable management</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-red-600 mr-2" />Component mounting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">TapeBase Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500N</div>
                <div className="text-red-100">Shear Strength</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">-40°C</div>
                <div className="text-red-100">Temperature Range</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-red-100">Years Shelf Life</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose TapeBase Quality</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional adhesive solutions that ensure reliable, long-lasting repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">Shop Tape Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Adhesive Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
