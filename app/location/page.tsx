import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#D4AF37]">Location</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Visit us or contact us directly. We're here to serve your technical needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 text-lg mb-8">
                Have questions about our products or services? We'd love to hear from you.
                Contact us using any of the methods below.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">

              {/* Address */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">
                      1521 Boyd Pointe Way<br />
                      Vienna, VA 22182<br />
                      USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">
                      <Link href="tel:+1-800-MIDAS-01" className="hover:text-[#D4AF37] transition-colors">
                        +1 (800) MIDAS-01
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">
                      <Link href="mailto:admin@midastechnical.com" className="hover:text-[#D4AF37] transition-colors">
                        admin@midastechnical.com
                      </Link>
                    </p>
                    <p className="text-gray-600">
                      <Link href="mailto:support@midastechnical.com" className="hover:text-[#D4AF37] transition-colors">
                        support@midastechnical.com
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM (EST)</p>
                      <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM (EST)</p>
                      <p><span className="font-medium">Sunday:</span> Closed</p>
                      <p className="text-sm text-gray-500 mt-2">
                        * Hours shown in Eastern Standard Time (EST). Contact us for international availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">

            {/* Interactive Map */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h3>
              <div className="h-64 rounded-lg overflow-hidden border">
                <iframe
                  src="https://maps.google.com/maps?q=1521%20Boyd%20Pointe%20Way%2C%20Vienna%2C%20VA%2022182%2C%20USA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="1521 Boyd Pointe Way, Vienna, VA 22182"
                ></iframe>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="https://maps.google.com/?q=1521+Boyd+Pointe+Way,+Vienna,+VA+22182,+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-1 text-center"
                >
                  Open in Google Maps
                </Link>
                <Link
                  href="https://www.google.com/maps/dir/?api=1&destination=1521+Boyd+Pointe+Way,+Vienna,+VA+22182,+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-1 text-center"
                >
                  Get Directions
                </Link>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B89429] p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-4 opacity-90">
                Our technical experts are ready to help you with any questions about our products or services.
              </p>
              <div className="space-y-3">
                <Link
                  href="tel:+1-800-MIDAS-01"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block w-full text-center font-medium"
                >
                  📞 Call Now: +1 (800) MIDAS-01
                </Link>
                <Link
                  href="/live-chat"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block w-full text-center font-medium"
                >
                  💬 Start Live Chat
                </Link>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Free parking available on-site</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Wheelchair accessible facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Product demonstrations available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Technical support on-site</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
