import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Smartphone, Laptop, Tablet, Monitor } from 'lucide-react'

export default function BoardComponentsPage() {
  const categories = [
    { title: 'Microsoft Surface', icon: <Laptop className="w-6 h-6" />, count: 5, slug: 'microsoft-surface' },
    { title: 'Motorola', icon: <Smartphone className="w-6 h-6" />, count: 4, slug: 'motorola' },
    { title: 'Revvl', icon: <Smartphone className="w-6 h-6" />, count: 2, slug: 'revvl' },
    { title: 'TCL', icon: <Smartphone className="w-6 h-6" />, count: 1, slug: 'tcl' },
    { title: 'MacBook Pro', icon: <Laptop className="w-6 h-6" />, count: 15, slug: 'macbook-pro' },
    { title: 'MacBook', icon: <Laptop className="w-6 h-6" />, count: 3, slug: 'macbook' },
    { title: 'MacBook Air', icon: <Laptop className="w-6 h-6" />, count: 6, slug: 'macbook-air' },
    { title: 'Mac Mini', icon: <Monitor className="w-6 h-6" />, count: 1, slug: 'mac-mini' },
    { title: 'iPad', icon: <Tablet className="w-6 h-6" />, count: 38, slug: 'ipad' },
    { title: 'Galaxy S Series', icon: <Smartphone className="w-6 h-6" />, count: 36, slug: 'galaxy-s-series' },
    { title: 'Galaxy Note Series', icon: <Tablet className="w-6 h-6" />, count: 11, slug: 'galaxy-note-series' },
    { title: 'Google Pixel', icon: <Smartphone className="w-6 h-6" />, count: 10, slug: 'google-pixel' },
    { title: 'Samsung J Series', icon: <Smartphone className="w-6 h-6" />, count: 14, slug: 'samsung-j-series' },
    { title: 'Samsung A Series', icon: <Smartphone className="w-6 h-6" />, count: 23, slug: 'samsung-a-series' },
    { title: 'Samsung Tab Series', icon: <Tablet className="w-6 h-6" />, count: 7, slug: 'samsung-tab-series' },
    { title: 'Samsung Others', icon: <Smartphone className="w-6 h-6" />, count: 6, slug: 'samsung-others' },
    { title: 'Boost', icon: <Smartphone className="w-6 h-6" />, count: 1, slug: 'boost' },
    { title: 'LG', icon: <Smartphone className="w-6 h-6" />, count: 3, slug: 'lg' }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Board Components</h1>
            <p className="text-xl md:text-2xl font-semibold mb-8 text-yellow-100">
              Device-Specific Board Level Components
            </p>
            <p className="text-lg text-yellow-200 max-w-3xl mx-auto leading-relaxed">
              Premium board components for professional device repairs. Find the exact components you need
              for Microsoft Surface, MacBook, iPad, Samsung Galaxy, Google Pixel, and more.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {category.count} device model{category.count !== 1 ? 's' : ''} available
                  </p>

                  <Link
                    href={`/board-components/${category.slug}`}
                    className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors text-center block"
                  >
                    View All {category.title} Components
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Standards Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Quality Standards & Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Standards</h3>
                <p className="text-gray-600 text-sm">All components meet industry standards for reliability and performance.</p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">↩️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
                <p className="text-gray-600 text-sm">30-day return policy on all board components with full refund.</p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pre-Owned Devices</h3>
                <p className="text-gray-600 text-sm">Carefully tested and refurbished components from trusted sources.</p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                <p className="text-gray-600 text-sm">Expedited shipping options available for urgent repairs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* AmpSentrix Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-green-600">🎵</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">AmpSentrix Audio Solutions</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Premium audio components and repair solutions for superior sound quality.
            </p>
            <Link
              href="/brands/ampsentrix"
              className="inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore AmpSentrix
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
