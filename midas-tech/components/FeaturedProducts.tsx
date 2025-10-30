import { getFeaturedProducts } from "../lib/db";
import ProductCard from "./ProductCard";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
        <p className="text-center text-gray-600 mb-12">Handpicked premium parts</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
