// app/checkout/page.tsx
"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useCart } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { CartItem } from "@/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ShippingAddress {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShippingOption {
  id: string;
  name: string;
  carrier: string;
  service: string;
  cost: number;
  currency: string;
  estimatedDays: string;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  // Shipping options state
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [loadingShipping, setLoadingShipping] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      window.location.href = "/cart";
    }
  }, [items]);

  // Calculate shipping rates when shipping address is provided
  const calculateShipping = async () => {
    if (!shippingAddress.name || !shippingAddress.street1 || !shippingAddress.city ||
        !shippingAddress.state || !shippingAddress.zip) {
      return;
    }

    setLoadingShipping(true);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: shippingAddress,
          items: items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      const data = await res.json();
      if (data.shippingOptions) {
        setShippingOptions(data.shippingOptions);
        setSelectedShipping(data.shippingOptions[0]?.id || '');
      }
    } catch (error) {
      console.error("Shipping calculation failed:", error);
    }
    setLoadingShipping(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const subtotal = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);
    const selectedOption = shippingOptions.find(option => option.id === selectedShipping);
    const shippingCost = selectedOption?.cost || 0;
    const total = subtotal + shippingCost;

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map(item => ({
          priceId: item.stripePriceId,
          quantity: item.quantity,
        })),
      }),
    });

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    } else {
      alert('Failed to create checkout session');
      setLoading(false);
    }
  };

  const subtotal = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);
  const selectedOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingCost = selectedOption?.cost || 0;
  const total = subtotal + shippingCost;

  // Step 1: Review Cart
  if (checkoutStep === 'cart') {
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
            Subtotal: ${subtotal.toFixed(2)}
          </div>
        </div>
        <button
          onClick={() => setCheckoutStep('shipping')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Continue to Shipping
        </button>
      </div>
    );
  }

  // Step 2: Shipping Information
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Address Form */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="font-semibold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={shippingAddress.name}
            onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            value={shippingAddress.street1}
            onChange={(e) => setShippingAddress({...shippingAddress, street1: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ZIP Code"
              value={shippingAddress.zip}
              onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <select
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
              className="p-2 border rounded"
              title="Country"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <button
            onClick={calculateShipping}
            disabled={loadingShipping}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loadingShipping ? "Calculating..." : "Calculate Shipping"}
          </button>
        </div>
      </div>

      {/* Order Summary */}
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
        {shippingOptions.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Shipping Options</h3>
            <div className="space-y-2">
              {shippingOptions.map((option) => (
                <label key={option.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping === option.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-600">
                        {option.estimatedDays} days
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">${option.cost.toFixed(2)}</div>
                </label>
              ))}
            </div>
            <div className="border-t pt-2 mt-2 font-semibold">
              Shipping: ${shippingCost.toFixed(2)}
            </div>
          </div>
        )}
        <div className="border-t pt-4 font-bold text-lg">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      {shippingOptions.length > 0 && (
        <button
          onClick={handleCheckout}
          disabled={loading || !selectedShipping}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </button>
      )}
    </div>
  );
}
