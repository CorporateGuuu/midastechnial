import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // First check if it's one of our hardcoded featured products
  const featuredProducts = await import('@/lib/db').then(m => m.getFeaturedProducts());
  let product = featuredProducts.find(p => p.id === id);

  // If not found in featured products, check database
  if (!product) {
    const dbProduct = await db.product.findUnique({
      where: { id: id }
    });

    if (dbProduct) {
      product = {
        id: dbProduct.id,
        title: dbProduct.title,
        price: dbProduct.price,
        oldPrice: dbProduct.oldPrice || undefined,
        rating: dbProduct.rating,
        reviews: dbProduct.reviews,
        badge: dbProduct.badge as "new" | "sale" | undefined,
        inStock: dbProduct.inStock,
        category: dbProduct.category,
        image: dbProduct.image || undefined,
      };
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">
                {product.category === "iphone" ? "📱" :
                 product.category === "macbook" ? "💻" :
                 product.category === "ipad" ? "📱" : "🔧"}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {product.badge && (
                <Badge variant={product.badge} className="mb-2">
                  {product.badge.toUpperCase()}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 text-lg">Category: {product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-500 line-through">${product.oldPrice}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {product.inStock > 0 ? `In Stock (${product.inStock})` : "Out of Stock"}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>

            {/* Product Description (placeholder) */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">
                This is a high-quality {product.title.toLowerCase()} designed for professional repair and maintenance.
                Genuine OEM quality ensures perfect compatibility and reliable performance.
                {product.category === "OLED Assemblies" &&
                  " This OLED assembly provides crystal-clear display performance with vibrant colors and sharp contrast."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
