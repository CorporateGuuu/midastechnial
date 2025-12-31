"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories = [
    {
      name: 'Apple',
      hasDropdown: true,
      href: '/products?category=apple',
      subcategories: [
        { name: 'iPhone 16 Series', href: '/products?category=apple&device=iphone16' },
        { name: 'iPhone 15 Series', href: '/products?category=apple&device=iphone15' },
        { name: 'iPhone 14 Series', href: '/products?category=apple&device=iphone14' },
        { name: 'iPad', href: '/products?category=apple&device=ipad' },
        { name: 'MacBook', href: '/products?category=apple&device=macbook' },
        { name: 'All Apple Parts', href: '/products?category=apple' }
      ]
    },
    {
      name: 'Samsung',
      hasDropdown: true,
      href: '/products?category=samsung',
      subcategories: [
        { name: 'Galaxy S Series', href: '/products?category=samsung&device=galaxys' },
        { name: 'Galaxy Note Series', href: '/products?category=samsung&device=galaxynote' },
        { name: 'Galaxy A Series', href: '/products?category=samsung&device=galaxya' },
        { name: 'Galaxy Tab', href: '/products?category=samsung&device=galaxytab' },
        { name: 'All Samsung Parts', href: '/products?category=samsung' }
      ]
    },
    {
      name: 'Motorola',
      hasDropdown: true,
      href: '/products?category=motorola',
      subcategories: [
        { name: 'Moto G Series', href: '/products?category=motorola&device=motog' },
        { name: 'Moto Edge Series', href: '/products?category=motorola&device=motoedge' },
        { name: 'Moto One Series', href: '/products?category=motorola&device=motoone' },
        { name: 'All Motorola Parts', href: '/products?category=motorola' }
      ]
    },
    {
      name: 'Google',
      hasDropdown: true,
      href: '/products?category=google',
      subcategories: [
        { name: 'Pixel Series', href: '/products?category=google&device=pixel' },
        { name: 'Pixel XL Series', href: '/products?category=google&device=pixelxl' },
        { name: 'Pixel Fold', href: '/products?category=google&device=pixelfold' },
        { name: 'All Google Parts', href: '/products?category=google' }
      ]
    },
    {
      name: 'Other Parts',
      hasDropdown: false,
      href: '/products?category=other'
    },
    {
      name: 'Game Console',
      hasDropdown: false,
      href: '/products?category=game-console'
    },
    {
      name: 'Accessories',
      hasDropdown: false,
      href: '/products?category=accessories',
      hasNewBadge: true
    },
    {
      name: 'Tools & Supplies',
      hasDropdown: false,
      href: '/products?category=tools-supplies'
    },
    {
      name: 'Refurbishing',
      hasDropdown: false,
      href: '/products?category=refurbishing'
    },
    {
      name: 'Board Components',
      hasDropdown: false,
      href: '/products?category=board-components'
    },
    {
      name: 'Pre-Owned Devices',
      hasDropdown: true,
      href: '/products?category=pre-owned',
      subcategories: [
        { name: 'Grade A iPhones', href: '/products?category=pre-owned&device=iphones&grade=a' },
        { name: 'Grade B iPhones', href: '/products?category=pre-owned&device=iphones&grade=b' },
        { name: 'Grade C iPhones', href: '/products?category=pre-owned&device=iphones&grade=c' },
        { name: 'Grade A Android Phones', href: '/products?category=pre-owned&device=android&grade=a' },
        { name: 'Grade B Android Phones', href: '/products?category=pre-owned&device=android&grade=b' },
        { name: 'Grade A Gaming Consoles', href: '/products?category=pre-owned&device=consoles&grade=a' },
        { name: 'Grade B Gaming Consoles', href: '/products?category=pre-owned&device=consoles&grade=b' },
        { name: 'Tested Refurbished Devices', href: '/products?category=pre-owned&condition=tested' },
        { name: 'All Pre-Owned Devices', href: '/products?category=pre-owned' }
      ]
    }
  ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

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

            {categories.map((category) => (
              <li key={category.name}>
                {category.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center justify-between w-full py-2 text-left hover:bg-gray-100 px-3 rounded transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {category.name}
                        {category.hasNewBadge && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                            NEW
                          </span>
                        )}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedCategories.includes(category.name) && (
                      <div className="mt-2 ml-4 space-y-2">
                        {category.subcategories?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={onClose}
                            className="block py-1 text-sm text-gray-700 hover:text-red-600 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className="flex items-center gap-2 py-2 hover:bg-gray-100 px-3 rounded transition-colors"
                  >
                    {category.name}
                    {category.hasNewBadge && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                        NEW
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}

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
