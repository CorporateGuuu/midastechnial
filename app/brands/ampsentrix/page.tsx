import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Battery, Zap, Volume2, CheckCircle } from 'lucide-react'

export default function AmpSentrixPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
              <Volume2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AmpSentrix</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium audio amplification technology for superior sound quality and performance.
              Professional-grade components for audio repair specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Volume2 className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crystal Clear Audio</h3>
              <p className="text-gray-600 text-sm">HD audio amplification technology</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Battery className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Power Efficient</h3>
              <p className="text-gray-600 text-sm">Low power consumption design</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Zap className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Performance</h3>
              <p className="text-gray-600 text-sm">Industry-leading amplification</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Quality</h3>
              <p className="text-gray-600 text-sm">Audio engineering standards</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AmpSentrix Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Audio Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Premium speakers and drivers</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />High-fidelity amplifiers</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Audio processing chips</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Noise cancellation modules</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Repair Applications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Smartphone audio repairs</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Tablet sound systems</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Headphone repairs</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Bluetooth audio devices</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-600 rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">AmpSentrix Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">120dB</div>
                <div className="text-green-100">Signal-to-Noise Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">0.01%</div>
                <div className="text-green-100">Total Harmonic Distortion</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">20Hz-20kHz</div>
                <div className="text-green-100">Frequency Response</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience AmpSentrix Quality</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover premium audio solutions that deliver exceptional sound quality and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">Shop Audio Products</Link>
              <Link href="/support" className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">Audio Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
