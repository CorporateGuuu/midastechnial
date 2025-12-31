import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Monitor, DollarSign, Shield, Clock, CheckCircle, Smartphone } from 'lucide-react'

export default function LCDBuybackPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Monitor className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              LCD Buyback Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get paid for your used LCD displays! We buy back working and repairable screens
              from smartphones, tablets, and laptops at competitive prices.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <DollarSign className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Competitive rates for all display types</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Payment</h3>
              <p className="text-gray-600 text-sm">Quick processing and immediate payout</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Process</h3>
              <p className="text-gray-600 text-sm">Safe and environmentally responsible</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">Simple online form and free shipping</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How LCD Buyback Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Submit Your Display</h3>
                <p className="text-gray-600">
                  Fill out our online form with details about your LCD display.
                  Get an instant quote and prepaid shipping label.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Inspect & Test</h3>
                <p className="text-gray-600">
                  Our technicians carefully inspect and test your display
                  to ensure it meets our quality standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Paid Fast</h3>
                <p className="text-gray-600">
                  Receive payment immediately upon approval.
                  Choose PayPal, check, or direct deposit.
                </p>
              </div>
            </div>
          </div>

          {/* Accepted Displays */}
          <div className="bg-[#D4AF37] rounded-lg p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Accepted LCD Displays</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Smartphone className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-2">Smartphone Displays</h3>
                <ul className="text-sm space-y-1">
                  <li>• iPhone LCDs (all models)</li>
                  <li>• Samsung AMOLED screens</li>
                  <li>• Google Pixel displays</li>
                  <li>• OnePlus screens</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <Monitor className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-2">Tablet & Laptop</h3>
                <ul className="text-sm space-y-1">
                  <li>• iPad displays</li>
                  <li>• Laptop LCD panels</li>
                  <li>• Surface screens</li>
                  <li>• Chromebook displays</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-2">Wearables</h3>
                <ul className="text-sm space-y-1">
                  <li>• Apple Watch displays</li>
                  <li>• Smartwatch screens</li>
                  <li>• Fitness tracker LCDs</li>
                  <li>• Small device displays</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Buyback Prices</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Device Model</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Display Size</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Condition</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {/* iPhone Models */}
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold" colSpan={4}>iPhone Displays</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPhone 15 Pro Max</td>
                    <td className="border border-gray-300 px-4 py-3">6.7"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$45</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPhone 15 Pro</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$40</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPhone 15</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$35</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPhone 14 Pro Max</td>
                    <td className="border border-gray-300 px-4 py-3">6.7"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$38</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPhone 14 Pro</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$33</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPhone 14</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$28</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPhone 13 Pro Max</td>
                    <td className="border border-gray-300 px-4 py-3">6.7"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$32</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPhone 13 Pro</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$28</td>
                  </tr>

                  {/* Samsung Models */}
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold" colSpan={4}>Samsung Displays</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Galaxy S24 Ultra</td>
                    <td className="border border-gray-300 px-4 py-3">6.8"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Galaxy S24+</td>
                    <td className="border border-gray-300 px-4 py-3">6.7"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$45</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Galaxy S24</td>
                    <td className="border border-gray-300 px-4 py-3">6.2"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$40</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Galaxy S23 Ultra</td>
                    <td className="border border-gray-300 px-4 py-3">6.8"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$45</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Galaxy S23+</td>
                    <td className="border border-gray-300 px-4 py-3">6.6"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$38</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Galaxy S23</td>
                    <td className="border border-gray-300 px-4 py-3">6.1"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$32</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Galaxy Note 20 Ultra</td>
                    <td className="border border-gray-300 px-4 py-3">6.9"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$35</td>
                  </tr>

                  {/* iPad Models */}
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold" colSpan={4}>iPad Displays</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPad Pro 12.9"</td>
                    <td className="border border-gray-300 px-4 py-3">12.9"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$60</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPad Pro 11"</td>
                    <td className="border border-gray-300 px-4 py-3">11"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$50</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">iPad Air 10.9"</td>
                    <td className="border border-gray-300 px-4 py-3">10.9"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$45</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">iPad 10.2"</td>
                    <td className="border border-gray-300 px-4 py-3">10.2"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$35</td>
                  </tr>

                  {/* Laptop Models */}
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold" colSpan={4}>Laptop Displays</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">MacBook Pro 16"</td>
                    <td className="border border-gray-300 px-4 py-3">16.2"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$80</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">MacBook Pro 14"</td>
                    <td className="border border-gray-300 px-4 py-3">14.2"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$70</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">MacBook Air 13"</td>
                    <td className="border border-gray-300 px-4 py-3">13.6"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$55</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Dell XPS 13"</td>
                    <td className="border border-gray-300 px-4 py-3">13.4"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$45</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Surface Pro 9</td>
                    <td className="border border-gray-300 px-4 py-3">13"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Standard 15.6" Laptop</td>
                    <td className="border border-gray-300 px-4 py-3">15.6"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$35</td>
                  </tr>

                  {/* Wearables */}
                  <tr className="bg-pink-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold" colSpan={4}>Wearable Displays</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Apple Watch Ultra</td>
                    <td className="border border-gray-300 px-4 py-3">1.9"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$25</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Apple Watch Series 9</td>
                    <td className="border border-gray-300 px-4 py-3">1.9"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Samsung Galaxy Watch 6</td>
                    <td className="border border-gray-300 px-4 py-3">1.3"</td>
                    <td className="border border-gray-300 px-4 py-3">Working</td>
                    <td className="border border-gray-300 px-4 py-3">$15</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                * All prices are for working displays in good condition. Damaged or heavily worn displays may receive lower offers.
              </p>
              <p className="text-gray-600 text-sm">
                ** Final prices determined after inspection. Contact us for damaged display evaluations.
              </p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-16">
            <div className="flex items-start">
              <Shield className="w-8 h-8 text-green-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-3">Environmental Impact</h3>
                <p className="text-green-800 mb-4">
                  By participating in our LCD buyback program, you're helping reduce electronic waste and
                  promote sustainable practices in the repair industry.
                </p>
                <ul className="text-green-800 space-y-2">
                  <li>• Prevents displays from ending up in landfills</li>
                  <li>• Supports the circular economy</li>
                  <li>• Reduces demand for new component manufacturing</li>
                  <li>• Minimizes environmental impact of e-waste</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Sell Your LCD Displays?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get started with our simple online form. Free shipping labels and fast payment guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-block bg-[#D4AF37] text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Start Buyback Process
              </Link>
              <Link
                href="/support"
                className="inline-block bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
