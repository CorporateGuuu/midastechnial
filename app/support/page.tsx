import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MessageCircle, HelpCircle, FileText, Clock, Shield, Truck } from 'lucide-react'

export default function SupportPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <HelpCircle className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get support for your repair parts orders, technical questions, and account assistance.
              Our team is here to help you succeed.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Truck className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Track Order</h3>
              <p className="text-sm text-gray-600 mb-4">Check your order status and shipping updates</p>
              <Link href="/account" className="text-[#D4AF37] hover:text-yellow-600 font-medium text-sm">
                View Orders →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Warranty Info</h3>
              <p className="text-sm text-gray-600 mb-4">30-day warranty on all repair parts</p>
              <a href="#warranty" className="text-[#D4AF37] hover:text-yellow-600 font-medium text-sm">
                Learn More →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Returns</h3>
              <p className="text-sm text-gray-600 mb-4">Easy returns and exchange policy</p>
              <a href="#returns" className="text-[#D4AF37] hover:text-yellow-600 font-medium text-sm">
                Return Policy →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <MessageCircle className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600 mb-4">Get in touch with our support team</p>
              <a href="#contact" className="text-[#D4AF37] hover:text-yellow-600 font-medium text-sm">
                Contact Info →
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div id="contact" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-2">Get help with orders and technical questions</p>
                <a href="mailto:support@midastechnical.com" className="text-[#D4AF37] hover:text-yellow-600 font-medium">
                  support@midastechnical.com
                </a>
              </div>

              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-2">Mon-Fri 9AM-6PM EST</p>
                <a href="tel:+1-800-MIDAS-01" className="text-[#D4AF37] hover:text-yellow-600 font-medium">
                  1-800-MIDAS-01
                </a>
              </div>

              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600 mb-2">We're here to help</p>
                <div className="text-sm text-gray-600">
                  <div>Mon-Fri: 9AM-6PM EST</div>
                  <div>Sat: 10AM-4PM EST</div>
                  <div>Sun: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does shipping take?</h3>
                <p className="text-gray-600">Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. Free shipping on orders over $99.</p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is your return policy?</h3>
                <p className="text-gray-600">We offer a 30-day return policy on all repair parts. Items must be unused and in original packaging. Return shipping is free for defective items.</p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer warranties?</h3>
                <p className="text-gray-600">Yes! All repair parts come with a 30-day warranty. Premium components include extended warranty options up to 1 year.</p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I track my order?</h3>
                <p className="text-gray-600">Yes, you'll receive tracking information via email once your order ships. You can also track orders in your account dashboard.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer technical support?</h3>
                <p className="text-gray-600">Absolutely! Our technical support team is available to help with repair questions, part compatibility, and troubleshooting guidance.</p>
              </div>
            </div>
          </div>

          {/* Warranty & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div id="warranty" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <Shield className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Warranty</h3>
              <p className="text-gray-600 mb-6">
                All repair parts come with our comprehensive 30-day warranty. If any part is defective or doesn't work as described,
                we'll replace it free of charge or provide a full refund.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Covers manufacturing defects</li>
                <li>• Includes parts and labor</li>
                <li>• No questions asked returns</li>
                <li>• Extended warranties available</li>
              </ul>
            </div>

            <div id="returns" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <Truck className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Returns</h3>
              <p className="text-gray-600 mb-6">
                Not satisfied with your purchase? Our hassle-free return policy makes it easy to return items within 30 days
                for a full refund or exchange.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 30-day return window</li>
                <li>• Free return shipping</li>
                <li>• Pre-paid return labels</li>
                <li>• Instant refunds</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-[#D4AF37] rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions about your orders,
              technical specifications, or repair guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@midastechnical.com"
                className="inline-block bg-white text-[#D4AF37] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:+1-800-MIDAS-01"
                className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#D4AF37] transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
