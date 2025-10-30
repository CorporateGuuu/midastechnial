"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Search, ShoppingCart, User, HelpCircle, Menu } from "lucide-react";
import { useCart } from "../store/cartStore";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCart((s) => s.getTotalItems());

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
      <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/financing">Financing</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
