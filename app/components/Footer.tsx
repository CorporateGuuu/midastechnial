import Link from 'next/link'
import { ChevronDown, MapPin, MessageCircle, Phone, HelpCircle, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top Settings Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-bold text-lg">
                MT
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  <span className="text-[#D4AF37]">Midas</span> Technical Solutions
                </h3>
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <span className="text-lg">🇺🇸</span>
                <span>United States</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <span>English</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <span>USD</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* About Column */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
              <li><Link href="/quality-standards" className="hover:text-[#D4AF37] transition-colors">Quality Standards</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#D4AF37] transition-colors">Return Policy</Link></li>
              <li><Link href="/trademark-disclaimer" className="hover:text-[#D4AF37] transition-colors">Trademark Disclaimer</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/payment-methods" className="hover:text-[#D4AF37] transition-colors">Payment Methods</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#D4AF37] transition-colors">Terms And Conditions</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="hover:text-[#D4AF37] transition-colors">My Account</Link></li>
              <li><Link href="/lcd-buyback" className="hover:text-[#D4AF37] transition-colors">LCD Buyback</Link></li>
              <li><Link href="/products?category=pre-owned" className="hover:text-[#D4AF37] transition-colors">Pre-Owned Devices</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Marketing Material</Link></li>
            </ul>
          </div>

          {/* Our Brands Column */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Our Brands</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><Link href="/brands/xo7-2-0-technology" className="hover:text-[#D4AF37] transition-colors">XO7 2.0 Technology</Link></div>
              <div><Link href="/brands/a07-technology" className="hover:text-[#D4AF37] transition-colors">A07 Technology</Link></div>
              <div><Link href="/brands/ampsentrix" className="hover:text-[#D4AF37] transition-colors">AmpSentrix</Link></div>
              <div><Link href="/brands/casper" className="hover:text-[#D4AF37] transition-colors">Casper</Link></div>
              <div><Link href="/brands/displaybase" className="hover:text-[#D4AF37] transition-colors">DisplayBase</Link></div>
              <div><Link href="/brands/screwbox-2-0" className="hover:text-[#D4AF37] transition-colors">ScrewBox 2.0</Link></div>
              <div><Link href="/brands/tapebase" className="hover:text-[#D4AF37] transition-colors">TapeBase</Link></div>
            </div>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/location" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</Link></li>

              <li><Link href="tel:+1-800-MIDAS-01" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp</Link></li>
              <li><Link href="mailto:support@midastechnical.com" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Link></li>
              <li><Link href="/support" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><HelpCircle className="w-4 h-4" /> FAQs</Link></li>
            </ul>
          </div>

          {/* Authorized Distributors */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Authorized Distributor</h4>
            <div className="space-y-2">
              <div className="bg-white/10 rounded-full px-4 py-2 text-center text-sm">Apple</div>
              <div className="bg-white/10 rounded-full px-4 py-2 text-center text-sm">Google</div>
              <div className="bg-white/10 rounded-full px-4 py-2 text-center text-sm">OnePlus</div>
              <div className="bg-white/10 rounded-full px-4 py-2 text-center text-sm">Motorola</div>
              <div className="bg-white/10 rounded-full px-4 py-2 text-center text-sm">LG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Social */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="text-sm font-medium text-gray-400 mr-4">We Accept:</div>
            <div className="flex items-center gap-3">
              {/* Payment Icons (using text placeholders) */}
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">VISA</div>
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">PayPal</div>
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">Apple Pay</div>
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">AMEX</div>
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">Discover</div>
              <div className="bg-white/10 rounded px-3 py-1 text-xs font-medium">Mastercard</div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/midas-technical-solutions/?viewAsMember=true" className="text-gray-400 hover:text-[#D4AF37] transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/midastechnical/#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm mb-2">
              &copy; 2025 Midas Technical Solutions. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Midas Technical Solutions is not affiliated with Apple Inc., Google LLC, or any other trademark holders.
              All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
