import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Cpu, Zap, Shield, CheckCircle } from 'lucide-react'

export default function A07TechnologyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A07</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              A07 Technology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precision-engineered components with advanced A07 processing technology.
              Superior performance for demanding repair applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Cpu className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">A07 Processing</h3>
              <p className="text-gray-600 text-sm">Advanced processing architecture</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Zap className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Performance</h3>
              <p className="text-gray-600 text-sm">Optimized for maximum efficiency</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable</h3>
              <p className="text-gray-600 text-sm">Built for critical applications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified</h3>
              <p className="text-gray-600 text-sm">Industry standards compliance</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">A07 Product Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Technology</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Advanced A07 processing units</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Neural network optimization</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Machine learning integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Adaptive performance scaling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Professional repair equipment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Diagnostic systems</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Quality control devices</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-600 mr-2" />Testing instrumentation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">A07 Technology Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-blue-100">Faster Processing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Monitoring</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover A07 Technology</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the power of A07 processing technology in your repair operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Shop A07 Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Technical Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
