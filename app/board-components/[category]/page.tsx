import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Smartphone, Laptop, Tablet, Monitor, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

const categoryData = {
  'microsoft-surface': {
    title: 'Microsoft Surface',
    icon: <Laptop className="w-8 h-8" />,
    description: 'Board components for Microsoft Surface devices including Surface Pro, Surface Book, and Surface Go models.',
    devices: [
      'Surface Pro 6 (1796)',
      'Surface Pro 5 (1796)',
      'Surface Pro 4 (1724)',
      'Surface Pro 3 (1631)',
      'Surface Pro 2 (1572)'
    ]
  },
  'motorola': {
    title: 'Motorola',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Motorola smartphones and tablets including Moto G, Moto Z, and Droid series.',
    devices: [
      'Moto G Stylus 6.4" (XT2043 / 2020)',
      'Moto Z3',
      'Moto Z3 Play(XT1929)',
      'Moto Droid Turbo (XT1254)'
    ]
  },
  'revvl': {
    title: 'Revvl',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for T-Mobile Revvl series smartphones.',
    devices: [
      'T-Mobile Revvl V+ 5G',
      'T-Mobile Revvl 5G'
    ]
  },
  'tcl': {
    title: 'TCL',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for TCL smartphones.',
    devices: [
      'TCL 30 SE'
    ]
  },
  'macbook-pro': {
    title: 'MacBook Pro',
    icon: <Laptop className="w-8 h-8" />,
    description: 'Board components for Apple MacBook Pro laptops including Touch Bar and Retina models.',
    devices: [
      'All Mac Board Component',
      '13" (A2289)',
      '13" (A2251)',
      '13" (A2159)',
      'Touch Bar 15" (A1990)',
      'Touch Bar 15" (A1707)',
      'Touch Bar 13" (A1989)',
      'Touch Bar 13" (A1706)',
      'Retina 15" (A1398)',
      'Retina 13" (A1708)',
      'Retina 13" (A1502)',
      'Retina 13" (A1425)',
      'Unibody 17" (A1297)',
      'Unibody 15" (A1286)',
      'Unibody 13" (A1278)'
    ]
  },
  'macbook': {
    title: 'MacBook',
    icon: <Laptop className="w-8 h-8" />,
    description: 'Board components for Apple MacBook laptops including Retina and Unibody models.',
    devices: [
      '13" (A1181)',
      'Retina 12" (A1534)',
      'Unibody 13" (A1342)'
    ]
  },
  'macbook-air': {
    title: 'MacBook Air',
    icon: <Laptop className="w-8 h-8" />,
    description: 'Board components for Apple MacBook Air laptops.',
    devices: [
      'Air 13" (A2179)',
      'Air 13" (A1932)',
      'Air 13" (A1466)',
      'Air 13" (A1369)',
      'Air 11" (A1465)',
      'Air 11" (A1370)'
    ]
  },
  'mac-mini': {
    title: 'Mac Mini',
    icon: <Monitor className="w-8 h-8" />,
    description: 'Board components for Apple Mac Mini desktop computers.',
    devices: [
      'Mac Mini'
    ]
  },
  'ipad': {
    title: 'iPad',
    icon: <Tablet className="w-8 h-8" />,
    description: 'Board components for Apple iPad tablets including iPad Pro, iPad Air, and iPad Mini models.',
    devices: [
      'iPad Pro 13" 7th Gen (2024)',
      'iPad 9 (2021)',
      'iPad Air 1',
      'iPad Pro 12.9" 6th Gen (2022)',
      'iPad 8 (2020)',
      'iPad Mini 7 (2024)',
      'iPad Pro 12.9" 5th Gen (2021)',
      'iPad 7 (2019)',
      'iPad Mini 6 (2021)',
      'iPad Pro 12.9" 4th Gen (2020)',
      'iPad 6 (2018)',
      'iPad Mini 5 (2019)',
      'iPad Pro 12.9" 3rd Gen (2018)',
      'iPad 5 (2017)',
      'iPad Mini 4',
      'iPad Pro 12.9" 2nd Gen (2017)',
      'iPad 4',
      'iPad Mini 3',
      'iPad Pro 12.9" 1st Gen (2015)',
      'iPad 3',
      'iPad Mini 2',
      'iPad Pro 11" 4th Gen (2022)',
      'iPad 2',
      'iPad Mini 1',
      'iPad Pro 11" 3rd Gen (2021)',
      'iPad Air 13" (2025)',
      'iPad Pro 11" 2nd Gen (2020)',
      'iPad Air 11" (2025)',
      'iPad Pro 11" 1st Gen (2018)',
      'iPad Pro 10.5"',
      'iPad Air 13" (2024)',
      'iPad Pro 9.7"',
      'iPad Air 11" (2024)',
      'iPad 10 (2022)',
      'iPad Air 5 (2022)',
      'iPad Air 4 (2020)',
      'iPad Air 3 (2019)',
      'iPad Air 2'
    ]
  },
  'galaxy-s-series': {
    title: 'Galaxy S Series',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Samsung Galaxy S series smartphones including Ultra, Plus, and standard models.',
    devices: [
      'Galaxy S25 Edge',
      'Galaxy S25 Ultra',
      'Galaxy S25 Plus',
      'Galaxy S25',
      'Galaxy S24 Ultra',
      'Galaxy S24 Plus',
      'Galaxy S24',
      'Galaxy S23 Ultra',
      'Galaxy S23 Plus',
      'Galaxy S23',
      'Galaxy S22 Ultra',
      'Galaxy S22 Plus',
      'Galaxy S22',
      'Galaxy S21 Ultra',
      'Galaxy S21 Plus',
      'Galaxy S21',
      'Galaxy S20 FE',
      'Galaxy S20 Ultra',
      'Galaxy S20 Plus',
      'Galaxy S20',
      'Galaxy S10 Plus',
      'Galaxy S10',
      'Galaxy S10e',
      'Galaxy S9 Plus',
      'Galaxy S9',
      'Galaxy S8 Plus',
      'Galaxy S8',
      'Galaxy S7 Edge',
      'Galaxy S7',
      'Galaxy S6 Edge Plus',
      'Galaxy S6 Edge',
      'Galaxy S6',
      'Galaxy S5',
      'Galaxy S4',
      'Galaxy S3'
    ]
  },
  'galaxy-note-series': {
    title: 'Galaxy Note Series',
    icon: <Tablet className="w-8 h-8" />,
    description: 'Board components for Samsung Galaxy Note series phablets.',
    devices: [
      'Galaxy Note 20 Ultra',
      'Galaxy Note 20',
      'Galaxy Note 10 Plus',
      'Galaxy Note 10 Lite',
      'Galaxy Note 10',
      'Galaxy Note 9',
      'Galaxy Note 8',
      'Galaxy Note 5',
      'Galaxy Note 4',
      'Galaxy Note 3',
      'Galaxy Note 2'
    ]
  },
  'google-pixel': {
    title: 'Google Pixel',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Google Pixel smartphones including XL and standard models.',
    devices: [
      'Pixel 6 Pro',
      'Pixel 4 XL',
      'Pixel 3a XL',
      'Pixel 3a',
      'Pixel 3 XL',
      'Pixel 3',
      'Pixel 2 XL',
      'Pixel 2',
      'Pixel XL',
      'Pixel'
    ]
  },
  'samsung-j-series': {
    title: 'Samsung J Series',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Samsung J series smartphones including J7, J5, and other J-series models.',
    devices: [
      'J8 (J810 / 2018)',
      'J7 Pro (J730 / 2017)',
      'J7 (J727 / 2017)',
      'J7 Duos (J710 / 2016)',
      'J7 Prime (G610 / 2016)',
      'J7 (U700 / 2015)',
      'J5 Prime (G570 / 2015)',
      'J5 (J530 / 2017)',
      'J5 (J500 / 2015)',
      'J4 (J400 / 2018)',
      'J3 Pro (J3110 / 2016)',
      'J3 (J320 / 2016)',
      'J2 (J200 / 2015)',
      'J1 Ace (J110 / 2016)'
    ]
  },
  'samsung-a-series': {
    title: 'Samsung A Series',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Samsung A series smartphones including A50, A70, A51, and other A-series models.',
    devices: [
      'A9 Pro (A910 / 2016)',
      'A80 (A805 / 2019)',
      'A8 Star (G885 / 2018)',
      'A8 (A530 / 2018)',
      'A70 (A705 / 2019)',
      'A7 (A720 / 2017)',
      'A7 (A710 / 2016)',
      'A6 Plus (A605 / 2018)',
      'A51 5G (A516 / 2020)',
      'A51 4G (A515 / 2019)',
      'A50 (A505 / 2019)',
      'A5 (A510 / 2016)',
      'A5 (A500 / 2015)',
      'A42 5G (A426 / 2020)',
      'A31 (A315 / 2020)',
      'A30 (A305 / 2019)',
      'A3 (A310 / 2016)',
      'A22 5G (A226 / 2021)',
      'A13 5G (A136U / 2021)',
      'A12 Nacho (A127 / 2021)',
      'A12 (A125 / 2020)'
    ]
  },
  'samsung-tab-series': {
    title: 'Samsung Tab Series',
    icon: <Tablet className="w-8 h-8" />,
    description: 'Board components for Samsung Galaxy Tab series tablets including Tab A, Tab S, and Tab E models.',
    devices: [
      'Tab A7 10.4" (2020)',
      'Tab A 10.1" (2019)',
      'Tab A 8.4" (2020)',
      'Tab A 8.0" (2018)',
      'Tab S 10.5"',
      'Tab E 9.6" (2015)(T560 / T561)',
      'Tab 4 7.0" (2014)'
    ]
  },
  'samsung-others': {
    title: 'Samsung Others',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for other Samsung devices including Galaxy F, Grand, Core, and C series.',
    devices: [
      'Galaxy F52 5G',
      'Galaxy Grand Prime',
      'Galaxy Core Prime',
      'Galaxy Grand Duos',
      'Samsung C7',
      'Samsung C5'
    ]
  },
  'boost': {
    title: 'Boost',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for Boost Mobile smartphones.',
    devices: [
      'Celero 5G'
    ]
  },
  'lg': {
    title: 'LG',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Board components for LG smartphones including G series and K series models.',
    devices: [
      'LG G8X Thinq',
      'LG G4',
      'LG K20'
    ]
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category as keyof typeof categoryData]

  if (!category) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-yellow-600">Home</Link>
              <span>/</span>
              <Link href="/board-components" className="hover:text-yellow-600">Board Components</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{category.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-full">
                {category.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{category.title}</h1>
            </div>
            <p className="text-xl text-yellow-100 max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/board-components"
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Categories
          </Link>
        </div>

        {/* Devices Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Device Models</h2>
            <p className="text-gray-600 mb-8">
              Select your specific device model to view available board components and parts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.devices.map((device, index) => (
                <Link
                  key={index}
                  href={`/products?category=board-components&device=${encodeURIComponent(device)}`}
                  className="bg-gray-50 hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {device}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-yellow-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Finding Parts?</h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Our technical support team can help you identify the right components for your specific device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="inline-block bg-white text-yellow-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/products?category=board-components"
                className="inline-block bg-yellow-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-800 transition-colors"
              >
                Browse All Components
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
