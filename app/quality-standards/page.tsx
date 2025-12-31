import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, CheckCircle, Award, Star, Zap } from 'lucide-react'

export default function QualityStandardsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Shield className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quality Standards & Certifications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every Midas Technical Solutions product meets rigorous quality standards and industry certifications.
              We guarantee premium performance and reliability.
            </p>
          </div>

          {/* Quality Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Award className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ISO 9001 Certified</h3>
              <p className="text-gray-600">International quality management system certification</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Star className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">OEM Standards</h3>
              <p className="text-gray-600">Original equipment manufacturer specifications met</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Zap className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">RoHS Compliant</h3>
              <p className="text-gray-600">Restriction of Hazardous Substances compliance</p>
            </div>
          </div>

          {/* Quality Standards */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Quality Standards</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Component Testing</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>100% functional testing before packaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Compatibility verification with target devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Performance benchmarking against OEM standards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Durability testing under extreme conditions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Control</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Multi-stage inspection process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Automated optical inspection systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Statistical process control monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Regular third-party auditing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warranty Information */}
          <div className="bg-[#D4AF37] rounded-lg p-8 text-white mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">30-Day Quality Guarantee</h2>
              <p className="text-yellow-100 max-w-2xl mx-auto">
                We're so confident in our quality standards that every product comes with a 30-day guarantee.
                If any component doesn't meet our standards, we'll replace it immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">30</div>
                <div className="text-yellow-100">Days Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-yellow-100">Quality Tested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Free</div>
                <div className="text-yellow-100">Replacements</div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Electrical Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Operating temperature: -20°C to 85°C</li>
                  <li>• Storage temperature: -40°C to 125°C</li>
                  <li>• Humidity resistance: 95% RH non-condensing</li>
                  <li>• ESD protection: ±15kV contact discharge</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mechanical Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Vibration resistance: 10-500Hz, 5G</li>
                  <li>• Shock resistance: 1500G, 0.5ms</li>
                  <li>• Connector durability: 10,000 cycles</li>
                  <li>• Surface finish: Hard coat anodizing</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/support"
                className="inline-block bg-[#D4AF37] text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Contact Quality Assurance
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
