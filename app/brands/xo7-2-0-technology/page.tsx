import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Zap, Shield, Star, CheckCircle } from 'lucide-react'

export default function XO7TechnologyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">XO7</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              XO7 2.0 Technology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced repair solutions powered by cutting-edge technology.
              Premium components designed for professional technicians.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Zap className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Tech</h3>
              <p className="text-gray-600 text-sm">Latest technological innovations for superior performance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600 text-sm">Engineered for durability and long-term reliability</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Star className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Highest quality materials and craftsmanship</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified</h3>
              <p className="text-gray-600 text-sm">Industry certified and tested standards</p>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">XO7 Product Line</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Intelligent diagnostic systems
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Auto-calibrating sensors
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Predictive maintenance features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Wireless connectivity options
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Tools</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Precision measurement devices
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Automated testing equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Data logging capabilities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                    Real-time performance monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose XO7 */}
          <div className="bg-[#D4AF37] rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose XO7 2.0?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2.0</div>
                <div className="text-yellow-100">Next Generation</div>
                <div className="text-sm text-yellow-100 mt-2">Advanced 2.0 technology platform</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-yellow-100">Accuracy Rate</div>
                <div className="text-sm text-yellow-100 mt-2">Industry-leading precision</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-yellow-100">Support</div>
                <div className="text-sm text-yellow-100 mt-2">Round-the-clock technical assistance</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience XO7 Technology</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the difference that XO7 2.0 Technology can make in your repair operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-[#D4AF37] text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Shop XO7 Products
              </Link>
              <Link
                href="/support"
                className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
