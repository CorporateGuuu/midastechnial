import { redirect } from "next/navigation";
import { getPriceId } from "@/lib/stripe-products";

export default function StripeTestPage() {
  async function createTestCheckout(formData: FormData) {
    'use server';

    const product = formData.get('product') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;

    // Get Price ID from our products configuration
    const priceId = getPriceId('apple', product); // Using apple category for testing

    if (!priceId) {
      throw new Error('Product not found');
    }

    // Redirect to checkout session creation
    redirect(`/api/create-checkout-session?priceId=${priceId}&quantity=${quantity}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Stripe Integration Test</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Test Card Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-green-700">✅ Success Cards</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li><strong>Visa:</strong> 4242 4242 4242 4242</li>
              <li><strong>MC:</strong> 5555 5555 5555 4444</li>
              <li><strong>Amex:</strong> 3782 822463 10005</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-700">❌ Decline Cards</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li><strong>Generic:</strong> 4000 0000 0000 0002</li>
              <li><strong>Insufficient:</strong> 4000 0000 0000 9995</li>
              <li><strong>Expired:</strong> 4000 0000 0000 0069</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Use any future expiry date (e.g., 12/30) and any CVC (e.g., 123)
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Checkout Test</h2>
        <form action={createTestCheckout} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Test Product
            </label>
            <select
              id="product"
              name="product"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="iphone15">iPhone 15 Screen ($149.99)</option>
              <option value="iphone14">iPhone 14 Battery ($49.99)</option>
              <option value="iphone13">iPhone 13 Charging Port ($29.99)</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
              defaultValue="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold"
          >
            Test Checkout
          </button>
        </form>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">Testing Checklist</h2>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>✅ API keys configured (test mode)</li>
          <li>✅ Products created in Stripe Dashboard</li>
          <li>✅ Price IDs updated in code</li>
          <li>✅ Webhook endpoint configured</li>
          <li>✅ Email service configured</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/products"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Products
        </a>
      </div>
    </div>
  );
}
