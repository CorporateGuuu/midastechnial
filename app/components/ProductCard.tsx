"use client";

import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/store/cartStore";
import { Product } from "@/types";
import { Badge } from "./ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);

  // Only gate pre-owned products
  const isPreOwnedProduct = product.category === 'pre-owned' ||
                           product.title.toLowerCase().includes('pre-owned') ||
                           product.badge?.toLowerCase().includes('pre-owned');



  if (status === "loading" && isPreOwnedProduct) {
    return (
      <div className="bg-white border rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-square bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (isPreOwnedProduct && !session) {
    return (
      <div className="bg-white border rounded-lg overflow-hidden relative">
        <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl relative">
          <div className="text-gray-400">
            {product.category === "iphone" ? "Phone" : product.category === "macbook" ? "Laptop" : "Tool"}
          </div>
          {/* Overlay for login required */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <div className="text-sm font-medium mb-2">Login Required</div>
              <div className="text-xs mb-3">Login Required to View Pre-Owned Stock</div>
              <button
                onClick={() => router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
              >
                Sign In to View
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <div className="text-sm text-gray-600 mb-3">Pre-owned device - Login required</div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl relative">
          {product.badge && (
            <Badge variant={product.badge} className="absolute top-2 right-2">
              {product.badge.toUpperCase()}
            </Badge>
          )}
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">
              {product.category === "iphone" ? "📱" :
               product.category === "macbook" ? "💻" :
               product.category === "ipad" ? "📱" : "🔧"}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-2xl font-bold">${product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${product.oldPrice}</span>
              )}
            </div>
            <span className="text-green-600 text-sm">In Stock</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full bg-yellow-500 text-black font-medium py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
