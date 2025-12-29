'use client';

import { useState } from 'react';

export default function BulkComponentsPage() {
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: string]: number}>({});
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const products = [
    {
      id: 'ic-chips',
      title: 'Premium IC Chips Assortment',
      description: 'High-quality integrated circuits for iPhone, Samsung, and other devices. Various models available.',
      price: 2.50,
      moq: 50,
      options: [50, 100, 500],
      badge: 'Bulk',
      icon: '🔸'
    },
    {
      id: 'fpc-connectors',
      title: 'Flexible Printed Circuit Connectors',
      description: 'High-precision FPC connectors for LCD displays, cameras, and touch panels.',
      price: 1.20,
      moq: 100,
      options: [100, 250, 1000],
      badge: 'Premium',
      icon: '🔌'
    },
    {
      id: 'usb-connectors',
      title: 'Micro USB Charging Ports',
      description: 'Replacement charging ports with integrated flex cables for various smartphone models.',
      price: 3.75,
      moq: 25,
      options: [25, 50, 100],
      badge: 'Hot',
      icon: '📱'
    },
    {
      id: 'capacitors',
      title: 'Surface Mount Capacitors',
      description: 'High-quality SMD capacitors in various capacitance values for board-level repairs.',
      price: 0.15,
      moq: 500,
      options: [500, 1000, 5000],
      badge: 'Bulk',
      icon: '⚡'
    },
    {
      id: 'resistors',
      title: 'Precision Resistors Array',
      description: 'SMD resistors in standard values for circuit board repairs and modifications.',
      price: 0.08,
      moq: 1000,
      options: [1000, 2500, 10000],
      badge: 'Premium',
      icon: '🟢'
    },
    {
      id: 'led-arrays',
      title: 'Backlight LED Strips',
      description: 'High-brightness LED arrays for display backlighting and indicator lights.',
      price: 1.85,
      moq: 50,
      options: [50, 100, 250],
      badge: 'Hot',
      icon: '💡'
    }
  ];

  const selectQuantity = (productId: string, quantity: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const addToBulkCart = (productId: string, title: string) => {
    const quantity = selectedQuantities[productId];
    if (!quantity) {
      showNotification('Please select a quantity first.', 'error');
      return;
    }

    setCartCount(prev => prev + 1);
    showNotification(`${title} (${quantity}pcs) added to bulk cart!`, 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleBulkInquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Check if all required fields are filled
    const requiredFields = ['name', 'email', 'phone', 'company', 'message'];
    const isValid = requiredFields.every(field => data[field]?.toString().trim());

    if (!isValid) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    showNotification('Thank you for your bulk inquiry! Our team will contact you within 24 hours.', 'success');
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg font-medium max-w-md ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        {/* Top Bar */}
        <div className="bg-gray-50 border-b border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Wholesale Pricing • Volume Discounts • Fast Delivery
            </div>
            <div className="flex gap-4 text-sm">
              <a href="/login" className="text-gray-600 hover:text-gray-900">Sign In</a>
              <a href="/register" className="text-gray-600 hover:text-gray-900">Register</a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                MT
              </div>
              <div className="font-bold text-xl">
                <div>Midas Technical</div>
                <div className="text-sm text-gray-600 -mt-1">Solutions</div>
              </div>
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Search bulk components..."
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  Search
                </button>
              </div>
            </div>

            {/* Header Icons */}
            <div className="flex gap-4">
              <a href="/bulk-cart" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 relative">
                <span className="font-semibold text-gray-700">Bulk Cart</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {cartCount}
                </span>
              </a>
              <a href="/account" className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">Account</a>
              <a href="/support" className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">Support</a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex gap-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
              <a href="/xbox-series-x" className="text-gray-700 hover:text-gray-900 font-medium">Xbox Series X</a>
              <a href="/bulk-components" className="text-yellow-600 font-medium border-b-2 border-yellow-600">Bulk Components</a>
              <a href="/products" className="text-gray-700 hover:text-gray-900 font-medium">Retail</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4 text-yellow-400">Bulk Board Components</h1>
          <p className="text-2xl font-semibold mb-8 text-yellow-400 opacity-90">Premium Microsoldering Parts & Electronic Components</p>
          <p className="text-xl text-yellow-300 max-w-3xl mx-auto leading-relaxed">
            Access our extensive wholesale inventory of IC chips, FPC connectors, fuses, capacitors, and premium electronic components.
            Trusted by professional repair technicians worldwide for quality, reliability, and competitive pricing.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Featured Bulk Components</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            High-quality components available in bulk quantities for professional repairs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  <div className="text-4xl">{product.icon}</div>
                  <div className="absolute top-4 right-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {product.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-yellow-600">${product.price.toFixed(2)}/piece</span>
                    <span className="text-sm text-green-600 font-medium">MOQ: {product.moq}pcs</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {product.options.map((qty) => (
                      <button
                        key={qty}
                        onClick={() => selectQuantity(product.id, qty)}
                        className={`px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors ${
                          selectedQuantities[product.id] === qty
                            ? 'bg-yellow-600 text-black border-yellow-600'
                            : 'text-gray-700 hover:border-yellow-600 hover:text-yellow-600'
                        }`}
                      >
                        {qty}pcs
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => addToBulkCart(product.id, product.title)}
                    className="w-full bg-yellow-600 text-black py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    Add to Bulk Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Volume Discounts</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy tiered pricing based on order volume. Higher quantities mean lower per-unit costs,
                maximizing your profit margins on repairs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Expedited shipping options available. Most bulk orders ship within 24-48 hours
                with tracking and insurance included.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                All components are tested and certified. We stand behind our products with
                a 30-day warranty and return policy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Technical Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Access our team of experienced technicians for component selection advice,
                compatibility guidance, and repair support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Need Custom Quantities?</h2>
          <p className="text-yellow-300 text-lg mb-8">
            Contact our wholesale team for custom orders, special pricing, or component sourcing assistance.
          </p>

          <form onSubmit={handleBulkInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              className="px-4 py-3 rounded-lg border-0 text-gray-900"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              className="px-4 py-3 rounded-lg border-0 text-gray-900"
              placeholder="Business Email"
              required
            />
            <input
              type="tel"
              name="phone"
              className="px-4 py-3 rounded-lg border-0 text-gray-900"
              placeholder="Phone Number"
              required
            />
            <input
              type="text"
              name="company"
              className="px-4 py-3 rounded-lg border-0 text-gray-900"
              placeholder="Company Name"
              required
            />
            <textarea
              name="message"
              className="col-span-full px-4 py-3 rounded-lg border-0 text-gray-900 min-h-32 resize-vertical"
              placeholder="Tell us about your bulk component needs..."
              required
            ></textarea>
            <button
              type="submit"
              className="col-span-full bg-yellow-600 text-black py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Send Bulk Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center text-black font-bold text-xl">
                  MT
                </div>
                <div className="font-bold text-xl">
                  <div>Midas Technical</div>
                  <div className="text-sm text-gray-400 -mt-1">Solutions</div>
                </div>
              </div>
              <p className="text-gray-400">
                Your trusted wholesale partner for premium repair parts and electronic components.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/bulk-components" className="text-gray-400 hover:text-white">Bulk Components</a></li>
                <li><a href="/products" className="text-gray-400 hover:text-white">Retail Products</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="/financing" className="text-gray-400 hover:text-white">Financing</a></li>
              </ul>
            </div>

            {/* Wholesale Info */}
            <div>
              <h3 className="font-semibold mb-4">Wholesale</h3>
              <ul className="space-y-2">
                <li><a href="/bulk-pricing" className="text-gray-400 hover:text-white">Volume Pricing</a></li>
                <li><a href="/bulk-cart" className="text-gray-400 hover:text-white">Bulk Cart</a></li>
                <li><a href="/shipping" className="text-gray-400 hover:text-white">Shipping Info</a></li>
                <li><a href="/returns" className="text-gray-400 hover:text-white">Returns</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +1 (240) 351-0511</li>
                <li>Email: bulk@midastech.com</li>
                <li>Hours: Mon-Fri: 8AM-6PM EST</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© 2024 Midas Technical Solutions. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="/shipping" className="text-gray-400 hover:text-white">Shipping Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
