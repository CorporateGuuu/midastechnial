"use client";

import Link from "next/link";
import { Shield, Truck, HeadphonesIcon, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-black to-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Repair Parts<br />
            <span className="text-yellow-500">Made for Experts</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Premium iPhone, Samsung, MacBook parts. Trusted by 50,000+ technicians.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Shop Now
            </Link>
            <Link href="#categories" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
              View Categories
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-sm">Genuine Parts</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-sm">Free Shipping $99+</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
            <HeadphonesIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-sm">24/7 Support</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-sm">30 Day Warranty</div>
          </div>
        </div>
      </div>
    </section>
  );
}
