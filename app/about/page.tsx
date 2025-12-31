import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, Award, Shield, Truck, Star, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Users className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Midas Technical Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading provider of premium repair parts and tools for professional technicians.
              Trusted by thousands of repair specialists worldwide.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">5000+</div>
              <div className="text-gray-600">Parts in Stock</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">24/7</div>
              <div className="text-gray-600">Expert Support</div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-4xl mx-auto">
              To empower repair professionals with premium-quality parts, cutting-edge tools, and unparalleled support.
              We believe that every device deserves a second chance, and every technician deserves the best tools for the job.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">Only the highest quality parts and tools for professional use</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-600 text-sm">30-day warranty and comprehensive quality assurance</p>
              </div>
              <div className="text-center">
                <Truck className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Quick shipping with free delivery over $99</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  Customer First
                </h3>
                <p className="text-gray-600 mb-6">
                  Our customers' success is our success. We provide exceptional service,
                  expert technical support, and reliable products that professionals can trust.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  Innovation
                </h3>
                <p className="text-gray-600 mb-6">
                  We stay ahead of the curve with the latest repair technologies,
                  premium parts, and industry best practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  Integrity
                </h3>
                <p className="text-gray-600 mb-6">
                  We operate with complete transparency, honest pricing,
                  and genuine warranty coverage on all our products.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  Community
                </h3>
                <p className="text-gray-600 mb-6">
                  We're part of the repair community and support the professionals
                  who keep our devices working and reduce electronic waste.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-[#D4AF37] rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Become part of the Midas Technical Solutions family and get access to premium parts,
              expert support, and exclusive deals for professional repair technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-white text-[#D4AF37] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Premium Parts
              </Link>
              <Link
                href="/register"
                className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#D4AF37] transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
