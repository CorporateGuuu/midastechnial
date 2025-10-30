"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li><Link href="/" onClick={onClose}>Home</Link></li>
            <li><Link href="/products" onClick={onClose}>Products</Link></li>
            <li><Link href="/financing" onClick={onClose}>Financing</Link></li>
            <li><Link href="/contact" onClick={onClose}>Contact</Link></li>
            <li className="pt-3 border-t">
              <Link href="/login" onClick={onClose}>Sign In</Link>
            </li>
            <li><Link href="/register" onClick={onClose}>Register</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
