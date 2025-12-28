"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const [preOwnedExpanded, setPreOwnedExpanded] = useState(false);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li><Link href="/" onClick={onClose} className="block py-2">Home</Link></li>

            {/* Pre-Owned Devices Category with Expandable Submenu */}
            <li>
              <button
                onClick={() => setPreOwnedExpanded(!preOwnedExpanded)}
                className="flex items-center justify-between w-full py-2 text-left bg-blue-600 text-white px-3 rounded-md font-semibold"
                aria-expanded={preOwnedExpanded ? "true" : "false"}
              >
                Pre-Owned Devices
                <ChevronDown className={`w-4 h-4 transition-transform ${preOwnedExpanded ? 'rotate-180' : ''}`} />
              </button>

              {preOwnedExpanded && (
                <div className="mt-2 ml-4 space-y-2">
                  <div className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-1">
                    Pre-Owned & Refurbished Devices
                  </div>
                  {preOwnedSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/products" onClick={onClose} className="block py-2">Other Products</Link></li>
            <li><Link href="/financing" onClick={onClose} className="block py-2">Financing</Link></li>
            <li><Link href="/contact" onClick={onClose} className="block py-2">Contact</Link></li>
            <li className="pt-3 border-t">
              <Link href="/login" onClick={onClose} className="block py-2">Sign In</Link>
            </li>
            <li><Link href="/register" onClick={onClose} className="block py-2">Register</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
