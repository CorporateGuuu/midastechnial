// app/checkout/success/page.tsx
"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cartStore";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-md mx-auto text-center py-20">
      <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order is being processed.
      </p>
      <a
        href="/orders"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
      >
        View Order History
      </a>
    </div>
  );
}
