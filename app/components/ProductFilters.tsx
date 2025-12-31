"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterState {
  model: string;
  color: string;
  quality: string;
  priceRange: string;
}

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    model: searchParams.get("model") || "",
    color: searchParams.get("color") || "",
    quality: searchParams.get("quality") || "",
    priceRange: searchParams.get("priceRange") || "",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const params = new URLSearchParams(searchParams.toString());

    // Update URL params
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({ model: "", color: "", quality: "", priceRange: "" });
    router.push("/products");
  };

  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Model Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={filters.model}
            onChange={(e) => updateFilters({ model: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Models</option>
            <option value="iphone-13">iPhone 13</option>
            <option value="iphone-14">iPhone 14</option>
            <option value="iphone-15">iPhone 15</option>
            <option value="macbook-pro">MacBook Pro</option>
            <option value="macbook-air">MacBook Air</option>
            <option value="ipad-pro">iPad Pro</option>
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <select
            value={filters.color}
            onChange={(e) => updateFilters({ color: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Colors</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
          </select>
        </div>

        {/* Quality Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Grade
          </label>
          <select
            value={filters.quality}
            onChange={(e) => updateFilters({ quality: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Grades</option>
            <option value="Premium">Premium</option>
            <option value="OEM">OEM</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilters({ priceRange: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
