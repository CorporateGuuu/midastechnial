"use client";

import { Star } from "lucide-react";
import { useCart } from "../store/cartStore";
import { Product } from "../types";
import { Badge } from "./ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl relative">
        {product.badge && (
          <Badge variant={product.badge} className="absolute top-2 right-2">
            {product.badge.toUpperCase()}
          </Badge>
        )}
        <div className="text-gray-400">
          {product.category === "iphone" ? "Phone" : product.category === "macbook" ? "Laptop" : "Tool"}
        </div>
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
          onClick={() => addItem(product)}
          className="w-full bg-yellow-500 text-black font-medium py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
