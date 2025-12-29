"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Search, ShoppingCart, User, HelpCircle, Menu, ChevronDown } from "lucide-react";
import { useCart } from "@/store/cartStore";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preOwnedDropdownOpen, setPreOwnedDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCart((s) => s.getTotalItems());

  const preOwnedSubItems = [
    { name: 'Grade A iPhones', href: '/products?category=pre-owned&device=iphones&grade=a' },
    { name: 'Grade B iPhones', href: '/products?category=pre-owned&device=iphones&grade=b' },
    { name: 'Grade C iPhones', href: '/products?category=pre-owned&device=iphones&grade=c' },
    { name: 'Grade A Android Phones', href: '/products?category=pre-owned&device=android&grade=a' },
    { name: 'Grade B Android Phones', href: '/products?category=pre-owned&device=android&grade=b' },
    { name: 'Grade A Gaming Consoles', href: '/products?category=pre-owned&device=consoles&grade=a' },
    { name: 'Grade B Gaming Consoles', href: '/products?category=pre-owned&device=consoles&grade=b' },
    { name: 'Tested Refurbished Devices', href: '/products?category=pre-owned&condition=tested' },
    { name: 'All Pre-Owned Devices', href: '/products?category=pre-owned' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm py-2">
          <div className="flex gap-4">
            <span>Free shipping on $99+</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex gap-4">
            {session ? (
              <Link href="/portal" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Portal
              </Link>
            ) : (
              <>
                <Link href="/login">Sign In</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-black font-bold text-lg">
              MT
            </div>
            <div>
              <div className="font-bold text-xl">Midas Technical</div>
              <div className="text-xs text-gray-500 -mt-1">Solutions</div>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl mx-8 relative hidden md:block">
            <input
              type="text"
              placeholder="Search for premium repair parts..."
              className="w-full pl-4 pr-12 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Search">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/account"><User className="w-6 h-6" /></Link>
            <Link href="/support"><HelpCircle className="w-6 h-6" /></Link>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-gray-50 border-t relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>

            {/* Pre-Owned Devices Category with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPreOwnedDropdownOpen(!preOwnedDropdownOpen)}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                aria-expanded={preOwnedDropdownOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                Pre-Owned Devices
                <ChevronDown className={`w-4 h-4 transition-transform ${preOwnedDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {preOwnedDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">
                      Pre-Owned & Refurbished Devices
                    </div>
                    <div className="grid grid-cols-1">
                      {preOwnedSubItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          onClick={() => setPreOwnedDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/products" className="hover:text-blue-600 transition-colors">Other Products</Link>
            <Link href="/financing" className="hover:text-blue-600 transition-colors">Financing</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>

        {/* Close dropdown when clicking outside */}
        {preOwnedDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setPreOwnedDropdownOpen(false)}
          />
        )}
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
