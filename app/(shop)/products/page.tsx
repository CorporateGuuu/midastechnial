import { db } from '@/lib/prisma';

export default async function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category;

  const products = category
    ? await db.product.findMany({
        where: {
          category: category
        }
      })
    : await db.product.findMany();

  const categoryName = getCategoryDisplayName(category);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => {
            const images = p.images ? JSON.parse(p.images) : [];
            return (
              <div key={p.id} className="border p-4 rounded">
                <img src={images[0] || p.image || '/placeholder.jpg'} alt={p.title} className="w-full h-48 object-cover" />
                <h3>{p.title}</h3>
                <p>${p.price}</p>
                {p.oldPrice && <p className="text-gray-500 line-through">${p.oldPrice}</p>}
                {p.badge && <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">{p.badge}</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getCategoryDisplayName(category?: string): string {
  if (!category) return 'All Products';

  const categoryMap: Record<string, string> = {
    'iphone': 'iPhone Parts',
    'samsung': 'Samsung Parts',
    'macbook': 'MacBook Parts',
    'ipad': 'iPad Parts',
    'tools': 'Tools & Accessories',
    'google': 'Google Pixel Parts'
  };

  return categoryMap[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Parts`;
}
