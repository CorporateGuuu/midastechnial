'use client';

import { useCart } from '@/store/cartStore';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.inStock === 0}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition ${
        product.inStock > 0
          ? "bg-yellow-500 text-black hover:bg-yellow-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
