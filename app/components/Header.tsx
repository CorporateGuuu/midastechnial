"use client";

import Link from 'next/link'
import { Search, ShoppingCart, User, HelpCircle } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: 'Apple', href: '/products?category=apple' },
  { name: 'Samsung', href: '/products?category=samsung' },
  { name: 'Motorola', href: '/products?category=motorola' },
  { name: 'Google', href: '/products?category=google' },
  { name: 'Other Parts', href: '/products?category=other-parts' },
  { name: 'Game Console', href: '/products?category=game-console' },
  { name: 'Accessories', href: '/products?category=accessories' },
  { name: 'Tools & Supplies', href: '/products?category=tools-supplies' },
  { name: 'Refurbishing', href: '/products?category=refurbishing' },
  { name: 'Board Components', href: '/products?category=board-components' },
  { name: 'Pre-Owned Devices', href: '/products?category=pre-owned' }
]

export default function Header() {
  const totalItems = useCart((s) => s.getTotalItems());
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold text-lg" style={{ background: 'linear-gradient(135deg, #D4AF37, #b8941f)' }}>
              MT
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Midas Technical</div>
              <div className="text-xs text-gray-500 -mt-1">Solutions</div>
            </div>
          </Link>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-[#D4AF37]" />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/account">
              <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </Link>
            <Link href="/support">
              <HelpCircle className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-6 text-sm font-medium">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-[#D4AF37] transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm">
              {/* Login/Register links removed from menu bar */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
