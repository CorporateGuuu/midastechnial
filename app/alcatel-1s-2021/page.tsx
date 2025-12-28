'use client';

import { useState, useMemo } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

// Alcatel 1S (2021) Parts Data - Real wholesale supplier data
const alcatelParts = [
  {
    id: 1,
    name: 'LCD Assembly',
    sku: 'ALC-1102A',
    category: 'Screens',
    price: 13.11,
    description: 'Complete LCD display assembly with digitizer, frame, and backlight for Alcatel 1S (2021). Refurbished OEM quality.',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: true,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 2,
    name: 'Charging Port Board',
    sku: 'ALC-1201B',
    category: 'Ports',
    price: 2.17,
    description: 'USB charging port board with flex cable and connector for reliable charging and data transfer',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: true,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 3,
    name: 'Battery',
    sku: 'ALC-1301A',
    category: 'Batteries',
    price: 6.71,
    description: 'Original capacity lithium-ion battery with integrated flex cable for optimal performance and longevity',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: true,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 4,
    name: 'Main Flex Cable',
    sku: 'ALC-1401A',
    category: 'Flex Cables',
    price: 4.25,
    description: 'Main motherboard flex cable connecting display, charging port, and battery for seamless communication',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 5,
    name: 'Digitizer Assembly',
    sku: 'ALC-1501B',
    category: 'Digitizers',
    price: 8.99,
    description: 'Touchscreen digitizer overlay with precise touch response and compatibility with LCD assembly',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 6,
    name: 'Vibrator Motor',
    sku: 'ALC-1601A',
    category: 'Vibration',
    price: 1.89,
    description: 'Linear vibration motor with mounting bracket for haptic feedback and notifications',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 7,
    name: 'Power Button Flex',
    sku: 'ALC-1701B',
    category: 'Flex Cables',
    price: 3.45,
    description: 'Power button and volume control flex cable with integrated LED for status indication',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 8,
    name: 'Camera Flex Cable',
    sku: 'ALC-1801A',
    category: 'Flex Cables',
    price: 5.67,
    description: 'Rear camera module flex cable with autofocus and image stabilization connectors',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 9,
    name: 'Speaker Assembly',
    sku: 'ALC-1901B',
    category: 'Audio',
    price: 4.12,
    description: 'Main speaker with earpiece and microphone for clear audio output and voice communication',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 10,
    name: 'Proximity Sensor',
    sku: 'ALC-2001A',
    category: 'Sensors',
    price: 2.78,
    description: 'Infrared proximity sensor with flex cable for auto screen off during calls',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 11,
    name: 'Light Sensor',
    sku: 'ALC-2101B',
    category: 'Sensors',
    price: 1.95,
    description: 'Ambient light sensor for automatic brightness adjustment and power saving',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  },
  {
    id: 12,
    name: 'SIM Card Reader',
    sku: 'ALC-2201A',
    category: 'Ports',
    price: 3.22,
    description: 'Dual SIM card slot assembly with eject mechanism for network connectivity',
    compatibility: 'Alcatel 1S (2021 / 6025)',
    supplier: 'MobileSentrix',
    featured: false,
    image: '/placeholder-alcatel.jpg'
  }
];

const categories = ['All', 'Screens', 'Ports', 'Batteries', 'Flex Cables', 'Digitizers', 'Vibration', 'Audio', 'Sensors'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price Low-High' },
  { value: 'price-high', label: 'Price High-Low' },
  { value: 'name-asc', label: 'Name A-Z' }
];

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-slate-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default function AlcatelPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const itemsPerPage = 12;

  const filteredAndSortedParts = useMemo(() => {
    let filtered = alcatelParts;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(part => part.category === selectedCategory);
    }

    // Apply price filter
    if (minPrice) {
      filtered = filtered.filter(part => part.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(part => part.price <= parseFloat(maxPrice));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, minPrice, maxPrice]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedParts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParts = filteredAndSortedParts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const closeFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Filters Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="w-14 h-14 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-200 flex items-center justify-center"
          aria-label="Open filters"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeFilters} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                <button
                  onClick={closeFilters}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto h-full pb-24">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Component Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-slate-900 font-medium transition-all duration-200"
                  aria-label="Filter by category"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Price Range (USD)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Minimum price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white placeholder-slate-400"
                  />
                  <input
                    type="number"
                    placeholder="Maximum price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  clearFilters();
                  closeFilters();
                }}
                className="w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
              <span className="text-yellow-400 text-sm font-medium">Premium Alcatel Components</span>
            </div>

            <h1 className={`${playfairDisplay.className} text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight`}>
              <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
                Alcatel 1S
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                (2021 / 6025)
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Authentic wholesale replacement parts sourced directly from MobileSentrix for professional smartphone repairs.
              Trusted by technicians worldwide for unparalleled quality and performance in Alcatel device servicing.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{alcatelParts.length}</div>
                <div className="text-slate-400 text-sm">Premium Parts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-slate-400 text-sm">Authentic</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-slate-400 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80 lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-900/5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Refine Search</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Component Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-slate-900 font-medium transition-all duration-200"
                  aria-label="Filter by category"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="py-2">{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Price Range (USD)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Minimum price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white placeholder-slate-400 transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder="Maximum price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white placeholder-slate-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header with Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedCategory === 'All' ? 'All Alcatel Parts' : `${selectedCategory} Components`}
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-slate-600 font-medium">
                    {filteredAndSortedParts.length} premium parts available
                  </p>
                  {(selectedCategory !== 'All' || minPrice || maxPrice) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                      Filtered
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-slate-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-slate-900 font-medium transition-all duration-200"
                  aria-label="Sort products"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="py-2">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentParts.map((part) => (
                <div
                  key={part.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl opacity-15 group-hover:opacity-25 transition-opacity duration-300">📱</div>
                    </div>

                    {part.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        ★ Featured
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Category badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 mb-4">
                      <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">
                        {part.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-yellow-700 transition-colors duration-200">
                      {part.name}
                    </h3>

                    <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                      {part.description}
                    </p>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-slate-900">
                        ${part.price.toFixed(2)}
                      </div>
                      <button
                        className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 hover:-translate-y-0.5 border-2 border-yellow-500"
                        aria-label={`Add ${part.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* SKU and supplier */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-mono bg-slate-100 px-2 py-1 rounded-md">
                          {part.sku}
                        </span>
                        <span className="font-medium">
                          {part.supplier}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {filteredAndSortedParts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No parts match your criteria</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Try adjusting your filters or browse our complete catalog of premium Alcatel components.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-yellow-500 text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500"
                >
                  View All Parts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
