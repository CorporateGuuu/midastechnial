// app/checkout/page.tsx
"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useCart } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { CartItem } from "@/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      window.location.href = "/cart";
    }
  }, [items]);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const { id } = await res.json();

    const { error } = await stripe!.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const total = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        {items.map((item: CartItem) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4 font-bold text-lg">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
